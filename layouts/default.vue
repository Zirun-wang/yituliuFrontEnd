<template>
  <div class="app-container">
    <myheader />
    <div class="main-container">
      <el-scrollbar class="page-component__scroll">
        <nuxt />
      </el-scrollbar>
    </div>
    <myfooter />
  </div>
</template>
<script>

import "~/assets/css/basic.css";
import "~/assets/css/stage_v2.css";
import "~/assets/css/store_v2.css";
import "~/assets/css/gacha.css";
import "~/assets/css/sprite.css";
import "~/assets/css/sprite_index.css";
import "~/assets/css/sprite_gacha.css";



// 旧版css，待修改
import "~/assets/css/item.css";

import "~/assets/css/calculator.css";
import "~/assets/css/recruit.css";
import "~/assets/css/building.css";



import myheader from './myheader'
import myfooter from './myfooter'


export default {
 components: {
      myheader,myfooter
    }

};
</script>
