<template>
  <div class="v-feedback">
    <x-header :right-options="{showMore: false}" class="v-hd">评价</x-header>
    <div class="pro-primary">
      <div class="pro-cell">
        <div class="cell-hd">
          <img src="http://temp.im/80x80" alt="" class="img">
        </div>
        <div class="cell-bd">
          <p>评分</p>
          <rater :value.sync="data" slot="value" star="♡" active-color="red" :margin="5"></rater>
        </div>
      </div>
      <div class="cell-text">
        <x-textarea :max="200" placeholder="写下购买体会和使用感受来帮助其他小伙伴~" style="padding:0px;"></x-textarea>
      </div>
    </div>
    <div class="exp-primary">
      <div class="exp-cell">
        <div class="cell-hd">
          <img src="../../src/assets/cart-small.png" alt="" class="img">
        </div>
        <div class="cell-bd">
          <span>物流服务评价</span>
          <span style="float:right;">满意请给5星</span>
        </div>
      </div>
      <div class="text-cells">
        <div class="cell-text">
          <span>商品符合度</span>
          <div class="rater">
            <rater :value.sync="data" slot="value" star="♡" active-color="red" :margin="6"></rater>
          </div>
        </div>
        <div class="cell-text">
          <span>店家服务态度</span>
          <div class="rater">
            <rater :value.sync="data" slot="value" star="♡" active-color="red" :margin="6"></rater>
          </div>
        </div>
        <div class="cell-text">
          <span>物流发货速度</span>
          <div class="rater">
            <rater :value.sync="data" slot="value" star="♡" active-color="red" :margin="6"></rater>
          </div>
        </div>
        <div class="cell-text">
          <span>配送员服务态度</span>
          <div class="rater">
            <rater :value.sync="data" slot="value" star="♡" active-color="red" :margin="6"></rater>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @mixin borderBottom {
    content: '';
    position: absolute;
    bottom: 0;
    left: 2.5%;
    width: 100%;
    border-bottom: 1px solid #cecece;
    transform: scaleX(.95);
  }

  .v-feedback {
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

  .pro-primary {
    margin: 10px;
    padding-bottom: 10px;
    background: #fff;
    box-shadow: 0 0 3px #ccc;
    border-radius: 5px;
    &:after {
      @include borderBottom;
    }
    .pro-cell {
      display: flex;
      position: relative;
      margin-bottom: 10px;
      padding: 10px 15px;
      &:after {
        @include borderBottom;
      }
      .cell-hd {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        border: 1px solid #ececec;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .cell-bd {
        padding: 5px 20px;
        flex: 1;
        line-height: 25px;
        font-size: 16px;
        color: #3e3e3e;
        p {
          padding: 0px 5px 10px 5px;
        }
      }
    }
    .cell-text {
      margin: 0px 15px;
      padding: 5px;
      box-shadow: 0 0 3px #d7d7d7;
      border-radius: 5px;
    }
  }

  .exp-primary {
    margin: 10px;
    background: #fff;
    box-shadow: 0 0 3px #ccc;
    border-radius: 5px;
    .exp-cell {
      display: flex;
      height: 20px;
      line-height: 20px;
      position: relative;
      margin-bottom: 10px;
      padding: 10px 15px;
      &:after {
        @include borderBottom;
      }
      .cell-hd {
        width: 20px;
        height: 20px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .cell-bd {
        padding: 1px 2px;
        flex: 1;
        font-size: 12px;
        color: #3e3e3e;
      }
    }
    .text-cells {
      padding: 10px;
      .cell-text {
        padding: 0px 5px 10px 5px;
        font-size: 14px;
        color: #3e3e3e;
        .rater {
          display: inline-block;
          float: right;
        }
      }
    }

  }


</style>
<script>
  import XHeader from 'vux/dist/components/x-header'
  import Rater from 'vux/dist/components/rater'
  import XTextarea from 'vux/dist/components/x-textarea'
  export default{
    data () {
      return {
        data: 3
      }
    },
    components: {
      XHeader,
      Rater,
      XTextarea
    }
  }
</script>
