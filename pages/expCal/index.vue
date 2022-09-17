<template>
  <div :class="ligthOrDark(1)">
    <div class="calculator_aera">
    <div class="calculator_input_area">
      <table class="calculator_input_table">
        <tr>
          <td><div class="calculator_input_title">选择星级</div></td>
          <td colspan="2">
            <div class="calculator_downMenu_area">
              <el-dropdown trigger="click">
                <span
                  class="
                    calculator_downMenu_border
                    calculator_downMenu_rarity_word_size
                  "
                >
                  {{ rarity_word }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>

                <el-dropdown-menu
                  slot="dropdown"
                  class="calculator_downMenu_rarity_item_size"
                >
                  <el-dropdown-item>
                    <div
                      @click="checkRarity(2)"
                      class="calculator_downMenu_rarity_word_size"
                    >
                      二星
                    </div></el-dropdown-item
                  >
                  <el-dropdown-item>
                    <div
                      @click="checkRarity(3)"
                      class="calculator_downMenu_rarity_word_size"
                    >
                      三星
                    </div></el-dropdown-item
                  >
                  <el-dropdown-item>
                    <div
                      @click="checkRarity(4)"
                      class="calculator_downMenu_rarity_word_size"
                    >
                      四星
                    </div></el-dropdown-item
                  >
                  <el-dropdown-item>
                    <div
                      @click="checkRarity(5)"
                      class="calculator_downMenu_rarity_word_size"
                    >
                      五星
                    </div></el-dropdown-item
                  >
                  <el-dropdown-item>
                    <div
                      @click="checkRarity(6)"
                      class="calculator_downMenu_rarity_word_size"
                    >
                      六星
                    </div></el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </td>
        </tr>
        <tr>
          <td><div class="calculator_input_title">当前</div></td>
          <td><div class="calculator_input_evo">精英等级</div></td>
          <td>
            <div class="calculator_input_level_num">
              <el-input-number
                v-model="nowEvoLevel"
                @input="computeValue()"
                :min="0"
                :max="2"
                label="精英等级"
              >
              </el-input-number>
            </div>
          </td>
          <td><div class="calculator_input_evo">当前等级</div></td>
          <td>
            <div>
              <el-input
                @input="computeValue()"
                class="calculator_input_level"
                v-model="nowLevel"
                placeholder=""
              ></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td><div class="calculator_input_title">目标</div></td>
          <td><div class="calculator_input_evo">精英等级</div></td>

          <td>
            <div class="calculator_input_level_num">
              <el-input-number
                v-model="targetEvoLevel"
                @input="computeValue()"
                :min="0"
                :max="2"
                label="精英等级"
              >
              </el-input-number>
            </div>
          </td>
          <td>
            <div class="calculator_input_evo">目标等级</div>
          </td>
          <td>
            <div>
              <el-input
                @input="computeValue()"
                class="calculator_input_level"
                v-model="targetLevel"
                placeholder=""
              ></el-input>
            </div>
          </td>
        </tr>
        <tr>
          <td><div class="calculator_input_title">已有资源</div></td>
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/高级作战记录.png"
              alt=""
            />
          </td>
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/中级作战记录.png"
              alt=""
            />
          </td>
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/初级作战记录.png"
              alt=""
            />
          </td>
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/基础作战记录.png"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <el-input
              @input="computeValue()"
              class="calculator_existGoods_input_size"
              v-model="item_exp_4"
              placeholder="数量"
            ></el-input>
          </td>
          <td>
            <el-input
              @input="computeValue()"
              class="calculator_existGoods_input_size"
              v-model="item_exp_3"
              placeholder="数量"
            ></el-input>
          </td>
          <td>
            <el-input
              @input="computeValue()"
              class="calculator_existGoods_input_size"
              v-model="item_exp_2"
              placeholder="数量"
            ></el-input>
          </td>
          <td>
            <el-input
              @input="computeValue()"
              class="calculator_existGoods_input_size"
              v-model="item_exp_1"
              placeholder="数量"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/龙门币.png"
              alt=""
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <el-input
              @input="computeValue()"
              class="calculator_existGoods_input_size_Lmb"
              v-model="item_gold"
              placeholder=""
            ></el-input>
          </td>
        </tr>
        <tr>
          <td><div class="calculator_input_title">基建产能</div></td>
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/中级作战记录.png"
              alt=""
            />
          </td>
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/龙门币.png"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <el-input
              @input="computeValue()"
              class="calculator_existGoods_input_size"
              v-model="jijian_expSum"
              placeholder="数量"
            ></el-input>
          </td>
          <td>
            <el-input
              @input="computeValue()"
              class="calculator_existGoods_input_size"
              v-model="jijian_goldSum"
              placeholder="数量"
            ></el-input>
          </td>
        </tr>
      </table>
    </div>

    <div class="calculator_result_area">
      <table class="calculator_result_word_size_2" border="0">
        <tr>
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/声望.png"
              alt=""
            />
          </td>
          
          <td>需求为
          
            <a class="result_cost_color">{{ expResult }}</a
            >经验
          
          </td>
        </tr>
        <tr>
          <td colspan="2">刷<a class="result_cost_color">LS-6</a>副本
          
            次数：<a class="result_cost_color">{{ expStageNum }}</a
            >次
          </td>
        </tr>

        <tr>
          
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/理智.png"
              alt=""
            />
          </td>
         <td>消耗
            为<a class="result_cost_color">{{ expReasonCost }}</a> &emsp;需要
          
            <a class="result_cost_color">{{ daySum_exp }}</a
            >天
          </td>
        </tr>

        <tr>
          <td colspan="2">
            基建+LS-6需要
            <a class="result_cost_color">{{ daySum_exp_Jijian }}</a
            >天
          </td>
        </tr>
        <tr style="height: 10px"></tr>
        <tr>
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/龙门币.png"
              alt=""
            />
          </td>
          <td>需求为
            <a class="result_cost_color">{{ goldResult }}</a
            >龙门币
          </td>
        </tr>
        <tr>
          <td colspan="2">刷<a class="result_cost_color">CE-6</a>副本
            次数： <a class="result_cost_color">{{ goldStageNum }}</a
            >次
          </td>
        </tr>
        <tr>
         
          <td>
            <img
              vertical-align:middle
              class="result_img_size"
              src="/img/materials/理智.png"
              alt=""
            />
          </td>
          <td>消耗
            为 <a class="result_cost_color">{{ goldReasonCost }}</a
            >&emsp; 需要
          
            <a class="result_cost_color">{{ daySum_gold }}</a
            >天
          </td>
        </tr>
        <tr>
          <td colspan="2">
            基建+CE-6需要
            <a class="result_cost_color">{{ daySum_gold_Jijian }}</a
            >天
          </td>
        </tr>
      </table>
    </div>

    <!-- <a  v-for="(item, index) in AllData"
            :key="index">{{item}}</a> -->
    <div class="calculator_null_area"></div>
  </div>
  </div>
</template>


<script>
import toolApi from "@/api/tool";
import cookie from "js-cookie";
export default {
  data() {
    return {
      nowEvoLevel: 0,
      nowLevel: 1,
      targetEvoLevel: 2,
      targetLevel: 90,
      goldResult0: 0,
      goldResult1: 0,
      goldResult2: 0,
      goldResult: 0,
      expResult: 0,
      expResult0: 0,
      expResult1: 0,
      expResult2: 0,
      evoCost1: 0,
      evoCost2: 0,
      AllData: [],

      rarity_word: "⭐⭐⭐⭐⭐⭐",
      rarity: 6,
      expStageNum: 0,
      expReasonCost: 0,
      goldStageNum: 0,
      goldReasonCost: 0,
      daySum_exp: 10,
      daySum_gold: 0,
      daySum_exp_Jijian: 0,
      daySum_gold_Jijian: 0,
      jijian_expSum: 0,
      jijian_goldSum: 0,
      item_exp_1: 0,
      item_exp_2: 0,
      item_exp_3: 0,
      item_exp_4: 0,
      item_gold: 0,
      expAllData: [
        0, 100, 217, 351, 502, 670, 855, 1057, 1276, 1512, 1765, 2035, 2322,
        2626, 2947, 3285, 3640, 4012, 4401, 4807, 5230, 5670, 6127, 6601, 7092,
        7600, 8125, 8667, 9226, 9800, 10389, 10994, 11615, 12252, 12905, 13574,
        14259, 14960, 15676, 16400, 17139, 17888, 18647, 19417, 20200, 21004,
        21824, 22660, 23512, 24400, 24400, 24520, 24692, 24916, 25192, 25520,
        25900, 26332, 26816, 27352, 27940, 28580, 29272, 30016, 30812, 31660,
        32560, 33512, 34516, 35572, 36680, 37840, 39052, 40316, 41632, 43000,
        44420, 45892, 47416, 48992, 50620, 52326, 54110, 55972, 57912, 59930,
        62026, 64200, 66452, 68782, 71190, 73774, 76534, 79470, 82582, 85870,
        89334, 92974, 96790, 100782, 104950, 109294, 113814, 118510, 123400,
        128726, 134745, 141057, 147562, 154400, 161791, 169448, 177271, 185360,
        193715, 202336, 211223, 220376, 229795, 239400, 249351, 259799, 270744,
        282186, 294125, 306561, 319494, 332924, 346851, 361400, 361400, 361591,
        361894, 362309, 362836, 363475, 364226, 365089, 366064, 367151, 368350,
        369661, 371084, 372619, 374266, 376025, 377896, 379879, 381974, 384181,
        386500, 388931, 391474, 394129, 396896, 399775, 402766, 405869, 409084,
        412411, 415850, 419452, 423217, 427145, 431236, 435490, 439907, 444487,
        449230, 454136, 459205, 464437, 469832, 475390, 481111, 486995, 493042,
        499252, 505625, 512161, 518860, 525762, 532867, 540175, 547686, 555400,
        563317, 571437, 579760, 588286, 597015, 606178, 615775, 625806, 636271,
        647170, 658503, 670270, 682471, 695200, 708269, 722016, 736441, 751544,
        767325, 783784, 800921, 818736, 837229, 856400, 876249, 897354, 919715,
        943332, 968205, 994334, 1021719, 1050360, 1080257, 1111400,
      ],
      goldAllData: [
        0, 30, 66, 109, 159, 216, 281, 354, 435, 525, 624, 732, 850, 978, 1116,
        1265, 1425, 1607, 1813, 2044, 2302, 2588, 2903, 3249, 3627, 4038, 4484,
        4966, 5486, 6043, 6638, 7273, 7950, 8670, 9434, 10243, 11099, 12003,
        12955, 13947, 14989, 16075, 17206, 18384, 19613, 20907, 22260, 23673,
        25147, 26719, 26719, 26767, 26838, 26933, 27053, 27199, 27372, 27573,
        27804, 28066, 28359, 28685, 29046, 29442, 29874, 30344, 30852, 31400,
        31989, 32620, 33295, 34014, 34779, 35590, 36449, 37357, 38315, 39325,
        40387, 41503, 42674, 43919, 45241, 46641, 48121, 49683, 51328, 53059,
        54876, 56782, 58778, 60949, 63298, 65829, 68546, 71453, 74553, 77851,
        81350, 85055, 88969, 93096, 97440, 102005, 106812, 112106, 118155,
        124568, 131249, 138347, 146100, 154216, 162594, 171346, 180478, 189996,
        199905, 210211, 220920, 231947, 243480, 255704, 268630, 282269, 296632,
        311729, 327572, 344171, 361538, 379841, 379841, 379917, 380041, 380214,
        380439, 380718, 381052, 381444, 381895, 382408, 382985, 383627, 384337,
        385117, 385968, 386893, 387894, 388973, 390132, 391372, 392696, 394106,
        395604, 397192, 398872, 400645, 402514, 404481, 406548, 408717, 410990,
        413403, 415959, 418661, 421512, 424515, 427673, 430989, 434466, 438106,
        441913, 445889, 450038, 454362, 458864, 463548, 468416, 473471, 478716,
        484154, 489788, 495655, 501758, 508101, 514688, 521523, 528609, 535949,
        543548, 551409, 559536, 568149, 577257, 586867, 596987, 607624, 618787,
        630483, 642721, 655603, 668946, 683105, 698093, 713921, 730602, 748147,
        766569, 785880, 806093, 827219, 849311, 873033, 898413, 925478, 954256,
        984775, 1017062, 1051145, 1087051, 1124796,
      ],
    };
  },
  created() {
    this.computeValue();
  },
  methods: {
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
    checkRarity(index) {
      if (index == 6) {
        this.targetLevel = 90;
        this.rarity_word = "⭐⭐⭐⭐⭐⭐";
        this.rarity = 6;
      } else if (index == 5) {
        this.targetLevel = 80;
        this.rarity_word = "⭐⭐⭐⭐⭐";
        this.rarity = 5;
      } else if (index == 4) {
        this.targetLevel = 70;
        this.rarity_word = "⭐⭐⭐⭐";
        this.rarity = 4;
      } else if (index == 3) {
        this.targetEvoLevel = 1;
        this.targetLevel = 55;
        this.rarity_word = "⭐⭐⭐";
        this.rarity = 3;
      } else if (index == 2) {
        this.targetEvoLevel = 0;
        this.targetLevel = 30;
        this.rarity_word = "⭐⭐";
        this.rarity = 2;
      } else if (index == 1) {
        this.rarity_word = "⭐";
        this.rarity = 1;
      }

      this.computeValue();
    },
    computeValue() {
      this.expResult0 = 0;
      this.expResult1 = 0;
      this.expResult2 = 0;
      this.expResult = 0;
      this.goldResult0 = 0;
      this.goldResult1 = 0;
      this.goldResult2 = 0;
      this.expResult = 0;
      this.evoCost1 = 0;
      this.evoCost2 = 0;
      this.goldStageNum = 0;
      this.expStageNum = 0;
      this.expReasonCost = 0;
      this.goldReasonCost = 0;
      this.daySum_exp = 0;
      this.daySum_gold = 0;

      this.daySum_exp_Jijian = 0;
      this.daySum_gold_Jijian = 0;

      if (this.targetLevel < 1) {
        this.targetLevel = "";
      }
      if (this.nowLevel < 1) {
        this.nowLevel = "";
      }

      if (this.nowEvoLevel < 1 && this.targetEvoLevel > -1) {
        if (this.rarity == 6) {
          //等级限制
          if (this.targetLevel > 50 && this.targetEvoLevel == 0) {
            this.targetLevel = 50;
          }

          if (this.nowLevel > 50 && this.targetEvoLevel > 0) {
            this.nowLevel = 50;
          }

          //目标精英0，当前精英0
          if (this.targetEvoLevel == 0 && this.nowEvoLevel == 0) {
            this.goldResult0 =
              parseInt(this.goldAllData[this.targetLevel - 1]) -
              parseInt(this.goldAllData[this.nowLevel - 1]);
            this.expResult0 =
              parseInt(this.expAllData[this.targetLevel - 1]) -
              parseInt(this.expAllData[this.nowLevel - 1]);
          }
          //当前精英0,目标精英1
          else {
            this.goldResult0 =
              parseInt(this.goldAllData[49]) -
              parseInt(this.goldAllData[this.nowLevel - 1]);
            this.expResult0 =
              parseInt(this.expAllData[49]) -
              parseInt(this.expAllData[this.nowLevel - 1]);
          }
        }

        if (this.rarity == 5) {
          if (this.targetLevel > 50 && this.targetEvoLevel == 0) {
            this.targetLevel = 50;
          }

          if (this.nowLevel > 50 && this.targetEvoLevel > 0) {
            this.nowLevel = 50;
          }

          if (this.nowEvoLevel == 0 && this.targetEvoLevel == 0) {
            this.goldResult0 =
              parseInt(this.goldAllData[this.targetLevel - 1]) -
              parseInt(this.goldAllData[this.nowLevel - 1]);
            this.expResult0 =
              parseInt(this.expAllData[this.targetLevel - 1]) -
              parseInt(this.expAllData[this.nowLevel - 1]);
          } else {
            this.goldResult0 =
              parseInt(this.goldAllData[49]) -
              parseInt(this.goldAllData[this.nowLevel - 1]);
            this.expResult0 =
              parseInt(this.expAllData[49]) -
              parseInt(this.expAllData[this.nowLevel - 1]);
          }
        }

        if (this.rarity == 4) {
          if (this.targetLevel > 45 && this.targetEvoLevel == 0) {
            this.targetLevel = 45;
          }

          if (this.nowLevel > 45 && this.targetEvoLevel > 0) {
            this.nowLevel = 45;
          }

          if (this.nowEvoLevel == 0 && this.targetEvoLevel == 0) {
            this.goldResult0 =
              parseInt(this.goldAllData[this.targetLevel - 1]) -
              parseInt(this.goldAllData[this.nowLevel - 1]);
            this.expResult0 =
              parseInt(this.expAllData[this.targetLevel - 1]) -
              parseInt(this.expAllData[this.nowLevel - 1]);
          } else {
            this.goldResult0 =
              parseInt(this.goldAllData[44]) -
              parseInt(this.goldAllData[this.nowLevel - 1]);
            this.expResult0 =
              parseInt(this.expAllData[44]) -
              parseInt(this.expAllData[this.nowLevel - 1]);
          }
        }

        if (this.rarity == 3) {
          this.targetEvoLevel = 1;
          if (this.targetLevel > 40 && this.targetEvoLevel == 0) {
            this.targetLevel = 40;
          }

          if (this.nowLevel > 40 && this.targetEvoLevel > 0) {
            this.nowLevel = 40;
          }

          if (this.targetEvoLevel == 0) {
            this.goldResult0 =
              parseInt(this.goldAllData[this.targetLevel - 1]) -
              parseInt(this.goldAllData[this.nowLevel - 1]);
            this.expResult0 =
              parseInt(this.expAllData[this.targetLevel - 1]) -
              parseInt(this.expAllData[this.nowLevel - 1]);
          } else {
            this.goldResult0 =
              parseInt(this.goldAllData[39]) -
              parseInt(this.goldAllData[this.nowLevel - 1]);
            this.expResult0 =
              parseInt(this.expAllData[39]) -
              parseInt(this.expAllData[this.nowLevel - 1]);
          }
        }

        if (this.rarity == 2 || this.rarity == 1) {
          this.targetEvoLevel = 0;
          if (this.targetLevel > 30 && this.targetEvoLevel == 0) {
            this.targetLevel = 30;
          }

          if (this.nowLevel > 30 && this.targetEvoLevel > 0) {
            this.nowLevel = 30;
          }

          if (this.targetEvoLevel == 0) {
            this.goldResult0 =
              parseInt(this.goldAllData[this.targetLevel - 1]) -
              parseInt(this.goldAllData[this.nowLevel - 1]);
            this.expResult0 =
              parseInt(this.expAllData[this.targetLevel - 1]) -
              parseInt(this.expAllData[this.nowLevel - 1]);
          } else {
            this.goldResult0 =
              parseInt(this.goldAllData[29]) -
              parseInt(this.goldAllData[this.nowLevel - 1]);
            this.expResult0 =
              parseInt(this.expAllData[29]) -
              parseInt(this.expAllData[this.nowLevel - 1]);
          }
        }
        console.log(
          "精英0消耗经验——" +
            this.expResult0 +
            "精英0消耗龙门币——" +
            this.goldResult0
        );
      }

      if (this.nowEvoLevel < 2 && this.targetEvoLevel > 0) {
        if (this.rarity == 6) {
          //等级限制
          if (this.targetLevel > 80 && this.targetEvoLevel == 1) {
            this.targetLevel = 80;
          }

          if (this.nowLevel > 80 && this.targetEvoLevel > 1) {
            this.nowLevel = 80;
          }

          // 判断是否精英化
          if (
            (this.targetEvoLevel == 2 && this.nowEvoLevel == 0) ||
            (this.targetEvoLevel == 1 && this.nowEvoLevel == 0)
          ) {
            this.evoCost1 = 30000;
          }
          // 0-1
          if (this.nowEvoLevel == 0 && this.targetEvoLevel == 1) {
            this.goldResult1 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.goldAllData[0 - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.expAllData[0 - 1 + 50]);
          }
          // 1-1
          else if (this.nowEvoLevel == 1 && this.targetEvoLevel == 1) {
            this.goldResult1 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 50]);
          }
          // 1-2
          else if (this.nowEvoLevel == 1 && this.targetEvoLevel == 2) {
            this.goldResult1 =
              parseInt(this.goldAllData[129]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[129]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 50]);
          }
          // 0-2
          else {
            this.goldResult1 =
              parseInt(this.goldAllData[129]) -
              parseInt(this.goldAllData[0 - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[129]) -
              parseInt(this.expAllData[0 - 1 + 50]);
          }
        }

        if (this.rarity == 5) {
          if (this.targetLevel > 70 && this.targetEvoLevel == 1) {
            this.targetLevel = 70;
          }

          if (this.nowLevel > 70 && this.targetEvoLevel > 1) {
            this.nowLevel = 70;
          }

          if (
            (this.targetEvoLevel == 2 && this.nowEvoLevel == 0) ||
            (this.targetEvoLevel == 1 && this.nowEvoLevel == 0)
          ) {
            this.evoCost1 = 20000;
          }
          // 0-1
          if (this.nowEvoLevel == 0 && this.targetEvoLevel == 1) {
            this.goldResult1 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.goldAllData[0 - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.expAllData[0 - 1 + 50]);
          }
          // 1-1
          else if (this.nowEvoLevel == 1 && this.targetEvoLevel == 1) {
            this.goldResult1 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 50]);

            this.expResult1 =
              parseInt(this.expAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 50]);
          }
          // 1-2
          else if (this.nowEvoLevel == 1 && this.targetEvoLevel == 2) {
            this.goldResult1 =
              parseInt(this.goldAllData[119]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[119]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 50]);
          }
          // 0-2
          else {
            this.goldResult1 =
              parseInt(this.goldAllData[119]) -
              parseInt(this.goldAllData[0 - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[119]) -
              parseInt(this.expAllData[0 - 1 + 50]);
          }
        }

        if (this.rarity == 4) {
          if (this.targetLevel > 60 && this.targetEvoLevel == 1) {
            this.targetLevel = 60;
          }

          if (this.nowLevel > 60 && this.targetEvoLevel > 1) {
            this.nowLevel = 60;
          }

          if (
            (this.targetEvoLevel == 2 && this.nowEvoLevel == 0) ||
            (this.targetEvoLevel == 1 && this.nowEvoLevel == 0)
          ) {
            this.evoCost1 = 15000;
          }

          // 0-1
          if (this.nowEvoLevel == 0 && this.targetEvoLevel == 1) {
            this.goldResult1 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.goldAllData[0 - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.expAllData[0 - 1 + 50]);
          }
          // 1-1
          else if (this.nowEvoLevel == 1 && this.targetEvoLevel == 1) {
            this.goldResult1 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 50]);
          }
          // 1-2
          else if (this.nowEvoLevel == 1 && this.targetEvoLevel == 2) {
            console.log("1到2");
            this.goldResult1 =
              parseInt(this.goldAllData[109]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[109]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 50]);
          }
          // 0-2
          else {
            this.goldResult1 =
              parseInt(this.goldAllData[109]) -
              parseInt(this.goldAllData[0 - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[109]) -
              parseInt(this.expAllData[0 - 1 + 50]);
          }
        }

        if (this.rarity == 3) {
          if (this.targetLevel > 55 && this.targetEvoLevel == 1) {
            this.targetLevel = 55;
          }

          if (this.nowLevel > 55 && this.targetEvoLevel > 1) {
            this.nowLevel = 55;
          }

          if (
            (this.targetEvoLevel == 2 && this.nowEvoLevel == 0) ||
            (this.targetEvoLevel == 1 && this.nowEvoLevel == 0)
          ) {
            this.evoCost1 = 10000;
          }
          // 0-1
          if (this.nowEvoLevel == 0 && this.targetEvoLevel == 1) {
            this.goldResult1 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.goldAllData[0 - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.expAllData[0 - 1 + 50]);
          }
          // 1-1
          else if (this.nowEvoLevel == 1 && this.targetEvoLevel == 1) {
            this.goldResult1 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[this.targetLevel - 1 + 50]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 50]);
          }
          //  1-2
          else if (this.nowEvoLevel == 1 && this.targetEvoLevel == 1) {
            this.goldResult1 =
              parseInt(this.goldAllData[104]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[104]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 50]);
          }
          //  0-2
          else {
            this.goldResult1 =
              parseInt(this.goldAllData[104]) -
              parseInt(this.goldAllData[0 - 1 + 50]);
            this.expResult1 =
              parseInt(this.expAllData[104]) -
              parseInt(this.expAllData[0 - 1 + 50]);
          }
        }
        console.log(
          "精英1消耗经验——" +
            this.expResult1 +
            "精英1消耗龙门币——" +
            this.goldResult1 +
            "精英1消耗——" +
            this.evoCost1
        );
      }

      if (this.nowEvoLevel < 3 && this.targetEvoLevel > 1) {
        if (this.rarity == 6) {
          //限制等级
          if (this.targetLevel > 90 && this.targetEvoLevel == 2) {
            this.targetLevel = 90;
          }
          if (this.nowLevel > 90 && this.nowEvoLevel == 2) {
            this.nowLevel = 90;
          }

          // 是否精英化
          if (
            (this.targetEvoLevel == 2 && this.nowEvoLevel == 0) ||
            (this.targetEvoLevel == 2 && this.nowEvoLevel == 1)
          ) {
            this.evoCost2 = 180000;
          }
          if (this.nowEvoLevel == 2) {
            this.goldResult2 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 130]);
            this.expResult2 =
              parseInt(this.expAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 130]);
          } else {
            this.goldResult2 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.goldAllData[0 - 1 + 130]);
            this.expResult2 =
              parseInt(this.expAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.expAllData[0 - 1 + 130]);
          }
        }

        if (this.rarity == 5) {
          if (this.targetLevel > 80 && this.targetEvoLevel == 2) {
            this.targetLevel = 80;
          }

          if (this.nowLevel > 80 && this.nowEvoLevel == 2) {
            this.nowLevel = 80;
          }

          if (this.nowLevel > 80 && this.nowEvoLevel == 2) {
            this.nowLevel = 80;
          }

          if (
            (this.targetEvoLevel == 2 && this.nowEvoLevel == 0) ||
            (this.targetEvoLevel == 2 && this.nowEvoLevel == 1)
          ) {
            this.evoCost2 = 120000;
          }
          if (this.nowEvoLevel == 2) {
            this.goldResult2 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 130]);
            this.expResult2 =
              parseInt(this.expAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 130]);
          } else {
            this.goldResult2 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.goldAllData[0 - 1 + 130]);
            this.expResult2 =
              parseInt(this.expAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.expAllData[0 - 1 + 130]);
          }
        }

        if (this.rarity == 4) {
          if (this.targetLevel > 70 && this.targetEvoLevel == 2) {
            this.targetLevel = 70;
          }

          if (this.nowLevel > 70 && this.nowEvoLevel == 2) {
            this.nowLevel = 70;
          }
          if (
            (this.targetEvoLevel == 2 && this.nowEvoLevel == 0) ||
            (this.targetEvoLevel == 2 && this.nowEvoLevel == 1)
          ) {
            this.evoCost2 = 60000;
          }
          if (this.nowEvoLevel == 2) {
            this.goldResult2 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.goldAllData[this.nowLevel - 1 + 130]);
            this.expResult2 =
              parseInt(this.expAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.expAllData[this.nowLevel - 1 + 130]);
          } else {
            this.goldResult2 =
              parseInt(this.goldAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.goldAllData[0 - 1 + 130]);
            this.expResult2 =
              parseInt(this.expAllData[this.targetLevel - 1 + 130]) -
              parseInt(this.expAllData[0 - 1 + 130]);
          }
        }
        console.log(
          "精英2消耗经验——" +
            this.expResult2 +
            "精英2消耗龙门币——" +
            this.goldResult2 +
            "精英2消耗——" +
            this.evoCost2
        );
      }

      this.expResult =
        this.expResult0 +
        this.expResult1 +
        this.expResult2 -
        this.item_exp_4 * 2000 -
        this.item_exp_3 * 1000 -
        this.item_exp_2 * 400 -
        this.item_exp_1 * 100;
      this.expStageNum = Math.ceil(this.expResult / 10000);
      this.expReasonCost = this.expStageNum * 36;
      this.goldResult =
        this.goldResult0 +
        this.goldResult1 +
        this.goldResult2 +
        this.evoCost1 +
        this.evoCost2 -
        this.item_gold;
      this.goldStageNum = Math.ceil(this.goldResult / 10000);
      this.goldReasonCost = parseInt(this.goldStageNum) * 36;
      this.daySum_exp = Math.ceil(this.expResult / 66666);
      this.daySum_gold = Math.ceil(this.goldResult / 66666);
      this.daySum_exp_Jijian = Math.ceil(
        this.expResult / (66666 + parseInt(this.jijian_expSum))
      );
    
      this.daySum_gold_Jijian = Math.ceil(
        this.goldResult / (66666 + parseInt(this.jijian_goldSum))
      );
    },
  },
};
</script>