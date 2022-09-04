<template>
  <div :class="DarkAndLightTypeValue" id="indexDiv">
    <div class=""></div>
    <br />

    <div class="recruit_area_">
      <div class="checkBox_recruit_area">
        <div class="checkBox_recruit_title"><a>资历</a></div>
        <div class="checkBox_recruit_card">
          <div
            class="checkBox_recruit_word"
            :id="index"
            v-for="(tag, index) in tagList.slice(0, 3)"
            :key="index"
            @click="checkTag(tag, index)"
          >
            <a>{{ tag }}</a>
          </div>
        </div>
        <div class="checkBox_recruit_title"><a>站位</a></div>
        <div class="checkBox_recruit_card">
          <div
            class="checkBox_recruit_word"
            :id="index + 3"
            v-for="(tag, index) in tagList.slice(3, 5)"
            :key="index"
            @click="checkTag(tag, index + 3)"
          >
            <a>{{ tag }}</a>
          </div>
        </div>
        <div class="checkBox_recruit_title"><a>职业</a></div>
        <div class="checkBox_recruit_card">
          <div
            class="checkBox_recruit_word"
            :id="index + 5"
            v-for="(tag, index) in tagList.slice(5, 13)"
            :key="index"
            @click="checkTag(tag, index + 5)"
          >
            <a>{{ tag }}</a>
          </div>
        </div>
        <div class="checkBox_recruit_title"><a>词条</a></div>
        <div class="checkBox_recruit_card">
          <div
            class="checkBox_recruit_word"
            :id="index + 13"
            v-for="(tag, index) in tagList.slice(13)"
            :key="index"
            @click="checkTag(tag, index + 13)"
          >
            <a>{{ tag }}</a>
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
      DarkAndLightTypeValue: "",
      tagList: [
        "新手",
        "资深干员",
        "高级资深干员",
        "近战位",
        "远程位",
        "先锋干员",
        "近卫干员",
        "狙击干员",
        "重装干员",
        "医疗干员",
        "辅助干员",
        "术师干员",
        "特种干员",
        "治疗",
        "支援",
        "输出",
        "群攻",
        "减速",
        "生存",
        "防护",
        "削弱",
        "位移",
        "控场",
        "爆发",
        "召唤",
        "快速复活",
        "费用回复",
        "支援机械",
      ],
    };
  },
  created() {
    this.findAllItemValue();
  },
  mounted() {
    this.getTypeValue();
  },
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
    getTypeValue() {
      let type = cookie.get("type");
      if (
        typeof type == "undefined" ||
        type == "undefined" ||
        type == "" ||
        type == null
      ) {
        type = "_light";
        var h = new Date().getHours(); //时
        if (h > 17) {
          type = "_dark";
        }
        cookie.set("type", type, { expires: 30 });
      }
      console.log("当前页获取的是", "base" + type);
      this.DarkAndLightTypeValue = "base" + type;
    },
    img_display() {},
    //最低星级
    recruit_role_minRarity() {
      if (this.minRarityValue_type) {
        this.minRarity = 3;
      } else {
        this.minRarity = 1;
      }
      this.findAllDataRec();
    },

    reTag() {
      for (var i = 0; i < 28; i++) {
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
            this.findAllDataRec();
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
      this.findAllDataRec();
    },

    //获取结果
    findAllDataRec() {
      this.lessRarity = 0;

      if (this.checkList.length < 1) {
        this.recDataList = [];
        return;
      }

      this.checkList.sort((a, b) => b.length - a.length);

      toolApi
        .findAllDataRec(0, this.checkList, this.minRarity)
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