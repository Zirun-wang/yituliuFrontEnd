<template>
  <div id="riic">
    <div id="riic_controlPanel">

      <div class="riic_building">
        <div class="riic_building_title">控制面板</div>
        <div class="riic_building_parameter">
          <div class="parameter_text">作业名称</div>
          <el-input class="parameter_inputbox" size="small" placeholder="究极资本家v1.0" v-model="title"></el-input>
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">描述(可选)</div>
          <el-input class="parameter_inputbox" size="small" placeholder="适合全干员，压榨每一个工具人！" v-model="descriptionH1"></el-input>
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">作者(可选)</div>
          <el-input class="parameter_inputbox" size="small" placeholder="yituliu" v-model="author"></el-input>
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">基建模式</div>
          <el-radio-group size="small" v-model="buildingType">
            <el-radio-button label="243" ></el-radio-button>
            <el-radio-button label="153" ></el-radio-button>
            <el-radio-button label="333" disabled></el-radio-button>
            <el-radio-button label="252" disabled></el-radio-button>
          </el-radio-group>
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">换班次数</div>
          <el-radio-group size="small" v-model="planTimes">
            <el-radio-button label="2班" ></el-radio-button>
            <el-radio-button label="3班" ></el-radio-button>
            <!-- <el-radio-button label="4班" ></el-radio-button> -->
          </el-radio-group>
        </div>
      </div>
      <div class="riic_building">
        <div class="riic_building_title">排班方案</div>

        <div class="riic_building_parameter">
          <div class="parameter_text" style="width: 108px;">名称/起止时间</div>
          <el-input size="small" class="parameter_inputbox" placeholder="主力组A" style="width: 100px" v-model="name[0]"></el-input>
          <el-input size="small" class="parameter_inputbox" placeholder="20:00" style="width: 72px" v-model="period_plan0[0]"></el-input>
          <el-input size="small" class="parameter_inputbox" placeholder="23:59" style="width: 72px" v-model="period_plan0[1]"></el-input>
        </div>
        <!-- <div class="riic_building_parameter">
          <div class="parameter_text" style="width: 108px;">名称/起止时间</div>
          <el-input size="small" class="parameter_inputbox" placeholder="主力组A" style="width: 100px"></el-input>
          <el-input size="small" class="parameter_inputbox" placeholder="00:00" style="width: 72px"></el-input>
          <el-input size="small" class="parameter_inputbox" placeholder="03:00" style="width: 72px"></el-input>
        </div> -->
        <div class="riic_building_parameter">
          <div class="parameter_text" style="width: 108px;">名称/起止时间</div>
          <el-input size="small" class="parameter_inputbox" placeholder="主力组B" style="width: 100px" v-model="name[1]"></el-input>
          <el-input size="small" class="parameter_inputbox" placeholder="03:00" style="width: 72px" v-model="period_plan1[0]"></el-input>
          <el-input size="small" class="parameter_inputbox" placeholder="10:00" style="width: 72px" v-model="period_plan1[1]"></el-input>
        </div>
        <div class="riic_building_parameter" v-show="'3班'===planTimes">
          <div class="parameter_text" style="width: 108px;">名称/起止时间</div>
          <el-input size="small" class="parameter_inputbox" placeholder="主力组C" style="width: 100px" v-model="name[2]"></el-input>
          <el-input size="small" class="parameter_inputbox" placeholder="10:00" style="width: 72px" v-model="period_plan2[0]"></el-input>
          <el-input size="small" class="parameter_inputbox" placeholder="20:00" style="width: 72px" v-model="period_plan2[1]"></el-input>
        </div>
        <div class="riic_building_parameter">
          *跨天需写成 [22:00][06:00](示例)
        </div>

        <el-button size="medium" type="primary" round style="margin: 8px 0px 0px 24px" @click="maaBuildingJsonCreated()" >
          生成
        </el-button>
        <a :href="exportUrl">
          <el-button size="medium" type="primary" round style="margin: 8px 0px 0px 24px">
            导出
          </el-button>
        </a>
      </div>
    </div>
    <el-divider></el-divider>
    <div id="riic_workerSets">
      <div class="riic_workerSet">
        <div class="riic_building building_uni">
          <div class="riic_building_title">班次基本信息</div>
          <div class="riic_building_parameter">
            <div class="parameter_text">班次名称</div>
            <el-input size="small" class="parameter_inputbox" placeholder="例如：主力组A" v-model="name[0]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">描述</div>
            <el-input size="small" class="parameter_inputbox" placeholder="可选" v-model="descriptionH2[0]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">无人机</div>
            <el-switch active-color="#13ce66" inactive-color="#c0c4cc" v-model="switch_drones_enable[0]"></el-switch>
            <el-radio-group size="small" v-model="radio_drones[0]">
              <el-radio-button label="贸易站"></el-radio-button>
              <el-radio-button label="制造站"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text" style="font-size: 15px">目标房间编号</div>
            <el-radio-group size="small" v-model="radio_drones_index[0]">
              <el-radio-button label="1"></el-radio-button>
              <el-radio-button label="2"></el-radio-button>
              <el-radio-button label="3"></el-radio-button>
              <el-radio-button label="4"></el-radio-button>
              <el-radio-button label="5"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter" >
            <div class="parameter_text" style="font-size: 15px">使用顺序</div>
            <el-radio-group size="small" v-model="input_drones_order[0]">
              <el-radio-button label="换班前"></el-radio-button>
              <el-radio-button label="换班后"></el-radio-button>
            </el-radio-group>
            <!-- <el-switch active-text="换班前"  inactive-text="换班后" active-color="#13ce66" inactive-color="#1373ce" v-model="input_drones_order[0]"></el-switch> -->
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">菲亚梅塔</div>
            <el-switch active-color="#13ce66" inactive-color="#c0c4cc" v-model="switch_Fiammetta_enable[0]"></el-switch>
            <el-input size="small" style="width: 128px" class="parameter_inputbox" placeholder="例如：巫恋" v-model="Fiammetta[0]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text" style="font-size: 15px">使用顺序</div>
            <el-radio-group size="small" v-model="input_Fiammetta_order[0]">
              <el-radio-button label="换班前"></el-radio-button>
              <el-radio-button label="换班后"></el-radio-button>
            </el-radio-group>
            <!-- <el-switch active-text="换班前"  inactive-text="换班后" active-color="#13ce66" inactive-color="#1373ce" v-model="input_Fiammetta_order[0]"></el-switch> -->
          </div>
        </div>
        <div class="riic_building building_cortrolCenter">
          <div class="riic_building_title">控制中枢</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="control_plan0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="control_plan0[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="control_plan0[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="4" v-model="control_plan0[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="5" v-model="control_plan0[4]"></el-input>
          </div>
        </div>
        <div class="riic_building building_trade">
          <div class="riic_building_title">贸易站1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="trading_plan0_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="trading_plan0_0[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="trading_plan0_0[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_trading_plan0[0]">
              <el-radio-button label="龙门币"></el-radio-button>
              <el-radio-button label="合成玉"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_trading_plan0_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text">
              <div class="parameter_text" style="margin-left: 20px">
                自动填充
              </div>
            </div>
            <el-switch v-model="switch_trading_plan0_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_trade" v-show="'243' === buildingType">
          <div class="riic_building_title">贸易站2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="trading_plan0_1[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="trading_plan0_1[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="trading_plan0_1[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_trading_plan0[1]">
              <el-radio-button label="龙门币"></el-radio-button>
              <el-radio-button label="合成玉"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_trading_plan0_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_trading_plan0_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan0_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan0_0[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan0_0[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan0[0]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan0_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan0_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan0_1[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan0_1[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan0_1[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan0[1]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan0_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan0_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站3</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan0_2[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan0_2[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan0_2[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan0[2]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan0_2[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan0_2[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站4</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan0_3[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan0_3[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan0_3[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan0[3]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan0_3[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan0_3[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div
          class="riic_building building_factory"
          v-show="'153' === buildingType"
        >
          <div class="riic_building_title">制造站5</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan0_4[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan0_4[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan0_4[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan0[4]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan0_4[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan0_4[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_powerPlant">
          <div class="riic_building_title">发电站1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="power_plan0_0[0]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_power_plan0_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_power_plan0_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_powerPlant">
          <div class="riic_building_title">发电站2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="power_plan0_0[1]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_power_plan0_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_power_plan0_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_powerPlant">
          <div class="riic_building_title">发电站3</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="power_plan0_0[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_power_plan0_2[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_power_plan0_2[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_meetingRoom">
          <div class="riic_building_title">会客室</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="meeting_plan0_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="meeting_plan0_0[1]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_meeting_plan0_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_meeting_plan0_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_hr">
          <div class="riic_building_title">办公室</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="hire_plan0_0[0]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_hire_plan0_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_hire_plan0_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_0[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_0[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_0[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_0[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan0_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan0_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_1[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_1[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_1[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_1[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_1[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan0_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan0_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍3</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_2[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_2[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_2[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_2[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_2[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan0_2[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan0_2[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍4</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_3[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_3[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_3[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_3[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan0_3[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan0_3[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan0_3[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
      </div>
      <div class="riic_workerSet">
         <div class="riic_building building_uni">
          <div class="riic_building_title">班次基本信息</div>
          <div class="riic_building_parameter">
            <div class="parameter_text">班次名称</div>
            <el-input size="small" class="parameter_inputbox" placeholder="例如：主力组A" v-model="name[1]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">描述</div>
            <el-input size="small" class="parameter_inputbox" placeholder="可选" v-model="descriptionH2[1]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">无人机</div>
            <el-switch active-color="#13ce66" inactive-color="#c0c4cc" v-model="switch_drones_enable[1]"></el-switch>
            <el-radio-group size="small" v-model="radio_drones[1]">
              <el-radio-button label="贸易站"></el-radio-button>
              <el-radio-button label="制造站"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text" style="font-size: 15px">目标房间编号</div>
            <el-radio-group size="small" v-model="radio_drones_index[1]">
              <el-radio-button label="1"></el-radio-button>
              <el-radio-button label="2"></el-radio-button>
              <el-radio-button label="3"></el-radio-button>
              <el-radio-button label="4"></el-radio-button>
              <el-radio-button label="5"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text" style="font-size: 15px">使用顺序</div>
            <el-radio-group size="small" v-model="input_drones_order[1]">
              <el-radio-button label="换班前"></el-radio-button>
              <el-radio-button label="换班后"></el-radio-button>
            </el-radio-group>
            <!-- <el-switch active-text="换班后"  inactive-text="换班前" active-color="#13ce66" inactive-color="#1373ce" v-model="input_drones_order[1]"></el-switch> -->
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">菲亚梅塔</div>
            <el-switch active-color="#13ce66" inactive-color="#c0c4cc" v-model="switch_Fiammetta_enable[1]"></el-switch>
            <el-input size="small" style="width: 128px" class="parameter_inputbox" placeholder="例如：巫恋" v-model="Fiammetta[1]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text" style="font-size: 15px">使用顺序</div>
            <el-radio-group size="small" v-model="input_Fiammetta_order[1]">
              <el-radio-button label="换班前"></el-radio-button>
              <el-radio-button label="换班后"></el-radio-button>
            </el-radio-group>
            <!-- <el-switch active-text="换班后"  inactive-text="换班前" active-color="#13ce66" inactive-color="#1373ce" v-model="input_Fiammetta_order[1]"></el-switch> -->
          </div>
        </div>
        <div class="riic_building building_cortrolCenter">
          <div class="riic_building_title">控制中枢</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="control_plan1[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="control_plan1[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="control_plan1[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="4" v-model="control_plan1[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="5" v-model="control_plan1[4]"></el-input>
          </div>
        </div>
        <div class="riic_building building_trade">
          <div class="riic_building_title">贸易站1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="trading_plan1_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="trading_plan1_0[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="trading_plan1_0[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_trading_plan1[0]">
              <el-radio-button label="龙门币"></el-radio-button>
              <el-radio-button label="合成玉"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_trading_plan1_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_trading_plan1_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_trade" v-show="'243' === buildingType">
          <div class="riic_building_title">贸易站2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="trading_plan1_1[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="trading_plan1_1[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="trading_plan1_1[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_trading_plan1[1]">
              <el-radio-button label="龙门币"></el-radio-button>
              <el-radio-button label="合成玉"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_trading_plan1_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_trading_plan1_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan1_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan1_0[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan1_0[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan1[0]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan1_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan1_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan1_1[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan1_1[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan1_1[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan1[1]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan1_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan1_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站3</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan1_2[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan1_2[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan1_2[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan1[2]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan1_2[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan1_2[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站4</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan1_3[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan1_3[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan1_3[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan1[3]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan1_3[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan1_3[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory" v-show="'153' === buildingType">
          <div class="riic_building_title">制造站5</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan1_4[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan1_4[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan1_4[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan1[4]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan1_4[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan1_4[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_powerPlant">
          <div class="riic_building_title">发电站1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="power_plan1_0[0]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_power_plan1_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_power_plan1_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_powerPlant">
          <div class="riic_building_title">发电站2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="power_plan1_0[1]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_power_plan1_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_power_plan1_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_powerPlant">
          <div class="riic_building_title">发电站3</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="power_plan1_0[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_power_plan1_2[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_power_plan1_2[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_meetingRoom">
          <div class="riic_building_title">会客室</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="meeting_plan1_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="meeting_plan1_0[1]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_meeting_plan1_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_meeting_plan1_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_hr">
          <div class="riic_building_title">办公室</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="hire_plan1_0[0]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_hire_plan1_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_hire_plan1_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_0[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_0[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_0[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_0[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan1_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan1_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_1[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_1[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_1[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_1[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_1[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan1_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan1_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍3</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_2[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_2[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_2[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_2[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_2[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan1_2[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan1_2[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍4</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_3[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_3[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_3[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_3[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan1_3[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan1_3[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan1_3[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
      </div>
      <div class="riic_workerSet" v-show="'3班'===planTimes">
         <div class="riic_building building_uni">
          <div class="riic_building_title">班次基本信息</div>
          <div class="riic_building_parameter">
            <div class="parameter_text">班次名称</div>
            <el-input size="small" class="parameter_inputbox" placeholder="例如：主力组A" v-model="name[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">描述</div>
            <el-input size="small" class="parameter_inputbox" placeholder="可选" v-model="descriptionH2[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">无人机</div>
            <el-switch active-color="#13ce66" inactive-color="#c0c4cc" v-model="switch_drones_enable[2]"></el-switch>
            <el-radio-group size="small" v-model="radio_drones[2]">
              <el-radio-button label="贸易站"></el-radio-button>
              <el-radio-button label="制造站"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text" style="font-size: 15px">目标房间编号</div>
            <el-radio-group size="small" v-model="radio_drones_index[2]">
              <el-radio-button label="1"></el-radio-button>
              <el-radio-button label="2"></el-radio-button>
              <el-radio-button label="3"></el-radio-button>
              <el-radio-button label="4"></el-radio-button>
              <el-radio-button label="5"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text" style="font-size: 15px">使用顺序</div>
            <el-radio-group size="small" v-model="input_drones_order[2]">
              <el-radio-button label="换班前"></el-radio-button>
              <el-radio-button label="换班后"></el-radio-button>
            </el-radio-group>
            <!-- <el-switch active-text="换班后"  inactive-text="换班前" active-color="#13ce66" inactive-color="#1373ce" v-model="input_drones_order[2]"></el-switch> -->
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">菲亚梅塔</div>
            <el-switch active-color="#13ce66" inactive-color="#c0c4cc" v-model="switch_Fiammetta_enable[2]"></el-switch>
            <el-input size="small" style="width: 128px" class="parameter_inputbox" placeholder="例如：巫恋" v-model="Fiammetta[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text" style="font-size: 15px">使用顺序</div>
            <el-radio-group size="small" v-model="input_Fiammetta_order[2]">
              <el-radio-button label="换班前"></el-radio-button>
              <el-radio-button label="换班后"></el-radio-button>
            </el-radio-group>
            <!-- <el-switch active-text="换班后"  inactive-text="换班前" active-color="#13ce66" inactive-color="#1373ce" v-model="input_Fiammetta_order[2]"></el-switch> -->
          </div>
        </div>
        <div class="riic_building building_cortrolCenter">
          <div class="riic_building_title">控制中枢</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="control_plan2[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="control_plan2[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="control_plan2[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="4" v-model="control_plan2[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="5" v-model="control_plan2[4]"></el-input>
          </div>
        </div>
        <div class="riic_building building_trade">
          <div class="riic_building_title">贸易站1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="trading_plan2_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="trading_plan2_0[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="trading_plan2_0[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_trading_plan2[0]">
              <el-radio-button label="龙门币"></el-radio-button>
              <el-radio-button label="合成玉"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_trading_plan2_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_trading_plan2_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div
          class="riic_building building_trade"
          v-show="'243' === buildingType"
        >
          <div class="riic_building_title">贸易站2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="trading_plan2_1[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="trading_plan2_1[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="trading_plan2_1[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_trading_plan2[1]">
              <el-radio-button label="龙门币"></el-radio-button>
              <el-radio-button label="合成玉"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_trading_plan2_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_trading_plan2_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan2_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan2_0[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan2_0[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan2[0]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan2_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan2_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan2_1[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan2_1[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan2_1[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan2[1]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan2_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan2_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站3</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan2_2[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan2_2[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan2_2[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan2[2]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan2_2[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan2_2[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory">
          <div class="riic_building_title">制造站4</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan2_3[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan2_3[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan2_3[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan2[3]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan2_3[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan2_3[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_factory" v-show="'153' === buildingType">
          <div class="riic_building_title">制造站5</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="manufacture_plan2_4[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="2" v-model="manufacture_plan2_4[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="3" v-model="manufacture_plan2_4[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">产物</div>
            <el-radio-group size="small" v-model="radio_manufacture_plan2[4]">
              <el-radio-button label="作战记录"></el-radio-button>
              <el-radio-button label="赤金"></el-radio-button>
              <el-radio-button label="源石碎片"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_manufacture_plan2_4[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_manufacture_plan2_4[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_powerPlant">
          <div class="riic_building_title">发电站1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="power_plan2_0[0]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_power_plan2_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_power_plan2_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_powerPlant">
          <div class="riic_building_title">发电站2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="power_plan2_0[1]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_power_plan2_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_power_plan2_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_powerPlant">
          <div class="riic_building_title">发电站3</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="power_plan2_0[2]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_power_plan2_2[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_power_plan2_2[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_meetingRoom">
          <div class="riic_building_title">会客室</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="meeting_plan2_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="meeting_plan2_0[1]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_meeting_plan2_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_meeting_plan2_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_hr">
          <div class="riic_building_title">办公室</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="hire_plan2_0[0]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_hire_plan2_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_hire_plan2_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍1</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_0[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_0[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_0[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_0[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_0[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan2_0[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan2_0[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍2</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_1[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_1[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_1[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_1[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_1[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan2_1[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan2_1[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍3</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_2[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_2[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_2[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_2[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_2[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan2_2[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan2_2[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
        <div class="riic_building building_dormitory">
          <div class="riic_building_title">宿舍4</div>
          <div class="riic_building_operatorArray">
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_3[0]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_3[1]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_3[2]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_3[3]"></el-input>
            <el-input class="operator_inputbox" size="small" placeholder="1" v-model="dormitory_plan2_3[4]"></el-input>
          </div>
          <div class="riic_building_parameter">
            <div class="parameter_text">按顺序入驻</div>
            <el-switch v-model="switch_dormitory_plan2_3[0]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
            <div class="parameter_text" style="margin-left: 20px">自动填充</div>
            <el-switch v-model="switch_dormitory_plan2_3[1]" active-color="#13ce66" inactive-color="#c0c4cc"></el-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buildingApi from "@/api/building";
import cookie from "js-cookie";
export default {
  data() {
    return {
      exportUrl:
        "https://houduan.yituliu.site/tool/building/schedule/export?uid=",
      uid: 12345,
      buildingType: "243",
      planTimes:'3班',
      scheduleJson: { plans: [] },
      title: "243极限",
      descriptionH1: "这是个顶配243排班协议演示",
      author: "yituliu",
      name: ["A+B 组", "A+C 组", "C+B 组"],
      descriptionH2: ["111111111", "2222222222222", "3333333333333"],
      radio_drones: ["贸易站", "制造站", "贸易站"],
      switch_drones_enable: [true, false, true],
      radio_drones_index: [1, 2, 3],
      input_drones_order: ["换班后", "换班后", "换班后"],
      Fiammetta: ["巫恋", "巫恋", "巫恋"],
      switch_Fiammetta_enable: [true, false, true],
      input_Fiammetta_order: ["换班后", "换班后", "换班后"],
      // A换班参数
      period_plan0: ["08:00", '13:59'],
      control_plan0: ["阿米娅", "凯尔希", "琴柳", "令", "夕"],
      trading_plan0_0: ["巫恋", "龙舌兰", "柏喙"],
      trading_plan0_1: ["但书", "空弦", "黑键"],
      radio_trading_plan0: ["龙门币", "龙门币"],
      switch_trading_plan0_0: [false, false],
      switch_trading_plan0_1: [false, false],
      manufacture_plan0_0: ["红云", "稀音", "帕拉斯"],
      manufacture_plan0_1: ["食铁兽", "断罪者", "至简"],
      manufacture_plan0_2: ["清流", "温蒂", "森蚺"],
      manufacture_plan0_3: ["砾", "槐琥", "迷迭香"],
      manufacture_plan0_4: [],
      radio_manufacture_plan0: [
        "作战记录",
        "作战记录",
        "赤金",
        "赤金",
        "作战记录",
      ],
      switch_manufacture_plan0_0: [false, false],
      switch_manufacture_plan0_1: [false, false],
      switch_manufacture_plan0_2: [false, false],
      switch_manufacture_plan0_3: [false, false],
      switch_manufacture_plan0_4: [false, false],
      power_plan0_0: ["承曦格雷伊", "澄闪", "炎狱炎熔"],
      switch_power_plan0_0: [false, false],
      switch_power_plan0_1: [false, false],
      switch_power_plan0_2: [false, false],
      hire_plan0_0: ["絮雨1"],
      switch_hire_plan0_0: [false, false],
      meeting_plan0_0: ["陈", "守林人"],
      switch_meeting_plan0_0: [false, false],
      dormitory_plan0_0: ["爱丽丝", "车尔尼"],
      dormitory_plan0_1: [],
      dormitory_plan0_2: [],
      dormitory_plan0_3: [],
      switch_dormitory_plan0_0: [true, true],
      switch_dormitory_plan0_1: [false, true],
      switch_dormitory_plan0_2: [false, true],
      switch_dormitory_plan0_3: [false, true],
      // B换班参数
      period_plan1: ["14:00", "19:59"],
      control_plan1: ["诗怀雅", "凯尔希", "灵知", "焰尾", "玛恩纳"],
      trading_plan1_0: ["巫恋", "龙舌兰", "柏喙"],
      trading_plan1_1: ["孑", "银灰", "崖心"],
      radio_trading_plan1: ["龙门币", "龙门币"],
      switch_trading_plan1_0: [false, false],
      switch_trading_plan1_1: [false, false],
      manufacture_plan1_0: ["红云", "稀音", "帕拉斯"],
      manufacture_plan1_1: ["远牙", "野鬃", "灰毫"],
      manufacture_plan1_2: ["清流", "温蒂", "森蚺"],
      manufacture_plan1_3: ["泡泡", "火神", "刻俄柏"],
      manufacture_plan1_4: [],
      radio_manufacture_plan1: [
        "作战记录",
        "作战记录",
        "赤金",
        "赤金",
        "作战记录",
      ],
      switch_manufacture_plan1_0: [false, false],
      switch_manufacture_plan1_1: [false, false],
      switch_manufacture_plan1_2: [false, false],
      switch_manufacture_plan1_3: [false, false],
      switch_manufacture_plan1_4: [false, false],
      power_plan1_0: ["承曦格雷伊", "雷蛇", "炎狱炎熔"],
      switch_power_plan1_0: [false, false],
      switch_power_plan1_1: [false, false],
      switch_power_plan1_2: [false, false],
      hire_plan1_0: ["艾雅法拉"],
      switch_hire_plan1_0: [false, false],
      meeting_plan1_0: ["陈", "守林人"],
      switch_meeting_plan1_0: [false, false],
      dormitory_plan1_0: ["爱丽丝", "车尔尼"],
      dormitory_plan1_1: [],
      dormitory_plan1_2: [],
      dormitory_plan1_3: [],
      switch_dormitory_plan1_0: [true, true],
      switch_dormitory_plan1_1: [false, true],
      switch_dormitory_plan1_2: [false, true],
      switch_dormitory_plan1_3: [false, true],
      // C换班参数
      period_plan2: ["20:00", "07:59"],
      control_plan2: ["阿米娅", "焰尾", "琴柳", "令", "夕"],
      trading_plan2_0: ["孑", "银灰", "崖心"],
      trading_plan2_1: ["但书", "空弦", "黑键"],
      radio_trading_plan2: ["龙门币", "龙门币"],
      switch_trading_plan2_0: [false, false],
      switch_trading_plan2_1: [false, false],
      manufacture_plan2_0: ["远牙", "野鬃", "灰毫"],
      manufacture_plan2_1: ["食铁兽", "断罪者", "至简"],
      manufacture_plan2_2: ["泡泡", "火神", "刻俄柏"],
      manufacture_plan2_3: ["砾", "槐琥", "迷迭香"],
      manufacture_plan2_4: [],
      radio_manufacture_plan2: [
        "作战记录",
        "作战记录",
        "赤金",
        "赤金",
        "作战记录",
      ],
      switch_manufacture_plan2_0: [false, false],
      switch_manufacture_plan2_1: [false, false],
      switch_manufacture_plan2_2: [false, false],
      switch_manufacture_plan2_3: [false, false],
      switch_manufacture_plan2_4: [false, false],
      power_plan2_0: ["正义骑士号", "澄闪", "雷蛇"],
      switch_power_plan2_0: [false, false],
      switch_power_plan2_1: [false, false],
      switch_power_plan2_2: [false, false],
      hire_plan2_0: ["絮雨2"],
      switch_hire_plan2_0: [false, false],
      meeting_plan2_0: ["陈", "守林人"],
      switch_meeting_plan2_0: [false, false],
      dormitory_plan2_0: ["爱丽丝", "车尔尼"],
      dormitory_plan2_1: [],
      dormitory_plan2_2: [],
      dormitory_plan2_3: [],
      switch_dormitory_plan2_0: [true, true],
      switch_dormitory_plan2_1: [false, true],
      switch_dormitory_plan2_2: [false, true],
      switch_dormitory_plan2_3: [false, true],
    };
  },
  created() {
    this.setJson();
    this.setExportUrl();
    this.setPeriod(["20:00", "07:00"]);
  },
  methods: {
    setExportUrl() {
      this.exportUrl =
        "https://houduan.yituliu.site/tool/building/schedule/export?uid=" +
        this.uid;
    },
    maaBuildingJsonCreated() {
      this.setJson();
      buildingApi.maaBuildingJsonCreated(this.scheduleJson).then((response) => {
        this.$message({
          message: response.data.message + "uid：" + response.data.uid,
          type: "success",
          showClose: true,
          duration: 3000,
        });
        this.uid = response.data.uid;
        this.setExportUrl();
      });
    },
    getUid(){

    },
    setJson() {
      this.scheduleJson = { plans: [] };
      var plans_0 = {
        Fiammetta: { target: "", enable: true, order: "pre" },
        drones: { room: "", index: 1, enable: true, order: "pre" },
        rooms: {
          control: [],
          trading: [],
          manufacture: [],
          power: [],
          hire: [],
          meeting: [],
          dormitory: [],
        },
      };
      var plans_1 = {
        Fiammetta: { target: "", enable: true, order: "pre" },
        drones: { room: "", index: 1, enable: true, order: "pre" },
        rooms: {
          control: [],
          trading: [],
          manufacture: [],
          power: [],
          hire: [],
          meeting: [],
          dormitory: [],
        },
      };
      var plans_2 = {
        Fiammetta: { target: "", enable: true, order: "pre" },
        drones: { room: "", index: 1, enable: true, order: "pre" },
        rooms: {
          control: [],
          trading: [],
          manufacture: [],
          power: [],
          hire: [],
          meeting: [],
          dormitory: [],
        },
      };
      this.scheduleJson.title = this.title;
      this.scheduleJson.description = this.descriptionH1;
      plans_0.name = this.name[0];
      plans_0.description = this.descriptionH2[0];
      plans_0.period = this.setPeriod(this.period_plan0);
      plans_0.Fiammetta.target = this.Fiammetta[0];
      plans_0.Fiammetta.enable = this.switch_Fiammetta_enable[0];
      plans_0.Fiammetta.order = this.getOrder(this.input_Fiammetta_order[0]);
      plans_0.drones.room = this.getParamsValue(this.radio_drones[0]);
      plans_0.drones.index = this.radio_drones_index[0];
      plans_0.drones.enable = this.switch_drones_enable[0];
      plans_0.drones.order = this.getOrder(this.input_drones_order[0]);
      
      var control_planMap0_0 = {
        operators: this.control_plan0
      };
      plans_0.rooms.control[0] = control_planMap0_0 ;

      var trading_planMap0_0 = {
        operators: this.trading_plan0_0,
        sort: this.switch_trading_plan0_0[0],
        autofill: this.switch_trading_plan0_0[1],
        product: this.getParamsValue(this.radio_trading_plan0[0]),
      };
      var trading_planMap0_1 = {
        operators: this.trading_plan0_1,
        sort: this.switch_trading_plan0_1[0],
        autofill: this.switch_trading_plan0_1[1],
        product: this.getParamsValue(this.radio_trading_plan0[1]),
      };
      plans_0.rooms.trading[0] = trading_planMap0_0;
      if ("243" === this.buildingType)
        plans_0.rooms.trading[1] = trading_planMap0_1;
      var manufacture_planMap0_0 = {
        operators: this.manufacture_plan0_0,
        sort: this.switch_manufacture_plan0_0[0],
        autofill: this.switch_manufacture_plan0_0[1],
        product: this.getParamsValue(this.radio_manufacture_plan0[0]),
      };
      var manufacture_planMap0_1 = {
        operators: this.manufacture_plan0_1,
        sort: this.switch_manufacture_plan0_1[0],
        autofill: this.switch_manufacture_plan0_1[1],
        product: this.getParamsValue(this.radio_manufacture_plan0[1]),
      };
      var manufacture_planMap0_2 = {
        operators: this.manufacture_plan0_2,
        sort: this.switch_manufacture_plan0_2[0],
        autofill: this.switch_manufacture_plan0_2[1],
        product: this.getParamsValue(this.radio_manufacture_plan0[2]),
      };
      var manufacture_planMap0_3 = {
        operators: this.manufacture_plan0_3,
        sort: this.switch_manufacture_plan0_3[0],
        autofill: this.switch_manufacture_plan0_3[1],
        product: this.getParamsValue(this.radio_manufacture_plan0[3]),
      };
      var manufacture_planMap0_4 = {
        operators: this.manufacture_plan0_4,
        sort: this.switch_manufacture_plan0_4[0],
        autofill: this.switch_manufacture_plan0_4[1],
        product: this.getParamsValue(this.radio_manufacture_plan0[4]),
      };
      plans_0.rooms.manufacture[0] = manufacture_planMap0_0;
      plans_0.rooms.manufacture[1] = manufacture_planMap0_1;
      plans_0.rooms.manufacture[2] = manufacture_planMap0_2;
      plans_0.rooms.manufacture[3] = manufacture_planMap0_3;
      if ("153" === this.buildingType)
        plans_0.rooms.manufacture[4] = manufacture_planMap0_4;

      var power_planMap0_0 = {
        operators: [this.power_plan0_0[0]],
        // sort: this.switch_power_plan0_0[0],
        autofill: this.switch_power_plan0_0[1],
      };

      var power_planMap0_1 = {
        operators: [this.power_plan0_0[1]],
        // sort: this.switch_power_plan0_1[0],
        autofill: this.switch_power_plan0_1[1],
      };

      var power_planMap0_2 = {
        operators: [this.power_plan0_0[2]],
        // sort: this.switch_power_plan0_2[0],
        autofill: this.switch_power_plan0_2[1],
      };

      plans_0.rooms.power[0] = power_planMap0_0;
      plans_0.rooms.power[1] = power_planMap0_1;
      plans_0.rooms.power[2] = power_planMap0_2;

      var hire_planMap0_0 = {
        operators: this.hire_plan0_0,
        // sort: this.switch_hire_plan0_0[0],
        autofill: this.switch_hire_plan0_0[1],
      };

      plans_0.rooms.hire[0] = hire_planMap0_0;

      var meeting_planMap0_0 = {
        operators: this.meeting_plan0_0,
        // sort: this.switch_meeting_plan0_0[0],
        autofill: this.switch_meeting_plan0_0[1],
      };

      plans_0.rooms.meeting[0] = meeting_planMap0_0;

      var dormitory_planMap0_0 = {
        operators: this.dormitory_plan0_0,
        sort: this.switch_dormitory_plan0_0[0],
        autofill: this.switch_dormitory_plan0_0[1],
      };

      var dormitory_planMap0_1 = {
        operators: this.dormitory_plan0_1,
        sort: this.switch_dormitory_plan0_1[0],
        autofill: this.switch_dormitory_plan0_1[1],
      };

      var dormitory_planMap0_2 = {
        operators: this.dormitory_plan0_2,
        sort: this.switch_dormitory_plan0_2[0],
        autofill: this.switch_dormitory_plan0_2[1],
      };

      var dormitory_planMap0_3 = {
        operators: this.dormitory_plan0_3,
        sort: this.switch_dormitory_plan0_3[0],
        autofill: this.switch_dormitory_plan0_3[1],
      };

        plans_0.rooms.dormitory[0] = dormitory_planMap0_0;
      
        plans_0.rooms.dormitory[1] = dormitory_planMap0_1;
      
        plans_0.rooms.dormitory[2] = dormitory_planMap0_2;
      
        plans_0.rooms.dormitory[3] = dormitory_planMap0_3; 

// B换班表
    
      plans_1.name = this.name[1];
      plans_1.period = this.setPeriod(this.period_plan1);
      plans_1.description = this.descriptionH2[1];
      plans_1.Fiammetta.target = this.Fiammetta[1];
      plans_1.Fiammetta.enable = this.switch_Fiammetta_enable[1];
      plans_1.Fiammetta.order = this.getOrder(this.input_Fiammetta_order[1]);
      plans_1.drones.room = this.getParamsValue(this.radio_drones[1]);
      plans_1.drones.index = this.radio_drones_index[1];
      plans_1.drones.enable = this.switch_drones_enable[1];
      plans_1.drones.order = this.getOrder(this.input_drones_order[1]);
      
      var control_planMap1_0 = {
        operators: this.control_plan1
      };
      plans_1.rooms.control[0] = control_planMap1_0 ;

      var trading_planMap1_0 = {
        operators: this.trading_plan1_0,
        sort: this.switch_trading_plan1_0[0],
        autofill: this.switch_trading_plan1_0[1],
        product: this.getParamsValue(this.radio_trading_plan1[0]),
      };

      var trading_planMap1_1 = {
        operators: this.trading_plan1_1,
        sort: this.switch_trading_plan1_1[0],
        autofill: this.switch_trading_plan1_1[1],
        product: this.getParamsValue(this.radio_trading_plan1[1]),
      };

      plans_1.rooms.trading[0] = trading_planMap1_0;

      if ("243" === this.buildingType)
        plans_1.rooms.trading[1] = trading_planMap1_1;

      var manufacture_planMap1_0 = {
        operators: this.manufacture_plan1_0,
        sort: this.switch_manufacture_plan1_0[0],
        autofill: this.switch_manufacture_plan1_0[1],
        product: this.getParamsValue(this.radio_manufacture_plan1[0]),
      };

      var manufacture_planMap1_1 = {
        operators: this.manufacture_plan1_1,
        sort: this.switch_manufacture_plan1_1[0],
        autofill: this.switch_manufacture_plan1_1[1],
        product: this.getParamsValue(this.radio_manufacture_plan1[1]),
      };

      var manufacture_planMap1_2 = {
        operators: this.manufacture_plan1_2,
        sort: this.switch_manufacture_plan1_2[0],
        autofill: this.switch_manufacture_plan1_2[1],
        product: this.getParamsValue(this.radio_manufacture_plan1[2]),
      };

      var manufacture_planMap1_3 = {
        operators: this.manufacture_plan1_3,
        sort: this.switch_manufacture_plan1_3[0],
        autofill: this.switch_manufacture_plan1_3[1],
        product: this.getParamsValue(this.radio_manufacture_plan1[3]),
      };

      var manufacture_planMap1_4 = {
        operators: this.manufacture_plan1_4,
        sort: this.switch_manufacture_plan1_4[0],
        autofill: this.switch_manufacture_plan1_4[1],
        product: this.getParamsValue(this.radio_manufacture_plan1[4]),
      };

      plans_1.rooms.manufacture[0] = manufacture_planMap1_0;
      plans_1.rooms.manufacture[1] = manufacture_planMap1_1;
      plans_1.rooms.manufacture[2] = manufacture_planMap1_2;
      plans_1.rooms.manufacture[3] = manufacture_planMap1_3;
      if ("153" === this.buildingType)
        plans_1.rooms.manufacture[4] = manufacture_planMap1_4;

      var power_planMap1_0 = {
        operators: [this.power_plan1_0[0]],
        // sort: this.switch_power_plan1_0[0],
        autofill: this.switch_power_plan1_0[1],
      };

      var power_planMap1_1 = {
        operators: [this.power_plan1_0[1]],
        // sort: this.switch_power_plan1_1[0],
        autofill: this.switch_power_plan1_1[1],
      };

      var power_planMap1_2 = {
        operators: [this.power_plan1_0[2]],
        // sort: this.switch_power_plan1_2[0],
        autofill: this.switch_power_plan1_2[1],
      };

      plans_1.rooms.power[0] = power_planMap1_0;
      plans_1.rooms.power[1] = power_planMap1_1;
      plans_1.rooms.power[2] = power_planMap1_2;

      var hire_planMap1_0 = {
        operators: this.hire_plan1_0,
        // sort: this.switch_hire_plan1_0[0],
        autofill: this.switch_hire_plan1_0[1],
      };

      plans_1.rooms.hire[0] = hire_planMap1_0;

      var meeting_planMap1_0 = {
        operators: this.meeting_plan1_0,
        // sort: this.switch_meeting_plan1_0[0],
        autofill: this.switch_meeting_plan1_0[1],
      };

      plans_1.rooms.meeting[0] = meeting_planMap1_0;

      var dormitory_planMap1_0 = {
        operators: this.dormitory_plan1_0,
        sort: this.switch_dormitory_plan1_0[0],
        autofill: this.switch_dormitory_plan1_0[1],
      };

      var dormitory_planMap1_1 = {
        operators: this.dormitory_plan1_1,
        sort: this.switch_dormitory_plan1_1[0],
        autofill: this.switch_dormitory_plan1_1[1],
      };

      var dormitory_planMap1_2 = {
        operators: this.dormitory_plan1_2,
        sort: this.switch_dormitory_plan1_2[0],
        autofill: this.switch_dormitory_plan1_2[1],
      };

      var dormitory_planMap1_3 = {
        operators: this.dormitory_plan1_3,
        sort: this.switch_dormitory_plan1_3[0],
        autofill: this.switch_dormitory_plan1_3[1],
      };

        
        plans_1.rooms.dormitory[0] = dormitory_planMap1_0;
      
        plans_1.rooms.dormitory[1] = dormitory_planMap1_1;
     
        plans_1.rooms.dormitory[2] = dormitory_planMap1_2;
     
        plans_1.rooms.dormitory[3] = dormitory_planMap1_3; 
        
        
        
        // C换班表
      plans_2.name = this.name[2];
      plans_2.period = this.setPeriod(this.period_plan2);

      plans_2.description = this.descriptionH2[2];
      plans_2.Fiammetta.target = this.Fiammetta[2];
      plans_2.Fiammetta.enable = this.switch_Fiammetta_enable[2];
      plans_2.Fiammetta.order = this.getOrder(this.input_Fiammetta_order[2]);
      plans_2.drones.room = this.getParamsValue(this.radio_drones[2]);
      plans_2.drones.index = this.radio_drones_index[2];
      plans_2.drones.enable = this.switch_drones_enable[2];
      plans_2.drones.order = this.getOrder(this.input_drones_order[2]);
     
      var control_planMap2_0 = {
        operators: this.control_plan2
      };
      plans_2.rooms.control[0] = control_planMap2_0 ;

      var trading_planMap2_0 = {
        operators: this.trading_plan2_0,
        sort: this.switch_trading_plan2_0[0],
        autofill: this.switch_trading_plan2_0[1],
        product: this.getParamsValue(this.radio_trading_plan2[0]),
      };

      var trading_planMap2_1 = {
        operators: this.trading_plan2_1,
        sort: this.switch_trading_plan2_1[0],
        autofill: this.switch_trading_plan2_1[1],
        product: this.getParamsValue(this.radio_trading_plan2[1]),
      };

      plans_2.rooms.trading[0] = trading_planMap2_0;
      if ("243" === this.buildingType)
        plans_2.rooms.trading[1] = trading_planMap2_1;

      var manufacture_planMap2_0 = {
        operators: this.manufacture_plan2_0,
        sort: this.switch_manufacture_plan2_0[0],
        autofill: this.switch_manufacture_plan2_0[1],
        product: this.getParamsValue(this.radio_manufacture_plan2[0]),
      };

      var manufacture_planMap2_1 = {
        operators: this.manufacture_plan2_1,
        sort: this.switch_manufacture_plan2_1[0],
        autofill: this.switch_manufacture_plan2_1[1],
        product: this.getParamsValue(this.radio_manufacture_plan2[1]),
      };

      var manufacture_planMap2_2 = {
        operators: this.manufacture_plan2_2,
        sort: this.switch_manufacture_plan2_2[0],
        autofill: this.switch_manufacture_plan2_2[1],
        product: this.getParamsValue(this.radio_manufacture_plan2[2]),
      };

      var manufacture_planMap2_3 = {
        operators: this.manufacture_plan2_3,
        sort: this.switch_manufacture_plan2_3[0],
        autofill: this.switch_manufacture_plan2_3[1],
        product: this.getParamsValue(this.radio_manufacture_plan2[3]),
      };

      var manufacture_planMap2_4 = {
        operators: this.manufacture_plan2_4,
        sort: this.switch_manufacture_plan2_4[0],
        autofill: this.switch_manufacture_plan2_4[1],
        product: this.getParamsValue(this.radio_manufacture_plan2[4]),
      };

      plans_2.rooms.manufacture[0] = manufacture_planMap2_0;
      plans_2.rooms.manufacture[1] = manufacture_planMap2_1;
      plans_2.rooms.manufacture[2] = manufacture_planMap2_2;
      plans_2.rooms.manufacture[3] = manufacture_planMap2_3;
      if ("153" === this.buildingType)
        plans_2.rooms.manufacture[4] = manufacture_planMap2_4;

      var power_planMap2_0 = {
        operators: [this.power_plan2_0[0]],
        // sort: this.switch_power_plan2_0[0],
        autofill: this.switch_power_plan2_0[1],
      };

      var power_planMap2_1 = {
        operators: [this.power_plan2_0[1]],
        // sort: this.switch_power_plan2_1[0],
        autofill: this.switch_power_plan2_1[1],
      };

      var power_planMap2_2 = {
        operators:[ this.power_plan2_0[2]],
        // sort: this.switch_power_plan2_2[0],
        autofill: this.switch_power_plan2_2[1],
      };

      plans_2.rooms.power[0] = power_planMap2_0;
      plans_2.rooms.power[1] = power_planMap2_1;
      plans_2.rooms.power[2] = power_planMap2_2;

      var hire_planMap2_0 = {
        operators: this.hire_plan2_0,
        // sort: this.switch_hire_plan2_0[0],
        autofill: this.switch_hire_plan2_0[1],
      };

      plans_2.rooms.hire[0] = hire_planMap2_0;

      var meeting_planMap2_0 = {
        operators: this.meeting_plan2_0,
        // sort: this.switch_meeting_plan2_0[0],
        autofill: this.switch_meeting_plan2_0[1],
      };

      plans_2.rooms.meeting[0] = meeting_planMap2_0;

      var dormitory_planMap2_0 = {
        operators: this.dormitory_plan2_0,
        sort: this.switch_dormitory_plan2_0[0],
        autofill: this.switch_dormitory_plan2_0[1],
      };

      var dormitory_planMap2_1 = {
        operators: this.dormitory_plan2_1,
        sort: this.switch_dormitory_plan2_1[0],
        autofill: this.switch_dormitory_plan2_1[1],
      };

      var dormitory_planMap2_2 = {
        operators: this.dormitory_plan2_2,
        sort: this.switch_dormitory_plan2_2[0],
        autofill: this.switch_dormitory_plan2_2[1],
      };

      var dormitory_planMap2_3 = {
        operators: this.dormitory_plan2_3,
        sort: this.switch_dormitory_plan2_3[0],
        autofill: this.switch_dormitory_plan2_3[1],
      };
     
        plans_2.rooms.dormitory[0] = dormitory_planMap2_0;
        plans_2.rooms.dormitory[1] = dormitory_planMap2_1;
        plans_2.rooms.dormitory[2] = dormitory_planMap2_2;
        plans_2.rooms.dormitory[3] = dormitory_planMap2_3;



      this.scheduleJson.plans.push(plans_0);
      this.scheduleJson.plans.push(plans_1);
      if('3班'===this.planTimes)
      this.scheduleJson.plans.push(plans_2);
      console.log(this.scheduleJson);
    },

    setPeriod(list) {
      var start = parseInt(list[0].substr(0, 2));
      var end = parseInt(list[1].substr(0, 2));

      if (start > end) {
        console.log([
          [list[0], "23:59"],
          ["00:00", list[1]],
        ]);
        return [
          [list[0], "23:59"],
          ["00:00", list[1]],
        ];
      }
      return [list];
    },
    getOrder(str){
          if("换班前"===str) return 'pre';
          if("换班后"===str) return 'post';
    },

    getParamsValue(label) {
      if (label === "贸易站") {
        return "trading";
      }
      if (label === "制造站") {
        return "manufacture";
      }
      if (label === "龙门币") {
        return "LMD";
      }
      if (label === "合成玉") {
        return "Orundum";
      }
      if (label === "作战记录") {
        return "Battle Record";
      }
      if (label === "赤金") {
        return "Pure Gold";
      }
      if (label === "源石碎片") {
        return "Originium Shard";
      }
      if (label === "制造站") {
        return "manufacture";
      }
      if (label === "双芯片") {
        return "Dualchip";
      }
    },
  },
};
</script>



<style>

#riic {
  background: rgb(255, 255, 255);
  margin: auto;
  max-width: 1500px;
}

#riic_controlPanel {
  /* margin-top: 16px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}#riic_workerSets {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.riic_workerSet:nth-child(1) {
  border: 4px dotted #ff000080;
}
.riic_workerSet:nth-child(2) {
  border: 4px dotted #00ff0080;
}
.riic_workerSet:nth-child(3) {
  border: 4px dotted #0000ff80;
}
.riic_workerSet {
  /* width: 450px; */
  border-radius: 8px;
  font-size: 18px;
  /* box-shadow: 0px 2px 6px rgb(160 160 160 / 69%); */
  margin: 0px 12px 12px 12px;
  /* margin: auto; */
}
.riic_building {
  margin: 16px;
  margin-top: 36px;
  padding: 16px 0px 8px 0px;
  border: 4px solid rgba(128, 128, 128, 0.50196);
  border-radius: 16px;
  width: 410px;
}
.riic_building_title {
  position: absolute;
  background: #ffffff;
  margin: -36px 12px;
  padding: 0px 8px 4px 8px;
  font-size: 24px;
  border-left: 4px solid #80808080;
  border-right: 4px solid #80808080;
  border-radius: 4px;
  height: 32px;
}
.building_trade .riic_building_title {
  border-left: 4px solid #000d8180;
  border-right: 4px solid #000d8180;
}
.building_factory .riic_building_title {
  border-left: 4px solid #7f810080;
  border-right: 4px solid #7f810080;
}
.building_powerPlant .riic_building_title {
  border-left: 4px solid #00810080;
  border-right: 4px solid #00810080;
}
.building_powerPlant .riic_building_parameter div:nth-child(1){
  display: none;
}
.building_powerPlant .riic_building_parameter div:nth-child(2){
  display: none;
}
.building_powerPlant .riic_building_parameter div:nth-child(1){
  display: none;
}
.building_powerPlant .riic_building_parameter div:nth-child(2){
  display: none;
}
.building_powerPlant .riic_building_parameter{
  display: inline-block;
}

.building_hr .riic_building_parameter div:nth-child(1){
  display: none;
}
.building_hr .riic_building_parameter div:nth-child(2){
  display: none;
}
.building_hr .riic_building_parameter div:nth-child(1){
  display: none;
}
.building_hr .riic_building_parameter div:nth-child(2){
  display: none;
}
.building_hr .riic_building_parameter{
  display: inline-block;
}

.building_meetingRoom .riic_building_parameter div:nth-child(1){
  display: none;
}
.building_meetingRoom .riic_building_parameter div:nth-child(2){
  display: none;
}
.building_meetingRoom .riic_building_parameter div:nth-child(1){
  display: none;
}
.building_meetingRoom .riic_building_parameter div:nth-child(2){
  display: none;
}
.building_meetingRoom .riic_building_parameter{
  display: inline-block;
}

.riic_building_operatorArray {
  padding: 0px 20px;
  line-height: 40px;
  display: inline-block;
}
.riic_building_operator {
  /* background-color: rgb(23, 148, 90); */
  margin: 12px;
  display: inline-block;
}
.riic_building_parameter {
  /* background-color: rgb(110, 148, 23); */
  margin: 12px 12px 12px 24px;
  /* display: inline-block; */
}
.parameter_text {
  width: 96px;
  display: inline-block;
}
.parameter_inputbox {
  width: 262px;
  display: inline-block;
  height: 20px;
  position: relative;
  top: -2px;
}
.operator_text {
  width: 20px;
  display: inline-block;
}
.operator_inputbox {
  width: 117px;
  display: inline-block;
  height: 20px;
  position: relative;
  top: -2px;
}#riic_jsonData {
  margin-top: 24px;
  /* background-color: rgb(255, 255, 255); */
  width: 444px;
  height: 300px;
  overflow: auto;
}
</style>
