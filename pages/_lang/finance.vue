<template>
  <div class="finance">
    <el-row :gutter="10">
      <template>
        <div v-for="(item,index) in wallet" :key="index">
          <el-col :span="12" style="margin-bottom:10px;">
            <el-card class="box-card" :class="getClass(index)">
              <div slot="header" class="clearfix">
                <span>{{item.wallet_name}}</span>
                <nuxt-link :to="$i18n.path(`pass/${index+1}`)">
                  <el-button type="text" style="float:right;padding:3px 0;">{{$t('finance.view')}}</el-button>
                </nuxt-link>
              </div>
              <div style="overflow:hidden;">
                <p style="float:left;">
                  余额：{{item.balance}}
                  <template v-if="index == 5">
                    <span>锁定中：{{item.lock_money}}</span>
                    <span>释放中：{{item.not_released}}</span>
                  </template>
                </p>
                <template v-if="index==3||index == 4">
                  <el-button type="text" style="padding:0;float:right;">
                    <nuxt-link :to="$i18n.path('activate')">{{$t('finance.recharge')}}</nuxt-link>
                  </el-button>
                  <el-button type="text" style="padding:0;float:right;margin-right:10px;">
                    <nuxt-link :to="$i18n.path(`coin/${index+1}`)">{{$t('finance.coin')}}</nuxt-link>
                  </el-button>
                  <el-button type="text" style="padding:0;float:right;">
                    <nuxt-link
                      :to="$i18n.path(`recharge_coin/${index+1}`)"
                    >{{$t('finance.recharge_coin')}}</nuxt-link>
                  </el-button>
                </template>
                <template v-if="index == 1||index ==2">
                  <el-button type="text" style="padding:0;float:right;margin-left:10px;">
                    <nuxt-link :to="$i18n.path(`exchange/${index+1}`)">{{$t('finance.exchange')}}</nuxt-link>
                  </el-button>
                </template>
                <el-button type="text" style="float:right;padding:0" v-if="item.iszhuanzhang == 1">
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
      } else if (index === 3) {
        return "box-card4";
      } else if (index === 4) {
        return "box-card5";
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
.box-card4,
.box-card5 {
  color: #fff;
}
.box-card1 .el-button,
.box-card2 .el-button,
.box-card3 .el-button,
.box-card4 .el-button,
.box-card5 .el-button {
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
.box-card5 {
  background: url("../../assets/finance5.png") no-repeat center center;
  background-size: cover;
}
</style>
