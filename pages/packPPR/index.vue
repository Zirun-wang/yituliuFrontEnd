<template>
    <div id="pack">
        <div v-for="(pack, index) in packsPPRData" :key="index" class="pack_unit">
            <div class="pack_img" style="background:url(/img/packs/月卡.png) 00% 110% / cover no-repeat,#444444">
                <div class="pack_img_text1">一二三四五六七  ￥300</div>
            </div>

            <div class="pack_info">
                <div class="pack_info_text">
                共{{pack.packDraw}}抽 <br><t1>￥{{pack.packRmbPerDraw}}/抽</t1>
                </div>
                <div class="pack_chart">
                    <div class="pack_chart_unit">
                        <div class="pack_chart_unit_text">大月卡</div>
                        <div class="pack_chart_unit_ppr" :style="getWidth(140,1)">140%</div>
                    </div>
                    <div class="pack_chart_unit">
                        <div class="pack_chart_unit_text">本礼包</div>
                        <div class="pack_chart_unit_ppr bg_red" :style="getWidth(pack.packPPRDraw*100,1)">120%</div>
                    </div>
                    <div class="pack_chart_unit">
                        <div class="pack_chart_unit_text">648源石</div>
                        <div class="pack_chart_unit_ppr" :style="getWidth(100,1)">100%</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
  
<style>
    .pack_unit{
        margin:20px;
    }
    .pack_img{
        width: 160px;
        height: 120px;
        position: absolute;
        /* display: inline-block; */
        /* z-index: 20; */
        /* vertical-align: top; */
        border-radius: 8px;
        box-shadow: 2px 2px 4px rgb(0 0 0 / 50%);
    }
    .pack_img_text1{
        position: relative;
        top: 93px;
        width: 160px;
        height: 24px;
        background-color: rgba(0,0,0,0.6902);
        font-size: 14px;
        font-weight: 600;
        color: white;
        text-align: center;
        padding-top: 3px;
        border-radius: 0px 0px 8px 8px;
    }
    .pack_info{
        display: inline-block;
        z-index: 10;
        height: 108px;
        width: 360px;
        background-color: #000000cc;
        margin: 6px 0px 6px 156px;
        border-radius: 4px;
        box-shadow: 2px 2px 4px rgb(0 0 0 / 50%);
    }

    .pack_info_text{
        width: 96px;
        padding: 18px 0px 18px 4px;
        font-size: 20px;
        text-align: center;
        font-weight: 600;
        color: #6ed7ff;
        display: inline-block;
        line-height: 36px;
        vertical-align: top;
    }

    t1{
        color: #c59447;
    }

    .pack_chart {
        display: inline-block;
        margin-top: 18px;
        width: 240px;
        /* padding: 10px 0px; */
        border-left: 1px solid #d0d0d0;
    }

    .pack_chart_unit_text{
        display: inline-block;
        padding: 0px 2px;
        width: 66px;
        /* background-color: burlywood; */
        border-radius: 6px;
        /* margin: 0px 0px 0px 0px; */
        vertical-align: middle;
        text-align: center;
        font-size: 16px;
        color: wheat;
        height: 24px;
    }
    .pack_chart_unit_ppr{
        display: inline-block;
        background-color: rgb(56, 112, 161);
        color: white;
        font-size: 12px;
        border-radius: 16px;
        padding: 0px 8px;
    }

    .bg_red{
        background-color: rgb(250, 83, 83);
    }
    
</style>

<script>
    import packsPPR from "static/json/pack_packsPPR.json";

    export default {
        data(){
            return {
                packsPPRData:packsPPR,
            }
        },
        methods: {
            getWidth(num , scale) {
                return "width:" + num*scale +"px";
            }

        }
    }
</script>
