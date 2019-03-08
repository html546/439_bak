<template>
  <div class="trade">
    <headtop
      color="#000"
      @page-reload="reload"
    />
    <nuxt v-if="isRouterAlive" />
    <div class="footer">
      <div class="footer_top">
        <div class="footer_content">
          <h3>{{$t('links.link')}}</h3>
          <div>
            <p>
              <a href="#">百度一下</a>
            </p>
            <p>
              <a href="#">系統之家</a>
            </p>
            <p>
              <a href="#">比可兒軟件</a>
            </p>
            <p>
              <a href="#">華彩軟件</a>
            </p>
          </div>
        </div>
      </div>
      <div class="footer_bottom">
        <div class="footer_content">
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col
              :span="8"
              class="space_between"
            >
              <h3>{{$t('links.about')}}</h3>
              <p>
                <a href="#">{{$t('links.legal')}}</a>
              </p>
            </el-col>
            <el-col
              :span="8"
              class="space_between"
            >
              <p>{{$t('links.tel')}}:0000-0000000</p>
              <p>{{$t('links.email')}}:000000000000</p>
              <p>{{$t('links.address')}}:0000000000000000000000000</p>
            </el-col>
            <el-col
              :span="8"
              class="space_between space_between1"
            >
              <img
                src="~assets/box.png"
                alt=""
              >
              <p>{{$t('links.follow')}}</p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headtop from '~/components/headtop'
export default {
  components: {
    headtop
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted() {
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    }
  },
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
.trade {
  width: 100%;
  height: 100%;
  background-image: url("~assets/trade_bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>

