<template>
  <div>
    <el-card class="message-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{$t('message.message')}}</span>
      </div>
      <div>
        <el-form
          ref="form"
          label-width="200px"
          style="width:800px;margin:0 auto;"
        >
          <template v-for="(item,index) in form">
            <el-form-item
              :key="index"
              :label="item.lable"
            >
              <el-input
                :value="item.value"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </template>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: '',
  data() {
    return {
      form: []
    }
  },
  middleware: "auth",
  created() {
    this.getPage();
  },
  methods: {
    onclose1() {
      setTimeout(() => {
        this.$router.replace('/login');
      }, 3000);
    },
    getPage() {
      axios.post('/api/member/memberProfile', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        console.log(res);
        if (res.data.status == 0) {
          this.$store.commit('clearMessage');
          this.$message({
            type: 'error',
            message: res.data.msg,
            onClose: this.onclose1()
          })
        }
        this.form = res.data.data;
      }).catch(err => {
        console.log(err);
      })
    }
  },
}
</script>

<style>
.message-card {
  width: 1200px;
  margin: 30px auto;
}
</style>