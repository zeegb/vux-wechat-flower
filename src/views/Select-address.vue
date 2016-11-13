<template>
  <div class="v-alist">
    <!-- 头部 -->
    <x-header class="v-hd">
      收货地址
      <span class="f-c1" slot="right" v-link="{path:'edit-address'}">新建</span>
    </x-header>

    <div class="v-bd-1">
      <div class="v-addrList" v-if="!isEmpty">
        <div class="v-addrbd" v-for="(index,addrItem) in addressList">
          <!--<div class="stat"><i class="iconfont">&#xe60b;</i></div>-->
          <div class="cont">
            <div class="hd">
              <div class="name">{{addrItem.name}}</div>
              <div class="tel">{{addrItem.phone}}</div>
            </div>
            <div class="bd"><span class="defa" v-if="addrItem.is_default">默认</span>{{addrItem.address}}</div>
          </div>
          <div class="edit" v-link="{path:'edit-address',query:{id:index}}">
            <i class="iconfont">&#xe60a;</i>
          </div>
        </div>
      </div>
      <div class="no-address" v-if="isEmpty">
        <image src="../../src/assets/addr.png"></image>
        <p style="text-align:center;">暂未创建收货地址~</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../assets/styles/iconfont.scss';

  @mixin borderBottom {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #cecece;
    transform: scaleY(.5);
  }

  @mixin borderLeft {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-left: 1px solid #cecece;
    transform: scaleX(.5);
  }

  .v-alist {
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

  .v-bd-1 {
  }

  .v-addrbd {
    position: relative;
    display: flex;
    padding: 0 0 5px 15px;
    background: #fff;
    &:before {
      @include borderBottom;
    }
    .stat {
      padding: 15px 10px 0 0;
      font-size: 20px;
      color: #f00;
    }
    .cont {
      flex: 1;
      .hd {
        display: flex;
        line-height: 20px;
        padding: 5px 0;
        .name {
          flex: 1;
        }
        .tel {
          text-align: right;
        }
      }
      .bd {
        line-height: 18px;
        font-size: 14px;
        color: #666;
        .defa {
          display: inline-block;
          line-height: 14px;
          margin-right: 5px;
          padding: 1px 5px;
          background: #f00;
          color: #fff;
        }
      }
    }
    .edit {
      position: relative;
      margin-top: 15px;
      margin-left: 15px;
      padding: 0 15px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      background: #fff;
      color: #666;
      &:before {
        @include borderLeft;
      }
      i {
        font-size: 18px;
      }
    }
  }

  .no-address {
    color: #69717d;
    width: 50%;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
<script>
  import XHeader from 'vux/dist/components/x-header'
  import AddressChinaData from '../libs/list.json'
  import {addressList, isEmpty, getUserId} from '../vuex/getters'
  import {getAddress, setDefaultAddress, setSelectAddress} from '../vuex/actions'
  export default{
    vuex: {
      getters: {
        addressList,
        isEmpty,
        getUserId
      },
      actions: {
        getAddress,
        setDefaultAddress,
        setSelectAddress
      }
    },
    route: {
      data (transition) {
        this.getAddress(this.getUserId)
        this.pathFrom = this.$route.query.type
      },
      canReuse (transition) {
        return false
      },
      deactivate (transition) {
        transition.next()
      }
    },
    data () {
      return {
        // 编辑收货地址
        addressData: AddressChinaData,
        aeditName: '',
        aeditTel: '',
        aeditVal: ['福建省', '厦门市', '思明区'],
        aeditTxt: '',
        aeditCon: '',
        pathFrom: ''
      }
    },
    watch: {
      addressList (curVal, oldVal) {
        var classObj = document.getElementsByClassName('cont')
        for (var i = 0; i < classObj.length; i++) {
          classObj[i].addEventListener('click', this.setDefault.bind(classObj[i], i))
        }
      }
    },
    components: {
      XHeader
    },
    methods: {
      setDefault (index) {
        console.log('--------点击默认-------')
        if (this.pathFrom === 'person') {
          this.setDefaultAddress(this.addressList[index]._id, this.getUserId)
        } else if (this.pathFrom === 'order') {
          this.setSelectAddress(this.addressList[index])
          window.history.back()
        }
      }
    }
  }
</script>
