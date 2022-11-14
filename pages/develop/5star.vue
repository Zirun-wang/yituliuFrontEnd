<template>
  <div id="T2_cost">
    <div id="main" style="background-color: rgb(217 221 227);">
      <div class="total_agent" v-for="(singleAgent, index) in t5data" :key="index" :style="getWidth2(singleAgent.cost, 0.8)">
        <!-- <div class="agent_pic" :style="getBackground(singleAgent.ref)"></div> -->
        <div class="agent" :class="getBranch(singleAgent.branch)" :style="getWidth(singleAgent.cost, 0.8)">
          <div class="star_battle" style="font-size:16px;font-weight:500;line-height: 24px;text-align: left;vertical-align: top;padding:0px 8px;">
            作战能力：{{singleAgent.battle}}<br>{{singleAgent.battleText}}
          </div>
          <div class="star_riic" style="font-size:16px;font-weight:500;line-height: 24px;text-align: left;vertical-align: top;padding:0px 8px;" v-show="(singleAgent.riicR>0)">
            基建加分：{{singleAgent.riic}}<br>{{singleAgent.riicText}}
          </div>
          <div class="agent_branch">
            {{singleAgent.branch}}
          </div>
          <div class="agent_name">
            {{singleAgent.name}}
          </div>
          <div class="agent_cost">
            {{singleAgent.cost}}理智
          </div>
        </div>
        <div class="agent_pic" :style="getBackground(singleAgent.ref)"></div>
      <!-- {{agentData}} -->
      </div>
    </div>
  </div>
</template>
<script>
  import t5data from "static/json/5star.json";

    export default {
      data(){
            return {
              t5data:t5data,
            }
        },
        methods: {
          getBranch(branch){
            if (branch=="先锋") return ("br_vanguard")
            if (branch=="近卫") return ("br_guard")
            if (branch=="辅助") return ("br_support")
            if (branch=="狙击") return ("br_sniper")
            if (branch=="术师") return ("br_caster")
            if (branch=="重装") return ("br_shield")
            if (branch=="医疗") return ("br_medic")
            return ("br_spc")
          },
          getWidth(num , scale) {
              return "width:" + (num*scale-2000) +"px";
          },
          getWidth2(num , scale) {
              return "width:" + (num*scale-1800) +"px";
          },

          getBackground(ref){
            return "background:url(" + ref + ") 00% 110% / cover no-repeat,#444444;";
          },
          getEfficiency(num, acc){
              acc = (typeof acc !== 'undefined') ?  acc : 2;
              return parseFloat(num).toFixed(acc);
          },
          getPackImgUrl(img) {
              return ("/img/packs/" + img + ".png");
          },
          getPackPic(img) {
              return ("background:url(/img/packs/" + img + ".png) 00% 110% / cover no-repeat,#e4e7ed;")                
          }
        }
    }
</script>


<style scoped>

  .agent{
    padding: 0px 16px;
    margin: 16px;
    font-size: 24px;
    height: 48px;
    border-radius: 8px;
    box-shadow: 0px 0px 8px 0 rgb(0 0 0 / 30%);
    text-align: right;
    display: inline-block;
  }
  .agent div{
    display: inline-block;
    line-height: 48px;
    color: white;
    font-weight: 600;
  }

  .agent_pic{
    height: 64px;
    width: 64px;
    position: absolute;
    display: inline-block;
    border-radius: 8px;
    border: 2px solid #fff;
    margin: 6px 0px 0px -24px;
  }

  .br_vanguard{
    background-color: rgb(72 179 157);
  }
  .br_guard{
    background-color: rgb(99 155 181);
  }
  .br_support{
    background-color: rgb(173 156 55);
  }
  .br_sniper{
    background-color: rgb(201 114 61);
  }
  .br_caster{
    background-color: rgb(191 107 187);
  }
  .br_medic{
    background-color: rgb(236,86,84);
  }
  .br_shield{
    background-color: rgb(147 147 147);
  }
  .br_spc{
    background-color: rgb(98 96 149);
  }



</style>
