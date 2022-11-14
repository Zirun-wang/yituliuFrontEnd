<template>
  <div :class="ligthOrDark(1)">
    &nbsp;
    <div class="build_area">
      <div class="build_checkBox_area">
        <div class="build_checkBox_card">
          <div class="build_checkBox_card_title">设施</div>
          <div
            v-for="(item, index) in roomList"
            :key="index"
            class="build_checkBox_card_room"
            @click="checkTagRoom(item)"
          >
            {{ getRoomName(item) }}
          </div>
        </div>
        <div class="build_checkBox_card">
          <div class="build_checkBox_card_title">控制中枢</div>
          <div
            v-for="(item, index) in CONTROLType"
            :key="index"
            class="build_checkBox_card_CONTROL"
            @click="checkTag(item)"
          >
            {{ item }}
          </div>
        </div>
        <div class="build_checkBox_card">
          <div class="build_checkBox_card_title">贸易站</div>
          <div
            v-for="(item, index) in TRADINGType"
            :key="index"
            class="build_checkBox_card_TRADING"
            @click="checkTag(item)"
          >
            {{ item }}
          </div>
        </div>

        <div class="build_checkBox_card">
          <div class="build_checkBox_card_title">制造站</div>
          <div
            v-for="(item, index) in MANUFACTUREType"
            :key="index"
            class="build_checkBox_card_MANUFACTURE"
            @click="checkTag(item)"
          >
            {{ item }}
          </div>
        </div>
        <div class="build_checkBox_card">
          <div class="build_checkBox_card_title">加工站</div>
          <div
            v-for="(item, index) in WORKSHOPType"
            :key="index"
            class="build_checkBox_card_WORKSHOP"
            @click="checkTag(item)"
          >
            {{ item }}
          </div>
        </div>

        <!-- <div class="build_checkBox_card">
        <div class="build_checkBox_card_title">宿舍</div></div>

      <div class="build_checkBox_card">
        <div class="build_checkBox_card_title">会客室</div></div> -->

        <div class="build_checkBox_card">
          <div class="build_checkBox_card_title">训练室</div>
          <div
            v-for="(item, index) in TRAININGType"
            :key="index"
            class="build_checkBox_card_TRAINING"
            @click="checkTag(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>

      
        <table class="build_table">
          <tbody>
            <tr
              v-for="(item, index) in building.slice(0, maxIndex)"
              :key="index"
              v-show="isShow(item.roomType, item.skillType, item.skillTypeSec)"
            >
              <td>
                <img
                  class="build_char_img"
                  :src="getRoleStaticUrl(item.charId, item.phase)"
                  :alt="getRoleName(item.charName)"
                />
              </td>
              <td>
                {{ item.charName }}
              </td>
              <td class="build_roomName">{{ getRoomName(item.roomType) }}</td>
              <td class="build_phase">精英 {{ item.phase }}</td>
              <!-- <td class="build_phase">{{ item.skillData }}</td> -->

              <td class="build_buffName">
                <div v-html="item.buffName"></div>
              </td>

              <td class="build_description">
                <div v-html="item.description"></div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-for="(item, index) in itemList" :key="index"></div>
      </div>
    
    
  </div>
</template>



<script >
// import buildingjson from "static/json/riic_skill.json";
import cookie from "js-cookie";
import storeApi from "@/api/store";

export default {
  data() {
    return {
      building: [],
      roomList: [
        "DORMITORY",
        "MEETING",
        "MANUFACTURE",
        "WORKSHOP",
        "CONTROL",
        "TRADING",
        "TRAINING",
        "POWER",
        "HIRE",
      ],
      buildInfoList: [],

      CONTROLType: ["贸易站", "制造站", "心情消耗", "会客室"],
      MANUFACTUREType: ["通用", "贵金属", "作战记录", "源石", "仓库容量上限"],
      TRADINGType: ["订单效率", "订单上限", "高品质"],
      WORKSHOPType: [
        "任意类材料",
        "精英材料",
        "技巧概要",
        "基建材料",
        "芯片",
        "炽合金块",
        "装置",
        "异铁",
        "聚酸酯",
        "源岩",
      ],
      TRAININGType: [
        "先锋干员",
        "狙击干员",
        "医疗干员",
        "术师干员",
        "近卫干员",
        "重装干员",
        "辅助干员",
        "特种干员",
      ],

      roomValue: "",
      skillValue: "",
      className: [],
      divId: [],
      roleName: "",
      itemList: [],
      maxIndex: 0,
    };
  },
  created() {
    // this.findAllDataSkill("通用生产", 0);
    // this.setBuildInfoList()
    this.findAllItemValue();
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

    ligthOrDark(location) {
      let type = cookie.get("type");
      //  console.log("样式类型——" + typeof type);
      if (typeof type == "undefined") {
        type = "_light";
      }

      if (location === 1) {
      
        return "base" + type;
      }
    },
    isShow(room, type, typeSec) {
      let flag = false;
      if (room == this.roomValue) {
        flag = true;
      }
      if (type == this.skillValue + room) {
        flag = true;
      }
      if (typeSec == this.skillValue + room) {
        flag = true;
      }
      return flag;
    },

    consoleLog() {},
    getRoomName(roomName) {
      if (roomName == "DORMITORY") return "宿舍";
      if (roomName == "MEETING") return "会客室";
      if (roomName == "MANUFACTURE") return "制造站";
      if (roomName == "WORKSHOP") return "加工站";
      if (roomName == "CONTROL") return "控制中枢";
      if (roomName == "TRADING") return "贸易站";
      if (roomName == "TRAINING") return "训练室";
      if (roomName == "POWER") return "发电站";
      if (roomName == "HIRE") return "人力办公室";
      return roomName;
    },
    checkTag(skillType) {
      this.maxIndex = 1000;
      this.roomValue = [];
      this.skillValue = skillType;
    },

    checkTagRoom(room) {
      this.maxIndex = 1000;
      this.skillValue = [];
      this.roomValue = room;
    },

    getRoleStaticUrl(name, index) {
      if ((index = 0)) return "/img/avatar/" + name + ".png";
      if ((index = 1)) return "/img/avatar/" + name + ".png";
      if ((index = 2)) return "/img/avatar/" + name + "_2.png";

      return "/img/role/头像_" + roleName + ".png";
    },

    getRoleName(roleName) {
      return roleName;
    },
  },
};
</script>