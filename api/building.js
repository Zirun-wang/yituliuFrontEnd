import request from '@/api/request'

const api_name = `/tool`

export default {

    //查询所有材料价值
    maaBuildingJsonCreated(data,uid) {
        return request({
            url: `${api_name}/building/save?uid=${uid}`,
            method: 'post',
            data:data
        })
    },

   



}
