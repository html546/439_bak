<template>
  <div>
    <div class="notice_detail">
      <el-card class="box_card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>郵件詳情</span>
        </div>
        <div style="overflow:hidden;">
          <h3>{{title}}</h3>
          <p v-html="content"></p>
          <p class="time">{{time | timefilter}}</p>
        </div>
        <el-button
          type="primary"
          @click="goback"
        >返回上一頁</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: '',
  data() {
    return {
      title: '',
      content: '',
      time: ''
    }
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      axios.post('/api/notice/viewdetails', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: this.$route.params.id
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.title = res.data.data.title;
          this.time = res.data.data.send_date;
          this.content = res.data.data.content;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    goback() {
      this.$router.go(-1);
    }
  },
  filters: {
    timefilter(val) {
      return format1(val * 1000);
    }
  }
}
function add0(m) { return m < 10 ? '0' + m : m }
function format1(shijianchuo) {
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return y + '-' + add0(m) + '-' + add0(d);
}
</script>

<style>
.notice_detail {
  width: 1200px;
  margin: 0 auto;
}
.notice_detail .box_card {
  width: 800px;
  margin: 75px auto;
}
.notice_detail .box_card h3 {
  text-align: center;
}
.notice_detail .box_card p {
  padding: 20px 0;
}
.notice_detail .box_card .time {
  float: right;
}
</style>