<template>
  <div id="indexDiv" :class="pageTheme" style="max-width: 1080px; margin: auto">
    <stage></stage>
    <storeVue> </storeVue>
    <div class="title_null"></div>
    <itemVue> </itemVue>
    <div class="title_null"></div>
    <div class="title_null"></div>
    <foot></foot>

    <div class="title_null"></div>
  </div>
</template>


<script>
import foot from "@/pages/module/foot.vue";
import itemVue from "@/pages/module/itemValue.vue";
import storeVue from "@/pages/module/store.vue";
import stage from "@/pages/module/stage.vue";
import cookie from "js-cookie";
import toolApi from "@/api/tool";

export default {
  data() {
    return {
      pageTheme: "light",
    };
  },
  components: {
    foot,
    itemVue,
    storeVue,
    stage,
  },
  created() {},
  mounted() {
    this.updateVisits();
    this.getCookies();
  },
  methods: {
    updateVisits() {
      toolApi.updateVisits("index").then((response) => {});
    },
    getCookies() {
      let theme = cookie.get("theme");
      if (typeof theme == "undefined" || theme == undefined) {
        theme = "light";
        cookie.set("theme", theme, { expires: 30 });
      }
      console.log(theme);
      this.pageTheme = theme;
    },
  },
};
</script>



<style>
</style>
