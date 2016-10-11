<template>
  <div class="v-aedit">
    <!-- 头部 -->
    <x-header :left-options="{showBack: true}" class="v-hd">
      收货地址
      <span class="f-c1" slot="right">保存</span>
    </x-header>

    <div class="v-bd weui_cells">
      <x-input title="姓&nbsp;&nbsp;名" :value.sync="aeditName" name="username" placeholder="请输入姓名" is-type="china-name"
               :show-clear="false"></x-input>
      <x-input title="手机号码" :value.sync="aeditTel" name="mobile" placeholder="请输入手机号码" keyboard="number"
               is-type="china-mobile" :show-clear="false"></x-input>
      <address title="选择省市" :value.sync="aeditVal" raw-value :list="addressData"></address>
      <x-input title="详细地址" :value.sync="aeditTxt" placeholder="无需再写省市区" :show-clear="false"></x-input>
    </div>
  </div>
</template>
<style lang="scss" scoped>

  .v-aedit {
    padding-top: 44px;
  }

  .v-hd {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 44px;
  }

  .f-c1 {
    color: #fff;
  }
</style>
<script>
  import XHeader from 'vux/dist/components/x-header'
  import XInput from 'vux/dist/components/x-input'
  import Address from 'vux/dist/components/address'
  import AddressChinaData from 'vux/src/components/address/list.json'
  export default{
    data () {
      return {
        addrList: [],

        // 编辑收货地址
        addressData: AddressChinaData,
        aeditName: '',
        aeditTel: '',
        aeditVal: ['北京市', '北京市市辖区', '东城区'],
        aeditTxt: '',
        aeditCon: ''
      }
    },
    components: {
      XHeader,
      XInput,
      Address
    }
  }
</script>
