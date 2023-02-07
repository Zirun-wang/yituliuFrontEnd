<template>
  <div>
    <div class="box" id="back">
      <div class="bak_color">
      <div class="char_image" id="char"></div>
      <div id="myChart" ref="myChart"></div>

      <div class="itemCostTable">
        <table border="0">
          <tbody>
          <tr>
            <td colspan="10">
              <div class="apCost">{{charName }}精英化消耗等效<img src="/img/materials-bak/理智.png" class="ap_image">
                {{ toFixedByAcc(apCost + 756, 2) }} <br>相当于{{ toFixedByAcc((apCost + 756) / 135, 2) }}个
                <img src="/img/materials-bak/至纯源石.png" class="ap_image">
              </div>
            </td>
          </tr>
          <!-- <tr>
            <td colspan="10">升级消耗素材数量</td>
          </tr>
          <tr style="text-align: left;">
            <td><img :src="'/img/materials-bak/龙门币.png'" class="item_image"></td>
            <td colspan="1" class="itemCount"><a>X{{ 1124796 }}</a></td>
            <td><img :src="'/img/materials-bak/声望.png'" class="item_image"></td>
            <td colspan="3" class="itemCount"><a>X{{ 1111400 }}</a></td>
          </tr> -->
          <tr>
            <td colspan="10">精英化消耗素材数量</td>
          </tr>
          <tr v-for="(itemCost,index) in itemCosts" :key="index">
            <td><img :src="'/img/materials-bak/龙门币.png'" class="item_image"></td>
            <td v-show="0==index" style="text-align: left;" class="itemCount"><a>X{{ 30000 }}</a></td>
            <td v-show="1==index" style="text-align: left;" class="itemCount"><a>X{{ 180000 }}</a></td>
            <td><img :src="'/img/materials-bak/'+itemCost[0].itemName+'.png'" class="item_image"></td>
            <td class="itemCount"><a>X{{ itemCost[0].count }}</a></td>
            <td><img :src="'/img/materials-bak/'+itemCost[1].itemName+'.png'" class="item_image"></td>
            <td class="itemCount"><a>X{{ itemCost[1].count }}</a></td>
            <td><img :src="'/img/materials-bak/'+itemCost[2].itemName+'.png'" class="item_image"></td>
            <td class="itemCount"><a>X{{ itemCost[2].count }}</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
 </div>
</template>

<script>
import itemCostR6 from "static/bar/itemCostR6";
import "./R6.css";
import echarts from "static/js/echarts.min.js";
import charImageUrl from "static/bar/charImageUrl.json";

let apCostContent = [];
let charIdList = [];
let charNameList = [];
let apCostList = [];
let myChart = "";

var colors =  ['rgb(255, 80, 70)','rgb(255, 105, 70)','rgb(255, 130, 70)','rgb(255, 155, 70)','rgb(255, 180, 70)','rgb(255, 205, 70)',
'rgb(255, 230, 70)','rgb(230, 255, 70)','rgb(205, 255, 70)','rgb(205, 180, 70)','rgb(205, 155, 70)' ];

export default {
  layout: "poster",
  data() {
    return {
      apCost: 0,
      itemCosts: [],
      charName: '',
    };
  },
  created() {
  },
  mounted() {
    this.setBackImage();
  },
  methods: {
    toFixedByAcc(num, acc) {
      acc = (typeof acc !== 'undefined') ? acc : 2;
      return parseFloat(num).toFixed(acc);
    },
    sleep(d) {
      return new Promise((resolve) => setTimeout(resolve, d));
    },


    async setBackImage() {
      let background = "";

      for (let i = 0; i < itemCostR6.length; i++) {
        this.apCost = itemCostR6[i].apCost;
        this.itemCosts = itemCostR6[i].itemCost;
        this.charName = itemCostR6[i].name;
        var costContent = this.toFixedByAcc(itemCostR6[i].apCost) + "(+" + this.toFixedByAcc((itemCostR6[i].apCost - itemCostR6[0].apCost), 1) + "理智)";
        apCostContent.unshift(costContent);

        charNameList.unshift(itemCostR6[i].name);
        charIdList.unshift(itemCostR6[i].charId);
        apCostList.unshift(this.toFixedByAcc(itemCostR6[i].apCost + 756, 2));

        if (charNameList.length > 10) {
          charNameList = charNameList.splice(0, 10);
          charIdList = charIdList.splice(0, 10);
          apCostList = apCostList.splice(0, 10);
          apCostContent = apCostContent.splice(0, 10);

          charNameList.push(itemCostR6[0].name);
          charIdList.push(itemCostR6[0].charId);
          apCostList.push(this.toFixedByAcc(itemCostR6[0].apCost + 756, 2));
          apCostContent.push(itemCostR6[0].apCost + "(+0理智)");
        }


        this.barChart()

        if (i + 1 < itemCostR6.length) background = "url(/skin/" + itemCostR6[i].charId + "_1b.png),url(/skin/" + itemCostR6[i + 1].charId + "_1b.png)";
        // console.log(background)
        document.getElementById("char").style.background = background;
        document.getElementById("char").style.backgroundPosition = "0 0,-1000px -1000px";
        document.getElementById("char").style.backgroundRepeat = 'no-repeat';
        document.getElementById("char").style.backgroundSize = '95%,95%';


         await this.sleep(2000);

      }
      console.log(document.getElementById("char").style.background);
      document.getElementById("char").style.backgroundPosition = "-1000px -1000px,0 0";
      //  console.log(background)
      //  console.log(backgroundPosition)
    },
    getProfession(str) {
      if ("SNIPER" == str) return "狙击";
      if ("WARRIOR" == str) return "近卫";
      if ("SPECIAL" == str) return "特种";
      if ("MEDIC" == str) return "医疗";
      if ("SUPPORT" == str) return "辅助";
      if ("PIONEER" == str) return "先锋";
      if ("TANK" == str) return "重装";
      if ("CASTER" == str) return "术师";
    },
    getPositionImg(str) {
      let profession = this.getProfession(str);
      return "/back/" + profession + ".png";
    },
    barChart() {
      // echarts.init(document.getElementById("chart2")).dispose;
      if (myChart == "") {
        myChart = echarts.init(document.getElementById("myChart"));
      }
      var option = {
        grid: {
          left: 220,
          right: 260,
          top: 50,
        },
        yAxis: [
          {
            type: "category",
            data: charIdList,
            inverse: true,
            axisTick: {
              alignWithLabel: false,
            },
            axisLabel: {
              margin: 0,
              fontSize: 26,
              color: function (params) {
                // if (itemIndex === params) return "rgb(253, 72, 0)";
                return "rgb(255, 255, 255)";
              },
              textBorderWidth: 10,
              textBorderColor: "#000000",

              formatter: function (value, index) {
                //判断是否要显示预警
                // console.log("拿到的内容",  itemId[index]);
                // console.log("Y轴返回内容：", index,  charNameList[index] + "{" + value + "|}");

                return charNameList[index] + "{" + value + "|}";
              },
              rich: charImageUrl,
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
            data: apCostList,
            itemStyle: {
              color: function (params) {
               
                return colors[params.dataIndex];
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
                return apCostContent[value.dataIndex];
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

