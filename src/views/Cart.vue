<template>
  <div class="v-cart">
    <x-header :left-options="{showBack: false}" :right-options="{showMore: true}"
              @on-click-more="showMenus = true" class="v-hd">购物车
    </x-header>
    <div style="margin-top: 10px;">
      <cartpanel :list.sync="list"></cartpanel>
      <group style="padding:0 10px;">
        <x-button :disabled="disable001" @click="cacheOrder" type="primary">提交订单&nbsp;￥{{total}}
        </x-button>
      </group>
    </div>
    <toast :show.sync="orderIsEmpty" type="cancel">再逛逛啦~</toast>
  </div>
</template>

<script>
  import Tabbar from '../components/tabbar.vue'
  import XHeader from 'vux/dist/components/x-header'
  import Cartpanel from '../components/Cart-panel2.vue'
  import Group from 'vux/dist/components/group'
  import XButton from 'vux/dist/components/x-button'
  import Cell from 'vux/dist/components/cell'
  import Toast from 'vux/dist/components/toast'
  import {getUserId, cartList} from '../vuex/getters'
  import {getCartList, setCacheOrder} from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        getUserId, cartList
      },
      actions: {
        getCartList, setCacheOrder
      }
    },
    route: {
      data (transition) {
        this.getCartList(this.getUserId)
      },
      deactivate (transition) {
        transition.next()
      }
    },
    components: {
      Tabbar,
      XHeader,
      Cartpanel,
      Group,
      XButton,
      Cell,
      Toast
    },
    data () {
      return {
        submit001: '提交订单',
        disable001: false,
        list: [],
        orderIsEmpty: false
      }
    },
    ready: function () {
    },
    computed: {
      total: function () {
        let sum = 0
        this.$get('list').forEach(function (item) {
          if (item.checked) sum += parseFloat(item.pri * item.num)
        })
        return sum.toFixed(2)
      }
    },
    watch: {
      cartList () {
        this.cartList.map((item, index) => {
          this.$set(`list[${index}]`, {
            img: item.product.pictures[0],
            name: item.product.name,
            pri: item.total_fee,
            num: item.count,
            sku: '',
            checked: false,
            cartId: item._id,
            pid: item.product_id
          })
          item.price_list.map((pItem, pIndex) => {
            this.list[index].sku += (pItem.title + ':' + pItem.sub_type[0].name + '   ')
          })
        })
      }
    },
    methods: {
      cacheOrder () {
        this.submit001 = '结算中'
        this.disable001 = true
        var cacheOrder = []
        this.$get('list').forEach(item => {
          if (item.checked) cacheOrder.push(item)
        })
        if (cacheOrder.length > 0) {
          this.setCacheOrder(cacheOrder)
          this.$nextTick(function () {
            this.$route.router.go('/order')
          })
        } else {
          this.orderIsEmpty = true
          this.submit001 = '提交订单'
          this.disable001 = false
        }
      }
    },
    events: {
      change (value) {
        console.log('change:', value)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @mixin borderBottom {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #cecece;
    transform: scaleY(.5);
  }

  .v-cart {
    padding-top: 44px;
  }

  .v-hd {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 44px;
    background-color: #000011;
    opacity: 0.7;
  }

  .bd {
    position: relative;
    &:before {
      @include borderBottom;
    }
  }

  .rmb {
    color: #6D4100;
  }

  .buy-btn {
    background-color: #2FCA60;
    color: #3a33d1;
  }
</style>
