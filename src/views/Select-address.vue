<template>
  <div class="v-alist">
    <!-- 头部 -->
    <x-header class="v-hd">
      收货地址
      <span class="f-c1" slot="right" v-link="{path:'edit-address'}">新建</span>
    </x-header>

    <div class="v-bd-1">
      <div class="v-addrList">
        <div class="v-addrbd">
          <div class="stat"><i class="iconfont">&#xe60b;</i></div>
          <div class="cont">
            <div class="hd">
              <div class="name">张三</div>
              <div class="tel">12312312313</div>
            </div>
            <div class="bd"><span class="defa">默认</span>北京市丰台区蒲黄榆四里14号楼305室</div>
          </div>
          <div class="edit">
            <i class="iconfont">&#xe60a;</i>
          </div>
        </div>


        <div class="v-addrbd">
          <!-- <div class="stat"><i class="iconfont">&#xe60b;</i></div> -->
          <div class="cont">
            <div class="hd">
              <div class="name">张三</div>
              <div class="tel">12312312313</div>
            </div>
            <div class="bd">北京市丰台区蒲黄榆四里14号楼305室</div>
          </div>
          <div class="edit">
            <i class="iconfont">&#xe60a;</i>
          </div>
        </div>
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
  }

  .v-bd-1 {}

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
      // flex: 1;
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
      flex: 1;
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
</style>
<script>
  import XHeader from 'vux/dist/components/x-header'
  import AddressChinaData from 'vux/src/components/address/list.json'
  export default{
    data () {
      return {
        addrList: [],

        // 编辑收货地址
        addressData: AddressChinaData,
        aeditName: '',
        aeditTel: '',
        aeditVal: ['福建省', '厦门市', '思明区'],
        aeditTxt: '',
        aeditCon: ''
      }
    },
    components: {
      XHeader
    }
  }
</script>
