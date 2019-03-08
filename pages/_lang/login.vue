<template>
  <div>
    <div class="login_panel">
      <div class="login_panel_right">
        <div class="button_group">
          <button class="login_btn">{{$t('login.account')}}</button>
        </div>
        <div class="login_form">
          <label for="">{{$t('login.username')}}</label>
          <input
            type="text"
            v-model="username"
          >
        </div>
        <div class="login_form">
          <label for="">{{$t('login.pass')}}</label>
          <input
            type="password"
            v-model="password"
          >
        </div>
        <button
          class="login_btn1"
          type="submit"
          @click="handleSubmit"
        >{{$t('login.submit')}}</button>
        <el-row
          type="flex"
          justify="space-around"
          class="footer_links"
        >
          <el-col :span="12">
            <el-button type="text">
              <nuxt-link :to="$i18n.path('forget')">
                {{$t('login.forget')}}
              </nuxt-link>
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="text">
              <nuxt-link
                :to="$i18n.path('register')"
                class="link_blue"
              >
                {{$t('login.register')}}
              </nuxt-link>
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'lorr',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      axios.post('/api/login/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          var that = this;
          async function notify() {
            // await that.$store.dispatch('setLogin');
            await that.$store.dispatch('setMessage', {
              userid: res.data.result.id,
              sessionid: res.data.result.sessionid,
              username: res.data.result.username
            });
            return res.data.msg;
          }
          notify().then((message) => {
            that.$notify({
              title: "成功",
              message: message,
              type: 'success',
              onClose: this.onclose()
            })
          })
        } else {
          this.$notify({
            title: "失敗",
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onclose() {
      this.$router.push({
        path: '/'
      })
    }
  },
}
</script>
<style>
.login_panel {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.login_panel_right {
  width: 470px;
  height: 530px;
  background: rgba(0, 0, 0, 0.4);
  margin-top: 120px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login_btn {
  background: #6f9feb;
  color: #fff;
  width: 160px;
  height: 40px;
  border-radius: 20px;
  border: none;
  margin-top: 65px;
  cursor: pointer;
}
.login_btn:focus {
  outline: none;
}
.login_form {
  margin-top: 58px;
}
.login_form input {
  width: 240px;
  height: 40px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  line-height: 40px;
  border-bottom: 1px solid #7986a3;
}
.login_form label {
  color: #fff;
  font-size: 20px;
  width: 100px;
  text-align: right;
  display: inline-block;
}
.login_form input:focus {
  outline: none;
}
.login_btn1 {
  width: 350px;
  height: 45px;
  background: linear-gradient(to right, #5872e1, #7cbbf1);
  color: #fff;
  border: none;
  border-radius: 20px;
  margin-top: 80px;
  cursor: pointer;
}
.login_btn1:focus {
  outline: none;
}
.footer_links {
  width: 350px;
  height: auto;
  text-align: center;
}
.link_blue {
  color: #7abbf3;
}
.link_blue:hover {
  color: #7abbf3;
}
</style>
