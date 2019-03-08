<template>
  <div>
    <div class="panel1">
      <div class="panel1_content">
        <el-row>
          <el-col :span="6">
            <div class="register1">
              <img
                src="~assets/register.png"
                alt=""
              >
              <div class="register_right">
                <h3>{{$t('person.register')}}</h3>
                <nuxt-link :to="$i18n.path('friend')">
                  <el-button
                    type="primary"
                    plain
                    round
                  >
                    {{$t('person.click')}}
                  </el-button>
                </nuxt-link>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="register1">
              <img
                src="~assets/links.png"
                alt=""
              >
              <div class="register_right">
                <h3>{{$t('person.link')}}</h3>
                <nuxt-link :to="$i18n.path('friend')">
                  <el-button
                    type="primary"
                    plain
                    round
                  >
                    {{$t('person.click')}}
                  </el-button>
                </nuxt-link>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="register1">
              <img
                src="~assets/order.png"
                alt=""
              >
              <div class="register_right">
                <h3>{{$t('person.order')}}</h3>
                <nuxt-link :to="$i18n.path('manage')">
                  <el-button
                    type="primary"
                    plain
                    round
                  >{{$t('person.click')}}</el-button>
                </nuxt-link>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="register1">
              <img
                src="~assets/list.png"
                alt=""
              >
              <div class="register_right">
                <h3>{{$t('person.record')}}</h3>
                <nuxt-link :to="$i18n.path('operate')">
                  <el-button
                    type="primary"
                    plain
                    round
                  >{{$t('person.click')}}</el-button>
                </nuxt-link>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="friend_banner">
      <div class="friend_content">
        <nuxt-link :to="$i18n.path('recommend')">
          <div class="friend_item">
            <img
              src="~assets/organize.png"
              alt=""
            >
            <p>{{$t('person.chart')}}</p>
          </div>
        </nuxt-link>
        <nuxt-link :to="$i18n.path('prize')">
          <div class="friend_item">
            <img
              src="~assets/prize.png"
              alt=""
            >
            <p>{{$t('person.manage')}}</p>
          </div>
        </nuxt-link>
        <nuxt-link :to="$i18n.path('finance')">
          <div class="friend_item">
            <img
              src="~assets/finance.png"
              alt=""
            >
            <p>{{$t('person.finance')}}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="list">
      <div class="list_panel">
        <el-row :gutter="30">
          <el-col :span="12">
            <div
              class="ltc"
              id="canvas-frame"
            >
              <p>{{$t('person.miner')}}</p>
              <div class="ltc_detail">
                <p class="released">{{$t('person.release')}}: <span>{{num1}}</span></p>
                <p class="tobe_release">{{$t('person.release1')}}: <span>{{num2}}</span></p>
                <p class="all">{{$t('person.all')}}: <span>{{num3}}</span></p>
              </div>
              <el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="percentage"
                class="progress"
              ></el-progress>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="list_panel_1">
              <el-card class="box-card">
                <div
                  slot="header"
                  class="clearfix"
                >
                  <span>{{$t('person.notice')}}</span>
                </div>
                <div>
                  <nuxt-link
                    :to="$i18n.path('list/'+item.id)"
                    v-for="(item,index) in notices"
                    :key="index"
                  >
                    {{item.title}}
                  </nuxt-link>
                  <el-pagination
                    layout="prev,pager,next"
                    :total="total1"
                    style="text-align:center;"
                    :background="true"
                    :current-page.sync="currentpage"
                    @prev-click="handlePrev"
                    @next-click="handleNext"
                    @current-change="handleChange"
                  ></el-pagination>
                </div>
              </el-card>
              <el-card
                class="box-card"
                style="margin-top:30px;"
              >
                <div
                  slot="header"
                  class="clearfix"
                >
                  <span>{{$t('person.mailbox')}}</span>
                </div>
                <div>
                  <nuxt-link
                    :to="$i18n.path('email/'+item1.id)"
                    v-for="(item1,index1)  in emails"
                    :key="index1"
                  >
                    {{item1.title}}
                  </nuxt-link>
                  <el-pagination
                    layout="prev,pager,next"
                    :total="total2"
                    style="text-align:center;"
                    :background="true"
                    :current-page.sync="currentpage1"
                    @prev-click="handlePrev1"
                    @next-click="handleNext1"
                    @current-change="handleChange1"
                  ></el-pagination>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: '',
  data() {
    return {
      notices: [],
      emails: [],
      total1: 0,
      total2: 0,
      currentpage: 1,
      currentpage1: 1,
      num1: 0,
      num2: 0,
      num3: 0,
      percentage: 0
    }
  },
  created() {
    let page = this.$store.state.notice;
    if (page > 1) {
      this.currentpage = Number(page);
      this.getNotice(page);
    } else {
      this.getNotice(1);
    }
    let page1 = this.$store.state.email;
    if (page1 > 1) {
      this.currentpage1 = Number(page1);
      this.getMails(page1);
    } else {
      this.getMails(1);
    }
    this.getltc();
  },
  methods: {
    getNotice(page) {
      axios.post('/api/notice/notice', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        page: page
      }).then(res => {
        console.log(res);
        this.notices = res.data.data.notices;
        this.total1 = res.data.data.total;
      }).catch(err => {
        console.log(err);
      })
    },
    getMails(page) {
      axios.post('/api/notice/index', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        page: page
      }).then(res => {
        console.log(res);
        this.emails = res.data.data.emails;
        this.total2 = res.data.data.total;
      }).catch(err => {
        console.log(err);
      })
    },
    getltc() {
      axios.post('/api/member/kuang', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        console.log(res);
        this.num1 = res.data.data.money;
        this.num2 = res.data.data.surplus;
        this.num3 = res.data.data.allmoney;
        this.percentage = Math.ceil((this.num1 / Number(this.num3)) * 100);
      }).catch(err => {
        console.log(err);
      })
    },
    handlePrev(val) {
      this.getNotice(val);
      this.$store.state.commit('SET_NOTICE', val);
    },
    handleNext(val) {
      this.getNotice(val);
      this.$store.state.commit('SET_NOTICE', val);
    },
    handleChange(val) {
      this.getNotice(val);
      this.$store.state.commit('SET_NOTICE', val);
    },
    handlePrev1(val) {
      this.getMails(val);
      this.$store.state.commit('SET_EMAIL', val);
    },
    handleNext1(val) {
      this.getMails(val);
      this.$store.state.commit('SET_EMAIL', val);
    },
    handleChange1(val) {
      this.getMails(val);
      this.$store.state.commit('SET_EMAIL', val);
    }
  },
  mounted() {
    var container = document.getElementById("canvas-frame");
    // 创建Gio控制器
    var controller = new GIO.Controller(container);
    controller.setSelectedColor(0x00FF00);
    // 添加数据
    controller.addData(this.data);
    // 初始化并渲染地球
    controller.init();
  },
  asyncData() {
    return axios.get('/data/sampleData.json')
      .then(res => {
        // console.log(res);
        return { data: res.data }
      })
  },
}
</script>

<style>
.panel1 {
  width: 100%;
  height: 220px;
}
.panel1_content {
  width: 1200px;
  margin: 0 auto;
}
.register1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 70px;
}
.register_right {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
}
.register_right button {
  width: 110px;
  height: 25px;
  line-height: 25px;
  margin-top: 10px;
}
.register_right .el-button.is-round {
  padding: 0;
}
.friend_banner {
  background: url("~assets/friend_banner.png") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 400px;
}
.friend_content {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.friend_item {
  width: 260px;
  height: 250px;
  border: 1px solid #fff;
  border-radius: 20px;
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
}
.friend_item:hover {
  background: linear-gradient(#38aeec, #235ff6);
  background: -moz-linear-gradient(#38aeec, #235ff6);
  background: -webkit-linear-gradient(#38aeec, #235ff6);
  background: -o-linear-gradient(#38aeec, #235ff6);
  border: none;
}
.friend_item p {
  color: #fff;
  font-size: 24px;
}
.list {
  width: 100%;
  height: 950px;
  background: #f3f3f3;
}
.list_panel {
  width: 1200px;
  margin: 0 auto;
}
.list_panel .ltc {
  width: 600px;
  height: 750px;
  margin-top: 75px;
  background: url("~assets/circle.jpg") no-repeat center center;
  background-size: cover;
}
#canvas-frame {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#canvas-frame > p {
  position: absolute;
  top: 23px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 20px;
}
.ltc_detail {
  position: absolute;
  bottom: 140px;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.progress {
  position: absolute;
  bottom: 75px;
  width: 500px;
  color: #333;
}
.ltc_detail p span {
  font-size: 20px;
  font-weight: bold;
}
.list_panel_1 {
  margin-top: 75px;
}
.list_panel_1 a {
  color: #333;
}
.released span {
  color: #00b87a;
}
.tobe_release span {
  color: #d05028;
  font-size: 20px;
}
.all span {
  color: #1a70ce;
}
.progress .el-progress-bar__outer {
  background-color: #01041b;
}
</style>