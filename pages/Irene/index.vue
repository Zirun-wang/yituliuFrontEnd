<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>被训练干员职业</td>
          <td>专一前半段协助者效率</td>
          <td>专二前半段协助者效率</td>
        </tr>
        <tr>
          <td>
            <el-select v-model="char_profession" placeholder="请选择" @change="IreneCal()">
              <el-option
                v-for="item in char_professionList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </td>
          <td>
            <el-input  v-model.number="train1_spd" @change="IreneCal()" />
          </td>
          <td>
            <el-input  v-model.number="train2_spd" @change="IreneCal()" />
          </td>
        </tr>
        <tr>
          <td>专精一</td>
          <td colspan="3">
            在训练{{ doubleProf1_time }}后，剩余{{doubleProf1_remaining_time}}时换成艾丽妮
          </td>
        </tr>
        <tr>
          <td>专精二</td>
          <td colspan="3">
            在训练{{ doubleProf2_time }}后，剩余{{doubleProf2_remaining_time}}时换成艾丽妮
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import storeApi from "@/api/store";

export default {
  layout: "poster",
  data() {
    return {
      char_professionList: ["狙击近卫", "其他职业"],
      char_profession: "狙击近卫",
      train1_spd: "30",
      train2_spd: "60",
      doubleProf1_time: "",
      doubleProf1_remaining_time: "",
      doubleProf2_time: "",
      doubleProf2_remaining_time: "",
    };
  },
  created() {
    this.IreneCal();
  },
  methods: {
    IreneCal() {
      console.log(this.char_profession);
      console.log(this.train_spd);
      var Irene_spd = 1.05;  //艾丽妮基础效率
      var front1_spd = 1.05 + parseFloat(this.train1_spd / 100);  //专精1前置干员效率
      var front2_spd = 1.05 + parseFloat(this.train2_spd / 100);  //专精2前置干员效率
      var doubleProf1_ms = 8 * 3600;      //专精总时长
      var Irene_ms = 5 * 3600 + 10 * 60;   //艾丽妮技能最低时长，取5小时10分钟
      if ("狙击近卫" === this.char_profession ) {
        Irene_spd = 1.35;     //艾丽妮最终效率
        Irene_ms = Irene_ms * Irene_spd;   //艾丽妮需求原始时长（无效率时长）
        var doubleProf1_front_ms = (doubleProf1_ms - Irene_ms) / front1_spd;   //前置干员可工作总时长
        var doubleProf1_front_hh = parseInt(doubleProf1_front_ms / 3600); //前置干员可工作小时
        var doubleProf1_front_mm = parseInt((doubleProf1_front_ms - doubleProf1_front_hh * 3600) / 60); //前置干员可工作分钟
        this.doubleProf1_time =
          doubleProf1_front_hh +"小时" +doubleProf1_front_mm+"分钟";

        var doubleProf1_remaining_ms =
          (doubleProf1_ms - doubleProf1_front_ms * front1_spd) / front1_spd;   //前置干员撤出前剩余时长
        var doubleProf1_remaining_hh = parseInt(doubleProf1_remaining_ms / 3600); //前置干员撤出前剩余小时
        var doubleProf1_remaining_mm = parseInt((doubleProf1_remaining_ms - doubleProf1_remaining_hh * 3600) /60); //前置干员撤出前剩余分钟
        this.doubleProf1_remaining_time =
          this.addZero(doubleProf1_remaining_hh) +
          ":" +
          this.addZero(doubleProf1_remaining_mm) +
          ":00";

        console.log("专精1时长：", doubleProf1_ms);
        console.log("专精1艾丽妮最短时长：", Irene_ms);
        console.log("专精1剩余时长", doubleProf1_remaining_ms);

        var doubleProf2_front_ms = (doubleProf1_ms - Irene_ms) / front2_spd;
        var doubleProf2_front_hh = parseInt(doubleProf2_front_ms / 3600);
        var doubleProf2_front_mm = parseInt((doubleProf2_front_ms - doubleProf2_front_hh * 3600) / 60);
        this.doubleProf2_time =
          doubleProf2_front_hh +"小时" +doubleProf2_front_mm+"分钟";

        var doubleProf2_remaining_ms =
          (doubleProf1_ms - doubleProf2_front_ms * front2_spd) / front2_spd;
        var doubleProf2_remaining_hh = parseInt(doubleProf2_remaining_ms / 3600);
        var doubleProf2_remaining_mm = parseInt((doubleProf2_remaining_ms - doubleProf2_remaining_hh * 3600) /60);
        this.doubleProf2_remaining_time =
          this.addZero(doubleProf2_remaining_hh) +
          ":" +
          this.addZero(doubleProf2_remaining_mm) +
          ":00";

        console.log("专精2时长：", doubleProf1_ms);
        console.log("专精2艾丽妮最短时长：", Irene_ms);
        console.log("专精1剩余时长", doubleProf2_remaining_ms);
      }else{
 
        Irene_ms = Irene_ms * Irene_spd;
        var doubleProf1_front_ms = (doubleProf1_ms - Irene_ms) / front1_spd;
        var doubleProf1_front_hh = parseInt(doubleProf1_front_ms / 3600000);
        var doubleProf1_front_mm = parseInt(
          (doubleProf1_front_ms - doubleProf1_front_hh * 3600000) / 60000
        );
        this.doubleProf1_time =
          this.addZero(doubleProf1_front_hh) +
          ":" +
          this.addZero(doubleProf1_front_mm) +
          ":00";

        var doubleProf1_remaining_ms =
          (doubleProf1_ms - doubleProf1_front_ms * front1_spd) / front1_spd;
        var doubleProf1_remaining_hh = parseInt(
          doubleProf1_remaining_ms / 3600000
        );
        var doubleProf1_remaining_mm = parseInt(
          (doubleProf1_remaining_ms - doubleProf1_remaining_hh * 3600000) /
            60000
        );
        this.doubleProf1_remaining_time =
          this.addZero(doubleProf1_remaining_hh) +
          ":" +
          this.addZero(doubleProf1_remaining_mm) +
          ":00";

        console.log("专精1时长：", doubleProf1_ms);
        console.log("专精1艾丽妮最短时长：", Irene_ms);
        console.log("专精1剩余时长", doubleProf1_remaining_ms);

        var doubleProf2_front_ms = (doubleProf1_ms - Irene_ms) / front2_spd;
        var doubleProf2_front_hh = parseInt(doubleProf2_front_ms / 3600000);
        var doubleProf2_front_mm = parseInt(
          (doubleProf2_front_ms - doubleProf2_front_hh * 3600000) / 60000
        );
        this.doubleProf2_time =
          this.addZero(doubleProf2_front_hh) +
          ":" +
          this.addZero(doubleProf2_front_mm) +
          ":00";

        var doubleProf2_remaining_ms =
          (doubleProf1_ms - doubleProf2_front_ms * front2_spd) / front2_spd;
        var doubleProf2_remaining_hh = parseInt(
          doubleProf2_remaining_ms / 3600000
        );
        var doubleProf2_remaining_mm = parseInt(
          (doubleProf2_remaining_ms - doubleProf2_remaining_hh * 3600000) /
            60000
        );
        this.doubleProf2_remaining_time =
          this.addZero(doubleProf2_remaining_hh) +
          ":" +
          this.addZero(doubleProf2_remaining_mm) +
          ":00";

        console.log("专精2时长：", doubleProf1_ms);
        console.log("专精2艾丽妮最短时长：", Irene_ms);
        console.log("专精1剩余时长", doubleProf2_remaining_ms);
      }
    },
    addZero(str) {
      console.log("字符长度:", str.toString().length);
      if (str.toString().length < 2) {
        return "0" + str;
      }
      return str;
    },
  },
};
</script>
