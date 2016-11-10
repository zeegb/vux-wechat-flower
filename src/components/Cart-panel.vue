<template>
  <div class="weui_panel weui_panel_access cart-box">
    <div class="weui_panel_bd">
      <div v-for="(index,item) in list" v-show="item.count > 0"
         class="weui_media_box weui_media_appmsg " >
        <div class="sel">
          <label>
            <input type="checkbox" name="" id="" v-model="item.checked">
          </label>
        </div>
        <div class="weui_media_hd" v-if="item.count > 0">
          <img class="weui_media_appmsg_thumb" :src="item.src" alt="">
        </div>
        <div class="weui_media_bd" v-if="item.count > 0">
          <h4 class="weui_media_title">{{item.title}}</h4>
          <div class="weui_media_desc">
            <p class="product-item-foot">
              <span class="rmb">￥</span><strong class="price">{{item.price}}</strong>
              <span class="sold-out-text">销量</span><span class="product-item-sold-out">{{item.soldOut}}</span>
              <x-number title="数量" :min=0 :max=8 :value.sync="item.count"></x-number>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .cart-box {
    margin: 0px 10px;
    box-shadow: 0 0 3px #cacaca;
    border-radius: 5px;
  }

  .product-item-foot {
    margin-top: 5px;
  }

  .product-item-foot .star {
    float: right;
    margin-top: 3px;
  }

  .rmb {
    color: #f60;
    font-size: 10px;
  }

  .price {
    font-size: 16px;
    color: #d30;
    margin-right: 10px;
  }
  .sel {
    padding: 0 15px;
    font-size: 14px;
  }

  .sold-out-text {
    margin-right: 5px;
  }
</style>
<script>
  import XNumber from 'vux/dist/components/x-number'

  export default {
    components: {
      XNumber
    },
    props: {
      header: String,
      footer: String,
      list: Array,
      type: {
        type: String,
        default: '1'
      }
    },
    methods: {
//      onItemClick (index, item) {
//        item.count = parseInt(this.$get('count'))
//        this.$set(index, index)
//        this.$dispatch('on-click-item', item)
//      },
//      change: function (val) {
//        console.log('change', val)
//        this.$set('count', val)
//        console.log('__change', this.$get('count'))
//      }
    },
    data () {
      return {
      }
    }
  }
</script>
