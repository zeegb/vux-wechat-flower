<template>
  <div class="v-product">
    <!-- 头部 -->
    <x-header :left-options="{showBack: true}">商品详情
      <i class="iconfont v-cart" slot="right" v-link="{path:'cart'}">&#xe601;</i>
    </x-header>
    <!-- 主内容 -->
    <div class="v-detail">
      <div class="v-detailhd">
        <!-- 轮播图 -->
        <swiper :list="productData.hz_goods_picture" class="v-swiper"></swiper>
        <!-- 信息 -->
        <div class="v-prodtl">
          <div class="name">{{productData.goods.goods_name}}</div>
          <div class="share">
            <i class="iconfont">&#xe604;</i>
            <div class="c">分享</div>
          </div>
          <div class="price">
            <div class="pri1">￥{{productData.goods.price_new || productData.goods.current_price}}</div>
            <del class="pri2" v-if="productData.goods.price_new < productData.goods.current_price">
              ￥{{productData.goods.current_price}}
            </del>
          </div>
          <div class="info">
            <div class="l">运费: {{productData.freightage || 0}}</div>
            <div class="m">月销量: {{productData.total_sales || 0}}</div>
            <div class="r">{{productData.address}}</div>
          </div>
        </div>
      </div>

      <div class="v-detailbd">
        <div class="v-standard">
          <cell link="javascript;">
            <span slot="after-title">选择:商品规格</span>
          </cell>
        </div>
        <div class="v-favorable">
          <cell link="javascript;">
            <span slot="after-title">领取优惠券</span>
          </cell>
          <cell link="javascript;">
            <span slot="after-title">领取积分</span>
          </cell>
        </div>
        <div class="v-myshop">
          <div class="hd">{{productData.goods.supplier}}</div>
          <div class="bd">
            <div class="mark" v-show="productData.shop_collect" @click="markShop(0)"><i class="iconfont">&#xe608;</i>
              关注店铺
            </div>
            <div class="mark z-act" @click="markShop(1)" v-else><i class="iconfont">&#xe607;</i> 关注店铺</div>
            <div class="link" v-link="{path:'shop',query:{shop:productData.goods.supplier_id}}">进入店铺</div>
          </div>
        </div>
      </div>

      <!-- tab -->
      <div class="v-tabs">
        <tab>
          <tab-item :selected="tabSel === 0" @click="tabSel = 0">商品详情</tab-item>
          <tab-item :selected="tabSel === 1" @click="tabArgs">产品参数</tab-item>
          <tab-item :selected="tabSel === 2" @click="tabAssess">评价</tab-item>
        </tab>
        <div class="v-tabcon">
          <div class="v-content" v-show="tabSel === 0">{{{productData.detail}}}</div>
          <div class="v-content" v-show="tabSel === 1">{{tabArgsCon}}
            <div class="f-tac">
              <spinner :type="ios" slot="value" v-show="disTab1"></spinner>
            </div>
          </div>
          <div class="v-content" v-show="tabSel === 2">{{tabAssessCon}}
            <div class="f-tac">
              <spinner :type="ios" slot="value" v-show="disTab2"></spinner>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="v-ft">
      <div class="contact">
        <i class="iconfont">&#xe605;</i>
      </div>
      <div class="markpro">
        <i class="iconfont" v-show="productData.pros_collect" @click="markpro(0)">&#xe606;</i>
        <i class="iconfont z-act" @click="markpro(1)" v-show="!productData.pros_collect">&#xe609;</i>
      </div>
      <div class="cart">加入购物车</div>
      <div class="buy" v-link="{path:'order',query:{pid:productData.id}}">立即购买</div>
    </div>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Swiper from 'vux/dist/components/swiper'
  import Cell from 'vux/dist/components/cell'
  import Tab from 'vux/dist/components/tab'
  import TabItem from 'vux/dist/components/tab-item'
  import Spinner from 'vux/dist/components/spinner'

  const baseList =
    [{
      url: 'javascript:',
      img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg',
      title: '如何挑选盆栽？'
    }, {
      url: 'javascript:',
      img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg',
      title: '如何挑选盆栽？'
    }, {
      url: 'javascript:',
      img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg',
      title: '如何挑选盆栽？'
    }]

  const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    title: `[精选]${item.title}`
  }))

  export default {
    components: {
      XHeader,
      Swiper,
      Cell,
      Tab,
      TabItem,
      Spinner
    },
    data () {
      return {
        // 头部
        // 客户id
        customerId: '',
        shop: '',
        pro: '',
        goods_id: '',
        productData: {
          shop: '',
          id: '',
          goods: {
            goods_name: '我也不知道卖啥',
            supplier: '哔哔哔的花店',
            current_price: '110.00',
            price_new: '10.00'
          },
          hz_goods_picture: urlList,
          price: '',
          price_origin: '',
          total_sales: '',
          freightage: '',
          detail: '<h1>这里是商品详情</h1><img src="http://temp.im/320x100">',
          // 收藏后获得的id
          collect_id: '',
          shop_collect: false,
          pros_collect: false
        },
        tabSel: 0,
        tabArgsCon: '',
        tabAssessCon: '',
        disTab1: true,
        disTab2: true
      }
    },
    ready () {
      let pro = this.$route.query.pro || 0
      let url = `/api/shopping/goods_details.htm?goods_id=${pro}`
      this.$http.get(url).then(res => {
        console.log(res)
        if (res.ok) {
          this.productData = Object.assign({}, JSON.parse(res.data))

          // 手动转换数组属性
          this.productData.hz_goods_picture.img = this.productData.hz_goods_picture
          this.productData.hz_goods_picture = this.productData.hz_goods_picture.map(v => {
            v.img = v.picture_url
            return v
          })
        }
      })
    },
    methods: {
//      markShop (bool) {
//        this.productData.shop_collect = !!bool
//        // ajax传送给服务器
//      },
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
          this.tabAssessCon = '评价'
          this.disTab2 = 0
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/styles/iconfont.scss';

  .v-product {
    background: #efefef;
  }

  .v-hd {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 44px;
    background: #c50a1d;
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
      height: 44px;
      line-height: 22px;
      padding-right: 44px;
      overflow: hidden;
      font-size: 18px;
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

  .v-imgbd {
  }

  .v-detailbd {
  }

  .v-standard {
    margin-bottom: 10px;
    background: #fff;
  }

  // 优惠相关
  .v-favorable {
    margin-bottom: 10px;
    background: #fff;
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
      text-align: center;
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
    margin-bottom: 10px;
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
