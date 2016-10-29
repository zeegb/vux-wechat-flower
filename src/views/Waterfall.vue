<template>
  <div>
    <waterfall
      :align="align"
      :line-gap="200"
      :min-line-gap="100"
      :max-line-gap="220"
      :single-max-width="300"
      :watch="items"
      :fixed-height="true"
    >
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="item in items"
        :width="item.width"
        :height="item.height"
        :order="$index"
        move-class="item-move"
      >
        <div class="item">
          <div class="hd">
            <img :src="item.image" :alt="item.name" class="img">
          </div>
          <div class="bd">
            <div class="pri">￥{{item.price}}</div>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </waterfall-slot>
    </waterfall>
  </div>
</template>
<style lang="scss" scoped>
  .hd {
    height: auto;
    overflow: hidden;
    .img {
      width: 100%;
    }
  }

  .bd {
    .name {
      display: -webkit-box;
      height: 32px;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 12px;
    }
    .pri {
      color: #06ff18;
      font-size: 14px;
    }
  }

  .item-move {
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    -webkit-transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }

  body {
    margin: 5px;
    font-family: Helvetica, sans-serif;
  }

  .item {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    font-size: 1.2em;
    color: rgb(0, 158, 107);
  }

  .item:after {
    content: attr(index);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }

  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }

  .wf-enter {
    opacity: 0;
  }
</style>
<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

  export default{
    data () {
      return {
        align: 'center',
        isBusy: false,
        items: [{
          'url': '/category/product/url',
          'id': 94,
          'image': 'http://temp.im/100',
          'name': '产品名称',
          'price': 982,
          width: 100 + ~~(Math.random() * 50),
          height: 100 + ~~(Math.random() * 50)
        }, {
          'url': '/category/product/url',
          'id': 94,
          'image': 'http://temp.im/100',
          'name': '产品名称',
          'price': 982,
          width: 100 + ~~(Math.random() * 50),
          height: 100 + ~~(Math.random() * 50)
        }, {
          'url': '/category/product/url',
          'id': 94,
          'image': 'http://temp.im/100',
          'name': '产品名称',
          'price': 982,
          width: 100 + ~~(Math.random() * 50),
          height: 100 + ~~(Math.random() * 50)
        }, {
          'url': '/category/product/url',
          'id': 94,
          'image': 'http://temp.im/100',
          'name': '廖聪健产品名称',
          'price': 982,
          width: 100 + ~~(Math.random() * 50),
          height: 100 + ~~(Math.random() * 50)
        }, {
          'url': '/category/product/url',
          'id': 94,
          'image': 'http://temp.im/100',
          'name': '产品名称',
          'price': 982,
          width: 100 + ~~(Math.random() * 50),
          height: 100 + ~~(Math.random() * 50)
        }, {
          'url': '/category/product/url',
          'id': 94,
          'image': 'http://temp.im/100',
          'name': '产品名称',
          'price': 982,
          width: 100 + ~~(Math.random() * 50),
          height: 100 + ~~(Math.random() * 50)
        }]
      }
    },
    components: {
      Waterfall,
      WaterfallSlot
    },
    events: {
      'wf-reflowed': function () {
        this.isBusy = false
      }
    }
  }
</script>
