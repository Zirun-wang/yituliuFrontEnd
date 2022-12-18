<template>
  <div>
    <div id="ondiv" @click="change()">JS transition</div>
    <p></p>
    <div id="div" class="test"></div>

    <div>Static</div>
    <div class="moved">Moved</div>
    <div>Static</div>
  </div>
</template>

<script>
  import storeApi from "@/api/store";

  export default {
    layout: "poster",
    data() {
      return {};
    },
    created() {
    },
    methods: {
      change() {
        document.getElementById("div").className = "test";
        setTimeout(function () {
          document.getElementById("div").className = "box1";
        }, 10);

        // document.getElementById("ondiv").onmouseleave = function () {
        //   document.getElementById("div").className = "test";
        // };
      },
    },
  };
</script>


<style scoped>
  #ondiv {
    background: #000;
    width: 200px;
    height: 50px;
  }

  .test {
    display: none;
    background: red;
    width: 100px;
    height: 100px;
    transition: all 0.3s;
    transform: translateX(-290px);
  }

  .box1 {
    background: red;
    width: 200px;
    height: 200px;
    transition: all 0.3s;
    transform: translateX(0);
  }

  div {
    width: 60px;
    height: 60px;
    background-color: skyblue;
  }

  .moved {
    transform: translateX(10px);
    background-color: pink;
  }
</style>
