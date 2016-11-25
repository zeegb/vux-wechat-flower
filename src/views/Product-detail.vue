<template>
  <div class="v-product">
    <!-- 头部 -->
    <x-header class="v-hd">商品详情
      <i class="fa fa-shopping-cart v-cart" aria-hidden="true" slot="right" v-link="{name:'Cart',append: false}"></i>
    </x-header>
    <!-- 主内容 -->
    <div class="v-detail">
      <div class="v-detailhd">
        <!-- 轮播图 -->
        <swiper :list="productPictures" class="v-swiper" height="250px"></swiper>
        <!-- 信息 -->
        <div class="v-prodtl">
          <div class="name">{{productDetail.name}}</div>
          <div class="share">
            <i class="fa fa-share-alt" aria-hidden="true"></i>
            <div class="c">分享</div>
          </div>
          <div class="price">
            <div class="pri1">￥{{total}}</div>
            <del class="pri2">
              ￥{{productDetail.price_text}}
            </del>
          </div>
          <div class="info">
            <div class="l">运费: {{productDetail.freightage || 0}}</div>
            <div class="m">月销量: {{productDetail.sales || 0}}</div>
            <div class="r">{{productDetail.address}}</div>
          </div>
        </div>
      </div>

      <div class="v-detailbd">
        <div class="v-standard">
          <div v-for="(si, standardItem) in standardList">
            <div class="hd">{{standardItem.title}}&nbsp;&nbsp;({{standardItem.description}})</div>
            <div class="bd">
              <div class="o-for" v-for="(oi, optionItem) in standardItem.sub_type">
                <div class="o-select" v-show="!optionItem.standard_collect" @click="selectStandard(1,si,oi)">
                  {{optionItem.name}}
                </div>
                <div class="o-select o-act" v-show="optionItem.standard_collect" @click="selectStandard(0,si,oi)">
                  {{optionItem.name}}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--<div class="v-favorable">-->
        <!--<cell link="javascript;">-->
        <!--<span slot="after-title">领取优惠券</span>-->
        <!--</cell>-->
        <!--<cell link="javascript;">-->
        <!--<span slot="after-title">领取积分</span>-->
        <!--</cell>-->
        <!--</div>-->
        <!--<div class="v-myshop">-->
        <!--<div class="hd">{{productData.goods.supplier}}</div>-->
        <!--<div class="bd">-->
        <!--<div class="mark" v-show="productData.shop_collect" @click="markShop(0)"><i class="iconfont">&#xe608;</i>-->
        <!--关注店铺-->
        <!--</div>-->
        <!--<div class="mark z-act" @click="markShop(1)" v-else><i class="iconfont">&#xe607;</i> 关注店铺</div>-->
        <!--<div class="link" v-link="{path:'shop',query:{shop:productData.goods.supplier_id}}">进入店铺</div>-->
        <!--</div>-->
        <!--</div>-->
      </div>

      <!-- tab -->
      <div class="v-tabs">
        <tab>
          <tab-item :selected="tabSel === 0" @click="tabSel = 0">商品详情</tab-item>
          <tab-item :selected="tabSel === 1" @click="tabArgs">产品参数</tab-item>
          <tab-item :selected="tabSel === 2" @click="tabAssess">评价</tab-item>
        </tab>
        <div class="v-tabcon">
          <div class="v-content" v-show="tabSel === 0">{{{productDetail.property_detail}}}</div>
          <div class="v-content" v-show="tabSel === 1">{{tabArgsCon}}
            <div class="f-tac">
              <spinner :type="ios" slot="value" v-show="disTab1"></spinner>
            </div>
          </div>
          <div class="v-content" v-show="tabSel === 2">
            <spinner :type="ios" slot="value" v-show="disTab2"></spinner>
            <comment :list="tabAssessCon"></comment>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="v-ft">
      <div class="contact">
        <i class="fa fa-envelope-o" aria-hidden="true"></i>
      </div>
      <div class="markpro">
        <i class="fa fa-star z-act" aria-hidden="true" @click="markpro(1)" v-show="!pros_collect"></i>
        <i class="fa fa-star" aria-hidden="true" v-show="pros_collect" @click="markpro(0)"></i>
      </div>
      <div class="cart" @click="pushCart">加入购物车</div>
      <div class="buy" @click="cacheOrder">立即购买
      </div>
    </div>

    <toast :show.sync="showSuccess">已加入购物车</toast>
    <toast :show.sync="showFail" type="cancel">购物车撑坏啦</toast>
    <toast :show.sync="showSelect" type="cancel">请选择商品类别</toast>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Swiper from 'vux/dist/components/swiper'
  import Cell from 'vux/dist/components/cell'
  import Tab from 'vux/dist/components/tab'
  import TabItem from 'vux/dist/components/tab-item'
  import Spinner from 'vux/dist/components/spinner'
  import Toast from 'vux/dist/components/toast'
  import Comment from '../components/Comment'
  import {getUserId} from '../vuex/getters'
  import {setCacheOrder} from '../vuex/actions'
  import {go} from '../libs/router'
  const list = [{
    name: 'Airyland',
    avatar: 'static/demo/comment/1.jpg',
    time: '昨天',
    like_num: 99,
    content: '沙发',
    has_praised: true,
    reply_list: [{
      content: '恭喜~',
      time: '今天早上'
    }]
  }, {
    name: 'Vux',
    avatar: 'static/demo/comment/2.jpg',
    time: '未来时间',
    like_num: 0,
    content: '板凳'
  }, {
    name: 'Secret',
    avatar: 'static/demo/comment/3.jpg',
    time: '未来时间',
    like_num: 99,
    content: '居然没抢到沙发'
  }]

  export default {
    components: {
      XHeader,
      Swiper,
      Cell,
      Tab,
      TabItem,
      Spinner,
      Comment,
      Toast
    },
    vuex: {
      getters: {
        getUserId
      },
      actions: {
        setCacheOrder
      }
    },
    data () {
      return {
        showSuccess: false,
        showFail: false,
        showSelect: false,
        tabSel: 0,
        tabArgsCon: '',
        tabAssessCon: '',
        disTab1: true,
        disTab2: true,
        pros_collect: false,

        productDetail: {},
        standardList: [],
        productPictures: [],
        selectSubType: [],
        selectStandardList: []
      }
    },
    route: {
      data (transition) {
        console.log(transition.to.params.id)
        this.$http.post('/wx/data/product/find-one', {
          uid: 'system',
          ops: `{"_id":"${transition.to.params.id}"}`
        }).then((res) => {
          if (res.body && res.body.code === '200' && res.body.data) {
            this.productDetail = res.body.data
            this.standardList = res.body.data.price_list
            this.productPictures = res.body.data.pictures.map((item, index) => ({
              url: '',
              img: item,
              title: ''
            }))
          } else {

          }
        }, (err) => {
          console.log('获取轮播图失败:' + err)
        })
      }
    },
    ready () {
    },
    computed: {
      total () {
        var selectSub = []
        var total = 0
        this.standardList.map((subItem, index) => {
          subItem.sub_type.map((item, i) => {
            if (item.standard_collect) {
              selectSub.push(item)
            }
          })
        })
        this.selectSubType = selectSub
        if (selectSub.length === 0) {
          return this.productDetail.price_min + '~' + this.productDetail.price_man
        } else {
          selectSub.map((item) => {
            total += (item.price * item.discount - item.reduce)
          })
          return total
        }
      }
    },
    methods: {
      selectStandard (bool, si, oi) {
        console.log(si, oi)
        this.standardList[si].sub_type = this.standardList[si].sub_type.map((item, index) => {
          this.$set(`standardList[${si}].sub_type[${index}].standard_collect`, false)
          return item
        })
        console.log(this.standardList[si].sub_type)
        this.standardList[si].sub_type[oi].standard_collect = !!bool
      },
      markpro (bool) {
        let id = this.pro
        let type = 'goods'
//          collectId = 0
        this.productData.pros_collect = !!bool
        console.log(this.productData.pros_collect)
        let url = `/api/shopping/favorite_save.htm?goods_id=${id}&customerId=${type}`
//          url2 = `/app/shopping/favorite_remove.htm?id=${collectId}`
        this.$http.get(url).then(res => {
          if (res.ok) {
            this.productData.collect_id = JSON.parse(res.data).collect_id
            // 先解决未登陆问题
            console.log(JSON.parse(res.data))
          }
        })
      },
      tabArgs () {
        this.tabSel = 1
        if (!this.tabArgsCon.length) {
          // ajax获取
          this.tabArgsCon = '参数'
          this.disTab1 = 0
        }
      },
      tabAssess () {
        this.tabSel = 2
        if (!this.tabAssessCon.length) {
          // ajax获取
          this.tabAssessCon = list
          this.disTab2 = 0
        }
      },
      pushCart () {
        if (this.selectSubType.length < this.standardList.length) {
          this.showSelect = true
        } else {
          var selectStandardList = []
          var jsonStandardList = JSON.parse(JSON.stringify(this.standardList))
          selectStandardList = jsonStandardList.map((subItem, index) => {
            subItem.sub_type = subItem.sub_type.filter((item, i) => {
              return item.standard_collect
            })
            return subItem
          })
          var cartDetail = {
            openid: this.getUserId,
            pid: this.productDetail._id,
            price: this.total,
            price_list: selectStandardList
          }
          console.log(JSON.stringify(cartDetail))
          this.$http.post('/wx/cart/add-product', cartDetail).then((res) => {
            console.log(res)
            if (res.body && res.body.code === '200' && res.body.data) {
              this.showSuccess = true
            } else {
              this.showFail = true
            }
          }, (err) => {
            this.showFail = true
            console.log('加入购物车失败:' + err)
          })
        }
      },
      cacheOrder () {
        if (this.selectSubType.length < this.standardList.length) {
          this.showSelect = true
        } else {
          var cacheOrder = []
          var skuText = ''
          this.standardList.map((subItem, index) => {
            subItem.sub_type.map((item, i) => {
              if (item.standard_collect) {
                skuText += (subItem.title + ':' + item.name + '   ')
              }
            })
          })
          cacheOrder[0] = {
            img: this.productPictures[0].img,
            name: this.productDetail.name,
            sku: skuText,
            pri: this.productDetail.price,
            num: 1,
            pid: this.productDetail._id
          }
          this.setCacheOrder(cacheOrder)
          this.$nextTick(function () {
            go('/order', this.$router)
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .v-product {
    padding-top: 44px;
    background: #efefef;
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

  .v-cart {
    font-size: 20px;
    color: #fff;
  }

  // 主体
  .v-detail {
  }

  .v-detailhd {
    background: #fff;
  }

  .v-prodtl {
    margin-bottom: 10px;
    padding: 10px 15px;
    position: relative;
    box-sizing: border-box;
    .name {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-right: 40px;
      font-size: 15px;
    }
    .share {
      position: absolute;
      right: 10px;
      top: 5px;
      width: 44px;
      height: 44px;
      text-align: center;
      color: #666;
      i {
        line-height: 30px;
        font-size: 24px;
      }
      .c {
        line-height: 14px;
        font-size: 14px;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        transform: scaleX(.5);
        border-left: 1px solid #ececec;
      }
    }
    .price {
      line-height: 40px;
      .pri1 {
        display: inline-block;
        font-size: 20px;
        color: #f00;
      }
      .pri2 {
        font-size: 14px;
        color: #999;
      }
    }
    .info {
      display: flex;
      line-height: 20px;
      font-size: 14px;
      color: #666;
      .l {
      }
      .m {
        text-align: center;
        flex: 1;
      }
      .r {
        text-align: right;
      }
    }
  }

  // 优惠相关
  .v-favorable {
    margin-bottom: 10px;
    background: #fff;
  }

  // 规格
  .v-standard {
    margin-bottom: 10px;
    padding: 5px 15px;
    background: #fff;
    .hd {
      margin-top: 5px;
      margin-bottom: 5px;
      color: #2e77e3;
    }
    .bd {
      position: relative;
      display: flex;
      flex-flow: row wrap;
      text-align: left;
      .o-for {
        flex: auto;
        .o-select {
          margin: 5px 10px;
          padding: 3px 5px;
          border-radius: 5px;
          font-size: 14px;
          color: #333;
          text-align: center;
          background: #f1f1f1;
          &.o-act {
            background: #FF5809;
            color: #ffffff;
          }
        }
      }
    }
  }

  // 店铺
  .v-myshop {
    margin-bottom: 10px;
    padding: 10px 15px;
    background: #fff;
    .hd {
      margin-bottom: 10px;
      color: #2e77e3;
    }
    .bd {
      position: relative;
      text-align: left;
      &:after {
        content: " ";
        display: inline-block;
        transform: rotate(45deg);
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        position: absolute;
        top: -1px;
        right: 0;
        margin-left: .3em;
      }
      .mark {
        display: inline-block;
        margin-right: 20px;
        line-height: 24px;
        padding: 0 20px;
        border-radius: 5px;
        font-size: 14px;
        color: #333;
        background: #f1f1f1;
        &.z-act {
          i {
            color: #f00;
          }
        }
      }
      .link {
        display: inline-block;
        line-height: 24px;
        padding: 0 20px;
        border-radius: 5px;
        font-size: 14px;
        color: #fff;
        background: #fe4b47;
      }
    }
  }

  // tab
  .v-tabcon {
    background: #fff;
    padding-bottom: 30px;
  }

  .f-tac {
    text-align: center;
  }

  // 底部菜单
  .v-ft {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    background: rgba(255, 255, 255, .9);
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border-top: 1px solid #ececec;
      transform: scaleY(.5);
    }
    .contact {
      position: relative;
      width: 64px;
      height: 44px;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        border-right: 1px solid #ececec;
        transform: scaleX(.5);
      }
      i {
        line-height: 44px;
        font-size: 26px;
        color: #2e77e3;
      }
    }
    .markpro {
      width: 64px;
      height: 44px;
      color: #666;
      i {
        line-height: 44px;
        font-size: 22px;
        &.z-act {
          color: #f00;
        }
      }
    }
    .cart {
      flex: 1;
      background: #ff9703;
    }
    .buy {
      flex: 1;
      background: #3cc51f;
    }
  }
</style>
