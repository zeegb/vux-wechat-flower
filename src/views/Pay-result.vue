<template>
  <div class="v-pay">
    <x-header :right-options="{showMore: false}" class="v-hd">支付结果
    </x-header>
    <div class="resultsItem">
      <div class="contentMsg">
        <h3>恭喜您，支付成功！</h3>
        <h3>请等待系统为您处理订单！</h3>
        <div class="btnBox">
          <a href="javascript:" class="weui_btn" v-link="{path:'product-list'}"> 继续逛逛 </a>
          <a href="javascript:" class="weui_btn weui_btn_default" v-link="{path:'order-list'}"> 查看订单记录 </a>
        </div>
      </div>
      <div class="contentList">
        <h3>您的订单信息如下：</h3>
        <div class="detail">
          <div class="item">
            <p class="gname nowrap">产品名称产品名称产品名称</p>
            <p class="gnum">商品编号：12345678</p>
          </div>

          <div class="item">
            <p class="gname nowrap">产品名称产品名称产品名称</p>
            <p class="gnum">商品编号：12345678</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .v-pay {
    padding-top: 44px;

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

    .resultsItem {
      .contentMsg {
        position: relative;
        padding: 15px 10px;
        background: #fff;
        text-align: center;
        color: #616161;
        font-size: 14px;

        h3:nth-child(1) {
          margin-top: 20px;
        }

        .btnBox {
          a:nth-child(1) {
            background-color: #02bb00;
            margin-right: 10px;
          }
          a {
            display: inline-block;
            width: 140px;
          }
        }
      }
      .contentList {
        color: #616161;
        padding: 15px;
        h3 {
          font-size: 14px;
        }

        .detail {
          margin-top: 10px;
          padding: 10px;
          min-height: 100px;
          background: #fff;
          box-shadow: 0 0 3px #ccc;
          border-radius: 5px;

          .item {
            font-size: 14px;
            margin-bottom: 10px;
            .gname {
              font-size: 14px;
              color: #ff6666;
            }
            .gnum {
              margin: 5px 0;
            }
          }
          .ginfo {
            text-align: center;
            display: flex;

            .num {
              flex: 1;
              text-align: left;

              > span {
                display: inline-block;
                margin-right: 5px;
              }
            }

          }
        }

      }
    }

  }


</style>
<script>
  import XHeader from 'vux/dist/components/x-header'
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      XHeader
    }
  }
</script>
