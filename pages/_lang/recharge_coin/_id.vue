<template>
  <div>
    <el-card class="message-card">
      <div slot="header" class="clearfix">
        <span>{{$t('recharge_coin.recharge')}}</span>
      </div>
      <div class="box">
        <el-row>
          <el-col :span="10" :offset="7" class="box_content">
            <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
            <p style="text-align:center;" ref="usdt">{{value}}</p>
            <el-button type="primary" class="copy" @click="copy">{{$t('recharge_coin.copy')}}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      size: 350
    };
  },
  created() {},
  computed: {
    value() {
      if (this.$route.params.id == 4) {
        return this.$store.state.message.usdt;
      } else {
        return this.$store.state.message.etut;
      }
    }
  },
  created() {},
  methods: {
    copy() {
      console.log(this.$refs.usdt.innerText);
      let usdt = this.$refs.usdt.innerText;
      let oInput = document.createElement("input");
      oInput.value = usdt;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message({
        type: "success",
        message: this.$t("recharge_coin.success"),
        showClose: true
      });
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
.box_content {
  text-align: center;
}
/* .copy {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 10px;
} */
</style>

