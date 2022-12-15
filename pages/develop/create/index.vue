<template>
  <div>
    <table border="0" class="pack-table">
      <tbody>
      <tr class="title—tr">
        <td>礼包名称</td>
        <td>礼包显示名称</td>
        <td>礼包图片名称</td>
        <td>礼包类型</td>
        <td>礼包ID</td>
        <td>礼包状态</td>
        <td>售价</td>
        <td>抽数</td>
        <td>源石数</td>
        <td>抽卡单价</td>
        <td>源石单价</td>
        <td>抽卡性价比百分比</td>
        <td>总体性价比百分比</td>
        <td>礼包备注</td>
        <td>合成玉</td>
        <td>源石</td>
        <td>单抽</td>
        <td>十连</td>
        <td>礼包内容</td>
      </tr>
      <tr v-for="index in 15" :key="index" class="title—tr">
        <td><input type="text" class="input_item" v-model="packName[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packShowName[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packImg[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packType[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packID[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packState[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packPrice[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packDraw[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packOriginium[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packRmbPerDraw[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packRmbPerOriginium[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packPPRDraw[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packPPROriginium[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="packRemark[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="gachaOrundum[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="gachaOriginium[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="gachaPermit[index-1]"/></td>
        <td><input type="text" class="input_item" v-model="gachaPermit10[index-1]"/></td>
        <td class="">
          <div class="div-Content">
            <div v-for="count in 15" :key="count" class="div-item">
              <input type="text" class="input_item" v-model="packContent_item[index-1][count-1]"/>
              <input type="text" class="input_item" v-model="packContent_count[index-1][count-1]"/>
            </div>
          </div>
        </td>
      </tr>

      </tbody>
    </table>
    <el-button @click="setJson">创建Json</el-button>
    <el-button @click="creatdJson">生成json</el-button>
    <el-button ><a href="https://houduan.yituliu.site/tool/building/schedule/export?uid=111111111">下载json</a> </el-button>
  </div>
</template>

<script>
  import buildingApi from "@/api/building";
  import packTestJson from "static/RecycleBin/packTest.json";


  export default {
    layout: "poster",
    data() {
      return {
        packName: [1, 1, 1],
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
        packContent_item: [
          [1, 1, 1, 1, 1, 1],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
        ],
        packContent_count: [
          [1, 1, 1, 1, 1, 1],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
        ],
        packJson: {}
      };
    },
    created() {
      this.getJson();
    },
    methods: {
      creatdJson() {
        buildingApi.maaBuildingJsonCreated(this.packJson, 111111111).then((response) => {

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
          map.packID = this.packID[i];
          map.packState = this.packState[i];
          map.packPrice = this.packPrice[i];
          map.packDraw = this.packDraw[i];
          map.packOriginium = this.packOriginium[i];
          map.packRmbPerDraw = this.packRmbPerDraw[i];
          map.packRmbPerOriginium = this.packRmbPerOriginium[i];
          map.packPPRDraw = this.packPPRDraw[i];
          map.packPPROriginium = this.packPPROriginium[i];
          map.packRemark = this.packRemark[i];
          map.gachaOrundum = this.gachaOrundum[i];
          map.gachaOriginium = this.gachaOriginium[i];
          map.gachaPermit = this.gachaPermit[i];
          map.gachaPermit10 = this.gachaPermit10[i];

          let content = [];
          for (let j = 0; j < this.packContent_item[i].length; j++) {
            var content_item = {}
            content_item.packContentItem = this.packContent_item[i][j];
            content_item.packContentQuantity = this.packContent_count[i][j];
            content.push(content_item);
          }
          map.packContent = content;

          list.push(map);
        }
        this.packJson = list;
        console.log(list);
      },


      getJson() {

        for (let i = 0; i < packTestJson.length; i++) {
          // if("礼包"== packName[i]) break;
          this.packName[i] = packTestJson[i].packName;
          this.packShowName[i] = packTestJson[i].packShowName;
          this.packImg[i] = packTestJson[i].packImg;
          this.packType[i] = packTestJson[i].packType;
          this.packID[i] = packTestJson[i].packID;
          this.packState[i] = packTestJson[i].packState;
          this.packPrice[i] = packTestJson[i].packPrice;
          this.packDraw[i] = packTestJson[i].packDraw;
          this.packOriginium[i] = packTestJson[i].packOriginium;
          this.packRmbPerDraw[i] = packTestJson[i].packRmbPerDraw;
          this.packRmbPerOriginium[i] = packTestJson[i].packRmbPerOriginium;
          this.packPPRDraw[i] = packTestJson[i].packPPRDraw;
          this.packPPROriginium[i] = packTestJson[i].packPPROriginium;
          this.packRemark[i] = packTestJson[i].packRemark;
          this.gachaOrundum[i] = packTestJson[i].gachaOrundum;
          this.gachaOriginium[i] = packTestJson[i].gachaOriginium;
          this.gachaPermit[i] = packTestJson[i].gachaPermit;
          this.gachaPermit10[i] = packTestJson[i].gachaPermit10;
          console.log(packTestJson[i].packContent == undefined)
          if (packTestJson[i].packContent != undefined) {
            let content = packTestJson[i].packContent;
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


  /* .pack-table {
    border-collapse: collapse;
  } */

  .title—tr {
    display: block;
    width: auto;
    border-bottom: solid rgb(0, 0, 0) 1px;
    margin-bottom: 10px;
  }

  .title—tr td {
    width: 78px;
  }

  .input_item {
    width: 70px;
  }

  .div-Content {
    height: 100px;
    overflow: auto;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  .div-item {
    display: flex;
  }
</style>
