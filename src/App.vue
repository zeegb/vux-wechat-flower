<template>
  <div id="app">
    <loading :show="isLoading" position="fixed"></loading>
    <router-view :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"></router-view>
  </div>
</template>

<script>
  import store from './vuex/store'
  import {isLoading, direction} from './vuex/getters'
  import Loading from 'vux/dist/components/loading'
  export default {
    components: {
      Loading
    },
    data () {
      return {
        effect: 'fade'
      }
    },
    store: store,
    vuex: {
      getters: {
        isLoading,
        direction
      }
    }
  }
</script>

<style lang="less">
  @import 'styles/index.less';
  @import './styles/weui/base/reset';
  @import '../node_modules/vux/dist/vux.css';
  @import '../node_modules/vux/src/styles/reset';

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
    height: 94%;
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
