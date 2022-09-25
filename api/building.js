import request from '@/api/request'

const api_name = `/tool`

export default {

    //查询所有材料价值
    maaBuildingJsonCreated(data) {
        return request({
            url: `${api_name}/building/schedule/save`,
            method: 'post',
            data:data
        })
    },

   



}
