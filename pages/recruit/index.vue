<template>
  <div :class="ligthOrDark(1)">
    <div class="">

    </div>
    <br />

    <div class="recruit_area_">
      <div class="checkBox_recruit_area">
        <div class="checkBox_recruit_title"><a>资历</a></div>
        <div class="checkBox_recruit_card">
          <div
            class="checkBox_recruit_word"
            id="1"
            @click="checkTag('新手', 1)"
          >
            <a>新手</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="2"
            @click="checkTag('资深干员', 2)"
          >
            <a>资深干员</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="3"
            @click="checkTag('高级资深干员', 3)"
          >
            <a>高级资深干员</a>
          </div>
        </div>
        <div class="checkBox_recruit_title"><a>站位</a></div>
        <div class="checkBox_recruit_card">
          <div
            class="checkBox_recruit_word"
            id="4"
            @click="checkTag('近战位', 4)"
          >
            <a>近战位</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="5"
            @click="checkTag('远程位', 5)"
          >
            <a>远程位</a>
          </div>
        </div>
        <div class="checkBox_recruit_title"><a>职业</a></div>
        <div class="checkBox_recruit_card">
          <div
            class="checkBox_recruit_word"
            id="6"
            @click="checkTag('先锋干员', 6)"
          >
            <a>先锋</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="7"
            @click="checkTag('近卫干员', 7)"
          >
            <a>近卫</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="8"
            @click="checkTag('狙击干员', 8)"
          >
            <a>狙击</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="9"
            @click="checkTag('重装干员', 9)"
          >
            <a>重装</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="10"
            @click="checkTag('医疗干员', 10)"
          >
            <a>医疗</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="11"
            @click="checkTag('辅助干员', 11)"
          >
            <a>辅助</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="12"
            @click="checkTag('术师干员', 12)"
          >
            <a>术师</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="13"
            @click="checkTag('特种干员', 13)"
          >
            <a>特种</a>
          </div>
        </div>
        <div class="checkBox_recruit_title"><a>词条</a></div>
        <div class="checkBox_recruit_card">
          <div
            class="checkBox_recruit_word"
            id="14"
            @click="checkTag('治疗', 14)"
          >
            <a>治疗</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="15"
            @click="checkTag('支援', 15)"
          >
            <a>支援</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="16"
            @click="checkTag('输出', 16)"
          >
            <a>输出</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="17"
            @click="checkTag('群攻', 17)"
          >
            <a>群攻</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="18"
            @click="checkTag('减速', 18)"
          >
            <a>减速</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="19"
            @click="checkTag('生存', 19)"
          >
            <a>生存</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="20"
            @click="checkTag('防护', 20)"
          >
            <a>防护</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="21"
            @click="checkTag('削弱', 21)"
          >
            <a>削弱</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="22"
            @click="checkTag('位移', 22)"
          >
            <a>位移</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="23"
            @click="checkTag('控场', 23)"
          >
            <a>控场</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="24"
            @click="checkTag('爆发', 24)"
          >
            <a>爆发</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="25"
            @click="checkTag('召唤', 25)"
          >
            <a>召唤</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="26"
            @click="checkTag('快速复活', 26)"
          >
            <a>快速复活</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="27"
            @click="checkTag('费用回复', 27)"
          >
            <a>费用回复</a>
          </div>
          <div
            class="checkBox_recruit_word"
            id="28"
            @click="checkTag('支援机械', 28)"
          >
            <a>支援机械</a>
          </div>
        </div>
        <div class="checkBox_recruit_title">显示内容</div>
        <div class="checkBox_recruit_card">
          <div class="checkBox_recruit_switch">
            <div>
              <el-switch
                v-model="img_display_type"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @click="img_display()"
              >
              </el-switch>
              显示头像
            </div>
          </div>

          <div class="checkBox_recruit_switch">
            <div @click="recruit_role_minRarity()">
              <el-switch
                v-model="minRarityValue_type"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
              隐藏1,2星干员(默认隐藏)
            </div>
          </div>
          <div class="checkBox_recruit_switch_re">
            <div @click="reTag()">重置TAG</div>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in itemList" :key="index"></div>
      <div class="result_recruit_title">
        当前选择TAG {{ checkList }} &nbsp;&nbsp; 计算结果 <br />
        <a class="result_recruit_tip_word" v-show="lessRarity > 3">
          &nbsp;&nbsp; ※! 有稀有度最低四星以上的tag组合 !※
        </a>
      </div>

      <div class="result_recruit_area">
        <div
          v-for="(item, index) in recDataList"
          :key="index"
          class="result_recruit_card"
        >
          <div class="result_recruit_tags_color_size">{{ item.tags }}</div>

          <div class="result_recruit_table_size">
            <div v-for="(name, index1) in item.result" :key="index1">
              <div :class="showColor(name)">
                <table>
                  <tr>
                    <td style="width: 45px" v-show="img_display_type">
                      <img
                        class="role_img_size"
                        :src="getRoleGitUrl(name)"
                        :alt="getRoleName(name)"
                      />
                    </td>
                    <td style="min-width: 75px">
                      {{ getRoleName(name) }}
                    </td>
                  </tr>
                  <tr></tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
var count = 0;
import storeApi from "@/api/store";

import toolApi from "@/api/tool";
import cookie from "js-cookie";

export default {
  data() {
    return {
      checkList: [],
      recDataList: [],
      minRarityValue_type: true,
      minRarity: 3,
      img_display_type: false,
      lessRarity: 0,
      no_recruit: false,
      recruit_role_type: 0,
      itemList: [],
      indexAll: [1, 2, 3, 4, 5, 6, 7, 8, 10],
      tagss: [
        "新手1",
        "资深干员1",
        "高级资深干员1",
        "近战位1",
        "远程位1",
        "先锋1",
        "近卫1",
        "狙击1",
        "重装1",
        "医疗1",
        "辅助1",
        "术师1",
        "特种1",
        "治疗1",
        "支援1",
        "输出1",
        "群攻1",
        "减速1",
        "生存1",
        "防护1",
        "削弱1",
        "位移1",
        "控场1",
        "爆发1",
        "召唤1",
        "快速复活1",
        "费用回复1",
        "支援机械1",
      ],
    };
  },
  created() {
    this.findAllItemValue();
  },
  mounted() {},
  methods: {
    findAllItemValue() {
      storeApi.findAllItem().then((response) => {
        this.itemList = [];
        for (let i in response.data) {
          this.itemList.push(response.data[i]);
        }
      });
    },

    forTime() {
      for (let i = 0; i < 1000; i++) {
        console.log(i);
      }
    },
    ligthOrDark(location) {
      let type = cookie.get("type");
      //  console.log("样式类型——" + typeof type);
      if (typeof type == "undefined") {
        type = "_light";
      }

      if (location === 1) {
        console.log("base" + type);
        return "base" + type;
      }
    },
    img_display() {},
    //最低星级
    recruit_role_minRarity() {
      if (this.minRarity > 2) {
        this.minRarity = 1;
      } else {
        this.minRarity = 3;
      }
      this.findAllDataRec(this.recruit_role_type);
    },
    //可否招募
    recruit_roleType() {
      console.log("可招募");
      if (this.no_recruit == false) {
        this.recruit_role_type = 0;
        console.log("可招募");
      } else {
        this.recruit_role_type = 1;
        console.log("不可招募");
        this.findAllDataRec();
      }
    },
    reTag() {
      for (var i = 1; i < 29; i++) {
        document.getElementById(i).style.color = "black";
        document.getElementById(i).style.backgroundColor = "rgb(228, 228, 228)";
      }

      this.recDataList = [];
      this.checkList = [];
    },
    //选择tag
    checkTag(tag, id) {
      //  console.log("删除后", this.checkList);

      document.getElementById(id).style.color = "white";
      document.getElementById(id).style.backgroundColor = "rgb(30, 165, 255)";
      if (this.checkList.length > 0) {
        for (var i = 0; i < this.checkList.length; i++) {
          if (tag == this.checkList[i]) {
            console.log("删除前", this.checkList);
            document.getElementById(id).style.color = "black";
            document.getElementById(id).style.backgroundColor =
              "rgb(228, 228, 228)";
            this.checkList.splice(i, 1);
            console.log("删除后", this.checkList);
            this.findAllDataRec(this.recruit_role_type);
            return;
          }
        }
      }
      if (this.checkList.length > 5) {
        document.getElementById(id).style.color = "black";
        document.getElementById(id).style.backgroundColor =
          "rgb(228, 228, 228)";
        this.$message({
          message: "至多选取6个tag",
          type: "warning",
          duration: 5 * 1000,
        });

        return;
      }
      this.checkList.push(tag);
      this.findAllDataRec(this.recruit_role_type);
    },

    //获取结果
    findAllDataRec(index) {
      this.lessRarity = 0;

      if (this.checkList.length < 1) {
        this.recDataList = [];
        return;
      }

      this.checkList.sort((a, b) => b.length - a.length);

      toolApi
        .findAllDataRec(index, this.checkList, this.minRarity)
        .then((response) => {
          this.recDataList = response.data;

          this.lessRarity = response.data[0].lessRarity;
        });
    },
    getRoleGitUrl(name) {
      count++;
      var roleNameAndRarity = name.toString().substring(2);
      return "/img/role/头像_" + roleNameAndRarity + ".png";
    },
    getRoleName(name) {
      count++;

      var roleNameAndRarity = name.toString().substring(2);
      // console.log(roleNameAndRarity);
      return roleNameAndRarity;
    },
    showColor(name) {
      count++;

      if (typeof name == "undefined") {
        return "hidden_role_img result_recruit_word_size";
      } else {
        var roleRarity = name.toString().substring(0, 1);

        if (roleRarity == 6) {
          return "result_recruit_word_size_6";
        } else if (roleRarity == 5) {
          return "result_recruit_word_size_5";
        } else if (roleRarity == 4) {
          return "result_recruit_word_size_4";
        } else if (roleRarity == 3) {
          return "result_recruit_word_size_3";
        } else if (roleRarity == 2) {
          return "result_recruit_word_size_2";
        } else if (roleRarity == 1) {
          return "result_recruit_word_size_2";
        }
      }
    },
  },

};
</script>
