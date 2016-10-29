<template>
  <div>
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
</template>
<style lang="scss" scoped>

  #main {
    position: relative;
    margin: 0 auto;
  }

  .pin {
    width: 44%;
    padding: 15px 0 0 4%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .box {
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 0 6px #ccc;
    border-radius: 5px;
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
</style>
<script>
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
  export default{
    data () {
      return {
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
    ready () {
      setTimeout(function () {
        $items = document.getElementsByClassName('pin')
        console.log($items)
        itemWidth = $items[0].offsetWidth

        wf.arrange()
      }, 0)
    },
    methods: {
      initWaterfall () {
//        waterfall('main', 'pin')
      },
      // 监听网页滚动到底部
      scroll (e) {
        if (document.body.scrollHeight - window.screen.height - document.body.scrollTop <= 0 && !this.load) {
          this.load = true
//          this.pageData()
        }
      },
      // 获取一页数据
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
      }

    }
  }
</script>
