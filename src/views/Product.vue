<template>
  <div class="v-product">
    <x-header :left-options="{showBack: true}" :right-options="{showMore: false}"
              @on-click-more="showMenus = true" @on-click-title="scrollTop" class="v-hd">全部商品
    </x-header>
    <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value"
            top="46px"></search>
    <!-- 商品 -->
    <div class="v-prolist">
      <tab>
        <tab-item :selected="this.tabProsNum === 0" @click="tabProsFn(0)">销售量</tab-item>
        <tab-item :selected="this.tabProsNum === 1" @click="tabProsFn(1)">新品</tab-item>
        <tab-item :selected="this.tabProsNum === 2" @click="tabProsFn(2)">价格</tab-item>
      </tab>
      <products-list :proslist="prosList"></products-list>
    </div>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Tab from 'vux/dist/components/tab'
  import TabItem from 'vux/dist/components/tab-item'
  import Search from 'vux/dist/components/search'
  import ProductsList from '../components/Product-list.vue'

  export default {
    components: {
      XHeader,
      Search,
      Tab,
      TabItem,
      ProductsList
    },
    data () {
      return {
        shop: '',
        // 搜索
        searchPhr: '店内搜索商品',
        searchVal: '',
        results: [],
        // tab菜单-商品
        tabProsNum: 0,
        tabPrice: 0,
        // 数据结果
        prosList: [{
          url: '/category/product/url',
          shop: 83,
          id: 70,
          image: 'http://temp.im/100',
          name: '产品名称',
          price: 1584,
          num: 90,
          sales: 9
        }, {
          url: '/category/product/url',
          shop: 83,
          id: 70,
          image: 'http://temp.im/100',
          name: '产品名称',
          price: 1584,
          num: 90,
          sales: 9
        }, {
          url: '/category/product/url',
          shop: 83,
          id: 70,
          image: 'http://temp.im/100',
          name: '产品名称',
          price: 1584,
          num: 90,
          sales: 9
        }, {
          url: '/category/product/url',
          shop: 83,
          id: 70,
          image: 'http://temp.im/100',
          name: '产品名称',
          price: 1584,
          num: 90,
          sales: 9
        }, {
          url: '/category/product/url',
          shop: 83,
          id: 70,
          image: 'http://temp.im/100',
          name: '产品名称',
          price: 1584,
          num: 90,
          sales: 9
        }, {
          url: '/category/product/url',
          shop: 83,
          id: 70,
          image: 'http://temp.im/100',
          name: '产品名称',
          price: 1584,
          num: 90,
          sales: 9
        }]
      }
    },
    created () {
    },
    ready () {
      // 根据url参数请求相应数据
//      let getRes = (url, sort, type = 0) => {
//        this.$http.get(`/api/shopping/${url}?shop=${this.shop}&word=${this.searchVal}&sort=${this.sort}`).then(res => {
//          if (res.ok) {
//            console.log(res)
//            let rows = JSON.parse(res.data).rows;
//            !type ? this.prosList = rows : this.shopList = rows
//          }
//        })
//      }

      // 初始化数据结果
//      let sort = this.$route.query.sort || 0
//      this.shop = this.$route.query.shop || 0
//      this.searchPhr = this.searchVal = this.$route.query.word || this.searchPhr
//      getRes('productSearch.htm', sort)

      // 页面打开直接获取焦点
//      if (this.$route.query.focus) {
//        this.$refs.search.touch()
//      }
    },
    methods: {
      // tab切换显示-商品
      tabProsFn (n) {
        let num = n || 0
        let arg = ''
        let url = ''
        if (num === 2) {
          // 选择价格再次点击价格
          if (this.tabProsNum === 2) {
            this.tabPrice = ~~!this.tabPrice
          }
          arg = `&order=${this.tabPrice}`
        }
        this.tabProsNum = num
        url = `/api/shopping/productSearch.htm?word=${this.searchVal}&sort=${num + arg}`
        this.$http.get(url).then(res => {
          if (res.ok) {
            this.prosList = JSON.parse(res.data).rows
          }
        })
      },
      scrollTop () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>
<style lang="scss">
  @import '../assets/styles/iconfont.scss';
  // 修改组件样式
  .v-search {
    .weui_search_bar {
      padding: 0;
    }
    .vux-search-fixed {
      .weui_search_bar {
        padding: 8px 10px;
      }
    }
    .weui_search_text {
      // text-align: left;
    }
  }
</style>
<style lang="scss" scoped>

  .v-product {
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
  }

  .v-search {
    flex: 1;
    padding: 8px;
  }

  .v-back {
    width: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    i {
      font-size: 22px;
    }
  }
</style>
