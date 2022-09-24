<template>
  <div id="riic">
    <div id="riic_controlPanel">
      控制面板 全局参数区<br>
      此处设置名称、排班方案等
    </div>


    <div class="riic_workerSet">
      
      <div class="riic_building building_uni">
        <div class="riic_building_title">
          标题
        </div>
        
        <div class="riic_building_parameter">
          <div class="parameter_text">班次名称</div>
          <el-input size="small" class="parameter_inputbox" placeholder="例如：主力组A" v-model="input" ></el-input>
          <!-- <input class="parameter_inputbox" type="text"> -->
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">描述</div>
          <el-input size="small" class="parameter_inputbox" placeholder="可选" v-model="input" ></el-input>
          <!-- <input class="parameter_inputbox" type="text"> -->
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">无人机目标</div>
          <el-radio-group size="small">
            <el-radio-button style="width: 75px;" label="贸易站(钱)"></el-radio-button>
            <el-radio-button style="width: 75px;" label="制造站(书)"></el-radio-button>
            <el-radio-button style="width: 75px;" label="制造站(金)"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">菲亚梅塔</div>
          <el-input size="small" class="parameter_inputbox" placeholder="例如：巫恋" v-model="input" ></el-input>
          <!-- <input class="parameter_inputbox" type="text"> -->
        </div>
      </div>


      <div class="riic_building building_cortrolCenter">
        <div class="riic_building_title">
          控制中枢
        </div>
        <div class="riic_building_operatorArray">
          <el-input class="operator_inputbox" size="small" placeholder="1" v-model="input" ></el-input>
          <el-input class="operator_inputbox" size="small" placeholder="2" v-model="input" ></el-input>
          <el-input class="operator_inputbox" size="small" placeholder="3" v-model="input" ></el-input>
          <el-input class="operator_inputbox" size="small" placeholder="4" v-model="input" ></el-input>
          <el-input class="operator_inputbox" size="small" placeholder="5" v-model="input" ></el-input>
          <!-- <div class="riic_building_operator">
            <div class="operator_text">1</div>
            <input class="operator_inputbox" type="text">
          </div>
          <div class="riic_building_operator">
            <div class="operator_text">2</div>
            <input class="operator_inputbox" type="text">
          </div>
          <div class="riic_building_operator">
            <div class="operator_text">3</div>
            <input class="operator_inputbox" type="text">
          </div>
          <div class="riic_building_operator">
            <div class="operator_text">4</div>
            <input class="operator_inputbox" type="text">
          </div>
          <div class="riic_building_operator">
            <div class="operator_text">5</div>
            <input class="operator_inputbox" type="text">
          </div> -->
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">参数A</div>
          <el-radio-group size="small">
            <el-radio-button style="width: 75px;" label="参数选项1"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项2"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项3"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">参数B</div>
          <el-radio-group size="small">
            <el-radio-button style="width: 75px;" label="参数选项1"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项2"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项3"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="riic_building building_trade">
        <div class="riic_building_title">
          贸易站1
        </div>
        <div class="riic_building_operatorArray">
          <el-input class="operator_inputbox" size="small" placeholder="1" v-model="input" ></el-input>
          <el-input class="operator_inputbox" size="small" placeholder="2" v-model="input" ></el-input>
          <el-input class="operator_inputbox" size="small" placeholder="3" v-model="input" ></el-input>
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">参数A</div>
          <el-radio-group size="small">
            <el-radio-button style="width: 75px;" label="参数选项1"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项2"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项3"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">参数B</div>
          <el-radio-group size="small">
            <el-radio-button style="width: 75px;" label="参数选项1"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项2"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项3"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="riic_building building_trade">
        <div class="riic_building_title">
          贸易站2
        </div>
        <div class="riic_building_operatorArray">
          <el-input class="operator_inputbox" size="small" placeholder="1" v-model="input" ></el-input>
          <el-input class="operator_inputbox" size="small" placeholder="2" v-model="input" ></el-input>
          <el-input class="operator_inputbox" size="small" placeholder="3" v-model="input" ></el-input>
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">参数A</div>
          <el-radio-group size="small">
            <el-radio-button style="width: 75px;" label="参数选项1"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项2"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项3"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="riic_building_parameter">
          <div class="parameter_text">参数B</div>
          <el-radio-group size="small">
            <el-radio-button style="width: 75px;" label="参数选项1"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项2"></el-radio-button>
            <el-radio-button style="width: 75px;" label="参数选项3"></el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <div class="riic_building building_factory">
        制造站1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站3
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站4
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_powerPlant">
        发电站1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_powerPlant">
        发电站2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_powerPlant">
        发电站3
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_meetingRoom">
        会客室
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_workshop">
        加工站
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_hr">
        办公室
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_gym">
        训练室
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍3
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍4
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>


    </div>

    <div class="riic_workerSet">
      B排班表
      <div class="riic_building building_uni">
        该班次的参数
        <div class="riic_building_parameter">某参数</div>
        <div class="riic_building_parameter">某参数</div>
        <div class="riic_building_parameter">某参数</div>
        <div class="riic_building_parameter">某参数</div>
        <div class="riic_building_parameter">某参数</div>
      </div>


      <div class="riic_building building_cortrolCenter">
        控制中枢
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_trade">
        贸易站1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_trade">
        贸易站2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站3
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站4
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_powerPlant">
        发电站1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_powerPlant">
        发电站2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_powerPlant">
        发电站3
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_meetingRoom">
        会客室
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_workshop">
        加工站
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_hr">
        办公室
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_gym">
        训练室
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍3
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍4
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>


    </div>

    <div class="riic_workerSet">
      C排班表
      <div class="riic_building building_uni">
        该班次的参数
        <div class="riic_building_parameter">某参数</div>
        <div class="riic_building_parameter">某参数</div>
        <div class="riic_building_parameter">某参数</div>
        <div class="riic_building_parameter">某参数</div>
        <div class="riic_building_parameter">某参数</div>
      </div>


      <div class="riic_building building_cortrolCenter">
        控制中枢
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_trade">
        贸易站1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_trade">
        贸易站2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站3
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_factory">
        制造站4
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_powerPlant">
        发电站1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_powerPlant">
        发电站2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_powerPlant">
        发电站3
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_meetingRoom">
        会客室
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_workshop">
        加工站
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_hr">
        办公室
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_gym">
        训练室
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍1
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍2
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍3
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
      <div class="riic_building building_dormitory">
        宿舍4
        <div class="riic_building_operatorArray">
          <div class="riic_building_operator">某干员</div>
          <div class="riic_building_operator">某干员</div>
        </div>
        <div class="riic_building_parameterArray">
          <div class="riic_building_parameter">某参数</div>
        </div>
      </div>
    </div>


  </div>
</template>


<script>
  export default {
    data() {
      return {
        input: ''
      }
    }
  }
  </script>

<style>
  #riic_controlPanel{
    background-color: aquamarine;
    height: 100px;
  }

  .riic_workerSet{
    /* background-color: yellow; */
    display:inline-block;
    width: 430px;
    margin: 20px;

    color: #222222;
    margin: 12px;
    /* background-color: #d8d8d8; */
    border-radius: 8px;
    font-size: 20px;
    box-shadow: 0px 2px 6px rgb(160 160 160 / 69%);
    overflow: hidden;
    /* height: 100px; */
  }

  .riic_building{
    margin: 16px;
    margin-top: 24px;
    padding-top: 12px;
    border: 4px solid rgba(128,128,128,0.50196);
    border-radius: 16px;
  }
  .riic_building_title{
    position: absolute;
    background: #ffffff;
    margin: -36px 12px;
    padding: 0px 4px;
    font-size: 24px;
  }
  .riic_building_operatorArray{
    padding: 0px 20px;
    line-height: 40px;
  }
  


  .riic_building_operator{
    /* background-color: rgb(23, 148, 90); */
    margin: 12px;
    display: inline-block;
  }

  .riic_building_parameter{
    /* background-color: rgb(110, 148, 23); */
    margin: 12px;
    /* display: inline-block; */
  }

  .parameter_text{
    width: 108px;
    display: inline-block;
  }
  .parameter_inputbox{
    width: 237px;
    display: inline-block;
    height: 20px;
    position: relative;
    top: -2px;
  }
  .operator_text{
    width: 20px;
    display: inline-block;
  }
  .operator_inputbox{
    width: 110px;
    display: inline-block;
    height: 20px;
    position: relative;
    top: -2px;
  }

</style>