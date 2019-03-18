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
              @change="handleSelectChange"
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
          <!-- <template v-if="!combine">
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
          </template> -->
          <el-form-item :label="$t('reinvestment.balance1')">
            <el-input
              v-model="balance1"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('reinvestment.balance2')">
            <el-input
              v-model="balance2"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('reinvestment.balance3')">
            <el-input
              v-model="balance3"
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
          <template v-if="mode2">
            <el-form-item :label="$t('reinvestment.balance1_1')">
              <el-input v-model="lv1money"></el-input>
            </el-form-item>
            <el-form-item :label="$t('reinvestment.balance2_1')">
              <el-input v-model="lv2money"></el-input>
            </el-form-item>
            <el-form-item :label="$t('reinvestment.balance3_1')">
              <el-input v-model="lv3money"></el-input>
            </el-form-item>
          </template>
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
      // finance: '',
      // balance: '',
      balance1: '',
      balance2: '',
      balance3: '',
      lv1money: '',
      lv2money: '',
      lv3money: '',
      mode2: false,
    }
  },
  middleware: "auth",
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
        // this.finance = res.data.data.finance;
        this.balance1 = res.data.data.finance[0].money;
        this.balance2 = res.data.data.finance[1].money;
        this.balance3 = res.data.data.finance[2].money;
      }).catch(err => {
        console.log(err);
      })
    },
    /*  handleChange(val) {
       this.finance.forEach((item, index) => {
         if (index == val) {
           this.balance = item.money;
         }
       })
     }, */
    handleSelectChange(e) {
      console.log(e);
      if (e == 2) {
        this.mode2 = true;
      } else {
        this.mode2 = false;
      }
    },
    handleSubmit() {
      axios.post('/api/member/salesave', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        regtype: this.mode,
        bd_money: this.bd_money,
        lv1money: this.lv1money,
        lv2money: this.lv2money,
        lv3money: this.lv3money,
        price: this.price
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
      this.lv1money = '';
      this.lv2money = '';
      this.lv3money = '';
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