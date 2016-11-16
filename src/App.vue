<template>
  <div id="app">
    <loading :show="isLoading" position="fixed"></loading>
    <router-view :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"></router-view>
    <tabbar v-if="isTabbar" :tab="pathName"></tabbar>
    <toast :show="addressSuccess">操作成功</toast>
    <toast :show="addressError" type="cancel">操作失败</toast>
    <toast :show="cartError" type="cancel">打开购物车失败</toast>
  </div>
</template>

<script>
  import Tabbar from './components/tabbar.vue'
  import store from './vuex/store'
  import {isLoading, direction, addressSuccess, addressError, cartError} from './vuex/getters'
  import {resetAddressError, resetAddressSuccess, resetCartError} from './vuex/actions'
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
        effect: 'fade'
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
        cartError
      },
      actions: {
        resetAddressError,
        resetAddressSuccess,
        resetCartError
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
