<template>
  <div class="update">
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item :label="$t('upgrade.rank')">
          <el-input v-model="nowrank" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('upgrade.newrank')" prop="newrank">
          <el-select v-model="form.newrank" :placeholder="$t('upgrade.choose')" style="width:100%;">
            <el-option
              v-for="(item,index) in rankinfos"
              :key="index"
              :label="item.name"
              :value="item.num"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('upgrade.mode')" prop="regtype">
          <el-select v-model="form.regtype" @change="handleChange" style="width:100%;">
            <el-option :label="$t('upgrade.full')" :value="1"></el-option>
            <el-option :label="$t('upgrade.combine')" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('upgrade.balance1_1')">
          <el-input v-model="form.lv1money" readonly></el-input>
        </el-form-item>
        <el-form-item v-if="combine" :label="$t('upgrade.balance3_1')" prop="lv3money">
          <el-input v-model="form.lv3money" @input.native="handleMoneyChange"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">{{$t('upgrade.submit')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      form: {
        newrank: "",
        regtype: "",
        lv1money: "",
        lv3money: "",
        price: ""
      },
      nowrank: "",
      rankinfos: [],
      combine: false,
      upmoney: "",
      jihuobili: "",
      zhucebili: ""
    };
  },
  created() {
    this.getUpdate();
  },
  watch: {
    "form.lv3money": {
      handler: function(val) {
        this.form.lv1money = (
          ((((this.upmoney - val) * this.jihuobili) / 100) * 7) /
          this.form.price
        ).toFixed(2);
      }
    }
  },
  methods: {
    onclose1() {
      setTimeout(() => {
        this.$router.replace("/login");
      }, 3000);
    },
    getUpdate() {
      axios
        .post("/api/member/memberUp", {
          userid: this.$store.state.message.userid,
          sessionid: this.$store.state.message.sessionid
        })
        .then(res => {
          if (res.data.status == 0) {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
          console.log(res);
          this.nowrank = res.data.data.nowrank.name;
          this.rankinfos = Object.values(res.data.data.rankinfos);
          this.upmoney = res.data.data.upmoney;
          this.form.price = res.data.data.price;
          this.jihuobili = res.data.data.jihuobili;
          this.zhucebili = res.data.data.zhucebili;
          this.form.lv1money = ((this.upmoney * 7) / this.form.price).toFixed(
            2
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChange(val) {
      if (val == 1) {
        this.combine = false;
        this.form.lv1money = ((this.upmoney * 7) / this.form.price).toFixed(2);
      } else {
        this.combine = true;
        this.form.lv3money = (this.upmoney * this.zhucebili) / 100;
        this.form.lv1money = (
          (((this.upmoney * this.jihuobili) / 100) * 7) /
          this.form.price
        ).toFixed(2);
      }
    },
    handleMoneyChange(e) {
      let halfMoney = (this.upmoney * this.zhucebili) / 100;
      if (e.target.value > halfMoney) {
        this.form.lv3money = halfMoney;
      }
    },
    handleSubmit() {
      axios
        .post("/api/member/memberUpSave", {
          userid: this.$store.state.message.userid,
          sessionid: this.$store.state.message.sessionid,
          ...this.form
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 1) {
            this.$message({
              type: "success",
              message: res.data.msg,
              showClose: true,
              onClose: this.onclose()
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
              showClose: true,
              onClose: this.onclose()
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onclose() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style>
.update {
  width: 1200px;
  margin: 50px auto;
}
.form-box {
  width: 600px;
  margin: 0 auto;
}
</style>