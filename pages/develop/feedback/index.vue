<template>
  <div>
    <div class="">
        <table class="feedback-table" border="0">
          <tbody>
            <tr class="tr-title">
              <td>问题描述</td>
              <td>排班文件ID</td>
              <td>创建时间</td>
              <td>描述图片</td>
              <td></td>
            </tr>
            <tr v-for="(feedback,index) in feedbackList" :key="index" class="tr-feedback" :style="getBackground(index)">
              <td class="description"> <div>{{feedback.description}}</div></td>
              <td style="width:130px">{{feedback.scheduleId}}</td>
              <td style="width:170px">{{feedback.createdTime}}</td>
              <td style="width:100px"><img style="width:50px" src="https://image.yituliu.site/feedback/test.png" alt=""></td>
            </tr>
          </tbody>
        </table>

    </div>
  </div>
</template>

<script>

export default {
  layout: "poster",
  data() {
    return {
      feedbackList:[]
    };
  },
  created() {
     this.setData()
  },
  methods: {
    setData(){
       for(let i=0;i<10;i++){
          let feedback = {};
          feedback.description = "这是一条测试反馈语句，这是一条测试反馈语句，这是一条测试反馈语句，这是一条测试反馈语句"
          feedback.scheduleId = "1232141242121"
          feedback.createdTime = "2023-01-20 20:20:20";
          this.feedbackList.push(feedback);
       }
    },
    getBackground(index){
        if(index%2==0){
             return "background: transparent;"
        }
    }
      
  },
};
</script>

<style scoped>


.feedback-table{
  margin:40px;
  width: 1400px;
  border-collapse:collapse;
}

.tr-title{
  color: rgb(97, 97, 97);
  font-weight: 800;
  font-size: 20px;
  text-align: center;
}

.tr-feedback{
  background: rgb(241, 241, 241);
}

.tr-feedback td{
  padding:10px;
}

.description{
  width: 500px;
}


.description div{
  width: 500px;
  /* height: 30px; */
  overflow: scroll;
  scrollbar-width: none; /* firefox */
  /* border: solid 1px red; */
}





</style>
