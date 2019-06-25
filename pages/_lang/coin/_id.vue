<template>
  <div>
    <el-card class="message-card">
      <div slot="header" class="clearfix">
        <span>{{$t('coin.coin')}}</span>
      </div>
      <div class="box">
        <el-row :gutter="150">
          <el-col :span="12">
            <el-form label-width="100px">
              <el-form-item :label="$t('coin.type')">
                <el-select
                  :placeholder="$t('coin.select_type')"
                  style="width:100%;"
                  v-model="coin_type"
                  @change="handleChange"
                >
                  <el-option
                    v-for="(val,key) in typename"
                    :key="key"
                    :value="key"
                    :label="val"
                  >{{val}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('coin.money')" style="margin-bottom:0;" required>
                <el-input v-model="money" :placeholder="$t('coin.coin_money')"></el-input>
                <p class="coin_balance">*{{$t('coin.balance')}}:{{coin_balance}}</p>
              </el-form-item>
              <el-form-item :label="$t('coin.real_money')">
                <el-input v-model="real_money" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item :label="$t('coin.address')" v-if="coin_type == 1" required>
                <el-input v-model="address" :placeholder="$t('coin.coin_address')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('coin.number')" v-else-if="coin_type==2" required>
                <el-input v-model="username" :placeholder="$t('coin.coin_number')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('coin.fee')">
                <el-input v-model="fee" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item :label="$t('coin.pass2')" v-if="cashPass2 == 'true'">
                <el-input v-model="pass2" show-password></el-input>
              </el-form-item>
              <el-button type="primary" class="coin_btn" @click="handleSubmit">{{$t('coin.submit')}}</el-button>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div class="coin_tips">
              <h5 class="title">{{$t('coin.tips')}}：</h5>
              <p>{{$t('coin.tips_content')}}</p>
            </div>
          </el-col>
        </el-row>
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
      money: "",
      address: "",
      fee: "",
      typename: "",
      coin_type: "",
      coin_balance: "",
      transfers: [],
      username: "",
      fee1: "",
      pass2: "",
      cashPass2: "",
      keys: ""
    };
  },
  middleware: "auth",
  created() {
    this.getPage();
  },
  computed: {
    real_money() {
      if (!this.money || this.money - this.fee < 0) {
        return 0;
      }
      return this.money - this.fee;
    },
    istype() {
      if (this.$route.params.id == 4) {
        return 2;
      } else if (this.$route.params.id == 5) {
        return 3;
      }
    }
  },
  watch: {
    money(val) {
      let pattern = /^[0-9]*$/g;
      if (val.search(pattern) == -1) {
        this.money = "";
      }
    }
  },
  methods: {
    onclose1() {
      setTimeout(() => {
        this.$router.replace("/login");
      }, 3000);
    },
    getPage() {
      axios
        .post("/api/finance/getFee", {
          userid: this.$store.state.message.userid,
          sessionid: this.$store.state.message.sessionid,
          type: this.$route.params.id
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
          this.typename = res.data.data.typename;
          this.coin_balance = res.data.data.money;
          this.fee1 = res.data.data.fee;
          this.transfers = res.data.data.transfers;
          this.cashPass2 = res.data.data.cashPass2;
          this.keys = res.data.data.keys;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChange(e) {
      console.log(e);
      if (e == 1) {
        this.fee = this.fee1;
        return false;
      } else if (e == 2) {
        this.fee = this.transfers.servicecharge;
      }
    },
    onclose() {
      this.coin_type = "";
      this.money = "";
      this.address = "";
      this.username = "";
      this.getPage();
    },
    handleSubmit() {
      if (this.coin_type == 1) {
        axios
          .post("/api/finance/withdrawsave", {
            userid: this.$store.state.message.userid,
            sessionid: this.$store.state.message.sessionid,
            type: 4,
            tixian_money: this.money,
            istype: this.istype,
            okex_user_wallet_addr: this.address,
            transferPass2: this.pass2
          })
          .then(res => {
            console.log(res);
            if (res.data.status == 1) {
              this.$message({
                type: "success",
                showClose: true,
                message: res.data.msg,
                onClose: this.onclose()
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.coin_type == 2) {
        axios
          .post("/api/finance/transfers", {
            userid: this.$store.state.message.userid,
            sessionid: this.$store.state.message.sessionid,
            banktype: 4,
            username: this.username,
            money: this.money,
            givekey: this.keys,
            istype: this.istype,
            transferPass2: this.pass2
          })
          .then(res => {
            console.log(res);
            if (res.data.status == 1) {
              this.$message({
                type: "success",
                showClose: true,
                message: res.data.msg,
                onClose: this.onclose()
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style>
.message-card {
  width: 1200px;
  margin: 30px auto;
}
.message-card .box {
  width: 900px;
  margin: 0 auto;
}
.coin_btn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.coin_tips {
  margin-top: 30px;
}
.coin_tips .title {
  font-size: 16px;
  line-height: 40px;
}
.coin_tips p {
  line-height: 40px;
}
.coin_balance {
  float: right;
  line-height: 22px;
  color: #949eff;
}
</style>