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
      <div id="main">
        <div class="pin" v-for="item in items" track-by="$index">
          <div class="box">
            <img :src="item.image" class="img">
            <div class="bd">
              <div class="discribe">{{item.name}}</div>
              <div class="pri">￥{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Tab from 'vux/dist/components/tab'
  import TabItem from 'vux/dist/components/tab-item'
  import Search from 'vux/dist/components/search'

  var $items
  var itemWidth
  var wf = {
    arrange: function () {
      var viewWidth = document.documentElement.clientWidth || document.body.clientWidth
      var cols = Math.floor(viewWidth / itemWidth)

      var colsHeight = []
      for (var i = 0; i < cols; i++) {
        colsHeight.push(0)
      }
      for (var j = 0; j < $items.length; j++) {
        var ele = $items[j]
        var curHeight = colsHeight[0]
        var col = 0
        for (var z = 0; z < colsHeight.length; z++) {
          if (colsHeight[z] < curHeight) {
            curHeight = colsHeight[z]
            col = z
          }
        }
        ele.style.left = col * itemWidth + 'px'
        ele.style.top = curHeight + 'px'
        colsHeight[col] += ele.offsetHeight
      }
      var maxH = Math.max.apply(null, colsHeight)
      var oParent = document.getElementById('main')
      oParent.style.height = maxH + 'px'
    }
  }
  var likePro = [{
    'url': 'http://placekitten.com/' + Math.floor(Math.random() * 100) + 300 + '/' + Math.floor(Math.random() * 500) + 300,
    'id': 94,
    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
    'name': '产品名称产品名称产品',
    'price': 982
  }, {
    'url': '/category/product/url',
    'id': 94,
    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
    'price': 982
  }, {
    'url': '/category/product/url',
    'id': 94,
    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
    'price': 982
  }, {
    'url': '/category/product/url',
    'id': 94,
    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
    'price': 982
  }, {
    'url': '/category/product/url',
    'id': 94,
    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
    'price': 982
  }, {
    'url': '/category/product/url',
    'id': 94,
    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
    'price': 982
  }]

  export default {
    components: {
      XHeader,
      Search,
      Tab,
      TabItem
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
        items: likePro,
        page: 1,
        more: true,
        load: false
      }
    },
    route: {
      data (transition) {
//        this.pageData()
        window.addEventListener('scroll', this.scroll)
      },
      deactivate (transition) {
        // 移除前删除对滚动事件
        window.removeEventListener('scroll', this.scroll)
        transition.next()
      }
    },
    created () {
    },
    ready () {
      setTimeout(function () {
        $items = document.getElementsByClassName('pin')
        console.log($items)
        itemWidth = $items[0].offsetWidth

        wf.arrange()
      }, 0)
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
      scroll (e) {
        if (document.body.scrollHeight - window.screen.height - document.body.scrollTop <= 0 && !this.load) {
          this.load = true
//          this.pageData()
        }
      },
      pageData () {
//        this.$http.jsonp('http://api.douban.com/v2/movie/' + this.type, {
//          count: this.count,
//          start: (this.page - 1) * this.count
//        }).then((response) => {
//          if(this.page === 1){
//            this.$loadingRouteData = false
//            document.title = this.title = response.data.title.split('-')[0]
//          }
//          if(response.data && response.data.subjects.length){
//            this.page ++
//            this.list = this.list.concat(response.data.subjects)
//          }else{
//            this.more = false
//          }
//          this.load = false
//        })
        this.page++
        if (this.page > 10) {
          this.more = false
          this.items = this.items
        } else {
          this.items = this.items.concat(likePro)
        }
        this.load = false
      },
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
  // 瀑布流
  #main {
    position: relative;
    margin: 0 auto;
  }

  .pin {
    width: 47%;
    padding: 10px 0 0 2%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .box {
    border: 1px solid #ccc;
    box-shadow: 0 0 6px #ccc;
  }

  .box img {
    width: 100%;
    height: 250px;
  }

  .bd {
    margin: 0.5em 0.5em;
    .discribe {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      font-size: 12px;
    }
    .pri {
      margin: 0.3em 0 0 0;
      color: #ff2c00;
      font-size: 18px;
    }
  }


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
