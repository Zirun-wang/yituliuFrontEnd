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
          <div class="op_title_etext">
            Best levels
          </div>

          <div class="op_title_tag">
            <div id="nowActStageKey" class="op_tag_0" @click="showNowActive()">
              只显示up
            </div>
            <div class="tab_text">
            *点击卡片查看详情
            </div>
            <div class="tab_text">
            <!-- *更新时间{{ popupData}} -->
            *更新时间 2022-08-11
            </div>
          </div>
        </div>
      </div>
      <!-- t3内容区域 -->
      <div class="op_content" id="stage_t3_content">
        <!-- 基础卡 -->
        <div v-for="(materialRankT3, indexAll) in stageRankT3" :key="indexAll" class="stage_card_t3 uni_shadow_2" @click="showPopup(indexAll)">
          <div class="stage_card_t3_img" :style="getCardBackground(materialRankT3[1].main)"></div>
          <div class="stage_card_t3_table">
            <table v-for="(stage, index) in materialRankT3.slice(0, 6)" :key="index">
                <tbody>
              <tr v-show="stage.times > 100" :class="getColor(stage.color)" class="stage_table_r">
                <td class="stage_table_c1">{{ stage.stageName }}</td>
                <!-- <td class="stage_table_c2" ><img class="stage_img_secondary" :src="getImgUrl(stage.secondary)" alt=""></td> -->
                 <div class="sprite_secondary_div">
                      <div :class="getSpriteImg(stage.secondaryId, 2)"></div>
                    </div>
						    <td class="stage_table_c3">{{getEfficiency(stage.percentage,1)}}%</td>
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
      <div class="op_content" id="stage_t3_content_plus" style="display:none;">
        <!-- 扩展卡 -->
        <div v-for="(materialRankT3, index) in stageRankT3" :key="index" class="stage_card_t3 uni_shadow_2" :style="judgeActive(index)" @click="showPopup(index)">
          <div class="stage_card_t3_img" :style="getCardBackground(materialRankT3[1].main)"></div>
          <div class="stage_card_t3_table">
            <table v-for="(stage, index) in materialRankT3.slice(0, 6)" :key="index">
                <tbody>
              <tr v-show="stage.times > 100" :class="getColor(stage.color)" class="stage_table_r">
                <td class="stage_table_c1">{{ stage.stageName }}</td>
                <td class="stage_table_c2" ><img class="stage_img_secondary" :src="getImgUrl(stage.secondary)" alt=""></td>
						    <td class="stage_table_c3">{{getEfficiency(stage.percentage,1)}}%</td>
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
               <div :class="getSpriteImg(materialRankT2[0].itemId,3)" :id="getCardId(index+100)" @click="showPopup(index+100)"></div>
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
          <div :class="getSpriteImg(itemId, 3)" style="display:inline-block;margin:6px;"></div>
          <div class="popup_header_text">{{main}}</div>
          <a :href="getPenguinUrl(itemId)" target="_blank" class="popup_header_penguin">
            <div class="t3" style="float: right;margin: 24px;font-size: 18px;font-weight: 500;">查看企鹅物流原始数据</div>
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
            <td class="popup_table_c7" style="width:90px;">关卡效率<br>(百分比)</td>
          </tr>
          <tr v-for="(stage, index) in popupData" :key="index" :class="getColor(stage.color)" class="stage_table_r">
            <td class="popup_table_c1" :style="getHardcoreMark(stage.chapterName)">{{ stage.stageName}}</td>
            <td class="popup_table_c2">{{shrinkTimes(stage.times)}}<br>({{stage.confidence}}%)</td>
            <td class="popup_table_c3">{{getEfficiency(stage.spm, 1)}}</td>
            <td class="popup_table_c4" ><img class="stage_img_secondary" :src="getImgUrl(stage.secondary)" alt=""></td>
            <td class="popup_table_c5">{{getEfficiency(stage.probability*100, 1)}}%</td>
            <td class="popup_table_c6">{{getEfficiency(stage.expect)}}</td>
            <td class="popup_table_c7">{{getEfficiency(stage.percentage,1)}}%</td>
          </tr>
          </tbody>
        </table>
        <!-- 数据表End -->
        <el-divider></el-divider>
        <p style="padding:4px 8px;color:#222222;margin:0px;" class="f12 t1">置信度：掉率对关卡效率误差影响在3%前提下的可信度范围 <a href="https://www.bilibili.com/video/BV1yL4y1P7K1">详细介绍</a>
        <br>SPM:1倍速下，假设最后出现的敌人被秒杀，每分钟消耗的理智量。
        <br>受动画、网络等因素影响可能有出入，列出供参考。</p>
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
      actStageOnly: 0,
      cardList:[0,1,2,3,4,5,6,7],
      main:'',
       mainId:'',
      itemId:''
    };
  },

  components: {},

  created() {
    this.loadData();
  },

  mounted() {

  },
  methods: {
    showPopup(index){
      document.getElementById('popup_card').style.display = "block"
      document.getElementById('popup_background').style.display = "block"
      if (index<100) {
        this.popupData = [];
        this.popupData = this.stageRankT3[index];
        this.main = this.stageRankT3[index][0].type;
        this.itemId = this.stageRankT3[index][0].itemId;
      }
      else
      {
        this.popupData = [];
        this.popupData = this.stageRankT2[(index-100)];
        this.main = this.stageRankT2[(index-100)][0].itemName;
        this.itemId = this.stageRankT2[(index-100)][0].itemId;
      }
    },
    hidePopup(){
      document.getElementById('popup_card').style.display = "none"
      document.getElementById('popup_background').style.display = "none"
    },
	  getPenguinUrl(num){
      return ("https://penguin-stats.cn/result/item/" + num);
    },
     getSpriteImg(id, index) {
      if (index == 0) return "bg-" + id + " sprite_type";
      if (index == 2) return "bg-" + id + " sprite_secondary";
        if (index == 3) return "bg-" + id + " sprite_T2";
      if (index == 4) return "bg-" + id + " sprite_secondary";
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
      return ('background: linear-gradient(rgba(144, 164, 174, 0), rgba(144, 164, 174, 0)), url(\"/img/materials/' + url + '.png\") no-repeat 85% 48% /144%;');
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
      if (this.stageRankT3[index][0].percentage>101)
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

    loadData(){
      stageApi.findStageDateByTypeOrderByEfficiencyDesc(500, 0.6).then((response) => {
        this.stageRankT3 = [];
        this.stageRankT3 = response.data;
      });
      stageApi.findStageDateByMainOrderByExpectDesc().then((response) => {
        this.stageRankT2 = [];
        this.stageRankT2 = response.data;
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