<template>
  <div class="v-my">
    <!-- 头部 -->
    <x-header class="v-hd">
      我的订单
    </x-header>

    <!-- 订单菜单 -->
    <tab>
      <tab-item :selected="tabSel === 0" @click="tabLovSel(0)">全部</tab-item>
      <tab-item :selected="tabSel === 1" @click="tabLovSel(1)">待付款</tab-item>
      <tab-item :selected="tabSel === 2" @click="tabLovSel(2)">待发货</tab-item>
      <tab-item :selected="tabSel === 3" @click="tabLovSel(3)">已发货</tab-item>
      <tab-item :selected="tabSel === 4" @click="tabLovSel(4)">已完成</tab-item>
    </tab>
    <!-- 订单主体 -->
    <div class="v-orders" v-show="tabSel === 0">
      <!-- 订单1 -->
      <div class="v-order" v-for="item in orderList" track-by="$index">
        <div class="v-shop">
          <div class="hd">
            <div class="tt">{{item.created_at}}</div>
            <div class="tc">{{item.status}}</div>
          </div>
          <div class="bd">
            <order-cell :proslist="item.products"></order-cell>
          </div>
          <div class="ft">
            <div class="total">共{{item.products.length}}种商品 合计：<span class="f-c2">¥ {{item.total_fee}}</span></div>
          </div>
        </div>
        <div class="v-btns">
          <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_primary"
                                    v-link="{path:'feedback'}"> 评价晒单 </button></span>
          <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_default"> 再次购买 </button></span>
        </div>
      </div>
    </div>

    <div class="v-orders" v-show="tabSel === 1">
      <!-- 订单1 -->
      <div class="v-order" v-for="item in orderList|filterBy '0' in 'system_status'" track-by="$index">
        <div class="v-shop">
          <div class="hd">
            <div class="tt">{{item.created_at}}</div>
            <div class="tc">{{item.status}}</div>
          </div>
          <div class="bd">
            <order-cell :proslist="item.products"></order-cell>
          </div>
          <div class="ft">
            <div class="total">共{{item.products.length}}种商品 合计：<span class="f-c2">¥ {{item.total_fee}}</span></div>
          </div>
        </div>
        <div class="v-btns">
          <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_primary"
                                    v-link="{path:'feedback'}"> 评价晒单 </button></span>
          <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_default"> 再次购买 </button></span>
        </div>
      </div>
    </div>

    <div class="v-orders" v-show="tabSel === 2">
      <!-- 订单1 -->
      <div class="v-order" v-for="item in orderList|filterBy '1' in 'system_status'" track-by="$index">
        <div class="v-shop">
          <div class="hd">
            <div class="tt">{{item.created_at}}</div>
            <div class="tc">{{item.status}}</div>
          </div>
          <div class="bd">
            <order-cell :proslist="item.products"></order-cell>
          </div>
          <div class="ft">
            <div class="total">共{{item.products.length}}种商品 合计：<span class="f-c2">¥ {{item.total_fee}}</span></div>
          </div>
        </div>
        <div class="v-btns">
          <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_primary"
                                    v-link="{path:'feedback'}"> 评价晒单 </button></span>
          <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_default"> 再次购买 </button></span>
        </div>
      </div>
    </div>

    <div class="v-orders" v-show="tabSel === 3">
      <!-- 订单1 -->
      <div class="v-order" v-for="item in orderList|filterBy '2' in 'system_status'" track-by="$index">
        <div class="v-shop">
          <div class="hd">
            <div class="tt">{{item.created_at}}</div>
            <div class="tc">{{item.status}}</div>
          </div>
          <div class="bd">
            <order-cell :proslist="item.products"></order-cell>
          </div>
          <div class="ft">
            <div class="total">共{{item.products.length}}种商品 合计：<span class="f-c2">¥ {{item.total_fee}}</span></div>
          </div>
        </div>
        <div class="v-btns">
          <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_primary"
                                    v-link="{path:'feedback'}"> 评价晒单 </button></span>
          <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_default"> 再次购买 </button></span>
        </div>
      </div>
    </div>

    <div class="v-orders" v-show="tabSel === 4">
      <!-- 订单1 -->
      <div class="v-order" v-for="item in orderList|filterBy '3' in 'system_status'" track-by="$index">
        <div class="v-shop">
          <div class="hd">
            <div class="tt">{{item.created_at}}</div>
            <div class="tc">{{item.status}}</div>
          </div>
          <div class="bd">
            <order-cell :proslist="item.products"></order-cell>
          </div>
          <div class="ft">
            <div class="total">共{{item.products.length}}种商品 合计：<span class="f-c2">¥ {{item.total_fee}}</span></div>
          </div>
        </div>
        <div class="v-btns">
          <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_primary"
                                    v-link="{path:'feedback'}"> 评价晒单 </button></span>
          <span class="btn"><button class="weui_btn weui_btn_mini weui_btn_default"> 再次购买 </button></span>
        </div>
      </div>
    </div>
    <div id="pullup"
         style="position: absolute; width: 100%; height: 40px; padding-top: 8px; text-align: center; color:#888888;">
      <!--<span v-show="pullupStatus === 'default' && more">上拉加载更多</span>-->
      <span v-show="!more">没有更多了~</span>
      <!--<span class="pullup-arrow" v-show="more && (pullupStatus === 'down' || pullupStatus === 'up')"-->
      <!--:class="{'rotate': pullupStatus === 'up'}">↑</span>-->
      <span v-show="more"><spinner type="ios-small"></spinner>加载更多</span>
    </div>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Tab from 'vux/dist/components/tab'
  import TabItem from 'vux/dist/components/tab-item'
  import Spinner from 'vux/dist/components/spinner'
  import orderCell from '../components/Order-cell.vue'
  import {getUserId} from '../vuex/getters'

  export default {
    components: {
      XHeader,
      Tab,
      TabItem,
      orderCell,
      Spinner
    },
    vuex: {
      getters: {
        getUserId
      },
      actions: {}
    },
    route: {
      data (transition) {
        this.getOrderList()
        window.addEventListener('scroll', this.scroll)
      },
      deactivate (transition) {
        transition.next()
      }
    },
    data () {
      return {
        page: 1,
        tabSel: 0,
        // 订单中的所含产品临时变量
        proscellList: [{
          img: 'http://temp.im/80x80',
          name: '产品名称11123123',
          sku: '123',
          pri: '99992.00',
          num: 2
        }, {
          img: 'http://temp.im/80x80',
          name: '产品名称11123123',
          sku: '123',
          pri: '99992.00',
          num: 2
        }],
        orderList: [],
        more: true,
        load: false
      }
    },
    created () {
    },
    ready () {
    },
    methods: {
      tabLovSel (n) {
        this.tabSel = n
      },
      scroll (e) {
        if (document.body.scrollHeight - window.screen.height - document.body.scrollTop <= 0 && !this.load) {
          this.load = true
          this.pageData()
        }
      },
      getOrderList () {
        this.$http.post('/wx/order/list/0', {
          page: this.page,
          openid: this.getUserId
        }).then((res) => {
          if (res.body && res.body.code === '200' && res.body.data && res.body.data.items.length > 0) {
            console.log(res.body.data)
            this.page++
            this.orderList = this.orderList.concat(res.body.data.items)
            if (res.body.data.items.length < res.body.data.page_info.page_size) {
              this.more = false
              this.load = true
            }
          } else {
            this.more = false
            this.load = true
          }
        }, (err) => {
          console.log('获取订单列表失败:' + JSON.stringify(err))
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  // 箭头
  @mixin arrow {
    content: " ";
    display: inline-block;
    transform: rotate(45deg);
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    @content;
  }

  @mixin borderBottom {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #cecece;
    transform: scaleY(.5);
  }

  .v-my {
    overflow: hidden;
    /*background: #fff;*/
    padding: 44px 0 0 0;
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

  .v-order {
    margin: 3% 3%;
    line-height: 24px;
    background: #fff;
    box-shadow: 0 0 3px #cacaca;
    border-radius: 5px;
    .hd {
      display: flex;
      position: relative;
      padding: 10px 15px 5px 0;
      margin-left: 15px;
      &:before {
        @include borderBottom;
      }
      .tt {
        flex: 1;
      }
      .tc {
        color: #f60;
      }
    }
    .bd {
      position: relative;
      margin-left: 15px;
      &:before {
        @include borderBottom;
      }
    }
    .ft {
      text-align: right;
      .total {
        position: relative;
        margin-left: 15px;
        padding: 5px 15px 5px 0;
        /*&:before {*/
        //          @include borderBottom;
        /*}*/
      }
    }
  }

  .v-btns {
    padding: 0px 15px 5px 0;
    text-align: right;
    .btn {
      display: inline-block;
      margin-left: 10px;
    }
  }

  .f-c1 {
    color: #f00;
  }

  .f-c2 {
    color: #f60;
  }
</style>
