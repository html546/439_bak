<template>
  <div>
    <div class="activate">
      <div class="form_box">
        <el-form label-width="140">
          <el-form-item :label="$t('activate.balance')">
            <el-input
              v-model="balance1"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <template v-if="combine">
            <el-form-item :label="$t('activate.balance2')">
              <el-input
                v-model="balance2"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('activate.balance3')">
              <el-input
                v-model="balance3"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </template>
          <el-form-item :label="$t('activate.price')">
            <el-input
              v-model="price"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <p>{{$t('activate.need')}}{{level}}({{$t('activate.parameter')}}),{{$t('activate.adequate')}}.</p>
          <el-form-item :label="$t('activate.mode_select')">
            <el-select
              v-model="mode"
              style="width:100%;"
              @change="handleChange"
              :placeholder="$t('activate.select')"
            >
              <el-option
                :label="$t('activate.register')"
                value="1"
              ></el-option>
              <el-option
                :label="$t('activate.combine')"
                value="2"
              ></el-option>
            </el-select>
          </el-form-item>
          <template v-if="combine">
            <el-form-item :label="$t('activate.balance1_1')">
              <el-input v-model="level"></el-input>
            </el-form-item>
            <el-form-item :label="$t('activate.balance3_1')">
              <el-input v-model="lv3money"></el-input>
            </el-form-item>
          </template>
          <el-button
            type="primary"
            @click="handleSubmit"
          >{{$t('activate.submit')}}</el-button>
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
      balance1: '',
      balance2: '',
      balance3: '',
      combine: false,
      lv1money: '',
      lv3money: '',
      price: '',
      level: '',
      mode: '',
      memberInfo: '',
      reg_level_money: ''
    }
  },
  middleware: "auth",
  created() {
    this.getPage();
  },
  watch: {
    lv3money(val) {
      if (val <= Number(this.reg_level_money)) {
        this.level = ((this.reg_level_money - val) * 7 / this.price).toFixed(2);
      } else {
        this.level = this.reg_level_money;
      }
    }
  },
  methods: {
    getPage() {
      axios.post('/api/member/meconfirm', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        console.log(res);
        this.balance1 = res.data.data.financeinfo[0].money;
        this.balance2 = res.data.data.financeinfo[1].money;
        this.balance3 = res.data.data.financeinfo[2].money;
        this.price = res.data.data.price;
        this.memberInfo = res.data.data.memberInfo;
        this.reg_level_money = this.memberInfo.reg_level_money;
      }).catch(err => {
        console.log(err);
      })
    },
    handleChange(val) {
      if (val == 1) {
        this.combine = false;
        this.level = this.memberInfo.jh1;
      } else if (val == 2) {
        this.combine = true;
        this.level = this.memberInfo.jh2;
      }
    },
    handleSubmit() {
      axios.post('/api/member/meconfirmSave', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        regtype: this.mode,
        price: this.price,
        lv1money: this.level,
        lv3money: this.lv3money
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$message({
            type: "success",
            message: res.data.msg,
            showClose: true,
            onClose: this.onclose()
          })
        } else {
          this.$message({
            type: "error",
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
      this.lv3money = '';
    }
  },
}
</script>

<style>
.activate {
  width: 1200px;
  margin: 50px auto;
}
.form_box {
  width: 600px;
  margin: 0 auto;
}
</style>