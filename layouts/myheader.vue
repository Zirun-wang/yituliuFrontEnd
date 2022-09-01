<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo op_header" mode="horizontal" @select="handleSelect" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item index="1">材料一图流</el-menu-item>
    <el-menu-item index="2">攒抽规划</el-menu-item>
    <el-submenu index="3">
      <template slot="title">常用工具</template>
      <el-menu-item index="3-1">公开招募</el-menu-item>
      <el-menu-item index="3-2">升级计算</el-menu-item>
    </el-submenu>
    <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
    <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
  </el-menu>

 
  <!-- <div class="op_header">
    <span class="op_header_tab"  @click="mainSite()">材料一图流</span>
    <span class="op_header_tab" @click="gachaCal()">攒抽规划</span>
    <span class="op_header_tab" @click="recruit()">常用工具</span>
    <span class="op_header_tab"  @click="expCal()">升级计算</span>
    <span class="op_header_tab" @click="switchTheme()">暗色模式</span>
  </div> -->
</template>

<style >
</style>

<script>
var count = 0;

import cookie from "js-cookie";
import Vue from "vue";

export default {

  methods: {
    switchTheme() {
      if (cookie.get("theme") === "dark") {
        document.getElementById("indexDiv").style.background="#f0f0f0";
        var titles = document.getElementsByClassName('op_title_ctext');
        for(var i=0;i<titles.length;i++)
          titles[i].style.color = "#000000dd";
        var titles = document.getElementsByClassName('op_title_etext');
        for(var i=0;i<titles.length;i++)
          titles[i].style.WebkitTextStroke = "0.6px black";
        cookie.set("theme", "light", { expires: 30 });
        console.log("nowlight");
      }
      else {
        document.getElementById("indexDiv").style.background="#222222";
        var titles = document.getElementsByClassName('op_title_ctext');
        for(var i=0;i<titles.length;i++)
          titles[i].style.color = "#ffffffdd";
        var titles = document.getElementsByClassName('op_title_etext');
        for(var i=0;i<titles.length;i++)
          titles[i].style.WebkitTextStroke = "0.3px white";
        cookie.set("theme", "dark", { expires: 30 });
        console.log("nowdark");
      }
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
  },
};
</script>
