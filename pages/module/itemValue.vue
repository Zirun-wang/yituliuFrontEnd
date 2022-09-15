<template>
  <div>
    <div id="value">
      <!-- 标题区域 -->
      <div class="op_title">
        <div class="op_title_text">
          <div class="op_title_ctext">
            价值一览
          </div>
          <div class="op_title_etext">
            Material Value
          </div>

          <div class="op_title_tag">
            <div id="value_switch_to_saint" :class="tag_class_sanity" @click="switchUnit(1)">
              等效理智
            </div>
             <div id="value_switch_to_green" :class="tag_class_green" @click="switchUnit(2)">
              等效绿票
            </div>
            <div class="tab_text">
            导出Excel
            </div>
            <div class="tab_text">
            导出Json
            </div>
          </div>
        </div>
      </div>

      <div class="value_content" style="display: flex;flex-wrap: wrap;">
        <div v-for="(card, index) in cardNum" :key="index" class="item_card">
          <div v-for="(item, index) in itemList" :key="index" class="item_width">
            <div :class="getItemValueCard(card, item.cardNum, item.type)" v-show="item.id < 70">
              <table>
                <tbody>
                <tr>
                  <td style="padding:0px;">
                    <img class="item_img_size" :src="static_imgUrl(item.itemName)" :alt="getItemName(item.itemName)"/>
                  </td>
                  <td v-show="valueType == 'sanity'" class="item_card_value_font"  style="padding:0px;color: gray">
                    {{ getItemsanityValue(item.itemId, item.itemValue) }}
                  </td>
                  <td v-show="valueType == 'green'" class="item_card_value_font"  style="padding:0px;color: gray">
                    {{ getItemGreenValue(item.itemId, item.itemValue) }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

    </div>



  </div>
</template>

<script>
import storeApi from "@/api/store";

export default {
  data() {
    return {
      itemList: [], //全部材料价值集合
      cardNum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      itemCardsanity: "",
      itemValueCard_css: "",
      tag_class_green: "yituliu_title_moudule_button",
      tag_class_sanity: "yituliu_title_moudule_button",
    };
  },
  created() {
    this.switchUnit(1);
    this.findAllItemValue();
  },
  methods: {
    findAllItemValue() {
      storeApi.findAllItem().then((response) => {
        this.itemList = [];
        for (let i in response.data) {
          this.itemList.push(response.data[i]);
        }
      });
    },

    //切换价值单位
    switchUnit(index) {
      if (index == 1) {
        this.valueType = "sanity";
        this.changeItemTagColor(1);
      } else {
        this.valueType = "green";
        this.changeItemTagColor(2);
      }
    },

    //隐藏价值表
    cardHidden(index) {
      if (this.itemValueCard_css == "itemHeight") {
        this.itemValueCard_css = "";
      } else {
        this.itemValueCard_css = "itemHeight";
      }
    },

    getItemGreenValue(id, num) {
      if (id == "4001") {
        return parseFloat(num).toFixed(4);
      }
      return parseFloat(num).toFixed(3);
    },
    getItemsanityValue(id, num) {
      if (id == "4001") {
        return parseFloat(num * 0.8).toFixed(4);
      }
      return parseFloat(num * 0.8).toFixed(3);
    },

    //切换价值单位tag样式
    changeItemTagColor(index) {
      if (index == 2) {
        this.tag_class_green = "op_tag_1";
        this.tag_class_sanity = "op_tag_0";
      } else if (index == 1) {
        this.tag_class_green = "op_tag_0";
        this.tag_class_sanity = "op_tag_1";
      }
    },

    getItemValueCard(index, cardNum, type) {
      if (index == cardNum) {
        return "item_color_type_" + type;
      } else {
        return "hidden";
      }
    },

    static_imgUrl(img) {
      img = typeof img !== "undefined" ? img : 1;

      return "/img/materials/" + img + ".png";
    },
    getItemName(item) {
      return item;
    },

    OSS_imgUr1l(img) {
      img = typeof img !== "undefined" ? img : 1;

      return (
        "https://yygh-atbriup.oss-cn-beijing.aliyuncs.com/item/" + img + ".png"
      );
    },
  },
};
</script>



