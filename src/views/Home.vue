<template>
  <div class="v-home">
    <x-header :left-options="{showBack: false}" :right-options="{showMore: true}"
              @on-click-more="showMenus = true" class="v-hd">首页
    </x-header>
    <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value"
            top="46px"></search>
    <swiper loop auto :list="img_list" :index="img_index" @on-index-change="onIndexChange"></swiper>
    <swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
      <swiper-item><p>【活动】满50可获得20代金券!</p></swiper-item>
      <swiper-item><p>【活动】买花送肥料!</p></swiper-item>
      <swiper-item><p>【活动】满50可获得20代金券!</p></swiper-item>
      <swiper-item><p>【活动】盆栽买一送一!</p></swiper-item>
      <swiper-item><p>【活动】满50可获得20代金券!</p></swiper-item>
    </swiper>
    <panel header="花" :footer="panel_footer" :list="panel_list" :type="panel_type"></panel>
    <panel header="种子" :footer="panel_footer" :list="panel_list" :type="panel_type"></panel>
    <panel header="多肉" :footer="panel_footer" :list="panel_list" :type="panel_type"></panel>

    <br/>
    <br/>
    <tabbar tab="home"></tabbar>
  </div>

</template>

<script>
  import Tabbar from '../components/tabbar.vue'
  import XHeader from 'vux/dist/components/x-header'
  import Swiper from 'vux/dist/components/swiper'
  import SwiperItem from 'vux/dist/components/swiper-item'
  import Search from 'vux/dist/components/search'
  import Panel from 'vux/dist/components/panel'

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

  const panelList = [{
    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
    title: '标题一',
    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
    url: '/component/cell'
  }, {
    src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
    title: '标题二',
    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
    url: {
      path: '/component/radio',
      replace: false
    }
  }]

  const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    title: `[精选]${item.title}`
  }))

  export default {
    components: {
      Tabbar,
      XHeader,
      Swiper,
      SwiperItem,
      Search,
      Panel
    },
    data () {
      return {
        results: [],
        value: '',
        img_list: urlList,
        img_index: 0,
        panel_type: '1',
        panel_list: panelList,
        panel_footer: {
          title: '查看更多',
          url: '/product'
        }
      }
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

<style type="text/css">
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
</style>
