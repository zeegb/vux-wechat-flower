<template>
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_hd" v-if="header" @click="onClickHeader" v-html="header"></div>
    <div class="weui_panel_bd">
      <!--type==='1'-->
      <a :href="getUrl(item.url)" v-for="item in list" @click.prevent="onItemClick(item)" class="weui_media_box weui_media_appmsg">
        <div class="weui_media_hd" v-if="item.src">
          <img class="weui_media_appmsg_thumb" :src="item.src" alt="">
        </div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{item.title}}</h4>
          <p class="weui_media_desc">{{item.desc}}</p>
        </div>
      </a>
    </div>
    <a class="weui_panel_ft" :href="getUrl(footer.url)" v-if="footer && type !== '3'" @click.prevent="onClickFooter" v-html="footer.title"></a>
  </div>
</template>

<script>
import { go, getUrl } from '../../libs/router'

export default {
  props: {
    header: String,
    footer: Object,
    list: Array,
    type: {
      type: String,
      default: '1'
    }
  },
  methods: {
    getUrl (url) {
      return getUrl(url, this.$router)
    },
    onClickFooter () {
      this.$emit('on-click-footer')
      go(this.footer.url, this.$router)
    },
    onClickHeader () {
      this.$emit('on-click-header')
    },
    onItemClick (item) {
      this.$emit('on-click-item', item)
      go(item.url, this.$router)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_panel/weui_panel';
@import '../../styles/weui/widget/weui_media_box/weui_media_box';
</style>
