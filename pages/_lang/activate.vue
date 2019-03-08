<template>
  <div>
    <div class="activate">
      <div class="form_box">
        <el-form label-width="140">
          <el-form-item :label="$t('activate.balance')">
            <el-input
              v-model="balance"
              :readonly="true"
            ></el-input>
          </el-form-item>
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
      balance: '',
      price: '',
      level: '',
      mode: '',
      memberInfo: ''
    }
  },
  created() {
    this.getPage();
  },
  methods: {
    getPage() {
      axios.post('/api/member/meconfirm', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        console.log(res);
        this.balance = res.data.data.financeinfo[0].money;
        this.price = res.data.data.price;
        this.memberInfo = res.data.data.memberInfo;
      }).catch(err => {
        console.log(err);
      })
    },
    handleChange(val) {
      if (val == 1) {
        this.level = this.memberInfo.jh1;
      } else if (val == 2) {
        this.level = this.memberInfo.jh2;
      }
    },
    handleSubmit() {
      axios.post('/api/member/meconfirmSave', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        regtype: this.mode
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
      this.mode = '';
      this.level = '';
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