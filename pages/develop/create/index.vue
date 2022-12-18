<template>
  <div>
     <el-button @click="creatdJson">生成json</el-button>
    <el-button ><a href="https://backend.yituliu.site/file/export/store/pack/json?uid=1111">下载json</a> </el-button>
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
        <td class="long-short">抽数</td>
        <td class="long-short">源石数</td>
        <td class="long-short">抽卡单价</td>
        <td class="long-short">源石单价</td>
        <td class="long-short">抽卡性价比</td>
        <td class="long-short">总体性价比</td>
        <td class="long-short">合成玉</td>
        <td class="long-short">源石</td>
        <td class="long-short">单抽</td>
        <td class="long-short">十连</td>
        <td>礼包内容</td>
      </tr>
      <tr v-for="index in packTestJsonLength" :key="index" class="title—tr">
        <td><input type="text" class="input_long" v-model="packName[index-1]"/></td>
        <td><input type="text" class="input_long" v-model="packShowName[index-1]"/></td>
        <td><input type="text" class="input_long" v-model="packImg[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packType[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="packID[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="packState[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="packPrice[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packDraw[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packOriginium[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packRmbPerDraw[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packRmbPerOriginium[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packPPRDraw[index-1]"/></td>
        <td><input type="text" class="input_short" v-model="packPPROriginium[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="gachaOrundum[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="gachaOriginium[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="gachaPermit[index-1]"/></td>
        <td><input type="text" class="input_short" v-model.number="gachaPermit10[index-1]"/></td>
        <td >
          <div class="div-Content">
            <div v-for="count in 15" :key="count" class="div-item">
              <input type="text" class="input_long" v-model="packContent_item[index-1][count-1]"/>
              <input type="text" class="input_long" v-model.number="packContent_count[index-1][count-1]"/>
            </div>
          </div>
        </td>
       
      </tr>
      

      </tbody>
    </table>

   
  </div>
</template>

<script>
  import buildingApi from "@/api/building";
  import packTestJson from "static/RecycleBin/packTest.json";


  export default {
    layout: "poster",
    data() {
      return {
        packTestJsonLength:20,
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
        packContent_item: [
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
          [],
        ],
        packContent_count: [
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
          [],
        ],
        packJson: {}
      };
    },
    created() {
      this.getJson();
    },
    methods: {
      getNumber(num, acc){
        acc = (typeof acc !== 'undefined') ?  acc : 2;
        return parseFloat(num).toFixed(acc);
      },
       sleep(d) {
      return new Promise((resolve) => setTimeout(resolve, d));
       },
      async creatdJson() {
        this.setJson();
        await this.sleep(1500);
        buildingApi.maaBuildingJsonCreated(this.packJson, 1111).then((response) => {
                this.$message({
            message: response.data.message + "生成id为：" + response.data.uid,
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
           
        
          let content = [];
          for (let j = 0; j < this.packContent_item[i].length; j++) {
            var content_item = {}
            content_item.packContentItem = this.packContent_item[i][j];
            content_item.packContentQuantity = this.packContent_count[i][j];
            content.push(content_item);
          }
           
           console.log("礼包",i,this.packContent_item[i][0]!=undefined);
            console.log("礼包",i,this.packContent_item[i][0]!="");

          if(this.packContent_item[i][0]!=undefined&&this.packContent_item[i][0]!=""){
              map.packContent = content;
          }
          
          

          list.push(map);
        }
        this.packJson = list;
        console.log(list);
      },


      getJson() {
         this.packTestJsonLength = packTestJson.length;
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


  .pack-table {
    /* border-collapse: collapse; */
    border-spacing:0 20px;
  }

  .title—tr td{
    /* border: solid rgb(0, 0, 0) 1px; */
    text-align: center;
  }

  .short-td {
    width: 50px;
  }
  .input_short {
    width: 50px;
  }

  .long-td {
    width: 110px;
  }

  .input_long {
    width: 110px;
  }

  .div-Content {
    height: 80px;
    overflow: auto;
    scrollbar-width: none; 
    /* firefox */
    -ms-overflow-style: none; 
    /* IE 10+ */
  }

  .div-item {
    display: flex;
  }
</style>
