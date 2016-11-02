<template>
  <div class="v-cart">
    <x-header :left-options="{showBack: false}" :right-options="{showMore: true}"
              @on-click-more="showMenus = true" class="v-hd">购物车
    </x-header>
    <div style="margin-top: 20px;">
      <cartpanel :type="'1'" :list.sync="list"></cartpanel>
      <group>
        <cell title="总计">
          <div slot="value">
            <span class="rmb">￥</span>
            <span style="color: red">{{total}}</span>
          </div>
        </cell>
      </group>
      <group style="padding:0 10px;">
        <x-button :text="submit001" :disabled="disable001" @click="processButton001" type="primary"
                  v-link="'/order'"></x-button>
      </group>
    </div>
  </div>
</template>

<script>
  import Tabbar from '../components/tabbar.vue'
  import XHeader from 'vux/dist/components/x-header'
  import Cartpanel from '../components/Cart-panel.vue'
  import Group from 'vux/dist/components/group'
  import XButton from 'vux/dist/components/x-button'
  import Cell from 'vux/dist/components/cell'

  export default {
    components: {
      Tabbar,
      XHeader,
      Cartpanel,
      Group,
      XButton,
      Cell
    },
    data () {
      return {
        submit001: '提交订单',
        disable001: false,
        list: [{
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '牡丹花',
          price: 25.2,
          soldOut: 2258,
          count: 2,
          checked: false
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '茉莉花',
          price: 15.3,
          soldOut: 3389,
          count: 3,
          checked: false
        }]
      }
    },
    ready: function () {
//      let isLogin = window.sessionStorage.getItem('logined')
//      if (!isLogin) {
//        this.$route.router.go('/user/login')
//      }
    },
    computed: {
      total: function () {
        let sum = 0
        this.$get('list').forEach(function (item) {
          if (item.checked) sum += parseFloat(item.price * item.count)
        })
        return sum.toFixed(2)
      }
    },
    methods: {
      change (value) {
        console.log('change:', value)
      },
      processButton001 () {
        this.submit001 = '结算中'
        this.disable001 = true
      }
    }
  }
</script>
<style scoped>
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

  .rmb {
    color: #6D4100;
  }

  .buy-btn {
    background-color: #2FCA60;
    color: #3a33d1;
  }
</style>
