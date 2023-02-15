<template>
  <div>
    <div>作战记录{{ capacity_exp.toFixed(0) }}</div>
    <div>赤金{{ capacity_gold.toFixed(0) }}</div>
    <div>龙门币{{ capacity_lmd.toFixed(0) }}</div>
    <div>日产{{ (capacity_exp + capacity_lmd).toFixed(0) }}</div>
    <div v-for="(item, index) in infoList" :key="index">
      {{ item.info }}：
      <a v-show="item.value>0">{{ item.value.toFixed(2) }}</a>
    </div>

  </div>
</template>

<script>
import building_data_trade from "static/json/build/building_data_trade.json";
import building_data_manu from "static/json/build/building_data_manu.json";
import auto243 from "static/json/build/243.json";

export default {
  layout: "poster",
  data() {
    return {
      // trading: ["伺夜", "空弦", "巫恋"],
      // manu: ["红云", "稀音", "帕拉斯"],
      capacity_exp: 0,
      capacity_gold: 0,
      capacity_lmd: 0,
      infoList: [],
    };
  },
  created() {
    this.readJson();
    // this.cal_trade();
  },
  methods: {
    readJson() {
      let plans = auto243.plans;

      for (let i = 0; i < plans.length; i++) {
        let info = {info: "前置计算", value: 0};
        this.infoList.push(info);
        let rooms = plans[i].rooms;
        let ChainLink = 0; //思维链环
        let drones = 'manufacture';   //加速房间类型
        let dronesIndex = 1;    //加速房间序号
        drones = plans[i].drones.room;
        dronesIndex = plans[i].drones.index;
        console.log(drones)

        //发电站
        let power_rooms = rooms.power;
        let powerNum = power_rooms.length;  //发电站个数
        for (let p = 0; p < power_rooms.length; p++) {
          let operators_power = power_rooms[p].operators;
          if ("承曦格雷伊" === operators_power[0] || "Lancet-2" === operators_power[0]) {
            powerNum++;
          }
        }

        let Flametail = false;
        let Amiya = 0;
        let Kaltsit = 0;


        //控制中枢
        let control_rooms = rooms.control;
        for (let c = 0; c < control_rooms.length; c++) {
          let operators = control_rooms[c].operators;
          for (let o = 0; o < operators.length; o++) {

            if ("令" === operators[o] || "夕" === operators[o]) {
              let info = {info: operators[o] + "——思维链环+", value: 10};
              this.infoList.push(info);
              ChainLink = ChainLink + 10;
            }

            if ("焰尾" === operators[o]) {
              Flametail = true;
            }

            if ("阿米娅" === operators[o] || "诗怀雅" === operators[o] || "明椒" === operators[o]) {
              Amiya = 0.07;
            }

            if ("凯尔希" === operators[o]) {
              Kaltsit = 0.02;
            }
          }
        }

        //办公室
        let hire_rooms = rooms.hire;
        for (let h = 0; h < hire_rooms.length; h++) {
          let operators = hire_rooms[h].operators;
          if ("絮雨" === operators[0]) {
            let info = {info: "絮雨" + "——思维链环+", value: 20};
            this.infoList.push(info);
            ChainLink = ChainLink + 20;
          }
        }

        //宿舍
        let dormitory_rooms = rooms.dormitory;
        for (let d = 0; d < dormitory_rooms.length; d++) {

          if ("undefined" !== typeof dormitory_rooms[d].operators) {
            let operators = dormitory_rooms[d].operators;
            for (let o = 0; o < operators.length; o++) {

              if ("爱丽丝" === operators[o] || "车尔尼" === operators[o]) {
                let info = {info: operators[o] + "——思维链环+", value: 5};
                this.infoList.push(info);
                ChainLink = ChainLink + 5;
              }
            }
          }
        }


        console.log("———————第" + (i + 1) + "班的发电站个数：", powerNum);

        let trade_rooms = rooms.trading;
        let tradeNum = trade_rooms.length;
        let manu_rooms = rooms.manufacture;


        for (let t = 0; t < trade_rooms.length; t++) {
          let operators = trade_rooms[t].operators;
          for (let o = 0; o < operators.length; o++) {
            if ("黑键" === operators[o] || "黑键" === operators[o]) {
              let info = {info: operators[o] + "——思维链环+", value: 20};
              this.infoList.push(info);
              ChainLink = ChainLink + 20;
            }
          }
        }

        for (let m = 0; m < manu_rooms.length; m++) {
          let operators = manu_rooms[m].operators;
          for (let o = 0; o < operators.length; o++) {
            if ("迷迭香" === operators[o] || "迷迭香" === operators[o]) {
              let info = {info: operators[o] + "——思维链环+", value: 20};
              this.infoList.push(info);
              ChainLink = ChainLink + 20;
            }
          }

        }

        //贸易站
        for (let t = 0; t < trade_rooms.length; t++) {
          let info = {info: "———————第" + (i + 1) + "班的第" + (t + 1) + "个贸易站———————", value: 0};
          this.infoList.push(info);

          info = {info: "思维链环", value: ChainLink};
          this.infoList.push(info);

          this.cal_trade(drones, dronesIndex, (t + 1), trade_rooms[t].operators, Amiya, ChainLink);
        }


        //制造站
        for (let m = 0; m < manu_rooms.length; m++) {
          let info = {info: "———————第" + (i + 1) + "班的第" + (m + 1) + "个制造站———————", value: 0};
          this.infoList.push(info);
          info = {info: "思维链环", value: ChainLink};
          this.infoList.push(info);
          info = {info: "发电站个数", value: powerNum};
          this.infoList.push(info);
          let product = manu_rooms[m].product;
          this.cal_manu(drones, dronesIndex, (m + 1), product, manu_rooms[m].operators, Kaltsit, powerNum, tradeNum, ChainLink, Flametail);
        }
      }


    },

    //drones,加速房间类型
    //dronesIndex,加速房间编号
    // product,加速产物
    // manu_room,房间内干员
    // Kaltsit,凯尔希
    // powerNum,发电站数量
    // tradeNum,贸易站数量
    // ChainLink,思维链环
    // Flametail,焰尾
    cal_manu(drones, dronesIndex, index, product, manu_room, Kaltsit, powerNum, tradeNum, ChainLink, Flametail) {
      let room_char_num = manu_room.length;
      let info = {info: "房间人数", value: room_char_num};
      this.infoList.push(info);
      let manu_spd = 0; //制造效率
      let char_skill_sp = []; //特殊技能
      let char_skill_room = []; //根据设施技能
      let char_skill_variable = []; //变量类技能
      let Standardization = 0;  //标准化
      let Rhine = 0;  //莱因科技
      // let powerNum = 3; //发电站个数
      // let tradeNum = 2; //贸易站个数
      let prodLimit = 0; //仓库上限
      // let ChainLink = 60; //思维链环
      let spdByPower = false;
      // let product = 'Battle Record';
      let Knights = 0;


      for (let i = 0; i < manu_room.length; i++) {
        let manu_spd_item = 0;
        for (let j = 0; j < building_data_manu.length; j++) {
          if (manu_room[i] === building_data_manu[j].name) {
            if ("机械辅助" === building_data_manu[j].skillName) {
              manu_spd_item = parseFloat(building_data_manu[j].skillData);
              info = {info: building_data_manu[j].name + "—提供制造效率", value: manu_spd_item};
              this.infoList.push(info);
              manu_spd = manu_spd + manu_spd_item;
            }

            if ("标准化" === building_data_manu[j].skillName) {
              manu_spd_item = parseFloat(building_data_manu[j].skillData);
              info = {info: building_data_manu[j].name + "—提供制造效率", value: manu_spd_item};
              this.infoList.push(info);
              manu_spd = manu_spd + manu_spd_item;
              Standardization++;
            }


            if ("标准化红松" === building_data_manu[j].skillName) {
              manu_spd_item = parseFloat(building_data_manu[j].skillData);
              info = {info: building_data_manu[j].name + "—提供制造效率", value: manu_spd_item};
              this.infoList.push(info);
              manu_spd = manu_spd + manu_spd_item;
              Knights++;
            }

            if ("莱茵科技" === building_data_manu[j].skillName) {
              manu_spd_item = parseFloat(building_data_manu[j].skillData);
              info = {info: building_data_manu[j].name + "—提供制造效率", value: manu_spd_item};
              this.infoList.push(info);
              manu_spd = manu_spd + manu_spd_item;
              Rhine++;
            }


            if ("制造效率" === building_data_manu[j].skillName) {
              manu_spd_item = parseFloat(building_data_manu[j].skillData);
              info = {info: building_data_manu[j].name + "—提供制造效率", value: manu_spd_item};
              this.infoList.push(info);
              manu_spd = manu_spd + manu_spd_item;
            }

            if ("仓库整备" === building_data_manu[j].skillName) {
              manu_spd_item = parseFloat(building_data_manu[j].skillData);
              prodLimit = prodLimit + parseFloat(building_data_manu[j].prodLimit);
              info = {info: building_data_manu[j].name + "—提供制造效率", value: manu_spd_item};
              this.infoList.push(info);
              manu_spd = manu_spd + manu_spd_item;
            }

            if ("仓库上限" === building_data_manu[j].skillName) {
              prodLimit = prodLimit + parseFloat(building_data_manu[j].prodLimit);
            }

            if ("念力" === building_data_manu[j].skillName) {
              manu_spd_item =
                ChainLink * parseFloat(building_data_manu[j].skillDataSp);
              info = {info: building_data_manu[j].name + "—提供制造效率", value: manu_spd_item};
              this.infoList.push(info);
              manu_spd = manu_spd + manu_spd_item;
            }


            if ("Pure Gold" === product) {
              if ("金属工艺" === building_data_manu[j].skillName) {
                manu_spd_item = parseFloat(building_data_manu[j].skillData);
                info = {info: building_data_manu[j].name + "—提供赤金效率", value: manu_spd_item};
                this.infoList.push(info);
                manu_spd = manu_spd + manu_spd_item;
              }
            }

            if ("Battle Record" === product) {
              if ("作战指导录像" === building_data_manu[j].skillName) {
                manu_spd_item = parseFloat(building_data_manu[j].skillData);
                info = {info: building_data_manu[j].name + "—提供作战记录效率", value: manu_spd_item};
                this.infoList.push(info);
                manu_spd = manu_spd + manu_spd_item;
              }

              if ("仓库上限-作战记录" === building_data_manu[j].skillName) {
                prodLimit = prodLimit + parseFloat(building_data_manu[j].prodLimit);
              }

            }


            if ("标准化增强" === building_data_manu[j].skillName) {
              char_skill_sp.push(building_data_manu[j]);
            }

            if ("莱茵科技增强" === building_data_manu[j].skillName) {
              char_skill_sp.push(building_data_manu[j]);
            }

            if ("根据上限增加效率" === building_data_manu[j].skillName) {
              char_skill_sp.push(building_data_manu[j]);
            }

            if ("配合意识" === building_data_manu[j].skillName) {
              char_skill_variable.push(building_data_manu[j]);
            }

            if ("再生能源" === building_data_manu[j].skillName) {
              char_skill_room.push(building_data_manu[j]);

            }

            if ("自动化" === building_data_manu[j].skillName) {
              char_skill_room.push(building_data_manu[j]);
              spdByPower = true;
            }
          }
        }
      }


      info = {info: "仓库上限", value: prodLimit};
      this.infoList.push(info);

      for (let i = 0; i < char_skill_sp.length; i++) {
        let manu_spd_item = 0;
        if ("标准化增强" === char_skill_sp[i].skillName) {
          manu_spd_item =
            Standardization * parseFloat(char_skill_sp[i].skillDataSp);
          info = {info: char_skill_sp[i].name + "—提供制造效率", value: manu_spd_item};
          this.infoList.push(info);
          manu_spd = manu_spd + manu_spd_item;
        }

        if ("莱茵科技增强" === char_skill_sp[i].skillName) {
          manu_spd_item =
            Rhine * parseFloat(char_skill_sp[i].skillDataSp);
          info = {info: char_skill_sp[i].name + "—提供制造效率", value: manu_spd_item};
          this.infoList.push(info);
          manu_spd = manu_spd + manu_spd_item;
        }

        if ("根据上限增加效率" === char_skill_sp[i].skillName) {
          manu_spd_item =
            prodLimit * parseFloat(char_skill_sp[i].skillDataSp);
          info = {info: char_skill_sp[i].name + "—提供制造效率", value: manu_spd_item};
          this.infoList.push(info);
          manu_spd = manu_spd + manu_spd_item;
        }
      }

      if ("Battle Record" === product) {
        if (Flametail) {
          let manu_spd_item = Knights * 0.1;
          info = {info: "焰尾—提供制造效率", value: manu_spd_item};
          this.infoList.push(info);
          manu_spd = manu_spd + manu_spd_item;
        }
      }

      for (let i = 0; i < char_skill_variable.length; i++) {
        let manu_spd_item = 0;
        if ("配合意识" === char_skill_variable[i].skillName) {
          manu_spd_item =
            manu_spd / parseFloat(char_skill_variable[i].variable) * parseFloat(char_skill_variable[i].skillDataSp);

          if (manu_spd_item > parseFloat(char_skill_variable[i].skillLimit)) {
            manu_spd_item = 0.4
          }

          info = {info: char_skill_variable[i].name + "—提供制造效率", value: manu_spd_item};
          this.infoList.push(info);
          manu_spd = manu_spd + manu_spd_item;
        }
      }

      //自动化清零
      if (spdByPower) {
        manu_spd = 0;
      }
      for (let i = 0; i < char_skill_room.length; i++) {
        let manu_spd_item = 0;
        if ("Pure Gold" === product) {
          if ("再生能源" === char_skill_room[i].skillName) {
            manu_spd_item =
              tradeNum * parseFloat(char_skill_room[i].skillDataSp);
            info = {info: char_skill_room[i].name + "—提供赤金效率", value: manu_spd_item};
            this.infoList.push(info);
            manu_spd = manu_spd + manu_spd_item;
          }
        }
        if ("自动化" === char_skill_room[i].skillName) {
          manu_spd_item =
            powerNum * parseFloat(char_skill_room[i].skillDataSp);
          info = {info: char_skill_room[i].name + "—提供制造效率", value: manu_spd_item};
          this.infoList.push(info);
          manu_spd = manu_spd + manu_spd_item;
        }

      }

      manu_spd = manu_spd + 1 + Kaltsit + room_char_num * 0.01;
      if ('manufacture' === drones) {
        if (dronesIndex === index) {
          manu_spd = manu_spd + 0.83;
          console.log("无人机加速了这个房间")
        }
      }
      info = {info: "制造站最终效率", value: manu_spd};
      this.infoList.push(info);

      var capacity = 0;
      if ("Pure Gold" === product) {
        capacity = 416.7 * manu_spd * 8;
        this.capacity_gold = this.capacity_gold + capacity;
      }

      if ("Battle Record" === product) {
        capacity = 333.4 * manu_spd * 8;
        this.capacity_exp += capacity;
      }

      info = {info: product + "产能", value: capacity};
      this.infoList.push(info);

    },
    cal_trade(drones, dronesIndex, index, trading, Amiya, ChainLink) {
      let room_char_num = trading.length; //设施入驻人数
      let info = {info: "房间人数", value: room_char_num};
      this.infoList.push(info);
      let trade_spd = 0; //贸易效率
      let trade_spdMagnification = 1; //贸易倍率
      let char_skill_sp = []; //特殊技能
      let char_skill_variable = []; //变量类技能
      let dormLv = 20; //宿舍等级
      let meetLv = 3; //会客室等级
      let orderLimit = 10; //订单上限
      let LapplandFlag = false; //是否有拉普兰德
      let Shamare = false; //是否有巫恋

      for (let i = 0; i < trading.length; i++) {
        if ("拉普兰德" === trading[i]) {
          LapplandFlag = true;
        }
        if ("巫恋" === trading[i]) {
          Shamare = true;
        }

        for (let j = 0; j < building_data_trade.length; j++) {
          if (trading[i] === building_data_trade[j].name) {
            // ************基建变量**************

            if ("加容量" === building_data_trade[j].skillName) {
              orderLimit = orderLimit + building_data_trade[j].ordLimit;
            }

            // ************干员技能**************
            //标准技能
            if ("基建效率" === building_data_trade[j].skillName) {
              trade_spd =
                trade_spd + parseFloat(building_data_trade[j].skillData);
              info = {
                info: building_data_trade[j].name + "—提供贸易效率",
                value: parseFloat(building_data_trade[j].skillData)
              };
              this.infoList.push(info);
            }

            // 订单上限增加
            if ("基建效率&加容量" === building_data_trade[j].skillName) {
              orderLimit =
                orderLimit + parseInt(building_data_trade[j].ordLimit);
              trade_spd =
                trade_spd + parseFloat(building_data_trade[j].skillData);
              info = {
                info: building_data_trade[j].name + "—提供贸易效率",
                value: parseFloat(building_data_trade[j].skillData)
              };
              this.infoList.push(info);
            }

            //  龙舌兰
            if ("龙舌兰" === building_data_trade[j].skillName) {
              trade_spdMagnification = 1.24;
              info = {info: building_data_trade[j].name + "—提供贸易效率倍率", value: trade_spdMagnification};
              this.infoList.push(info);
            }

            // 但书
            if ("但书" === building_data_trade[j].skillName) {
              trade_spdMagnification = 1.55;
              info = {info: building_data_trade[j].name + "—提供贸易效率倍率", value: trade_spdMagnification};
              this.infoList.push(info);
            }

            //  空弦
            if ("基建效率_根据宿舍" === building_data_trade[j].skillName) {
              trade_spd =
                trade_spd +
                dormLv * parseFloat(building_data_trade[j].skillDataSp);
              info = {
                info: building_data_trade[j].name + "—提供贸易效率",
                value: dormLv * parseFloat(building_data_trade[j].skillDataSp)
              };
              this.infoList.push(info);
            }

            // 黑键
            if ("基建效率_感知信息" === building_data_trade[j].skillName) {
              console.log(ChainLink, parseFloat(building_data_trade[j].variable))
              let trade_spd_v =
                ChainLink / parseFloat(building_data_trade[j].variable) * parseFloat(building_data_trade[j].skillDataSp);
              trade_spd = trade_spd + trade_spd_v;
              info = {info: building_data_trade[j].name + "—提供贸易效率", value: trade_spd_v};
              this.infoList.push(info);
            }

            // 伺夜
            if ("基建效率_根据会议室" === building_data_trade[j].skillName) {
              let trade_spd_v =
                parseFloat(building_data_trade[j].skillData) +
                meetLv * parseFloat(building_data_trade[j].skillDataSp);
              trade_spd = trade_spd + trade_spd_v;
              info = {info: building_data_trade[j].name + "—提供贸易效率", value: trade_spd_v};
              this.infoList.push(info);
            }

            // 德克萨斯
            if ("基建效率_德克萨斯" === building_data_trade[j].skillName) {
              char_skill_sp.push(building_data_trade[j]);
            }

            // 孑
            if ("基建效率_孑" === building_data_trade[j].skillName) {
              char_skill_variable.push(building_data_trade[j]);
            }

            //  雪雉
            if ("基建效率_根据效率" === building_data_trade[j].skillName) {
              char_skill_variable.push(building_data_trade[j]);
            }

          }
        }
      }

      info = {info: "订单上限：", value: orderLimit};
      this.infoList.push(info);


      for (let i = 0; i < char_skill_sp.length; i++) {
        let char_trade_spd = 0;
        //  德克萨斯
        if ("基建效率_德克萨斯" === char_skill_sp[i].skillName) {
          if (LapplandFlag) {
            char_trade_spd = parseFloat(char_skill_sp[i].skillDataSp);
          }

          info = {info: char_skill_sp[i].name + "—提供贸易效率", value: char_trade_spd};
          this.infoList.push(info);
          trade_spd = trade_spd + char_trade_spd;
        }
        console.log("当前技能：", char_skill_sp[i]);
      }


      for (let i = 0; i < char_skill_variable.length; i++) {
        let char_trade_spd = 0;
        //雪雉
        if ("基建效率_根据效率" === char_skill_variable[i].skillName) {
          char_trade_spd =
            (trade_spd / parseFloat(char_skill_variable[i].variable)) *
            parseFloat(char_skill_variable[i].skillDataSp);

          if (char_trade_spd > parseFloat(char_skill_variable[i].skillLimit)) {
            char_trade_spd = 0.35;
          }
          info = {info: char_skill_variable[i].name + "—提供贸易效率", value: char_trade_spd};
          this.infoList.push(info);
          trade_spd = trade_spd + char_trade_spd;
        }

        //  孑
        if ("基建效率_孑" === char_skill_variable[i].skillName) {
          if (true) {
            orderLimit = orderLimit - parseInt(trade_spd / 0.1);

            char_trade_spd =
              orderLimit * parseFloat(char_skill_variable[i].skillDataSp);
          }
          info = {info: char_skill_variable[i].name + "—提供贸易效率", value: char_trade_spd};
          this.infoList.push(info);
          trade_spd = trade_spd + char_trade_spd;
        }
      }

      //  巫恋
      if (Shamare) {
        trade_spd = (room_char_num - 1) * 0.45;
        info = {info: "清除当前站贸易效率,巫恋提供贸易效率:", value: trade_spd};
        this.infoList.push(info);
      }

      trade_spd = trade_spd + 1 + Amiya + room_char_num * 0.01;
      if ('trading' === drones) {
        if (dronesIndex === index) {
          trade_spd = trade_spd + 0.83;
          console.log("无人机加速了这个房间")
        }
      }
      trade_spd = trade_spd * trade_spdMagnification;
      info = {info: "贸易站最终效率", value: trade_spd};
      this.infoList.push(info);

      let capacity = 427.1 * trade_spd * 8;
      this.capacity_lmd += capacity;
      info = {info: "lmd产能", value: capacity};
      this.infoList.push(info);
    },
  },
};
</script>
