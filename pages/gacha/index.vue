<template>
  <div>
    <div class="pool_area">
      <div class="chart_pie1">
        <div
          id="chart_pie"
          ref="chart_pie"
          style="width: 500px; height: 400px"
        ></div>
      </div>
      <div class="chart_bar1">
        <div
          id="chart_bar"
          ref="chart_bar"
          style="width: 450px; height: 600px;margin:auto"
        ></div>
      </div>

      <div class="pool_table_div">
        <table class="satas_table">
          <tbody>
          <tr>
            <td>详细数据：</td>
          </tr>
          <tr>
            <td>总计{{ poolDataCount }}抽</td>
          </tr>
          <tr class="rarity_6">
            <td>六星</td>
            <td>{{ poolData_satas.char_6 }}</td>
            <td>{{ poolData_satas.char_6_knock }}%</td>
          </tr>
          <tr class="rarity_5">
            <td>五星</td>
            <td>{{ poolData_satas.char_5 }}</td>
            <td>{{ poolData_satas.char_5_knock }}%</td>
          </tr>
          <tr class="rarity_4">
            <td>四星</td>
            <td>{{ poolData_satas.char_4 }}</td>
            <td>{{ poolData_satas.char_4_knock }}%</td>
          </tr>
          <tr class="rarity_3">
            <td>三星</td>
            <td>{{ poolData_satas.char_3 }}</td>
            <td>{{ poolData_satas.char_3_knock }}%</td>
          </tr>
          <tr>
            <td>&emsp;</td>
          </tr>
          <tr>
            <td>平均出货次数：</td>
          </tr>

          <tr>
            <td class="rarity_6">
              六星： <a>{{ poolData_satas.char_6_avg }}</a>抽
            </td>
            <td class="rarity_5">
              &emsp;五星：<a>{{ poolData_satas.char_5_avg }}</a>抽
            </td>
          </tr>
          <tr>
            <td class="rarity_4">
              四星： <a>{{ poolData_satas.char_4_avg }}</a>抽
            </td>
            <td class="rarity_3">
              &emsp;三星：<a>{{ poolData_satas.char_3_avg }}</a>抽
            </td>
          </tr>
          <tr>
            <td>&emsp;</td>
          </tr>
          <tr>
            <td>未出货次数：</td>
          </tr>
          <tr>
            <td>
              限定池已<a>{{ poolData_satas.limited_last }}</a>抽未出货
            </td>
            <td>
              &emsp;普通池已<a>{{ poolData_satas.permanent_last }}</a>抽未出货
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="pool_table_div">
        <table class="pool_table">
          <tbody>
          <tr v-for="(pool,index) in this.poolData_satas.char_6_list" :key="index" class="rarity_6">
            <td ><a v-show="pool.isNew">New</a></td>
            <td>{{ pool.name }}</td>
            <td>[{{ strSubstring(pool.pool) }}]</td>
            <td>[{{ pool.times }}]</td>
            <td> {{ tsToDate(pool.ts*1000) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import toolApi from "@/api/tool";
  import * as echarts from "echarts";
let myChart = "";
let myChart_bar = "";

export default {
  layout: "poster",
  // head: {
    // script:[{
    //   src:"https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/js/echarts.min.js"
  // }],
  // },
  data() {
    return {
      poolData: [],
      poolDataCount: 0,
      uid: "81708745",
      poolData_satas: {},
    };
  },
  created() {
    this.findPoolDataByUid();
  },
  methods: {
    findPoolDataByUid() {
      toolApi.findPoolDataByUid(this.uid).then((response) => {
        this.poolData = response.data.poolData;
        this.poolDataCount = this.poolData.length;
        let char_6 = 0;
        let char_5 = 0;
        let char_4 = 0;
        let char_3 = 0;

        let singlePoolCountInfo = {};
        let pool;

        for (let i = 0; i < this.poolDataCount; i++) {
          pool = this.poolData[i].pool;
          if (0 === this.poolData[i].poolType) {
          }

          if (singlePoolCountInfo[pool] === undefined) {
            console.log("新卡池：", pool);
            singlePoolCountInfo[pool + "_count"] = 1;
            singlePoolCountInfo[pool] = [];
            singlePoolCountInfo[pool].push(this.poolData[i]);
          } else {
            let singlePoolCount = singlePoolCountInfo[pool + "_count"];
            // console.log(pool, ":", singlePoolCount + 1);
            singlePoolCountInfo[pool + "_count"] = singlePoolCount + 1;

            singlePoolCountInfo[pool].push(this.poolData[i]);
          }

          if (5 === this.poolData[i].rarity) char_6++;
          if (4 === this.poolData[i].rarity) char_5++;
          if (3 === this.poolData[i].rarity) char_4++;
          if (2 === this.poolData[i].rarity) char_3++;
        }


        let permanent_flag = false;
        let limited_flag = false;
        let permanent_last = 0;
        let limited_last = 0;

        for (let i = this.poolDataCount - 1; i >= 0; i--) {
          if (0 === this.poolData[i].poolType && !permanent_flag) {
            if (5 === this.poolData[i].rarity) {
              permanent_flag = true;
              continue;
            }
            permanent_last++;
          }

          if (1 === this.poolData[i].poolType && !limited_flag) {
            if (5 === this.poolData[i].rarity) {
              limited_flag = true;
              continue;
            }
            limited_last++;
          }

          if (limited_flag && permanent_flag) {
            console.log("这是", i, "抽");
            break;
          }
        }

        this.poolData_satas.singlePoolCountInfo = singlePoolCountInfo;
        this.poolData_satas.permanent_last = permanent_last;
        this.poolData_satas.limited_last = limited_last;
        this.poolData_satas.char_6 = char_6;
        this.poolData_satas.char_5 = char_5;
        this.poolData_satas.char_4 = char_4;
        this.poolData_satas.char_3 = char_3;

        this.poolData_satas.char_6_knock = this.floatToFixed((char_6 / this.poolDataCount) * 100);
        this.poolData_satas.char_5_knock = this.floatToFixed((char_5 / this.poolDataCount) * 100);
        this.poolData_satas.char_4_knock = this.floatToFixed((char_4 / this.poolDataCount) * 100);
        this.poolData_satas.char_3_knock = this.floatToFixed((char_3 / this.poolDataCount) * 100);
        this.poolData_satas.char_6_avg = this.floatToFixed(this.poolDataCount / char_6);
        this.poolData_satas.char_5_avg = this.floatToFixed(this.poolDataCount / char_5);
        this.poolData_satas.char_4_avg = this.floatToFixed(this.poolDataCount / char_4);
        this.poolData_satas.char_3_avg = this.floatToFixed(this.poolDataCount / char_3);

        let char_6_list = [];

        let pieData = [
          {value: char_6, name: "六星"},
          {value: char_5, name: "五星"},
          {value: char_4, name: "四星"},
          {value: char_3, name: "三星"},
        ];

        this.setChart_pie(pieData);

        let barData_x = [];
        let barData_y = [];
        let index = 0;
        for (var key in singlePoolCountInfo) {
          if (key.indexOf("_") !== -1) {
            barData_x[index] = singlePoolCountInfo[key];
            barData_y[index] = key.substring(0, key.indexOf("_"));
            index++;
          } else {
            for (let i = 0; i < singlePoolCountInfo[key].length; i++) {
              let poolData = singlePoolCountInfo[key];
              poolData[i].times = i + 1;
              if (5 === poolData[i].rarity) {
                char_6_list.unshift(poolData[i]);
              }
            }
          }
        }
        console.log(char_6_list);
        this.poolData_satas.char_6_list = char_6_list;
        this.setChart_bar(barData_x, barData_y);
      });
    },

    floatToFixed(num) {
      return num.toFixed(3);
    },
    setChart_pie(pieData) {
      myChart = echarts.init(document.getElementById("chart_pie"));
      //  myChart.dispose()

      var option = {
        title: {
          text: "概率一览",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        legend: {},

        series: [
          {
            name: "概率一览",
            type: "pie",
            radius: "70%",
            center: ["50%", "55%"],
            data: pieData,

            /*在series中添加itemStyle即可直观显示饼型数值*/
            itemStyle: {
              label: {
                show: true,
                formatter: "{b} : {c}位\n  ({d}%)",
              },
              labelLine: {show: true},
              color: function (params) {
                //自定义颜色
                var colorList = [
                  "rgb(255, 102, 0)",
                  "rgb(255, 255, 101)",
                  "rgb(121, 195, 255)",
                  "LightGreen",
                ];
                return colorList[params.dataIndex];
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    setChart_bar(barData_x, barData_y) {
      myChart_bar = echarts.init(document.getElementById("chart_bar"));

      let option = {
        color: "#87CEEB",
        title: {
          text: "各卡池消耗抽数",
        },
        // backgroundColor: "black",
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255)",
          extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);",
          textStyle: {
            color: "#6a717b",
          },
        },
        grid: {
          left: "20px",
          right: "11%",

          containLabel: true,
        },
        yAxis: [
          {
            type: "category",
            data: barData_y,
            inverse: true,
            axisTick: {
              alignWithLabel: true,
            },

            axisLabel: {
              margin: 5,

              fontSize: 14,
              color: "black",
              left: "5%",

              formatter: function (params) {
                var val = "";
                if (params.length > 6) {
                  val = params.substr(0, 6) + "...";

                  return val;
                } else {
                  return params;
                }
              },
            },
            axisLine: {
              lineStyle: {
                color: "black",
              },
            },
          },
        ],
        xAxis: [
          {
            type: "value",
            axisLabel: {
              margin: 10,
              interval: 1, //横轴信息全部显示
              minInterval: 1,
              // rotate: -30, //-15度角倾斜显示
              fontSize: 14,
              color: "black",
            },
            // axisLine: {
            //   lineStyle: {
            //     color: "blue",
            //   },
            // },
            // splitLine: {
            //   lineStyle: {
            //     color: "black",
            //   },
            // },
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: 14,
            data: barData_x,
            label: {
              show: true,
              position: "right",

              color: "black", //color of value
              fontSize: 18,
            },

            itemStyle: {
              color: "blue",
            },
          },
        ],
      };
      myChart_bar.setOption(option);
    },
    strSubstring(str) {
      if (str.length > 6) {
        return str.substr(0, 6) + "···";
      }
      return str;
    },
    tsToDate(ts){
      var item = new Date(ts).toLocaleString();
      return  item
    }
  },
};
</script>


<style scoped>
.pool_area {

  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  border: solid 1px red;
}

.chart_pie1 {
  border: solid 1px red;
  width: 500px;
  height: 400px;
}

.chart_bar1 {
  border: solid 1px red;
  width: 500px;
  height: 400px;
  overflow: auto;
  scrollbar-width: none;
}

.pool_table_div {
  border: solid 1px red;
  width: 500px;
  height: 400px;
  overflow: auto;
  flex-wrap: wrap;
  scrollbar-width: none;
}

.pool_table {
  text-align: center;
}

.satas_table{
  font-size:20px ;
  font-weight: 600;
}

.rarity_6{
color: rgb(255, 102, 0);

}
.rarity_5{
  color: rgb(248, 203, 0);
}
.rarity_4{
   color: rgb(67, 171, 255);
}
.rarity_3{
   color: rgb(187, 187, 187);
}



</style>
