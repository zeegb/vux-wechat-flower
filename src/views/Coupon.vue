<template>
  <!-- 头部 -->
  <div class="v-cou">
    <x-header class="v-hd">
      我的优惠券
    </x-header>
    <tab>
      <tab-item :selected="this.tabProsNum === 0" @click="tabProsFn(0)">未领取</tab-item>
      <tab-item :selected="this.tabProsNum === 1" @click="tabProsFn(1)">已领取</tab-item>
    </tab>
    <!-- 未领取列表 -->
    <div class="v-coupons" v-show="!isShowGet">
      <div class="v-coupon" v-for="(key,items) of noGetList" track-by="$index" :class="items.isEmpty ? 'z-dis': ''">
        <div class="l">
          <div class="hd">￥{{items.value}}</div>
          <div class="bd">满{{items.lower_price}}使用</div>
        </div>
        <div class="m">
          <div class="name">{{items.coupon_name}}</div>
          <div class="txt">{{items.use_range}}</div>
          <div class="txt">使用期限:{{items.use_time}}</div>
        </div>
        <div class="r" @click="getFn(key)">
          <div class="get">立即领取</div>
        </div>
      </div>
    </div>

    <!-- 已领取列表 -->
    <div class="v-coupons" v-show="isShowGet">
      <div class="v-coupon" v-for="items of getList" track-by="$index" :class="items.isPast ? 'z-past': ''">
        <div class="l">
          <div class="hd">￥{{items.value}}</div>
          <div class="bd">满{{items.lower_price}}使用</div>
        </div>
        <div class="m">
          <div class="name">{{items.coupon_name}}</div>
          <div class="txt">{{items.use_range}}</div>
          <div class="txt">使用期限:{{items.use_time}}</div>
        </div>
        <div class="r">
          <div class="get">立即使用</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Tab from 'vux/dist/components/tab'
  import TabItem from 'vux/dist/components/tab-item'

  export default {
    components: {
      XHeader,
      Tab,
      TabItem
    },
    data () {
      return {
        tabProsNum: 0,
        isShowGet: false,
        noGetList: [{
          id: Date.now(),
          value: '20',
          lower_price: '100',
          coupon_name: '名称',
          use_range: '仅可购买牡丹花',
          use_time: '2016.01.01~2016.12.12',
          isEmpty: false,
          isPast: false,
          isGet: false
        }],
        getList: [{
          id: Date.now(),
          value: '15',
          lower_price: '50',
          coupon_name: '名称',
          use_range: '仅可购买牡丹花',
          use_time: '2016.01.01~2016.12.12',
          isEmpty: true,
          isPast: true,
          isGet: false
        }]
      }
    },
    ready () {
//        this.$http.get('/api/shopping/coupons.htm').then(res => {
//            if (res.ok) {
//                let data = JSON.parse(res.data)
//                this.noGetList = data.rows
//                this.getList = data.rows2
//            }
//        })
    },
    methods: {
      tabProsFn (n) {
        this.tabProsNum = n
        this.isShowGet = !!n
      },
      getFn (key) {
        this.getList.unshift(this.noGetList[key])
        this.noGetList.splice(key, 1)

        // 提交数据变更
        // this.$http.past('/api/shopping/coupons-update.htm').then(res => {
        //     console.log(res.ok)
        // })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/styles/iconfont.scss';

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
        content: '已过期';
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
