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
  .container {
    width: 100%;
    margin: 0 auto;
  }

  #main {
    position: relative;
  }

  .pin {
    width: 44%;
    padding: 15px 0 0 4%;
    float: left;
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
  function waterfall (parent, pin) {
    var oParent = document.getElementById(parent)
    var aPin = getClassObj(oParent, pin)
//    var iPinW = aPin[0].offsetWidth
    var num = 2// Math.floor(document.documentElement.clientWidth / iPinW)

    var pinHArr = []
    console.log(aPin[0])
    for (var i = 0; i < aPin.length; i++) {
      var pinH = aPin[i].offsetHeight
      console.log('pinH', pinH)
      if (i < num) {
        pinHArr[i] = pinH
      } else {
        var minH = Math.min.apply(null, pinHArr)
        console.log('minH', pinHArr)
        var minHIndex = getminHIndex(pinHArr, minH)
        aPin[i].style.position = 'absolute'
        aPin[i].style.top = (minH * 1 + 15) + 'px'
        aPin[i].style.left = aPin[minHIndex].offsetLeft + 'px'
        pinHArr[minHIndex] += aPin[i].offsetHeight
      }
    }
  }

  function getClassObj (parent, className) {
    var obj = parent.getElementsByTagName('*')
    console.log(obj)
    console.log(obj.length)
    var pinS = []
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].className === className) {
        pinS.push(obj[i])
      }
    }
    console.log(pinS.length)
    return pinS
  }
  function getminHIndex (arr, minH) {
    for (var i in arr) {
      if (arr[i] === minH) {
        return i
      }
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
      this.initWaterfall()
    },
    methods: {
      initWaterfall () {
        waterfall('main', 'pin')
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
