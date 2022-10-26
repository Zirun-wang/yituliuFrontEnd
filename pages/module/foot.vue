<template>
<div id="extra">
	<div class="op_title_tag">
		<a href="https://www.wjx.cn/vm/O68SHiq.aspx# " class="op_tag_1">
	<div style="display:flex"><div>网站反馈</div><div  :class="getSpriteImg('ex',0)" style="margin-left:10px"></div></div>
		</a>
		<el-popover placement="top" width="480" trigger="click" title="算法简述">
			<p class="extra_popver_p f16">通过马尔可夫决策过程来制定的一套算法<br>理论依据可参阅页面底部Erit_Lux的视频链接<br>算法根据实际情况做了一些调整</p>
			<p class="extra_popver_p f16">-步骤1:从企鹅物流获取<b>无活动时的常驻关卡</b>的掉率,统计分析计算出物品价格，得出<a onclick="jumpTo('anchor_all')" class="t3">价值一览</a></p>
			<p class="extra_popver_p f16">-步骤2:从企鹅物流获取<b>所有关卡</b>的掉率，根据<a onclick="jumpTo('anchor_all')" class="t3">价值一览</a>中的价格，计算关卡效率，得出<a onclick="jumpTo('anchor_level')" class="t3">刷图推荐</a>中的关卡效率</p>
			<p class="extra_popver_p f16">-步骤3:根据商店售价和物品价格，计算商店性价比，得出<a onclick="jumpTo('anchor_store')" class="t3">采购中心</a>和<a onclick="jumpTo('anchor_actstore')" class="t3">活动商店</a>中的数值</p>
			<div slot="reference" class="op_tag_1">
	<div style="display:flex"><div>算法简述</div><div  :class="getSpriteImg('ex',0)" style="margin-left:10px"></div></div>
			</div>
		</el-popover>

		<el-popover placement="top" width="480" trigger="click" title="常见问题">
			刷图规划<br>

			-根据价值一览中的价格和企鹅物流的关卡掉落数据计算<br>
			-只有多于300样本的关卡才会被收录<br>
			-活动关卡只在活动期间出现，且都标记为<font style="color:red;">红色</font><br>
			-插曲和别传常驻后，视为新关卡并重新计算效率，该效率与活动时无关<br>

			橙色：关卡效率最高（长期最优）且 主产物期望最低（短期最优）<br>
			紫色：关卡效率最高（长期最优）<br>
			绿色：主产物期望最低（短期最优）<br>
			蓝色：一般路过关卡<br>

			商店性价比<br>
			单位:绿票/各货币<br>
			-各商店之间货币不同，故<b>不可跨店对比数值</b><br>
			-根据<b>价值一览</b>中的价格和商店售价得到的性价比值<br>
			-活动商店采用相同算法<br>
			-信用商店计价单位为100信用点<br>
			-若土的主要来源是1-7以外的关卡，则土系材料价值<a class="popover_color">+6%</a>
			
			材料价值<br>
			-数据选择范围为<a href="https://penguin-stats.cn/">企鹅物流</a>中的<b>常驻关卡</b>以保证价值的稳定性<br>
			-若土的主要来源是1-7以外的关卡，则土系材料价值<a class="popover_color">+6%</a><br>
			-假设加工站副产物掉率为20%<br>
			-龙门币依据CE-6定价，且为作战记录的1.6倍<br>
			-技巧概要依据CA-5定价，且考虑加工站副产物<br>
			-采购凭证依据AP-5定价<br>
			-理论上寻访凭证=600合成玉=3.33石=450理智，但不碎石刷图的情况下该等式无意义，仅列出以供参考<br>
			-假设重装/医疗芯片和近卫/特种芯片需求比为2:1，狙击/术师和先锋/辅助需求比为1:1<br>
			-物资箱价值取<a href="https://penguin-stats.cn/">企鹅物流</a>中的以往数据进行估算



			<div slot="reference" class="op_tag_1">
				<div style="display:flex"><div>常见问题</div><div  :class="getSpriteImg('ex',0)" style="margin-left:10px"></div></div>
			</div>
		</el-popover>

		<!-- <a href="https://jq.qq.com/?_wv=1027&k=ZmORnr5F" class="op_tag_1">
			开发群：938710832 <img src="/img/website/el.png" style="width:12px;">
		</a> -->
	</div>
	<!-- <div class="op_title_tag">
		<div class="tab_text">
		数据更新时间 {{updateTime}}
		</div>
	</div> -->

	<div id="foot_main">
		<div class="foot_unit" style="width:436px;">
			<p class="foot_unit_title" style="margin-bottom: 11px;">-开发-</p>
			<a href="https://github.com/Zirun-wang/yituliuFrontEnd"><div class="foot_unit_button uni_shadow_2" id="foot_frontEnd">
			<img class="foot_unit_pic" src="/img/website/github.png"/>
			前端</div>
			</a>
			<a href="https://github.com/yamasakura/yituliuBackEnd"><div class="foot_unit_button uni_shadow_2" id="foot_backEnd">
			<img class="foot_unit_pic" src="/img/website/github.png"/>
			后端</div>
			</a>
			<a href="https://jq.qq.com/?_wv=1027&k=ZmORnr5F"><div class="foot_unit_button uni_shadow_2" style="width: 186px;display: inline-block;">
			<img class="foot_unit_pic" src="/img/website/qq.png" />
			开发群938710832</div>
			</a>
			<div style="line-height: 28px;padding-left: 6px;">
				本项目为无偿开源项目，致力于方便明日方舟玩家<br>
				如有开发/数据分析/设计/美工经验，欢迎加入我们<br>
				如有好的想法，也欢迎来开发群一叙
			</div>				
		</div>

		<div class="foot_unit" id="qianduan">
			<p class="foot_unit_title">-前端/UI-</p>
			<a href="https://space.bilibili.com/39109412">
				<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
					<img class="foot_unit_pic" src="https://avatars.githubusercontent.com/u/84258011?v=4">
					山桜
				</div>
			</a>
			<a href="https://space.bilibili.com/10057492">
				<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
					<img class="foot_unit_pic" src="https://avatars.githubusercontent.com/u/84625349?v=4" />
					Zirunwang
				</div>
			</a>
			<a href="https://space.bilibili.com/12786648">
				<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
					<img class="foot_unit_pic" src="/img/website/wmm.jpg" />
					破碎無冕
				</div>
			</a>
		</div>
		<div class="foot_unit" id="houduan">
			<p class="foot_unit_title">-后端-</p>
			<a href="https://github.com/hguandl">
				<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
					<img class="foot_unit_pic" src="https://avatars.githubusercontent.com/u/10684225?v=4">
					hguandl
				</div>
			</a>
			<a href="https://space.bilibili.com/39109412">
				<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
					<img class="foot_unit_pic" src="https://avatars.githubusercontent.com/u/84258011?v=4">
					山桜
				</div>
			</a>
			<a href="https://github.com/youcai922">
				<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
					<img class="foot_unit_pic" src="https://avatars.githubusercontent.com/u/64458943?v=4">
					youcai922
				</div>
			</a>
		</div>

		<div class="foot_unit">
			<p class="foot_unit_title">-游戏官网-</p>
			<a href="https://ak.hypergryph.com/"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle;color:gray;"><img class="foot_unit_pic" src="https://ak.hypergryph.com/favicon.ico"/>明日方舟</div></a>

			<p class="foot_unit_title">-数据源-</p>
			<a href="https://penguin-stats.cn/"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle;color:gray;"><img class="foot_unit_pic" src="/img/website/penguin_stats_logo.png"/>企鹅物流</div></a>
		</div>

		<div class="foot_unit" id="suanfa">
			<p class="foot_unit_title">-效率算法-</p>
			<a href="https://www.bilibili.com/video/BV1pZ4y1g7QN">
				<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
					<img class="foot_unit_pic" src="/img/website/Erit_Lux.webp" >
					Erit_Lux
				</div>
			</a>
			<a href="https://space.bilibili.com/39109412">
				<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
					<img class="foot_unit_pic" src="https://avatars.githubusercontent.com/u/84258011?v=4">
					山桜
				</div>
			</a>
			<a href="https://space.bilibili.com/10057492">
				<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
					<img class="foot_unit_pic" src="https://avatars.githubusercontent.com/u/84625349?v=4" />
					Zirunwang
				</div>
			</a>
			<a href="https://www.bilibili.com/video/BV1yL4y1P7K1">
				<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
					<img class="foot_unit_pic" src="/img/website/shaobing.jpg" />
					一个资深的烧饼
				</div>
			</a>
		</div>
		<div class="foot_unit">
			<p class="foot_unit_title">-B站发布-</p>
			<a href="https://space.bilibili.com/688411531"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="/img/website/bilibili.png" />
			罗德岛基建BETA</div></a>
			<p class="foot_unit_title">-粉丝群-</p>
			<a href="https://jq.qq.com/?_wv=1027&k=YoiC6RWw"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="/img/website/qq.png" />
			罗德岛数据文献馆</div></a>
		</div>
		<div class="foot_unit">
			<p class="foot_unit_title">-友情链接-</p>
			<a href="https://viktorlab.cn/akdata"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="/img/website/akdps.jpg" />
			DPS计算器</div></a>

			<a href="https://arkgacha.kwer.top/"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="https://arkgacha.kwer.top/static/icon.ico" />
			寻访记录分析</div></a>

			<a href="https://maa.plus/"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="https://avatars.githubusercontent.com/u/97677443?s=200" />
			MAA小助手</div></a>
		</div>
	</div>
</div>
</template>

<script>
export default {
  date(){
	return{

	}
  },
  created() {
   
  },
  methods: {
    getSpriteImg(id, index) {
      if (index == 0) return "bg-" + id + "_icon sprite_foot_icon";
     
      return "bg-" + id;
    },
  }
};
</script>

<style>
	#extra{
		background-color: #dededede;
		margin-top: 8px;
		padding: 12px 0px;
		color:gray;
	}

	.extra_popver_p{
		margin: 4px 8px;
	}



	#foot_main {
	display:flex;
    flex-direction: row;
    flex-wrap: wrap;
	padding:12px 12px 0px 12px;
	}

	.foot_unit {
		display: inline;
		top: 4px;
		width: 210px;
		float: left;
		margin:8px;
		white-space: nowrap;
		/* background-color: #bbbbbbdd; */
		border-radius: 8px;
	}

	#foot_main_dev{
		width:100%;
		background-color: rgba(187,187,187,0.86667);
		padding: 0px 16px 16px 16px;
		/* padding-bottom: 16px; */
	}

	#foot_main_dev > div{
		display: inline-block;
	}

	.foot_unit_title{
		font-size:15px;
		font-weight:600;
		color:#444444;
	}
	.foot_unit_content{
		color:gray;
		font-size:16px;
		padding-left:5px;
	}
	.foot_unit_pic{
		height: 32px;
		width: 32px;
		margin: 2px 3px 3px 3px;
		display: inline-block;
		vertical-align: middle;
		border-radius: 6px;
	}

	#foot_frontEnd{
		display:inline-block;
		margin-right: -2px;
		width: 100px;
		border-bottom-right-radius: 0px;
		border-top-right-radius: 0px;
		box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 20%);
		border-right-width: 0px;
	}
	#foot_backEnd{
		display:inline-block;
		margin-left: -2px;
		width: 100px;
		border-bottom-left-radius: 0px;
		border-top-left-radius: 0px;
		border-left: 1px solid #808080;
	}
	.footlist {
		display: inline;
		top: 5px;
		height: 80px;
		width: 180px;
		margin: auto;
		float: left;
		margin-top: 10px;
		margin-left: 10px;
		margin-bottom: 10px;

	}
	#foot_warning {
		border-top: 1px solid #dddddd;
		overflow-x:hidden;
		padding-left:12px;
		
	}
	#foot_warning_text {
		font-size: 12px;
		/* display: inline; */
		/* top: 5px; */
		/* float: left; */
		padding: 10px;
		text-align: center}

	.foot_unit_button {
		border: 1px solid #808080;
		background-color: rgba(255, 253, 253, 0.6);
		height: 38px;
		width: 178px;
		border-radius: 8px;
		margin: 4px;
		color:gray;
		line-height: 36px;
	}

	.foot_unit a {
		text-decoration: none;
	}
</style>