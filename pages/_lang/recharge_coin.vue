<template>
  <div>
    <el-card class="message-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{$t('recharge_coin.recharge')}}</span>
      </div>
      <div class="box">
        <el-row>
          <el-col
            :span="8"
            :offset="8"
          >
            <qrcode-vue
              :value="value"
              :size="size"
              level="H"
            ></qrcode-vue>
          </el-col>
          <p
            style="text-align:center;"
            ref="usdt"
          >{{value}}</p>
          <el-button
            type="primary"
            class="copy"
            @click="copy"
          >{{$t('recharge_coin.copy')}}</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      value: this.$store.state.message.usdt,
      size: 300
    }
  },
  created() {
  },
  methods: {
    copy() {
      console.log(this.$refs.usdt.innerText);
      let usdt = this.$refs.usdt.innerText;
      let oInput = document.createElement('input');
      oInput.value = usdt;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      oInput.className = "oInput";
      oInput.style.display = 'none';
      this.$message({
        type: 'success',
        message: this.$t('recharge_coin.success'),
        showClose: true
      })
    }
  },
}
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
.copy {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 10px;
}
</style>

