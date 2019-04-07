<template>
  <div class="finance">
    <el-row :gutter="10">
      <template>
        <div
          v-for="(item,index) in wallet"
          :key="index"
        >
          <el-col :span="8">
            <el-card
              class="box-card"
              :class="getClass(index)"
            >
              <div
                slot="header"
                class="clearfix"
              >
                <span>{{item.wallet_name}}</span>
                <el-button
                  type="text"
                  style="float:right;padding:3px 0;"
                  @click="dialogShow(index+1)"
                >{{$t('finance.jump')}}</el-button>
              </div>
              <div>{{item.balance}}</div>
            </el-card>
          </el-col>
        </div>
      </template>
    </el-row>
    <el-dialog
      :title="$t('finance.skip')"
      :visible.sync="centerDialogVisible"
    >
      <nuxt-link :to="link">
        <el-button type="primary">{{$t('finance.view')}}</el-button>
      </nuxt-link>
      <el-button
        type="danger"
        v-if="transfer"
      >
        <nuxt-link :to="link1">
          {{$t('finance.transfer')}}
        </nuxt-link>
      </el-button>
      <el-button
        type="success"
        v-if="recharge"
      >
        <nuxt-link :to="$i18n.path('activate')">
          {{$t('finance.recharge')}}
        </nuxt-link>
      </el-button>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible= false">{{$t('finance.cancel')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      centerDialogVisible: false,
      transfer: false,
      recharge: false,
      link: '',
      link1: '',
      wallet: []
    }
  },
  middleware: "auth",
  created() {
    this.getWallet();
  },
  methods: {
    getWallet() {
      axios.post('/api/finance/getUserWallet', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        console.log(res);
        this.wallet = res.data.data;
      }).catch(err => {
        console.log(err);
      })
    },
    getClass(index) {
      if (index === 0) {
        return 'box-card1';
      } else if (index === 1) {
        return 'box-card2';
      } else {
        return 'box-card3';
      }
    },
    dialogShow(type) {
      this.centerDialogVisible = true;
      this.link = this.$i18n.path(`pass/${type}`);
      if (type == 1) {
        this.recharge = true;
        this.transfer = false;
      } else if (type == 3) {
        this.transfer = true;
        this.recharge = false;
        this.link1 = this.$i18n.path(`transfer/${type}`);
      } else {
        this.recharge = false;
        this.transfer = false;
      }
    }
  },
}
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
.box-card {
  color: #fff;
}
.box-card1 .el-button,
.box-card2 .el-button,
.box-card3 .el-button {
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
</style>