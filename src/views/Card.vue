<template>
  <div class="v-card">
    <x-header :left-options="{showBack: false}" :right-options="{showMore: false}" class="v-hd">贺卡</x-header>
    <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value"
            top="46px"></search>
    <div>
      <div style="margin: 10px;overflow: hidden;" v-for="item in list">
        <masker style="border-radius: 2px;">
          <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
          <div slot="content" class="m-title">
            {{item.title}}
            <br/>
            <span class="m-time">2016-03-18</span>
          </div>
        </masker>
      </div>
    </div>
    <tabbar tab="card"></tabbar>
  </div>
</template>

<script>
  import XHeader from 'vux/dist/components/x-header'
  import Search from 'vux/dist/components/search'
  import Tabbar from '../components/tabbar.vue'
  import Masker from 'vux/dist/components/masker'

  export default {
    components: {
      XHeader,
      Tabbar,
      Search,
      Masker
    },
    data () {
      return {
        results: [],
        value: '',
        list: [{
          title: 'XXX祝你生日快乐',
          img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
        }, {
          title: 'XXX祝你母亲节快乐',
          img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'
        }, {
          title: 'XXX祝你父亲节快乐',
          img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'
        }]
      }
    },
    methods: {
      resultClick (item) {
        console.log('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        this.results = val ? getResult(this.value) : []
      }
    }
  }

  function getResult (val) {
    let rs = []
    for (let i = 0; i < 8; i++) {
      rs.push({
        title: `${val} result: ${i + 1} `,
        other: i
      })
    }
    return rs
  }
</script>

<style lang="less">
  .v-card {
    padding-top: 44px;
  }

  .v-hd {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 44px;
  }

  .m-img {
    padding-bottom: 33%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
  }

  .m-title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }

  .m-time {
    font-size: 12px;
    padding-top: 4px;
    border-top: 1px solid #f0f0f0;
    display: inline-block;
    margin-top: 5px;
  }
</style>
