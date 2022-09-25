import request from '@/api/request'

const api_name = `/api`


export default {


    //根据材料类型查询关卡效率按关卡效率降序 蓝材料
    findStageDateByTypeOrderByEfficiencyDesc(times) {
        return request({
            url: `${api_name}/find/stage/t3/${times}`,
            method: 'get',
        })
    },

    //根据材料查询关卡效率按期望理智降序  绿材料
    findStageDateByMainOrderByExpectDesc() {
        return request({
            url: `${api_name}/find/stage/t2`,
            method: 'get',
        })
    },

     //根据关卡ID查询已结束活动
    findClosedActivStageByStageId(){
        return request({
            url: `${api_name}/find/stage/activity/closed`,
            method: 'get',            
        })
    },

 

 //查询所有关卡效率
    findAllStageEfficiency() {
        return request({
            url: `${api_name}/find/stage/all`,
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
