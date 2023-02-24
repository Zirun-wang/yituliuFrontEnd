<template>
<div class="main">
  <div class="cover">
    <div class="title">
      <span>&emsp;&emsp;&nbsp;新材料加入后</span><br />
      <span>截止《春分》</span><br />
      <span>全干员</span>
      <span><a class="title1"> 蓝材料</a>需求统计</span><br />
    </div>
    <img class="item_size1" :src="getImage('转质盐组')" alt="" />
    <div class="item_card">
      <div v-for="(item, index) in itemList.slice(0, 15)" :key="index">
        <img class="item_size" :src="getImage(item.itemName)" alt="" />
      </div>
    </div>

    <!-- <div class="char-image"> <img class="" src="/img/back/char_4080_lin_1b.png" ></div> -->
  </div>
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
      storeApi.findAllItem(0.625).then((response) => {
        this.itemList = [];
        this.itemList = response.data.filter((item) => item.cardNum == 3);
      });
    },
    getImage(name) {
      return "/img/materials-bak/" + name + ".png";
    },
  },
};
</script>

<style scoped>

.main{
  width: 2376px;
  height: 1296px;
  border: solid 1px red;
}
.cover {
  width: 1980px;
  height: 1280px;
  margin: auto;
  border: solid 1px red;
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1)
    ),
    url(~static/img/back/春分.png) no-repeat 50% 50% / cover; */
  background-size: 2400px;
}

.item_size {
  margin: 5px;
  width: 150px;
}

.item_size1 {
  width: 300px;
  position: absolute;
  left: 350px;
  top: 430px;
}

.item_card {
  display: flex;
  /* border: solid 1px red; */
  width: 500px;
  flex-wrap: wrap;
  position: absolute;
  left: 1550px;
  top: 170px;
}

.title {
  color: #f7ad41;
  position: absolute;
  left: 380px;
  top: 560px;
  width: 1300px;
  font-size: 120px;
  text-shadow: 10px 10px 10px #000000;
  -webkit-text-stroke: 4px #000000;
  letter-spacing: 1px;
  font-weight: 700;
  /* font-family: STXingkai; */

  z-index: 99;
  /* background: rgb(255, 255, 255,0.7); */
}

.title1 {
  color: rgb(0, 191, 255);
}

.char-image {
  position: relative;
  width: 200px;
  z-index: 90;
  margin-top: -500px;
  margin-left: 800px;
}

.char-image img {
  width: 800px;
}
</style>