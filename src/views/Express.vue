<template>
  <div class="v-express">
    <x-header :left-options="{showBack: false}" :right-options="{showMore: true}"
              @on-click-more="showMenus = true" class="v-hd">购物车
    </x-header>
    <div class="e-status">
      <timeline>
        <timeline-item v-for="i in count">
          <h4 :class="[i === 0 ? 'recent' : '']">Timeline Node {{i + 1}}</h4>
          <p :class="[i === 0 ? 'recent' : '']">index {{i + 1}}</p>
        </timeline-item>
      </timeline>
    </div>
  </div>
</template>
<style lang="scss" scoped>

  .v-express {
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

    .v-express {
      p {
        color: #888;
        font-size: 0.8rem;
      }
      h4 {
        color: #666;
        font-weight: normal;
      }
      .recent {
        color: rgb(4, 190, 2)
      }
    }
  }


</style>
<script>
  import XHeader from 'vux/dist/components/x-header'
  import Timeline from 'vux/dist/components/timeline'
  import TimelineItem from 'vux/dist/components/timeline-item'
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {
      XHeader,
      Timeline,
      TimelineItem
    }
  }
</script>
