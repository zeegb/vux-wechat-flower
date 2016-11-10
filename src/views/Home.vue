<template>
  <div class="v-home">
    <x-header :left-options="{showBack: false}" :right-options="{showMore: false}" class="v-hd">首页
    </x-header>
    <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value"
            top="44px"></search>
    <swiper loop auto :list="img_list" :index="img_index" @on-index-change="onIndexChange"></swiper>
    <swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="showDots">
      <swiper-item v-for="(index,item) in activity_list" @click="showDialog(index)"><p>
        【{{item.title}}】{{item.name}}</p></swiper-item>
    </swiper>
    <div style="margin:10px 0px 0px 0px;">
      <panel v-for="(index,panel_item) in panel_list" :header="panel_item.type" :footer="panel_footer"
             :list="panel_item.products"
             :type="panel_type"></panel>
      <!--<panel header="种子" :footer="panel_footer" :list="panel_list" :type="panel_type"></panel>-->
      <!--<panel header="多肉" :footer="panel_footer" :list="panel_list" :type="panel_type"></panel>-->
    </div>

    <div class="button-box">
      <x-button mini plain type="primary" v-link="{path:'product-list'}">&nbsp;&nbsp;查看全部商品&nbsp;&nbsp;</x-button>
    </div>

    <dialog :show.sync="showNoScroll" class="dialog-demo" :scroll="false"
            style="color: #828282;max-height: 70%;overflow: auto;">
      <p class="dialog-title">{{activity_list[clickIndex].name}}</p>
      <div class="img-box">
        <img :src="activity_list[clickIndex].image_url" style="max-width:100%">
      </div>
      <div>
        <i>{{activity_list[clickIndex].content}}</i>
      </div>
      <span class="vux-close" @click="showNoScroll=false"></span>
    </dialog>
  </div>

</template>

<script>
  import Tabbar from '../components/tabbar.vue'
  import XHeader from 'vux/dist/components/x-header'
  import Swiper from '../components/swiper'
  import SwiperItem from 'vux/dist/components/swiper-item'
  import Search from 'vux/dist/components/search'
  import Panel from 'vux/dist/components/panel'
  import XButton from 'vux/dist/components/x-button'
  import Dialog from 'vux/dist/components/dialog'
  import {setLoadingState} from '../vuex/actions'

  const baseList =
    [{
      url: 'javascript:',
      img: 'http://7xj5dk.com1.z0.glb.clouddn.com/800530-4.jpg',
      title: '花店'
    }, {
      url: 'javascript:',
      img: 'http://7xj5dk.com1.z0.glb.clouddn.com/800530-5.jpg',
      title: '花店'
    }, {
      url: 'javascript:',
      img: 'http://7xj5dk.com1.z0.glb.clouddn.com/800530-6.jpg',
      title: '花店'
    }]

  //  const panelList = [{
  //    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
  //    title: '标题一',
  //    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
  //    url: '/product-detail'
  //  }, {
  //    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
  //    title: '标题二',
  //    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
  //    url: '/product-detail'
  //  }]

  export default {
    components: {
      Tabbar,
      XHeader,
      Swiper,
      SwiperItem,
      Search,
      Panel,
      XButton,
      Dialog
    },
    vuex: {
      getters: {},
      actions: {setLoadingState}
    },
    data () {
      return {
        results: [],
        value: '',
        img_list: [],
        img_index: 0,
        activity_list: [{
          'name': '暂无优惠活动',
          'title': '活动通知',
          'description': '买得越多，优惠越多',
          'image_url': 'http://7xj5dk.com1.z0.glb.clouddn.com/800530-6.jpg',
          'content_url': 'http://www.huiwan.de',
          'content': '测试内欧诺个'
        }],
        showNoScroll: false,
        showDots: false,
        clickIndex: 0,
        panel_type: '1',
        panel_list: [],
        panel_footer: {
          title: '查看更多',
          url: '/product-list'
        }
      }
    },
    route: {
      data (transition) {
        // 获取banner
        this.$http.post('/wx/data/banner/list', {
          uid: 'system',
          ops: '{}',
          sort: '{}'
        }).then((res) => {
          if (res.body && res.body.code === '200' && res.body.data && res.body.data.items.length > 0) {
            this.img_list = res.body.data.items.map((item, index) => ({
              url: item.content_url || 'http://m.baidu.com',
              img: item.image_url,
              title: `[精选]${item.description}`
            }))
          } else {
            this.img_list = baseList.map((item, index) => ({
              url: item.content_url || 'http://m.baidu.com',
              img: item.image_url,
              title: `[精选]${item.description}`
            }))
          }
        }, (err) => {
          console.log('获取轮播图失败:' + err)
          this.img_list = baseList.map((item, index) => ({
            url: item.content_url || 'http://m.baidu.com',
            img: item.image_url,
            title: `[精选]${item.description}`
          }))
        })
        // 获取activity
        this.$http.post('/wx/data/activity/list', {
          uid: 'system',
          ops: '{}',
          sort: '{}'
        }).then((res) => {
          if (res.body && res.body.code === '200' && res.body.data && res.body.data.items.length > 0) {
            this.activity_list = res.body.data.items
            console.log(JSON.stringify(this.activity_list))
          } else {
          }
        }, (err) => {
          console.log('获取轮播图失败:' + err)
        })
        // 获取product
        this.$http.post('/wx/product/recommend/list', {
          uid: 'system',
          ops: '{}',
          sort: '{}'
        }).then((res) => {
          if (res.body && res.body.code === '200' && res.body.data && res.body.data.length > 0) {
            var list = res.body.data.filter((item) => {
              return item.products.length > 0
            })
            this.panel_list = list.map((type, index) => {
              type.products = type.products.map((product, index) => ({
                src: product.pictures[0],
                title: product.name,
                desc: product.description,
                url: `/product-detail/${product._id}`
              }))
              return type
            })
            console.log(JSON.stringify(this.panel_list))
//            this.panel_list = res.body.data
          } else {
          }
        }, (err) => {
          console.log('获取轮播图失败:' + err)
        })
      }
    },
    ready () {
      // http://123.57.52.110:9202/wx/data/banner/list?uid=gopain
    },
    methods: {
      onIndexChange (index) {
        this.img_index = index
      },
      resultClick (item) {
        console.log('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        this.results = val ? getResult(this.value) : []
      },
      showDialog (index) {
        this.showNoScroll = !this.showNoScroll
        this.clickIndex = index
      }
    }
  }

  function getResult (val) {
    let rs = []
    for (let i = 0; i < 8; i++) {
      rs.push({
        title: `${val} result: ${i + 1} `,
        other: i
      })
    }
    return rs
  }
</script>

<style type="less" scoped>
  .v-home {
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

  .text-scroll {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
  }

  .text-scroll p {
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }

  a {
    text-decoration: none;
  }

  .vux-header-right a {
    color: white !important;
  }

  .button-box {
    margin: 10px 0px 50px 0px;
    text-align: center;
  }

  .dialog-demo {

    .weui_dialog {
      border-radius: 8px;
      padding-bottom: 8px;
    }

    .dialog-title {
      line-height: 30px;
      color: #666;
    }

    .img-box {
      height: 350px;
      overflow: hidden;
    }

    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }

  }
</style>
