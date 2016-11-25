<template>
  <!-- 头部 -->
  <div class="v-cou">
    <x-header class="v-hd">
      我的优惠券
    </x-header>
    <tab>
      <tab-item :selected="tabProsNum === 1" @click="tabProsFn(1)">已领取</tab-item>
      <tab-item :selected="tabProsNum === 0" @click="tabProsFn(0)">未领取</tab-item>
    </tab>
    <!-- 未领取列表 -->
    <div class="v-coupons" v-show="!isShowGet">
      <div class="v-coupon" v-for="(key,items) of noGetList" track-by="$index" :class="items.disabled ? 'z-dis': ''">
        <div class="l">
          <div class="hd">￥{{items.voucher_value}}</div>
          <!--<div class="bd">满{{items.lower_price}}使用</div>-->
        </div>
        <div class="m">
          <div class="name">{{items.name}}</div>
          <div class="txt">{{items.usage}}</div>
          <div class="txt">使用详情:{{items.description}}</div>
        </div>
        <div class="r" @click="getFn(key)">
          <div class="get">立即领取</div>
        </div>
      </div>
    </div>

    <!-- 已领取列表 -->
    <div class="v-coupons" v-show="isShowGet">
      <div class="v-coupon" v-for="(key,items) of getList" track-by="$index" :class="items.disabled ? 'z-past': ''">
        <div class="l">
          <div class="hd">￥{{items.voucher_value}}</div>
        </div>
        <div class="m">
          <div class="name">{{items.name}}</div>
          <div class="txt">{{items.usage}}</div>
          <div class="txt">使用详情:{{items.description}}</div>
        </div>
        <div class="r">
          <div class="get" @click="setCurrent(key)">立即使用</div>
        </div>
      </div>
    </div>
    <toast :show.sync="applySuccess">领取成功</toast>
    <toast :show.sync="applyError" type="cancel">领取失败</toast>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Tab from 'vux/dist/components/tab'
  import TabItem from 'vux/dist/components/tab-item'
  import Toast from 'vux/dist/components/toast'
  import {getUserId, cacheOrder, allCouponList, personCouponList} from '../vuex/getters'
  import {getCouponList, setCurrentCoupon} from '../vuex/actions'
  import {haveSame} from '../libs/utils'

  export default {
    vuex: {
      getters: {
        getUserId, cacheOrder, allCouponList, personCouponList
      },
      actions: {
        getCouponList, setCurrentCoupon
      }
    },
    components: {
      XHeader,
      Tab,
      TabItem,
      Toast
    },
    route: {
      data (transition) {
        this.getCouponList(this.getUserId)
        this.getCouponList('')
      }
    },
    data () {
      return {
        tabProsNum: 1,
        isShowGet: true,
        noGetList: [],
        getList: [],
        applyError: false,
        applySuccess: false
      }
    },
    ready () {
    },
    watch: {
      allCouponList () {
        let productArr = this.cacheOrder.map(item => {
          return item.pid
        })
        let getArr = this.personCouponList.map(item => {
          return item._id
        })
        let nGList = this.allCouponList.filter(item => {
          let isMatch = haveSame(productArr, item.products) && getArr.indexOf(item._id) === -1
          return isMatch
        })
        this.$set('noGetList', nGList)
      },
      personCouponList () {
        let productArr = this.cacheOrder.map(item => {
          return item.pid
        })
        let gList = this.personCouponList.filter(item => {
          let isMatch = haveSame(productArr, item.products)
          return isMatch
        })
        this.$set('getList', gList)
      }
    },
    methods: {
      tabProsFn (n) {
        this.tabProsNum = n
        this.isShowGet = !!n
        if (this.isShowGet) {
          this.getCouponList(this.getUserId)
        } else {
          this.getCouponList('')
        }
      },
      getFn (key) {
        this.$http.post('/wx/coupons/apply', {
          openid: this.getUserId,
          coupon_id: this.noGetList[key]._id
        }).then((res) => {
          if (res.body && res.body.code === '200') {
            this.getList.unshift(this.noGetList[key])
            this.noGetList.splice(key, 1)
            this.applySuccess = true
          } else {
            this.applyError = true
          }
        }, (err) => {
          console.log('领取失败:' + err)
          this.applyError = true
        })
      },
      setCurrent (key) {
        this.setCurrentCoupon(this.getList[key])
        window.history.back()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .v-cou {
    padding-top: 44px;
  }

  // 自定义头部
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

  .v-ghd {
    background-color: #c50a1d;
  }

  .v-coupons {
    padding: 10px;
  }

  .v-coupon {
    display: flex;
    position: relative;
    margin-bottom: 10px;
    &.z-dis {
      &:after {
        content: '已抢光';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(190, 190, 190, 0.8);
        color: #ff4fad;
      }
    }
    &.z-past {
      &:after {
        content: '已失效';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(190, 190, 190, 0.8);
        color: #ff4fad;
      }
    }
    .l {
      padding: 10px 4px;
      white-space: nowrap;
      text-align: center;
      background: #fc0;
      .hd {
        font-weight: 700;
        font-size: 20px;
        color: #fff;
      }
      .bd {
        font-size: 12px;
        color: #666;
      }
    }
    .m {
      flex: 1;
      border-left: 1px dotted #ececec;
      background: #fc0;
      padding: 5px 2px 0 4px;
      .name {
        font-size: 16px;
      }
      .txt {
        font-size: 12px;
        color: #666;
      }
    }
    .r {
      display: flex;
      padding: 0 10px;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #fff;
      background: #cecece;
      font-size: 12px;
      .get {
        width: 30px;
      }
    }
  }
</style>
