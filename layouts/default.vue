<template>
  <div>
    <headtop
      color="#000"
      @page-reload="reload"
    />
    <div class="carousel">
      <el-carousel
        :interval="5000"
        arrow="always"
      >
        <el-carousel-item
          v-for="item in bg"
          :key="item"
        >
          <div
            class="bg"
            v-bind:style="{'background-image':`url(${item})`}"
          ></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <nuxt v-if="isRouterAlive" />
    <div class="footer">
      <!-- <div class="footer_top">
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
      </div> -->
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
import headtop from '~/components/headtop';
import axios from 'axios';
export default {
  data() {
    return {
      bg: [],
      isRouterAlive: true
    }
  },
  created() {
    this.getAd();
  },
  mounted() {
  },
  components: {
    headtop
  },
  methods: {
    getAd() {
      axios.post('/api/Login/getPCad').then(res => {
        // console.log(res);
        this.bg = res.data.data;
      })
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    }
  },
  /* asyncData() {
    return axios.post('http://t439.shangtua.com:88/api/Login/getad')
      .then(res => {
        alert(123);
        console.log(res);
      })
  }, */
}

</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
a,
a:hover {
  color: #fff;
  text-decoration: none;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.header {
  width: 100%;
  background: #0a1220;
  height: 60px;
}
.header-center {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.el-header {
  padding: 0 0 0 100px;
  flex-grow: 1;
}
.header-img {
  width: 100px;
  height: 50px;
}
.el-carousel__container {
  height: 560px;
}
.bg {
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 560px;
}
.footer {
  width: 100%;
  /* height: 270px; */
  height: 150px;
  background: #313131;
}
.footer_content {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.footer_top {
  height: 127px;
  border-bottom: 1px solid #4a4a4a;
}
.footer_top .footer_content h3 {
  margin: 20px 0;
  font-size: 18px;
}
.footer_top .footer_content * {
  color: #fff;
  text-decoration: none;
}
.footer_top .footer_content p {
  float: left;
  margin-right: 40px;
}
.footer_bottom {
  height: auto;
  padding: 1px;
}
.footer_bottom .footer_content {
  margin-top: 30px;
}
.space_between {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  align-self: center;
}
.space_between1 {
  align-items: flex-end;
}
.space_between p {
  line-height: 25px;
}
.el-menu-item a {
  display: inline-block;
  width: 100%;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>
