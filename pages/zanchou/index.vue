<template>
  <div> 
     
     <div class="urlClick">
        攒抽计算器链接更换，现在转跳至新链接
     </div>
     </div>
</template>
<script>

export default {
  data() {
    return {   
    };
  },
 created() {  
   
  }, mounted() { this.gachaCal()},
  methods: {  
     gachaCal() {
   
    window.location.href = "/gachaCal/";
    },
  },
};
</script>


<style scoped>
.urlClick{
    width: 60%;
    height: 1200px;
    line-height: 400px;
    text-align: center;
   font-size:30px ;
   margin-left: 20%;
}

</style>