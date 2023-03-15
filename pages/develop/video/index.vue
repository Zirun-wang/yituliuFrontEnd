<template>
  <div>
    <div class="pie_all" id="myChart" ref="myChart"></div>
   <div class="title1">统计范围：{{chapters[0]}}至{{chapters[chapters.length-1]}}<br/></div>
    <div class="title2">{{ chapter }}<br/></div>
  </div>
</template>

<script>
import itemCount202302 from "static/bar/itemCount202302.json";
import itemCount202301 from "static/bar/itemCount202301.json";
import itemCount202212 from "static/bar/itemCount202212.json";
import itemCount202211 from "static/bar/itemCount202211.json";
import itemCount202210 from "static/bar/itemCount202210.json";
import imageUrl from "static/bar/imageUrl.json";
import echarts from "static/js/echarts.min.js";


let itemId = [];
let itemName = [];
let itemCostContent = [];
let itemIndex = 0;
let myChart = "";
export default {
  layout: "poster",
  data() {
    return {
      itemCost: [],
      chapters: ["淬火尘霾","叙拉古人", "照我以火", "登临意", "春分",],
      chapter: '',
    };
  },
  created() {
    
  },
  mounted(){
     this.show();
  },
  methods: {
    sleep(d) {
      return new Promise((resolve) => setTimeout(resolve, d));
    },

    async show() {
      
      this.changeBackIamge(0)
      await this.sleep(2000);
      for (let i = 0; i < itemCount202210.length; i++) {
        itemName.unshift(itemCount202210[i].itemName);
        itemId.unshift(itemCount202210[i].itemId);
        
        var costContent = itemCount202210[i].itemCount + "(+ " + 0 +")";
        itemCostContent.unshift(costContent);
        if(itemCount202210[i].itemName=="固源岩组"){
          this.itemCost.unshift(itemCount202210[i].itemCount*0.7);
        }else{
          this.itemCost.unshift(itemCount202210[i].itemCount);
        }
        
        await this.sleep(1500);
        itemIndex = itemCount202210[i].itemId;
        this.barChart();
      }

       await this.sleep(1000);
       this.changeBackIamge(1)
       this.changeChartData(itemCount202211);

       await this.sleep(17500);
       this.changeBackIamge(2)
       this.changeChartData(itemCount202212);
    
       await this.sleep(17500);
       this.changeBackIamge(3)
       this.changeChartData(itemCount202301);

       await this.sleep(17500);
       this.changeBackIamge(4)
       this.changeChartData(itemCount202302);
      
     
    },


    async changeChartData(newData){
      let map = this.arrTOMap(itemCount202210);
      for (let i = 0; i < newData.length; i++) {
        var costContent = newData[i].itemCount + "(+ " + (newData[i].itemCount-map[newData[i].itemId]) + ")";
        itemCostContent[15 - i] = costContent;
        itemName[15 - i] = newData[i].itemName;
        itemId[15 - i] = newData[i].itemId;
        this.itemCost[15 - i] = newData[i].itemCount;
        if(itemCount202210[i].itemName=="固源岩组") this.itemCost[15 - i] = newData[i].itemCount*0.7;
        itemIndex = newData[i].itemId;
        await this.sleep(1000);

        console.log(15-i,' :',newData[i].itemName)
        
        this.barChart();
      }
    },
  
    changeBackIamge(index){
      this.chapter = this.chapters[index];
      document.getElementById("myChart").style.background = "url(/img/back/" + this.chapters[index] + ".png),url(/img/back/" + this.chapters[index+1] + ".png)"
      document.getElementById("myChart").style.backgroundSize = "2000px"
      document.getElementById("myChart").style.backgroundPosition = "0 0,-2000px -2000px";
    },


    arrTOMap(arr){
      let map = {};
      for(const i in arr){
           map[arr[i].itemId]= arr[i].itemCount
      }
      return map;
    },

    async getUpdateNumber(newData, oldData) {
      for (let i = 0; i < (newData - oldData); i++) {
        await this.sleep(10);
        return oldData++;
      }
    },
    getIncreaseRatio(newData, oldData) {
      let ratio = (newData / oldData - 1) * 100;
      return parseFloat(ratio).toFixed(1);
    },
    barChart() {
      // echarts.init(document.getElementById("chart2")).dispose;
      if (myChart == "") {
        myChart = echarts.init(document.getElementById("myChart"));
      }
      var option = {
        color: "rgb(255, 255, 255)",

        grid: {
          left: 200,
          right: 130,
          top: 110,
        },
        yAxis: [
          {
            type: "category",
            data: itemId,
            inverse: true,
            axisTick: {
              alignWithLabel: false,
            },
            axisLabel: {
              margin: 0,
              fontSize: 26,
              color: function (params) {
                if (itemIndex === params) return "rgb(253, 72, 0)";
                return "rgb(255, 255, 255)";
              },
              textBorderWidth: 10,
              textBorderColor: "#000000",

              formatter: function (value, index) {
                //判断是否要显示预警
                // console.log("拿到的内容",  itemId[index]);
                // console.log("Y轴返回内容",index,"：", index,  itemName[index] + "{" + value + "|}");

                return itemName[index] + "{" + value + "|}";
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
              fontSize: 24,
              color: "#ffffff",
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
            
            type: "bar",
            barWidth: 40,
            data: this.itemCost,
            itemStyle: {
              color: function (params) {
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
              barBorderRadius: [10, 10, 10, 10],
            },
            label: {
              show: true,
              position: "right",
              color: "rgb(255, 255, 255)",
              fontSize: 26,
              // margin: 20,
              textBorderWidth: 10,
              textBorderColor: "#000000",
              formatter: function (value, index) {
                return itemCostContent[value.dataIndex];
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
  /* background: url(~static/img/back/叙拉古人.png); */
  background-size: 2000px;
  /* border:solid red 1px; */
  color: #4ba6f1;
  /* margin-top:10px ; */
}

.title1 {
  position: absolute;
  left: 100px;
  top: 0px;
  color: rgb(255, 208, 0);
  font-weight: 900;
  font-size: 64px;
  text-align: right;
  -webkit-text-stroke: 2px #000000;
  /* color: rgb(253, 72, 0); */
}

.title2 {
  position: absolute;
  left: 1400px;
  top: 900px;
  color: rgb(255, 208, 0);
  font-weight: 900;
  font-size: 100px;
  text-align: right;
  -webkit-text-stroke: 5px #000000;
  /* color: rgb(253, 72, 0); */
}
</style>
