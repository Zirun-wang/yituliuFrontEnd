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
      
      imgUrl:[]
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
      await this.sleep(1000)
      for(let i=0;i<itemCount.length;i++){
           await this.sleep(2000)
          itemId.unshift(itemCount[i].itemName);
          this.itemName.unshift(itemCount[i].itemId)
          this.itemCost.unshift(itemCount[i].itemCount)
          this.barChart()
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
        color: "#4ba6f1",

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
                  textBorderColor:'#000000'
              },
              formatter: function (value,index) {
                //判断是否要显示预警
                console.log("拿到的内容",  itemId[index]);
                // return value;
                return itemId[index]+"{"+value+"|}";
              },
              rich: imageUrl
            },
            axisLine: {
              lineStyle: {
                width:4,
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
                  textBorderColor:'#000000'
                },
              },
            },

            itemStyle: {
              normal: {
                barBorderRadius:[20,20,20,20]
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