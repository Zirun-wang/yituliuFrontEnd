<template>
  <div>
    <div>
      {{ newJson }}
    </div>
  </div>
</template>

<script>
import gacha_potentialJson from "static/json/gacha_potential.json"; //常驻活动和主线数据
import gacha_actReJson from "static/json/gacha_actRe.json"; //复刻活动数据
import gacha_storePacksJson from "static/json/gacha_storePacks.json"; //商店礼包数据
import gacha_actRewardJson from "static/json/gacha_actReward.json"; //活动奖励数据
// import gacha_honeyCakeJson from "static/json/gacha_honeyCakeNew.json"; //其他奖励数据

import building_data_trade from "static/json/build/building_data_trade.json";
import building_data_manu from "static/json/build/building_data_manu.json";
import zones from "static/RecycleBin/zones.json";

import composite_table from "static/RecycleBin/composite_table.json";

export default {
  layout: "poster",
  data() {
    return {
      newJson: {},
    };
  },
  created() {
    this.jsonFormat_zone();
  },
  methods: {
    jsonFormat_composite_table() {
      let arr = ["固源岩", "糖", "聚酸酯", "异铁", "酮凝集","装置","源岩","代糖","酯原料","异铁碎片",
        "双酮","破损装置","提纯源岩","糖聚块","聚酸酯块","异铁块","酮阵列","改量装置","白马醇","三水锰矿","五水研磨石",
        "RMA70-24","聚合凝胶","炽合金块","晶体电路","切削原液","精炼溶剂","转质盐聚块","晶体电子单元","聚合剂","双极纳米片",
        "D32钢","烧结核凝晶",
      ];

        let json = [];
       for(let i in arr){
         let info ={};
         info.id = arr[i];
         info.itemCost =  composite_table[arr[i]];

        json.push(info);
       }

       this.newJson = json
    },
    jsonFormat() {
      gacha_potentialJson
        .filter((json) => true)
        .forEach((json) => {
          this.newJson[json.packName] = {
            originium: parseInt(json.gachaOriginium),
            orundum: parseInt(json.gachaOrundum),
            permit: parseInt(json.gachaPermit),
            permit10: parseInt(json.gachaPermit10),
            module: json.packType,
            // type: "通用",
          };
        });
    },
    jsonFormat2() {
      building_data_manu
        .filter((json) => true)
        .forEach((json) => {
          this.newJson[json.name] = {
            skillName: json.skillName,
            skillData: json.skillData,
            skillDataSp: json.skillDataSp,
            variable: json.variable,
            capacityLimit: json.prodLimit,
          };
        });
    },
    jsonFormat_zone() {
      zones
        .filter((json) => true)
        .forEach((json) => {
          let openTime =  json.existence.CN.openTime;
          
          this.newJson[json.zoneId] = {zoneName:json.zoneName,openTime:openTime};
        });
      // this.newJson = JSON.stringify(JSON.parse(this.newJson), null, '\t')
    },
  },
};
</script>
