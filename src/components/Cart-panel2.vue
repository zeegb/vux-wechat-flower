<template>
  <div class="cart-box">
    <div class="v-proscell" v-for="(index,item) in list" v-show="item.num > 0">
      <div class="sel">
        <label>
          <input type="checkbox" name="" id="" v-model="item.checked">
        </label>
      </div>
      <div class="hd">
        <img :src="item.img" alt="" class="img" style="width: 60px;height: 60px;">
      </div>
      <div class="right-bd">
        <div class="name">{{item.name}}</div>
        <div class="sku">{{item.sku}}</div>
        <div class="nums">
          <div class="pri f-c2">{{item.pri}}</div>
          <div class="num">
            <x-number :min=0 :max=8 :value.sync="item.num"></x-number>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import XNumber from '../components/x-number2/index.vue'
  export default {
    components: {
      XNumber
    },
    props: {
      list: {
        type: Array
      }
    }
  }
</script>
<style lang="scss" scoped>
  @mixin borderBottom {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 90%;
    border-bottom: 1px solid #cecece;
    transform: scaleY(.5);
  }

  .cart-box {
    margin: 0px 3%;
    box-shadow: 0 0 3px #cacaca;
    border-radius: 5px;
    .v-proscell {
      position: relative;
      display: flex;
      padding: 0 3%;
      background: #fff;
      &:after {
        @include borderBottom;
      }
      .sel {
        display: flex;
        align-items: center;
        padding: 0 3%;
        font-size: 12px;
      }
      .hd {
        padding-top: 5%;
        width: 60px;
        height: 60px;
      }
      .right-bd {
        flex: 1;
        padding: 10px 10px;
        line-height: 20px;
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 14px;
        }
        .sku {
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 10px;
          color: #666;
        }
        .nums {
          padding: 5px 0;
          position: relative;
          .pri {
            float: left;
            color: #f00;
          }
          .num {
            float: right;
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
  }
</style>
