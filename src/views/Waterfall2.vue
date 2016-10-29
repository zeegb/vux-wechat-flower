<template>
  <div>
    <div class="container">
      <div class="waterfall">
        <div class="pin" v-for="item in items" track-by="$index">
          <img :src="item.image" :alt="item.name" class="img">
          <div class="bd">
            <div class="discribe">{{item.name}}</div>
            <div class="pri">￥{{item.price}}</div>
          </div>
        </div>
        <p>{{ more ? '加载中' : '没有更多了～'}}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .container {
    width: 100%;
    margin: 0 auto;
  }

  .waterfall {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
    -moz-column-width: auto;
    -webkit-column-width: auto;
    column-width: auto;
    -moz-column-gap: 0.2em;
    -webkit-column-gap: 0.2em;
    column-gap: 0.2em;
  }

  .pin {
    margin: 0 0.125em 0.5em;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    background: white;
    -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  }

  .expand-transition {
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    -webkit-transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }

  .pin img {
    width: 100%;
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
  var likePro = [{
    'url': 'http://placekitten.com/' + Math.floor(Math.random() * 100) + 300 + '/' + Math.floor(Math.random() * 500) + 300,
    'id': 94,
    'image': 'http://placekitten.com/' + (Math.floor(Math.random() * 100) + 300) + '/' + (Math.floor(Math.random() * 500) + 300),
    'name': '产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称',
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
        items: [],
        page: 1,
        more: true,
        load: false
      }
    },
    route: {
      data (transition) {
        this.pageData()
        window.addEventListener('scroll', this.scroll)
      },
      deactivate (transition) {
        // 移除前删除对滚动事件
        window.removeEventListener('scroll', this.scroll)
        transition.next()
      }
    },
    methods: {
      // 监听网页滚动到底部
      scroll (e) {
        if (document.body.scrollHeight - window.screen.height - document.body.scrollTop <= 0 && !this.load) {
          this.load = true
          this.pageData()
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
