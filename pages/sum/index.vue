<template>
    <div>
        <div
            class="pie_all"
            id="chart2"
            ref="chart2"
          >
          
        </div>
        <div class="title">截止2022年10月12日第十一章主线<br>
          全干员材料总需求</div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import itemCount from "static/json/itemCount.json";
import itemCount2 from "static/json/itemCount2.json";
import apCost from "static/json/apCost.json";
export default {
  data() {
    return {   
        itemName:[],
        itemCost:[],
    };
  },
 created() {  
  this.show()
  },
  methods: {  
    sleep(d){
          return new Promise((resolve)=>setTimeout(resolve,d))
    },

    async  show(){
      // await this.sleep(1000)
      // for(let i=0;i<itemCount.length;i++){
      //      await this.sleep(2000)
      //     this.itemName.unshift(itemCount[i].itemName)
      //     this.itemCost.unshift(itemCount[i].itemCount)
      //     this.barChart()         
      // }

      //   await this.sleep(2000)
      //     this.itemName = []
      //     this.itemCost = []
      //   for(let i=0;i<itemCount2.length;i++){
      //      await this.sleep(2000)
      //     this.itemName.unshift(itemCount2[i].itemName)
      //     this.itemCost.unshift(itemCount2[i].itemCount)
      //     this.barChart()
      // }
      await this.sleep(1000)
      for(let i=0;i<apCost.length;i++){
           await this.sleep(2000)
          this.itemName.unshift(apCost[i].name)
          this.itemCost.unshift(apCost[i].apCost)
          this.barChart()         
      }
      
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
            // left: 40,
            right: 80,

            // bottom: 20,
            top: 80,
            // containLabel: true
          },
          yAxis: [
            {
              type: "category",
              data:this.itemName,
              inverse: true,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                margin: 0,
                textStyle: {
                  fontSize: 26,
                  color: "#FFFFFFFF",
                  left: "10%",
                },
              },
              axisLine: {
                lineStyle: {
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
                  color: "#FFFFFFFF",
                },
              },
              axisLine: {
                lineStyle: {
                  color: "#FFFFFFFF",
                },
              },
              splitLine: {
                lineStyle: {
                  color: "#FFFFFFFF",
                },
              },
            },
          ],
          series: [
            {
              name: [],
              type: "bar",
              barWidth: 30,
              radius: "48%",

              data: this.itemCost,
              label: {
                normal: {
                  show: true,
                  position: "right",
                  textStyle: {
                    color: "#FFFFFFFF", //color of value
                    fontSize: 26,
                    // margin: 20,
                  },
                },
              },

              itemStyle: {
                normal: {},
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
    width: 1680px;
    height: 990px;
    background: url(~static/img/back/ep11.png);
    background-size: 1700px;
    /* border:solid red 1px; */
    color: #4ba6f1;
    /* margin-top:10px ; */
  }

 .title{
  position: absolute;
  left: 1100px;
  top:800px; 
  color: white;
  font-size:28px ;
  text-align: right;
 }
</style>