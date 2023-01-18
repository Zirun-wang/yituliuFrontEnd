<template>
  <div>
    <el-button @click="creatdJson">生成json</el-button>

    <table border="0" class="pack-table">
      <tbody>
      <tr class="title—tr">
        <td class="long-td">礼包名称</td>
        <td class="long-td">礼包显示名称</td>
        <td class="long-td">礼包图片名称</td>
        <td class="long-short">礼包类型</td>
        <td class="long-short">礼包ID</td>
        <td class="long-short">礼包状态</td>
        <td class="long-short">售价</td>
        <!-- <td class="long-short">抽数</td>
        <td class="long-short">源石数</td>
        <td class="long-short">抽卡单价</td>
        <td class="long-short">源石单价</td>
        <td class="long-short">抽卡性价比</td>
        <td class="long-short">总体性价比</td> -->
        <td class="long-short">合成玉</td>
        <td class="long-short">源石</td>
        <td class="long-short">单抽</td>
        <td class="long-short">十连</td>
        <td class="">备注</td>
        <td >礼包内容</td>
      </tr>
      <tr v-for="index in packPPRDataLength" :key="index" class="title—tr" >
        <td><input type="text" class="input_long" v-model="packName[index-1]"/></td>
        <td><input type="text" class="input_long" v-model="packShowName[index-1]"/></td>
        <td><input type="text" class="input_long" v-model="packImg[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packType[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="packID[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="packState[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="packPrice[index-1]"/></td>
        <!-- <td><input type="text" class="input_short" v-model="packDraw[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packOriginium[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packRmbPerDraw[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packRmbPerOriginium[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packPPRDraw[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packPPROriginium[index-1]"/></td> -->
        <td><input type="text" class="input_short" v-model.number="gachaOrundum[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="gachaOriginium[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="gachaPermit[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="gachaPermit10[index-1]"/></td>
        <td><input type="text" class="" v-model="packTag[index-1]"/></td>
        <td>
          <div class="div-Content">
            <div v-for="count in 12" :key="count" class="div-item">
             <div><input type="text" class="input_content" v-model="packContent_item[index-1][count-1]"/></div>
             <div><input type="text" class="input_content" v-model.number="packContent_count[index-1][count-1]"/></div>
            </div>
          </div>
        </td>

      </tr>


      </tbody>
    </table>


  </div>
</template>

<script>
import toolApi from "@/api/tool";
import packTestJson from "static/RecycleBin/packTest.json";
import storeApi from "@/api/store";

export default {
  layout: "poster",
  data() {
    return {
      packPPRDataLength: 0,
      packPPRData:[],
      packName: [],
      packShowName: [],
      packImg: [],
      packType: [],
      packID: [],
      packState: [],
      packPrice: [],
      packDraw: [],
      packOriginium: [],
      packRmbPerDraw: [],
      packRmbPerOriginium: [],
      packPPRDraw: [],
      packPPROriginium: [],
      packRemark: [],
      gachaOrundum: [],
      gachaOriginium: [],
      gachaPermit: [],
      gachaPermit10: [],
      packTag:[],
      packContent_item: [],
      packContent_count: [],
      packJson: {}
    };
  },
  created() {
    this.getStorePackData();
  },
  methods: {
    getNumber(num, acc) {
      acc = (typeof acc !== 'undefined') ? acc : 2;
      return parseFloat(num).toFixed(acc);
    },

    sleep(d) {
      return new Promise((resolve) => setTimeout(resolve, d));
    },

    getStorePackData() {
      storeApi.findPackStore().then((response) => {
           this.packPPRData = response.data;
          //  console.log(this.packPPRData.length);
           this.readJson();
      });
    },

    async creatdJson() {
      this.setJson();
      await this.sleep(700);
      toolApi.createStorePackJson(this.packJson).then((response) => {
        this.$message({
          message: '创建成功',
          type: "success",
          showClose: true,
          duration: 4000,
        });
      });
    },

    setJson() {
      let list = [];
      for (let i = 0; i < this.packName.length; i++) {
        // if("礼包"== packName[i]) break;
        let map = {};
        map.packName = this.packName[i];
        map.packShowName = this.packShowName[i];
        map.packImg = this.packImg[i];
        map.packType = this.packType[i];
        map.packID = parseInt(this.packID[i]);
        map.packState = parseInt(this.packState[i]);
        map.packPrice = parseInt(this.packPrice[i]);
        map.packDraw = this.packDraw[i];
        map.packOriginium = this.packOriginium[i];
        map.packRmbPerDraw = this.packRmbPerDraw[i];
        map.packRmbPerOriginium = this.packRmbPerOriginium[i];
        map.packPPRDraw = this.packPPRDraw[i];
        map.packPPROriginium = this.packPPROriginium[i];
        map.packRemark = this.packRemark[i];
        map.gachaOrundum = parseInt(this.gachaOrundum[i]);
        map.gachaOriginium = parseInt(this.gachaOriginium[i]);
        map.gachaPermit = parseInt(this.gachaPermit[i]);
        map.gachaPermit10 = parseInt(this.gachaPermit10[i]);
        map.packTag = this.packTag[i];

        let content = [];
        for (let j = 0; j < this.packContent_item[i].length; j++) {
          var content_item = {}
          content_item.packContentItem = this.packContent_item[i][j];
          content_item.packContentQuantity = this.packContent_count[i][j];
          if (this.packContent_item[i][j] != undefined && this.packContent_item[i][j] != "") {
          content.push(content_item);
          }
        }

        console.log("礼包", i, this.packContent_item[i][0] != undefined);
        console.log("礼包", i, this.packContent_item[i][0] != "");

        if (this.packContent_item[i][0] != undefined && this.packContent_item[i][0] != "") {
          map.packContent = content;
        }

        if(this.packName[i] != undefined && this.packName[i] != "")
        list.push(map);
      }
      this.packJson = list;
      console.log(list);
    },


    readJson() {
      this.packPPRDataLength = this.packPPRData.length + 7;
      for (let i = 0; i < this.packPPRDataLength+1; i++) {
      this.packContent_item.push([]);
      this.packContent_count.push([]);
      }
      console.log("当前长度：", this.packPPRDataLength)
      for (let i = 0; i < this.packPPRData.length; i++) {
        // if("礼包"== packName[i]) break;
        this.packName[i] = this.packPPRData[i].packName;
        this.packShowName[i] = this.packPPRData[i].packShowName;
        this.packImg[i] = this.packPPRData[i].packImg;
        this.packType[i] = this.packPPRData[i].packType;
        this.packID[i] = this.packPPRData[i].packID;
        this.packState[i] = this.packPPRData[i].packState;
        this.packPrice[i] = this.packPPRData[i].packPrice;
        this.packDraw[i] = this.packPPRData[i].packDraw;
        this.packOriginium[i] = this.packPPRData[i].packOriginium;
        this.packRmbPerDraw[i] = this.packPPRData[i].packRmbPerDraw;
        this.packRmbPerOriginium[i] = this.packPPRData[i].packRmbPerOriginium;
        this.packPPRDraw[i] = this.packPPRData[i].packPPRDraw;
        this.packPPROriginium[i] = this.packPPRData[i].packPPROriginium;
        this.packRemark[i] = this.packPPRData[i].packRemark;
        this.gachaOrundum[i] = this.packPPRData[i].gachaOrundum;
        this.gachaOriginium[i] = this.packPPRData[i].gachaOriginium;
        this.gachaPermit[i] = this.packPPRData[i].gachaPermit;
        this.gachaPermit10[i] = this.packPPRData[i].gachaPermit10;
        this.packTag[i] = this.packPPRData[i].packTag;
        console.log(this.packPPRData[i].packContent == undefined)
        if (this.packPPRData[i].packContent != undefined) {
          let content = this.packPPRData[i].packContent;
          for (let j = 0; j < content.length; j++) {
            this.packContent_item[i][j] = content[j].packContentItem;
            this.packContent_count[i][j] = content[j].packContentQuantity;
          }
        }

      }


    },
  },
};
</script>


<style scoped>


.pack-table {
  /* border-collapse: collapse; */
  border-spacing: 0 20px;
}

.title—tr td {
  /* border: solid rgb(0, 0, 0) 1px; */
  text-align: center;
  position: sticky !important;
  top: 0 !important;
  z-index: 1 !important;
}

.short-td {
  width: 50px;
}

.input_short {
  width: 35px;
}

.long-td {
  width: 110px;
}

.input_long {
  width: 110px;
}
.input_long {
  width: 110px;
}

.input_content{
  width: 80px;
}

.div-Content {
  /* height: 50px; */
  overflow: auto;
  scrollbar-width: none;
  /* firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
   display: flex;
  flex-direction:row;
}

.div-item {
  display: flex;
  flex-direction:column;

}
</style>
