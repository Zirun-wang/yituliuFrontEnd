<template>
  <div>
    <el-button @click="downloadImage()">生成图片</el-button>
    <div ref="content" class="image_size">
      <table class="pack_table" border="1">
        <tbody>
          <tr>
            <!-- <td colspan="10">仅计算抽卡性价比</td> -->
             <td colspan="10">将礼包内材料转换为理智价值后的综合性价比</td>
          </tr>

          <tr>
            
            <td colspan="3">礼包名称</td>
            <td>礼包价格</td>
            <td>抽数</td>
            <!-- <td>氪金性价比</td> -->
            <td>综合性价比</td>
            <td>源石数量</td>
            <td>合成玉数量</td>
            <td>寻访凭证数量</td>
          </tr>

          <tr
            v-for="(pack2, index) in packsPPRData.slice(0)"
            :key="index"
            :class="getColor(pack2.packType)"
            v-show="
              'permanent' !== pack2.packType ||
              '普通源石648元' === pack2.packName
            "
          >
            <td><a v-show="'limited' === pack2.packType">new </a></td>

            <td> <img class="pack_image"  :src="getPackPic(pack2.packImg, pack2.packType)" alt="" />
            </td>
            <td>{{ pack2.packName }}</td>
            <td>{{ pack2.packPrice }}元</td>
            <td>{{ getFixed(pack2.packDraw, 2) }}抽</td>
            <!-- <td>{{ getFixed(pack2.packRmbPerDraw, 2) }}元/抽</td> -->
            <td>{{ getFixed(pack2.packPPROriginium*100, 2) }}%</td>
            <td>{{ getFixed(pack2.gachaOriginium, 2) }}</td>
            <td>{{ getFixed(pack2.gachaOrundum, 2) }}</td>
            <td>
              {{ getFixed(pack2.gachaPermit + pack2.gachaPermit10 * 10, 2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import gacha_storePacksJson from "static/json/gacha_storePacks.json";
import storeApi from "@/api/store";
// import html2canvas from "html2canvas";

export default {
  layout: "poster",
  data() {
    return {
      packPPRResponse: [],
      packsPPRDataSort: [],
      packsPPRData: [],
    };
  },
  created() {
    this.getStorePackData();
  },
  mounted() {},
  methods: {
    getStorePackData() {
      storeApi.findPackStore().then((response) => {
        this.packPPRResponse = response.data;
        //  console.log(this.packPPRData.length);
        this.initData();
        // this.sortPackByPPR();
        this.sortPackByPPRPerOri()
      });
    },

    getPackPic(img, type) {
      // if(true ===this.showFlag) return '';
      // console.log(true ===this.showFlag);
      if (type === "limited") {
        return (
          "https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/pack/limited/" +
          img +
          ".png"
        );
        // return ("background:url(https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/pack/limited/" + img + ".png) 0% 0% / cover no-repeat,#444444;");
      } else
        return (
          "https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/pack/" +
          img +
          ".png"
        );
      // return ("background:url(https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/pack/" + img + ".png) 0% 0% / cover no-repeat,#444444;");
    },

    initData() {
      this.packsPPRData = [];
      this.packsPPRDataSort = [];
      for (let i = 0; i < this.packPPRResponse.length; i += 1) {
        if (this.packPPRResponse[i].packRmbPerDraw === null)
          this.packPPRResponse[i].packRmbPerDraw = 0;
        if ( this.packPPRResponse[i].packRmbPerDraw > 0 && this.packPPRResponse[i].packState == 1) {
          console.log(this.packPPRResponse[i].packName)
          this.packsPPRData.push(this.packPPRResponse[i]);
          this.packsPPRDataSort.push(this.packPPRResponse[i]);
        }
      }
    },

    getColor(type) {
      if ("limited" === type) {
        return "pack_limited";
      }
    },

    getFixed(num, acc) {
      acc = typeof acc !== "undefined" ? acc : 2;
      return parseFloat(num).toFixed(acc);
    },

    sortPackByPPR() {
      this.initData();
      for (let i = 0; i < this.packsPPRDataSort.length - 1; i += 1) {
        for (let j = 0; j < this.packsPPRDataSort.length - 1 - i; j += 1) {
          // console.log(this.packsPPRDataSort[j+1].packName,this.packsPPRDataSort[j+1].packRmbPerDraw)
          if (
            this.packsPPRDataSort[j].packRmbPerDraw >
            this.packsPPRDataSort[j + 1].packRmbPerDraw
          ) {
            const temp = this.packsPPRDataSort[j];
            this.packsPPRDataSort[j] = this.packsPPRDataSort[j + 1];
            this.packsPPRDataSort[j + 1] = temp;
          }
        }
      }
      this.packsPPRData = [];
      for (let i = 0; i < this.packsPPRDataSort.length; i += 1) {
        this.packsPPRData.push(this.packsPPRDataSort[i]);
      }
    },

    sortPackByPPRPerOri() {
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
  },
};
</script>


<style scoped>
.image_size {
  margin: 10%;
  width: auto;
  background-color: rgba(255, 255, 255, 0.7);
}

.pack_table {
  text-align: center;
  font-weight: 700;
  border-collapse: collapse;
  /* color: rgb(255, 255, 255); */
}

.pack_limited {
  color: rgb(255, 80, 80);
}

.pack_limited {
  color: rgb(255, 80, 80);
}

.pack_image {
  width: 100px;
}
</style>
