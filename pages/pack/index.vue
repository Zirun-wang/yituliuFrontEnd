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
          礼包类型排序
        </div>
        <div id="pack_switch_to_ppr" class="op_tag_0" @click="sortPackByPPR()">
          性价比排序(仅抽卡)
        </div>
        <div id="pack_switch_to_ppr" class="op_tag_0" @click="sortPackByPrice()">
          性价比排序(总价值)
        </div>
        <div id="pack_switch_to_ppr" class="op_tag_0" @click="packfilterByType(1)">
          隐藏一次性礼包
        </div>
        <div id="pack_switch_to_ppr" class="op_tag_0" @click="packfilterByType(2)">
          隐藏除普通648外源石档位
        </div>
        <div class="tab_text">
          *点击图片查看礼包内容
        </div>
      </div>

      <!-- 标题区域end -->


      <div id="pack_content" style="display:flex;">
        <!-- 仅计抽卡 -->
        <div id="pack_left">
          <div v-for="(pack2, index) in packsPPRData" :key="index" class="pack_unit_list">
            <div v-show="pack2.packState == 1&&!FilterCriteria.includes(pack2.packType)" class="pack_unit">
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
                  共{{ getFixed(pack2.packDraw, 1) }}抽 <br>￥{{ getFixed(pack2.packRmbPerDraw, 1) }}/抽
                </div>
                <div class="pack_chart">
                  <div class="pack_chart_unit" v-show="pack2.packPPRDraw >= 1.57">
                    <div class="pack_chart_unit_text">本礼包</div>
                    <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack2.packPPRDraw*100,0.75)">
                      {{ getFixed(pack2.packPPRDraw * 100, 0) }}%
                    </div>
                  </div>
                  <div class="pack_chart_unit">
                    <div class="pack_chart_unit_text">大月卡</div>
                    <div class="pack_chart_unit_ppr" :style="getWidth(157,0.75)">157%</div>
                  </div>
                  <div class="pack_chart_unit" v-show="pack2.packPPRDraw < 1.57 && pack2.packPPRDraw >= 1">
                    <div class="pack_chart_unit_text">本礼包</div>
                    <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack2.packPPRDraw*100,0.75)">
                      {{ getFixed(pack2.packPPRDraw * 100, 0) }}%
                    </div>
                  </div>
                  <div class="pack_chart_unit">
                    <div class="pack_chart_unit_text">648源石</div>
                    <div class="pack_chart_unit_ppr" :style="getWidth(100,0.75)">100%</div>
                  </div>
                  <div class="pack_chart_unit" v-show="pack2.packPPRDraw < 1">
                    <div class="pack_chart_unit_text">本礼包</div>
                    <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack2.packPPRDraw*100,0.75)">
                      {{ getFixed(pack2.packPPRDraw * 100, 0) }}%
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
                <div class="pack_content_unit0" style="width:112px;">
                  <div style="width:56px;">源石</div>
                  <div style="width:56px;">x{{ pack2.gachaOriginium }}</div>
                </div>
                <div class="pack_content_unit0" style="width:120px;">
                  <div style="width:60px;">合成玉</div>
                  <div style="width:60px;">x{{ pack2.gachaOrundum }}</div>
                </div>
                <div class="pack_content_unit0">
                  <div style="width:56px;">单抽</div>
                  <div style="width:60px;">x{{ pack2.gachaPermit }}</div>
                </div>
                <div class="pack_content_unit0">
                  <div style="width:56px;">十连</div>
                  <div style="width:60px;">x{{ pack2.gachaPermit10 }}</div>
                </div>
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
          <div v-for="(pack3, index) in packsPPRData" :key="index" class="pack_unit_list">
            <div v-show="pack3.packState == 1&&!FilterCriteria.includes(pack3.packType)" class="pack_unit">
              <!-- 图片部分 -->
              <div class="pack_img" :style="getPackPic(pack3.packImg, pack3.packType)"
                   @click="switchPackContent(pack3.packID, 'all')">
                <div class="pack_img_text1">{{ pack3.packShowName }} ￥{{ pack3.packPrice }}</div>
                <!-- 角标部分 -->
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

              <!-- 表格部分 -->
              <div class="pack_info">
                <div class="pack_info_text">
                  {{ getFixed(pack3.packOriginium, 1) }}源石 <br>￥{{ getFixed(pack3.packRmbPerOriginium, 1) }}/石
                </div>
                <div class="pack_chart">
                  <div class="pack_chart_unit" v-show="pack3.packPPROriginium >= 1.57">
                    <div class="pack_chart_unit_text">本礼包</div>
                    <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack3.packPPROriginium*100,0.75)">
                      {{ getFixed(pack3.packPPROriginium * 100, 0) }}%
                    </div>
                  </div>
                  <div class="pack_chart_unit">
                    <div class="pack_chart_unit_text">大月卡</div>
                    <div class="pack_chart_unit_ppr" :style="getWidth(157,0.75)">157%</div>
                  </div>
                  <div class="pack_chart_unit" v-show="pack3.packPPROriginium < 1.57 && pack3.packPPROriginium >= 1">
                    <div class="pack_chart_unit_text">本礼包</div>
                    <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack3.packPPROriginium*100,0.75)">
                      {{ getFixed(pack3.packPPROriginium * 100, 0) }}%
                    </div>
                  </div>
                  <div class="pack_chart_unit">
                    <div class="pack_chart_unit_text">648源石</div>
                    <div class="pack_chart_unit_ppr" :style="getWidth(100,0.75)">100%</div>
                  </div>
                  <div class="pack_chart_unit" v-show="pack3.packPPROriginium < 1">
                    <div class="pack_chart_unit_text">本礼包</div>
                    <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack3.packPPROriginium*100,0.75)">
                      {{ getFixed(pack3.packPPROriginium * 100, 0) }}%
                    </div>
                  </div>
                </div>
                <!-- 说明 -->
                <div class="pack_type">
                  材料折合源石
                </div>
              </div>

              <!-- 详情部分 -->
              <div class="pack_contents" :id="getContentId(pack3.packID, 'all')" style="display:none;">
                <div class="pack_content_unit0" style="width:112px;">
                  <div style="width:56px;">源石</div>
                  <div style="width:56px;">x{{ pack3.gachaOriginium }}</div>
                </div>
                <div class="pack_content_unit0" style="width:120px;">
                  <div style="width:60px;">合成玉</div>
                  <div style="width:60px;">x{{ pack3.gachaOrundum }}</div>
                </div>
                <div class="pack_content_unit0">
                  <div style="width:56px;">单抽</div>
                  <div style="width:60px;">x{{ pack3.gachaPermit }}</div>
                </div>
                <div class="pack_content_unit0">
                  <div style="width:56px;">十连</div>
                  <div style="width:60px;">x{{ pack3.gachaPermit10 }}</div>
                </div>
                <div v-for="(packItem, index) in pack3.packContent" :key="index" class="pack_content_unit">
                  <div style="width:135px;">{{ packItem.packContentItem }}</div>
                  <div style="width:90px;">x{{ packItem.packContentQuantity }}</div>
                </div>
              </div>


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
import storeApi from "@/api/store";


export default {
  data() {
    return {
      // packsPPRData:页面直接调用的数据
      // packsPPRJson:缓冲区
      // packsPPR:原始数据
      // packsPPRDataSort:排序用缓冲区
      opETextTheme: "op_title_etext_light",
      packPPRResponse: [],
      packsPPRJson: packsPPR,
      packsPPRData: [],
      packsPPRDataSort: [],
      FilterCriteria :[],
      filter1:true,
      filter2:true,
    };
  },
  created() {
    this.getCookies();

    this.getStorePackData();
  },
  methods: {
    getCookies() {
      let theme = cookie.get("theme");
      if (typeof theme == "undefined" || theme === undefined) {
        theme = "op_title_etext_light";
      }
      console.log('pack', theme);
      this.opETextTheme = "op_title_etext_" + theme;
    },
     
    packfilterByType(filter){
      this.FilterCriteria = [];
      let filter1List = [];
      let filter2List = [];
        if(filter===1&&this.filter1){
           filter1List =['once'];
          this.filter1= false;
        }else{
          this.filter1= true;
        }
        if(filter===2&&this.filter2){
           filter2List =['permanent','year'];
          this.filter2= false;
        }else{
          this.filter2= true;
        }

        this.FilterCriteria.push.apply(this.FilterCriteria,filter1List);
        this.FilterCriteria.push.apply(this.FilterCriteria,filter2List)
    },
    getStorePackData() {
      storeApi.findPackStore().then((response) => {
        this.packPPRResponse = response.data;
        //  console.log(this.packPPRData.length);
        this.initData();
      });
    },

    initData() {
      this.packsPPRData = [];
      this.packsPPRDataSort = [];
     
      for (let i = 0; i < this.packPPRResponse.length; i += 1) {
        this.packsPPRData.push(this.packPPRResponse[i]);
        this.packsPPRDataSort.push(this.packPPRResponse[i]);
      }
    },

    sortPackByType() {
      this.initData();
      
    },

    sortPackByPPR() {
      this.initData();
     
      for (let i = 0; i < this.packsPPRDataSort.length - 1; i += 1) {
        for (let j = 0; j < this.packsPPRDataSort.length - 1 - i; j += 1) {
          console.log(this.packsPPRDataSort[j].packName,this.packsPPRDataSort[j].packRmbPerDraw,this.packsPPRDataSort[j].packRmbPerDraw!='null')
          // console.log(this.packsPPRDataSort[j+1].packName,this.packsPPRDataSort[j+1].packRmbPerDraw)
          if (this.packsPPRDataSort[j].packRmbPerDraw > this.packsPPRDataSort[j + 1].packRmbPerDraw &&this.packsPPRDataSort[j+1].packRmbPerDraw !=null) {
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


    sortPackByPrice() {
      this.initData();
      
      for (let i = 0; i < this.packsPPRDataSort.length - 1; i += 1) {
        for (let j = 0; j < this.packsPPRDataSort.length - 1 - i; j += 1) {
          if (this.packsPPRDataSort[j].packRmbPerOriginium > this.packsPPRDataSort[j + 1].packRmbPerOriginium) {
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

     sortPackById() {
      for (let i = 0; i < this.packsPPRDataSort.length - 1; i += 1) {
        for (let j = 0; j < this.packsPPRDataSort.length - 1 - i; j += 1) {
          if (this.packsPPRDataSort[j].packID > this.packsPPRDataSort[j + 1].packID) {
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
    getFixed(num, acc) {
      acc = (typeof acc !== 'undefined') ? acc : 2;
      return parseFloat(num).toFixed(acc);
    },
    getPackImgUrl(img) {
      return ("/img/packs/" + img + ".png");
    },


    getPackPic(img, type) {
      
      if (type === 'limited') {
       
       return ("background:url(https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/pack/limited/" + img + ".png) 0% 0% / cover no-repeat,#444444;");
      } 
      else
        return ("background:url(https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/pack/" + img + ".png) 0% 0% / cover no-repeat,#444444;");
        
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

#pack {
  background-color: #eeeeee;
}

#pack_content {
  /* background-color: rgb(43,72,101); */
  padding: 0px 0px;
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
  vertical-align: bottom;
}

.pack_content_unit0 {
  width: 116px;
  height: 32px;
  display: flex;
  font-weight: 600;
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

