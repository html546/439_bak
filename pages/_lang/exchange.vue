<template>
  <div class="exchange">
    <el-card class="box-card form-box">
      <div slot="header" class="clearfix">
        <span>{{$t('exchange.exchange')}}</span>
        <el-button type="text" style="float:right;padding:3px 0;">
          <nuxt-link
            :to="$i18n.path('exchange_detail')"
            style="color:blue"
          >{{$t('exchange.detail')}}</nuxt-link>
        </el-button>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item :label="$t('exchange.cash')">
            <el-input :readonly="true" v-model="balance"></el-input>
          </el-form-item>
          <el-form-item :label="$t('exchange.price')">
            <el-input :readonly="true" v-model="price"></el-input>
          </el-form-item>
          <el-form-item :label="$t('exchange.num')" prop="money">
            <el-input v-model="form.money"></el-input>
          </el-form-item>
          <el-form-item :label="$t('exchange.afternum')">
            <el-input v-model="afterSum"></el-input>
          </el-form-item>
          <el-form-item :label="$t('exchange.formula')">
            <p>{{$t('exchange.formulaAll')}}</p>
          </el-form-item>
          <el-form-item :label="$t('exchange.pass2')" prop="checkpass">
            <el-input type="password" v-model="form.checkpass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">{{$t('exchange.submit')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      form: {
        money: "",
        checkpass: ""
      },
      balance: "",
      price: ""
    };
  },
  created() {
    this.getPrice();
  },
  computed: {
    afterSum() {
      return (this.form.money * 6.3) / this.price;
    }
  },
  methods: {
    onclose1() {
      setTimeout(() => {
        this.$router.replace("/login");
      }, 3000);
    },
    getPrice() {
      axios
        .post("/api/finance/etutprice", {
          userid: this.$store.state.message.userid,
          sessionid: this.$store.state.message.sessionid
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 0) {
            this.$store.commit("clearMessage");
            this.$message({
              type: "error",
              message: res.data.msg,
              onClose: this.onclose1()
            });
          }
          this.balance = res.data.data.money;
          this.price = res.data.data.price;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSubmit() {
      axios
        .post("/api/finance/exchangeSave", {
          userid: this.$store.state.message.userid,
          sessionid: this.$store.state.message.sessionid,
          ...this.form
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 0) {
            this.$message({
              type: "error",
              message: res.data.msg,
              onClose: this.onclose2()
            });
          } else {
            this.$message({
              type: "success",
              message: res.data.msg,
              onClose: this.onclose2()
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onclose2() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style scoped>
.exchange {
  width: 1200px;
  margin: 0px auto 50px;
}
.form-box {
  width: 600px;
  margin: 0 auto;
}
</style>