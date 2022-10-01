import request from '@/api/request'

const api_name = `/tool`

export default {

    //保存排班
    maaBuildingJsonCreated(data,id) {
        return request({
            url: `${api_name}/building/schedule/save?id=${id}`,
            method: 'post',
            data:data
        })
    },

    retrieveSchedule(id){
        return request({
            url: `${api_name}/building/schedule/retrieve/${id}`,
            method: 'get',
            
        })
    },
   



}
