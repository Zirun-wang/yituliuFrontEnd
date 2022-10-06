<template>
    <div>
        <el-button v-model="radio" label=true @click="radio=!radio">备选项</el-button>
        
    </div>
</template>

<script>

export default {
  data() {
    return {   
        radio:true
    };
  },
 created() {  
  },
  methods: {  
    show(){
        console.log(this.radio)
    }
  },
};
</script>