<template>
  <div>
    <div class="form_box1">
      <div class="activate1">
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
      balance: '',
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
      console.log(this.$route.params.id);
      axios.post('/api/member/tmeconfirm', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        saleid: this.$route.params.id
      }).then(res => {
        if (res.data.status == 0) {
          this.$store.commit('clearMessage');
          this.$router.replace('/login');
        }
        console.log(res);
        this.balance1 = res.data.data.financeinfo[0].money;
        this.balance2 = res.data.data.financeinfo[1].money;
        this.balance3 = res.data.data.financeinfo[2].money;
        this.price = res.data.data.price;
        this.memberInfo = res.data.data.memberInfo;
        this.reg_level_money = this.memberInfo.reg_level_money;
        this.lv3money = (this.reg_level_money * 0.9).toFixed(2);
      }).catch(err => {
        console.log(err);
      })
    },
    handleChange(val) {
      console.log(this.mode);
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
        lv3money: this.lv3money,
        ist: 2,
        saleid: this.$route.params.id
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
.form_box1 {
  width: 1200px;
  margin: 50px auto;
}
.activate1 {
  width: 800px;
  margin: 0 auto;
}
</style>