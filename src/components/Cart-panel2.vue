<template>
  <div class="cart-box">
    <div class="v-proscell" v-for="(index,item) in list" v-show="item.count > 0">
      <div class="sel">
        <label>
          <input type="checkbox" name="" id="" v-model="item.checked">
        </label>
      </div>
      <div class="hd">
        <img :src="item.src" alt="" class="img">
      </div>
      <div class="bd">
        <div class="name">{{item.title}}</div>
        <div class="sku">{{item.soldOut}}</div>
        <div class="nums">
          <div class="pri f-c2">{{item.price}}</div>
          <div class="num">
            <x-number :min=0 :max=8 :value.sync="item.count"></x-number>
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
        type: Array,
        default: []
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
      .bd {
        flex: 1;
        padding: 10px 10px;
        min-width: 0;
        min-height: 0;
        line-height: 20px;
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
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
            color: #f00;
          }
          .num {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
  }
</style>
