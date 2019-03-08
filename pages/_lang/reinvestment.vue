<template>
  <div>
    <div class="reinvestment">
      <div
        class="reinvestment_box"
        style="width:500px;margin:0 auto;"
      >
        <el-form
          label-width="160px"
          class="form_box"
        >
          <el-form-item :label="$t('reinvestment.mode')">
            <el-select
              v-model="mode"
              :placeholder="$t('reinvestment.select')"
              style="width:100%;"
            >
              <el-option
                value="1"
                :label="$t('reinvestment.register')"
              ></el-option>
              <el-option
                value="2"
                :label="$t('reinvestment.combine')"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('reinvestment.type')">
            <el-select
              style="width:100%;"
              value-key="money"
              @change="handleChange"
              v-model="balance1"
            >
              <el-option
                v-for="(item,index) in finance"
                :key="index"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('reinvestment.balance')">
            <el-input
              v-model="balance"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('reinvestment.price')">
            <el-input
              v-model="price"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('reinvestment.money')">
            <el-input
              v-model="bd_money"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="submit_btn"
            @click="handleSubmit"
          >{{$t('reinvestment.submit')}}</el-button>
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
      mode: '',
      bd_money: '',
      price: '',
      finance: '',
      balance: '',
      balance1: ''
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.post('/api/member/sale', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        console.log(res);
        this.bd_money = res.data.data.salenode.default;
        this.price = res.data.data.price;
        this.finance = res.data.data.finance;
      }).catch(err => {
        console.log(err);
      })
    },
    handleChange(val) {
      this.finance.forEach((item, index) => {
        if (index == val) {
          this.balance = item.money;
        }
      })
    },
    handleSubmit() {
      axios.post('/api/member/salesave', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        regtype: this.mode,
        bd_money: this.bd_money
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$message({
            type: 'success',
            message: res.data.msg,
            showClose: true,
            onClose: this.onclose()
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg,
            showClose: true,
            onClose: this.onclose()
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onclose() {
      // this.getData();
      this.mode = '';
      this.money = '';
      this.balance = '';
      this.balance1 = '';
    }
  },
}
</script>

<style>
.reinvestment {
  width: 1200px;
  margin: 50px auto;
}
.submit_btn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>