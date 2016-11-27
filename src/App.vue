<template>
  <div id="app">
    <loading :show="isLoading" position="fixed"></loading>
    <router-view :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"></router-view>
    <tabbar v-if="isTabbar && direction === 'up'" :tab="pathName" :cart-list="cartList"></tabbar>
    <toast :show="addressSuccess">操作成功</toast>
    <toast :show="addressError" type="cancel">操作失败</toast>
    <toast :show="cartError" type="cancel">打开购物车失败</toast>
    <toast :show="showExpressAlert" type="warn">暂不支持该区域配送</toast>
  </div>
</template>

<script>
  import Tabbar from './components/tabbar.vue'
  import store from './vuex/store'
  import {
    isLoading,
    direction,
    addressSuccess,
    addressError,
    cartError,
    showExpressAlert,
    getUserId,
    cartList
  } from './vuex/getters'
  import {resetAddressError, resetAddressSuccess, resetCartError, resetCanExpress, getCartList} from './vuex/actions'
  import Loading from 'vux/dist/components/loading'
  import Toast from 'vux/dist/components/toast'
  export default {
    components: {
      Loading,
      Tabbar,
      Toast
    },
    data () {
      return {
        effect: 'fade',
        direction: 'up'
      }
    },
    computed: {
      isTabbar () {
        if (this.route.name === 'Home') return true
        if (this.route.name === 'Card') return true
        if (this.route.name === 'Cart') return true
        if (this.route.name === 'Person') return true
      },
      pathName () {
        if (this.route.name === 'Home') return 'Home'
        if (this.route.name === 'Card') return 'Card'
        if (this.route.name === 'Cart') return 'Cart'
        if (this.route.name === 'Person') return 'Person'
      }
    },
    ready () {
      this.scroll((direction) => {
        this.direction = direction
      })
      this.getCartList(this.getUserId)
    },
    watch: {
      addressSuccess (curVal, oldVal) {
        setTimeout(() => {
          this.resetAddressSuccess()
        }, 2000)
      },
      addressError (curVal, oldVal) {
        setTimeout(() => {
          this.resetAddressError()
        }, 2000)
      },
      cartError (curVal, oldVal) {
        setTimeout(() => {
          this.resetCartError()
        }, 2000)
      },
      showExpressAlert (curVal, oldVal) {
        setTimeout(() => {
          this.resetCanExpress()
        }, 2000)
      }
    },
    store: store,
    vuex: {
      getters: {
        route: (state) => state.route,
        isLoading,
        direction,
        addressSuccess,
        addressError,
        cartError,
        showExpressAlert,
        getUserId,
        cartList
      },
      actions: {
        resetAddressError,
        resetAddressSuccess,
        resetCartError,
        resetCanExpress,
        getCartList
      }
    },
    methods: {
      scroll (fn) {
        let beforeScrollTop = document.body.scrollTop
        window.addEventListener('scroll', function () {
          let afterScrollTop = document.body.scrollTop
          let delta = afterScrollTop - beforeScrollTop
          if (delta === 0) return false
          fn(delta > 0 ? 'down' : 'up')
          beforeScrollTop = afterScrollTop
        }, false)
      }
    }
  }
</script>

<style lang="less">
  @import './styles/close';
  @import '~vux/dist/vux.css';
  @import './styles/font-awesome-4.7.0/less/font-awesome';

  html, body {
    width: 100%;
    overflow-x: hidden;
    height: auto !important;
  }

  body {
    background-color: #fbf9fe;
  }

  /*transition*/
  .cover-in-transition {
    opacity: 1;
    transition: .35s opacity ease;
  }

  .cover-in-enter {
    transform: translate3d(80%, 0, 0);
  }

  .cover-in-leave {
    transition: .25s all ease;
    transform: translate3d(100%, 0, 0);
  }

  /**
  * vue-router transition
  */
  .vux-pop-out-transition,
  .vux-pop-in-transition {
    width: 100%;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    backface-visibility: hidden;
  }

  .tabbar-transition {
  }

  .vux-pop-out-enter,
  .vux-pop-out-leave,
  .vux-pop-in-enter,
  .vux-pop-in-leave {
    will-change: transform;
    height: 100%;
    position: absolute;
    left: 0;
  }

  .vux-pop-out-enter {
    animation-name: popInLeft;
  }

  .vux-pop-out-leave {
    animation-name: popOutRight;
  }

  .vux-pop-in-enter {
    perspective: 1000;
    animation-name: popInRight;
  }

  .vux-pop-in-leave {
    animation-name: popOutLeft;
  }

  .tabbar-enter {
    animation: tabbarIn 1s;
  }

  .tabbar-leave {
    animation: tabbarOut 1s;
  }

  @keyframes tabbarOut {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(100%);
    }
  }

  @keyframes tabbarIn {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes popInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes popOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes popInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes popOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
