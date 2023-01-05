<template>
  <div>
    <div id="pack" name="packPpr">
      <!-- 标题区域 -->
      <div class="op_title">
        <div class="op_title_text">
          <div class="op_title_ctext">
            礼包性价比
          </div>
          <div :class=opETextTheme>
            Packs Value
          </div>
        </div>
      </div>
      <div class="op_title_tag">
        <div id="pack_switch_to_type" class="op_tag_0" @click="sortPackByType()">
          按礼包类型
        </div>
        <div id="pack_switch_to_ppr" class="op_tag_0" @click="sortPackByPPR()">
          按性价比
        </div>
        <div class="tab_text">
          *点击图片查看礼包内容
        </div>
      </div>

      <!-- 标题区域end -->

      <!-- 仅计抽卡 -->
      <div id="pack_content" style="display:flex;">
        <div id="pack_left">
          <div v-for="(pack2, index) in packsPPRData" :key="index" class="pack_unit_list">
            <div v-show="pack2.packState == 1" class="pack_unit">
              <!-- 图片部分 -->
              <div class="pack_img" :style="getPackPic(pack2.packImg, pack2.packType)"
                   @click="switchPackContent(pack2.packID, 'draw')">
                <div class="pack_img_text1">
                  {{ pack2.packShowName }} ￥{{ pack2.packPrice }}
                </div>
                <!-- 角标部分 -->
                <div class="pack_corner corner_new" v-show="pack2.packType == 'limited' ">
                  New!
                </div>
                <div class="pack_corner corner_monthly" v-show="pack2.packType == 'monthly' ">
                  每月
                </div>
                <div class="pack_corner corner_monthly" v-show="pack2.packType == 'weekly' ">
                  每周
                </div>
                <div class="pack_corner corner_once" v-show="pack2.packType == 'once' ">
                  一次
                </div>
                <div class="pack_corner corner_once" v-show="pack2.packType == 'year' ">
                  双倍
                </div>
              </div>
              <!-- 表格部分 -->
              <div class="pack_info">
                <div class="pack_info_text">
                  共{{ getEfficiency(pack2.packDraw, 1) }}抽 <br>￥{{ getEfficiency(pack2.packRmbPerDraw, 1) }}/抽
                </div>
                <div class="pack_chart">
                  <div class="pack_chart_unit" v-show="pack2.packPPRDraw >= 1.57">
                    <div class="pack_chart_unit_text">本礼包</div>
                    <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack2.packPPRDraw*100,0.75)">
                      {{ getEfficiency(pack2.packPPRDraw * 100, 0) }}%
                    </div>
                  </div>
                  <div class="pack_chart_unit">
                    <div class="pack_chart_unit_text">大月卡</div>
                    <div class="pack_chart_unit_ppr" :style="getWidth(157,0.75)">157%</div>
                  </div>
                  <div class="pack_chart_unit" v-show="pack2.packPPRDraw < 1.57 && pack2.packPPRDraw >= 1">
                    <div class="pack_chart_unit_text">本礼包</div>
                    <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack2.packPPRDraw*100,0.75)">
                      {{ getEfficiency(pack2.packPPRDraw * 100, 0) }}%
                    </div>
                  </div>
                  <div class="pack_chart_unit">
                    <div class="pack_chart_unit_text">648源石</div>
                    <div class="pack_chart_unit_ppr" :style="getWidth(100,0.75)">100%</div>
                  </div>
                  <div class="pack_chart_unit" v-show="pack2.packPPRDraw < 1">
                    <div class="pack_chart_unit_text">本礼包</div>
                    <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack2.packPPRDraw*100,0.75)">
                      {{ getEfficiency(pack2.packPPRDraw * 100, 0) }}%
                    </div>
                  </div>
                </div>
                <!-- 说明 -->
                <div class="pack_type">
                  仅计抽卡
                </div>
              </div>

              <!-- 详情部分 -->
              <div class="pack_contents" :id="getContentId(pack2.packID, 'draw')" style="display:none;">
                <div v-for="(packItem, index) in pack2.packContent" :key="index" class="pack_content_unit">
                  <div style="width:135px;">{{ packItem.packContentItem }}</div>
                  <div style="width:90px;">x{{ packItem.packContentQuantity }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 材料折合源石 -->
        <div id="pack_right">
          <div v-for="(pack3, index) in packsPPRData" :key="index" class="pack_unit">
            <div class="pack_img" :style="getPackPic(pack3.packName, pack3.packType)">
              <!-- <div class="pack_img" >  -->
              <div class="pack_img_text1">{{ pack3.packShowName }} ￥{{ pack3.packPrice }}</div>
            </div>

            <div class="pack_info">
              <div class="pack_info_text">
                {{ getEfficiency(pack3.packOriginium, 1) }}源石 <br>￥{{ getEfficiency(pack3.packRmbPerOriginium, 1) }}/石
              </div>
              <div class="pack_chart">
                <div class="pack_chart_unit" v-show="pack3.packPPROriginium >= 1.57">
                  <div class="pack_chart_unit_text">本礼包</div>
                  <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack3.packPPROriginium*100,0.75)">
                    {{ getEfficiency(pack3.packPPROriginium * 100, 0) }}%
                  </div>
                </div>
                <div class="pack_chart_unit">
                  <div class="pack_chart_unit_text">大月卡</div>
                  <div class="pack_chart_unit_ppr" :style="getWidth(157,0.75)">157%</div>
                </div>
                <div class="pack_chart_unit" v-show="pack3.packPPROriginium < 1.57 && pack3.packPPROriginium >= 1">
                  <div class="pack_chart_unit_text">本礼包</div>
                  <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack3.packPPROriginium*100,0.75)">
                    {{ getEfficiency(pack3.packPPROriginium * 100, 0) }}%
                  </div>
                </div>
                <div class="pack_chart_unit">
                  <div class="pack_chart_unit_text">648源石</div>
                  <div class="pack_chart_unit_ppr" :style="getWidth(100,0.75)">100%</div>
                </div>
                <div class="pack_chart_unit" v-show="pack3.packPPROriginium < 1">
                  <div class="pack_chart_unit_text">本礼包</div>
                  <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack3.packPPROriginium*100,0.75)">
                    {{ getEfficiency(pack3.packPPROriginium * 100, 0) }}%
                  </div>
                </div>
              </div>

            </div>

            <div class="pack_type">
              材料折合源石
            </div>
            <div class="pack_corner corner_new" v-show="pack3.packType == 'limited' ">
              New!
            </div>
            <div class="pack_corner corner_monthly" v-show="pack3.packType == 'monthly' ">
              每月
            </div>
            <div class="pack_corner corner_monthly" v-show="pack3.packType == 'weekly' ">
              每周
            </div>
            <div class="pack_corner corner_once" v-show="pack3.packType == 'once' ">
              一次
            </div>
            <div class="pack_corner corner_once" v-show="pack3.packType == 'year' ">
              双倍
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
import packsPPR from "static/json/pack_packsPPR.json";

export default {
  data() {
    return {
      opETextTheme: "op_title_etext_light",
      packsPPRJson:packsPPR,
      packsPPRData: [],
      packsPPRDataSort: [],

    };
  },
  created() {
    this.getCookies();
    this.initData();
  },
  methods: {
    getCookies() {
      var theme = cookie.get("theme");
      if (typeof theme === "undefined" || theme === undefined) {
        theme = "op_title_etext_light";
        console.log("未知")
      }
      console.log('pack', theme);
      this.opETextTheme = theme;
    },

    initData(){
      for (let i = 0; i < this.packsPPRJson.length; i += 1) {
        console.log(this.packsPPRJson[i].packName,this.packsPPRData.length)
        this.packsPPRData.push(this.packsPPRJson[i]);
        this.packsPPRDataSort.push(this.packsPPRJson[i]);
      }
    },

    sortPackByType() {
      this.packsPPRData = [];
      this.packsPPRJson.push(packsPPR[0]);
      for (let i = 0; i < this.packsPPRJson.length; i += 1) {
        console.log(this.packsPPRJson[i].packName,this.packsPPRData.length)
        this.packsPPRData.push(this.packsPPRJson[i])
      }
    },

    sortPackByPPR() {
      for (let i = 0; i < this.packsPPRDataSort.length - 1; i += 1) {
        for (let j = 0; j < this.packsPPRDataSort.length - 1 - i; j += 1) {
          if (this.packsPPRDataSort[j].packRmbPerDraw > this.packsPPRDataSort[j + 1].packRmbPerDraw) {
            const temp = this.packsPPRDataSort[j];
            this.packsPPRDataSort[j] = this.packsPPRDataSort[j + 1];
            this.packsPPRDataSort[j + 1] = temp;
          }
        }
      }

      this.packsPPRData = []
      for (let i = 0; i < this.packsPPRDataSort.length; i += 1) {
        this.packsPPRData.push(this.packsPPRDataSort[i])
      }
    },

    getWidth(num, scale) {
      return "width:" + num * scale + "px";
    },
    getEfficiency(num, acc) {
      acc = (typeof acc !== 'undefined') ? acc : 2;
      return parseFloat(num).toFixed(acc);
    },
    getPackImgUrl(img) {
      return ("/img/packs/" + img + ".png");
    },
    getPackPic(img, type) {
      if (type === 'limited') {
        if (img === '观光组合包')
          return "background:url(https://ak.hycdn.cn/announce/images/20221217/6a2c2adc22e01c531bbd8ce6d68bfe64.jpg) 75% 10%  / 200% no-repeat,#444444";
        if (img === '大帝的手提箱')
          return "background:url(https://ak.hycdn.cn/announce/images/20221021/c3f8da22f177a05be666d7b5688beda7.JPG) 40% 20%  / 500% no-repeat,#444444";
        if (img === '资深干员特训礼包')
          return "background:url(https://ak.hycdn.cn/announce/images/20221021/c3f8da22f177a05be666d7b5688beda7.JPG) 70% 20%  / 500% no-repeat,#444444";
        if (img === '调用凭证组合包')
          return "background:url(https://ak.hycdn.cn/announce/images/20221021/c3f8da22f177a05be666d7b5688beda7.JPG) 99% 20%  / 500% no-repeat,#444444";
        if (img === '特训意向礼包')
          return "background:url(https://ak.hycdn.cn/announce/images/20221021/1a4d8717d513321e2bc13c64f1f90b45.JPG) 16% 20%  / 500% no-repeat,#444444";
        if (img === '剧场之友组合包')
          return "background:url(https://ak.hycdn.cn/announce/images/20221021/1a4d8717d513321e2bc13c64f1f90b45.JPG) 57% 9% / 400% no-repeat,#444444";
        if (img === '高级特训意向礼包')
          return "background:url(https://ak.hycdn.cn/announce/images/20221021/1a4d8717d513321e2bc13c64f1f90b45.JPG) 97% 20%  / 500% no-repeat,#444444";
        if (img === '辟路芯片礼包')
          return "background:url(https://ak.hycdn.cn/announce/images/20221021/c9f1738ab94962bff14edc1dc92c098e.JPG) 24% 20%  / 400% no-repeat,#444444";
        if (img === '斩荆芯片礼包')
          return "background:url(https://ak.hycdn.cn/announce/images/20221021/c9f1738ab94962bff14edc1dc92c098e.JPG) 85% 20%  / 400% no-repeat,#444444";
        return "";
      } else
        return ("background:url(/img/packs/" + img + ".png) 00% 110% / cover no-repeat,#444444;");
    },
    getContentId(id, type) {
      return (type + "_" + id)
    },

    switchPackContent(id, type) {
      if (document.getElementById(type + '_' + id).style.display == "none")
        document.getElementById(type + '_' + id).style.display = "flex";
      else
        document.getElementById(type + '_' + id).style.display = "none";
    }

  },
};
</script>

<style>

#pack_content {
  /* background-color: rgb(43,72,101); */
  padding: 20px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around
}

.pack_unit {
  margin: 20px 0px;
  width: 522px;
  /* height: 120px; */
  /* overflow: hidden; */
}

.pack_img {
  width: 160px;
  height: 120px;
  position: absolute;
  /* display: inline-block; */
  /* z-index: 20; */
  /* vertical-align: top; */
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.pack_img_text1 {
  position: relative;
  top: 93px;
  width: 160px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.6902);
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-align: center;
  padding-top: 3px;
  border-radius: 0px 0px 8px 8px;
}

.pack_corner {
  transform: rotate(-35deg);
  width: 96px;
  top: -18px;
  left: -28px;
  position: relative;
  color: white;
  text-align: center;
  font-size: 14px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.pack_info {
  display: inline-block;
  z-index: 10;
  height: 108px;
  width: 360px;
  background-color: #000000cc;
  margin: 6px 0px 6px 156px;
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.pack_info_text {
  width: 96px;
  padding: 18px 0px 18px 4px;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  color: #6ed7ff;
  display: inline-block;
  line-height: 36px;
  vertical-align: top;
}

.t1 {
  color: #c59447;
}

.pack_chart {
  display: inline-block;
  margin-top: 18px;
  width: 240px;
  /* padding: 10px 0px; */
  border-left: 1px solid #d0d0d0;
  white-space: nowrap;
  overflow: hidden;
}

.pack_chart_unit_text {
  display: inline-block;
  padding: 0px 2px;
  width: 66px;
  /* background-color: burlywood; */
  border-radius: 6px;
  /* margin: 0px 0px 0px 0px; */
  vertical-align: middle;
  text-align: center;
  font-size: 16px;
  color: wheat;
  height: 24px;
}

.pack_chart_unit_ppr {
  display: inline-block;
  background-color: rgb(56, 112, 161);
  color: white;
  font-size: 12px;
  border-radius: 16px;
  padding: 0px 8px;
}

.pack_type {
  display: inline-block;
  color: gray;
  position: relative;
  /* text-align: right; */
  float: right;
  right: 12px;
  bottom: 28px;
  font-size: 14px;
}

.pack_contents {
  display: flex;
  width: 474px;
  flex-direction: row;
  flex-wrap: wrap;
  background: rgba(34, 34, 34, 0.13333);
  padding: 16px 0px 4px 16px;
  margin: -12px 0px 0px 12px;
  font-size: 18px;
  border-radius: 4px;
  box-shadow: 1px 1px 4px rgb(0 0 0 / 30%);
}

.pack_content_unit {
  width: 232px;
  height: 28px;
  display: flex;
}

.corner_new {
  background: brown;
}

.corner_monthly {
  background: indigo;
}

.corner_once {
  background: #bf7c00;
}

.bg_red {
  background-color: rgb(250, 83, 83);
}

</style>

