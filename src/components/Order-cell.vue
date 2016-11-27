<template>
  <div>
    <div class="v-proscell" v-for="items of proslist">
      <div class="hd">
        <img :src="items.product_picture" alt="" class="img" style="width: 60px;height: 60px;">
      </div>
      <div class="bd">
        <div class="v-txt">
          <div class="name">{{items.product_name}}</div>
          <div class="sku">{{items.product_summary}}</div>
          <div class="nums">
            <div class="pri f-c2">{{items.total_fee}}</div>
            <div class="num">x{{items.count}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      proslist: {
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
    left: 0;
    width: 100%;
    border-bottom: 1px solid #cecece;
    transform: scaleY(.5);
  }

  .v-proscell {
    position: relative;
    display: flex;
    margin-left: 15px;
    padding-right: 15px;
    background: #fff;
    &:after {
      @include borderBottom;
    }
    .hd {
      width: 60px;
      height: 60px;
      padding: 10px 0;
      white-space: nowrap;
    }
    .bd {
      flex: 1;
      padding: 10px 0;
      .v-txt {
        padding-left: 10px;
        line-height: 20px;
        .name {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 14px;
        }
        .sku {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 12px;
          color: #666;
        }
        .nums {
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
      .ipt {
        width: 100%;
        box-sizing: border-box;
        -webkit-appearance: none;
        border: 0 none;
        font-size: 14px;
      }
    }
    .ft {
      padding: 10px 0;
      white-space: nowrap;
      text-align: right;
    }
  }
</style>
