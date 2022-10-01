import request from '@/api/request'

const api_name = `/tool`

export default {

    //保存排班
    maaBuildingJsonCreated(data) {
        return request({
            url: `${api_name}/building/schedule/save`,
            method: 'post',
            data:data
        })
    },

   



}
