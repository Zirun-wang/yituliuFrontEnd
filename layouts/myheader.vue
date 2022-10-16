<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo op_header"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="border: 0px;"
    >
      <el-menu-item index="1" @click="mainSite()">材料一图流</el-menu-item>
      <el-menu-item index="2" @click="gachaCal()">攒抽规划</el-menu-item>
      <el-menu-item index="3" @click="schedule()">排班生成器</el-menu-item>
      <el-submenu index="4">
        <template slot="title">其它工具</template>
        <el-menu-item index="4-1" @click="recruit()">公开招募</el-menu-item>
        <!-- <el-menu-item index="4-2" @click="expCal()">升级计算</el-menu-item> -->
      </el-submenu>
      <el-menu-item v-show="'/'===routePath||'/recruit/'===routePath" index="5" @click="switchTheme()">{{ThemeText}}</el-menu-item>
    </el-menu>
   
   
    <!-- <div>
      <el-button class="menu-button" @click="menuCollapse()"
        ><i class="el-icon-menu"></i
      ></el-button>
    </div>

    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item index="1" @click="mainSite()">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">材料一图流</span>
      </el-menu-item>
      <el-menu-item index="2" @click="gachaCal()">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">攒抽规划</span>
      </el-menu-item>
      <el-menu-item index="3" @click="schedule()">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">排班生成器</span>
      </el-menu-item>
      <el-menu-item index="4" @click="recruit()">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">公开招募</span>
      </el-menu-item>
      <el-menu-item index="5" @click="expCal()">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">升级计算</span>
      </el-menu-item>
      <el-menu-item index="6" @click="switchTheme()">
        <i class="el-icon-setting"></i>
        <span slot="title">暗色模式</span>
      </el-menu-item>
    </el-menu> -->
  </div>
</template>

<style >
</style>

<script>
var count = 0;


import cookie from "js-cookie";
import Vue from "vue";
import toolApi from "@/api/tool";

export default {
  data() {
    return {
      activeIndex: "1",
      isCollapse: "true",
      routePath:'/',
      ThemeText:'暗色'
    };
  },
  created(){
   this.showPath()
  //  
  },
  methods: {
     updateVisits(domain) {
      toolApi.updateVisits(domain).then((response) => {});
    },
    switchTheme() {
        this.activeIndex = '1'
      if (cookie.get("theme") === "dark") {
        document.getElementById("indexDiv").style.background = "#f0f0f0";
        document.getElementById("indexDiv").style.color = "#000000";
        var titles = document.getElementsByClassName("op_title_ctext");
        for (var i = 0; i < titles.length; i++)
          titles[i].style.color = "#000000dd";
        var titles = document.getElementsByClassName("op_title_etext");
        for (var i = 0; i < titles.length; i++)
          titles[i].style.WebkitTextStroke = "0.6px black";
        cookie.set("theme", "light", { expires: 30 });
        console.log("nowlight");
        this.ThemeText = '亮色'
      } else {
        document.getElementById("indexDiv").style.background = "#222222";
        document.getElementById("indexDiv").style.color = "#ffffff";
        var titles = document.getElementsByClassName("op_title_ctext");
        for (var i = 0; i < titles.length; i++)
          titles[i].style.color = "#ffffffdd";
        var titles = document.getElementsByClassName("op_title_etext");
        for (var i = 0; i < titles.length; i++)
          titles[i].style.WebkitTextStroke = "0.3px white";
        cookie.set("theme", "dark", { expires: 30 });
        console.log("nowdark");
         this.ThemeText = '暗色'
      }
    
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    menuCollapse() {
      this.isCollapse = !this.isCollapse;
      console.log(this.isCollapse);
    },
   
    showPath(){
     this.routePath =this.$route.path;
        if('/'===this.routePath )  {
          this.activeIndex = '1';
          this.updateVisits('index');
          };
        if('/gachaCal/'===this.routePath ){ 
           this.activeIndex = '2';
           this.updateVisits('gacha');
           };
        if('/riicCal/'===this.routePath ) { 
          this.activeIndex = '3';
          this.updateVisits('building');
          };
        if('/recruit/'===this.routePath ) {
          this.activeIndex = '4';
          this.updateVisits('index');
          };
        if('/expCal/'===this.routePath ) {
           this.activeIndex = '4';
           this.updateVisits('index');
          };
        if('/maaRecruitData/'===this.routePath ) {
           this.activeIndex = '4';
           this.updateVisits('index');
          };
    },
   
    mainSite() {
      window.location.href = "/";
    },
    expCal() {
      window.location.href = "/expCal/";
    },
    recruit() {
      window.location.href = "/recruit/";
    },
    riicSkill() {
      window.location.href = "/riicSkill/";
    },
    gachaCal() {
      window.location.href = "/gachaCal/";
    },
    schedule() {
      window.location.href = "/riicCal/";
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    
  },
};
</script>


<style>
/* .menu-button{
  width:66px ;
  background-color: #409EFF;
} */

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>