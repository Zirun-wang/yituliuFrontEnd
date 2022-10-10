<template>
    <div>
        <div
            class="pie_all"
            id="chart2"
            ref="chart2"
          >
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import itemCount from "static/json/itemCount.json";

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
      
      for(let i=0;i<itemCount.length;i++){
           await this.sleep(2000)
          this.itemName.unshift(itemCount[i].itemName)
          this.itemCost.unshift(itemCount[i].itemCount)
          this.barChart()
          console.log('测试')
      }
      
        
    },
     barChart() {
        var myChart = echarts.init(document.getElementById("chart2"));
        console.log(this.xData);
        var option = {
          color: "#2951d6",

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
            // top: 30,
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
                  fontSize: 18,
                  color: "#00000",
                  left: "0%",
                },
              },
              axisLine: {
                lineStyle: {
                  color: "#00000",
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
                  fontSize: 14,
                  color: "#00000",
                },
              },
              axisLine: {
                lineStyle: {
                  color: "#000000",
                },
              },
              splitLine: {
                lineStyle: {
                  color: "#000000",
                },
              },
            },
          ],
          series: [
            {
              name: [],
              type: "bar",
              barWidth: 30,
              radius: "60%",

              data: this.itemCost,
              label: {
                normal: {
                  show: true,
                  position: "right",
                  textStyle: {
                    color: "#000000", //color of value
                    fontSize: 24,
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
    width: 1200px;
    height: 800px;
    background: white;
    /* border:solid red 1px; */
    /* color: #2951d6; */
  }

</style>