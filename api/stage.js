import request from '@/api/request'

const api_name = `/api`


export default {


    //根据材料类型查询关卡效率按关卡效率降序
    findStageDateByTypeOrderByEfficiencyDesc(ends,efficiency) {
        return request({
            url: `${api_name}/find/stage/t3/${ends}/${efficiency}`,
            method: 'get',
        })
    },

    //根据材料查询关卡效率按期望理智降序
    findStageDateByMainOrderByExpectDesc() {
        return request({
            url: `${api_name}/find/stage/t2`,
            method: 'get',
        })
    },

     //根据关卡ID查询已结束活动
    findClosedActivStageByStageId(){
        return request({
            url: `${api_name}/find/stage/closedActivityStage`,
            method: 'get',            
        })
    },

    //根据关卡ID查询正在开启活动
    findOpeningActivStageByStageId(stageName){
        return request({
            url: `${api_name}/find/stage/openingActivityStage/${stageName}`,
            method: 'get',            
        })
    },


 //查询所有关卡效率
    findAllStageEfficiency() {
        return request({
            url: `${api_name}/find/stage/allStage`,
            method: 'get',
            
        })
    },

    //查询所有关卡的各项信息
    findAllStageInfo() {
        return request({
            url: `${api_name}/find/stage/info`,
            method: 'get',
            
        })
    },

 



}
