<template>
  <div class="v-orders">
    <!-- 订单页面 -->
    <div class="v-order" v-show="status === '0'">
      <!-- 头部 -->
      <x-header class="v-hd">
        确认订单
      </x-header>


      <div class="v-bd-0">
        <!-- 配送 -->
        <div class="v-send">
          <!-- select vux -->
          <div class="v-way">
            <selector :value.sync="sendVal" title="配送方式" :options="sendOptions"></selector>
          </div>
          <!-- 1送货上门 -->
          <div class="v-way" v-if="sendVal === '送货上门'">
            <cell title="送货形式：">快递</cell>
            <div class="v-address" v-if="isHaveselectAddress" v-link="{path:'select-address',query:{type:'order'}}">
              <div class="hd">
                <div class="name">收货人：{{selectAddress.name}}</div>
                <div class="tel">{{selectAddress.phone}}</div>
                <div class="arrow"></div>
              </div>
              <div class="cellbd">
                收货地址：{{selectAddress.address}}
              </div>
            </div>
            <div class="v-address" v-show="!isHaveselectAddress" v-link="{path:'select-address',query:{type:'order'}}">
              <div class="hd">
                <div class="name">暂无可选地址</div>
                <div class="tel">请点击创建收货地址信息</div>
                <div class="arrow"></div>
              </div>
            </div>
          </div>

          <!-- 2到店自提 -->
          <div class="v-way" v-show="sendVal === '到店自提'">
            <cell title="自提门店：">蒲黄榆门店</cell>
            <cell title="预计自提日期" link="javascript;" @click="calendarShow = !calendarShow">{{linkDate}}</cell>
            <cell title="">使用期限：购买成功后10天内有效</cell>
          </div>
        </div>

        <!-- 产品信息 -->
        <div class="v-pro">
          <div class="v-cellhd">
            <div class="hd">哔哔哔的花店</div>
          </div>
          <productcell :proslist="cacheOrder"></productcell>
        </div>

        <div class="v-reduce">
          <div class="v-cellbd" v-link="'/coupon'">
            <div class="cellbd">
              优惠券
            </div>
            <div class="ft f-c3" v-if="!isCoupon">未使用</div>
            <div class="ft f-c2" v-if="isCoupon">- 50.00</div>
            <div class="arrow"></div>
          </div>
          <div class="v-cellbd">
            <div class="cellbd">店铺活动：满2件减50</div>
            <div class="ft f-c2">- 50.00</div>
          </div>
        </div>

        <div class="v-word">
          <div class="v-cellbd">
            <div class="hd">卖家留言：</div>
            <div class="cellbd">
              <input type="text" class="ipt" placeholder="选填">
            </div>
          </div>
        </div>

        <div class="v-cast">
          <div class="v-cellbd">
            <div class="cellbd">运费</div>
            <div class="ft f-c2">+ 0.00</div>
          </div>
          <div class="v-cellbd">
            <div class="cellbd"></div>
            <div class="ft">
              共2件商品 合计：<span class="f-c2">￥4939.00</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部菜单 -->
      <div class="v-ft">
        <div class="total">合计：￥<span class="pri">0.00</span></div>
        <div class="buy" v-link="{path:'wechat-pay'}">立即购买</div>
      </div>

      <!-- 日期选择 -->
      <inline-calendar class="v-calendar" :class="calendarShow ? 'z-crt' : ''" :value.sync="linkDate"
                       :start-date="startDate" :end-date="endDate" :highlight-weekend="highlightWeekend"
                       :weeks-list="weeksList">
      </inline-calendar>
    </div>

    <!-- 收货地址页面 -->

    <!-- 编辑收货地址页面 -->


  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Selector from 'vux/dist/components/selector'
  import Cell from 'vux/dist/components/cell'
  import XInput from 'vux/dist/components/x-input'
  import InlineCalendar from 'vux/dist/components/inline-calendar'
  import Address from 'vux/dist/components/address'
  import AddressChinaData from '../libs/list.json'
  import productcell from '../components/Prodect-cell.vue'
  import moment from 'moment'
  import {selectAddress, getUserId, cacheOrder} from '../vuex/getters'
  import {getSelectAddress} from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        selectAddress, getUserId, cacheOrder
      },
      actions: {
        getSelectAddress
      }
    },
    components: {
      XHeader,
      Selector,
      Cell,
      XInput,
      InlineCalendar,
      Address,
      AddressChinaData,
      productcell
    },
    data () {
      return {
        // 内页切换
        status: '0',
        // 数据
        sendOptions: ['送货上门', '到店自提'],
        sendVal: '送货上门',
        // 日期选择
        calendarShow: false,
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        endDate: moment().add(7, 'days').format('YYYY-MM-DD'),
        highlightWeekend: true,
        weeksList: ['日', '一', '二', '三', '四', '五', '六 '],

        // 收货人信息
        linkName: '张三',
        linkTel: '12334234234',
        linkAddress: '北京市丰台区蒲黄榆四里14号楼305室',
        linkDate: '2016-10-10',
        // 订单中的所含产品临时变量
        isCoupon: false,
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
        isHaveselectAddress: true
      }
    },
    route: {
      data (transition) {
        if (transition.from.name !== 'selectAddress') {
          this.getSelectAddress(this.getUserId)
        }
      }
    },
    created () {
    },
    ready () {
    },
    watch: {
      calendarVal (val) {
        this.calendarShow = false
      },
      selectAddress (val) {
        this.isHaveselectAddress = Object.keys(this.selectAddress).length !== 0
      }
    },
    methods: {
      todayDay () {
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/styles/iconfont.scss';
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

  @mixin borderTop {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #cecece;
    transform: scaleY(.5);
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

  @mixin borderLeft {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-left: 1px solid #cecece;
    transform: scaleX(.5);
  }

  .v-order {
    box-sizing: border-box;
    overflow-x: hidden;
    background: #efefef;
    padding: 44px 0;
  }

  .v-alist {
    padding-top: 44px;
  }

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

  .v-back {
    font-size: 22px;
    color: #fff;
  }

  .v-bd {
    // flex: 1;
  }

  .v-bd-1 {
  }

  // 底部菜单
  .v-ft {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #fff;
    color: #666;
    &:before {
      @include borderTop;
    }
    .total {
      flex: 2;
      font-size: 14px;
      text-align: right;
      padding-right: 10px;
      .pri {
        font-size: 16px;
        color: #f00;
      }
    }
    .buy {
      flex: 1;
      padding: 0 15px;
      background: #3cc51f;
      color: #fff;
    }
  }

  // 配送
  .v-send {
    // margin-bottom: 10px;
  }

  .v-way {
    margin-bottom: 10px;
    background: #fff;
  }

  .v-cast {
    margin-bottom: 10px;
    background: #fff;
  }

  .v-word {
    margin-bottom: 10px;
    background: #fff;
  }

  // 地址
  .v-address {
    position: relative;
    margin-bottom: 10px;
    padding: 0 15px;
    background: #fff;
    &:before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      margin-left: 15px;
      border-top: 1px solid #cecece;
      transform: scaleY(.5);
    }
    .hd {
      display: flex;
      padding: 10px 0;
      line-height: 24px;
      .name {
        flex: 1;
      }
      .tel {
        text-align: right;
      }
      .arrow {
        @include arrow;
        position: relative;
        top: 20px;
        margin-left: .3em;
      }
    }
    .cellbd {
      position: relative;
      top: -5px;
      padding-right: 10px;
      line-height: 20px;
      font-size: 14px;
      color: #666;
    }
  }

  // 日期选择
  .v-calendar {
    position: fixed;
    z-index: 6;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translateY(100%);
    &.z-crt {
      transform: translateY(0);
    }
  }

  // 产品
  .v-pro {
    margin-bottom: 10px;
    background: #fff;
  }

  .v-reduce {
    margin-bottom: 10px;
    background: #fff;
    .arrow {
      @include arrow;
      position: relative;
      top: 20px;
      margin-left: .3em;
    }
  }

  .v-cellhd {
    position: relative;
    background: #fff;
    &:after {
      @include borderBottom;
    }
    .hd {
      padding: 10px 15px;
    }
  }

  .v-cellbd {
    position: relative;
    display: flex;
    margin-left: 15px;
    padding-right: 15px;
    background: #fff;
    &:after {
      @include borderBottom;
    }
    &:last-child::after {
      border-width: 0;
    }
    .hd {
      padding: 10px 0;
      white-space: nowrap;
    }
    .cellbd {
      flex: 1;
      padding: 10px 0;
      .ipt {
        width: 100%;
        box-sizing: border-box;
        -webkit-appearance: none;
        border: 0 none;
        font-size: 14px;
      }
    }
    .ft {
      padding: 10px 0;
      white-space: nowrap;
      text-align: right;
    }
  }

  // 1-收货地址
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
      .cellbd {
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

  .f-c1 {
    color: #fff;
  }

  .f-c2 {
    color: #f00;
  }

  .f-c3 {
    color: #000000;
  }
</style>
