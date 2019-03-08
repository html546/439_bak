<template>
  <div>
    <div class="ad"></div>
    <div class="friend">
      <el-card class="box-card">
        <div slot="header">
          <p style="text-align:left;">{{$t('friend.register')}}</p>
        </div>
        <div style="overflow:hidden;">
          <el-form
            ref="form"
            label-width="140px"
            style="width:560px;float:left;"
            @submit.native="handleSubmit"
          >
            <div
              class="button_group"
              style="margin:20px auto;"
            >
              <el-row>
                <el-col
                  :span="12"
                  style="text-align:center;"
                >
                  <el-button
                    type="primary"
                    :disabled="!isActive"
                    @click="handleActive"
                  >{{$t('friend.mobile')}}</el-button>
                </el-col>
                <el-col
                  :span="12"
                  style="text-align:center;"
                >
                  <el-button
                    type="primary"
                    :disabled="isActive"
                    @click="handleActive1"
                  >{{$t('friend.email')}}</el-button>
                </el-col>
              </el-row>
            </div>
            <el-form-item :label="$t('friend.member')">
              <el-input
                name="username"
                v-model="username"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-for="(val,key) in formContent"
              :key="key"
              :label="val.name"
              v-show="val.input!=='hidden'"
            >
              <el-input
                v-model="val.default"
                :name="key"
                v-if="val.input=='text'&&key!=='mobile_phone'"
              ></el-input>
              <el-input
                type="text"
                :key="key"
                v-if="val.input=='text'&&key=='mobile_phone'"
                name="mobile_phone"
                v-model="mobile"
              ></el-input>
              <el-select
                :name="key"
                v-else-if="val.input=='select'&&key=='sex'"
                v-model="sex"
                style="width:100%;"
              >
                <el-option
                  v-for="(val1,key1) in val.select"
                  :key="key1"
                  :label="val1"
                  :value="key1"
                >
                </el-option>
              </el-select>
              <el-select
                :name="key"
                v-else-if="val.input=='select'&&key=='memberrank'"
                v-model="memberrank"
                style="width:100%;"
              >
                <el-option
                  v-for="(val1,key1) in val.select"
                  :key="key1"
                  :label="val1"
                  :value="key1"
                >
                </el-option>
              </el-select>
              <el-select
                :name="key"
                v-else-if="val.input=='select'&&key=='bank_name'"
                v-model="bank_name"
                style="width:100%;"
              >
                <el-option
                  v-for="(item,index) in bank_names"
                  :key="index"
                  :label="item.bank_names"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('friend.Captcha')">
              <el-input
                type="text"
                v-model="verify_code"
                style="width:70%;float:left;"
              ></el-input>
              <img
                :src="imageUrl"
                @click="getVerifyCode"
                style="width:30%;height:40px;"
                alt=""
              >
            </el-form-item>
            <el-form-item :label="$t('friend.code')">
              <el-input
                type="text"
                v-model="mobile_code"
                name="mobile_code"
                style="width:70%;float:left;"
              >
              </el-input>
              <el-button
                type="text"
                @click="getverify"
                :disabled="disabled"
                style="width:30%;height:40px;"
              >{{name}}</el-button>
            </el-form-item>
            <el-form-item :label="$t('friend.pass1')">
              <el-input
                name="pass1"
                v-model="pass1"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('friend.pass1c')">
              <el-input
                name="pass1c"
                v-model="pass1c"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('friend.pass2')">
              <el-input
                name="pass2"
                v-model="pass2"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('friend.pass2c')">
              <el-input
                name="pass2c"
                v-model="pass2c"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                native-type="submit"
              >{{$t('friend.submit')}}</el-button>
            </el-form-item>
          </el-form>
          <div class="qrcode_box">
            <div
              class="qrcode"
              id="qrcode"
            >
            </div>
            <a :href="qrcode">{{qrcode}}</a>
            <p>{{$t('friend.follow')}}</p>
          </div>
        </div>
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
      formContent: '',
      bank_names: '',
      pass1: '',
      pass1c: '',
      pass2: '',
      pass2c: '',
      province: '',
      city: '',
      area: '',
      provinces: [],
      citys: [],
      areas: [],
      bank_name: '',
      sex: '',
      memberrank: '',
      username: '',
      mobile: '',
      imageUrl: '',
      encrypt_code: '',
      verify_code: '',
      disabled: false,
      name: this.$t('friend.getcode'),
      mobile_code: '',
      statetype: 1,
      isActive: true,
      qrcode: '',
    }
  },
  created() {
    this.getPage(this.statetype);
    this.getBanks();
    this.getVerifyCode();
    this.getQRCode();
  },
  mounted() {
  },
  methods: {
    getQRCode() {
      axios.post('/api/member/qrCode', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        console.log(res, 666666);
        this.qrcode = res.data.data;
        if (!document.getElementById('qrcode').innerHTML) {
          var qrcode = new QRCode('qrcode', {
            text: res.data.data,
            width: 180,
            height: 180,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          })
        } else {
          return false;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getVerifyCode() {
      axios.post('/api/login/getVerifyCode').then(res => {
        this.imageUrl = res.data.image;
        this.encrypt_code = res.data.encryptCode;
      }).catch(err => {
        console.log(err);
      })
    },
    getPage(statetype) {
      axios.post('/api/member/register', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        statetype: statetype
      }).then(res => {
        console.log(res);
        this.username = res.data.data.defaultname;
        this.formContent = res.data.data.regdatasets;
        for (const key in this.formContent) {
          if (key == 'sex' && this.formContent[key].default !== '') {
            this.sex = this.formContent[key].default;
          } else if (key == 'memberrank' && this.formContent[key].default !== '') {
            this.memberrank = this.formContent[key].default;
          } else if (key == 'bank_name' && this.formContent[key].default !== '') {
            this.bank_name = this.formContent[key].dafault;
          }
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getBanks() {
      axios.post('/api/member/getbanks', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        this.bank_names = res.data.data;
      }).catch(err => {
        console.log(err);;
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
    },
    handleSubmit(e) {
      e.preventDefault();
      var formdata = new FormData();
      console.log(e.target.length);
      for (let i = 0; i < e.target.length; i++) {
        formdata.append(e.target[i].name, e.target[i].value);
      }
      formdata.append('userid', this.$store.state.message.userid);
      formdata.append('sessionid', this.$store.state.message.sessionid);
      axios.post('/api/member/registersave',
        formdata
      ).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$message({
            type: 'success',
            message: res.data.msg,
            showClose: true,
            onClose: this.onclose1()
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
    },
    onclose1() {
      this.getPage(this.statetype);
    },
    handleActive() {
      this.isActive = false;
      this.statetype = 1;
      this.getPage(1);
    },
    handleActive1() {
      this.isActive = true;
      this.statetype = 2;
      this.getPage(2);
    },
  },
}


</script>

<style >
.ad {
  width: 100%;
  background: url("~assets/ad.png") no-repeat center center;
  background-size: cover;
  height: 180px;
}
.friend {
  width: 1200px;
  margin: 55px auto 100px;
}
.qrcode_box {
  width: 240px;
  height: 240px;
  float: left;
  margin-top: 160px;
  margin-left: 160px;
}
.qrcode {
  background: url("~assets/qrcode.png") no-repeat center center;
  background-size: cover;
  width: 222px;
  height: 222px;
  padding: 1px;
}
.qrcode img {
  margin: 20px 0 0 20px;
}
.qrcode_box p {
  text-align: center;
  margin-top: 30px;
  font-size: 18px;
  color: #285ea4;
}
.qrcode_box a {
  display: block;
  color: #285ea4;
}
</style>