<template>
  <div class="v-aedit">
    <!-- 头部 -->
    <x-header class="v-hd">
      收货地址
      <span class="f-c1" slot="right" @click="saveAddr">保存</span>
    </x-header>

    <div class="v-bd weui_cells">
      <x-input title="姓&nbsp;&nbsp;名" :value.sync="addr.name" name="username" placeholder="请输入姓名"
               is-type="china-name"></x-input>
      <x-input title="手机号码" :value.sync="addr.phone" name="mobile" placeholder="请输入手机号码" keyboard="number"
               is-type="china-mobile"></x-input>
      <address title="选择省市" :value.sync="addr.editVal" raw-value :list="addressData" placeholder="请选择地址"></address>
      <x-input title="详细地址" :value.sync="addr.addrText" placeholder="无需再写省市区"></x-input>
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
    background-color: #000011;
    opacity: 0.7;
  }

  .f-c1 {
    color: #fff;
  }
</style>
<script>
  import XHeader from 'vux/dist/components/x-header'
  import XInput from 'vux/dist/components/x-input'
  import Address from 'vux/dist/components/address'
  import Toast from 'vux/dist/components/toast'
  import AddressChinaData from '../libs/list.json'
  import value2name from '../libs/filter'
  import {addressList, getUserId, addressError, addressSuccess} from '../vuex/getters'
  import {setAddress, editAddress, resetAddressError, resetAddressSuccess} from '../vuex/actions'
  import {go} from '../libs/router'
  export default{
    vuex: {
      getters: {
        addressList,
        getUserId,
        addressError,
        addressSuccess
      },
      actions: {
        setAddress,
        editAddress,
        resetAddressError,
        resetAddressSuccess
      }
    },
    route: {
      data (transition) {
        if (transition.to.query.id) {
          this.addr = this.addressList[transition.to.query.id]
        } else {
          this.isInsert = true
        }
      },
      canReuse (transition) {
        return false
      }
//      deactivate (transition) {
//        this.resetAddressError()
//        this.resetAddressSuccess()
//        transition.next()
//      }
    },
    data () {
      return {
        addr: {},
        isInsert: false,
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
      Address,
      Toast
    },
    methods: {
      getName (value) {
        return value2name(value, AddressChinaData)
      },
      saveAddr () {
        if (this.isInsert) {
          var addrInfo = this.addr
//          addrInfo.editVal = this.getName(addrInfo.editVal).split(' ')
//          console.log(addrInfo.editVal)
          this.setAddress(addrInfo, this.getUserId, () => {
            window.history.back()
          })
        } else {
          this.editAddress(this.addr, this.getUserId)
          go('/select-address', this.$router)
        }
      }
    }
  }
</script>
