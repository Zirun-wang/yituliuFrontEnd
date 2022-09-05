
<template>
  <div
    id="gacha"
    style="
      max-width: 800px;
      margin: auto;
      min-height: 900px;
      transform-style: preserve-3d;
    "
  >
    <el-collapse v-model="checkBox" @change="handleChange">
      <el-collapse-item
        style="display: block; position: sticky; top: 16px"
        name="0"
      >
        <template slot="title">
          <span class="collapse-item_title" style="color: purple"
          >共计{{ getFixed(gachaTimes) }}抽，氪金{{ sellsCount }}元</span
          >
        </template>
        <div class="gacha_unit" id="total">
          <!-- 如果有4个选项则修改为 style="width:98%;margin:0 1%;"，子项宽度25% -->
          <!-- <el-radio-group v-model="targetRadio" size="small" style="width:90%;margin:2px 5%;">
            <el-radio-button label="(CN)感谢庆典(11.14)" style="width:50%;"></el-radio-button>
            <el-radio-button label="(CN)春节限定(02.05)" style="width:50%;"></el-radio-button>
            <el-radio-button label="????" disabled style="width:32%;"></el-radio-button>
          </el-radio-group> -->
          <el-divider></el-divider>
          <div id="gacha_total_chart">
            <div
              id="gacha_total_pie"
              ref="gacha_total_pie_data"
              style="
                vertical-align: top;
                height: 200px;
                background: #3f51b5;
                width: 60%;
                display: inline-block;
              "
            >
              这来个饼图
            </div>
            <table
              id="gacha_total_table"
              style="height: 200px; width: 36%; display: inline-block"
            >
              <tbody>
              <tr class="gacha_total_table_tr">
                <td>现有</td>
                <td>{{ getFixed(gachaTimes_exist) }}</td>
                <td>抽</td>
              </tr>
              <tr class="gacha_total_table_tr">
                <td>日常</td>
                <td>{{ getFixed(gachaTimes_daily) }}</td>
                <td>抽</td>
              </tr>
              <tr class="gacha_total_table_tr">
                <td>潜在</td>
                <td>{{ getFixed(gachaTimes_potential) }}</td>
                <td>抽</td>
              </tr>
              <tr class="gacha_total_table_tr">
                <td>氪金</td>
                <td>{{ getFixed(gachaTimes_gacha) }}</td>
                <td>抽</td>
              </tr>
              <tr class="gacha_total_table_tr">
                <td>活动(估算)</td>
                <td>{{ getFixed(gachaTimes_activity) }}</td>
                <td>抽</td>
              </tr>
              <tr class="gacha_total_table_tr">
                <td>其它(估算)</td>
                <td>{{ getFixed(gachaTimes_other) }}</td>
                <td>抽</td>
              </tr>
              </tbody>
            </table>
          </div>

          <el-divider></el-divider>
          <div class="gacha_unit_child" style="display: flex">
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('4003icon', 0)"></div>
                {{ getFixed(orundum) }}
              </div>
            </div>
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('4002icon', 0)"></div>
                {{ getFixed(originium) }}
              </div>
            </div>
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('7003icon', 0)"></div>
                {{ getFixed(permit) }}
              </div>
            </div>
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('7004icon', 0)"></div>
                {{ getFixed(permit10) }}
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="1" style="display: block">
        <template slot="title">
          <span class="collapse-item_title"
          >现有库存 {{ getFixed(gachaTimes_exist) }}抽</span
          >
        </template>
        <div class="gacha_unit" id="wallet">
          <div class="gacha_unit_child">
            <div
              class="gacha_unit_child_title"
              style="width: 174px; display: inline-block"
            >
              <div style="display: flex">
                <div :class="getSpriteImg('4003icon', 0)"></div>
                合成玉
              </div>
            </div>
            <div class="gacha_unit_child_inputbox">
              <input
                type="number"
                class=""
                @change="compute()"
                style="width: 100px"
                v-model="orundum_exist"
              />
            </div>
          </div>
          <div class="gacha_unit_child">
            <div
              class="gacha_unit_child_title"
              style="width: 174px; display: inline-block"
            >
              <div style="display: flex">
                <div :class="getSpriteImg('4002icon', 0)"></div>
                源石
              </div>
            </div>
            <div class="gacha_unit_child_inputbox">
              <input
                type="number"
                class=""
                @change="compute()"
                style="width: 100px"
                v-model="originium_exist"
              />
            </div>
          </div>
          <div class="gacha_unit_child">
            <div
              class="gacha_unit_child_title"
              style="width: 174px; display: inline-block"
            >
              <div style="display: flex">
                <div :class="getSpriteImg('7003icon', 0)"></div>
                单抽
              </div>
            </div>
            <div
              class="gacha_unit_child_inputbox"
              style="display: inline-block"
            >
              <input
                type="number"
                class=""
                @change="compute()"
                style="width: 100px"
                v-model="permit_exist"
              />
            </div>
          </div>
          <div class="gacha_unit_child">
            <div
              class="gacha_unit_child_title"
              style="width: 174px; display: inline-block"
            >
              <div style="display: flex">
                <div :class="getSpriteImg('7004icon', 0)"></div>
                十连
              </div>
            </div>
            <div class="gacha_unit_child_inputbox">
              <input
                type="number"
                class=""
                @change="compute()"
                style="width: 100px"
                v-model="permit10_exist"
              />
            </div>
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item class="collapse-item" name="2" style="display: block">
        <template slot="title">
          <span class="collapse-item_title">
            潜在资源 {{ getFixed(gachaTimes_potential) }}抽</span
          >
        </template>
        <div class="gacha_unit" id="potential">
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_inputbox">
              <input type="number" @change="compute()" v-model="paradox" />
            </div>
            <div class="gacha_unit_child_title" style="width: 120px">
              个悖论模拟
            </div>
            <div class="gacha_unit_child_fixed" style="width: 105px">
              <div style="display: flex">
                {{ paradox * 200 }} &nbsp;
                <div :class="getSpriteImg('4003icon', 0)"></div>
              </div>
            </div>
          </div>

          <div class="gacha_unit_fold">
            <img
              class="gacha_img_small"
              src="/img/website/ex.png"
            />主线、突袭、绝境
          </div>
          <!-- 一个不太典型的复选模块，一行可以有多个 -->
          <el-checkbox-group v-model="gacha_potentialList" class="">
            <div
              v-for="(item, index) in gacha_potential"
              :key="index"
              v-show="item.type == 'main'"
              class="gacha_unit_child"
              @change="compute(item.name)"
            >
              <!-- zxcvb -->
              <!-- 这里交替输出两组控件，第一组是完整章节名，第二组省略章节名，只保留“突袭”“绝境”字样 -->
              <el-checkbox :label="index">
                <div
                  class="gacha_unit_child_title"
                  :style="getChapterWidth(index)"
                >
                  {{ item.name }}
                </div>
                <div class="gacha_unit_child_fixed">
                  <div style="display: flex">
                    {{ item.originium }}
                    <div :class="getSpriteImg('4002icon', 0)"></div>
                  </div>
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>

          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png" />支线、别传
          </div>
          <!-- 一个不太典型的复选模块，一行可以有多个 -->
          <el-checkbox-group v-model="gacha_potentialList" class="">
            <div
              v-for="(item, index) in gacha_potential"
              :key="index"
              v-show="item.type == 'activity'"
              class="gacha_unit_child"
              @change="compute(item.name)"
            >
              <el-checkbox :label="index">
                <div class="gacha_unit_child_title" style="width: 159px">
                  {{ item.name }}
                </div>
                <div class="gacha_unit_child_fixed">
                  <div style="display: flex">
                    {{ item.originium }}
                    <div :class="getSpriteImg('4002icon', 0)"></div>
                  </div></div
                ></el-checkbox>
            </div>
          </el-checkbox-group>

          <!-- 复选模块End -->
        </div>
      </el-collapse-item>
      <el-collapse-item class="collapse-item" name="3" style="display: block">
        <template slot="title">
          <span class="collapse-item_title">
            日常积累 {{ getFixed(gachaTimes_daily) }}抽</span
          >
        </template>
        <div class="gacha_unit" id="daily">
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              日常 {{ daysRemaining }} 天
            </div>
            <div class="gacha_unit_child_fixed" style="width: 174px">
              <div style="display: flex">
                <div :class="getSpriteImg('4003icon', 0)"></div>
                <div style="width: 75px">{{ dailyRewards }}</div>
              </div>
            </div>
          </div>
          <!-- 日常周常分界线 -->
          <el-divider></el-divider>

          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              周常 {{ weeksRemaining }} 周
            </div>
            <div class="gacha_unit_child_fixed" style="width: 174px">
              <div style="display: flex">
                <div :class="getSpriteImg('4003icon', 0)"></div>
                <div style="width: 75px">{{ weeklyRewards }}</div>
              </div>
            </div>
            <div
              @click="compute()"
              style="
                margin-left: 8px;
                width: 160px;
                display: inline-block;
                top: 2px;
              "
            >
              <el-switch
                v-model="weekTaskValue"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch
              >&nbsp;本周已完成
            </div>
          </div>

          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              剿灭 {{ weeksRemaining }} 周
            </div>
            <div class="gacha_unit_child_fixed" style="width: 174px">
              <div style="display: flex">
                <div :class="getSpriteImg('4003icon', 0)"></div>
                <div style="width: 75px">{{ weekStage }}</div>
              </div>
            </div>
            <div
              @click="compute()"
              style="
                margin-left: 8px;
                width: 160px;
                display: inline-block;
                top: 2px;
              "
            >
              <el-switch
                v-model="weekStageValue"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch
              >&nbsp;本周已完成
            </div>
          </div>
          <!-- 周常月常分界线 -->
          <el-divider></el-divider>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              绿票商店 {{ monthsRemaining }} 月
            </div>
            <div class="gacha_unit_child_fixed" style="width: 174px">
              <div style="display: flex">
                <div
                  style="width: 40px"
                  :class="getSpriteImg('4003icon', 0)"
                ></div>
                <div style="width: 72px">{{ monthsRemaining * 600 }}&nbsp;</div>
                <div
                  style="width: 40px"
                  :class="getSpriteImg('7003icon', 0)"
                ></div>
                <div style="width: 22px">{{ monthsRemaining * 2 }}&nbsp;</div>
              </div>
            </div>
            <div
              @click="compute()"
              style="
                margin-left: 8px;
                width: 150px;
                display: inline-block;
                top: 2px;
              "
            >
              <el-switch
                v-model="greenF1Value"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch
              >&nbsp;本月已换
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              每月签到 {{ SignInMonthsRemaining }} 月
            </div>
            <div class="gacha_unit_child_fixed" style="width: 174px">
              <div style="display: flex">
                <div :class="getSpriteImg('7003icon', 0)"></div>
                <div style="width: 75px">{{ SignInMonthsRemaining }}&nbsp;</div>
              </div>
            </div>
          </div>
          <el-checkbox-group v-model="gacha_store258List" class="">
            <div
              v-for="(item, index) in gacha_store258"
              :key="index"
              v-show="item.type == 'store'"
              class="gacha_unit_child"
              @change="compute(item.name)"
            >
              <el-checkbox :label="index">
                <div class="gacha_unit_child_title" style="width: 128px">
                  {{ item.name }}
                </div>
                <div class="gacha_unit_child_fixed" style="width: 174px">
                  <div style="display: flex">
                    <div
                      style="width: 40px"
                      :class="getSpriteImg('7004icon', 0)"
                    ></div>
                    <div style="width: 72px">{{ item.permit10 }}&nbsp;</div>
                    <div
                      style="width: 40px"
                      :class="getSpriteImg('7003icon', 0)"
                    ></div>
                    <div style="width: 22px">{{ item.permit }}&nbsp;</div>
                  </div>
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </el-collapse-item>

      <el-collapse-item class="collapse-item" name="4" style="display: block">
        <template slot="title">
          <span class="collapse-item_title">
            氪金资源 {{ getFixed(gachaTimes_gacha) }}抽</span
          >
        </template>

        <div class="gacha_unit" id="charge">
          <!-- 填空模块 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png" />月常礼包
          </div>
          <el-checkbox-group v-model="gacha_storePacksList">
            <div
              v-for="(item, index) in gacha_storePacks"
              :key="index"
              v-show="item.type == 'monthly'"
              class="gacha_unit_child"
              @change="compute(item.name)"
            >
              <el-checkbox :label="index">
                <div class="gacha_unit_child_title" style="width: 150px">
                  {{ item.name }}
                </div>
                <div class="gacha_unit_child_fixed" style="width: 100px">
                  [{{ item.price }}元/抽]
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
          <!-- 折叠模块 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png" />礼包
          </div>
          <!-- 一个典型的复选模块 -->
          <el-checkbox-group v-model="gacha_storePacksList" class="">
            <div
              v-for="(item, index) in gacha_storePacks"
              :key="index"
              v-show="item.type == 'gift'"
              class="gacha_unit_child"
              @change="compute(item.name)"
            >
              <el-checkbox :label="index">
                <div class="gacha_unit_child_title" style="width: 150px">
                  {{ item.name }}
                </div>
                <div class="gacha_unit_child_fixed" style="width: 100px">
                  [{{ item.price }}元/抽]
                </div></el-checkbox
              >
            </div>
          </el-checkbox-group>
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png" />首充
          </div>

          <el-checkbox-group v-model="gacha_storePacksList" class="">
            <div
              v-for="(item, index) in gacha_storePacks"
              :key="index"
              v-show="item.type == 'frist'"
              class="gacha_unit_child"
              @change="compute(item.name)"
            >
              <el-checkbox :label="index">
                <div class="gacha_unit_child_title" style="width: 150px">
                  {{ item.name }}
                </div>
                <div class="gacha_unit_child_fixed" style="width: 100px">
                  [{{ item.price }}元/抽]
                </div></el-checkbox
              >
            </div>
          </el-checkbox-group>

          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png" />非首充
          </div>
          <!-- 一个典型的复选模块 -->

          <div class="gacha_unit_child">
            <div class="gacha_unit_child_inputbox">
              <input
                type="number"
                @change="compute()"
                v-model="originium_648"
              />
            </div>
            <div class="gacha_unit_child_title" style="width: 270px">
              普通源石648元[11.68元/抽]
            </div>
            <div class="gacha_unit_child_fixed">
              <div style="display: flex">
                X{{ getFixed(originium_648 * 185) }}
                <div :class="getSpriteImg('4002icon', 0)"></div>
              </div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_inputbox">
              <input
                type="number"
                @change="compute()"
                v-model="originium_328"
              />
            </div>
            <div class="gacha_unit_child_title" style="width: 270px">
              普通源石328元[12.15元/抽]
            </div>
            <div class="gacha_unit_child_fixed">
              <div style="display: flex">
                X{{ getFixed(originium_328 * 90) }}
                <div :class="getSpriteImg('4002icon', 0)"></div>
              </div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_inputbox">
              <input
                type="number"
                @change="compute()"
                v-model="originium_198"
              />
            </div>
            <div class="gacha_unit_child_title" style="width: 270px">
              普通源石198元[13.20元/抽]
            </div>
            <div class="gacha_unit_child_fixed">
              <div style="display: flex">
                X{{ getFixed(originium_198 * 50) }}
                <div :class="getSpriteImg('4002icon', 0)"></div>
              </div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_inputbox">
              <input type="number" @change="compute()" v-model="originium_98" />
            </div>
            <div class="gacha_unit_child_title" style="width: 270px">
              普通源石98元[13.61元/抽]
            </div>
            <div class="gacha_unit_child_fixed">
              <div style="display: flex">
                X{{ getFixed(originium_98 * 24) }}
                <div :class="getSpriteImg('4002icon', 0)"></div>
              </div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_inputbox">
              <input type="number" @change="compute()" v-model="originium_30" />
            </div>
            <div class="gacha_unit_child_title" style="width: 270px">
              普通源石30元[14.29元/抽]
            </div>
            <div class="gacha_unit_child_fixed">
              <div style="display: flex">
                X{{ getFixed(originium_30 * 7) }}
                <div :class="getSpriteImg('4002icon', 0)"></div>
              </div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_inputbox">
              <input type="number" @change="compute()" v-model="originium_6" />
            </div>
            <div class="gacha_unit_child_title" style="width: 270px">
              普通源石6元[20.00元/抽]
            </div>
            <div class="gacha_unit_child_fixed">
              <div style="display: flex">
                X{{ getFixed(originium_6 * 1) }}
                <div :class="getSpriteImg('4002icon', 0)"></div>
              </div>
            </div>
          </div>

          <!-- 复选模块End -->
        </div>
      </el-collapse-item>

      <el-collapse-item class="collapse-item" name="5" style="display: block">
        <template slot="title">
          <span class="collapse-item_title">
            活动获得（估算）{{ getFixed(gachaTimes_activity) }}抽</span
          >
        </template>
        <div class="gacha_unit" id="activity">
          <!-- zxcvb -->
          <!-- 这改成“ ‘长夜临光复刻’ 【】源石 【】紫票 ” -->
          <div class="gacha_unit_child">长夜临光复刻</div>
          <el-checkbox-group v-model="gacha_actReList" class="">
            <div
              v-for="(item, index) in gacha_actRe"
              :key="index"
              v-show="item.type == 'activityper'"
              class="gacha_unit_child"
              @change="compute(item.name)"
            >
              <el-checkbox :label="index">
                <div class="gacha_unit_child_title" style="width: 200px">
                  {{ item.name }}
                </div>
                <div
                  class="gacha_unit_child_fixed"
                  v-show="item.permit > 0"
                  style="width: 50px"
                >
                  <div style="display: flex">
                    {{ item.permit }}
                    <div :class="getSpriteImg('7003icon', 0)"></div>
                  </div>
                </div>
                <div class="gacha_unit_child_fixed" v-show="item.originium > 0">
                  <div style="display: flex">
                    {{ item.originium }}
                    <div :class="getSpriteImg('4002icon', 0)"></div>
                  </div>
                </div>
                <div class="gacha_unit_child_fixed" v-show="item.orundum > 0">
                  <div style="display: flex">
                    {{ item.orundum }}
                    <div :class="getSpriteImg('4003icon', 0)"></div>
                  </div>
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
          <div v-for="(act, index) in gacha_actReward" :key="index">
            <div class="gacha_unit_child">
              <div class="gacha_unit_child_title">{{ act.name }}</div>

              <div class="gacha_unit_child_fixed" v-show="act.originium > 0">
                <div style="display: flex">
                  {{ act.originium }}
                  <div :class="getSpriteImg('4002icon', 0)"></div>
                </div>
              </div>
              <div class="gacha_unit_child_fixed" v-show="act.permit > 0">
                <div style="display: flex">
                  {{ act.permit }}
                  <div :class="getSpriteImg('7003icon', 0)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item class="collapse-item" name="6" style="display: block">
        <template slot="title">
          <span class="collapse-item_title">
            其它资源（估算）{{ getFixed(gachaTimes_other) }}抽</span
          >
        </template>

        <div class="gacha_unit" id="direction">
          <div v-for="(other, index) in gacha_honeyCake" :key="index">
            <div class="gacha_unit_child">
              <!-- <div class="gacha_unit_child_checkbox">复选</div> -->
              <div class="gacha_unit_child_title" style="width: 240px">
                {{ other.name }}
              </div>

              <div
                class="gacha_unit_child_fixed"
                v-show="other.orundum > 0"
                style="width: 120px"
              >
                <div style="display: flex">
                  <div style="width: 50px">{{ other.orundum }}</div>
                  <div :class="getSpriteImg('4003icon', 0)"></div>
                </div>
              </div>
              <div
                class="gacha_unit_child_fixed"
                v-show="other.originium > 0"
                style="width: 120px"
              >
                <div style="display: flex">
                  <div style="width: 50px">{{ other.originium }}</div>
                  <div :class="getSpriteImg('4002icon', 0)"></div>
                </div>
              </div>
              <div
                class="gacha_unit_child_fixed"
                v-show="other.permit > 0"
                style="width: 120px"
              >
                <div style="display: flex">
                  <div style="width: 50px">{{ other.permit }}</div>
                  <div :class="getSpriteImg('7003icon', 0)"></div>
                </div>
              </div>
              <div
                class="gacha_unit_child_fixed"
                v-show="other.permit10 > 0"
                style="width: 120px"
              >
                <div style="display: flex">
                  <div style="width: 50px">{{ other.permit10 }}</div>
                  <div :class="getSpriteImg('7004icon', 0)"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 填空模块 -->
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_inputbox">
              <input
                type="number"
                @change="compute()"
                style="width: 150px"
                v-model="customValue"
              />
            </div>
            <div class="gacha_unit_child_title" style="width: auto">
              自定义修正值
            </div>
            <div class="gacha_unit_child_title" style="width: auto">
              *例：需要为某池子预留20抽，则可填入-12000
            </div>
          </div>
          <!-- 填空模块End -->
        </div>
      </el-collapse-item>

      <el-collapse-item class="collapse-item" name="7" style="display: block">
        <template slot="title">
          <span class="collapse-item_title">致谢</span>
        </template>

        <div class="gacha_unit" id="direction">
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 280px">
              活动排期:
              <a href="https://space.bilibili.com/8412516">罗德岛蜜饼工坊</a>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 280px">
              数据参考: <a href="https://prts.wiki">prts.wiki</a>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 280px">
              <a href="https://www.wjx.cn/vm/QXIrwfN.aspx">攒抽规划反馈表</a>
            </div>
          </div>
          <!-- 填空模块End -->
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>


<script>
  import gacha_potentialJson from "static/json/gacha_potential.json";
  import gacha_actReJson from "static/json/gacha_actRe.json";
  import gacha_storePacksJson from "static/json/gacha_storePacks.json";
  import gacha_store258Json from "static/json/gacha_store258.json";
  import gacha_actRewardJson from "static/json/gacha_actReward.json";
  import gacha_honeyCakeJson from "static/json/gacha_honeyCake.json";

  import toolApi from "@/api/tool";
  import cookie from "js-cookie";

  export default {
    layout: "defaultGacha",
    head: {
      title: "一图流-感谢庆典攒抽规划",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=0.68, maximum-scale=0.68, user-scalable=no",
        },
        {
          hid: "description",
          name: "description",
          content: "一图流-感谢庆典攒抽规划",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    data() {
      return {
        pageTheme: "light",
        itemList: [],
        checkBox: ["0", "7"],
        endTime: [],
        startDate: "", //开始时间
        endDate: "2022/11/15 03:59:00", //结束时间
        start_TimeStamp: "",
        end_TimeStamp: "",
        end_TimeStampCheck: "2022感谢庆典",

        gacha_potential: gacha_potentialJson, //常驻活动和主线
        gacha_potentialList: [],
        gacha_actRe: gacha_actReJson, //复刻活动
        gacha_actReList: [],
        gacha_storePacks: gacha_storePacksJson, //商店礼包
        gacha_storePacksList: [],

        gacha_store258: gacha_store258Json, //黄票兑换38抽
        gacha_store258List: [],
        gacha_actReward: gacha_actRewardJson,
        gacha_honeyCake: gacha_honeyCakeJson,

        //计算结果
        originium: 0, //源石
        orundum: 0, //合成玉
        permit: 0, //寻访
        permit10: 0, //十连寻访
        sellsCount: 0, //总氪金总和
        gachaTimes: 0, //总抽卡次数

        gachaTimes_exist: 0, //库存抽卡次数
        gachaTimes_potential: 0, //潜在抽卡次数
        gachaTimes_daily: 0, //日常抽卡次数
        gachaTimes_gacha: 0, //氪金抽卡次数
        gachaTimes_activity: 0, //活动抽卡次数
        gachaTimes_other: 0, //其他抽卡次数

        originium_exist: 0, //库存源石
        orundum_exist: 0, //库存合成玉
        permit_exist: 0, //库存寻访券
        permit10_exist: 0, //库存十连寻访

        originium_potential: 0, //常驻源石
        orundum_potential: 0, //常驻合成玉
        permit_potential: 0, //常驻寻访券
        permit10_potential: 0, //常驻十连寻访
        paradox: 0, //悖论模拟

        originium_daily: 0, //日常源石
        orundum_daily: 0, //日常合成玉
        permit_daily: 0, //日常寻访券
        permit10_daily: 0, //日常十连寻访

        originium_gacha: 0, //氪金源石
        orundum_gacha: 0, //氪金合成玉
        permit_gacha: 0, //氪金寻访券
        permit10_gacha: 0, //氪金十连寻访

        originium_act: 0, //活动源石
        orundum_act: 0, //活动合成玉
        permit_act: 0, //活动寻访券
        permit10_act: 0, //活动十连寻访

        originium_other: 0, //其他源石
        orundum_other: 0, //其他合成玉
        permit_other: 0, //其他寻访券
        permit10_other: 0, //其他十连寻访

        originium_648: 0, //普通源石648
        originium_328: 0, //普通源石328
        originium_198: 0, //普通源石198
        originium_98: 0, //普通源石98
        originium_30: 0, //普通源石30
        originium_6: 0, //普通源石6
        monthlyCardNum: 0,

        daysRemaining: 0, //剩余天数
        weeksRemaining: 0, //剩余周数
        monthsRemaining: 0, //剩余月数
        monthsRemainingSec: 0, //剩余月数（绿票二层
        SignInMonthsRemaining: 0,
        countDown: 0, //限定池每日送抽倒计时
        dailyRewards: 100, //每日奖励
        weeklyRewards: 500, //周常奖励
        weekStage: 1800, //剿灭奖励
        gachaWall: 8500, //幸运墙奖励
        originiumValue: true, //是否源石抽卡
        weekStageValue: true, //是否完成剿灭
        weekTaskValue: true, //是否完成周常
        greenF2Value: true, //是否兑换绿票商店二层
        greenF1Value: false, //是否兑换绿票商店二层
        customValue: 0, //自定义值
        cookieInit: 0,
      };
    },
    created() {
      this.getDate();
      this.getInterval();
      this.getEveryreWard();
      this.getCountDown();
      this.compute();
    },
    mounted() {
      this.updateVisits();
    },
    methods: {
      updateVisits() {
        toolApi.updateVisits("zanchou").then((response) => {});
      },

      getSpriteImg(name, index) {
        if (index === 0) return "bg-" + name + " sprite_gacha";

        return "bg-" + name;
      },

      getDate() {
        var date = new Date();
        var y = date.getFullYear(); //年
        var m = (date.getMonth() + 1).toString().padStart(2, "0"); //月
        var d = date.getDate().toString().padStart(2, "0"); //日
        var h = date.getHours().toString().padStart(2, "0"); //时
        var mm = date.getMinutes().toString().padStart(2, "0"); //分
        var s = date.getSeconds().toString().padStart(2, "0"); //秒
        this.startDate = `${y}/${m}/${d} ${h}:${mm}:${s}`;
        //  this.time = '2022-08-11'
      },
      //获取限定池和红包倒计时
      getCountDown() {
        var num = parseInt(
          (this.end_TimeStamp - this.start_TimeStamp) / 86400000
        );

        if (num < 14) {
          this.countDown = num - 14;
        }
        console.log("限定池已经开始了" + this.countDown + "天");
      },

      //获取还有多少天
      getInterval() {
        console.log("今天是", this.startDate);
        this.weeksRemaining = 0;
        this.monthsRemaining = 0;
        this.SignInMonthsRemaining = 0;

        this.start_TimeStamp = Date.parse(new Date(this.startDate)); //1642471535000

        if (this.end_TimeStampCheck.length < 13) {
          this.end_TimeStamp = Date.parse(this.endDate); //1642471500000
        }
        var num = parseInt(
          (this.end_TimeStamp - this.start_TimeStamp) / 86400000
        );
        for (let i = 1; i < num + 1; i++) {
          if (new Date(this.start_TimeStamp + 86400000 * i).getDay() === 1) {
            this.weeksRemaining++;
          }
          if (new Date(this.start_TimeStamp + 86400000 * i).getDate() === 10) {
            this.monthsRemaining++;
          }
          if (new Date(this.start_TimeStamp + 86400000 * i).getDate() === 17) {
            this.SignInMonthsRemaining++;
          }
        }

        console.log("距离活动还有" + num + "天");
        this.daysRemaining = num;
      },

      checkEndDate() {
        this.end_TimeStamp = this.end_TimeStampCheck;
        this.getInterval();
        this.getEveryreWard();
        this.compute();
      },

      getEveryreWard() {
        // console.log("运行了")
        this.dailyRewards = 100 * parseInt(this.daysRemaining);
        this.weeklyRewards = 500 * parseInt(this.weeksRemaining);
        this.weekStage = 1800 * parseInt(this.weeksRemaining);
        console.log("距离活动还有" + this.weeksRemaining, "周");
      },

      compute() {
        // console.log("计算开始", this.checkBox);
        //初始化

        this.valueInit();

        //判断是否用源石抽卡
        var flag_originium = 0;
        if (this.originiumValue) {
          flag_originium = 1;
        }

        //判断是否完成周常日常
        var flag_weekTask = 1;
        if (this.weekTaskValue) {
          flag_weekTask = 0;
        }
        //判断是否完成剿灭
        var flag_weekStage = 1;
        if (this.weekStageValue) {
          flag_weekStage = 0;
        }

        var flag_greenF2 = 0;
        if (this.greenF2Value) {
          flag_greenF2 = 1;
        }

        var flag_greenF1 = 0;
        if (this.greenF1Value) {
          flag_greenF1 = 2;
        }

        //库存计算（共计）
        this.originium =
          parseInt(this.originium) + parseInt(this.originium_exist);
        this.orundum = parseInt(this.orundum) + parseInt(this.orundum_exist);
        this.permit = parseInt(this.permit) + parseInt(this.permit_exist);
        this.permit10 = parseInt(this.permit10) + parseInt(this.permit10_exist);

        //库存抽卡次数（单项）
        this.gachaTimes_exist =
          parseInt(this.originium_exist) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum_exist) / 600 +
          parseInt(this.permit_exist) +
          parseInt(this.permit10_exist) * 10;

        //主线和常驻活动计算（共计）
        for (let i = 0; i < this.gacha_potentialList.length; i++) {
          this.originium =
            parseInt(this.originium) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].originium);
          this.orundum =
            parseInt(this.orundum) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].orundum);
          this.permit =
            parseInt(this.permit) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].permit);
          this.permit10 =
            parseInt(this.permit10) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].permit10);
          this.originium_potential =
            parseInt(this.originium_potential) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].originium);
          this.orundum_potential =
            parseInt(this.orundum_potential) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].orundum);
          this.permit_potential =
            parseInt(this.permit_potential) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].permit);
          this.permit10_potential =
            parseInt(this.permit10_potential) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].permit10);
        }

        //悖论模拟
        this.orundum = parseInt(this.orundum) + parseInt(this.paradox * 200);

        this.orundum_potential =
          parseInt(this.orundum_potential) + parseInt(this.paradox * 200);

        //主线和常驻活动抽卡次数（单项）
        this.gachaTimes_potential =
          parseInt(this.originium_potential) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum_potential) / 600 +
          parseInt(this.permit_potential) +
          parseInt(this.permit10_potential) * 10;

        //氪金项目计算（共计）
        for (let i = 0; i < this.gacha_storePacksList.length; i++) {
          this.permit =
            parseInt(this.permit) +
            parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].permit);
          this.permit10 =
            parseInt(this.permit10) +
            parseInt(
              this.gacha_storePacks[this.gacha_storePacksList[i]].permit10
            );
          if (
            "月卡" === this.gacha_storePacks[this.gacha_storePacksList[i]].name
          ) {
            console.log("买的月卡个数", Math.ceil(this.daysRemaining / 30));
            this.orundum =
              parseInt(this.orundum) + parseInt(this.daysRemaining) * 200;
            this.originium =
              parseInt(this.originium) + Math.ceil(this.daysRemaining / 30) * 6;
            this.sellsCount =
              parseInt(this.sellsCount) + Math.ceil(this.daysRemaining / 30) * 30;
          } else {
            this.originium =
              parseInt(this.originium) +
              parseInt(
                this.gacha_storePacks[this.gacha_storePacksList[i]].originium
              );
            this.orundum =
              parseInt(this.orundum) +
              parseInt(
                this.gacha_storePacks[this.gacha_storePacksList[i]].orundum
              );
            this.sellsCount =
              parseInt(this.sellsCount) +
              parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].sells);
          }

          this.permit_gacha =
            parseInt(this.permit_gacha) +
            parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].permit);
          this.permit10_gacha =
            parseInt(this.permit10_gacha) +
            parseInt(
              this.gacha_storePacks[this.gacha_storePacksList[i]].permit10
            );
          if (
            "月卡" === this.gacha_storePacks[this.gacha_storePacksList[i]].name
          ) {
            this.orundum_gacha =
              parseInt(this.orundum_gacha) + parseInt(this.daysRemaining) * 200;
            this.originium_gacha =
              parseInt(this.originium_gacha) +
              Math.ceil(this.daysRemaining / 30) * 6;
          } else {
            this.orundum_gacha =
              parseInt(this.orundum_gacha) +
              parseInt(
                this.gacha_storePacks[this.gacha_storePacksList[i]].orundum
              );
            this.originium_gacha =
              parseInt(this.originium_gacha) +
              parseInt(
                this.gacha_storePacks[this.gacha_storePacksList[i]].originium
              );
          }
        }

        //普通648
        this.originium =
          this.originium +
          parseInt(this.originium_648) * 185 +
          parseInt(this.originium_328) * 90 +
          parseInt(this.originium_198) * 50 +
          parseInt(this.originium_98) * 24 +
          parseInt(this.originium_30) * 7 +
          parseInt(this.originium_6);

        //氪金项目抽卡次数（单项）
        this.originium_gacha =
          parseInt(this.originium_gacha) +
          parseInt(this.originium_648) * 185 +
          parseInt(this.originium_328) * 90 +
          parseInt(this.originium_198) * 50 +
          parseInt(this.originium_98) * 24 +
          parseInt(this.originium_30) * 7 +
          parseInt(this.originium_6);

        this.gachaTimes_gacha =
          parseInt(this.originium_gacha) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum_gacha) / 600 +
          parseInt(this.permit_gacha) +
          parseInt(this.permit10_gacha) * 10;

        //日常部分计算(总)
        this.orundum =
          parseInt(this.orundum) +
          parseInt(this.dailyRewards) +
          parseInt(this.monthsRemaining) * 600 +
          parseInt(this.weeklyRewards) +
          parseInt(this.weekStage);
        this.permit =
          parseInt(this.permit) +
          parseInt(this.monthsRemaining) * 4 -
          parseInt(flag_greenF1) +
          parseInt(this.SignInMonthsRemaining);

        //黄票商店38抽计算
        for (let i = 0; i < this.gacha_store258List.length; i++) {
          this.originium =
            parseInt(this.originium) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].originium);
          this.orundum =
            parseInt(this.orundum) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].orundum);
          this.permit =
            parseInt(this.permit) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].permit);
          this.permit10 =
            parseInt(this.permit10) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].permit10);

          this.originium_daily =
            parseInt(this.originium_daily) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].originium);
          this.orundum_daily =
            parseInt(this.orundum_daily) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].orundum);
          this.permit_daily =
            parseInt(this.permit_daily) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].permit);
          this.permit10_daily =
            parseInt(this.permit10_daily) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].permit10);
        }

        //日常资源抽卡次数(单项)
        this.orundum_daily =
          parseInt(this.orundum_daily) +
          parseInt(this.dailyRewards) +
          parseInt(this.weeklyRewards) +
          parseInt(this.weekStage) +
          parseInt(flag_weekTask) * 500 +
          parseInt(flag_weekStage) * 1800 +
          parseInt(this.monthsRemaining) * 600;

        this.permit_daily =
          parseInt(this.permit_daily) +
          parseInt(this.monthsRemaining) * 4 -
          parseInt(flag_greenF1) +
          parseInt(this.SignInMonthsRemaining);

        this.gachaTimes_daily =
          parseInt(this.originium_daily) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum_daily) / 600 +
          parseInt(this.permit_daily) +
          parseInt(this.permit10_daily) * 10;

        //活动抽卡计算（共计）

        for (let i = 0; i < this.gacha_actReward.length; i++) {
          if (
            this.gacha_actReward[i].endDate >= this.start_TimeStamp &&
            this.gacha_actReward[i].endDate <= this.end_TimeStamp
          ) {
            // if(this.gacha_actReward[i].endDate<endDate)
            this.originium =
              parseInt(this.originium) +
              parseInt(this.gacha_actReward[i].originium);
            this.orundum =
              parseInt(this.orundum) + parseInt(this.gacha_actReward[i].orundum);
            this.permit =
              parseInt(this.permit) + parseInt(this.gacha_actReward[i].permit);
            this.permit10 =
              parseInt(this.permit10) +
              parseInt(this.gacha_actReward[i].permit10);
            this.originium_act =
              parseInt(this.originium_act) +
              parseInt(this.gacha_actReward[i].originium);
            this.orundum_act =
              parseInt(this.orundum_act) +
              parseInt(this.gacha_actReward[i].orundum);
            this.permit_act =
              parseInt(this.permit_act) +
              parseInt(this.gacha_actReward[i].permit);
            this.permit10_act =
              parseInt(this.permit10_act) +
              parseInt(this.gacha_actReward[i].permit10);
          }
        }

        for (let i = 0; i < this.gacha_actReList.length; i++) {
          this.originium =
            parseInt(this.originium) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].originium);
          this.orundum =
            parseInt(this.orundum) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].orundum);
          this.permit =
            parseInt(this.permit) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].permit);
          this.permit10 =
            parseInt(this.permit10) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].permit10);
          this.originium_act =
            parseInt(this.originium_act) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].originium);
          this.orundum_act =
            parseInt(this.orundum_act) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].orundum);
          this.permit_act =
            parseInt(this.permit_act) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].permit);
          this.permit10_act =
            parseInt(this.permit10_act) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].permit10);
        }

        //活动抽卡次数（单项）
        this.gachaTimes_activity =
          parseInt(this.originium_act) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum_act) / 600 +
          parseInt(this.permit_act) +
          parseInt(this.permit10_act) * 10;

        //其他抽卡计算
        for (let i = 0; i < this.gacha_honeyCake.length; i++) {
          if (
            this.gacha_honeyCake[i].endDate >= this.start_TimeStamp &&
            this.gacha_honeyCake[i].endDate <= this.end_TimeStamp
          ) {
            this.originium =
              parseInt(this.originium) +
              parseInt(this.gacha_honeyCake[i].originium);
            this.orundum =
              parseInt(this.orundum) + parseInt(this.gacha_honeyCake[i].orundum);
            this.permit =
              parseInt(this.permit) + parseInt(this.gacha_honeyCake[i].permit);

            this.permit10 =
              parseInt(this.permit10) +
              parseInt(this.gacha_honeyCake[i].permit10);
            this.originium_other =
              parseInt(this.originium_other) +
              parseInt(this.gacha_honeyCake[i].originium);
            this.orundum_other =
              parseInt(this.orundum_other) +
              parseInt(this.gacha_honeyCake[i].orundum);
            this.permit_other =
              parseInt(this.permit_other) +
              parseInt(this.gacha_honeyCake[i].permit);
            this.permit10_other =
              parseInt(this.permit10_other) +
              parseInt(this.gacha_honeyCake[i].permit10);
          }
        }

        //自动扣除部分{
        //合成玉=—周常—剿灭—幸运墙
        this.orundum =
          parseInt(this.orundum) +
          500 * parseInt(flag_weekTask) +
          1800 * parseInt(flag_weekStage) +
          parseInt(this.countDown) * (8500 / 14) +
          parseInt(this.customValue);

        this.orundum_other =
          parseInt(this.orundum_other) + parseInt(this.countDown) * (8500 / 14);

        this.permit_other =
          parseInt(this.permit_other) + parseInt(this.countDown);
        //寻访记录=减去倒计时}

        //其他抽卡次数
        this.gachaTimes_other =
          parseInt(this.originium_other) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum_other) / 600 +
          parseInt(this.permit_other) +
          parseInt(this.permit10_other) * 10;

        this.sellsCount =
          this.sellsCount +
          648 * parseInt(this.originium_648) +
          328 * parseInt(this.originium_328) +
          198 * parseInt(this.originium_198) +
          98 * parseInt(this.originium_98) +
          30 * parseInt(this.originium_30) +
          6 * parseInt(this.originium_6);

        //抽卡次数
        this.gachaTimes =
          parseInt(this.originium) * 0.3 * flag_originium +
          parseInt(this.orundum) / 600 +
          parseInt(this.permit) +
          parseInt(this.permit10) * 10;

        // console.log(this.permit_exist);
        // console.log(this.permit_potential);
        // console.log(this.permit_daily);
        // console.log(this.permit_gacha);
        // console.log(this.permit_act);
        // console.log(this.permit_other);
      },

      valueInit() {
        if (this.cookieInit !== 0) {
          cookie.set("originium_exist", this.originium_exist, { expires: 30 });
          cookie.set("orundum_exist", this.orundum_exist, { expires: 30 });
          cookie.set("permit_exist", this.permit_exist, { expires: 30 });
          cookie.set("permit10_exist", this.permit10_exist, { expires: 30 });
          cookie.set("paradox", this.paradox, { expires: 30 });
        } else {
          this.originium_exist = cookie.get("originium_exist");
          this.orundum_exist = cookie.get("orundum_exist");
          this.permit_exist = cookie.get("permit_exist");
          this.permit10_exist = cookie.get("permit10_exist");
          this.paradox = cookie.get("paradox");
        }

        this.cookieInit++;

        if (
          this.originium_exist === "" ||
          this.originium_exist === undefined ||
          typeof this.originium_exist == "undefined"
        )
          this.originium_exist = 0;
        if (
          this.orundum_exist === "" ||
          this.orundum_exist === undefined ||
          typeof this.orundum_exist == "undefined"
        )
          this.orundum_exist = 0;

        if (
          this.permit_exist === "" ||
          this.permit_exist === undefined ||
          typeof this.permit_exist == "undefined"
        )
          this.permit_exist = 0;
        if (
          this.permit10_exist === "" ||
          this.permit10_exist === undefined ||
          typeof this.permit10_exist == "undefined"
        )
          this.permit10_exist = 0;
        if (
          this.paradox === "" ||
          this.paradox === undefined ||
          typeof this.paradox == "undefined"
        )
          this.paradox = 0;

        if (this.originium_648 === "") this.originium_648 = 0;
        if (this.originium_328 === "") this.originium_328 = 0;
        if (this.originium_198 === "") this.originium_198 = 0;
        if (this.originium_98 === "") this.originium_98 = 0;
        if (this.originium_30 === "") this.originium_30 = 0;
        if (this.originium_6 === "") this.originium_6 = 0;
        if (this.customValue === "") this.customValue = 0;

        this.originium_exist = parseInt(this.originium_exist);
        this.orundum_exist = parseInt(this.orundum_exist);
        this.permit_exist = parseInt(this.permit_exist);
        this.permit10_exist = parseInt(this.permit10_exist);
        this.paradox = parseInt(this.paradox);
        this.originium_648 = parseInt(this.originium_648);
        this.originium_328 = parseInt(this.originium_328);
        this.originium_198 = parseInt(this.originium_198);
        this.originium_98 = parseInt(this.originium_98);
        this.originium_30 = parseInt(this.originium_30);
        this.originium_6 = parseInt(this.originium_6);
        this.customValue = parseInt(this.customValue);

        this.originium = 0;
        this.orundum = 0;
        this.permit = 0;
        this.permit10 = 0;
        this.sellsCount = 0;
        this.gachaTimes = 0;

        this.originium_potential = 0;
        this.orundum_potential = 0;
        this.permit_potential = 0;
        this.permit10_potential = 0;

        this.originium_daily = 0;
        this.orundum_daily = 0;
        this.permit_daily = 0;
        this.permit10_daily = 0;

        this.originium_gacha = 0;
        this.orundum_gacha = 0;
        this.permit_gacha = 0;
        this.permit10_gacha = 0;

        this.originium_act = 0;
        this.orundum_act = 0;
        this.permit_act = 0;
        this.permit10_act = 0;

        this.originium_other = 0;
        this.orundum_other = 0;
        this.permit_other = 0;
        this.permit10_other = 0;
      },

      originiumCheck() {
        this.compute();
      },

      weeklyCheck() {
        this.compute();
      },

      getChapterWidth(index) {
        if (index % 2 == 0) return "width:180px;";
        else return "width:60px;";
      },
      getFixed2(num) {
        return parseFloat(num).toFixed(2);
      },
      getFixed(num) {
        return parseInt(num);
      },

      getInteger(num) {
        return parseInt(parseInt(num / 100) * 100);
      },

      getTitleWord(index) {
        for (let i in this.checkBox) {
          if (index === this.checkBox[i]) {
            return "收起";
          }
        }
        return "展开";
      },

      handleChange(val) {
        console.log(val);
      },
    },
  };
</script>




<style scoped>
  .el-collapse-item {
    color: #222222;
    margin: 12px;
    background-color: #d8d8d8;
    border-radius: 4px;
    font-size: 20px;
    box-shadow: 0px 1px 4px #a0a0a0b0;
  }
  .collapse-item_title {
    font-size: 24px;
    padding: 8px;
    font-weight: 600;
  }

  .el-collapse-item__wrap {
    margin: 6px;
    margin-left: 8px;
    vertical-align: middle;
    display: inline-block;
    will-change: height;
    border-bottom: 0px;
    background-color: #d8d8d8;
  }

  .el-collapse-item__content {
    padding-bottom: 0px;
  }

  .el-collapse-item__header {
    background-color: #d8d8d8;
  }

  .el-divider--horizontal {
    margin: 6px 0;
  }


</style>

