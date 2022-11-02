<template>
  <div>
    <div class="item_card">
      <div v-for="(item, index) in itemList" :key="index" v-show="item.cardNum <9">
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
  width: 90%;
  margin: 5%;
   flex-wrap: wrap ;  
  
}
.item_size{
  margin: 5px;
  width: 50px;
}
</style>