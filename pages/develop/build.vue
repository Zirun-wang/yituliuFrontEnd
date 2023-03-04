<template>
    <div>
        <div> <el-input class="input" type="textarea" v-model.trim="buildJson" @change="readJson()"> </el-input></div>
    </div>
</template>
  


<script>
import storeApi from "@/api/store";
import gacha_actRewardJson from "static/json/gacha_actReward.json"; //活动奖励数据

export default {
    layout: "poster",
    data() {
        return {
            buildJson: "",
        };
    },
    created() {
        //   this.readJson();
    },
    methods: {
        readJson() {
              // this.buildJson= JSON.parse(this.buildJson);
              let json = JSON.parse(this.buildJson);
              console.log(json.data)
        }
    },
};
</script>
  

<style>
.el-input__inner {
    width: 400px;
    height: 500px;
}
</style>