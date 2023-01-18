<template>
  <div>
    <div class="pie_all" id="chart2" ref="chart2"></div>
    <div class="title"><br /></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import itemCount from "static/bar/itemCount.json";
import itemCount2 from "static/bar/itemCount2.json";
import apCost from "static/bar/apCost.json";
import imageUrl from "static/bar/imageUrl.json";

let itemId = [];
export default {
  layout: "poster",
  data() {
    return {
      itemName: [],
      itemCost: [],

      imgUrl: [],
    };
  },
  created() {
    this.show();
  },
  methods: {
    sleep(d) {
      return new Promise((resolve) => setTimeout(resolve, d));
    },

    async show() {
      await this.sleep(1000);
      for (let i = 0; i < itemCount.length; i++) {
        await this.sleep(2000);
        itemId.unshift(itemCount[i].itemName);
        this.itemName.unshift(itemCount[i].itemId);
        this.itemCost.unshift(itemCount[i].itemCount);
        this.barChart();
      }

      //   await this.sleep(2000)
      //     this.itemName = []
      //     this.itemCost = []
      //     itemId = []
      //   for(let i=0;i<itemCount2.length;i++){
      //      await this.sleep(2000)
      //     itemId.unshift(itemCount2[i].itemName);
      //     this.itemName.unshift(itemCount2[i].itemId)
      //     this.itemCost.unshift(itemCount2[i].itemCount)
      //     this.barChart()
      // }
      // await this.sleep(1000);
      // // for(let i=0;i<apCost.length;i++){
      // for (let i = 0; i < apCost.length; i++) {
      //   await this.sleep(10);
      //   itemId.unshift(apCost[i].name);
      //   this.itemName.unshift(apCost[i].charId);
      //   this.itemCost.unshift(apCost[i].apCost.toFixed(2));
      //   this.barChart();

      //   if (this.itemName.length > 10) {
      //     itemId = itemId.slice(0, itemId.length - 1);
      //     this.itemName = this.itemName.slice(0, this.itemName.length - 1);
      //     this.itemCost = this.itemCost.slice(0, this.itemCost.length - 1);
      //   }
      // }
    },
    barChart() {
      var myChart = echarts.init(document.getElementById("chart2"));
      console.log(this.xData);
      var option = {
        color: "#ffffffffffffff",

        // backgroundColor: "black",
        // tooltip: {
        //   trigger: "axis",
        //   formatter: "{b}:{c}个",
        //   backgroundColor: "rgba(255,255,255)",
        //   extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);",
        //   textStyle: {
        //     color: "#6a717b",
        //   },
        // },

        grid: {
          left: 200,
          right: 100,

          // bottom: 20,
          top: 110,
          // containLabel: true
        },
        yAxis: [
          {
            type: "category",
            data: this.itemName,
            inverse: true,
            axisTick: {
              alignWithLabel: true,
            },

            axisLabel: {
              margin: 0,
              textStyle: {
                fontSize: 26,
                color: "#FFFFFFFF",
                textBorderWidth: 10,
                textBorderColor: "#000000",
              },
              formatter: function (value, index) {
                //判断是否要显示预警
                // console.log("拿到的内容",  itemId[index]);
                // return value;
                return itemId[index] + "{" + value + "|}";
              },
              rich: imageUrl,
            },
            axisLine: {
              lineStyle: {
                width: 4,
                color: "#FFFFFFFF",
              },
            },
          },
        ],
        xAxis: [
          {
            show: false,
            type: "value",
            axisLabel: {
              margin: 0,
              interval: 1, //横轴信息全部显示
              minInterval: 1,
              // rotate: -30, //-15度角倾斜显示
              textStyle: {
                fontSize: 24,
                color: "#ffffff",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#ffffff",
              },
            },
          },
        ],
        series: [
          {
            name: [],
            type: "bar",
            barWidth: 30,
            data: this.itemCost,
            label: {
              normal: {
                show: true,
                position: "right",
                textStyle: {
                  color: "#ffffff", //color of value
                  fontSize: 26,
                  // margin: 20,
                  textBorderWidth: 10,
                  textBorderColor: "#000000",
                },
              },
            },

            itemStyle: {
              normal: {
                color: function (params) {
                  console.log("配置颜色:", params);
                
                  if ("30013" === params.name) return "#CDB288";
                  if ("30043" === params.name) return "#149DCF";
                  if ("30063" === params.name) return "#CF3F3F";
                  if ("30053" === params.name) return "#9CCFE0";
                  if ("30083" === params.name) return "#5C5B8F";
                  if ("30023" === params.name) return "#D3BDB0";
                  if ("30073" === params.name) return "#E87600";
                  if ("30103" === params.name) return "#FFF9D0";
                  if ("30093" === params.name) return "#E9B6BF";
                  if ("30033" === params.name) return "#B1D632";
                  if ("31023" === params.name) return "#DBDFE3";
                  if ("31013" === params.name) return "#12BEFC";
                  if ("31033" === params.name) return "#399382";
                  if ("31053" === params.name) return "#02BEFF";
                  if ("31043" === params.name) return "#EB94C0";
                  if ("31063" === params.name) return "#FFFFFF";

                  return "#FCCE10";
                },
                barBorderRadius: [20, 20, 20, 20],
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.pie_all {
  width: 1920px;
  height: 1080px;
  background: url(~static/img/back/ep11.png);
  background-size: 2000px;
  /* border:solid red 1px; */
  color: #4ba6f1;
  /* margin-top:10px ; */
}

.title {
  position: absolute;
  left: 1100px;
  top: 800px;
  color: white;
  font-size: 28px;
  text-align: right;
}
</style>