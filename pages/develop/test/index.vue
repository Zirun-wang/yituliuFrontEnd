<template>
  <div>
    <div class="item_card">
      <div
        v-for="(item, index) in itemList"
        :key="index"
        v-show="item.cardNum < 8 && item.cardNum > 1"
      >
        <img class="item_size" :src="getImage(item.itemName)" alt="" />
      </div>
    </div>

    <div class="title-image">
      <span>全干员</span><br>
      <span><a class="title1"> 蓝材料</a>需求统计</span><br>
      <span>截止照我以火</span>
    </div>
    <div class="char-image"> <img src="/img/back/char_1020_reed2_1b.png" ></div>
  </div>
</template>

<script>
import storeApi from "@/api/store";

export default {
  layout: "poster",
  data() {
    return {
      itemList: [],
    };
  },
  created() {
    this.findAllItemValue();
  },
  methods: {
    findAllItemValue() {
      storeApi.findAllItem('auto0.625').then((response) => {
        this.itemList = [];
        this.itemList = response.data;
      });
    },
    getImage(name) {
      return "/img/materials-bak/" + name + ".png";
    },
  },
};
</script>

<style scoped>
.item_card {
  display: flex;
  background-color: white;
  width: 1280px;
  height: 720px;
  margin: 5%;
  flex-wrap: wrap;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(~static/img/back/ep11.png) no-repeat 50% 50% /cover;
  background-size: 1300px;
  /* opacity: 0.7; */
}
.item_size {
  margin: 5px;
  width: 105px;
  opacity: 0.7;
}

.title-image {
  /* background-color: rgb(180, 180, 180); */
  color: #F7AD41;
  margin-top: -700px;
  margin-left: 120px;
  width: 990px;
  font-size: 96px;
  text-shadow: 10px 10px 10px #000000;
  -webkit-text-stroke: 4px #000000;
  letter-spacing: 1px;
  font-weight: 700;
  /* font-family: STXingkai; */
  position: relative;
  z-index: 99;
}

.title1{
  color: rgb(0, 132, 255);
}

.char-image{
  position: relative;
  z-index: 90;
  margin-top: -650px;
  margin-left: 500px;
}
</style>