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

import building_data_trade from "static/json/build/building_data_trade.json"; //这是贸易站的数据
import building_data_manu from "static/json/build/building_data_manu.json"; //这是制造站的数据
import zones from "static/RecycleBin/zones.json"; //这是制造站的数据

export default {
  layout: "poster",
  data() {
    return {
      newJson: {},
    };
  },
  created() {
    this.jsonFormat1();
  },
  methods: {
    jsonFormat() {
      gacha_potentialJson
        .filter((json) => true)
        .forEach((json) => {
          this.newJson[json.packName] = {
            originium: parseInt(json.gachaOriginium),
            orundum: parseInt(json.gachaOrundum),
            permit: parseInt(json.gachaPermit),
            permit10: parseInt(json.gachaPermit10),
            module:json.packType
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
    jsonFormat1() {
      zones
        .filter((json) => true)
        .forEach((json) => {
          this.newJson[json.zoneId] =json.zoneName ;
        });
        // this.newJson = JSON.stringify(JSON.parse(this.newJson), null, '\t')
    },
  },
};
</script>
