<template>
  <div class="register">
    <div class="register_panel">
      <div class="register_panel_right">
        <div class="button_group">
          <el-row :gutter="40">
            <el-col :span="12">
              <button
                :class="{active:isActive}"
                @click="handleActive"
              >{{$t('register.mobile')}}</button>
            </el-col>
            <el-col :span="12">
              <button
                :class="{active:!isActive}"
                @click="handleActive1"
              >{{$t('register.email')}}</button>
            </el-col>
          </el-row>
        </div>
        <form @submit="handleSubmit">
          <div
            class="register_form"
            v-for="(val,key) in regdata"
            :key="key"
          >
            <label for="">{{val.name}}</label>
            <input
              :name="key"
              type="text"
              v-if="val.input!=='hidden'&&val.input!=='select'&&key!=='mobile_phone'"
              v-model="val.default"
            >
            <input
              type="text"
              :name="key"
              v-if="key == 'mobile_phone'"
              v-model="mobile"
            >
            <select
              :name="key"
              v-else-if="val.input=='select'&&key!=='bank_name'"
              v-model="val.default"
            >
              <option
                v-for="(val1,key1) in val.select"
                :key="key1"
                :value="key1"
              >{{val1}}</option>
            </select>
            <select
              :name="key"
              v-else-if="val.input=='select'&&key=='bank_name'"
              v-model="val.default"
            >
              <option
                v-for="item in banks"
                :value="item.id"
                :key="item.id"
              >
                {{item.bank_names}}
              </option>
            </select>
          </div>
          <div class="register_form captcha">
            <label for="">{{$t('register.Captcha')}}</label>
            <input
              type="text"
              v-model="verify_code"
            >
            <img
              :src="imageUrl"
              @click="getVerifyCode"
              alt=""
            >
          </div>
          <div class="register_form mobile_code">
            <label for="">{{$t('register.code')}}</label>
            <input
              type="text"
              name="mobile_code"
            >
            <el-button
              type="text"
              @click="getverify"
              :disabled="disabled"
            >{{name}}</el-button>
          </div>
          <div class="register_form">
            <label for="">{{$t('register.loginpass')}}</label>
            <input
              type="password"
              v-model="pass1"
              name="pass1"
            >
          </div>
          <div class="register_form">
            <label for="">{{$t('register.loginpass1')}}</label>
            <input
              type="password"
              v-model="pass1c"
              name="pass1c"
            >
          </div>
          <div class="register_form">
            <label for="">{{$t('register.paypass')}}</label>
            <input
              type="password"
              v-model="pass2"
              name="pass2"
            >
          </div>
          <div class="register_form">
            <label for="">{{$t('register.paypass1')}}</label>
            <input
              type="password"
              v-model="pass2c"
              name="pass2c"
            >
          </div>
          <button
            class="register_btn1"
            type="submit"
          >{{$t('register.register')}}</button>
          <el-row
            type="flex"
            justify="space-around"
            class="footer_links"
          >
            <el-col :span="12">
              <el-button type="text">
                <nuxt-link :to="$i18n.path('forget')">
                  {{$t('register.forget')}}
                </nuxt-link>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="text">
                <nuxt-link
                  :to="$i18n.path('login')"
                  class="link_blue"
                >
                  {{$t('register.login')}}
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
  data() {
    return {
      regdata: {},
      banks: [],
      isActive: true,
      pass1: '',
      pass1c: '',
      pass2: '',
      pass2c: '',
      mobile: '',
      imageUrl: '',
      encrypt_code: '',
      verify_code: '',
      name: this.$t('register.getcode'),
      disabled: false,
      statetype: 1,
      username: ''
    }
  },
  created() {
    console.log(this.$store.state.locale);
    this.getRegData(this.statetype);
    this.getBanks();
    this.getVerifyCode();
  },
  methods: {
    getVerifyCode() {
      axios.post('/api/login/getVerifyCode').then(res => {
        this.imageUrl = res.data.image;
        this.encrypt_code = res.data.encryptCode;
      }).catch(err => {
        console.log(err);
      })
    },
    getRegData(statetype) {
      axios.post('/api/webmember/register', {
        statetype: statetype
      }).then(res => {
        console.log(res);
        this.regdata = res.data.data.regdatasets;
        this.username = res.data.data.defaultname;
      }).catch(err => {
        console.log(err);
      })
    },
    handleSubmit(e) {
      e.preventDefault();
      var formdata = new FormData();
      console.log(e.target.length);
      for (let i = 0; i < e.target.length; i++) {
        formdata.append(e.target[i].name, e.target[i].value);
      }
      formdata.append('statetype', this.statetype);
      formdata.append('username', this.username);
      axios.post('/api/webmember/registersave',
        formdata
      ).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    handleActive() {
      this.isActive = true;
      this.statetype = 1;
      this.getRegData(1);
    },
    handleActive1() {
      this.isActive = false;
      this.statetype = 2;
      this.getRegData(2);
    },
    getBanks() {
      axios.post('/api/webmember/getbanks').then(res => {
        this.banks = res.data.data;
      }).catch(err => {
        console.log(err);
      })
    },
    getverify() {
      axios.post('/api/login/verify', {
        verify_code: this.verify_code,
        encrypt_code: this.encrypt_code,
        mobile_phone: this.mobile
      }).then(res => {
        if (res.data.status == 1) {
          this.$message({
            message: res.data.msg,
            type: 'success',
            showClose: true,
            onClose: this.onclose()
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'danger',
            showClose: true
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onclose() {
      let i = 60;
      let timer = setInterval(() => {
        i--;
        if (i > 0) {
          this.name = `${i}s`;
          this.disabled = true;
        } else {
          this.name = this.$t('register.retrieve');
          this.disabled = false;
          clearInterval(timer);
        }
      }, 1000);
    }
  },
}
</script>
<style>
.register {
  width: 100%;
  background: url(~assets/bg.png) no-repeat center center;
  background-size: cover;
}
.register_panel {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.register_panel_right {
  width: 470px;
  height: auto;
  /* float: right; */
  background: rgba(0, 0, 0, 0.4);
  margin-top: 60px;
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
.register_form {
  margin-top: 8px;
}
.register_form select,
.register_form input {
  width: 240px;
  height: 40px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  line-height: 40px;
  border-bottom: 1px solid #7986a3;
}
.mobile_code input,
.captcha input {
  width: 160px;
}
.captcha img {
  width: 80px;
  height: 40px;
  position: relative;
  top: 10px;
}
.mobile_code .el-button {
  width: 80px;
  height: 40px;
}
.register_form select:focus {
  outline: none;
}
.register_form select option {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: none;
  color: #333;
}
.register_form select option:hover {
  color: #fff;
}
.register_form label {
  color: #fff;
  font-size: 20px;
  width: 120px;
  text-align: right;
  display: inline-block;
}
.register_form input:focus {
  outline: none;
}
.register_btn1 {
  width: 370px;
  height: 45px;
  background: linear-gradient(to right, #5872e1, #7cbbf1);
  color: #fff;
  border: none;
  border-radius: 20px;
  margin: 20px 0 0px;
  cursor: pointer;
}
.register_btn1:focus {
  outline: none;
}
.footer_links {
  width: 370px;
  height: auto;
  text-align: center;
}
</style>
