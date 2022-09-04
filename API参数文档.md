API参数



### 获取蓝材料最优图(JsonArray)

 ```
url:  /api/find/stage/t3/{times}/{efficiency}
参数{times}//  样本量   (目前废弃
参数{efficiency}//  最低效率  100%=1.25效率 (目前废弃
 ```
 ```
 类型String    名称 stageId  // 关卡id
 类型String    名称 chapterName //章节名称
 类型Integer   名称 code  //章节顺序
 类型Integer   名称 times  // 样本次数
 类型String    名称 itemId   //产物ID
 类型String    名称 itemName    //产物名称
 类型String    名称 stageName   // 关卡名称
 类型Double    名称 probability   // 概率
 类型Double    名称 request   // 单项结果
 类型Double    名称 expect // 期望理智
 类型String    名称 main // 主产物
 类型Integer   名称 mainLevel // 主产物
 类型String    名称 type  //材料类型
 类型String    名称 secondary // 副产物
 类型String    名称 secondaryId
 类型Double    名称 efficiency  //绿票转化率
 类型Integer   名称 isShow   // 是否显示
 类型Integer   名称 isUseValue  //是否参与定价
 类型Integer   名称 color  // 关卡标注颜色
 类型Double    名称 percentage    //理智转化率
 类型String    名称 updateDate  //更新时间
 类型String    名称 spm  //每分钟消耗理智
 类型String    名称 activityName //活动名称
 类型Double    名称 efficiencyEx  // 绿票转化率（ 理智小样
 类型String    名称 extraItem //  理智小样
 类型Double    名称 confidence  // 样本置信度
 ```


### 获取绿材料最优图(JsonArray)
 ```
url:  /api/find/stage/t2
无参数
 ```
 ```
 类型String    名称 stageId  // 关卡id
 类型String    名称 chapterName //章节名称
 类型Integer   名称 code  //章节顺序
 类型Integer   名称 times  // 样本次数
 类型String    名称 itemId   //产物ID
 类型String    名称 itemName    //产物名称
 类型String    名称 stageName   // 关卡名称
 类型Double    名称 probability   // 概率
 类型Double    名称 request   // 单项结果
 类型Double    名称 expect // 期望理智
 类型String    名称 main // 主产物
 类型Integer   名称 mainLevel // 主产物
 类型String    名称 type  //材料类型
 类型String    名称 secondary // 副产物
 类型String    名称 secondaryId
 类型Double    名称 efficiency  //绿票转化率
 类型Integer   名称 isShow   // 是否显示
 类型Integer   名称 isUseValue  //是否参与定价
 类型Integer   名称 color  // 关卡标注颜色
 类型Double    名称 percentage    //理智转化率
 类型String    名称 updateDate  //更新时间
 类型String    名称 spm  //每分钟消耗理智
 类型String    名称 activityName //活动名称
 类型Double    名称 efficiencyEx  // 绿票转化率（ 理智小样
 类型String    名称 extraItem //  理智小样
 类型Double    名称 confidence  // 样本置信度
 ```

### 获取常驻商店性价比(JsonArray)
 ```
url:  /api/find/store/perm
无参数
 ```
 ```
类型String itemId;  //物品id
类型String   名称 itemName; //物品名称
类型Double   名称 itemValue;  //物品价值
类型Double   名称 cost;     //单位售价  （比如5000龙门币卖7代币  单位售价是7/5000)
类型String   名称 rawCost;    //商店原始售价
类型Double   名称 costPer;     //性价比
类型String   名称 storeType;  //商店类型
 ```

### 获取所有物品价值(JsonArray)
 ```
url:  /api/find/item/value
无参数
 ```
 ```
类型String    名称itemId;  //物品id
类型String    名称itemName; //物品名称
类型Double    名称itemValue; //物品价值
类型String    名称type; //物品稀有度
类型String    名称cardNum;  //前端排序的用索引
 ```

### 获取历史活动最优图(JsonArray)
 ```
url:  /api/find/stage/activity/closed
无参数
 ```
 ```
 类型String    名称 stageId  // 关卡id
 类型String    名称 chapterName //章节名称
 类型Integer   名称 code  //章节顺序
 类型Integer   名称 times  // 样本次数
 类型String    名称 itemId   //产物ID
 类型String    名称 itemName    //产物名称
 类型String    名称 stageName   // 关卡名称
 类型Double    名称 probability   // 概率
 类型Double    名称 request   // 单项结果
 类型Double    名称 expect // 期望理智
 类型String    名称 main // 主产物
 类型Integer   名称 mainLevel // 主产物
 类型String    名称 type  //材料类型
 类型String    名称 secondary // 副产物
 类型String    名称 secondaryId
 类型Double    名称 efficiency  //绿票转化率
 类型Integer   名称 isShow   // 是否显示
 类型Integer   名称 isUseValue  //是否参与定价
 类型Integer   名称 color  // 关卡标注颜色
 类型Double    名称 percentage    //理智转化率
 类型String    名称 updateDate  //更新时间
 类型String    名称 spm  //每分钟消耗理智
 类型String    名称 activityName //活动名称
 类型Double    名称 efficiencyEx  // 绿票转化率（ 理智小样
 类型String    名称 extraItem //  理智小样
 类型Double    名称 confidence  // 样本置信度
 ```


