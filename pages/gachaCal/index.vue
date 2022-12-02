<template>
  <div id="gacha">
    <el-collapse v-model="checkBox" @change="handleChange">
      <!-- 总计 -->
      <el-collapse-item style="display: block; position: sticky; top: 60px;z-index: 99999999;" name="0" id="totalTable">
        <template slot="title">
          <div class="gacha_title_icon" style="background: chocolate"></div>
          <span class="collapse-item_title" style="color: purple">
            共计{{ getFixed(gachaTimes_total) }}抽，氪金{{ sellsCount }}元
          </span>
        </template>
        <!-- <el-divider></el-divider> -->
        <div class="gacha_unit" id="total">
          <!-- 如果有4个选项则修改为 style="width:98%;margin:0 1%;"，子项宽度25% -->
          <el-radio-group size="small" style="width: 90%; margin: 6px 5%" v-model="timeSelector" @change="checkEndDate(timeSelector)">
            <el-radio-button label="春节限定(1.29)" type="primary" style="width: 33%" 
            ></el-radio-button>
            <el-radio-button label="联动池(预计3月)"  style="width: 33%"  disabled
            ></el-radio-button>
            <el-radio-button label="4周年(5.15)"  style="width: 33%"  disabled
            ></el-radio-button>
            <!-- <el-radio-button label="????" disabled style="width:32%;"></el-radio-button> -->
          </el-radio-group>
          <!-- <el-divider></el-divider> -->
          <div id="gacha_total_chart">
            <div id="gacha_total_pie" ref="gacha_total_pie" style="vertical-align: top; height: 200px; width: 300px; display: inline-block; top: 10px;"></div>
            <table id="gacha_total_table">
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
                <span style="font-size: 14px;">
                 &nbsp;({{ (getFixed(orundum)/600).toFixed(2) }})
                </span>
              </div>
            </div>
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('4002icon', 0)"></div>
                {{ getFixed(originium) }}
                <span style="font-size: 14px;">
                 &nbsp;({{ (gachaTimes_originium).toFixed(2) }})
                </span>
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
                <span style="font-size: 14px;">
                 &nbsp;({{ getFixed(permit10)*10 }})
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <!-- 现有库存 -->
      <el-collapse-item name="1" style="display: block">
        <template slot="title">
          <div class="gacha_title_icon"></div>
          <span class="collapse-item_title"
          >现有库存 {{ getFixed(gachaTimes_exist) }}抽</span
          >
        </template>
        <div class="gacha_unit" id="wallet">
          <div class="gacha_unit_child" style="display: flex">
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('4003icon', 0)"></div>
                <input
                  type="text"
                  @change="compute()"
                  class="gacha_unit_child_inputbox"
                  v-model="orundum_exist"
                />
              </div>
            </div>
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('4002icon', 0)"></div>
                <input
                  type="text"
                  @change="compute()"
                  class="gacha_unit_child_inputbox"
                  v-model="originium_exist"
                />
              </div>
            </div>
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('7003icon', 0)"></div>
                <input
                  type="text"
                  @change="compute()"
                  class="gacha_unit_child_inputbox"
                  v-model="permit_exist"
                />
              </div>
            </div>
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('7004icon', 0)"></div>
                <input
                  type="text"
                  @change="compute()"
                  class="gacha_unit_child_inputbox"
                  v-model="permit10_exist"
                />
              </div>
            </div>
          </div>

          <div class="gacha_unit_child" style="display: flex">
            <div @click="compute()">
              <el-switch
                v-model="originiumFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
              源石是否用于抽卡
            </div>
          </div>
          <el-divider></el-divider>
          <div class="gacha_unit_child">
            <input
              class="gacha_unit_child_inputbox"
              type="text"
              @change="compute()"
              v-model="customValue"
            />
            <div class="gacha_unit_child_title" style="width: 270px;">
              自定义修正值（例如搓玉）
            </div>
            <div class="gacha_resources_unit" style="width: 135px;">
              <div :class="getSpriteImg('4003icon', 0)"></div>
              {{ customValue * 1 }}
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 100%;">
              搓玉比例:1理智=1.09玉(1-7)
              <a href="/?item=Orundum" style="margin: 0px 20px;">查看备选搓玉关卡</a>
              <a href="https://www.bilibili.com/video/BV1XT411F7m4" style="display: inline-block;">
                如何安排搓玉？<img class="gacha_img_small" src="/img/website/el.png"/>
              </a>
            </div>
          </div>
          <!-- 填空模块End -->
          <div class="gacha_unit_child" style="display: flex">
            <div class="gacha_unit_child_title">
              预留皮肤(18石/件)
            </div>
            <el-slider
              v-model="skinFlag"
              :step="1"
              :min="0"
              :max="10"
              show-stops
              show-input

              @change="compute()"
              style="display: inline-block; flex-grow: 1"
            >
            </el-slider>
          </div>
          <!--
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 153px;">
              搓玉 xxxxx 理智
            </div>
            <div class="gacha_resources_unit" style="width: 105px;">
              <div style="display: flex">
                <div :class="getSpriteImg('4003icon', 0)"></div>
                {{ paradox * 200 }}
              </div>
            </div>
          </div> -->
        </div>
      </el-collapse-item>
      <!-- 日常积累 -->
      <el-collapse-item class="collapse-item" name="2" style="display: block">
        <template slot="title">
          <div class="gacha_title_icon"></div>
          <span class="collapse-item_title">日常积累 {{ getFixed(gachaTimes_daily) }}抽</span>
        </template>
        <div class="gacha_unit" id="daily">
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              日常 {{ daysRemaining }} 天
            </div>
            <div class="gacha_resources_unit" style="width: 174px">
              <div :class="getSpriteImg('4003icon', 0)"></div>
              <div style="width: 75px">{{ dailyRewards }}</div>
            </div>
          </div>
          <!-- 日常周常分界线 -->
          <el-divider></el-divider>

          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              周常 {{ weeksRemaining + weekTaskValue }} 周
            </div>
            <div class="gacha_resources_unit" style="width: 192px">
              <div :class="getSpriteImg('4003icon', 0)"></div>
              <div style="width: 75px">
                {{ weeklyTaskRewards + weekTaskValue * 500 }}
              </div>
            </div>
            <div
              @click="compute()"
              class="gacha_unit_child_title"
              style="width: 150px; line-height: 32px"
            >
              <el-switch
                v-model="weekTaskFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
              本周已完成
            </div>
          </div>

          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              剿灭 {{ weeksRemaining + weekStageValue }} 周
            </div>
            <div class="gacha_resources_unit" style="width: 192px">
              <div :class="getSpriteImg('4003icon', 0)"></div>
              <div style="width: 75px">
                {{ weeklyStageRewards + weekStageValue * 1800 }}
              </div>
            </div>
            <div
              @click="compute()"
              class="gacha_unit_child_title"
              style="width: 150px; line-height: 32px"
            >
              <el-switch
                v-model="weekStageFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
              本周已完成
            </div>
          </div>
          <!-- 周常月常分界线 -->
          <el-divider></el-divider>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              绿票商店 {{ monthsRemaining - greenF1Value }} 月
            </div>
            <div class="gacha_resources_unit" style="width: 192px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4003icon', 0)"></div>
              <div style="width: 66px">
                {{ (monthsRemaining - greenF1Value) * 600 }}
              </div>
              <div
                style="width: 40px"
                :class="getSpriteImg('7003icon', 0)"></div>
              <div style="width: 28px">
                {{ (monthsRemaining - greenF1Value) * 4 }}
              </div>
            </div>
            <div
              @click="compute()"
              class="gacha_unit_child_title"
              style="width: 150px; line-height: 32px"
            >
              <el-switch
                v-model="greenStoreFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
              本月已换
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              每月签到 {{ MonthsSignInRemaining }} 月
            </div>
            <div class="gacha_resources_unit" style="width: 174px">
              <div :class="getSpriteImg('7003icon', 0)"></div>
              <div style="width: 32px">{{ MonthsSignInRemaining }}</div>
            </div>
          </div>
          <!-- 258分界线 -->
          <el-divider></el-divider>
          <el-checkbox-group v-model="gacha_store258List" class="">
            <div
              v-for="(singlePack, index) in gacha_store258"
              :key="index"
              v-show="singlePack.packType == 'store'"
              class="gacha_unit_child"
              @change="compute(singlePack.packName)"
            >
              <el-checkbox-button :label="index">
                <div class="gacha_unit_child_title" style="width: 150px">
                  {{ singlePack.packName }}
                </div>
                <div class="gacha_resources_unit">
                  <div
                    style="width: 40px"
                    :class="getSpriteImg('7004icon', 0)"
                  ></div>
                  <div style="width: 32px">{{ singlePack.gachaPermit10 }}</div>
                  <div
                    style="width: 40px"
                    :class="getSpriteImg('7003icon', 0)"
                  ></div>
                  <div style="width: 32px">{{ singlePack.gachaPermit }}</div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
        </div>
      </el-collapse-item>
      <!-- 潜在资源 -->
      <el-collapse-item class="collapse-item" name="3" style="display: block">
        <template slot="title">
          <div class="gacha_title_icon"></div>
          <span class="collapse-item_title"
          >潜在资源 {{ getFixed(gachaTimes_potential) }}抽</span
          >
        </template>

        <div class="gacha_unit" id="potential">
          <!-- 悖论模拟 -->
          <div class="gacha_unit_child">
            <input
              class="gacha_unit_child_inputbox"
              type="text"
              @change="compute()"
              v-model="paradox"
            />
            <div class="gacha_unit_child_title" style="width: 120px">
              个悖论模拟
            </div>
            <div class="gacha_resources_unit" style="width: 105px">
              <div :class="getSpriteImg('4003icon', 0)"></div>
              {{ paradox * 200 }}
            </div>
          </div>
          <!-- 主线 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png" />
            主线、突袭、绝境
          </div>
          <el-checkbox-group v-model="gacha_potentialList" class="">
            <div
              v-for="(singlePack, index) in gacha_potential"
              :key="index"
              v-show="singlePack.packType == 'main'"
              class="gacha_unit_child"
              style="display: inline-block"
              @change="compute(singlePack.packName)"
            >
              <el-checkbox-button :label="index" size="small">
                <div
                  class="gacha_unit_child_title"
                  :style="getChapterWidth(index)"
                  style="padding-left: 4px"
                >
                  {{ singlePack.packName }}
                </div>
                <div class="gacha_resources_unit">
                  <div :class="getSpriteImg('4002icon', 0)"></div>
                  <div style="width: 36px">{{ singlePack.gachaOriginium }}</div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
          <!-- Sidestory -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png" />支线、别传
          </div>
          <el-checkbox-group v-model="gacha_potentialList" class="">
            <div
              v-for="(singlePack, index) in gacha_potential"
              :key="index"
              v-show="singlePack.packType == 'activity'"
              class="gacha_unit_child"
              style="display: inline-block"
              @change="compute(singlePack.packName)"
            >
              <el-checkbox-button :label="index" size="small">
                <div class="gacha_unit_child_title" style="width: 144px">
                  {{ singlePack.packName }}
                </div>
                <div class="gacha_resources_unit">
                  <div :class="getSpriteImg('4002icon', 0)"></div>
                  <div style="width: 36px">{{ singlePack.gachaOriginium }}</div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
        </div>
      </el-collapse-item>
      <!-- 氪金资源 -->
      <el-collapse-item class="collapse-item" name="4" style="display: block">
        <template slot="title">
          <div class="gacha_title_icon"></div>
          <span class="collapse-item_title">氪金资源 {{ getFixed(gachaTimes_gacha) }}抽</span>
        </template>

        <div class="gacha_unit" id="charge">
          <div class="gacha_unit_child_instruction" style="padding: 4px 16px;font-size: 18px;color: brown;">
            标签内为每抽价格(元)，颜色用于区分性价比<br>
            仅计入礼包内抽卡资源，紫色高于648，橙色高于大月卡<br>
            <a href="https://yituliu.site#packPpr">点击查看礼包完整性价比</a>
          </div>
          <!-- 月常礼包 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png">月常礼包
          </div>
          <el-checkbox-group v-model="gacha_storePacksList">
            <div v-for="(singlePack, index) in gacha_storePacks" :key="index" v-show="singlePack.packType == 'monthly'" class="gacha_unit_child" @change="compute(singlePack.packName)">
              <el-checkbox-button :label="index"  >
                <div class="gacha_packPpr" :class=getPprLabel(singlePack.packRmbPerDraw)>{{ singlePack.packRmbPerDraw }}</div>
                <div class="gacha_unit_child_title" style="width: 168px">
                  {{ singlePack.packName }}
                </div>
                <div class="gacha_resources_unit" style="width: 192px">
                  <div style="width: 40px" v-show="singlePack.gachaOrundum !== '0'" :class="getSpriteImg('4003icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOrundum !== '0'">{{ singlePack.gachaOrundum }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaOriginium !== '0'" :class="getSpriteImg('4002icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOriginium !== '0'"> {{ singlePack.gachaOriginium }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit !== '0'" :class="getSpriteImg('7003icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit !== '0'"> {{ singlePack.gachaPermit }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit10 !== '0'" :class="getSpriteImg('7004icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit10 !== '0'"> {{ singlePack.gachaPermit10 }}</div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
          <!-- 限时、一次性礼包 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png">限时/一次性礼包
          </div>
          <el-checkbox-group v-model="gacha_storePacksList" class="">
            <div v-for="(singlePack, index) in gacha_storePacks" :key="index" v-show="singlePack.packType == 'limited' || singlePack.packType == 'newbie'" class="gacha_unit_child" @change="compute(singlePack.packName)">
              <el-checkbox-button :label="index">
                <div class="gacha_packPpr" :class=getPprLabel(singlePack.packRmbPerDraw)>{{ singlePack.packRmbPerDraw }}</div>
                <div class="gacha_unit_child_title" style="width: 168px">
                  {{ singlePack.packName }}
                </div>
                <!-- 一个通用的资源显示模块 -->
                <div class="gacha_resources_unit" style="width: 192px">
                  <div style="width: 40px" v-show="singlePack.gachaOrundum > 0.1" :class="getSpriteImg('4003icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOrundum > 0.1">{{ singlePack.gachaOrundum }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaOriginium > 0.1" :class="getSpriteImg('4002icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOriginium > 0.1"> {{ singlePack.gachaOriginium }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit > 0.1" :class="getSpriteImg('7003icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit > 0.1"> {{ singlePack.gachaPermit }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit10 > 0.1" :class="getSpriteImg('7004icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit10 > 0.1"> {{ singlePack.gachaPermit10 }}</div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
          <!-- 首充 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png" />源石首充
          </div>
          <el-checkbox-group v-model="gacha_storePacksList" class="">
            <div v-for="(singlePack, index) in gacha_storePacks" :key="index" v-show="singlePack.packType == 'first'" class="gacha_unit_child" @change="compute(singlePack.packName)">
              <el-checkbox-button :label="index">
                <div class="gacha_packPpr" :class=getPprLabel(singlePack.packRmbPerDraw)>{{ singlePack.packRmbPerDraw }}</div>
                <div class="gacha_unit_child_title" style="width: 168px">
                  {{ singlePack.packName }}
                </div>
                <div class="gacha_resources_unit" style="width: 102px">
                  <div style="width: 40px" v-show="singlePack.gachaOriginium !== '0'" :class="getSpriteImg('4002icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOriginium !== '0'">{{ singlePack.gachaOriginium }}
                  </div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
          <!-- 非首充 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="/img/website/ex.png" />非首充
          </div>

          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model="originium_648">
            <div class="gacha_packPpr" :class=getPprLabel(11.68)>11.68</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石648元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_648 * 185) }}</div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model="originium_328">
            <div class="gacha_packPpr" :class=getPprLabel(12.15)>12.15</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石328元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_328 * 90) }}</div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model="originium_198">
            <div class="gacha_packPpr" :class=getPprLabel(13.20)>13.20</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石198元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_198 * 50) }}</div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model="originium_98">
            <div class="gacha_packPpr" :class=getPprLabel(13.61)>13.61</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石98元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_98 * 24) }}</div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model="originium_30">
            <div class="gacha_packPpr" :class=getPprLabel(14.29)>14.29</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石30元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_30 * 7) }}</div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model="originium_6">
            <div class="gacha_packPpr" :class=getPprLabel(20.00)>20.00</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石6元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_6 * 1) }}</div>
            </div>
          </div>

          <!-- 复选模块End -->
        </div>
      </el-collapse-item>
      <!-- 活动获得（估算） -->
      <el-collapse-item class="collapse-item" name="5" style="display: block">
        <template slot="title">
          <div class="gacha_title_icon"></div>
          <span class="collapse-item_title">活动获得（估算）{{ getFixed(gachaTimes_activity) }}抽</span>
        </template>

        <div class="gacha_unit" id="activity">
          
           <div class="gacha_unit_child" v-show="1673726340000<end_TimeStamp">复刻活动</div>
          <el-checkbox-group v-model="gacha_actReList" class="">
            <div
              v-for="(singlePack, index) in gacha_actRe"
              :key="index"
              v-show="singlePack.packType == 'activityper'"
              class="gacha_unit_child"
              @change="compute(singlePack.packName)"
            >
              <el-checkbox-button :label="index" v-show="singlePack.plans<plans">
                <div class="gacha_unit_child_title" style="width: 200px">
                  {{ singlePack.packName }}
                </div>
                <div class="gacha_resources_unit" style="width: 192px">
                  <div style="width: 40px" v-show="singlePack.gachaOrundum !== '0'" :class="getSpriteImg('4003icon', 0)"
                  ></div>
                  <div style="width: 54px" v-show="singlePack.gachaOrundum !== '0'">
                    {{ singlePack.gachaOrundum }}
                  </div>
                  <div style="width: 40px" v-show="singlePack.gachaOriginium !== '0'" :class="getSpriteImg('4002icon', 0)"
                  ></div>
                  <div style="width: 54px" v-show="singlePack.gachaOriginium !== '0'">
                    {{ singlePack.gachaOriginium }}
                  </div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit !== '0'" :class="getSpriteImg('7003icon', 0)"
                  ></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit !== '0'">
                    {{ singlePack.gachaPermit }}
                  </div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit10 !== '0'" :class="getSpriteImg('7004icon', 0)"
                  ></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit10 !== '0'">
                    {{ singlePack.gachaPermit10 }}
                  </div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
          <div v-for="(act, index) in gacha_actReward" :key="index">
            <div class="gacha_unit_child" v-show="act.plans<plans">
              <div class="gacha_unit_child_title">{{ act.packName }}</div>
              <!-- 一个通用的资源显示模块 -->
              <div class="gacha_resources_unit" style="width: 234px">
                <div style="width: 40px" v-show="act.gachaOrundum !== '0'" :class="getSpriteImg('4003icon', 0)"></div>
                <div style="width: 54px" v-show="act.gachaOrundum !== '0'">{{ act.gachaOrundum }}</div>
                <div style="width: 40px" v-show="act.gachaOriginium !== '0'" :class="getSpriteImg('4002icon', 0)"></div>
                <div style="width: 54px" v-show="act.gachaOriginium !== '0'">{{ act.gachaOriginium }}</div>
                <div style="width: 40px" v-show="act.gachaPermit !== '0'" :class="getSpriteImg('7003icon', 0)"></div>
                <div style="width: 54px" v-show="act.gachaPermit !== '0'">{{ act.gachaPermit }}</div>
                <div style="width: 40px" v-show="act.gachaPermit10 !== '0'" :class="getSpriteImg('7004icon', 0)"></div>
                <div style="width: 54px" v-show="act.gachaPermit10 !== '0'">{{ act.gachaPermit10 }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <!-- 其它资源（估算） -->
      <el-collapse-item class="collapse-item" name="6" style="display: block">
        <template slot="title">
          <div class="gacha_title_icon"></div>
          <span class="collapse-item_title">其它资源（估算）{{ getFixed(gachaTimes_other) }}抽</span>
        </template>

        <div class="gacha_unit" id="otherRes">
          <div v-for="(other, index) in gacha_honeyCake" :key="index">
            <div class="gacha_unit_child" v-show="other.plans>plans-3&&other.plans<plans">
              <div class="gacha_unit_child_title" style="width: 240px">
                {{ other.packName }}
              </div>
              <div class="gacha_resources_unit" style="width: 234px">
                <div style="width: 40px" v-show="other.gachaOrundum !== '0'" :class="getSpriteImg('4003icon', 0)"></div>
                <div style="width: 54px" v-show="other.gachaOrundum !== '0'&&other.packName!=='产业合作洽谈会'" >
                  {{ other.gachaOrundum }}
                </div>
                <div style="width: 54px" v-show="other.gachaOrundum !== '0'&&other.packName==='产业合作洽谈会'" >
                  {{ other.gachaOrundum-countDown*660 }}
                </div>
                <div style="width: 40px" v-show="other.gachaOriginium !== '0'" :class="getSpriteImg('4002icon', 0)"></div>
                <div style="width: 54px" v-show="other.gachaOriginium !== '0'">
                  {{ other.gachaOriginium }}
                </div>
                <div style="width: 40px" v-show="other.gachaPermit !== '0'" :class="getSpriteImg('7003icon', 0)" ></div>
                <div style="width: 54px" v-show="other.gachaPermit !== '0'&&other.packName!=='限定池每日赠送寻访凭证'">
                  {{ other.gachaPermit }}
                </div>
                <div style="width: 54px" v-show="other.gachaPermit !== '0'&&other.packName==='限定池每日赠送寻访凭证'" >
                  {{ other.gachaPermit-countDown }}
                </div>
                <div style="width: 40px" v-show="other.gachaPermit10 !== '0'" :class="getSpriteImg('7004icon', 0)"></div>
                <div style="width: 54px" v-show="other.gachaPermit10 !== '0'">
                  {{ other.gachaPermit10 }}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <!-- 致谢 -->
      <el-collapse-item class="collapse-item" name="7" style="display: block">
        <template slot="title">
          <div class="gacha_title_icon" style="background: #337fcb"></div>
          <span class="collapse-item_title">致谢</span>
        </template>

        <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 280px">
              B站发布:
              <a href="https://space.bilibili.com/688411531">罗德岛基建BETA<img
                class="gacha_img_small"
                src="/img/website/el.png"
              /></a>
            </div>
          </div>
        <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 280px">
              QQ群:
              <a href="https://jq.qq.com/?_wv=1027&k=YoiC6RWw">罗德岛数据文献馆<img class="gacha_img_small" src="/img/website/el.png"></a>
            </div>
          </div>
        <div class="gacha_unit" id="direction">
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 280px">
              活动排期:
              <a href="https://space.bilibili.com/8412516">罗德岛蜜饼工坊<img
                class="gacha_img_small"
                src="/img/website/el.png"
              /></a>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 280px">
              搓玉计算:
              <a href="https://space.bilibili.com/22606843">公孙长乐<img class="gacha_img_small" src="/img/website/el.png"
              /></a>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 280px">
              数据参考:
              <a href="https://prts.wiki">prts.wiki<img
                class="gacha_img_small"
                src="/img/website/el.png"
              /></a>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 280px">
              项目地址:
              <a href="https://github.com/Zirun-wang/yituliuFrontEnd">Github页面<img
                class="gacha_img_small"
                src="/img/website/el.png"
              /></a>
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 280px">
              <a href="https://www.wjx.cn/vm/QXIrwfN.aspx">攒抽规划反馈表<img class="gacha_img_small" src="/img/website/el.png"></a>
            </div>
          </div>
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
  import "~/assets/css/gacha.css";
  import toolApi from "@/api/tool";
  import cookie from "js-cookie";
  let echarts = require("echarts");

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
        checkBox: ["0", "1", "2", "7"],
        endTime: [],
        startDate: "", //开始时间
        endDate: "2023/01/29 03:59:00", //结束时间
        start_TimeStamp: "",
        end_TimeStamp: "",
        plans:2,
        timeSelector:"春节限定(1.29)",

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
        gachaTimes_total: 0, //总抽卡次数

        gachaTimes_originium: 0, //总抽卡次数（源石部分）

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
        monthsRemaining: 2, //剩余月数
        MonthsSignInRemaining: 0, // 剩余签到次数

        countDown: 0, //限定池每日送抽倒计时
        countDown2: 0, //限定池每日送抽倒计时
        dailyRewards: 100, //每日奖励
        weeklyTaskRewards: 500, //周常奖励
        weeklyStageRewards: 1800, //剿灭奖励
        gachaWall: 8500, //幸运墙奖励
        originiumFlag: true, //是否源石抽卡
        weekStageFlag: true, //是否完成剿灭
        weekTaskFlag: true, //是否完成周常
        greenStoreFlag: false, //是否兑换绿票商店
        skinFlag: 0, //购买皮肤的数量
        originiumValue: true,
        weekStageValue: true,
        weekTaskValue: true,
        greenF1Value: 0,
        skinValue: 0,
        customValue: 0, //自定义值
        cookieInit: 0,
        pieData: [],
      };
    },
    created() {
      this.getDate();
      this.getInterval();
      this.getEveryreWard();
      this.getCountDown();
    
     
    },
    mounted() {
      // this.updateVisits();
      this.compute();
      this.pieChart(this.pieData);
       
    },
    methods: {
      updateVisits() {
        toolApi.updateVisits("gacha").then((response) => {});
      },

      getSpriteImg(packName, index) {
        if (index === 0) return "bg-" + packName + " sprite_gacha";
        return "bg-" + packName;
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
          this.countDown = 14-num;
        }
        console.log("限定池持续了" + this.countDown + "天");
      },

      //获取还有多少天
      getInterval() {
        console.log("今天是", this.startDate);
        this.weeksRemaining = 0;
       
        this.MonthsSignInRemaining = 0;
        this.start_TimeStamp = Date.parse(new Date(this.startDate)); //1642471535000
        
        
        if(this.end_TimeStamp<13){
           this.end_TimeStamp = Date.parse(this.endDate); //1642471500000
        }
        
        var num = parseInt((this.end_TimeStamp - this.start_TimeStamp) / 86400000);

        for (let i = 1; i < num + 1; i++) {
          if (new Date(this.start_TimeStamp + 86400000 * i).getDay() === 1) {
            this.weeksRemaining++;
          }
      
          if (new Date(this.start_TimeStamp + 86400000 * i).getDate() === 17) {
            this.MonthsSignInRemaining++;
          }
        }
        console.log("距离活动还有" + num + "天");
        this.daysRemaining = num;
      },

      checkEndDate() {
        if(this.timeSelector==='春节限定(1.29)'){
          this.end_TimeStamp = 1675108800000;
          this.cookieInit=0;
          this.monthsRemaining = 1;
          this.countDown2 = 0;
          this.plans =2;
        }else{
          this.end_TimeStamp = 1684094400000;
          this.cookieInit=0;
          this.monthsRemaining = 3;
          this.countDown2 = 14-this.countDown;
          this.plans =3;
        }
        
        this.getInterval();
        this.getEveryreWard();
        this.compute();
      },

      getEveryreWard() {
        // console.log("运行了")
        this.dailyRewards = 100 * parseInt(this.daysRemaining);
        this.weeklyTaskRewards = 500 * parseInt(this.weeksRemaining);
        this.weeklyStageRewards = 1800 * parseInt(this.weeksRemaining);
        console.log("距离活动还有" + this.weeksRemaining, "周");
      },

      compute() {
        // console.log("计算开始", this.checkBox);
        //初始化

        this.valueInit();
        console.log("初始化数值");

        //判断是否用源石抽卡
        var flag_originium = 0;
        if (this.originiumFlag) {
          flag_originium = 1;
        }

        //判断是否完成周常日常
        this.weekTaskValue = 1;
        if (this.weekTaskFlag) {
          this.weekTaskValue = 0;
        }

        //判断是否完成剿灭
        this.weekStageValue = 1;
        if (this.weekStageFlag) {
          this.weekStageValue = 0;
        } 
        

        this.greenF1Value = 0;
       
        if(typeof this.greenStoreFlag ==='string' ){
           if(this.greenStoreFlag ==="false") this.greenStoreFlag = false;
           if(this.greenStoreFlag ==="true") this.greenStoreFlag = true;
        }
      
        if (this.greenStoreFlag) {
          this.greenF1Value = 1;
          
        }
        

        //库存计算（共计）
        this.originium =
          parseInt(this.originium) + parseInt(this.originium_exist);
        this.orundum =
          parseInt(this.orundum) +
          parseInt(this.orundum_exist) +
          parseInt(this.customValue);
        this.permit = parseInt(this.permit) + parseInt(this.permit_exist);
        this.permit10 = parseInt(this.permit10) + parseInt(this.permit10_exist);

        //库存抽卡次数（单项）
        this.gachaTimes_exist =
          parseInt(this.originium_exist) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum_exist) / 600 +
          parseInt(this.permit_exist) +
          parseInt(this.permit10_exist) * 10 +
          parseInt(this.customValue) / 600;

        //主线和常驻活动计算（共计）
        for (let i = 0; i < this.gacha_potentialList.length; i++) {
          this.originium =
            parseInt(this.originium) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaOriginium);
          this.orundum =
            parseInt(this.orundum) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaOrundum);
          this.permit =
            parseInt(this.permit) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaPermit);
          this.permit10 =
            parseInt(this.permit10) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaPermit10);
          this.originium_potential =
            parseInt(this.originium_potential) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaOriginium);
          this.orundum_potential =
            parseInt(this.orundum_potential) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaOrundum);
          this.permit_potential =
            parseInt(this.permit_potential) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaPermit);
          this.permit10_potential =
            parseInt(this.permit10_potential) +
            parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaPermit10);
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
            parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].gachaPermit);
          this.permit10 =
            parseInt(this.permit10) +
            parseInt(
              this.gacha_storePacks[this.gacha_storePacksList[i]].gachaPermit10
            );
          if ("月卡" === this.gacha_storePacks[this.gacha_storePacksList[i]].packName) {
            console.log("买的月卡个数", Math.ceil(this.daysRemaining / 30));
            this.orundum =
              parseInt(this.orundum) + parseInt(this.daysRemaining) * 200;
            this.originium =
              parseInt(this.originium) + Math.ceil(this.daysRemaining / 30) * 6;
            this.sellsCount =
              parseInt(this.sellsCount) + Math.ceil(this.daysRemaining / 30) * 30;
            this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOrundum =
              parseInt(this.orundum) + parseInt(this.daysRemaining) * 200;
            this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOriginium =
              parseInt(this.originium) + Math.ceil(this.daysRemaining / 30) * 6;
            this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOrundum =
              parseInt(this.daysRemaining) * 200;
            this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOriginium =
              Math.ceil(this.daysRemaining / 30) * 6;

          } else {
            this.originium =
              parseInt(this.originium) +
              parseInt(
                this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOriginium
              );
            this.orundum =
              parseInt(this.orundum) +
              parseInt(
                this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOrundum
              );
            this.sellsCount =
              parseInt(this.sellsCount) +
              parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].packPrice);
          }

          this.permit_gacha =
            parseInt(this.permit_gacha) +
            parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].gachaPermit);
          this.permit10_gacha =
            parseInt(this.permit10_gacha) +
            parseInt(
              this.gacha_storePacks[this.gacha_storePacksList[i]].gachaPermit10
            );
          if ("月卡" === this.gacha_storePacks[this.gacha_storePacksList[i]].packName) {
            this.orundum_gacha =
              parseInt(this.orundum_gacha) + parseInt(this.daysRemaining) * 200;
            this.originium_gacha =
              parseInt(this.originium_gacha) +
              Math.ceil(this.daysRemaining / 30) * 6;
          } else {
            this.orundum_gacha =
              parseInt(this.orundum_gacha) +
              parseInt(
                this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOrundum
              );
            this.originium_gacha =
              parseInt(this.originium_gacha) +
              parseInt(
                this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOriginium
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
          parseInt(this.monthsRemaining - this.greenF1Value) * 600 +
          parseInt(this.weeklyTaskRewards) +
          parseInt(this.weeklyStageRewards);

        this.permit =
          parseInt(this.permit) +
          parseInt(this.monthsRemaining - this.greenF1Value) * 4 +
          parseInt(this.MonthsSignInRemaining);

        //黄票商店38抽计算
        for (let i = 0; i < this.gacha_store258List.length; i++) {
          this.originium =
            parseInt(this.originium) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaOriginium);
          this.orundum =
            parseInt(this.orundum) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaOrundum);
          this.permit =
            parseInt(this.permit) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaPermit);
          this.permit10 =
            parseInt(this.permit10) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaPermit10);

          this.originium_daily =
            parseInt(this.originium_daily) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaOriginium);
          this.orundum_daily =
            parseInt(this.orundum_daily) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaOrundum);
          this.permit_daily =
            parseInt(this.permit_daily) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaPermit);
          this.permit10_daily =
            parseInt(this.permit10_daily) +
            parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaPermit10);
        }

        //日常资源抽卡次数(单项)
        this.orundum_daily =
          parseInt(this.orundum_daily) +
          parseInt(this.dailyRewards) +
          parseInt(this.weeklyTaskRewards) +
          parseInt(this.weeklyStageRewards) +
          parseInt(this.weekTaskValue) * 500 +
          parseInt(this.weekStageValue) * 1800 +
          parseInt(this.monthsRemaining - this.greenF1Value) * 600;

        this.permit_daily =
          parseInt(this.permit_daily) +
          parseInt(this.monthsRemaining - this.greenF1Value) * 4 +
          parseInt(this.MonthsSignInRemaining);

        this.gachaTimes_daily =
          parseInt(this.originium_daily) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum_daily) / 600 +
          parseInt(this.permit_daily) +
          parseInt(this.permit10_daily) * 10;

        //活动抽卡计算（共计）

        for (let i = 0; i < this.gacha_actReward.length; i++) {
          if (this.gacha_actReward[i].plans<this.plans) {
            this.originium =
              parseInt(this.originium) +
              parseInt(this.gacha_actReward[i].gachaOriginium);
            this.orundum =
              parseInt(this.orundum) + parseInt(this.gacha_actReward[i].gachaOrundum);
            this.permit =
              parseInt(this.permit) + parseInt(this.gacha_actReward[i].gachaPermit);
            this.permit10 =
              parseInt(this.permit10) +
              parseInt(this.gacha_actReward[i].gachaPermit10);
            this.originium_act =
              parseInt(this.originium_act) +
              parseInt(this.gacha_actReward[i].gachaOriginium);
            this.orundum_act =
              parseInt(this.orundum_act) +
              parseInt(this.gacha_actReward[i].gachaOrundum);
            this.permit_act =
              parseInt(this.permit_act) +
              parseInt(this.gacha_actReward[i].gachaPermit);
            this.permit10_act =
              parseInt(this.permit10_act) +
              parseInt(this.gacha_actReward[i].gachaPermit10);
          }
        }

        for (let i = 0; i < this.gacha_actReList.length; i++) {
          this.originium =
            parseInt(this.originium) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaOriginium);
          this.orundum =
            parseInt(this.orundum) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaOrundum);
          this.permit =
            parseInt(this.permit) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaPermit);
          this.permit10 =
            parseInt(this.permit10) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaPermit10);
          this.originium_act =
            parseInt(this.originium_act) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaOriginium);
          this.orundum_act =
            parseInt(this.orundum_act) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaOrundum);
          this.permit_act =
            parseInt(this.permit_act) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaPermit);
          this.permit10_act =
            parseInt(this.permit10_act) +
            parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaPermit10);
        }

        //活动抽卡次数（单项）
        this.gachaTimes_activity =
          parseInt(this.originium_act) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum_act) / 600 +
          parseInt(this.permit_act) +
          parseInt(this.permit10_act) * 10;

        //其他抽卡计算
        for (let i = 0; i < this.gacha_honeyCake.length; i++) {
          if (this.gacha_honeyCake[i].plans<this.plans ) {
            this.originium =
              parseInt(this.originium) +
              parseInt(this.gacha_honeyCake[i].gachaOriginium);
            this.orundum =
              parseInt(this.orundum) + parseInt(this.gacha_honeyCake[i].gachaOrundum);
            this.permit =
              parseInt(this.permit) + parseInt(this.gacha_honeyCake[i].gachaPermit);

            this.permit10 =
              parseInt(this.permit10) +
              parseInt(this.gacha_honeyCake[i].gachaPermit10);
            this.originium_other =
              parseInt(this.originium_other) +
              parseInt(this.gacha_honeyCake[i].gachaOriginium);
            this.orundum_other =
              parseInt(this.orundum_other) +
              parseInt(this.gacha_honeyCake[i].gachaOrundum);
            this.permit_other =
              parseInt(this.permit_other) +
              parseInt(this.gacha_honeyCake[i].gachaPermit);
            this.permit10_other =
              parseInt(this.permit10_other) +
              parseInt(this.gacha_honeyCake[i].gachaPermit10);
          }
        }
  
        
         //自动扣除部分{
        //合成玉=—周常—剿灭—幸运墙
        this.orundum =
          parseInt(this.orundum) +
          parseInt(this.weekTaskValue) * 500 +
          parseInt(this.weekStageValue) * 1800 -
          parseInt(this.countDown) * 660 ;


        this.orundum_other =
          parseInt(this.orundum_other) + 
          parseInt(this.weekTaskValue) * 500 +
          parseInt(this.weekStageValue) * 1800 - 
          parseInt(this.countDown) * 660 ;

          //寻访记录=减去倒计时
        this.permit_other =
          parseInt(this.permit_other) - parseInt(this.countDown)
          - parseInt(this.countDown2);
        
        this.permit =
          parseInt(this.permit) - parseInt(this.countDown)
          - parseInt(this.countDown2);
          

        //其他抽卡次数
        this.gachaTimes_other =
          parseInt(this.originium_other) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum_other) / 600 +
          parseInt(this.permit_other) +
          parseInt(this.permit10_other) * 10 


        if (parseInt(this.originium - parseInt(this.skinFlag) * 18) < 0) {
         this.$message.error("你的源石不足");
        }

        this.skinValue = this.skinFlag;

        this.originium = parseInt(this.originium) - parseInt(this.skinValue) * 18;

        this.originium = parseInt(this.originium) * parseInt(flag_originium);

        this.sellsCount =
          this.sellsCount +
          648 * parseInt(this.originium_648) +
          328 * parseInt(this.originium_328) +
          198 * parseInt(this.originium_198) +
          98 * parseInt(this.originium_98) +
          30 * parseInt(this.originium_30) +
          6 * parseInt(this.originium_6);

        //抽卡次数
        this.gachaTimes_total =
          parseInt(this.originium) * 0.3 * parseInt(flag_originium) +
          parseInt(this.orundum) / 600 +
          parseInt(this.permit) +
          parseInt(this.permit10) * 10;

        //源石抽卡次数
        this.gachaTimes_originium =
        (this.originium_exist +
            this.originium_potential +
            this.originium_gacha +
            this.originium_daily +
            this.originium_act +
            this.originium_other
            - parseInt(this.skinValue) * 18) * 0.3 * parseInt(flag_originium)


        this.pieData = [];
        var chartFan = {};
        if (this.gachaTimes_exist > 0) {
          chartFan.value = parseInt(this.gachaTimes_exist);
          chartFan.name = "现有";
          this.pieData.push(chartFan);
        }
        if (this.gachaTimes_potential > 0) {
          chartFan = {};
          chartFan.value = parseInt(this.gachaTimes_potential);
          chartFan.name = "潜在";
          this.pieData.push(chartFan);
        }
        if (this.gachaTimes_daily > 0) {
          chartFan = {};
          chartFan.value = parseInt(this.gachaTimes_daily);
          chartFan.name = "日常";
          this.pieData.push(chartFan);
        }
        if (this.gachaTimes_gacha > 0) {
          chartFan = {};
          chartFan.value = parseInt(this.gachaTimes_gacha);
          chartFan.name = "氪金";
          this.pieData.push(chartFan);
        }
        if (this.gachaTimes_activity > 0) {
          chartFan = {};
          chartFan.value = parseInt(this.gachaTimes_activity);
          chartFan.name = "活动";
          this.pieData.push(chartFan);
        }
        if (this.gachaTimes_other > 0) {
          chartFan = {};
          chartFan.value = parseInt(this.gachaTimes_other);
          chartFan.name = "其它";
          this.pieData.push(chartFan);
        }

     

        if (this.cookieInit > 1) {
          this.pieChart(this.pieData);
        }
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
          cookie.set("greenStoreFlag", this.greenStoreFlag, { expires: 30 });
        } else {
          this.originium_exist = cookie.get("originium_exist");
          this.orundum_exist = cookie.get("orundum_exist");
          this.permit_exist = cookie.get("permit_exist");
          this.permit10_exist = cookie.get("permit10_exist");
          this.paradox = cookie.get("paradox");
          this.greenStoreFlag = cookie.get("greenStoreFlag");
        }
        this.cookieInit++;

        if (this.originium_exist === "" || this.originium_exist === undefined ||
          typeof this.originium_exist == "undefined") this.originium_exist = 0;
        if (this.orundum_exist === "" || this.orundum_exist === undefined ||
          typeof this.orundum_exist == "undefined") this.orundum_exist = 0;
        if (this.permit_exist === "" || this.permit_exist === undefined ||
          typeof this.permit_exist == "undefined") this.permit_exist = 0;
        if (this.permit10_exist === "" || this.permit10_exist === undefined ||
          typeof this.permit10_exist == "undefined") this.permit10_exist = 0;
        if (this.paradox === "" || this.paradox === undefined ||
          typeof this.paradox == "undefined") this.paradox = 0;


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

      getChapterWidth(index) {
        if (index % 2 == 0) return "width:200px;";
        else return "width:60px;";
      },

      getPprLabel(ppr) {
        if (ppr < 7.5) return "gacha_packPpr_t1"
        if (ppr < 11.7) return "gacha_packPpr_t2"
        return "gacha_packPpr_t3"
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

      pieChart(data) {
        var chartDom = document.getElementById("gacha_total_pie");
        var myChart = echarts.init(chartDom);

        var option = {
          tooltip: {
            formatter: "{a} {b} : {c}抽,占 ({d}%)",
            position: "inner",
          },

          series: [
            {
              name: "攒抽占比",
              type: "pie",
              radius: "70%",
              center: ["50%", "50%"],
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    textStyle: { color: "#000000", fontSize: "16" },
                    formatter: function (val) {
                      //让series 中的文字进行换行
                      return val.name.split("-").join("\n");
                    },
                  },
                  labelLine: {
                    show: true,
                    lineStyle: { color: "#000000" },
                  }, //线条颜色
                }, //基本样式
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)", //鼠标放在区域边框颜色
                  textColor: "#000",
                }, //鼠标放在各个区域的样式
              },
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        myChart.setOption(option);
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
    border-radius: 8px;
    font-size: 20px;
    box-shadow: 0px 2px 6px #a0a0a0b0;
    overflow: hidden;
  }
  .collapse-item_title {
    font-size: 24px;
    padding: 8px 0px;
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
    margin: 2px 6px;
    width: calc(100% - 12px);
  }
  /* .el-switch__core{
      position: static;
        } */
</style>

