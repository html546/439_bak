<template>
  <div>
    <div class="transfer_detail">
      <div class="form_box1">
        <el-form
          ref="form"
          label-width="120px"
        >
          <el-form-item :label="$t('transfer.balance')">
            <el-input
              v-model="form.money1"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('transfer.amount')">
            <el-input v-model="form.money"></el-input>
          </el-form-item>
          <el-form-item :label="$t('transfer.type')">
            <el-select
              v-model="form.type"
              :placeholder="$t('transfer.choose')"
              style="width:100%;"
              @change="handleChange"
            >
              <el-option
                v-for="(item,index) in transfers"
                :key="index"
                :value="index"
                :label="item.giveTo"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('transfer.number')"
            v-if="!form.isme"
          >
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item :label="$t('transfer.mini')">
            <el-input
              v-model="form.minmoney"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('transfer.max')">
            <el-input
              v-model="form.maxmoney"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('transfer.multiple')">
            <el-input
              v-model="form.multiple"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('transfer.rate')">
            <el-input
              v-model="form.rate"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('transfer.charge')">
            <el-input
              v-model="form.fee"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('transfer.pass2')"
            v-if="cashPass2 == 'true'"
          >
            <el-input
              v-model="form.pass2"
              type="password"
            ></el-input>
          </el-form-item>
          <template v-if="cashcheckmess == 'true'">
            <el-form-item :label="$t('transfer.tel')">
              <el-input v-model="mobile"></el-input>
            </el-form-item>
            <el-form-item :label="$t('transfer.Captcha')">
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
            <el-form-item :label="$t('transfer.code')">
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
          </template>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSubmit"
            >提交</el-button>
          </el-form-item>
        </el-form>
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
      form: {
        money1: '',
        money: '',
        type: '',
        minmoney: '',
        maxmoney: '',
        multiple: '',
        rate: '',
        fee: '',
        username: '',
        isme: true,
        pass2: '',
      },
      transfers: [],
      cashPass2: '',
      cashcheckmess: '',
      verify_code: '',
      imageUrl: '',
      mobile_code: '',
      disabled: false,
      name: this.$t('friend.getcode'),
      mobile: ''
    }
  },
  created() {
    this.getData();
    this.getVerifyCode();
  },
  methods: {
    getData() {
      axios.post('/api/finance/transfer', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        type: this.$route.params.id
      }).then(res => {
        console.log(res);
        this.form.money1 = res.data.data.money;
        this.transfers = res.data.data.transfers;
        this.cashPass2 = res.data.data.cashPass2;
        this.cashcheckmess = res.data.data.cashcheckmess;
      }).catch(err => {
        console.log(err);
      })
    },
    handleChange(val) {
      this.transfers.forEach((item, index) => {
        if (index == val) {
          this.form.minmoney = item.minmoney;
          this.form.maxmoney = item.maxmoney;
          this.form.multiple = item.multiple;
          this.form.rate = item.exchange_rate;
          this.form.fee = item.servicecharge;
          if (item.isme == '0') {
            this.form.isme = false;
          }
        }
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
    handleSubmit(event) {
      event.preventDefault();
      axios.post('/api/finance/transfers', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        banktype: this.$route.params.id,
        username: this.form.username,
        money: this.form.money,
        givekey: this.form.type,
        transferPass2: this.form.pass2,
        mobile_code: this.mobile_code,
        mobile_phone: this.mobile
      }).then(res => {
        console.log(res);
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
  },
}
</script>

<style >
.transfer_detail {
  width: 1200px;
  margin: 50px auto;
}
.form_box1 {
  width: 600px;
  margin: 0 auto;
}
</style>