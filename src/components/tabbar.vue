<template>
  <div class="weui_tab_tabbar">
    <tabbar>
      <tabbar-item show-dot :selected="tab == 'home'" v-link="{name:'Home'}">
        <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_button.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot :selected="tab == 'card'" v-link="{name:'Card'}">
        <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_button.png">
        <span slot="label">贺卡</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_button.png">
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item show-dot :selected="tab == 'person'" v-link="{name:'Person'}">
        <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_button.png">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import Tabbar from 'vux/dist/components/tabbar'
  import TabbarItem from 'vux/dist/components/tabbar-item'

  export default {
    ready () {
      document.querySelector('body').style.height = '100%'
      document.querySelector('html').style.height = '100%'
      document.querySelector('#app').style.height = '100%'
    },
    components: {
      Tabbar,
      TabbarItem
    },
    props: ['tab']
  }
</script>

<style type="text/css">
  .weui_tab_tabbar {
    position:fixed;
    bottom:0;
    width:100%;
  }
</style>
