<template>
  <div id="gacha">
    <el-collapse v-model="checkBox" @change="handleChange">
      <!-- 总计 -->
      <el-collapse-item style="display: block; position: sticky; top: 60px;z-index: 99999999;" name="0" id="totalTable">
        <template slot="title">
          <div class="gacha_title_icon" style="background: chocolate"></div>
          <span class="collapse-item_title" style="color: purple">
            共计{{ getFixed(gachaTimes_total, 0) }}抽，氪金{{ sellsCount }}元
          </span>
          <span style="font-size: 20px;color: rgb(136 136 136 / 69%);margin-left: 16px;">yituliu.site</span>
        </template>
        <!-- <el-divider></el-divider> -->
        <div class="gacha_unit" id="total">
          <!-- 如果有4个选项则修改为 style="width:98%;margin:0 1%;"，子项宽度25% -->
          <el-radio-group size="small" style="width: 90%; margin: 6px 5%" v-model="timeSelector" @change="checkEndDate(timeSelector)">

            <el-radio-button label="怪猎联动(3.14)" style="width: 33%"
            ></el-radio-button>
            <el-radio-button label="4周年(5.15)" style="width: 33%" disabled
            ></el-radio-button>
            <el-radio-button label="夏活限定" type="primary" style="width: 33%" disabled
            ></el-radio-button>
            <!-- <el-radio-button label="????" disabled style="width:32%;"></el-radio-button> -->
          </el-radio-group>
          <!-- <el-divider></el-divider> -->
          <div id="gacha_total_chart">
            <div id="gacha_total_pie" ref="gacha_total_pie"
                 style="vertical-align: top; height: 200px; width: 300px; display: inline-block; top: 10px;"></div>
            <table id="gacha_total_table">
              <tbody>
              <tr class="gacha_total_table_tr">
                <td>现有</td>
                <td>{{ getFixed(gachaTimesInfo.gachaTimes_exist, 0) }}</td>
                <td>抽</td>
              </tr>
              <tr class="gacha_total_table_tr">
                <td>日常</td>
                <td>{{ getFixed(gachaTimesInfo.gachaTimes_daily, 0) }}</td>
                <td>抽</td>
              </tr>
              <tr class="gacha_total_table_tr">
                <td>潜在</td>
                <td>{{ getFixed(gachaTimesInfo.gachaTimes_potential, 0) }}</td>
                <td>抽</td>
              </tr>
              <tr class="gacha_total_table_tr">
                <td>氪金</td>
                <td>{{ getFixed(gachaTimesInfo.gachaTimes_gacha, 0) }}</td>
                <td>抽</td>
              </tr>
              <tr class="gacha_total_table_tr">
                <td>活动(估算)</td>
                <td>{{ getFixed(gachaTimesInfo.gachaTimes_activity, 0) }}</td>
                <td>抽</td>
              </tr>
              <tr class="gacha_total_table_tr">
                <td>其它(估算)</td>
                <td>{{ getFixed(gachaTimesInfo.gachaTimes_other, 0) }}</td>
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
                {{ getFixed(orundum, 0) }}
                <span style="font-size: 14px;">
                 &nbsp;({{ (getFixed(orundum, 0) / 600).toFixed(2) }})
                </span>
              </div>
            </div>
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('4002icon', 0)"></div>
                {{ getFixed(originium, 0) }}
                <span style="font-size: 14px;">
                 &nbsp;({{ (gachaTimes_originium).toFixed(2) }})
                </span>
              </div>
            </div>
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('7003icon', 0)"></div>
                {{ getFixed(permit, 0) }}
              </div>
            </div>
            <div class="gacha_unit_child_title">
              <div style="display: flex">
                <div :class="getSpriteImg('7004icon', 0)"></div>
                {{ getFixed(permit10, 0) }}
                <span style="font-size: 14px;">
                 &nbsp;({{ getFixed(permit10, 0) * 10 }})
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
          >现有库存 {{ getFixed(gachaTimesInfo.gachaTimes_exist, 0) }}抽</span
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
                  v-model.number="gachaTimesInfo.orundum_exist"
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
                  v-model.number="gachaTimesInfo.originium_exist"
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
                  v-model.number="gachaTimesInfo.permit_exist"
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
                  v-model.number="gachaTimesInfo.permit10_exist"
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
              v-model.number="customValue"
            />
            <div class="gacha_unit_child_title" style="width: 270px;">
              自定义修正值（例如搓玉）
            </div>
            <div class="gacha_resources_unit" style="width: 135px;">
              <div :class="getSpriteImg('4003icon', 0)"></div>
              {{ getFixed(customValue * 1.09,2)  }}
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 100%;">
              搓玉比例:1理智=1.09玉(1-7)
              <a href="/?item=Orundum" style="margin: 0px 20px;">查看备选搓玉关卡</a>
              <a href="https://www.bilibili.com/video/BV1XT411F7m4" style="display: inline-block;">
                如何安排搓玉？
                <!-- <img class="gacha_img_small" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/el.png"/> -->
              </a>
            </div>
          </div>
          <!-- 填空模块End -->
          <div class="gacha_unit_child" style="display: flex">
            <div class="gacha_unit_child_title">
              预留皮肤(18石/件)
            </div>
            <el-slider
              v-model="skinNumValue"
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
          <span class="collapse-item_title">日常积累 {{ getFixed(gachaTimesInfo.gachaTimes_daily, 0) }}抽</span>
        </template>
        <div class="gacha_unit" id="daily">
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              日常 {{ remainingDays }} 天
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
              周常 {{ remainingWeekBattle + weeklyTaskValue }} 周
            </div>
            <div class="gacha_resources_unit" style="width: 192px">
              <div :class="getSpriteImg('4003icon', 0)"></div>
              <div style="width: 75px">
                {{ weeklyTaskRewards + weeklyTaskValue * 500 }}
              </div>
            </div>
            <div
              @click="compute()"
              class="gacha_unit_child_title"
              style="width: 150px; line-height: 32px"
            >
              <el-switch
                v-model="weeklyTaskFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
              本周已完成
            </div>
          </div>

          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              剿灭 {{ remainingWeekBattle + AnnihilationStageValue }} 周
            </div>
            <div class="gacha_resources_unit" style="width: 192px">
              <div :class="getSpriteImg('4003icon', 0)"></div>
              <div style="width: 75px">
                {{ EXTERMINATIONRewards + AnnihilationStageValue * 1800 }}
              </div>
            </div>
            <div
              @click="compute()"
              class="gacha_unit_child_title"
              style="width: 150px; line-height: 32px"
            >
              <el-switch
                v-model="EXTERMINATIONFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
              本周已完成
            </div>
          </div>
          <!-- 周常月常分界线 -->
          <el-divider></el-divider>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              绿票商店 {{ remainingMonths - certificateStoreValue }} 月
            </div>
            <div class="gacha_resources_unit" style="width: 192px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4003icon', 0)"></div>
              <div style="width: 66px">
                {{ (remainingMonths - certificateStoreValue) * 600 }}
              </div>
              <div
                style="width: 40px"
                :class="getSpriteImg('7003icon', 0)"></div>
              <div style="width: 28px">
                {{ (remainingMonths - certificateStoreValue) * 4 }}
              </div>
            </div>
            <div
              @click="compute()"
              class="gacha_unit_child_title"
              style="width: 150px; line-height: 32px"
            >
              <el-switch
                v-model="certificateStoreFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
              本月已换
            </div>
          </div>
          <div class="gacha_unit_child">
            <div class="gacha_unit_child_title" style="width: 150px">
              每月签到 {{ remainingCheckinTimes }} 月
            </div>
            <div class="gacha_resources_unit" style="width: 174px">
              <div :class="getSpriteImg('7003icon', 0)"></div>
              <div style="width: 32px">{{ remainingCheckinTimes }}</div>
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
          >潜在资源 {{ getFixed(gachaTimesInfo.gachaTimes_potential, 0) }}抽</span
          >
        </template>

        <div class="gacha_unit" id="potential">
          <!-- 悖论模拟 -->
          <div class="gacha_unit_child">
            <input
              class="gacha_unit_child_inputbox"
              type="text"
              @change="compute()"
              v-model.number="paradox"
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
            <img class="gacha_img_small" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/ex-icon.png"/>
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
            <img class="gacha_img_small" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/ex-icon.png"/>支线、别传
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
          <span class="collapse-item_title">氪金资源 {{ getFixed(gachaTimesInfo.gachaTimes_gacha, 0) }}抽</span>
        </template>

        <div class="gacha_unit" id="charge">
          <div class="gacha_unit_child_instruction" style="padding: 4px 16px;font-size: 18px;color: brown;">
            标签内为每抽价格(元)，颜色用于区分性价比<br>
            仅计入礼包内抽卡资源，紫色高于648，橙色高于大月卡<br>
            <a href="https://yituliu.site/pack">点击跳转礼包完整性价比</a>
          </div>
          <!-- 月常礼包 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/ex-icon.png">月常礼包
          </div>
          <el-checkbox-group v-model="gacha_storePacksList">
            <div v-for="(singlePack, index) in gacha_storePacks" :key="index" v-show="singlePack.packType == 'monthly'"
                 class="gacha_unit_child" @change="compute(singlePack.packName)">
              <el-checkbox-button :label="index">
                <div class="gacha_packPpr" :class=getPprLabel(singlePack.packRmbPerDraw)>
                  {{ getFixed(singlePack.packRmbPerDraw, 2) }}
                </div>
                <div class="gacha_unit_child_title" style="width: 168px">
                  {{ singlePack.packName }}
                </div>
                <div class="gacha_resources_unit" style="width: 192px">
                  <div style="width: 40px" v-show="singlePack.gachaOrundum !== 0"
                       :class="getSpriteImg('4003icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOrundum !== 0">{{ singlePack.gachaOrundum }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaOriginium !== 0"
                       :class="getSpriteImg('4002icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOriginium !== 0"> {{
                      singlePack.gachaOriginium
                    }}
                  </div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit !== 0"
                       :class="getSpriteImg('7003icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit !== 0"> {{ singlePack.gachaPermit }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit10 !== 0"
                       :class="getSpriteImg('7004icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit10 !== 0"> {{ singlePack.gachaPermit10 }}</div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
          <!-- 限时礼包 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/ex-icon.png">限时礼包
          </div>
          <el-checkbox-group v-model="gacha_storePacksList" class="">
            <div v-for="(singlePack, index) in gacha_storePacks" :key="index" v-show="singlePack.packType == 'limited'"
                 class="gacha_unit_child" @change="compute(singlePack.packName)">
              <el-checkbox-button :label="index">
                <div class="gacha_packPpr" :class=getPprLabel(singlePack.packRmbPerDraw)>
                  {{ getFixed(singlePack.packRmbPerDraw, 2) }}
                </div>
                <div class="gacha_unit_child_title" style="width: 168px">
                  {{ singlePack.packName }}
                </div>
                <!-- 一个通用的资源显示模块 -->
                <div class="gacha_resources_unit" style="width: 279px;">
                  <div style="width: 40px" v-show="singlePack.gachaOrundum > 0.1"
                       :class="getSpriteImg('4003icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOrundum > 0.1">{{ singlePack.gachaOrundum }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaOriginium > 0.1"
                       :class="getSpriteImg('4002icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOriginium > 0.1"> {{
                      singlePack.gachaOriginium
                    }}
                  </div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit > 0.1"
                       :class="getSpriteImg('7003icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit > 0.1"> {{ singlePack.gachaPermit }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit10 > 0.1"
                       :class="getSpriteImg('7004icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit10 > 0.1"> {{ singlePack.gachaPermit10 }}</div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
          <!-- 新人礼包 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/ex-icon.png">新人礼包
          </div>
          <el-checkbox-group v-model="gacha_storePacksList" class="">
            <div v-for="(singlePack, index) in gacha_storePacks" :key="index" v-show="singlePack.packType == 'once'"
                 class="gacha_unit_child" @change="compute(singlePack.packName)">
              <el-checkbox-button :label="index">
                <div class="gacha_packPpr" :class=getPprLabel(singlePack.packRmbPerDraw)>
                  {{ getFixed(singlePack.packRmbPerDraw, 2) }}
                </div>
                <div class="gacha_unit_child_title" style="width: 168px">
                  {{ singlePack.packName }}
                </div>
                <!-- 一个通用的资源显示模块 -->
                <div class="gacha_resources_unit" style="width: 279px;">
                  <div style="width: 40px" v-show="singlePack.gachaOrundum > 0.1"
                       :class="getSpriteImg('4003icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOrundum > 0.1">{{ singlePack.gachaOrundum }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaOriginium > 0.1"
                       :class="getSpriteImg('4002icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOriginium > 0.1"> {{
                      singlePack.gachaOriginium
                    }}
                  </div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit > 0.1"
                       :class="getSpriteImg('7003icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit > 0.1"> {{ singlePack.gachaPermit }}</div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit10 > 0.1"
                       :class="getSpriteImg('7004icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit10 > 0.1"> {{ singlePack.gachaPermit10 }}</div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
          <!-- 首充 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/ex-icon.png"/>源石首充
          </div>
          <el-checkbox-group v-model="gacha_storePacksList" class="">
            <div v-for="(singlePack, index) in gacha_storePacks" :key="index" v-show="singlePack.packType == 'year'"
                 class="gacha_unit_child" @change="compute(singlePack.packName)">
              <el-checkbox-button :label="index">
                <div class="gacha_packPpr" :class=getPprLabel(singlePack.packRmbPerDraw)>
                  {{ getFixed(singlePack.packRmbPerDraw, 2) }}
                </div>
                <div class="gacha_unit_child_title" style="width: 168px">
                  {{ singlePack.packName }}
                </div>
                <div class="gacha_resources_unit" style="width: 102px">
                  <div style="width: 40px" v-show="singlePack.gachaOriginium !== 0"
                       :class="getSpriteImg('4002icon', 0)"></div>
                  <div style="width: 54px" v-show="singlePack.gachaOriginium !== 0">{{ singlePack.gachaOriginium }}
                  </div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
          <!-- 非首充 -->
          <div class="gacha_unit_fold">
            <img class="gacha_img_small" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/ex-icon.png"/>非首充
          </div>

          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model.number="originium_648">
            <div class="gacha_packPpr" :class=getPprLabel(11.68)>11.68</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石648元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_648 * 185, 0) }}</div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model.number="originium_328">
            <div class="gacha_packPpr" :class=getPprLabel(12.15)>12.15</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石328元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_328 * 90, 0) }}</div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model.number="originium_198">
            <div class="gacha_packPpr" :class=getPprLabel(13.20)>13.20</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石198元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_198 * 50, 0) }}</div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model.number="originium_98">
            <div class="gacha_packPpr" :class=getPprLabel(13.61)>13.61</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石98元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_98 * 24, 0) }}</div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model.number="originium_30">
            <div class="gacha_packPpr" :class=getPprLabel(14.29)>14.29</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石30元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_30 * 7, 0) }}</div>
            </div>
          </div>
          <div class="gacha_unit_child">
            <input class="gacha_unit_child_inputbox" type="text" @change="compute()" v-model.number="originium_6">
            <div class="gacha_packPpr" :class=getPprLabel(20.00)>20.00</div>
            <div class="gacha_unit_child_title" style="width: 225px">
              普通源石6元
            </div>
            <div class="gacha_resources_unit" style="width: 126px">
              <div
                style="width: 40px"
                :class="getSpriteImg('4002icon', 0)"></div>
              <div style="width: 54px">{{ getFixed(originium_6 * 1, 0) }}</div>
            </div>
          </div>

          <!-- 复选模块End -->
        </div>
      </el-collapse-item>
      <!-- 活动获得（估算） -->
      <el-collapse-item class="collapse-item" name="5" style="display: block">
        <template slot="title">
          <div class="gacha_title_icon"></div>
          <span class="collapse-item_title">活动获得（估算）{{ getFixed(gachaTimesInfo.gachaTimes_activity, 0) }}抽</span>
        </template>

        <div class="gacha_unit" id="activity">

          <div class="gacha_unit_child">复刻活动</div>
          <el-checkbox-group v-model="gacha_actReList" class="">
            <div
              v-for="(singlePack, index) in gacha_actRe"
              :key="index"
              v-show="singlePack.packType == 'activityper'"
              class="gacha_unit_child"
              @change="compute(singlePack.packName)"
            >
              <el-checkbox-button :label="index" v-show=" activityPlan .includes(singlePack.plans)">
                <div class="gacha_unit_child_title" style="width: 200px">
                  {{ singlePack.packName }}
                </div>
                <div class="gacha_resources_unit" style="width: 192px">
                  <div style="width: 40px" v-show="singlePack.gachaOrundum !== '0'" :class="getSpriteImg('4003icon', 0)"
                  ></div>
                  <div style="width: 54px" v-show="singlePack.gachaOrundum !== '0'">
                    {{ singlePack.gachaOrundum }}
                  </div>
                  <div style="width: 40px" v-show="singlePack.gachaOriginium !== '0'"
                       :class="getSpriteImg('4002icon', 0)"
                  ></div>
                  <div style="width: 54px" v-show="singlePack.gachaOriginium !== '0'">
                    {{ singlePack.gachaOriginium }}
                  </div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit !== '0'" :class="getSpriteImg('7003icon', 0)"
                  ></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit !== '0'">
                    {{ singlePack.gachaPermit }}
                  </div>
                  <div style="width: 40px" v-show="singlePack.gachaPermit10 !== '0'"
                       :class="getSpriteImg('7004icon', 0)"
                  ></div>
                  <div style="width: 54px" v-show="singlePack.gachaPermit10 !== '0'">
                    {{ singlePack.gachaPermit10 }}
                  </div>
                </div>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
          <div v-for="(act, index) in gacha_actReward" :key="index">
            <div class="gacha_unit_child" v-show=" activityPlan .includes(act.plans)">
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
          <span class="collapse-item_title">其它资源（估算）{{ getFixed(gachaTimesInfo.gachaTimes_other, 0) }}抽</span>
        </template>

        <div class="gacha_unit" id="otherRes">
          <div v-for="(other, index) in gacha_honeyCake" :key="index">
            <div class="gacha_unit_child" v-show=" activityPlan .includes(other.plans)">
              <div class="gacha_unit_child_title" style="width: 240px">
                {{ other.packName }}
              </div>
              <div class="gacha_resources_unit" style="width: 234px">
                <div style="width: 40px" v-show="other.gachaOrundum !== '0'" :class="getSpriteImg('4003icon', 0)"></div>
                <div style="width: 54px" v-show="other.gachaOrundum !== '0'&&other.packName!=='幸运墙'">
                  {{ other.gachaOrundum }}
                </div>
                <div style="width: 54px" v-show="other.gachaOrundum !== '0'&&other.packName==='幸运墙'">
                  {{ other.gachaOrundum - poolCountDown * 600 }}
                </div>
                <div style="width: 40px" v-show="other.gachaOriginium !== '0'"
                     :class="getSpriteImg('4002icon', 0)"></div>
                <div style="width: 54px" v-show="other.gachaOriginium !== '0'">
                  {{ other.gachaOriginium }}
                </div>
                <div style="width: 40px" v-show="other.gachaPermit !== '0'" :class="getSpriteImg('7003icon', 0)"></div>
                <div style="width: 54px"
                     v-show="other.gachaPermit !== '0'&&other.packName.indexOf('春节池每日赠送寻访凭证') === -1">
                  {{ other.gachaPermit }}
                </div>
                <div style="width: 54px"
                     v-show="other.gachaPermit !== '0'&&other.packName.indexOf('春节池每日赠送寻访凭证') !== -1">
                  {{ other.gachaPermit - poolCountDown }}
                </div>
                <div style="width: 40px" v-show="other.gachaPermit10 !== '0'"
                     :class="getSpriteImg('7004icon', 0)"></div>
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
          <span class="collapse-item_title">开发信息</span>
        </template>
        <div id="extra" style="max-width: 1080px;margin: auto;">

          <div id="foot_main" style="background: white;">
            <!-- <div id="foot_left"> -->
            <div class="foot_unit">
              <p class="foot_unit_title">-开发信息-</p>
              <a href="https://github.com/Zirun-wang/yituliuFrontEnd">
                <div class="foot_unit_button uni_shadow_2" id="foot_frontEnd">
                  <img class="foot_unit_pic" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/github.png"/>
                  前端
                </div>
              </a>
              <a href="https://github.com/yamasakura/yituliuBackEnd">
                <div class="foot_unit_button uni_shadow_2" id="foot_backEnd">
                  <img class="foot_unit_pic" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/github.png"/>
                  后端
                </div>
              </a>
              <a href="https://jq.qq.com/?_wv=1027&k=ZmORnr5F">
                <div class="foot_unit_button uni_shadow_2" style="width: 198px;">
                  <img class="foot_unit_pic" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/qq.png"/>
                  开发群 938710832
                </div>
              </a>
              <a href="https://shimo.im/sheets/dPkpKP1zQmc1PvqO/7mSBe">
                <div class="foot_unit_button uni_shadow_2" style="width: 198px;">
                  <img class="foot_unit_pic" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/图标_源石.png"/>
                  本站财政状况
                </div>
              </a>
            </div>
            <div class="foot_unit">
              <p class="foot_unit_title">-本页开发-</p>
              <a href="https://space.bilibili.com/39109412">
                <div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
                  <img class="foot_unit_pic" src="https://avatars.githubusercontent.com/u/84258011?v=4">
                  山桜
                </div>
              </a>
              <a href="https://space.bilibili.com/10057492">
                <div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
                  <img class="foot_unit_pic" src="https://avatars.githubusercontent.com/u/84625349?v=4"/>
                  Zirunwang
                </div>
              </a>
            </div>
            <!-- </div> -->
            <!-- <div id="foot_right"> -->
            <div class="foot_unit">
              <p class="foot_unit_title">-数据支持-</p>
              <a href="https://space.bilibili.com/8412516">
                <div class="foot_unit_button uni_shadow_2" style="vertical-align:middle;color:gray;"><img
                  class="foot_unit_pic" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/honeycake.webp"/>罗德岛蜜饼工坊
                </div>
              </a>
              <a href="https://prts.wiki/w/%E9%A6%96%E9%A1%B5">
                <div class="foot_unit_button uni_shadow_2" style="vertical-align:middle;color:gray;"><img
                  class="foot_unit_pic" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/prts.png"/>PRTS
                </div>
              </a>
              <a href="https://yituliu.site/">
                <div class="foot_unit_button uni_shadow_2" style="vertical-align:middle;color:gray;"><img
                  class="foot_unit_pic" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/ico64.png"/>一图流主站
                </div>
              </a>
              <a href="https://space.bilibili.com/22606843">
                <div class="foot_unit_button uni_shadow_2" style="vertical-align:middle;color:gray;"><img
                  class="foot_unit_pic" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/公孙长乐.webp"/>公孙长乐
                </div>
              </a>
            </div>
            <div class="foot_unit">
              <p class="foot_unit_title">-B站发布-</p>
              <a href="https://space.bilibili.com/688411531">
                <div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
                  <img class="foot_unit_pic" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/bilibili.png"/>
                  罗德岛基建BETA
                </div>
              </a>
              <p class="foot_unit_title">-粉丝群/反馈-</p>
              <a href="https://jq.qq.com/?_wv=1027&k=YoiC6RWw">
                <div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
                  <img class="foot_unit_pic" src="https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/foot/qq.png"/>
                  罗德岛数据文献馆
                </div>
              </a>
            </div>
            <!-- </div> -->
          </div>
          <div style="padding: 8px 16px 8px 16px;max-width: 1080px;margin: auto;">
            本页采用<a href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh">知识共享 署名-非商业性使用
            4.0 国际 许可协议</a>进行许可。转载、公开或以任何形式复制、发行、再传播本页任何内容时，必须注明从明日方舟一图流转载，并提供版权标识、许可协议标识、免责标识和作品链接；且未经许可，不得将本站内容或由其衍生作品用于商业目的。<br>
            本项目为无偿开源项目，致力于方便明日方舟玩家。如有开发/数据分析/设计/美工经验，欢迎来开发群一叙。
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- <foot></foot> -->
  </div>
</template>

<script>
import gacha_potentialJson from "static/json/gacha_potential.json";  //常驻活动和主线数据
import gacha_actReJson from "static/json/gacha_actRe.json";     //复刻活动数据
import gacha_storePacksJson from "static/json/gacha_storePacks.json";  //商店礼包数据
import gacha_actRewardJson from "static/json/gacha_actReward.json";  //活动奖励数据
import gacha_honeyCakeJson from "static/json/gacha_honeyCake.json";  //其他奖励数据
import "~/assets/css/gacha.css";
import toolApi from "@/api/tool";
import cookie from "js-cookie";
// import * as echarts from "echarts";
import echarts from "static/js/echarts.min.js"

export default {
  layout: "defaultGacha",
  head: {
    title: "一图流攒抽计算器 yituliu.site",
    meta: [
      {charset: "utf-8"},
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


    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
  },

  data() {
    return {
      pageTheme: "light",
      itemList: [],
      checkBox: ["0", "1", "2", "7"],  //折叠栏绑定数组
      // checkBox: ["1","7"],
      activityPlan: [],  //活动计划
      startDate: "", //开始时间
      endDate: "2023/03/14 03:59:00", //结束时间
      start_TimeStamp: "",   //开始时间戳
      end_TimeStamp: "",     //结束时间戳
      timeSelector: "怪猎联动(3.14)",  //活动时间节点选择框的绑定对象
      gacha_potential: gacha_potentialJson, //常驻活动和主线
      gacha_potentialList: [],
      gacha_actRe: gacha_actReJson, //复刻活动
      gacha_actReList: [],
      gacha_storePacks: gacha_storePacksJson, //商店礼包
      gacha_storePacksList: [],
      gacha_store258: [], //黄票兑换38抽
      gacha_store258List: [],
      gacha_actReward: gacha_actRewardJson,  //活动奖励数据
      gacha_honeyCake: gacha_honeyCakeJson, //其他奖励数据

      originium: 0, //源石
      orundum: 0, //合成玉
      permit: 0, //寻访
      permit10: 0, //十连寻访
      sellsCount: 0, //总氪金总和
      gachaTimes_total: 0, //总抽卡次数

      
      gachaTimesInfo:{},   //攒抽计算的各种结果 
      
      paradox:0,
      remainingDays: 0, //剩余天数
      remainingWeekBattle: 0, //剩余周数
      remainingMonths: 0, //剩余月数
      remainingCheckinTimes: 0, // 剩余签到次数

      originium_648: 0, //普通源石648
      originium_328: 0, //普通源石328
      originium_198: 0, //普通源石198
      originium_98: 0, //普通源石98
      originium_30: 0, //普通源石30
      originium_6: 0, //普通源石6
      poolCountDown: 0, //限定池每日送抽倒计时
      poolCountDownFlag_permit: true, //限定池每日送抽倒计时
      poolCountDownFlag_orundum: true, //限定池每日送抽倒计时

      dailyRewards: 100, //每日奖励
      weeklyTaskRewards: 500, //周常奖励
      EXTERMINATIONRewards: 1800, //剿灭奖励
      originiumFlag: true, //是否源石抽卡
      EXTERMINATIONFlag: true, //是否完成剿灭
      weeklyTaskFlag: true, //是否完成周常
      certificateStoreFlag: false, //是否兑换绿票商店
      AnnihilationStageValue: true,
      weeklyTaskValue: true,   //每周任务的合成玉数量
      certificateStoreValue: 0,  //绿票商店抽数
      skinNumValue: 0,   //皮肤消耗源石数量
      customValue: 0, //自定义值
      cookieInit: 0,   //cookie是否获取标志
      pieData: [],

    };
  },
  created() {
    this.getDate();
    // this.getInterval();
    // this.getEveryreWard();
    // this.getPoolCountDown();
    this.checkEndDate();

  },
  mounted() {
    this.pieChart(this.pieData);
    // this.openNotification();
  },
  methods: {

    updateVisits() {
      toolApi.updateVisits("gacha").then((response) => {
      });
    },

    //公告通知
    openNotification() {
      this.$notify({
        title: '侠客警告',
        dangerouslyUseHTMLString: true,
        message: '<strong> 限定池还有'+ this.poolCountDown + '天,结束</strong>',
        //
        duration: 12000
      });
    },

    // 选择攒计算的时间节点
    checkEndDate() {
      // this.cookieInit=true;
      if (this.timeSelector === '怪猎联动(3.14)') {
        this.endDate = '2023/03/14 03:59:00';
        this.activityPlan = [-1, 1, 3];    //非日常奖励根据json内每条游戏福利编号判断
        this.poolCountDownFlag_permit = false;  //是否要计算限定池倒计时（主要用于计算每日赠送合成玉和单抽）
        this.poolCountDownFlag_orundum = false;  //是否要计算限定池倒计时（主要用于计算每日赠送合成玉和单抽）
      } else if (this.timeSelector === '4周年(5.15)') {
        this.endDate = "2023/05/15 03:59:00";
        this.activityPlan = [-2, 2, 3, 4];
        this.poolCountDownFlag_permit = false;
        this.poolCountDownFlag_orundum = true;  //是否要计算限定池倒计时（主要用于计算每日赠送合成玉和单抽）
      }

      this.getInterval();
      this.getEveryreWard();
      this.getPoolCountDown();
      this.setGacha_store258();
      this.compute();

    },

    getFixed(num, acc) {
      acc = (typeof acc !== 'undefined') ? acc : 2;
      return parseFloat(num).toFixed(acc);
    },

    //获取雪碧图
    getSpriteImg(packName, index) {
      if (index === 0) return "bg-" + packName + " sprite_gacha";
      return "bg-" + packName;
    },

    //获取当天日期
    getDate() {
      var date = new Date();
      var y = date.getFullYear(); //年
      var m = (date.getMonth() + 1).toString().padStart(2, "0"); //月
      var d = date.getDate().toString().padStart(2, "0"); //日
      var h = date.getHours().toString().padStart(2, "0"); //时
      var mm = date.getMinutes().toString().padStart(2, "0"); //分
      var s = date.getSeconds().toString().padStart(2, "0"); //秒
      this.startDate = `${y}/${m}/${d} ${h}:${mm}:${s}`;
    },

    //获取限定池和红包倒计时
    getPoolCountDown() {
      var num = parseInt((this.end_TimeStamp - this.start_TimeStamp) / 86400000); //计算距离限定池还有多少天
      if (num < 14) {  //少于14天扣除每日赠送抽卡资源
        this.poolCountDown = 14 - num;
      }
      console.log("限定池还有" + this.poolCountDown + "天,结束");
    },

    //获取还有多少天
    getInterval() {
      console.log("今天是", this.startDate);
      this.remainingWeekBattle = 0;  //剩余剿灭次数
      this.remainingCheckinTimes = 0;  //剩余签到次数

      this.start_TimeStamp = Date.parse(new Date(this.startDate)); //今日日期的时间戳
      this.end_TimeStamp = Date.parse(this.endDate); //结束日期的时间戳
      var days = parseInt((this.end_TimeStamp - this.start_TimeStamp) / 86400000);  //计算距离活动还有多少天

      this.remainingMonths = new Date(this.endDate).getMonth() - new Date(this.startDate).getMonth() + 1;  //剩余月数
      for (let i = 1; i < days + 1; i++) {
        var date = new Date(this.start_TimeStamp + 86400000 * i);
        if (date.getDay() === 1) {  //判断接下来还有多少个星期一
          this.remainingWeekBattle++;
        }
        if (date.getDate() === 17) {  //判断接下来还有17号，17号签到有抽卡券
          this.remainingCheckinTimes++;
        }
      }
      this.remainingDays = days;
      console.log("距离活动还有：", this.remainingMonths + "月，", this.remainingWeekBattle + "周，", this.remainingDays + "天");
    },

    // 设置258黄票商店兑换抽卡券
    setGacha_store258() {
      var m = new Date().getMonth() + 1; //月
      this.gacha_store258 = [];
      for (var i = 0; i < this.remainingMonths; i++) {
        this.gacha_store258.push({
          "packName": m + "月黄票换抽",
          "packPrice": "0",
          "gachaOriginium": "0",
          "gachaOrundum": "0",
          "gachaPermit": "8",
          "gachaPermit10": "3",
          "price": "0.00",
          "packType": "store"
        });
        m++;
        m = (m - 1) % 12 + 1;
      }
    },

    //  计算日常奖励
    getEveryreWard() {
      this.dailyRewards = 100 * parseInt(this.remainingDays);
      this.weeklyTaskRewards = 500 * parseInt(this.remainingWeekBattle);
      this.EXTERMINATIONRewards = 1800 * parseInt(this.remainingWeekBattle);
    },

    compute() {
      //初始化各种对象
      this.valueInit();

      //判断是否用源石抽卡
      var flag_originium = 0;
      if (this.originiumFlag) {
        flag_originium = 1;
      }

      //判断是否完成周常日常
      this.weeklyTaskValue = 1;
      if (this.weeklyTaskFlag) {
        this.weeklyTaskValue = 0;
      }

      //判断是否完成剿灭
      this.AnnihilationStageValue = 1;
      if (this.EXTERMINATIONFlag) {
        this.AnnihilationStageValue = 0;
      }

      this.certificateStoreValue = 0;

      if (typeof this.certificateStoreFlag === 'string') {
        if (this.certificateStoreFlag === "false") this.certificateStoreFlag = false;
        if (this.certificateStoreFlag === "true") this.certificateStoreFlag = true;
      }

      if (this.certificateStoreFlag) {
        this.certificateStoreValue = 1;
      }

      
      //库存计算（共计）
      this.originium += parseInt(this.gachaTimesInfo.originium_exist);
      
      this.orundum += parseInt(this.gachaTimesInfo.orundum_exist) + parseInt(this.customValue);
      this.permit += parseInt(this.gachaTimesInfo.permit_exist);
      this.permit10 += parseInt(this.gachaTimesInfo.permit10_exist);
      // console.log(this.permit += this.permit + parseInt(this.gachaTimesInfo.permit_exist));
      //库存抽卡次数（单项）

      this.gachaTimesInfo.gachaTimes_exist =
        parseInt(this.gachaTimesInfo.originium_exist) * 0.3 * parseInt(flag_originium) +
        parseInt(this.gachaTimesInfo.orundum_exist) / 600 +
        parseInt(this.gachaTimesInfo.permit_exist) +
        parseInt(this.gachaTimesInfo.permit10_exist) * 10 +
        parseInt(this.customValue) / 600;

      //主线和常驻活动计算（共计）
      for (let i = 0; i < this.gacha_potentialList.length; i++) {
        this.originium += parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaOriginium);
        this.orundum += parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaOrundum);

        this.gachaTimesInfo.originium_potential += parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaOriginium);
        this.gachaTimesInfo.orundum_potential += parseInt(this.gacha_potential[this.gacha_potentialList[i]].gachaOrundum);

      }

      //悖论模拟
      this.orundum += parseInt(this.paradox) * 200;

      this.gachaTimesInfo.orundum_potential += parseInt(this.paradox) * 200;

      //主线和常驻活动抽卡次数（单项）
      this.gachaTimesInfo.gachaTimes_potential =
        parseInt(this.gachaTimesInfo.originium_potential) * 0.3 * parseInt(flag_originium) +
        parseInt(this.gachaTimesInfo.orundum_potential) / 600;

      //氪金项目计算（共计）
      for (let i = 0; i < this.gacha_storePacksList.length; i++) {
        this.permit += parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].gachaPermit);
        this.permit10 += parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].gachaPermit10);
        //月卡单独判断
        if ("月卡" === this.gacha_storePacks[this.gacha_storePacksList[i]].packName) {
          console.log("买的月卡个数", Math.ceil(this.remainingDays / 30));
          this.orundum += parseInt(this.remainingDays) * 200;
          this.originium += Math.ceil(this.remainingDays / 30) * 6;
          this.sellsCount += Math.ceil(this.remainingDays / 30) * 30;
          this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOrundum =
            parseInt(this.remainingDays) * 200;
          this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOriginium =
            Math.ceil(this.remainingDays / 30) * 6;
        } else {
          this.originium += parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOriginium);
          this.orundum += parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOrundum);
          this.sellsCount += parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].packPrice);
        }

        this.gachaTimesInfo.permit_gacha += parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].gachaPermit);
        this.gachaTimesInfo.permit10_gacha += parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].gachaPermit10);
        //月卡单独判断
        if ("月卡" === this.gacha_storePacks[this.gacha_storePacksList[i]].packName) {
          this.gachaTimesInfo.orundum_gacha += parseInt(this.remainingDays) * 200;
          this.gachaTimesInfo.originium_gacha += Math.ceil(this.remainingDays / 30) * 6;
        } else {
          this.gachaTimesInfo.orundum_gacha += parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOrundum);
          this.gachaTimesInfo.originium_gacha += parseInt(this.gacha_storePacks[this.gacha_storePacksList[i]].gachaOriginium);
        }
      }

      //普通648
      this.originium +=
        parseInt(this.originium_648) * 185 +
        parseInt(this.originium_328) * 90 +
        parseInt(this.originium_198) * 50 +
        parseInt(this.originium_98) * 24 +
        parseInt(this.originium_30) * 7 +
        parseInt(this.originium_6);

      
      this.gachaTimesInfo.originium_gacha +=
        parseInt(this.originium_648) * 185 +
        parseInt(this.originium_328) * 90 +
        parseInt(this.originium_198) * 50 +
        parseInt(this.originium_98) * 24 +
        parseInt(this.originium_30) * 7 +
        parseInt(this.originium_6);
        
      //氪金项目抽卡次数（单项）
      this.gachaTimesInfo.gachaTimes_gacha =
        parseInt(this.gachaTimesInfo.originium_gacha) * 0.3 * parseInt(flag_originium) +
        parseInt(this.gachaTimesInfo.orundum_gacha) / 600 +
        parseInt(this.gachaTimesInfo.permit_gacha) +
        parseInt(this.gachaTimesInfo.permit10_gacha) * 10;

      //日常部分计算(总)
      this.orundum +=
        parseInt(this.dailyRewards) +
        parseInt(this.remainingMonths - this.certificateStoreValue) * 600 +
        parseInt(this.weeklyTaskRewards) +
        parseInt(this.EXTERMINATIONRewards);

      this.permit +=
        parseInt(this.remainingMonths - this.certificateStoreValue) * 4 +
        parseInt(this.remainingCheckinTimes);

      //黄票商店38抽计算
      for (let i = 0; i < this.gacha_store258List.length; i++) {
        this.permit += parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaPermit);
        this.permit10 += parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaPermit10);
        this.gachaTimesInfo.permit_daily += parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaPermit);
        this.gachaTimesInfo.permit10_daily += parseInt(this.gacha_store258[this.gacha_store258List[i]].gachaPermit10);
      }

      //日常资源抽卡次数(单项)
      this.gachaTimesInfo.orundum_daily +=
        parseInt(this.dailyRewards) +
        parseInt(this.weeklyTaskRewards) +
        parseInt(this.EXTERMINATIONRewards) +
        parseInt(this.weeklyTaskValue) * 500 +
        parseInt(this.AnnihilationStageValue) * 1800 +
        parseInt(this.remainingMonths - this.certificateStoreValue) * 600;

      this.gachaTimesInfo.permit_daily +=
        parseInt(this.remainingMonths - this.certificateStoreValue) * 4 +
        parseInt(this.remainingCheckinTimes);

      this.gachaTimesInfo.gachaTimes_daily =
        parseInt(this.gachaTimesInfo.originium_daily) * 0.3 * parseInt(flag_originium) +
        parseInt(this.gachaTimesInfo.orundum_daily) / 600 +
        parseInt(this.gachaTimesInfo.permit_daily) +
        parseInt(this.gachaTimesInfo.permit10_daily) * 10;

      //活动抽卡计算（共计）
          // console.log('---------活动资源计算如下：-----------');
      for (let i = 0; i < this.gacha_actReward.length; i++) {
        if (this.activityPlan.includes(this.gacha_actReward[i].plans)) {
          // console.log("源石+",this.gacha_actReward[i].gachaOriginium,",合成玉+",this.gacha_actReward[i].gachaOrundum,
          // ",单抽+",this.gacha_actReward[i].gachaPermit,'---by',this.gacha_honeyCake[i].packName,);
          this.originium += parseInt(this.gacha_actReward[i].gachaOriginium);
          this.orundum += parseInt(this.gacha_actReward[i].gachaOrundum);
          this.permit += parseInt(this.gacha_actReward[i].gachaPermit);
          this.permit10 += parseInt(this.gacha_actReward[i].gachaPermit10);

          this.gachaTimesInfo.originium_act += parseInt(this.gacha_actReward[i].gachaOriginium);
          this.gachaTimesInfo.orundum_act += parseInt(this.gacha_actReward[i].gachaOrundum);
          this.gachaTimesInfo.permit_act += parseInt(this.gacha_actReward[i].gachaPermit);
          this.gachaTimesInfo.permit10_act += parseInt(this.gacha_actReward[i].gachaPermit10);
        }
      }

      for (let i = 0; i < this.gacha_actReList.length; i++) {
        this.originium += parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaOriginium);
        this.orundum += parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaOrundum);
        this.permit += parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaPermit);
        this.permit10 += parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaPermit10);

        this.gachaTimesInfo.originium_act += parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaOriginium);
        this.gachaTimesInfo.orundum_act += parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaOrundum);
        this.gachaTimesInfo.permit_act += parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaPermit);
        this.gachaTimesInfo.permit10_act += parseInt(this.gacha_actRe[this.gacha_actReList[i]].gachaPermit10);
      }

      //活动抽卡次数（单项）
      this.gachaTimesInfo.gachaTimes_activity =
        parseInt(this.gachaTimesInfo.originium_act) * 0.3 * parseInt(flag_originium) +
        parseInt(this.gachaTimesInfo.orundum_act) / 600 +
        parseInt(this.gachaTimesInfo.permit_act) +
        parseInt(this.gachaTimesInfo.permit10_act) * 10;

      //其他抽卡计算
      // console.log('---------其他资源计算如下：-----------');
      for (let i = 0; i < this.gacha_honeyCake.length; i++) {
        if (this.activityPlan.includes(this.gacha_honeyCake[i].plans)) {
          //  console.log("源石+",this.gacha_honeyCake[i].gachaOriginium,",合成玉+",this.gacha_honeyCake[i].gachaOrundum,
          // ",单抽+",this.gacha_honeyCake[i].gachaPermit,",十连+",this.gacha_honeyCake[i].gachaPermit10,'---by',this.gacha_honeyCake[i].packName,);
          this.originium += parseInt(this.gacha_honeyCake[i].gachaOriginium);
          this.orundum += parseInt(this.gacha_honeyCake[i].gachaOrundum);
          this.permit += parseInt(this.gacha_honeyCake[i].gachaPermit);
          this.permit10 += parseInt(this.gacha_honeyCake[i].gachaPermit10);

          this.gachaTimesInfo.originium_other += parseInt(this.gacha_honeyCake[i].gachaOriginium);
          this.gachaTimesInfo.orundum_other += parseInt(this.gacha_honeyCake[i].gachaOrundum);
          this.gachaTimesInfo.permit_other += parseInt(this.gacha_honeyCake[i].gachaPermit);
          this.gachaTimesInfo.permit10_other += parseInt(this.gacha_honeyCake[i].gachaPermit10);
        }
      }

      //自动扣除部分{
      //合成玉=—周常—剿灭—幸运墙
      this.orundum +=
        parseInt(this.weeklyTaskValue) * 500 +
        parseInt(this.AnnihilationStageValue) * 1800;

      this.gachaTimesInfo.orundum_other +=
        parseInt(this.weeklyTaskValue) * 500 +
        parseInt(this.AnnihilationStageValue) * 1800;

      //减去红包墙/矿区已经赠送过的合成玉
      if (this.poolCountDownFlag_orundum) {
        this.orundum = parseInt(this.orundum) - parseInt(this.poolCountDown) * 600;
        this.gachaTimesInfo.orundum_other = parseInt(this.gachaTimesInfo.orundum_other) - parseInt(this.poolCountDown) * 600;
      }

      //减去限定池已经赠送过的单抽
      if (this.poolCountDownFlag_permit) {
        this.gachaTimesInfo.permit_other = parseInt(this.gachaTimesInfo.permit_other) - parseInt(this.poolCountDown);
        this.permit = parseInt(this.permit) - parseInt(this.poolCountDown);
      }

      //其他抽卡次数
      this.gachaTimesInfo.gachaTimes_other =
        parseInt(this.gachaTimesInfo.originium_other) * 0.3 * parseInt(flag_originium) +
        parseInt(this.gachaTimesInfo.orundum_other) / 600 +
        parseInt(this.gachaTimesInfo.permit_other) +
        parseInt(this.gachaTimesInfo.permit10_other) * 10


      if (parseInt(this.originium - parseInt(this.skinNumValue) * 18) < 0) {
        this.$message.error("你的源石不足");
      }

      this.originium = parseInt(this.originium) - parseInt(this.skinNumValue) * 18;

      this.originium = parseInt(this.originium) * parseInt(flag_originium);


      this.sellsCount +=
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
        (this.gachaTimesInfo.originium_exist +
          this.gachaTimesInfo.originium_potential +
          this.gachaTimesInfo.originium_gacha +
          this.gachaTimesInfo.originium_daily +
          this.gachaTimesInfo.originium_act +
          this.gachaTimesInfo.originium_other -
          parseInt(this.skinNumValue) * 18) * 0.3 * parseInt(flag_originium);


      this.pieData = [];
      let chartFan = {};
      if (this.gachaTimesInfo.gachaTimes_exist > 0) {
        chartFan.value = parseInt(this.gachaTimesInfo.gachaTimes_exist);
        chartFan.name = "现有";
        this.pieData.push(chartFan);
      }
      if (this.gachaTimesInfo.gachaTimes_potential > 0) {
        chartFan = {};
        chartFan.value = parseInt(this.gachaTimesInfo.gachaTimes_potential);
        chartFan.name = "潜在";
        this.pieData.push(chartFan);
      }
      if (this.gachaTimesInfo.gachaTimes_daily > 0) {
        chartFan = {};
        chartFan.value = parseInt(this.gachaTimesInfo.gachaTimes_daily);
        chartFan.name = "日常";
        this.pieData.push(chartFan);
      }
      if (this.gachaTimesInfo.gachaTimes_gacha > 0) {
        chartFan = {};
        chartFan.value = parseInt(this.gachaTimesInfo.gachaTimes_gacha);
        chartFan.name = "氪金";
        this.pieData.push(chartFan);
      }
      if (this.gachaTimesInfo.gachaTimes_activity > 0) {
        chartFan = {};
        chartFan.value = parseInt(this.gachaTimesInfo.gachaTimes_activity);
        chartFan.name = "活动";
        this.pieData.push(chartFan);
      }
      if (this.gachaTimesInfo.gachaTimes_other > 0) {
        chartFan = {};
        chartFan.value = parseInt(this.gachaTimesInfo.gachaTimes_other);
        chartFan.name = "其它";
        this.pieData.push(chartFan);
      }
      
      console.log(this.gachaTimesInfo);

      if (this.cookieInit > 1) {
        this.pieChart(this.pieData);
      }
    },

    valueInit() {

     
      if (this.cookieInit === 0) {
        this.gachaTimesInfo.originium_exist = cookie.get("originium_exist");
        this.gachaTimesInfo.orundum_exist = cookie.get("orundum_exist");
        this.gachaTimesInfo.permit_exist = cookie.get("permit_exist");
        this.gachaTimesInfo.permit10_exist = cookie.get("permit10_exist");
        this.paradox = cookie.get("paradox");
        this.certificateStoreFlag = cookie.get("certificateStoreFlag");
      } 

      console.log(this.gachaTimesInfo.originium_exist ===undefined||this.gachaTimesInfo.originium_exist == "undefined");

      if(this.gachaTimesInfo.originium_exist ===undefined||this.gachaTimesInfo.originium_exist == "undefined") this.gachaTimesInfo.originium_exist = 0;
      if(this.gachaTimesInfo.orundum_exist ===undefined||this.gachaTimesInfo.orundum_exist == "undefined") this.gachaTimesInfo.orundum_exist = 0;
      if(this.gachaTimesInfo.permit_exist ===undefined||this.gachaTimesInfo.permit_exist == "undefined") this.gachaTimesInfo.permit_exist = 0;
      if(this.gachaTimesInfo.permit10_exist ===undefined||this.gachaTimesInfo.permit10_exist == "undefined") this.gachaTimesInfo.permit10_exist = 0;
      if(this.paradox ===undefined||this.paradox == "undefined") this.paradox = 0;
      if(this.certificateStoreFlag ===undefined||this.certificateStoreFlag == "undefined") this.certificateStoreFlag = true;

      
      cookie.set("originium_exist", this.gachaTimesInfo.originium_exist, {expires: 30});
      cookie.set("orundum_exist", this.gachaTimesInfo.orundum_exist, {expires: 30});
      cookie.set("permit_exist", this.gachaTimesInfo.permit_exist, {expires: 30});
      cookie.set("permit10_exist", this.gachaTimesInfo.permit10_exist, {expires: 30});
      cookie.set("paradox", this.paradox, {expires: 30});
      cookie.set("certificateStoreFlag", this.certificateStoreFlag, {expires: 30});

      
      this.cookieInit++;

      if (this.originium_648 === "") this.originium_648 = 0;
      if (this.originium_328 === "") this.originium_328 = 0;
      if (this.originium_198 === "") this.originium_198 = 0;
      if (this.originium_98 === "") this.originium_98 = 0;
      if (this.originium_30 === "") this.originium_30 = 0;
      if (this.originium_6 === "") this.originium_6 = 0;
      if (this.customValue === "") this.customValue = 0;

      this.paradox = parseInt(this.paradox);
      this.originium_648 = parseInt(this.originium_648);
      this.originium_328 = parseInt(this.originium_328);
      this.originium_198 = parseInt(this.originium_198);
      this.originium_98 = parseInt(this.originium_98);
      this.originium_30 = parseInt(this.originium_30);
      this.originium_6 = parseInt(this.originium_6);
      this.customValue = parseInt(this.customValue);

      this.gachaTimesInfo.originium_exist = parseInt(this.gachaTimesInfo.originium_exist);
      this.gachaTimesInfo.orundum_exist = parseInt(this.gachaTimesInfo.orundum_exist);
      this.gachaTimesInfo.permit_exist = parseInt(this.gachaTimesInfo.permit_exist);
      this.gachaTimesInfo.permit10_exist = parseInt(this.gachaTimesInfo.permit10_exist);

      this.originium = 0;
      this.orundum = 0;
      this.permit = 0;
      this.permit10 = 0;
      this.sellsCount = 0;
       
      this.gachaTimesInfo.originium_potential = 0;
      this.gachaTimesInfo.orundum_potential = 0;
      this.gachaTimesInfo.permit_potential = 0;
      this.gachaTimesInfo.permit10_potential = 0;

      this.gachaTimesInfo.originium_daily = 0;
      this.gachaTimesInfo.orundum_daily = 0;
      this.gachaTimesInfo.permit_daily = 0;
      this.gachaTimesInfo.permit10_daily = 0;

      this.gachaTimesInfo.originium_gacha = 0;
      this.gachaTimesInfo.orundum_gacha = 0;
      this.gachaTimesInfo.permit_gacha = 0;
      this.gachaTimesInfo.permit10_gacha = 0;

      this.gachaTimesInfo.originium_act = 0;
      this.gachaTimesInfo.orundum_act = 0;
      this.gachaTimesInfo.permit_act = 0;
      this.gachaTimesInfo.permit10_act = 0;

      this.gachaTimesInfo.originium_other = 0;
      this.gachaTimesInfo.orundum_other = 0;
      this.gachaTimesInfo.permit_other = 0;
      this.gachaTimesInfo.permit10_other = 0;
    },

    getChapterWidth(index) {
      if (index % 2 === 0) return "width:200px;";
      else return "width:60px;";
    },

    getPprLabel(ppr) {
      if (ppr < 7.5) return "gacha_packPpr_t1"
      if (ppr < 11.7) return "gacha_packPpr_t2"
      return "gacha_packPpr_t3"
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
      let chartDom = document.getElementById("gacha_total_pie");
      let myChart = echarts.init(chartDom);

      let option = {
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
                  textStyle: {color: "#000000", fontSize: "16"},
                  formatter: function (val) {
                    //让series 中的文字进行换行
                    return val.name.split("-").join("\n");
                  },
                },
                labelLine: {
                  show: true,
                  lineStyle: {color: "#000000"},
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
      // console.log(val);
    },
  },
};
</script>


<style scoped>

.foot_unit {
  font-size: 16px;
}

.foot_unit_title {
  margin: 4px 0px;
}

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
