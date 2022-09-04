import request from '@/api/request'

const api_name = `/tool`


export default {



    //根据tag集合和最高星级返回公招结果 
    findAllDataRec(type,tags,rarityMax) {
        return request({
            url: `/api/find/recruit/${type}/${tags}/${rarityMax}`,
            method: 'get',
        })
    },

    // 更新访问量
    updateVisits(domain) {
        return request({
            url: `${api_name}/visits/${domain}`,
            method: 'get',
        })
    },


    maaStatistical() {
        return request({
            url: `${api_name}/recruit/statistical`,
            method: 'get',
        })
    },

   
    
}