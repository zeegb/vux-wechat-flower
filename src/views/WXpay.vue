<template>
  <div>
  </div>
</template>
<script>
  import {getUserId} from '../vuex/getters'
  export default{
    vuex: {
      getters: {
        getUserId
      }
    },
    route: {
      data (transition) {
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
          }
        }
        this.$http.post('/wx/weixin/create-order', {
          openid: this.getUserId
        }).then((res) => {
          if (res.body && res.body.code === '200' && res.body.data) {
            this.wxPayConfig = res.body.data
            this.onBridgeReady();
          } else {
          }
        }, (err) => {
          console.log('获取订单失败:' + err)
        })
      }
    },
    data () {
      return {
        wxPayConfig: {}
      }
    },
    methods: {
      onBridgeReady () {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            appId: this.wxPayConfig.appId,
            timeStamp: this.wxPayConfig.timeStamp,
            nonceStr: this.wxPayConfig.nonceStr,
            package: this.wxPayConfig.package,
            signType: this.wxPayConfig.signType,
            paySign: this.wxPayConfig.paySign
          }, function (res) {
            if (res.err_msg === 'get_brand_wcpay_request：ok') {
              this.$route.router.go('pay-result')
            }
            if (res.err_msg === 'get_brand_wcpay_request：cancel' || res.err_msg === 'get_brand_wcpay_request：fail') {
              window.history.back()
            }
          })
      }
    }
  }
</script>
