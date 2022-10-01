<template>
  <div>
    <!-- 地图效率Start -->
    <div id="stage">
      <!-- 标题区域 -->
      <div class="op_title">
        <div class="op_title_text">
          <div class="op_title_ctext">
            地图效率
          </div>
          <div :class=opETextTheme>
            Best levels
          </div>
        </div>
        <div class="op_title_tag">
          <div id="nowActStageKey" class="op_tag_0" @click="showNowActive()">
            只显示up
          </div>
          <div id="orundumStageKey" class="op_tag_0" @click="showOrundumPopup()">
            搓玉版
          </div>
          <div class="tab_text">
          *点击卡片查看详情
          </div>
          <div class="tab_text">
          <!-- *更新时间{{ stageRankT3}} -->
          *更新时间 {{updateTime}}
          </div>
        </div>
      </div>
      <!-- t3内容区域 -->
      <div class="op_content" id="stage_t3_content">
        <!-- 基础卡 -->
        <div v-for="(materialRankT3, indexAll) in stageRankT3" :key="indexAll" class="stage_card_t3 uni_shadow_2" @click="showPopup(indexAll)">
          <div class="stage_card_t3_img" :style="getCardBackground(materialRankT3[1].itemType)"></div>
          <!-- <div class="stage_card_t3_img" :class="getSpriteImg(materialRankT3[1].itemId,0 )"></div> -->
         
          <div class="stage_card_t3_table" >
            <table>
                <tbody>
                  <tr :class="getColor(stage.stageColor)" class="stage_table_r" v-for="(stage, index) in materialRankT3.slice(0, 6)" :key="index">
                    <td class="stage_table_c1">{{ stage.stageCode }}</td>
                    <!-- <td class="stage_table_c2" ><img class="stage_img_secondary" :src="getImgUrl(stage.secondary)" alt=""></td> -->
                    <td> 
                      <div  :class="getSpriteImg(stage.secondaryId, 1)"></div>
                    </td>
                    <td class="stage_table_c3">{{getEfficiency(stage.stageEfficiency,1)}}%</td>
                    <td class="stage_table_c4">
                      <!-- <img v-show="stage.stageState > 0.1" src="/img/website/up.png"> -->
                      <div v-show="stage.stageState > 0.1" :class="getSpriteImg('up', 6)"></div>
                      </td>
                  </tr>
                </tbody>
            </table>
          </div>
        </div>
        <!-- 排版占位用卡片 -->
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
      </div>
      <!-- 扩展卡 -->
      <div class="op_content" id="stage_t3_content_plus" style="display:none;">
        <div v-for="(materialRankT3, index) in stageRankT3" :key="index" class="stage_card_t3 uni_shadow_2" :style="judgeActive(index)" @click="showPopup(index)">
          <div class="stage_card_t3_img" :style="getCardBackground(materialRankT3[1].itemType)"></div>
          <div class="stage_card_t3_table">
            <table>
                <tbody>
                  <tr :class="getColor(stage.stageColor)" class="stage_table_r" v-for="(stage, index) in materialRankT3.slice(0, 6)" :key="index">
                    <td class="stage_table_c1">{{ stage.stageCode }}</td>
                    <!-- <td class="stage_table_c2" ><img class="stage_img_secondary" :src="getImgUrl(stage.secondary)" alt=""></td> -->
                    <td>
                    <div  class="sprite_secondary_div">
                      <div  :class="getSpriteImg(stage.secondaryId, 1)"></div>
                    </div>
                    </td>
                    <td class="stage_table_c3">{{getEfficiency(stage.stageEfficiency,1)}}%</td>
                    <td class="stage_table_c4"> <div v-show="stage.stageState > 0.1" :class="getSpriteImg('up', 6)"></div></td>
                  </tr>
                </tbody>
            </table>
          </div>
        </div>
        <!-- 排版占位用卡片 -->
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
        <el-card  class="stage_card_t3" style="height:0px;margin-bottom: 0px;"></el-card>
      </div>
      <!-- t2内容区域 -->
      <div class="op_content" id="stage_t2_content">
        <div class="stage_card_t2 uni_shadow_2">
          <div v-for="(materialRankT2, index) in stageRankT2.slice(0, 6)" :key="index" class="stage_card_t2_img">
            <!-- <img :src="getImgUrl(materialRankT2[0].itemName)" :alt="materialRankT2[0].itemName" "> -->
            <div :class="getSpriteImg(materialRankT2[0].itemId,2)" :id="getCardId(index+100)" @click="showPopup(index+100)"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 地图效率End -->

    <!-- 弹窗Start -->
    <div id="popup_background" @click="hidePopup()">
      <!-- 散装标题Start -->
      <div  class="popup_card" id="popup_card">
        <!-- <img class="popup_img" :src="getImgUrl(main)" :alt="main"> -->
        <div class="popup_header" >
          <div :class="getSpriteImg(itemId, 2)" style="display:inline-block;margin:6px;"></div>
          <div class="popup_header_text">{{itemType}}</div>
          <a :href="getPenguinUrl(itemId)" target="_blank">
            <div class="t3 popup_header_penguin" style="display:flex">
               <div>查看企鹅物流原始数据 </div> 
               <div  :class="getSpriteImg('el',7)" ></div>
            </div>
          </a>
        </div>
        <!-- 散装标题End -->
        <el-divider></el-divider>
        <!-- 数据表Start -->
        <table class="popup_table">
          <tbody>
            <tr class="popup_table_title">
              <td class="popup_table_c1" style="width:55px;">关卡名</td>
              <td class="popup_table_c2" style="width:65px;">样本数<br>(置信度)</td>
              <td class="popup_table_c3" style="width:45px;">SPM</td>
              <td class="popup_table_c4" style="width:55px;">副产品</td>
              <td class="popup_table_c5" style="width:90px;">主产物掉率</td>
              <td class="popup_table_c6" style="width:90px;">主产物期望</td>
              <td class="popup_table_c7" style="width:90px;">关卡效率</td>
            </tr>
            <tr v-for="(stage, index) in popupData" :key="index" :class="getColor(stage.stageColor)" class="stage_table_r">
              <td class="popup_table_c1" :style="getHardcoreMark(stage.chapterName)">{{ stage.stageCode}}</td>
              <td class="popup_table_c2" style="font-size:14px;">{{shrinkTimes(stage.sampleSize)}}<br>({{stage.sampleConfidence}}%)</td>
              <td class="popup_table_c3">{{getEfficiency(stage.spm, 1)}}</td>
              <!-- <td class="popup_table_c4" ><img class="stage_img_secondary" :src="getImgUrl(stage.secondary)" alt=""></td> -->
              <td style="padding-left:20px;">  <div :class="getSpriteImg(stage.secondaryId, 3)"></div> </td>
              <td class="popup_table_c5">{{getEfficiency(stage.knockRating*100, 1)}}%</td>
              <td class="popup_table_c6">{{getEfficiency(stage.apExpect)}}</td>
              <td class="popup_table_c7" :style="getUpMark(stage.stageState)">{{getEfficiency(stage.stageEfficiency,1)}}%
              <!-- <td class="popup_table_c7"><div style="width:75px;display: inline;">{{getEfficiency(stage.stageEfficiency,1)}}%</div>
                <div style="width:15px;display: inline;"><img v-show="stage.stageState > 0.1" src="/img/website/up.png"></div> -->
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 数据表End -->
        <el-divider></el-divider>
        <client-only>
        <div class="popup_text f12 t1" >
          效率基准:<b>常驻图</b>中综合效率最高者<br>
          置信度:掉率对关卡效率误差影响在3%前提下的可信度范围 
          <a href="https://www.bilibili.com/video/BV1yL4y1P7K1" style="margin-left:8px;">
            <div style="display:inline-block">详细介绍</div>
            <div style="display:inline-block" :class="getSpriteImg('el', 7)" ></div>
          </a>  
        SPM:假设敌人被秒杀，1倍速下每分钟消耗的理智量，实际可能略有出入</div>
        </client-only>
      </div>

      <div  class="popup_card" id="popup_card_orundum">
        <div class="popup_header"  style="display:flex;margin-bottom: -20px;">
          <!-- <img style="display:inline-block;margin:6px;" class="popup_img" :src="getImgUrl('合成玉')" alt="合成玉"> -->
          
          <div :class="getSpriteImg(4003, 4)" ></div>
          <div class="popup_header_text" style="bottom: -8px;">搓玉一览表</div>
         
        </div>
        <!-- 散装标题End -->
        <el-divider></el-divider>
        <!-- 数据表Start -->
        <table class="popup_table">
          <tbody style="font-size:20px;">
            <tr class="popup_table_title" style="height:36px;">
              <td class="popup_table_c1" style="width:80px;">关卡名</td>
              <td class="popup_table_c2" style="width:130px;">理智转化率</td>
              <td class="popup_table_c3" style="width:140px;">每搓1抽消耗</td>
              <td class="popup_table_c5" style="width:85px;">关卡效率</td>
              <td class="popup_table_c6" style="width:85px;">搓玉效率</td>
            </tr>
            <tr style="height:36px;" v-for="(stage, index) in stageRankOrundum" :key="index"  :class="getColor(stage.stageColor)" class="stage_table_r">
              <td class="popup_table_c1" style="width:80px">{{stage.stageCode}}</td>
              <td class="popup_table_c2" style="width:130px;display:flex" >
                  <div>1</div>     
                  <div :class="getSpriteImg('AP_GAMEPLAY', 5)" ></div>
                  <div>={{stage.orundumPerAp}}</div> 
                  <div :class="getSpriteImg(4003, 5)" ></div>
              </td>   
                <!-- <img class="stage_img_secondary" src="/img/icon/图标_合成玉.png" alt="">-->
              <td class="popup_table_c3" style="width:140px;"><div style="display:flex;margin-left:15px"><div> {{stage.lMDCost}}k</div><div style="margin-left:5px" :class="getSpriteImg(4001, 5)" ></div></div></td>
              <td class="popup_table_c5" style="width:85px;"> {{stage.stageEfficiency}}%</td>
              <td class="popup_table_c6" style="width:85px;"> {{stage.orundumPerApEfficiency}}%</td>
            </tr>
          </tbody>
        </table>
        <!-- 数据表End -->
        <el-divider></el-divider>
        <div class="popup_text f12 t1">
          关卡效率:该关卡掉落物价值之和与理智消耗之比<br>
          搓玉效率:该关卡的转化率与无加成1-7的转化率之比
        </div>
      </div>
    </div>
    <!-- 弹窗End -->
  </div>
</template>




<script>
import stageApi from "@/api/stage";
import cookie from "js-cookie";

export default {
  data() {
    return {
      popupData: [], //关卡弹窗用集合
      stageRankT3: [], //关卡效率集合
      stageRankT2: [], //关卡效率集合
      stageRankOrundum: [], //关卡效率集合
      actStageOnly: 0,
      cardList:[0,1,2,3,4,5,6,7],
      itemType:'',
      updateTime:'2000-01-01 00:00:00',
      itemId:'',
      opETextTheme: "op_title_etext_light",
      
    };
  },

  components: {},

  created() {
    this.loadData();
  },

  mounted() {

  },
  methods: {
    getCookies() {
      let theme = cookie.get("theme");
      if (typeof theme == "undefined" || theme == undefined) {
        theme = "op_title_etext_light";
      }
      console.log(theme);
      this.opETextTheme = "op_title_etext_" + theme;
    },
    showPopup(index){
      document.getElementById('popup_card').style.display = "block"
      document.getElementById('popup_background').style.display = "block"
      if (index<100) {
        this.popupData = [];
        this.popupData = this.stageRankT3[index];
        this.itemType = this.stageRankT3[index][0].itemType;
        this.itemId = this.stageRankT3[index][0].itemId;
      }
      else
      {
        this.popupData = [];
        this.popupData = this.stageRankT2[(index-100)];
        this.itemType = this.stageRankT2[(index-100)][0].itemType;
        this.itemId = this.stageRankT2[(index-100)][0].itemId;
      }
    },
    showOrundumPopup(){
      document.getElementById('popup_card_orundum').style.display = "block"
      document.getElementById('popup_background').style.display = "block"
    },
    hidePopup(){
      document.getElementById('popup_card').style.display = "none"
      document.getElementById('popup_card_orundum').style.display = "none"
      document.getElementById('popup_background').style.display = "none"
    },
	  getPenguinUrl(num){
      return ("https://penguin-stats.cn/result/item/" + num);
    },
     getSpriteImg(id, index) {
      // console.log(id,index)
      if (index === 0) return "bg-" + id + " sprite_type";
      if (index === 1) return "bg-" + id + " sprite_secondary";
      if (index === 2) return "bg-" + id + " sprite_T2";
      if (index === 3) return "bg-" + id + " sprite_secondary_dialog";
      if (index === 4) return "bg-" + id + "_icon sprite_icon";
      if (index === 5) return "bg-" + id + "_icon sprite_icon_small";
      if (index === 6) return "bg-" + id + "_icon sprite_icon_up";
      if (index === 7) return "bg-" + id + "_icon sprite_icon_el";
      return "bg-" + id;
    },
    getImgUrl(img, source){
      source = (typeof source !== 'undefined') ?  type : 1;
      if (source > 2.1)
        return("https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/ activity_picture /" + img + ".png");
      if (source > 1.1)
        return ("https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/item/" + img + ".png");
      else if (source >0.1)
        return ("/img/materials/" + img + ".png");
      else
        return ("https://cdn.jsdelivr.net/gh/zirun-wang/OnePicCDN/img/" + img + ".png");
    },

    getCardBackground(url){
      return ('background: linear-gradient(rgba(144, 164, 174, 0), rgba(144, 164, 174, 0)), url(\"/img/materials/' + url + '.png\") no-repeat 85% 50% /140%;');
    },
    getEfficiency(num, acc){
      acc = (typeof acc !== 'undefined') ?  acc : 2;
      return parseFloat(num).toFixed(acc);
    },
    shrinkTimes(times){
      if (times > 9999)
        return ("9999+");
      else
        return times;
    },

    getCardId(num){
      return "stage_card" + num.toString();
    },
    getDialogId(num){
      return "detail_card" + num.toString();
    },
    getHardcoreMark(area){
      if (area == "tough_10")
        return ("background: url(" + "/static/img_website/hcbg.png" + ") no-repeat;");
      else
        return ("");
    },
    getUpMark(state){
      if (state == "1")
        return ("background: linear-gradient(#ffffff4a, rgba(144, 164, 174, 0)), url(/img/website/up.png) 106% 50% / 30% no-repeat;");
      else
        return ("");
    },
    getColor(color, dividing, tier){
      tier = (typeof tier !== 'undefined') ?  tier : 1;
      dividing = (typeof dividing !== 'undefined') ?  dividing : 4;
      if (color < 0)
        return "color_t6";
      else if(color < (dividing - 3 * tier))
        return "color_t1";
      else if (color < (dividing - 2 * tier))
        return "color_t2";
      else if (color < (dividing - 1 * tier))
        return "color_t3";		
      else if (color < dividing)
        return "color_t4";	
      else
        return "color_t5";	
    },

    getTimesColor(times){
      if (times<1000)
        return "color_t6 fb";
      else if (times<2000)
        return "color_t6";
      else
        return "";
    },

    judgeActive(index){
      if (this.stageRankT3[index][0].stageState>0.1)
        return "";
      return "display:none";
    },
    showNowActive(){
      if (this.actStageOnly % 2 == 0) {
        document.getElementById("stage_t3_content_plus").style.display = "flex";
        document.getElementById("stage_t3_content").style.display = "none";
        document.getElementById("nowActStageKey").className = "op_tag_1";
      } else {
        document.getElementById("stage_t3_content").style.display = "flex";
        document.getElementById("stage_t3_content_plus").style.display = "none";
        document.getElementById("nowActStageKey").className = "op_tag_0";
      }
      this.actStageOnly++;
    },
    
    // strPadStart(num,index){
    //   var str = num.toString
    //   console.log(str.toString().indexOf('.'))
       
    // //  if(str.toString().length<4){
    // //      return str+'0'
    // //  }

    //  return str
    // },
    loadData(){
      stageApi.findStageDateByTypeOrderByEfficiencyDesc(500).then((response) => {
        this.stageRankT3 = [];
        this.stageRankT3 = response.data;
        this.updateTime = response.data[0][0].updateTime
      });
      stageApi.findStageDateByMainOrderByExpectDesc().then((response) => {
        this.stageRankT2 = [];
        this.stageRankT2 = response.data;
      });
      stageApi.findStageDataOfOrundum().then((response) => {
        this.stageRankOrundum = [];
        this.stageRankOrundum = response.data;
      });
      this.popupData = this.stageRankT3[1];
    },
  },
};
</script>

<style scoped>
  .el-divider--horizontal {
    margin: 6px 0;
  }
</style>