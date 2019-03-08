<template>
  <div class="forget">
    <div class="forget_panel">
      <div class="forget_panel_right">
        <div class="button_group">
          <el-row :gutter="40">
            <el-col :span="12">
              <button
                :class="{active:isActive}"
                @click="handleActive"
              >{{$t('forget.mobile')}}</button>
            </el-col>
            <el-col :span="12">
              <button
                :class="{active:!isActive}"
                @click="handleActive1"
              >{{$t('forget.email')}}</button>
            </el-col>
          </el-row>
        </div>
        <form>
          <div class="forget_form">
            <label for="">{{$t('forget.member')}}</label>
            <input
              type="text"
              name="username"
              v-model="username"
            >
          </div>
          <div
            class="forget_form"
            v-show="isActive == true"
          >
            <label for="">{{$t('forget.mobile_code')}}</label>
            <input
              type="text"
              name="mobile"
              v-model="mobile"
            >
          </div>
          <div
            class="forget_form"
            v-show="isActive == false"
          >
            <label for="">{{$t('forget.email_code')}}</label>
            <input
              type="text"
              name="email"
              v-model="email"
            >
          </div>
          <button
            class="forget_btn1"
            type="submit"
            @click="handleSubmit"
          >{{$t('forget.getback')}}</button>
          <el-row
            type="flex"
            justify="space-around"
            class="footer_links"
          >
            <el-col :span="12">
              <el-button type="text">
                <nuxt-link :to="$i18n.path('login')">
                  {{$t('forget.login')}}
                </nuxt-link>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="text">
                <nuxt-link
                  :to="$i18n.path('register')"
                  class="link_blue"
                >
                  {{$t('forget.register')}}
                </nuxt-link>
              </el-button>
            </el-col>
          </el-row>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'lorr',
  name: '',
  data() {
    return {
      isActive: true,
      username: "",
      mobile: "",
      email: ""
    }
  },
  methods: {
    handleActive() {
      this.isActive = true;
    },
    handleActive1() {
      this.isActive = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      if (this.isActive) {
        axios.post('/api/login/forgetPassByMobile', {
          username: this.username,
          mobile: this.mobile
        }).then(res => {
          //   console.log(res);
          if (res.data.status == 1) {
            this.$message({
              type: 'success',
              message: res.data.msg,
              showClose: true
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg,
              showClose: true
            })
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  },
}
</script>

<style >

.forget_panel {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.forget_panel_right {
  width: 470px;
  height: auto;
  background: rgba(0, 0, 0, 0.4);
  margin-top: 250px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}
.button_group button {
  width: 165px;
  height: 40px;
  background: none;
  border-radius: 20px;
  color: #6f9feb;
  border: 1px solid #6f9feb;
  margin-top: 60px;
  cursor: pointer;
}
.button_group button.active,
.button_group button:hover {
  background: #6f9feb;
  color: #fff;
}

.button_group button:focus {
  outline: none;
}
.forget_form {
  margin-top: 8px;
}
.forget_form select,
.forget_form input {
  width: 240px;
  height: 40px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  line-height: 40px;
  border-bottom: 1px solid #7986a3;
}
.forget_form select:focus {
  outline: none;
}
.forget_form select option {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: none;
  color: #333;
}
.forget_form select option:hover {
  color: #fff;
}
.forget_form label {
  color: #fff;
  font-size: 20px;
  width: 120px;
  text-align: right;
  display: inline-block;
}
.forget_form input:focus {
  outline: none;
}
.forget_btn1 {
  width: 370px;
  height: 45px;
  background: linear-gradient(to right, #5872e1, #7cbbf1);
  color: #fff;
  border: none;
  border-radius: 20px;
  margin: 20px 0 0px;
  cursor: pointer;
}
.forget_btn1:focus {
  outline: none;
}
.footer_links {
  width: 370px;
  height: auto;
  text-align: center;
}
</style>