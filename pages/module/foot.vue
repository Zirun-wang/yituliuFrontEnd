<template>
<div>
	<div id="extra_b" style="display:none;">
		<!-- 标题区域 -->
		<div class="op_title">
		<div class="op_title_text">
			<div class="op_title_ctext">
			附加信息
			</div>
			<div class="op_title_etext">
			Extra Info
			</div>

			<div class="op_title_tag">

				<a href="https://www.wjx.cn/vm/O68SHiq.aspx# " class="op_tag_1">
					问题反馈 <img src="/img/website/el.png" style="width:12px;">
				</a>
				<a href="https://www.wjx.cn/vm/O68SHiq.aspx# " class="op_tag_1">
					问题反馈 <img src="/img/website/el.png" style="width:12px;">
				</a>
				<div class="op_tag_1">
					资源本效率 <img src="/img/website/ex.png" style="width:12px;">
				</div>
				<div class="op_tag_1">
					算法简述 <img src="/img/website/ex.png" style="width:12px;">
				</div>
				<!-- <div class="op_tag_1">
					测试服 <img src="/img/website/el.png" style="width:12px;">
				</div> -->
				<div class="op_tag_1">
					调查表 <img src="/img/website/el.png" style="width:12px;">
				</div>
				<div class="op_tag_1">
					开发群：938710832 <img src="/img/website/el.png" style="width:12px;">
				</div>
				<a href="https://www.wjx.cn/vm/O68SHiq.aspx# " class="op_tag_1">
					开发群：938710832 <img src="/img/website/el.png" style="width:12px;">
				</a>
				<div class="tab_text">
				数据更新时间
				</div>
			</div>
		</div>
		</div>
	<!-- website -->
		<div class="tab_bar" style="margin-top:8px;margin-bottom:8px;display:none;">
			<div class="tab_button_1" onclick="window.open('https://www.wjx.cn/vj/QpUEOPQ.aspx')">填个调查表，帮我们完善一图流</div>

			<el-popover placement="top" :width="510" :padding="0" trigger="click">
			<template #reference>
			<div class="tab_button_1">问题反馈</div>
			</template>
			<table class="help_table f16">
				<tr style="height:48px;">
					<td style="width:105px;">数据问题</td>
					<td style="width:270px;">例如效率突变、数值离谱</td>
					<td style="width:135px;"><a href="https://space.bilibili.com/39109412"><img class="foot_unit_pic" src="/img/website/yamasakura.webp" />山桜</a></td>
				</tr>
				<tr style="height:48px;">
					<td>外观问题</td>
					<td>例如网页排版崩溃、外观优化建议</td>
					<td><a href="https://space.bilibili.com/10057492"><img class="foot_unit_pic" src="/img/website/Zlogo3.2.png" />Zirunwang</a></td>
				</tr>
				<tr class="table_content">
					<td>其他问题</td>
					<td>任何问题，或者拿不准该问谁</td>
					<td>QQ群:938710832</td>
				</tr>
			</table>
			</el-popover>
			<div class="tab_button_1" onclick="window.open('https://yituliu.site')">测试服</div>

			
		</div>
	<!-- info -->		
		<div class="tab_bar" style="margin-top:8px;margin-bottom:8px;display:none;">
			<el-popover placement="top" :width="510" :padding="0" trigger="click">
			<template #reference>
			<div class="tab_button_1">资源本效率</div>
			</template>
				<p class="help_collapse f16">故事集活动期间:1.36(110%)</p>			
				<p class="help_collapse f16">理智小样活动期间:1.50(125%)</p>			
				<p class="help_collapse f16">其余时间:1.25(100%)</p>
			</el-popover>

			<el-popover placement="top" :width="510" trigger="click">
			<template #reference>
			<div class="tab_button_1">算法简述</div>
			</template>
				<p class="help_collapse f20 fb">部分条件假设</p>
			
				<p class="help_collapse f16">作战记录主要来源是基建，且不刷LS-5</p>
				<p class="help_collapse f16">公开招募四星出率18%，且四星满潜</p>
				<p class="help_collapse f16">加工站副产品产率为20%</p>
				
				<p class="help_collapse f20 fb">计算过程</p>
				
				<p class="help_collapse f16">通过马尔可夫决策过程来制定的一套算法<br>理论依据请参阅页面底部Erit_Lux的视频链接</p>
				<p class="help_collapse f16">-步骤1:从企鹅物流获取<b>无活动时的常驻关卡</b>的掉率,统计分析计算出物品价格，得出<a onclick="jumpTo('anchor_all')" class="t3">价值一览</a></p>
				<p class="help_collapse f16">-步骤2:从企鹅物流获取<b>所有关卡</b>的掉率，根据<a onclick="jumpTo('anchor_all')" class="t3">价值一览</a>中的价格，计算关卡效率，得出<a onclick="jumpTo('anchor_level')" class="t3">刷图推荐</a>中的关卡效率</p>
				<p class="help_collapse f16">-步骤3:根据商店售价和物品价格，计算商店性价比，得出<a onclick="jumpTo('anchor_store')" class="t3">采购中心</a>和<a onclick="jumpTo('anchor_actstore')" class="t3">活动商店</a>中的数值</p>
			</el-popover>
			
			<!-- <div class="tab_button_1">数据更新时间 {{level_data.data[0][0].updateDate}}</div> -->
		</div>
		<div class="tab_bar" style="margin-top:8px;margin-bottom:8px;display:none">
			<div class="tab_button_1" onclick="window.open('https://jq.qq.com/?_wv=1027&k=ZmORnr5F')">QQ群:938710832</div>
			<div class="tab_button_1" id="dark_mode2" onclick="switch_color()">暗色模式</div>
		</div>
	</div>

	<div id="extra">
		<div class="op_title_tag">
			<a href="https://www.wjx.cn/vm/O68SHiq.aspx# " class="op_tag_1">
				网站反馈 <img src="/img/website/el.png" style="width:12px;">
			</a>
			<el-popover placement="top" width="480" trigger="click" title="算法简述">
				<p class="extra_popver_p f16">通过马尔可夫决策过程来制定的一套算法<br>理论依据可参阅页面底部Erit_Lux的视频链接<br>算法根据实际情况做了一些调整</p>
				<p class="extra_popver_p f16">-步骤1:从企鹅物流获取<b>无活动时的常驻关卡</b>的掉率,统计分析计算出物品价格，得出<a onclick="jumpTo('anchor_all')" class="t3">价值一览</a></p>
				<p class="extra_popver_p f16">-步骤2:从企鹅物流获取<b>所有关卡</b>的掉率，根据<a onclick="jumpTo('anchor_all')" class="t3">价值一览</a>中的价格，计算关卡效率，得出<a onclick="jumpTo('anchor_level')" class="t3">刷图推荐</a>中的关卡效率</p>
				<p class="extra_popver_p f16">-步骤3:根据商店售价和物品价格，计算商店性价比，得出<a onclick="jumpTo('anchor_store')" class="t3">采购中心</a>和<a onclick="jumpTo('anchor_actstore')" class="t3">活动商店</a>中的数值</p>
				<div slot="reference" class="op_tag_1">
					算法简述 <img src="/img/website/ex.png" style="width:12px;">
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
					常见问题 <img src="/img/website/ex.png" style="width:12px;">
				</div>
			</el-popover>

			<!-- <a href="https://jq.qq.com/?_wv=1027&k=ZmORnr5F" class="op_tag_1">
				开发群：938710832 <img src="/img/website/el.png" style="width:12px;">
			</a> -->
		</div>
		<div class="op_title_tag">
			<div class="tab_text">
			数据更新时间
			</div>
		</div>

		<div id="foot_main">

			
			<div class="foot_unit" style="width:264px;background-color: rgba(187,187,187,0.86667);padding-left: 16px;padding-bottom: 16px;">
				<p class="foot_unit_title">-开发-</p>

				
				<a href="https://space.bilibili.com/10057492"><div class="foot_unit_button uni_shadow_2" style="display:inline-block;margin-right: -3px;width: 90px;border-bottom-right-radius: 0px;border-top-right-radius: 0px;box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 20%);">
				<img class="foot_unit_pic" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
				前端</div>
				</a>
				<a href="https://space.bilibili.com/10057492"><div class="foot_unit_button uni_shadow_2" style="display:inline-block;margin-left: -3px;width: 90px;border-bottom-left-radius: 0px;border-top-left-radius: 0px;">
				<img class="foot_unit_pic" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
				后端</div>
				</a>
				<div style="width:252px;white-space: initial;">
					本项目为无偿开源项目<br>
					如有开发/数据分析/设计/美工经验<br>
					欢迎一起提升方舟玩家游戏体验
				</div>
			
				<a href="https://jq.qq.com/?_wv=1027&k=ZmORnr5F"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
				<img class="foot_unit_pic" src="https://wiki.connect.qq.com/wp-content/uploads/2021/01/icon_for_ios7-374x1024.png" />
				开发群</div>
				</a>
				<div>
					如有好的想法，也可来开发群一叙
				</div>	

				

			</div>
			<div class="foot_unit">
				<p class="foot_unit_title">-游戏官网-</p>
				<a href="https://ak.hypergryph.com/"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle;color:gray;"><img class="foot_unit_pic" src="https://ak.hypergryph.com/favicon.ico"/>明日方舟</div></a>
				
				<p class="foot_unit_title">-数据源-</p>
				<a href="https://penguin-stats.cn/"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle;color:gray;"><img class="foot_unit_pic" src="/img/website/penguin_stats_logo.png"/>企鹅物流</div></a>
			</div>

			<div class="foot_unit">
				<p class="foot_unit_title">-效率算法-</p>
				<a href="https://www.bilibili.com/video/BV1pZ4y1g7QN">
					<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
						<img class="foot_unit_pic" src="/img/website/Erit_Lux.webp" >
						Erit_Lux
					</div>
				</a>
			
				<a href="https://space.bilibili.com/39109412">
					<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
						<img class="foot_unit_pic" src="/img/website/yamasakura.webp">
						山桜
					</div>
				</a>

				<a href="https://space.bilibili.com/10057492">
					<div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
						<img class="foot_unit_pic" src="/img/website/Zlogo3.2.png" />
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
				<p class="foot_unit_title">-友情链接-</p>
				<a href="https://space.bilibili.com/688411531"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
				<img class="foot_unit_pic" src="/img/website/rhodebasebeta.jpg" />
				罗德岛基建BETA</div></a>

				<a href="https://viktorlab.cn/akdata"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
				<img class="foot_unit_pic" src="/img/website/akdps.jpg" />
				DPS计算器</div></a>

				<p class="foot_unit_title">-UI协力-</p>
				<a href="https://space.bilibili.com/12786648"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
				<img class="foot_unit_pic" src="/img/website/wmm.jpg" />
				破碎無冕</div></a>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import stageApi from "@/api/stage";

export default {

};
</script>

<style>
	#extra{
		background-color: #dddddddd;
		margin-top: 8px;
		padding: 24px 0px;
	}

	.extra_popver_p{
		margin: 4px 8px;
	}



	#foot_main {
	display:flex;
    flex-direction: row;
    flex-wrap: wrap;
	padding-top:12px;
    padding-left:12px;
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
		margin: 4px;
		display: inline-block;
		vertical-align: middle;
		border-radius: 4px;
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
		background-color: rgba(255, 253, 253, 0.08);
		height: 40px;
		width: 180px;
		border-radius: 8px;
		margin: 4px;
		color:gray;
	}

	.foot_unit a {
		text-decoration: none;
	}
</style>