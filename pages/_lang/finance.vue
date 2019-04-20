<template>
  <div class="finance">
    <el-row :gutter="10">
      <template>
        <div v-for="(item,index) in wallet" :key="index">
          <el-col :span="6">
            <el-card class="box-card" :class="getClass(index)">
              <div slot="header" class="clearfix">
                <span>{{item.wallet_name}}</span>
                <nuxt-link :to="$i18n.path(`pass/${index+1}`)">
                  <el-button type="text" style="float:right;padding:3px 0;">{{$t('finance.view')}}</el-button>
                </nuxt-link>
              </div>
              <div style="overflow:hidden;">
                <p style="float:left;">{{item.balance}}</p>
                <template v-if="index==3">
                  <el-button type="text" style="padding:0;float:right;">
                    <nuxt-link :to="$i18n.path('activate')">{{$t('finance.recharge')}}</nuxt-link>
                  </el-button>
                  <el-button type="text" style="padding:0;float:right;margin-right:10px;">
                    <nuxt-link :to="$i18n.path('coin')">{{$t('finance.coin')}}</nuxt-link>
                  </el-button>
                  <el-button type="text" style="padding:0;float:right;">
                    <nuxt-link :to="$i18n.path('recharge_coin')">{{$t('finance.recharge_coin')}}</nuxt-link>
                  </el-button>
                </template>
                <el-button type="text" v-if="index==2" style="float:right;padding:0">
                  <nuxt-link :to="$i18n.path(`transfer/${index+1}`)">{{$t('finance.transfer')}}</nuxt-link>
                </el-button>
              </div>
            </el-card>
          </el-col>
        </div>
      </template>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      wallet: []
    };
  },
  middleware: "auth",
  created() {
    this.getWallet();
  },
  methods: {
    onclose1() {
      setTimeout(() => {
        this.$router.replace("/login");
      }, 3000);
    },
    getWallet() {
      axios
        .post("/api/finance/getUserWallet", {
          userid: this.$store.state.message.userid,
          sessionid: this.$store.state.message.sessionid
        })
        .then(res => {
          if (res.data.status == 0) {
            this.$store.commit("clearMessage");
            this.$message({
              type: "error",
              message: res.data.msg,
              onClose: this.onclose1()
            });
          }
          console.log(res);
          this.wallet = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getClass(index) {
      if (index === 0) {
        return "box-card1";
      } else if (index === 1) {
        return "box-card2";
      } else if (index === 2) {
        return "box-card3";
      } else {
        return "box-card4";
      }
    }
  }
};
</script>
<style>
.finance {
  width: 1200px;
  margin: 50px auto;
}
.finance_btn {
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.finance_btn .el-button {
  margin: 10px 0;
}
.box-card1,
.box-card2,
.box-card3,
.box-card4 {
  color: #fff;
}
.box-card1 .el-button,
.box-card2 .el-button,
.box-card3 .el-button,
.box-card4 .el-button {
  color: #fff;
}
.box-card1 {
  background: url("../../assets/finance1.png") no-repeat center center;
  background-size: cover;
}
.box-card2 {
  background: url("../../assets/finance2.png") no-repeat center center;
  background-size: cover;
}
.box-card3 {
  background: url("../../assets/finance3.png") no-repeat center center;
  background-size: cover;
}
.box-card4 {
  background: url("../../assets/finance4.png") no-repeat center center;
  background-size: cover;
}
</style>
