<template>
  <div>
    <div class="item_card">
      <div v-for="(item, index) in itemList" :key="index" v-show="item.cardNum <8&&item.cardNum >1">
        <img class="item_size" :src="getImage(item.itemName)" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import storeApi from "@/api/store";

export default {
  data() {
    return {
      itemList:[]
    };
  },
  created() {
    this.findAllItemValue();
  },
  methods: {
    findAllItemValue() {
      storeApi.findAllItem().then((response) => {
        this.itemList = [];
        this.itemList = response.data;
      });
    },
    getImage(name){
      return "img/materials-bak/"+name+".png"
    }
  },
};
</script>

<style scoped>
.item_card {
  display: flex;
  background-color: white;
  width: 1280;
  height: 720;
  overflow: hidden;
  /* margin: 5%; */
   flex-wrap: wrap ;  
    background: url(~static/img/back/ep11.png);
  background-size: 900px;
}
.item_size{
  margin: 5px;
  width: 70px;
}
</style>