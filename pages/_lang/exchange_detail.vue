<template>
  <div class="exchange_detail">
    <el-table
      :data="tableData"
      :stripe="true"
      :border="true"
      style="width:651px;"
      class="exchange_table"
      v-loading="loading"
    >
      <el-table-column prop="username" label="编号" width="100"></el-table-column>
      <el-table-column label="兑换etut数量" prop="bd_money" width="100"></el-table-column>
      <el-table-column label="兑换时间" width="150">
        <template slot-scope="scope">
          <p>{{timefilter(scope.row.pay_time)}}</p>
        </template>
      </el-table-column>
      <el-table-column label="兑换金额" prop="money" width="100"></el-table-column>
      <el-table-column label="etut价格" prop="etut_price" width="100"></el-table-column>
      <el-table-column label="计算公式" prop="formula" width="100"></el-table-column>
    </el-table>
    <el-pagination
      style="text-align:center;margin-top:20px;"
      background
      layout="prev,pager,next"
      :total="total"
      @prev-click="handlePrevClick"
      @current-change="handleChange"
      @next-click="handleNextClick"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      loading: true,
      total: 0
    };
  },
  created() {
    this.getList(1);
  },
  middleware: "auth",
  methods: {
    onclose() {
      setTimeout(() => {
        this.$router.replace("/login");
      }, 3000);
    },
    getList(page) {
      axios
        .post("/api/finance/exchangeList", {
          userid: this.$store.state.message.userid,
          sessionid: this.$store.state.message.sessionid,
          page: page
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 0) {
            this.$store.commit("clearMessage");
            this.$message({
              type: "error",
              message: res.data.msg,
              onClose: this.onclose()
            });
          } else {
            this.tableData = res.data.data.exchangeList;
            this.total = res.data.data.total;
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handlePrevClick(val) {
      this.loading = true;
      this.getList(val);
    },
    handleNextClick(val) {
      this.loading = true;
      this.getList(val);
    },
    handleChange(val) {
      this.loading = true;
      this.getList(val);
    },
    timefilter(val) {
      return this.$format2(val * 1000);
    }
  }
};
</script>

<style scoped>
.exchange_detail {
  width: 1200px;
  margin: 0 auto 50px;
}
.exchange_table {
  margin: 0 auto;
}
</style>