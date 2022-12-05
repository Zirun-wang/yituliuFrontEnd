<script>
  import buildingApi from "@/api/building";
  import cookie from "js-cookie";
  import toolApi from "@/api/tool";
  import TRADINGJson from "static/json/TRADING.json";
  import MANUFACTUREJson from "static/json/MANUFACTURE.json";
  import CONTROLJson from "static/json/CONTROL.json";
  import POWERJson from "static/json/POWER.json";


  export default {
    head: {
      title: "一图流-基建排班生成器",
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
          content: "一图流-基建排班生成器",
        },
      ],
      link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
    },
    data() {
      return {
        exportUrl: "https://houduan.yituliu.site/tool/building/schedule/export?uid=1664632307607024",
        maaUrl: "maa://infra.yituliu/1664632307607024",
        uid: 12345,
        importId: '',
        historicalData: [],
        dialogTableVisible: false,
        createTime: [],
        buildingType: "243",
        planTimes: '3班',
        char_TRADING: TRADINGJson,
        char_MANUFACTURE: MANUFACTUREJson,
        char_CONTROL: CONTROLJson,
        char_POWER: POWERJson,
        scheduleJson: {plans: []},
        title: "243极限",
        descriptionH1: "这是个顶配243排班协议演示",
        author: "yituliu",
        name: ["A+B组", "B+C 组", "A+C组"],
        descriptionH2: ["描述1", "描述2", "描述3"],
        radio_drones: ["贸易站", "制造站", "贸易站"],
        switch_drones_enable: [true, false, true],
        radio_drones_index: [1, 2, 3],
        input_drones_order: ["换班前", "换班前", "换班前"],
        Fiammetta: ["巫恋", "巫恋", "巫恋"],
        switch_Fiammetta_enable: [false, false, false],
        input_Fiammetta_order: ["换班前", "换班前", "换班前"],
        control_skip: [false, false, false],

        // A换班参数
        period_plan0: ["20:00", '07:59'],
        control_plan0: ["阿米娅", "凯尔希", "琴柳", "令", "夕"],
        trading_plan0_0: ["巫恋", "龙舌兰", "柏喙"],
        trading_plan0_1: ["但书", "空弦", "黑键"],
        trading_plan0_2: ["能天使", "德克萨斯", "拉普兰德"],
        radio_trading_plan0: ["龙门币", "龙门币", "龙门币"],
        switch_trading_plan0_0: [false, false, false],
        switch_trading_plan0_1: [false, false, false],
        switch_trading_plan0_2: [false, false, false],
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
        switch_manufacture_plan0_0: [false, false, false],
        switch_manufacture_plan0_1: [false, false, false],
        switch_manufacture_plan0_2: [false, false, false],
        switch_manufacture_plan0_3: [false, false, false],
        switch_manufacture_plan0_4: [false, false, false],
        power_plan0_0: ["承曦格雷伊", "澄闪", "炎狱炎熔"],
        switch_power_plan0_0: [false, false, false],
        switch_power_plan0_1: [false, false, false],
        switch_power_plan0_2: [false, false, false],
        hire_plan0_0: ["絮雨"],
        switch_hire_plan0_0: [false, false, false],
        meeting_plan0_0: ["陈", "守林人"],
        switch_meeting_plan0_0: [false, false, false],
        dormitory_plan0_0: [],
        dormitory_plan0_1: [],
        dormitory_plan0_2: [],
        dormitory_plan0_3: [],
        switch_dormitory_plan0_0: [false, false, false],
        switch_dormitory_plan0_1: [false, false, false],
        switch_dormitory_plan0_2: [false, false, false],
        switch_dormitory_plan0_3: [false, false, false],
        // B换班参数
        period_plan1: ["08:00", "13:59"],
        control_plan1: ["诗怀雅", "凯尔希", "灵知", "焰尾", "玛恩纳"],
        trading_plan1_0: ["巫恋", "龙舌兰", "柏喙"],
        trading_plan1_1: ["孑", "银灰", "崖心"],
        trading_plan1_2: ["能天使", "德克萨斯", "拉普兰德"],
        radio_trading_plan1: ["龙门币", "龙门币", "龙门币"],
        switch_trading_plan1_0: [false, false, false],
        switch_trading_plan1_1: [false, false, false],
        switch_trading_plan1_2: [false, false, false],
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
        switch_manufacture_plan1_0: [false, false, false],
        switch_manufacture_plan1_1: [false, false, false],
        switch_manufacture_plan1_2: [false, false, false],
        switch_manufacture_plan1_3: [false, false, false],
        switch_manufacture_plan1_4: [false, false, false],
        power_plan1_0: ["承曦格雷伊", "雷蛇", "炎狱炎熔"],
        switch_power_plan1_0: [false, false, false],
        switch_power_plan1_1: [false, false, false],
        switch_power_plan1_2: [false, false, false],
        hire_plan1_0: ["艾雅法拉"],
        switch_hire_plan1_0: [false, false, false],
        meeting_plan1_0: ["陈", "守林人"],
        switch_meeting_plan1_0: [false, false, false],
        dormitory_plan1_0: [],
        dormitory_plan1_1: [],
        dormitory_plan1_2: [],
        dormitory_plan1_3: [],
        switch_dormitory_plan1_0: [false, false, false],
        switch_dormitory_plan1_1: [false, false, false],
        switch_dormitory_plan1_2: [false, false, false],
        switch_dormitory_plan1_3: [false, false, false],
        // C换班参数
        period_plan2: ["14:00", "19:59"],
        control_plan2: ["阿米娅", "焰尾", "琴柳", "令", "夕"],
        trading_plan2_0: ["孑", "银灰", "崖心"],
        trading_plan2_1: ["但书", "空弦", "黑键"],
        trading_plan2_2: [],
        radio_trading_plan2: ["龙门币", "龙门币", "龙门币"],
        switch_trading_plan2_0: [false, false, false],
        switch_trading_plan2_1: [false, false, false],
        switch_trading_plan2_2: [false, false, false],
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
        switch_manufacture_plan2_0: [false, false, false],
        switch_manufacture_plan2_1: [false, false, false],
        switch_manufacture_plan2_2: [false, false, false],
        switch_manufacture_plan2_3: [false, false, false],
        switch_manufacture_plan2_4: [false, false, false],
        power_plan2_0: ["正义骑士号", "澄闪", "雷蛇"],
        switch_power_plan2_0: [false, false, false],
        switch_power_plan2_1: [false, false, false],
        switch_power_plan2_2: [false, false, false],
        hire_plan2_0: ["絮雨"],
        switch_hire_plan2_0: [false, false, false],
        meeting_plan2_0: ["陈", "守林人"],
        switch_meeting_plan2_0: [false, false, false],
        dormitory_plan2_0: [],
        dormitory_plan2_1: [],
        dormitory_plan2_2: [],
        dormitory_plan2_3: [],
        switch_dormitory_plan2_0: [false, false, false],
        switch_dormitory_plan2_1: [false, false, false],
        switch_dormitory_plan2_2: [false, false, false],
        switch_dormitory_plan2_3: [false, false, false],
      };
    },
    created() {
      this.setJson();
      this.getUid();
      this.getDate();
      this.openNotification();
      this.testMath();
    },
    methods: {
      openNotification() {
        this.$notify({
          title: '2022-11-26更新',
          dangerouslyUseHTMLString: true,
          // message: '<strong> 新增内容：<br>新增3.5周年干员<br>新增深海猎人组合<br>'+
          // 'Bug修复：<br>修复了部分旧排班表导入后无法重新导出的问题<br>修复了无法导出的问题（导出前请先点击生成排班）<br>'+
          // '注意事项<br>换班起止时间不要填写中文冒号（：）需填写英文冒号（:）</strong>',
          message: '<strong> Bug修复：<br>修复了不指定换班时间生成时可能为空字串的问题 </strong>',
          duration: 12000
        });
      },
      MAAURLCopy() {
        let oInput = document.createElement("input");   //创建一个input标签
        oInput.value = this.maaUrl;  //将要复制的值赋值给input
        document.body.appendChild(oInput);  //在页面中插入
        oInput.select(); // 模拟鼠标选中
        document.execCommand("Copy"); // 执行浏览器复制命令（相当于ctrl+c）
        oInput.style.display = "none";  //只是用一下input标签的特性，实际并不需要显示，所以这里要隐藏掉
        this.message.success('复制成功');
      },

      updateVisits() {
        toolApi.updateVisits("building").then(() => {
        });
      },
      setExportUrl() {
        this.exportUrl =
          "https://houduan.yituliu.site/tool/building/schedule/export?uid=" + this.uid;
        this.maaUrl = "maa://infra.yituliu/" + this.uid;
      },
      maaBuildingJsonCreated() {
        this.setJson();
        buildingApi.maaBuildingJsonCreated(this.scheduleJson, this.uid).then((response) => {
          this.$message({
            message: response.data.message + "作业id为：" + response.data.uid,
            type: "success",
            showClose: true,
            duration: 4000,
          });
          this.uid = response.data.uid;
          this.setExportUrl();
        });
        document.getElementById('export_cover').style.display = 'none'
      },
      retrieveSchedule() {
        buildingApi.retrieveSchedule(this.importId).then((response) => {

          this.historicalData = response.data.schedule
          this.importJson()
        });
      },
      getUid() {
        let timestamp = new Date().getTime();
        let randNum = Math.floor(Math.random() * 999) + 1000000000000000;
        this.uid = timestamp * 1000 + randNum - 1000000000000000
      },
      testMath(){
        console.log("生成随机数：",Math.random() * (999));
      },
      getDate() {
        let date = new Date();
        let y = date.getFullYear(); //年
        let m = (date.getMonth() + 1).toString().padStart(2, "0"); //月
        let d = date.getDate().toString().padStart(2, "0"); //日
        let h = date.getHours().toString().padStart(2, "0"); //时
        let mm = date.getMinutes().toString().padStart(2, "0"); //分
        let s = date.getSeconds().toString().padStart(2, "0"); //秒
        this.createTime = `${y}/${m}/${d} ${h}:${mm}:${s}`;
        //  this.time = '2022-08-11'
      },
      setJson() {
        this.scheduleJson = {plans: []};
        let plans_0 = {
          Fiammetta: {target: '', enable: false, order: "pre"},
          drones: {room: "", index: 1, enable: false, order: "pre"},
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
        let plans_1 = {
          Fiammetta: {target: '', enable: false, order: "pre"},
          drones: {room: "", index: 1, enable: false, order: "pre"},
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
        let plans_2 = {
          Fiammetta: {target: '', enable: false, order: "pre"},
          drones: {room: "", index: 1, enable: false, order: "pre"},
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
        this.scheduleJson.author = this.author
        this.scheduleJson.buildingType = this.buildingType
        this.scheduleJson.id = this.uid
        this.scheduleJson.planTimes = this.planTimes
        plans_0.name = this.name[0];
        plans_0.description = this.descriptionH2[0];
        plans_0.period = this.setPeriod(this.period_plan0);

        if (this.switch_Fiammetta_enable[0]) {
          plans_0.Fiammetta.target = this.Fiammetta[0];
          plans_0.Fiammetta.enable = this.switch_Fiammetta_enable[0];
          plans_0.Fiammetta.order = this.getOrder(this.input_Fiammetta_order[0]);
        } else {
          plans_0.Fiammetta = this.getNull()
        }


        plans_0.drones.room = this.getProductValue(this.radio_drones[0]);
        plans_0.drones.index = parseInt(this.radio_drones_index[0]);
        plans_0.drones.enable = this.switch_drones_enable[0];
        plans_0.drones.order = this.getOrder(this.input_drones_order[0]);

        let control_planMap0_0 = {
          operators: this.getList(this.control_plan0)
        };
        if (this.control_skip[0]) {
          control_planMap0_0 = {skip: true}
        }
        plans_0.rooms.control[0] = control_planMap0_0;


        let trading_planMap0_0 = {
          operators: this.getList(this.trading_plan0_0),
          sort: this.switch_trading_plan0_0[0],
          autofill: this.switch_trading_plan0_0[1],
          product: this.getProductValue(this.radio_trading_plan0[0]),
        };
        if (this.switch_trading_plan0_0[2]) {
          trading_planMap0_0 = {skip: true}
        }

        let trading_planMap0_1 = {
          operators: this.getList(this.trading_plan0_1),
          sort: this.switch_trading_plan0_1[0],
          autofill: this.switch_trading_plan0_1[1],
          product: this.getProductValue(this.radio_trading_plan0[1]),
        };
        if (this.switch_trading_plan0_1[2]) {
          trading_planMap0_1 = {skip: true}
        }

        let trading_planMap0_2 = {
          operators: this.getList(this.trading_plan0_2),
          sort: this.switch_trading_plan0_2[0],
          autofill: this.switch_trading_plan0_2[1],
          product: this.getProductValue(this.radio_trading_plan0[2]),
        };
        if (this.switch_trading_plan0_2[2]) {
          trading_planMap0_2 = {skip: true}
        }

        plans_0.rooms.trading[0] = trading_planMap0_0;
        if ("243" === this.buildingType || "333" === this.buildingType || "252" === this.buildingType) {
          plans_0.rooms.trading[1] = trading_planMap0_1;
        }
        if ("333" === this.buildingType) {
          plans_0.rooms.trading[2] = trading_planMap0_2;
        }

        let manufacture_planMap0_0 = {
          operators: this.getList(this.manufacture_plan0_0),
          sort: this.switch_manufacture_plan0_0[0],
          autofill: this.switch_manufacture_plan0_0[1],
          product: this.getProductValue(this.radio_manufacture_plan0[0]),
        };
        if (this.switch_manufacture_plan0_0[2]) {
          manufacture_planMap0_0 = {skip: true}
        }

        let manufacture_planMap0_1 = {
          operators: this.getList(this.manufacture_plan0_1),
          sort: this.switch_manufacture_plan0_1[0],
          autofill: this.switch_manufacture_plan0_1[1],
          product: this.getProductValue(this.radio_manufacture_plan0[1]),
        };
        if (this.switch_manufacture_plan0_1[2]) {
          manufacture_planMap0_1 = {skip: true}
        }

        let manufacture_planMap0_2 = {
          operators: this.getList(this.manufacture_plan0_2),
          sort: this.switch_manufacture_plan0_2[0],
          autofill: this.switch_manufacture_plan0_2[1],
          product: this.getProductValue(this.radio_manufacture_plan0[2]),
        };
        if (this.switch_manufacture_plan0_2[2]) {
          manufacture_planMap0_2 = {skip: true}
        }

        let manufacture_planMap0_3 = {
          operators: this.getList(this.manufacture_plan0_3),
          sort: this.switch_manufacture_plan0_3[0],
          autofill: this.switch_manufacture_plan0_3[1],
          product: this.getProductValue(this.radio_manufacture_plan0[3]),
        };
        if (this.switch_manufacture_plan0_3[2]) {
          manufacture_planMap0_3 = {skip: true}
        }

        let manufacture_planMap0_4 = {
          operators: this.getList(this.manufacture_plan0_4),
          sort: this.switch_manufacture_plan0_4[0],
          autofill: this.switch_manufacture_plan0_4[1],
          product: this.getProductValue(this.radio_manufacture_plan0[4]),
        };
        if (this.switch_manufacture_plan0_4[2]) {
          manufacture_planMap0_4 = {skip: true}
        }

        plans_0.rooms.manufacture[0] = manufacture_planMap0_0;
        plans_0.rooms.manufacture[1] = manufacture_planMap0_1;
        plans_0.rooms.manufacture[2] = manufacture_planMap0_2;
        if ("153" === this.buildingType || "243" === this.buildingType || "252" === this.buildingType) {
          plans_0.rooms.manufacture[3] = manufacture_planMap0_3;
        }
        if ("153" === this.buildingType || "252" === this.buildingType) {
          plans_0.rooms.manufacture[4] = manufacture_planMap0_4;
        }

        let power_planMap0_0 = {
          operators: this.getList([this.power_plan0_0[0]]),
          // sort: this.switch_power_plan0_0[0],
          autofill: this.switch_power_plan0_0[1],
        };
        if (this.switch_power_plan0_0[2]) {
          power_planMap0_0 = {skip: true}
        }

        let power_planMap0_1 = {
          operators: this.getList([this.power_plan0_0[1]]),
          // sort: this.switch_power_plan0_1[0],
          autofill: this.switch_power_plan0_1[1],
        };
        if (this.switch_power_plan0_1[2]) {
          power_planMap0_1 = {skip: true}
        }

        let power_planMap0_2 = {
          operators: this.getList([this.power_plan0_0[2]]),
          // sort: this.switch_power_plan0_2[0],
          autofill: this.switch_power_plan0_2[1],
        };
        if (this.switch_power_plan0_2[2]) {
          power_planMap0_2 = {skip: true}
        }

        plans_0.rooms.power[0] = power_planMap0_0;
        plans_0.rooms.power[1] = power_planMap0_1;
        if (!("252" === this.buildingType)) {
          plans_0.rooms.power[2] = power_planMap0_2;
        }

        let hire_planMap0_0 = {
          operators: this.getList(this.hire_plan0_0),
          // sort: this.switch_hire_plan0_0[0],
          autofill: this.switch_hire_plan0_0[1],
        };
        if (this.switch_hire_plan0_0[2]) {
          hire_planMap0_0 = {skip: true}
        }

        plans_0.rooms.hire[0] = hire_planMap0_0;

        let meeting_planMap0_0 = {
          operators: this.getList(this.meeting_plan0_0),
          // sort: this.switch_meeting_plan0_0[0],
          autofill: this.switch_meeting_plan0_0[1],
        };
        if (this.switch_meeting_plan0_0[2]) {
          meeting_planMap0_0 = {skip: true}
        }

        plans_0.rooms.meeting[0] = meeting_planMap0_0;

        let dormitory_planMap0_0 = {
          operators: this.getList(this.dormitory_plan0_0),
          sort: this.switch_dormitory_plan0_0[0],
          autofill: this.switch_dormitory_plan0_0[1],
        };

        let dormitory_planMap0_1 = {
          operators: this.getList(this.dormitory_plan0_1),
          sort: this.switch_dormitory_plan0_1[0],
          autofill: this.switch_dormitory_plan0_1[1],
        };

        let dormitory_planMap0_2 = {
          operators: this.getList(this.dormitory_plan0_2),
          sort: this.switch_dormitory_plan0_2[0],
          autofill: this.switch_dormitory_plan0_2[1],
        };

        let dormitory_planMap0_3 = {
          operators: this.getList(this.dormitory_plan0_3),
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

        if (this.switch_Fiammetta_enable[1]) {
          plans_1.Fiammetta.target = this.Fiammetta[1];
          plans_1.Fiammetta.enable = this.switch_Fiammetta_enable[1];
          plans_1.Fiammetta.order = this.getOrder(this.input_Fiammetta_order[1]);
        } else {
          plans_1.Fiammetta = this.getNull()
        }

        plans_1.drones.room = this.getProductValue(this.radio_drones[1]);
        plans_1.drones.index = parseInt(this.radio_drones_index[1]);
        plans_1.drones.enable = this.switch_drones_enable[1];
        plans_1.drones.order = this.getOrder(this.input_drones_order[1]);

        let control_planMap1_0 = {
          operators: this.getList(this.control_plan1)
        };
        if (this.control_skip[1]) {
          control_planMap1_0 = {skip: true}
        }
        plans_1.rooms.control[0] = control_planMap1_0;

        let trading_planMap1_0 = {
          operators: this.getList(this.trading_plan1_0),
          sort: this.switch_trading_plan1_0[0],
          autofill: this.switch_trading_plan1_0[1],
          product: this.getProductValue(this.radio_trading_plan1[0]),
        };
        if (this.switch_trading_plan1_0[2]) {
          trading_planMap1_0 = {skip: true}
        }

        let trading_planMap1_1 = {
          operators: this.getList(this.trading_plan1_1),
          sort: this.switch_trading_plan1_1[0],
          autofill: this.switch_trading_plan1_1[1],
          product: this.getProductValue(this.radio_trading_plan1[1]),
        };
        if (this.switch_trading_plan1_1[2]) {
          trading_planMap1_1 = {skip: true}
        }

        let trading_planMap1_2 = {
          operators: this.getList(this.trading_plan1_2),
          sort: this.switch_trading_plan1_2[0],
          autofill: this.switch_trading_plan1_2[1],
          product: this.getProductValue(this.radio_trading_plan1[2]),
        };
        if (this.switch_trading_plan1_2[2]) {
          trading_planMap1_2 = {skip: true}
        }

        plans_1.rooms.trading[0] = trading_planMap1_0;
        if ("243" === this.buildingType || "333" === this.buildingType || "252" === this.buildingType) {
          plans_1.rooms.trading[1] = trading_planMap1_1;
        }
        if ("333" === this.buildingType) {
          plans_1.rooms.trading[2] = trading_planMap1_2;
        }


        let manufacture_planMap1_0 = {
          operators: this.getList(this.manufacture_plan1_0),
          sort: this.switch_manufacture_plan1_0[0],
          autofill: this.switch_manufacture_plan1_0[1],
          product: this.getProductValue(this.radio_manufacture_plan1[0]),
        };
        if (this.switch_manufacture_plan1_0[2]) {
          manufacture_planMap1_0 = {skip: true}
        }

        let manufacture_planMap1_1 = {
          operators: this.getList(this.manufacture_plan1_1),
          sort: this.switch_manufacture_plan1_1[0],
          autofill: this.switch_manufacture_plan1_1[1],
          product: this.getProductValue(this.radio_manufacture_plan1[1]),
        };
        if (this.switch_manufacture_plan1_1[2]) {
          manufacture_planMap1_1 = {skip: true}
        }

        let manufacture_planMap1_2 = {
          operators: this.getList(this.manufacture_plan1_2),
          sort: this.switch_manufacture_plan1_2[0],
          autofill: this.switch_manufacture_plan1_2[1],
          product: this.getProductValue(this.radio_manufacture_plan1[2]),
        };
        if (this.switch_manufacture_plan1_2[2]) {
          manufacture_planMap1_2 = {skip: true}
        }

        let manufacture_planMap1_3 = {
          operators: this.getList(this.manufacture_plan1_3),
          sort: this.switch_manufacture_plan1_3[0],
          autofill: this.switch_manufacture_plan1_3[1],
          product: this.getProductValue(this.radio_manufacture_plan1[3]),
        };
        if (this.switch_manufacture_plan1_3[2]) {
          manufacture_planMap1_3 = {skip: true}
        }

        let manufacture_planMap1_4 = {
          operators: this.getList(this.manufacture_plan1_4),
          sort: this.switch_manufacture_plan1_4[0],
          autofill: this.switch_manufacture_plan1_4[1],
          product: this.getProductValue(this.radio_manufacture_plan1[4]),
        };
        if (this.switch_manufacture_plan1_4[2]) {
          manufacture_planMap1_4 = {skip: true}
        }

        plans_1.rooms.manufacture[0] = manufacture_planMap1_0;
        plans_1.rooms.manufacture[1] = manufacture_planMap1_1;
        plans_1.rooms.manufacture[2] = manufacture_planMap1_2;
        if ("153" === this.buildingType || "243" === this.buildingType || "252" === this.buildingType) {
          plans_1.rooms.manufacture[3] = manufacture_planMap1_3;
        }
        if ("153" === this.buildingType || "252" === this.buildingType) {
          plans_1.rooms.manufacture[4] = manufacture_planMap1_4;
        }


        let power_planMap1_0 = {
          operators: this.getList([this.power_plan1_0[0]]),
          // sort: this.switch_power_plan1_0[0],
          autofill: this.switch_power_plan1_0[1],
        };
        if (this.switch_power_plan1_0[2]) {
          power_planMap1_0 = {skip: true}
        }

        let power_planMap1_1 = {
          operators: this.getList([this.power_plan1_0[1]]),
          // sort: this.switch_power_plan1_1[0],
          autofill: this.switch_power_plan1_1[1],
        };
        if (this.switch_power_plan1_1[2]) {
          power_planMap1_1 = {skip: true}
        }

        let power_planMap1_2 = {
          operators: this.getList([this.power_plan1_0[2]]),
          // sort: this.switch_power_plan1_2[0],
          autofill: this.switch_power_plan1_2[1],
        };
        if (this.switch_power_plan1_2[2]) {
          power_planMap1_2 = {skip: true}
        }

        plans_1.rooms.power[0] = power_planMap1_0;
        plans_1.rooms.power[1] = power_planMap1_1;
        if (!("252" === this.buildingType)) {
          plans_1.rooms.power[2] = power_planMap1_2;
        }

        let hire_planMap1_0 = {
          operators: this.getList(this.hire_plan1_0),
          // sort: this.switch_hire_plan1_0[0],
          autofill: this.switch_hire_plan1_0[1],
        };
        if (this.switch_hire_plan1_0[2]) {
          hire_planMap1_0 = {skip: true}
        }

        plans_1.rooms.hire[0] = hire_planMap1_0;

        let meeting_planMap1_0 = {
          operators: this.getList(this.meeting_plan1_0),
          // sort: this.switch_meeting_plan1_0[0],
          autofill: this.switch_meeting_plan1_0[1],
        };
        if (this.switch_meeting_plan1_0[2]) {
          meeting_planMap1_0 = {skip: true}
        }

        plans_1.rooms.meeting[0] = meeting_planMap1_0;

        let dormitory_planMap1_0 = {
          operators: this.getList(this.dormitory_plan1_0),
          sort: this.switch_dormitory_plan1_0[0],
          autofill: this.switch_dormitory_plan1_0[1],
        };

        let dormitory_planMap1_1 = {
          operators: this.getList(this.dormitory_plan1_1),
          sort: this.switch_dormitory_plan1_1[0],
          autofill: this.switch_dormitory_plan1_1[1],
        };

        let dormitory_planMap1_2 = {
          operators: this.getList(this.dormitory_plan1_2),
          sort: this.switch_dormitory_plan1_2[0],
          autofill: this.switch_dormitory_plan1_2[1],
        };

        let dormitory_planMap1_3 = {
          operators: this.getList(this.dormitory_plan1_3),
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

        if (this.switch_Fiammetta_enable[2]) {
          plans_2.Fiammetta.target = this.Fiammetta[2];
          plans_2.Fiammetta.enable = this.switch_Fiammetta_enable[2];
          plans_2.Fiammetta.order = this.getOrder(this.input_Fiammetta_order[2]);
        } else {
          plans_2.Fiammetta = this.getNull()
        }

        plans_2.drones.room = this.getProductValue(this.radio_drones[2]);
        plans_2.drones.index = parseInt(this.radio_drones_index[2]);
        plans_2.drones.enable = this.switch_drones_enable[2];
        plans_2.drones.order = this.getOrder(this.input_drones_order[2]);

        let control_planMap2_0 = {
          operators: this.getList(this.control_plan2)
        };
        if (this.control_skip[2]) {
          control_planMap2_0 = {skip: true}
        }
        plans_2.rooms.control[0] = control_planMap2_0;

        let trading_planMap2_0 = {
          operators: this.getList(this.trading_plan2_0),
          sort: this.switch_trading_plan2_0[0],
          autofill: this.switch_trading_plan2_0[1],
          product: this.getProductValue(this.radio_trading_plan2[0]),
        };
        if (this.switch_trading_plan2_0[2]) {
          trading_planMap2_0 = {skip: true}
        }

        let trading_planMap2_1 = {
          operators: this.getList(this.trading_plan2_1),
          sort: this.switch_trading_plan2_1[0],
          autofill: this.switch_trading_plan2_1[1],
          product: this.getProductValue(this.radio_trading_plan2[1]),
        };
        if (this.switch_trading_plan2_1[2]) {
          trading_planMap2_1 = {skip: true}
        }

        let trading_planMap2_2 = {
          operators: this.getList(this.trading_plan2_2),
          sort: this.switch_trading_plan2_2[0],
          autofill: this.switch_trading_plan2_2[1],
          product: this.getProductValue(this.radio_trading_plan2[2]),
        };
        if (this.switch_trading_plan2_2[2]) {
          trading_planMap2_2 = {skip: true}
        }

        plans_2.rooms.trading[0] = trading_planMap2_0;
        if ("243" === this.buildingType || "333" === this.buildingType || "252" === this.buildingType) {
          plans_2.rooms.trading[1] = trading_planMap2_1;
        }
        if ("333" === this.buildingType) {
          plans_2.rooms.trading[2] = trading_planMap2_2;
        }

        let manufacture_planMap2_0 = {
          operators: this.getList(this.manufacture_plan2_0),
          sort: this.switch_manufacture_plan2_0[0],
          autofill: this.switch_manufacture_plan2_0[1],
          product: this.getProductValue(this.radio_manufacture_plan2[0]),
        };
        if (this.switch_manufacture_plan2_0[2]) {
          manufacture_planMap2_0 = {skip: true}
        }

        let manufacture_planMap2_1 = {
          operators: this.getList(this.manufacture_plan2_1),
          sort: this.switch_manufacture_plan2_1[0],
          autofill: this.switch_manufacture_plan2_1[1],
          product: this.getProductValue(this.radio_manufacture_plan2[1]),
        };
        if (this.switch_manufacture_plan2_1[2]) {
          manufacture_planMap2_1 = {skip: true}
        }


        let manufacture_planMap2_2 = {
          operators: this.getList(this.manufacture_plan2_2),
          sort: this.switch_manufacture_plan2_2[0],
          autofill: this.switch_manufacture_plan2_2[1],
          product: this.getProductValue(this.radio_manufacture_plan2[2]),
        };
        if (this.switch_manufacture_plan2_2[2]) {
          manufacture_planMap2_2 = {skip: true}
        }

        let manufacture_planMap2_3 = {
          operators: this.getList(this.manufacture_plan2_3),
          sort: this.switch_manufacture_plan2_3[0],
          autofill: this.switch_manufacture_plan2_3[1],
          product: this.getProductValue(this.radio_manufacture_plan2[3]),
        };
        if (this.switch_manufacture_plan2_3[2]) {
          manufacture_planMap2_3 = {skip: true}
        }

        let manufacture_planMap2_4 = {
          operators: this.getList(this.manufacture_plan2_4),
          sort: this.switch_manufacture_plan2_4[0],
          autofill: this.switch_manufacture_plan2_4[1],
          product: this.getProductValue(this.radio_manufacture_plan2[4]),
        };
        if (this.switch_manufacture_plan2_4[2]) {
          manufacture_planMap2_4 = {skip: true}
        }

        plans_2.rooms.manufacture[0] = manufacture_planMap2_0;
        plans_2.rooms.manufacture[1] = manufacture_planMap2_1;
        plans_2.rooms.manufacture[2] = manufacture_planMap2_2;
        if ("153" === this.buildingType || "243" === this.buildingType || "252" === this.buildingType) {
          plans_2.rooms.manufacture[3] = manufacture_planMap2_3;
        }
        if ("153" === this.buildingType || "252" === this.buildingType) {
          plans_2.rooms.manufacture[4] = manufacture_planMap2_4;
        }

        let power_planMap2_0 = {
          operators: this.getList([this.power_plan2_0[0]]),
          // sort: this.switch_power_plan2_0[0],
          autofill: this.switch_power_plan2_0[1],
        };
        if (this.switch_power_plan2_0[2]) {
          power_planMap2_0 = {skip: true}
        }

        let power_planMap2_1 = {
          operators: this.getList([this.power_plan2_0[1]]),
          // sort: this.switch_power_plan2_1[0],
          autofill: this.switch_power_plan2_1[1],
        };
        if (this.switch_power_plan2_1[2]) {
          power_planMap2_1 = {skip: true}
        }

        let power_planMap2_2 = {
          operators: this.getList([this.power_plan2_0[2]]),
          // sort: this.switch_power_plan2_2[0],
          autofill: this.switch_power_plan2_2[1],
        };
        if (this.switch_power_plan2_2[2]) {
          power_planMap2_2 = {skip: true}
        }


        plans_2.rooms.power[0] = power_planMap2_0;
        plans_2.rooms.power[1] = power_planMap2_1;
        if (!("252" === this.buildingType)) {
          plans_2.rooms.power[2] = power_planMap2_2;
        }

        let hire_planMap2_0 = {
          operators: this.getList(this.hire_plan2_0),
          // sort: this.switch_hire_plan2_0[0],
          autofill: this.switch_hire_plan2_0[1],
        };
        if (this.switch_hire_plan2_0[2]) {
          hire_planMap2_0 = {skip: true}
        }

        plans_2.rooms.hire[0] = hire_planMap2_0;

        let meeting_planMap2_0 = {
          operators: this.getList(this.meeting_plan2_0),
          // sort: this.switch_meeting_plan2_0[0],
          autofill: this.switch_meeting_plan2_0[1],
        };
        if (this.switch_meeting_plan2_0[2]) {
          meeting_planMap2_0 = {skip: true}
        }

        plans_2.rooms.meeting[0] = meeting_planMap2_0;

        let dormitory_planMap2_0 = {
          operators: this.getList(this.dormitory_plan2_0),
          sort: this.switch_dormitory_plan2_0[0],
          autofill: this.switch_dormitory_plan2_0[1],
        };

        let dormitory_planMap2_1 = {
          operators: this.getList(this.dormitory_plan2_1),
          sort: this.switch_dormitory_plan2_1[0],
          autofill: this.switch_dormitory_plan2_1[1],
        };

        let dormitory_planMap2_2 = {
          operators: this.getList(this.dormitory_plan2_2),
          sort: this.switch_dormitory_plan2_2[0],
          autofill: this.switch_dormitory_plan2_2[1],
        };

        let dormitory_planMap2_3 = {
          operators: this.getList(this.dormitory_plan2_3),
          sort: this.switch_dormitory_plan2_3[0],
          autofill: this.switch_dormitory_plan2_3[1],
        };

        plans_2.rooms.dormitory[0] = dormitory_planMap2_0;
        plans_2.rooms.dormitory[1] = dormitory_planMap2_1;
        plans_2.rooms.dormitory[2] = dormitory_planMap2_2;
        plans_2.rooms.dormitory[3] = dormitory_planMap2_3;


        this.scheduleJson.plans.push(plans_0);
        this.scheduleJson.plans.push(plans_1);
        if ('3班' === this.planTimes)
          this.scheduleJson.plans.push(plans_2);

      },


      importJson() {
        this.title = this.historicalData.title;
        this.descriptionH1 = this.historicalData.description;
        this.author = this.historicalData.author;
        this.buildingType = this.historicalData.buildingType;
        this.planTimes = this.getPlanTimes(this.historicalData.plans.length);

        // 导入A班的信息-------------------------------------------------------------------------------
        console.log("基建类型", this.historicalData.buildingType)
        this.name[0] = this.historicalData.plans[0].name;    //创作者姓名
        this.descriptionH2[0] = this.historicalData.plans[0].description;  //文件描述

        if (undefined === this.historicalData.plans[0].period) {
          this.period_plan0 = [];
        } else {
          this.period_plan0 = this.getPeriodReverse(this.historicalData.plans[0].period);
        }


        if (undefined === this.historicalData.plans[0].Fiammetta) {
          this.switch_Fiammetta_enable[0] = false;
        } else {
          this.Fiammetta[0] = this.historicalData.plans[0].Fiammetta.target;
          this.switch_Fiammetta_enable[0] = true;
          this.input_Fiammetta_order[0] = this.getOrderReverse(this.historicalData.plans[0].Fiammetta.order);
        }

        this.radio_drones[0] = this.getProductValueReverse(this.historicalData.plans[0].drones.room);
        this.radio_drones_index[0] = this.historicalData.plans[0].drones.index;
        this.switch_drones_enable[0] = this.historicalData.plans[0].drones.enable;
        this.input_drones_order[0] = this.getOrderReverse(this.historicalData.plans[0].drones.order);


        if (this.historicalData.plans[0].rooms.control[0].skip) {
          this.control_skip[0] = true;
        } else {
          this.control_plan0 = this.historicalData.plans[0].rooms.control[0].operators;
        }


        if (this.historicalData.plans[0].rooms.trading[0].skip) {
          this.switch_trading_plan0_0[2] = true;
        } else {
          this.trading_plan0_0 = this.historicalData.plans[0].rooms.trading[0].operators;
          this.switch_trading_plan0_0[0] = this.historicalData.plans[0].rooms.trading[0].sort;
          this.switch_trading_plan0_0[1] = this.historicalData.plans[0].rooms.trading[0].autofill;
          this.radio_trading_plan0[0] = this.getProductValueReverse(this.historicalData.plans[0].rooms.trading[0].product);
        }



        if ('333' === this.historicalData.buildingType || '243' === this.historicalData.buildingType || '252' === this.historicalData.buildingType) {
          if (this.historicalData.plans[0].rooms.trading[1].skip) {
            this.switch_trading_plan0_1[2] = true;
          } else {
            this.trading_plan0_1 = this.historicalData.plans[0].rooms.trading[1].operators;
            this.switch_trading_plan0_1[0] = this.historicalData.plans[0].rooms.trading[1].sort;
            this.switch_trading_plan0_1[1] = this.historicalData.plans[0].rooms.trading[1].autofill;
            this.radio_trading_plan0[1] = this.getProductValueReverse(this.historicalData.plans[0].rooms.trading[1].product);
          }

        }


        if ('333' === this.historicalData.buildingType) {
          if (this.historicalData.plans[0].rooms.trading[2].skip) {
            this.switch_trading_plan0_2[2] = true;
          } else {
            this.trading_plan0_2 = this.historicalData.plans[0].rooms.trading[2].operators;
            this.switch_trading_plan0_2[0] = this.historicalData.plans[0].rooms.trading[2].sort;
            this.switch_trading_plan0_2[1] = this.historicalData.plans[0].rooms.trading[2].autofill;
            this.radio_trading_plan0[2] = this.getProductValueReverse(this.historicalData.plans[0].rooms.trading[2].product);
          }

        }


        if (this.historicalData.plans[0].rooms.manufacture[0].skip) {
          this.switch_manufacture_plan0_0[2] = true;
        } else {
          this.manufacture_plan0_0 = this.historicalData.plans[0].rooms.manufacture[0].operators;
          this.switch_manufacture_plan0_0[0] = this.historicalData.plans[0].rooms.manufacture[0].sort;
          this.switch_manufacture_plan0_0[1] = this.historicalData.plans[0].rooms.manufacture[0].autofill;
          this.radio_manufacture_plan0[0] = this.getProductValueReverse(this.historicalData.plans[0].rooms.manufacture[0].product);
        }


        if (this.historicalData.plans[0].rooms.manufacture[1].skip) {
          this.switch_manufacture_plan0_1[2] = true;
        } else {
          this.manufacture_plan0_1 = this.historicalData.plans[0].rooms.manufacture[1].operators;
          this.switch_manufacture_plan0_1[0] = this.historicalData.plans[0].rooms.manufacture[1].sort;
          this.switch_manufacture_plan0_1[1] = this.historicalData.plans[0].rooms.manufacture[1].autofill;
          this.radio_manufacture_plan0[1] = this.getProductValueReverse(this.historicalData.plans[0].rooms.manufacture[1].product);
        }


        if (this.historicalData.plans[0].rooms.manufacture[2].skip) {
          this.switch_manufacture_plan0_2[2] = true;
        } else {
          this.manufacture_plan0_2 = this.historicalData.plans[0].rooms.manufacture[2].operators;
          this.switch_manufacture_plan0_2[0] = this.historicalData.plans[0].rooms.manufacture[2].sort;
          this.switch_manufacture_plan0_2[1] = this.historicalData.plans[0].rooms.manufacture[2].autofill;
          this.radio_manufacture_plan0[2] = this.getProductValueReverse(this.historicalData.plans[0].rooms.manufacture[2].product);
        }


        if ('243' === this.historicalData.buildingType || '153' === this.historicalData.buildingType || '252' === this.historicalData.buildingType) {
          if (this.historicalData.plans[0].rooms.manufacture[3].skip) {
            this.switch_manufacture_plan0_3[2] = true;
          } else {
            this.manufacture_plan0_3 = this.historicalData.plans[0].rooms.manufacture[3].operators;
            this.switch_manufacture_plan0_3[0] = this.historicalData.plans[0].rooms.manufacture[3].sort;
            this.switch_manufacture_plan0_3[1] = this.historicalData.plans[0].rooms.manufacture[3].autofill;
            this.radio_manufacture_plan0[3] = this.getProductValueReverse(this.historicalData.plans[0].rooms.manufacture[3].product);
          }

        }


        if ('153' === this.historicalData.buildingType || '252' === this.historicalData.buildingType) {
          if (this.historicalData.plans[0].rooms.manufacture[4].skip) {
            this.switch_manufacture_plan0_4[2] = true;
          } else {
            this.manufacture_plan0_4 = this.historicalData.plans[0].rooms.manufacture[4].operators;
            this.switch_manufacture_plan0_4[0] = this.historicalData.plans[0].rooms.manufacture[4].sort;
            this.switch_manufacture_plan0_4[1] = this.historicalData.plans[0].rooms.manufacture[4].autofill;
            this.radio_manufacture_plan0[4] = this.getProductValueReverse(this.historicalData.plans[0].rooms.manufacture[4].product);
          }

        }


        if (this.historicalData.plans[0].rooms.power[0].skip) {
          this.switch_power_plan0_0[2] = true;
        } else {
          this.power_plan0_0[0] = this.historicalData.plans[0].rooms.power[0].operators[0];
          this.switch_power_plan0_0[1] = this.historicalData.plans[0].rooms.power[0].autofill;
        }


        if (this.historicalData.plans[0].rooms.power[1].skip) {
          this.switch_power_plan0_1[2] = true;
        } else {
          this.power_plan0_0[1] = this.historicalData.plans[0].rooms.power[1].operators[0];
          this.switch_power_plan0_1[1] = this.historicalData.plans[0].rooms.power[1].autofill;
        }


        if (!('252' === this.historicalData.buildingType)) {
          if (this.historicalData.plans[0].rooms.power[2].skip) {
            this.switch_power_plan0_2[2] = true;
          } else {

            this.power_plan0_0[2] = this.historicalData.plans[0].rooms.power[2].operators[0]
            this.switch_power_plan0_2[1] = this.historicalData.plans[0].rooms.power[2].autofill;
          }

        }


        if (this.historicalData.plans[0].rooms.hire[0].skip) {
          this.switch_hire_plan0_0[2] = true;
        } else {
          this.hire_plan0_0 = this.historicalData.plans[0].rooms.hire[0].operators;
          this.switch_hire_plan0_0[1] = this.historicalData.plans[0].rooms.hire[0].autofill;
        }


        if (this.historicalData.plans[0].rooms.meeting[0].skip) {
          this.switch_meeting_plan0_0[2] = true;
        } else {
          this.meeting_plan0_0 = this.historicalData.plans[0].rooms.meeting[0].operators;
          this.switch_meeting_plan0_0[1] = this.historicalData.plans[0].rooms.meeting[0].autofill;
        }


        if (undefined === this.historicalData.plans[0].rooms.dormitory[1].operators) {

        } else {
          if (this.historicalData.plans[0].rooms.dormitory[0].skip) {
            this.switch_dormitory_plan0_0[2] = true;
          } else {
            this.dormitory_plan0_0 = this.historicalData.plans[0].rooms.dormitory[0].operators;
            this.switch_dormitory_plan0_0[0] = this.historicalData.plans[0].rooms.dormitory[0].sort;
            this.switch_dormitory_plan0_0[1] = this.historicalData.plans[0].rooms.dormitory[0].autofill;
          }

        }


        if (undefined === this.historicalData.plans[0].rooms.dormitory[1].operators) {

        } else {
          if (this.historicalData.plans[0].rooms.dormitory[1].skip) {
            this.switch_dormitory_plan0_1[2] = true;
          } else {
            this.dormitory_plan0_1 = this.historicalData.plans[0].rooms.dormitory[1].operators;
            this.switch_dormitory_plan0_1[0] = this.historicalData.plans[0].rooms.dormitory[1].sort;
            this.switch_dormitory_plan0_1[1] = this.historicalData.plans[0].rooms.dormitory[1].autofill;
          }

        }


        if (undefined === this.historicalData.plans[0].rooms.dormitory[2].operators) {

        } else {
          if (this.historicalData.plans[0].rooms.dormitory[2].skip) {
            this.switch_dormitory_plan0_2[2] = true;
          } else {
            this.dormitory_plan0_2 = this.historicalData.plans[0].rooms.dormitory[2].operators;
            this.switch_dormitory_plan0_2[0] = this.historicalData.plans[0].rooms.dormitory[2].sort;
            this.switch_dormitory_plan0_2[1] = this.historicalData.plans[0].rooms.dormitory[2].autofill;
          }

        }


        if (undefined === this.historicalData.plans[0].rooms.dormitory[3].operators) {

        } else {
          if (this.historicalData.plans[0].rooms.dormitory[3].skip) {
            this.switch_dormitory_plan0_3[2] = true;
          } else {
            this.dormitory_plan0_3 = this.historicalData.plans[0].rooms.dormitory[3].operators;
            this.switch_dormitory_plan0_3[0] = this.historicalData.plans[0].rooms.dormitory[3].sort;
            this.switch_dormitory_plan0_3[1] = this.historicalData.plans[0].rooms.dormitory[3].autofill;
          }

        }


        // 导入B班的信息-------------------------------------------------------------------------------
        this.name[1] = this.historicalData.plans[1].name;
        this.descriptionH2[1] = this.historicalData.plans[1].description;

        if (undefined === this.historicalData.plans[1].period) {
          this.period_plan1 = [];
        } else {
          this.period_plan1 = this.getPeriodReverse(this.historicalData.plans[1].period);
        }


        if (undefined === this.historicalData.plans[1].Fiammetta) {
          this.switch_Fiammetta_enable[1] = false;
        } else {
          this.Fiammetta[1] = this.historicalData.plans[1].Fiammetta.target;
          this.switch_Fiammetta_enable[1] = true;
          this.input_Fiammetta_order[1] = this.getOrderReverse(this.historicalData.plans[1].Fiammetta.order);
        }

        this.radio_drones[1] = this.getProductValueReverse(this.historicalData.plans[1].drones.room);
        this.radio_drones_index[1] = this.historicalData.plans[1].drones.index;
        this.switch_drones_enable[1] = this.historicalData.plans[1].drones.enable;
        this.input_drones_order[1] = this.getOrderReverse(this.historicalData.plans[1].drones.order);

        if (this.historicalData.plans[1].rooms.control[0].skip) {
          this.control_skip[1] = true;
        } else {
          this.control_plan1 = this.historicalData.plans[1].rooms.control[0].operators;
        }


        if (this.historicalData.plans[1].rooms.trading[0].skip) {
          this.switch_trading_plan1_0[2] = true;
        } else {
          this.trading_plan1_0 = this.historicalData.plans[1].rooms.trading[0].operators;
          this.switch_trading_plan1_0[0] = this.historicalData.plans[1].rooms.trading[0].sort;
          this.switch_trading_plan1_0[1] = this.historicalData.plans[1].rooms.trading[0].autofill;
          this.radio_trading_plan1[0] = this.getProductValueReverse(this.historicalData.plans[1].rooms.trading[0].product);
        }


        if ('333' === this.historicalData.buildingType || '243' === this.historicalData.buildingType || '252' === this.historicalData.buildingType) {
          if (this.historicalData.plans[1].rooms.trading[1].skip) {
            this.switch_trading_plan1_1[2] = true;
          } else {
            this.trading_plan1_1 = this.historicalData.plans[1].rooms.trading[1].operators;
            this.switch_trading_plan1_1[0] = this.historicalData.plans[1].rooms.trading[1].sort;
            this.switch_trading_plan1_1[1] = this.historicalData.plans[1].rooms.trading[1].autofill;
            this.radio_trading_plan1[1] = this.getProductValueReverse(this.historicalData.plans[1].rooms.trading[1].product);
          }

        }


        if ('333' === this.historicalData.buildingType) {
          if (this.historicalData.plans[1].rooms.trading[2].skip) {
            this.switch_trading_plan1_2[2] = true;
          } else {
            this.trading_plan1_2 = this.historicalData.plans[1].rooms.trading[2].operators;
            this.switch_trading_plan1_2[0] = this.historicalData.plans[1].rooms.trading[2].sort;
            this.switch_trading_plan1_2[1] = this.historicalData.plans[1].rooms.trading[2].autofill;
            this.radio_trading_plan1[2] = this.getProductValueReverse(this.historicalData.plans[1].rooms.trading[2].product);
          }

        }


        if (this.historicalData.plans[1].rooms.manufacture[0].skip) {
          this.switch_manufacture_plan1_0[2] = true;
        } else {
          this.manufacture_plan1_0 = this.historicalData.plans[1].rooms.manufacture[0].operators;
          this.switch_manufacture_plan1_0[0] = this.historicalData.plans[1].rooms.manufacture[0].sort;
          this.switch_manufacture_plan1_0[1] = this.historicalData.plans[1].rooms.manufacture[0].autofill;
          this.radio_manufacture_plan1[0] = this.getProductValueReverse(this.historicalData.plans[1].rooms.manufacture[0].product);
        }


        if (this.historicalData.plans[1].rooms.manufacture[1].skip) {
          this.switch_manufacture_plan1_1[2] = true;
        } else {
          this.manufacture_plan1_1 = this.historicalData.plans[1].rooms.manufacture[1].operators;
          this.switch_manufacture_plan1_1[0] = this.historicalData.plans[1].rooms.manufacture[1].sort;
          this.switch_manufacture_plan1_1[1] = this.historicalData.plans[1].rooms.manufacture[1].autofill;
          this.radio_manufacture_plan1[1] = this.getProductValueReverse(this.historicalData.plans[1].rooms.manufacture[1].product);
        }


        if (this.historicalData.plans[1].rooms.manufacture[2].skip) {
          this.switch_manufacture_plan1_2[2] = true;
        } else {
          this.manufacture_plan1_2 = this.historicalData.plans[1].rooms.manufacture[2].operators;
          this.switch_manufacture_plan1_2[0] = this.historicalData.plans[1].rooms.manufacture[2].sort;
          this.switch_manufacture_plan1_2[1] = this.historicalData.plans[1].rooms.manufacture[2].autofill;
          this.radio_manufacture_plan1[2] = this.getProductValueReverse(this.historicalData.plans[1].rooms.manufacture[2].product);
        }


        if ('243' === this.historicalData.buildingType || '153' === this.historicalData.buildingType || '252' === this.historicalData.buildingType) {
          if (this.historicalData.plans[1].rooms.manufacture[3].skip) {
            this.switch_manufacture_plan1_3[2] = true;
          } else {
            this.manufacture_plan1_3 = this.historicalData.plans[1].rooms.manufacture[3].operators;
            this.switch_manufacture_plan1_3[0] = this.historicalData.plans[1].rooms.manufacture[3].sort;
            this.switch_manufacture_plan1_3[1] = this.historicalData.plans[1].rooms.manufacture[3].autofill;
            this.radio_manufacture_plan1[3] = this.getProductValueReverse(this.historicalData.plans[1].rooms.manufacture[3].product);
          }

        }

        if ('153' === this.historicalData.buildingType || '252' === this.historicalData.buildingType) {
          if (this.historicalData.plans[1].rooms.manufacture[4].skip) {
            this.switch_manufacture_plan1_4[2] = true;
          } else {
            this.manufacture_plan1_4 = this.historicalData.plans[1].rooms.manufacture[4].operators;
            this.switch_manufacture_plan1_4[0] = this.historicalData.plans[1].rooms.manufacture[4].sort;
            this.switch_manufacture_plan1_4[1] = this.historicalData.plans[1].rooms.manufacture[4].autofill;
            this.radio_manufacture_plan1[4] = this.getProductValueReverse(this.historicalData.plans[1].rooms.manufacture[4].product);
          }

        }


        if (this.historicalData.plans[1].rooms.power[0].skip) {
          this.switch_power_plan1_0[2] = true;
        } else {
          this.power_plan1_0[0] = this.historicalData.plans[1].rooms.power[0].operators[0];
          this.switch_power_plan1_0[1] = this.historicalData.plans[1].rooms.power[0].autofill;
        }


        if (this.historicalData.plans[1].rooms.power[1].skip) {
          this.switch_power_plan1_1[2] = true;
        } else {
          this.power_plan1_0[1] = this.historicalData.plans[1].rooms.power[1].operators[0];
          this.switch_power_plan1_1[1] = this.historicalData.plans[1].rooms.power[1].autofill;
        }


        if (!('252' === this.historicalData.buildingType)) {
          if (this.historicalData.plans[1].rooms.power[2].skip) {
            this.switch_power_plan1_2[2] = true;
          } else {

            this.power_plan1_0[2] = this.historicalData.plans[1].rooms.power[2].operators[0];
            this.switch_power_plan1_2[1] = this.historicalData.plans[1].rooms.power[2].autofill;
          }

        }


        if (this.historicalData.plans[1].rooms.hire[0].skip) {
          this.switch_hire_plan1_0[2] = true;
        } else {
          this.hire_plan1_0 = this.historicalData.plans[1].rooms.hire[0].operators;
          this.switch_hire_plan1_0[1] = this.historicalData.plans[1].rooms.hire[0].autofill;
        }


        if (this.historicalData.plans[1].rooms.meeting[0].skip) {
          this.switch_meeting_plan1_0[2] = true;
        } else {
          this.meeting_plan1_0 = this.historicalData.plans[1].rooms.meeting[0].operators;
          this.switch_meeting_plan1_0[1] = this.historicalData.plans[1].rooms.meeting[0].autofill;
        }


        if (undefined === this.historicalData.plans[1].rooms.dormitory[0].operators) {

        } else {
          if (this.historicalData.plans[1].rooms.dormitory[0].skip) {
            this.switch_dormitory_plan1_0[2] = true;
          } else {
            this.dormitory_plan1_0 = this.historicalData.plans[1].rooms.dormitory[0].operators;
            this.switch_dormitory_plan1_0[0] = this.historicalData.plans[1].rooms.dormitory[0].sort;
            this.switch_dormitory_plan1_0[1] = this.historicalData.plans[1].rooms.dormitory[0].autofill;
          }

        }


        if (undefined === this.historicalData.plans[1].rooms.dormitory[1].operators) {

        } else {
          if (this.historicalData.plans[1].rooms.dormitory[1].skip) {
            this.switch_dormitory_plan1_1[2] = true;
          } else {
            this.dormitory_plan1_1 = this.historicalData.plans[1].rooms.dormitory[1].operators;
            this.switch_dormitory_plan1_1[0] = this.historicalData.plans[1].rooms.dormitory[1].sort;
            this.switch_dormitory_plan1_1[1] = this.historicalData.plans[1].rooms.dormitory[1].autofill;
          }

        }


        if (undefined === this.historicalData.plans[1].rooms.dormitory[2].operators) {

        } else {
          if (this.historicalData.plans[1].rooms.dormitory[2].skip) {
            this.switch_dormitory_plan1_2[2] = true;
          } else {
            this.dormitory_plan1_2 = this.historicalData.plans[1].rooms.dormitory[2].operators;
            this.switch_dormitory_plan1_2[0] = this.historicalData.plans[1].rooms.dormitory[2].sort;
            this.switch_dormitory_plan1_2[1] = this.historicalData.plans[1].rooms.dormitory[2].autofill;
          }
        }


        if (undefined === this.historicalData.plans[1].rooms.dormitory[3].operators) {

        } else {
          if (this.historicalData.plans[1].rooms.dormitory[3].skip) {
            this.switch_dormitory_plan1_3[2] = true;
          } else {
            this.dormitory_plan1_3 = this.historicalData.plans[1].rooms.dormitory[3].operators;
            this.switch_dormitory_plan1_3[0] = this.historicalData.plans[1].rooms.dormitory[3].sort;
            this.switch_dormitory_plan1_3[1] = this.historicalData.plans[1].rooms.dormitory[3].autofill;
          }
        }

        // 导入C班的信息-------------------------------------------------------------------------------

        if (this.historicalData.plans.length > 2) {
          this.name[2] = this.historicalData.plans[2].name;
          this.descriptionH2[2] = this.historicalData.plans[2].description;

          if (undefined === this.historicalData.plans[2].period) {
            this.period_plan2 = [];
          } else {
            this.period_plan2 = this.getPeriodReverse(this.historicalData.plans[2].period);
          }

          if (undefined === this.historicalData.plans[2].Fiammetta) {
            this.switch_Fiammetta_enable[2] = false;
          } else {
            this.Fiammetta[2] = this.historicalData.plans[2].Fiammetta.target;
            this.switch_Fiammetta_enable[2] = true;
            this.input_Fiammetta_order[2] = this.getOrderReverse(this.historicalData.plans[2].Fiammetta.order);
          }

          this.radio_drones[2] = this.getProductValueReverse(this.historicalData.plans[2].drones.room);
          this.radio_drones_index[2] = this.historicalData.plans[2].drones.index;
          this.switch_drones_enable[2] = this.historicalData.plans[2].drones.enable;
          this.input_drones_order[2] = this.getOrderReverse(this.historicalData.plans[2].drones.order);

          if (this.historicalData.plans[2].rooms.control[0].skip) {
            this.control_skip[2] = true;
            if (undefined !== this.historicalData.plans[2].rooms.control[0].operators) {
              this.control_plan2 = this.historicalData.plans[2].rooms.control[0].operators;
            }

          } else {
            this.control_plan2 = this.historicalData.plans[2].rooms.control[0].operators;
          }


          if (this.historicalData.plans[2].rooms.trading[0].skip) {
            this.switch_trading_plan2_0[2] = true;
            if (undefined !== this.historicalData.plans[2].rooms.trading[0].operators) {
              this.trading_plan2_0 = this.historicalData.plans[2].rooms.trading[0].operators;
              this.switch_trading_plan2_0[0] = this.historicalData.plans[2].rooms.trading[0].sort;
              this.switch_trading_plan2_0[1] = this.historicalData.plans[2].rooms.trading[0].autofill;
              this.radio_trading_plan2[0] = this.getProductValueReverse(this.historicalData.plans[2].rooms.trading[0].product);
            }

          } else {
            this.trading_plan2_0 = this.historicalData.plans[2].rooms.trading[0].operators;
            this.switch_trading_plan2_0[0] = this.historicalData.plans[2].rooms.trading[0].sort;
            this.switch_trading_plan2_0[1] = this.historicalData.plans[2].rooms.trading[0].autofill;
            this.radio_trading_plan2[0] = this.getProductValueReverse(this.historicalData.plans[2].rooms.trading[0].product);
          }


          if ('333' === this.historicalData.buildingType || '243' === this.historicalData.buildingType || '252' === this.historicalData.buildingType) {
            if (this.historicalData.plans[2].rooms.trading[1].skip) {
              this.switch_trading_plan2_1[2] = true;
              if (undefined !== this.historicalData.plans[2].rooms.trading[1].operators) {
                this.trading_plan2_1 = this.historicalData.plans[2].rooms.trading[1].operators;
                this.switch_trading_plan2_1[0] = this.historicalData.plans[2].rooms.trading[1].sort;
                this.switch_trading_plan2_1[1] = this.historicalData.plans[2].rooms.trading[1].autofill;
                this.radio_trading_plan2[1] = this.getProductValueReverse(this.historicalData.plans[2].rooms.trading[1].product);
              }

            } else {
              this.trading_plan2_1 = this.historicalData.plans[2].rooms.trading[1].operators;
              this.switch_trading_plan2_1[0] = this.historicalData.plans[2].rooms.trading[1].sort;
              this.switch_trading_plan2_1[1] = this.historicalData.plans[2].rooms.trading[1].autofill;
              this.radio_trading_plan2[1] = this.getProductValueReverse(this.historicalData.plans[2].rooms.trading[1].product);
            }

          }


          if ('333' === this.historicalData.buildingType) {
            if (this.historicalData.plans[2].rooms.trading[2].skip) {
              this.switch_trading_plan2_2[2] = true;
              if (undefined !== this.historicalData.plans[2].rooms.trading[2].operators) {
                this.trading_plan2_2 = this.historicalData.plans[2].rooms.trading[2].operators;
                this.switch_trading_plan2_2[0] = this.historicalData.plans[2].rooms.trading[2].sort;
                this.switch_trading_plan2_2[1] = this.historicalData.plans[2].rooms.trading[2].autofill;
                this.radio_trading_plan2[2] = this.getProductValueReverse(this.historicalData.plans[2].rooms.trading[2].product);
              }

            } else {
              this.trading_plan2_2 = this.historicalData.plans[2].rooms.trading[2].operators;
              this.switch_trading_plan2_2[0] = this.historicalData.plans[2].rooms.trading[2].sort;
              this.switch_trading_plan2_2[1] = this.historicalData.plans[2].rooms.trading[2].autofill;
              this.radio_trading_plan2[2] = this.getProductValueReverse(this.historicalData.plans[2].rooms.trading[2].product);
            }

          }


          if (this.historicalData.plans[2].rooms.manufacture[0].skip) {
            this.switch_manufacture_plan2_0[2] = true;
            if (undefined !== this.historicalData.plans[2].rooms.manufacture[0].operators) {
              this.manufacture_plan2_0 = this.historicalData.plans[2].rooms.manufacture[0].operators;
              this.switch_manufacture_plan2_0[0] = this.historicalData.plans[2].rooms.manufacture[0].sort;
              this.switch_manufacture_plan2_0[1] = this.historicalData.plans[2].rooms.manufacture[0].autofill;
              this.radio_manufacture_plan2[0] = this.getProductValueReverse(this.historicalData.plans[2].rooms.manufacture[0].product);
            }

          } else {
            this.manufacture_plan2_0 = this.historicalData.plans[2].rooms.manufacture[0].operators;
            this.switch_manufacture_plan2_0[0] = this.historicalData.plans[2].rooms.manufacture[0].sort;
            this.switch_manufacture_plan2_0[1] = this.historicalData.plans[2].rooms.manufacture[0].autofill;
            this.radio_manufacture_plan2[0] = this.getProductValueReverse(this.historicalData.plans[2].rooms.manufacture[0].product);
          }


          if (this.historicalData.plans[2].rooms.manufacture[1].skip) {
            this.switch_manufacture_plan2_1[2] = true;
            if (undefined !== this.historicalData.plans[2].rooms.manufacture[1].operators) {
              this.manufacture_plan2_1 = this.historicalData.plans[2].rooms.manufacture[1].operators;
              this.switch_manufacture_plan2_1[0] = this.historicalData.plans[2].rooms.manufacture[1].sort;
              this.switch_manufacture_plan2_1[1] = this.historicalData.plans[2].rooms.manufacture[1].autofill;
              this.radio_manufacture_plan2[1] = this.getProductValueReverse(this.historicalData.plans[2].rooms.manufacture[1].product);
            }

          } else {
            this.manufacture_plan2_1 = this.historicalData.plans[2].rooms.manufacture[1].operators;
            this.switch_manufacture_plan2_1[0] = this.historicalData.plans[2].rooms.manufacture[1].sort;
            this.switch_manufacture_plan2_1[1] = this.historicalData.plans[2].rooms.manufacture[1].autofill;
            this.radio_manufacture_plan2[1] = this.getProductValueReverse(this.historicalData.plans[2].rooms.manufacture[1].product);
          }


          if (this.historicalData.plans[2].rooms.manufacture[2].skip) {
            this.switch_manufacture_plan2_2[2] = true;
            if (undefined !== this.historicalData.plans[2].rooms.manufacture[2].operators) {
              this.manufacture_plan2_2 = this.historicalData.plans[2].rooms.manufacture[2].operators;
              this.switch_manufacture_plan2_2[0] = this.historicalData.plans[2].rooms.manufacture[2].sort;
              this.switch_manufacture_plan2_2[1] = this.historicalData.plans[2].rooms.manufacture[2].autofill;
              this.radio_manufacture_plan2[2] = this.getProductValueReverse(this.historicalData.plans[2].rooms.manufacture[2].product);
            }

          } else {
            this.manufacture_plan2_2 = this.historicalData.plans[2].rooms.manufacture[2].operators;
            this.switch_manufacture_plan2_2[0] = this.historicalData.plans[2].rooms.manufacture[2].sort;
            this.switch_manufacture_plan2_2[1] = this.historicalData.plans[2].rooms.manufacture[2].autofill;
            this.radio_manufacture_plan2[2] = this.getProductValueReverse(this.historicalData.plans[2].rooms.manufacture[2].product);
          }



          if ('243' === this.historicalData.buildingType || '153' === this.historicalData.buildingType || '252' === this.historicalData.buildingType) {
            if (this.historicalData.plans[2].rooms.manufacture[3].skip) {
              this.switch_manufacture_plan2_3[2] = true;
              if (undefined !== this.historicalData.plans[2].rooms.manufacture[3].operators) {
                this.manufacture_plan2_3 = this.historicalData.plans[2].rooms.manufacture[3].operators;
                this.switch_manufacture_plan2_3[0] = this.historicalData.plans[2].rooms.manufacture[3].sort;
                this.switch_manufacture_plan2_3[1] = this.historicalData.plans[2].rooms.manufacture[3].autofill;
                this.radio_manufacture_plan2[3] = this.getProductValueReverse(this.historicalData.plans[2].rooms.manufacture[3].product);
              }

            } else {
              this.manufacture_plan2_3 = this.historicalData.plans[2].rooms.manufacture[3].operators;
              this.switch_manufacture_plan2_3[0] = this.historicalData.plans[2].rooms.manufacture[3].sort;
              this.switch_manufacture_plan2_3[1] = this.historicalData.plans[2].rooms.manufacture[3].autofill;
              this.radio_manufacture_plan2[3] = this.getProductValueReverse(this.historicalData.plans[2].rooms.manufacture[3].product);
            }

          }



          if ('153' === this.historicalData.buildingType || '252' === this.historicalData.buildingType) {
            if (this.historicalData.plans[2].rooms.manufacture[4].skip) {
              this.switch_manufacture_plan2_4[2] = true;
              if (undefined !== this.historicalData.plans[2].rooms.manufacture[4].operators) {
                this.manufacture_plan2_4 = this.historicalData.plans[2].rooms.manufacture[4].operators;
                this.switch_manufacture_plan2_4[0] = this.historicalData.plans[2].rooms.manufacture[4].sort;
                this.switch_manufacture_plan2_4[1] = this.historicalData.plans[2].rooms.manufacture[4].autofill;
                this.radio_manufacture_plan2[4] = this.getProductValueReverse(this.historicalData.plans[2].rooms.manufacture[4].product);
              }

            } else {
              this.manufacture_plan2_4 = this.historicalData.plans[2].rooms.manufacture[4].operators;
              this.switch_manufacture_plan2_4[0] = this.historicalData.plans[2].rooms.manufacture[4].sort;
              this.switch_manufacture_plan2_4[1] = this.historicalData.plans[2].rooms.manufacture[4].autofill;
              this.radio_manufacture_plan2[4] = this.getProductValueReverse(this.historicalData.plans[2].rooms.manufacture[4].product);
            }

          }


          if (this.historicalData.plans[2].rooms.power[0].skip) {
            this.switch_power_plan2_0[2] = true;
          } else {
            this.power_plan2_0[0] = this.historicalData.plans[2].rooms.power[0].operators[0];
            this.switch_power_plan2_0[1] = this.historicalData.plans[2].rooms.power[0].autofill;
          }


          if (this.historicalData.plans[2].rooms.power[1].skip) {
            this.switch_power_plan2_1[2] = true;
          } else {
            this.power_plan2_0[1] = this.historicalData.plans[2].rooms.power[1].operators[0];
            this.switch_power_plan2_1[1] = this.historicalData.plans[2].rooms.power[1].autofill;
          }


          if (!('252' === this.historicalData.buildingType)) {
            if (this.historicalData.plans[2].rooms.power[2].skip) {
              this.switch_power_plan2_2[2] = true;
            } else {
              this.power_plan2_0[2] = this.historicalData.plans[2].rooms.power[2].operators[0];
              this.switch_power_plan2_2[1] = this.historicalData.plans[2].rooms.power[2].autofill;
            }

          }

          if (this.historicalData.plans[2].rooms.hire[0].skip) {
            this.switch_hire_plan2_0[2] = true;
          } else {
            this.hire_plan2_0 = this.historicalData.plans[2].rooms.hire[0].operators;
            this.switch_hire_plan2_0[1] = this.historicalData.plans[2].rooms.hire[0].autofill;
          }


          if (this.historicalData.plans[2].rooms.meeting[0].skip) {
            this.switch_meeting_plan2_0[2] = true;
          } else {
            this.meeting_plan2_0 = this.historicalData.plans[2].rooms.meeting[0].operators;
            this.switch_meeting_plan2_0[1] = this.historicalData.plans[2].rooms.meeting[0].autofill;
          }


          if (undefined === this.historicalData.plans[2].rooms.dormitory[0].operators) {

          } else {
            if (this.historicalData.plans[2].rooms.dormitory[0].skip) {
              this.switch_dormitory_plan2_0[2] = true;
            } else {
              this.dormitory_plan2_0 = this.historicalData.plans[2].rooms.dormitory[0].operators;
              this.switch_dormitory_plan2_0[0] = this.historicalData.plans[2].rooms.dormitory[0].sort;
              this.switch_dormitory_plan2_0[1] = this.historicalData.plans[2].rooms.dormitory[0].autofill;
            }

          }


          if (undefined === this.historicalData.plans[2].rooms.dormitory[1].operators) {

          } else {
            if (this.historicalData.plans[2].rooms.dormitory[1].skip) {
              this.switch_dormitory_plan2_1[2] = true;
            } else {
              this.dormitory_plan2_1 = this.historicalData.plans[2].rooms.dormitory[1].operators;
              this.switch_dormitory_plan2_1[0] = this.historicalData.plans[2].rooms.dormitory[1].sort;
              this.switch_dormitory_plan2_1[1] = this.historicalData.plans[2].rooms.dormitory[1].autofill;
            }

          }


          if (undefined === this.historicalData.plans[2].rooms.dormitory[2].operators) {

          } else {
            if (this.historicalData.plans[2].rooms.dormitory[2].skip) {
              this.switch_dormitory_plan2_2[2] = true;
            } else {
              this.dormitory_plan2_2 = this.historicalData.plans[2].rooms.dormitory[2].operators;
              this.switch_dormitory_plan2_2[0] = this.historicalData.plans[2].rooms.dormitory[2].sort;
              this.switch_dormitory_plan2_2[1] = this.historicalData.plans[2].rooms.dormitory[2].autofill;
            }

          }


          if (undefined === this.historicalData.plans[2].rooms.dormitory[3].operators) {

          } else {
            if (this.historicalData.plans[2].rooms.dormitory[3].skip) {
              this.switch_dormitory_plan2_3[2] = true;
            } else {
              this.dormitory_plan2_3 = this.historicalData.plans[2].rooms.dormitory[3].operators;
              this.switch_dormitory_plan2_3[0] = this.historicalData.plans[2].rooms.dormitory[3].sort;
              this.switch_dormitory_plan2_3[1] = this.historicalData.plans[2].rooms.dormitory[3].autofill;
            }
          }


        }


        this.$message({
          message: '导入成功',
          type: "success",
          showClose: true,
          duration: 3000,
        });
      },


      getNull() {
      },
      getList(list) {
        let listCopy = []
        for (let i = 0; i < list.length; i++) {
          if (list[i] === '' || list[i] === undefined || list[i] === 'undefined' || typeof list[i] === undefined || list[i] === '空置') {
            continue;
          }
          listCopy.push(list[i]);
        }
        return listCopy
      },
      setPeriod(list) {
        if (list.length > 1) {
          list[0] = list[0].replace(/\uff1a/g, ":");
          list[1] = list[1].replace(/\uff1a/g, ":");
          let start = parseInt(list[0].substr(0, 2));
          let end = parseInt(list[1].substr(0, 2));
          if (list[0] === "") {
            console.log("这是个空时间段")
            return;
          }
          if (start > end) {
            return [[list[0], "23:59"], ["00:00", list[1]],];
          }

          return [list];
        }



      },

      getOrder(str) {
        if ("换班前" === str) return 'pre';
        if ("换班后" === str) return 'post';
      },
      getPlanTimes(num) {
        console.log('这是一个', num, '班作业')
        if (num === 2) return "2班";
        if (num === 3) return "3班";
      },

      getProductValue(label) {
        if (label === "贸易站") return "trading";
        if (label === "制造站") return "manufacture";
        if (label === "龙门币") return "LMD";
        if (label === "合成玉") return "Orundum";
        if (label === "作战记录") return "Battle Record";
        if (label === "赤金") return "Pure Gold";
        if (label === "源石碎片") return "Originium Shard";
        if (label === "双芯片") return "Dualchip";
      },


      getOrderReverse(str) {
        if ("pre" === str) return '换班前';
        if ("post" === str) return '换班后';
      },

      getProductValueReverse(label) {
        if (label === "trading") return "贸易站";
        if (label === "manufacture") return "制造站";
        if (label === "LMD") return "龙门币";
        if (label === "Orundum") return "合成玉";
        if (label === "Battle Record") return "作战记录";
        if (label === "Pure Gold") return "赤金";
        if (label === "Originium Shard") return "源石碎片";
        if (label === "Dualchip") return "双芯片";
      },
      getPeriodReverse(list) {
        if (list.length === 1) {
          return list[0];
        } else {
          return [list[0][0], list[1][1]];
        }
      },
    },
  };
</script>

