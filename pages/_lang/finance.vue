<template>
  <div class="finance">
    <div class="finance_btn">
      <el-button
        type="danger"
        @click="dialogShow(1)"
      >{{$t('finance.activate')}}</el-button>
      <el-button
        type="warning"
        @click="dialogShow(2)"
      >{{$t('finance.cash')}}</el-button>
      <el-button
        type="success"
        @click="dialogShow(3)"
      >{{$t('finance.register')}}</el-button>
    </div>
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
      link1: ''
    }
  },
  created() {
  },
  methods: {
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
</style>