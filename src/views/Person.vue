<template>
  <x-header :left-options="{showBack: false}" :right-options="{showMore: false}">我的</x-header>
  <div>
    <panel :list="panel_list" :type="panel_type"></panel>
    <card :header="{title:'我的钱包'}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-l vux-1px-r">
          <span>1130</span>
          <br/>
          积分
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/>
          优惠券
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/>
          余额
        </div>
        <div>
          <span>88</span>
          <br/>
          代金卡
        </div>
      </div>
    </card>

    <group>
      <cell title="我的订单" is-link v-link="{path:'order-list'}"></cell>
      <cell title="地址管理" is-link v-link="{path:'select-address'}"></cell>
      <cell title="实名认证" is-link></cell>
      <cell title="账号安全" is-link></cell>
    </group>

  </div>
  <tabbar tab="person"></tabbar>
</template>

<script>
  import Tabbar from '../components/tabbar.vue'
  import Card from 'vux/dist/components/card'
  import Group from 'vux/dist/components/group'
  import Cell from 'vux/dist/components/cell'
  import Panel from 'vux/dist/components/panel'
  import XHeader from 'vux/dist/components/x-header'

  const panelList = [{
    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
    title: '王泽',
    desc: '用户名:11122233',
    url: '/person-setting'
  }]

  export default {
    components: {
      Tabbar,
      XHeader,
      Card,
      Group,
      Cell,
      Panel
    },
    data () {
      return {
        panel_type: '1',
        panel_list: panelList
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../styles/1px.less';

  .card-demo-flex {
    display: flex;
  }

  .card-demo-content01 {
    padding: 10px 0;
  }

  .card-padding {
    padding: 15px;
  }

  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }

  .card-demo-flex span {
    color: #f74c31;
  }
</style>
