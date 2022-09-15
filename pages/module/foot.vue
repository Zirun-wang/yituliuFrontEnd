<template>
<div>
	<div class="store" id="extra" style="margin-top: 4px;">
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
			<div id="nowActStageKey" class="op_tag_0">
				问题反馈 <img src="/img/website/el.png" style="width:12px;">
			</div>
			<div id="nowActStageKey" class="op_tag_0">
				资源本效率 <img src="/img/website/ex.png" style="width:12px;">
			</div>
			<div id="nowActStageKey" class="op_tag_0">
				算法简述 <img src="/img/website/ex.png" style="width:12px;">
			</div>
			<div id="nowActStageKey" class="op_tag_0">
				测试服 <img src="/img/website/el.png" style="width:12px;">
			</div>
			<div id="nowActStageKey" class="op_tag_0">
				调查表 <img src="/img/website/el.png" style="width:12px;">
			</div>
			<div id="nowActStageKey" class="op_tag_0">
				QQ群：938710832 <img src="/img/website/el.png" style="width:12px;">
			</div>
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
				<tbody>
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
				</tbody>
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


	<div id="foot_main">
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
		
			<a href="https://space.bilibili.com/39109412"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="/img/website/yamasakura.webp" />
			山桜</div></a>

			<a href="https://space.bilibili.com/10057492"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="/img/website/Zlogo3.2.png" />
			Zirunwang</div></a>

		</div>

		<div class="foot_unit">
			<p class="foot_unit_title">-后端-</p>
			<a href="https://space.bilibili.com/39109412"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="/img/website/yamasakura.webp" />
			山桜</div></a>

			<p class="foot_unit_title">-前端-</p>
			<a href="https://space.bilibili.com/10057492"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="/img/website/Zlogo3.2.png" />
			Zirunwang</div></a>

			<p class="foot_unit_title">-UI协力-</p>
			<a href="https://space.bilibili.com/12786648"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="/img/website/wmm.jpg" />
			破碎無冕</div></a><br>
		</div>

		<div class="foot_unit">
			<p class="foot_unit_title" onclick="collapse()">-友情链接-</p>
			<a href="https://space.bilibili.com/688411531"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="/img/website/rhodebasebeta.jpg" />
			罗德岛基建BETA</div></a>

			<a href="https://viktorlab.cn/akdata"><div class="foot_unit_button uni_shadow_2" style="vertical-align:middle">
			<img class="foot_unit_pic" src="/img/website/akdps.jpg" />
			DPS计算器</div></a><br>
		</div>
	</div>
</div>
</template>

<script>
import stageApi from "@/api/stage";

export default {

};
</script>