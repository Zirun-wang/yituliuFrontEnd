<template>
  <div>
    <div class="poster_main">
      <div class="poster_title">
        <div><img src="/img/website/prts.png" class="image_logo"></div>
        <div class="poster_title_H1"><a class="poster_title_H1_up">BATE舟报</a><a class="poster_title_H1_down">BATE周报</a>
        </div>
        <div class="poster_title_H2"><a class="poster_title_H2_time">2023-01-22</a><a
          class="poster_title_H2_version">#4</a>
        </div>
      </div>

      <div class="poster_module">
        <div class="poster_module_title"><a>◈</a>近期活动</div>
        <div v-for="(future,index) in posterData.future" :key="index">
          <div v-if="'Image&Text'===future.type||'Image'===future.type">
            <img :src="future.imageUrl" :class="future.imageSize">
          </div>
          <div v-if="'Image&Text'===future.type||'Text'===future.type" :class="getClassName(future.contentType)">
           <a v-html="replaceDesc(future.content,'title')"></a><span v-html="replaceDesc(future.content,'desc')"></span>
          </div>
        </div>
      </div>

      <div class="poster_module">
        <div class="poster_module_title"><a>◈</a>进行中</div>
        <div v-for="(underway,index) in posterData.underway" :key="index">
          <div v-if="'Image&Text'===underway.type||'Image'===underway.type">
            <img :src="underway.imageUrl" :class="underway.imageSize">
          </div>
          <div v-if="'Image&Text'===underway.type||'Text'===underway.type" :class="getClassName(underway.contentType)">
           <a v-html="replaceDesc(underway.content,'title')"></a><span v-html="replaceDesc(underway.content,'desc')"></span>
          </div>
        </div>
      </div>

      <div class="poster_module">
        <div class="poster_module_title"><a>◈</a>数据区</div>
        <div v-for="(data,index) in posterData.data" :key="index">
          <div v-if="'Image&Text'===data.type||'Image'===data.type">
            <img :src="data.imageUrl" :class="data.imageSize">
          </div>
          <div v-if="'Image&Text'===data.type||'Text'===data.type" :class="getClassName(data.contentType)">
            <a v-html="replaceDesc(data.content,'title')"></a><span v-html="replaceDesc(data.content,'desc')"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import posterJson from 'static/json/poster.json'

export default {
  layout: "poster",
  data() {
    return {
      posterData: posterJson.data,
    };
  },
  created() {
    
  },
  methods: {
    replaceDesc(content,type) {
      let str = '';
      if('title'===type) str = content.title;
      if('desc'===type) str = content.description;
      if (content.key != undefined) {
        for (let i = 0; i < content.key.length; i++) {
          str = str.replace(content.key[i], "<span style='color: rgb(255, 196, 0);'>" + content.key[i] + "</span>");
        }
      }
      str = str.replaceAll("&", " ");
      
      if (content.fontSize != undefined) {
        if('title'===type)  str = "<span style='font-size:"+content.fontSize.title +"'>"+ str + "</span>";
        if('desc'===type) str = "<span style='font-size:"+content.fontSize.description +"'>"+ str + "</span>";
      }
       
       console.log(str);
      return  str;
    },
    getClassName(name) {
      if ("long" == name) return "module_content_long";
      if ("short" == name) return "module_content_short";
      if ("long&back" == name) return "module_content_long module_content_long_back";
      if ("short&back" == name) return "module_content_short module_content_short_back";
      if ("long&code" == name) return "module_content_long module_content_long_vertical";
    }
  },
};
</script>


<style scoped>
.poster_main {
  margin: auto;
  width: 1080px;
  height: auto;
  border: solid blue 1px;
  background: rgb(36, 36, 36);
}

.poster_title {
  margin: auto;
  width: 1070px;
  /* border: solid blue 1px; */
  display: flex;
  flex-direction: row;
}

.poster_title_H1 {
  font-size: 95px;
  color: white;
  margin: 24px;
}

.poster_title_H1_up {
  display: block;
}

.poster_title_H1_down {
  margin-top: -10px;
  display: block;
  background-image: -webkit-linear-gradient(bottom, rgb(255, 255, 255), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: rotateX(180deg);
}

.poster_title_H2_time {
  display: block;
  font-size: 40px;
  margin-top: 28px;
  margin-left: 50px;
  color: white;
}

.poster_title_H2_version {
  display: block;
  margin-top: 4px;
  margin-left: 50px;
  font-size: 60px;
  color: rgb(255, 208, 0);
}


.image_logo {
  width: 200px;
  margin: 20px;
}



.poster_module {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 1060px;
  /* border: solid blue 1px; */
  margin: auto;
  margin-top: 10px;
}

.poster_module_title {
  width: 1060px;
  margin: auto;
  font-size: 50px;
  font-weight: 700;
  color: aliceblue;
  /* -webkit-text-stroke: 1px #858585; */
  text-shadow: 2px 3px 5px rgb(85, 85, 85);
}

.poster_module_title a {
  color: rgb(255, 196, 0);
}

.image_big {
  margin: auto;
  width: 1050px;
  border: solid rgb(182, 182, 182) 5px;
  border-radius: 20px;
}

.image_small {
  width: 518px;
  margin: 2px;
  border: solid rgb(182, 182, 182) 4px;
  border-radius: 20px;
}

.image_code{
  width: 190px;
  margin-left:850px;
  margin-bottom: -200px;
}

.module_content_long {
  width: 1034px;
  border: solid rgb(182, 182, 182) 2px;
  border-radius: 10px;
  color: white;
  font-size: 32px;
  white-space: pre-wrap;
  text-align: center;
  padding: 10px;
  margin: auto;
}

.module_content_long_back {
  margin-top: -80px;
  margin-bottom:10px;
  border-radius: 0 0 20px 20px;
  position: relative;
  border: 0;
  z-index: 100;
  font-size: 40px;
  background: -webkit-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
}



.module_content_long_vertical{
 display:flex;
 height: 180px;
 flex-direction:column;
}

.module_content_long_vertical a{
  text-align: left;
  display: block;
  width: 70%;
}

.module_content_long_vertical span{
  text-align: left;
  display: block;
  width: 70%;
}

.module_content_short {
  width: 501px;
  border: solid rgb(182, 182, 182) 2px;
  border-radius: 10px;
  height: 200px;
  margin: auto;
  padding: 10px;
  white-space: pre-wrap;
  color: white;
}

.module_content_short_back {
  margin-top: -66px;
  text-align: center;
  border-radius: 0 0 20px 20px;
  height: auto;
  position: relative;
  border: 0;
  z-index: 100;
  background: -webkit-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
}

.module_content_short a {
  display: block;
  /* font-size: 36px; */
}

.module_content_short span {
  /* font-size: 30px; */
}

.underway {

}

</style>
