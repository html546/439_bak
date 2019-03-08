<template>
  <div>
    <div class="hang_out">
      <el-card class="box-card">
        <div slot="header">
          <p style="text-align:left;">{{$t('trade3.hangout')}}</p>
        </div>
        <div>
          <el-form
            label-width="140px"
            ref="form"
            :model="form"
            style="width:660px;margin:0 auto;"
          >
            <el-form-item :label="$t('trade3.fee')">
              <el-input
                v-model="form.fee"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('trade3.mode')">
              <el-select
                v-model="form.tradetype"
                :placeholder="$t('trade3.hangout_mode')"
                style="width:100%;"
              >
                <el-option
                  :label="$t('trade3.sale')"
                  value="1"
                ></el-option>
                <el-option
                  :label="$t('trade3.bill')"
                  value="2"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('trade3.pay')">
              <el-select
                v-model="form.paytype"
                :placeholder="$t('trade3.pay_mode')"
                style="width:100%;"
              >
                <el-option
                  :label="$t('trade3.alipay')"
                  value="1"
                ></el-option>
                <el-option
                  :label="$t('trade3.wechat')"
                  value="2"
                ></el-option>
                <el-option
                  :label="$t('trade3.bank')"
                  value="3"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('trade3.price')">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item :label="$t('trade3.num')">
              <el-input v-model="form.num"></el-input>
            </el-form-item>
            <el-form-item :label="$t('trade3.pass2')">
              <el-input
                v-model="form.pass2"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleHangOut"
              >{{$t('trade3.submit')}}</el-button>
            </el-form-item>
          </el-form>
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
      form: {
        fee: '',
        tradetype: '',
        paytype: '',
        price: '',
        num: '',
        pass2: '',
      },
    }
  },
  created() {
    this.getFee();
  },
  methods: {
    getFee() {
      axios.post('/api/trade/getFee', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        this.form.fee = res.data.data.tax;
      }).catch(err => {
        console.log(err);
      })
    },
    handleHangOut() {
      axios.post('/api/trade/start', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        tradetype: this.form.tradetype,
        paytype: this.form.paytype,
        price: this.form.price,
        num: this.form.num,
        pass2: this.form.pass2
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
            type: 'error',
            showClose: true
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onclose() {
      this.form.tradetype = '';
      this.form.paytype = '';
      this.form.price = '';
      this.form.num = '';
      this.form.pass2 = '';
    },
  },
}
</script>

<style>
.hang_out {
  width: 1200px;
  margin: 50px auto 120px;
}
</style>