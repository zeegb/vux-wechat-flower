<template>
  <div class="v-person">
  <x-header :right-options="{showMore: false}" class="v-hd">个人信息</x-header>

  <group title="个人信息">
    <cell title="头像" is-link>
      <img slot="value" width="20px" height="20px" style="border-radius:50%; width=80px height=80px line-height:80px;"
           src="{{personInfo.pic}}">
    </cell>
    <cell title="用户名" is-link :value="personInfo.username"></cell>
    <cell title="昵称" is-link :value="personInfo.nickname"></cell>
    <cell title="性别" is-link :value="personInfo.sex"></cell>
    <cell title="出生日期" is-link :value="personInfo.birthday"></cell>
  </group>
</div>
</template>

<script>
  import Group from 'vux/dist/components/group'
  import Cell from 'vux/dist/components/cell'
  import XHeader from 'vux/dist/components/x-header'

  var personInfo = {
    pic: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
    username: '111222333',
    nickname: '啦啦啦',
    sex: '男',
    birthday: '1994-08-19'
  }

  export default {
    components: {
      Group,
      Cell,
      XHeader
    },
    data () {
      return {
        personInfo: personInfo
      }
    }
  }
</script>

<style lang="scss" scoped>

  .v-person {
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
  }
</style>
