<template>
  <div class="v-product">
    <x-header :right-options="{showMore: false}" @on-click-title="scrollTop" class="v-hd">全部商品
      <i class="" slot="right" @click="showMenus = !showMenus">分类</i>
    </x-header>

    <!--<scroller lock-x scrollbar-y use-pullup :pullup-status.sync="pullupStatus" @pullup:loading="load3">-->
    <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value"
            top="44px"></search>
    <!-- 商品 -->
    <div class="v-prolist">
      <tab>
        <tab-item :selected="this.tabProsNum === 0" @click="tabProsFn(0)">销售量</tab-item>
        <tab-item :selected="this.tabProsNum === 1" @click="tabProsFn(1)">新品</tab-item>
        <tab-item :selected="this.tabProsNum === 2" @click="tabProsFn(2)">价格</tab-item>
      </tab>
      <!--content slot-->
      <div id="main">
        <div class="pin" v-for="item in items" track-by="$index" v-link="{name:'productDetail',params:{id:item._id}}">
          <div class="box">
            <img :src="item.pictures[0] || ''" class="img">
            <div class="bd">
              <div class="discribe">{{item.description}}</div>
              <div class="pri">￥{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>

      <!--pullup slot-->
      <div id="pullup"
           style="position: absolute; width: 100%; height: 40px; padding-top: 8px; text-align: center; color:#888888;">
        <!--<span v-show="pullupStatus === 'default' && more">上拉加载更多</span>-->
        <span v-show="!more">没有更多了~</span>
        <!--<span class="pullup-arrow" v-show="more && (pullupStatus === 'down' || pullupStatus === 'up')"-->
        <!--:class="{'rotate': pullupStatus === 'up'}">↑</span>-->
        <span v-show="more"><spinner type="ios-small"></spinner>加载更多</span>
      </div>
    </div>
    <!--</scroller>-->
    <actionsheet :show.sync="showMenus" :menus="typeList" @on-click-menu="selectType"></actionsheet>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Tab from 'vux/dist/components/tab'
  import TabItem from 'vux/dist/components/tab-item'
  import Search from 'vux/dist/components/search'
  import Scroller from 'vux/dist/components/scroller'
  import Spinner from 'vux/dist/components/spinner'
  import Actionsheet from 'vux/dist/components/actionsheet'

  //  var likePro = [{
  //    'url': 'http://placekitten.com/' + Math.floor(Math.random() * 100) + 300 + '/' + Math.floor(Math.random() * 500) + 300,
  //    'id': 94,
  //    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
  //    'name': '产品名称产品名称产品',
  //    'price': 982
  //  }, {
  //    'url': '/category/product/url',
  //    'id': 94,
  //    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
  //    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
  //    'price': 982
  //  }, {
  //    'url': '/category/product/url',
  //    'id': 94,
  //    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
  //    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
  //    'price': 982
  //  }, {
  //    'url': '/category/product/url',
  //    'id': 94,
  //    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
  //    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
  //    'price': 982
  //  }, {
  //    'url': '/category/product/url',
  //    'id': 94,
  //    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
  //    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
  //    'price': 982
  //  }, {
  //    'url': '/category/product/url',
  //    'id': 94,
  //    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
  //    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
  //    'price': 982
  //  }]

  export default {
    components: {
      XHeader,
      Search,
      Tab,
      TabItem,
      Scroller,
      Spinner,
      Actionsheet
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
        items: [],
        page: 1,
        more: true,
        load: false,
        colsHeight: [0, 0],
        pinS: [],
        $items: [],
        itemWidth: '',
        index: 0,
        pullupStatus: 'default',
        showMenus: false,
        typeList: {
          menu1: '多肉',
          menu2: '种子',
          menu3: '花'
        },
        selectedType: ''
      }
    },
    route: {
      data (transition) {
        this.pageData()
//        this.$nextTick(function () {
//          this.arrange()
//        })
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
//      setTimeout(function () {
//      }, 0)
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
      arrange () {
        this.pinS = document.getElementsByClassName('pin')
        console.log('this.pinS', this.pinS)
        this.itemWidth = this.pinS[0].offsetWidth
        this.$items = []
        for (var x = this.index; x < this.pinS.length; x++) {
//          if (this.pinS[x].className.indexOf('pin wait')) {
          this.$items.push(this.pinS[x])
//          }
        }
        this.index = x
        console.log(this.index)
        console.log('this.$items', this.$items)
//        var viewWidth = document.documentElement.clientWidth || document.body.clientWidth
//        var cols = 2// Math.floor(viewWidth / this.itemWidth)

//        var colsHeight = []
//        for (var i = 0; i < cols; i++) {
//          this.colsHeight.push(0)
//        }
        for (var j = 0; j < this.$items.length; j++) {
          var ele = this.$items[j]
          var curHeight = this.colsHeight[0]
          var col = 0
          for (var z = 0; z < this.colsHeight.length; z++) {
            if (this.colsHeight[z] < curHeight) {
              curHeight = this.colsHeight[z]
              col = z
            }
          }
          ele.style.left = col * this.itemWidth + 'px'
          ele.style.top = curHeight + 'px'
          this.colsHeight[col] += ele.offsetHeight
        }
        var maxH = Math.max.apply(null, this.colsHeight)
        var oParent = document.getElementById('main')
        var oPullup = document.getElementById('pullup')
        oParent.style.height = maxH + 'px'
        oPullup.style.buttom = 0
      },

      scroll (e) {
        if (document.body.scrollHeight - window.screen.height - document.body.scrollTop <= 0 && !this.load) {
          this.load = true
          this.pageData()
        }
      },
      pageData () {
        this.$http.post('/wx/data/product/list', {
          page: this.page,
          uid: 'system',
          ops: this.selectedType ? `{"product_type_id":"${this.selectedType}"}` : ''
        }).then((res) => {
          if (res.body && res.body.code === '200' && res.body.data && res.body.data.items.length) {
            this.page++
            this.items = this.items.concat(res.body.data.items)
            this.$nextTick(function () {
              this.arrange()
            })
            this.load = false
            if (res.body.data.items.length < 10) {
              this.more = false
              this.load = true
            }
          } else {
            this.more = false
            this.load = true
          }
        }, (err) => {
          console.log('获取轮播图失败:' + err)
        })
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

//        this.page++
//        if (this.page > 4) {
//          this.more = false
//          this.items = this.items
//        } else {
//          this.items = this.items.concat(likePro)
//        }
//        this.load = false
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
      },
      selectType (key) {
        console.log(key)
      }
    }
  }
</script>
<style lang="scss" scoped>
  // 瀑布流
  #main {
    position: relative;
    margin: 0 auto;
  }

  .pin {
    width: 48.5%;
    padding: 1% 0 0 1%;
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
    height: 200px;
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
    background-color: #000011;
    opacity: 0.7;
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
