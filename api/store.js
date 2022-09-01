import request from '@/api/request'
const api_name = `/api`
export default {

    //查询所有材料价值
    findAllItem() {
        return request({
            url: `${api_name}/find/item/itemValue`,
            method: 'get',
        })
    },

    //查询所有常驻商店数据
    findPermStore() {
        return request({
            url: `${api_name}/find/store/perm`,
            method: 'get',
        })

    },
   
    //根据活动商店类型查找
    findActStore() {
        return request({
            url: `${api_name}/find/store/act`,
            method: 'get',            
        })
    },




}
