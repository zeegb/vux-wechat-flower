<template>
  <div class="weui_tab_tabbar">
    <tabbar>
      <tabbar-item show-dot :selected="tab == 'Home'" v-link="{name:'Home'}">
        <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_button.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot :selected="tab == 'Card'" v-link="{name:'Card'}">
        <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_button.png">
        <span slot="label">贺卡</span>
      </tabbar-item>
      <tabbar-item show-dot :selected="tab == 'Cart'" v-link="{name:'Cart'}">
        <img slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_button.png">
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item show-dot :selected="tab == 'Person'" v-link="{name:'Person'}">
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
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 55px;
  }

</style>
