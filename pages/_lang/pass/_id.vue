<template>
  <div>
    <div class="wallet">
      <el-table
        :data="tableData"
        style="width:100%;"
        :border="true"
        :stripe="true"
        v-loading="loading"
      >
        <el-table-column
          prop="id"
          label="id"
        ></el-table-column>
        <el-table-column
          prop="time"
          :label="$t('finance_detail.time')"
        >
          <template slot-scope="scope">
            {{timefilter(scope.row.time)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          :label="$t('finance_detail.userid')"
        ></el-table-column>
        <el-table-column
          prop="type"
          :label="$t('finance_detail.type')"
        ></el-table-column>
        <el-table-column
          prop="money"
          :label="$t('finance_detail.money')"
        ></el-table-column>
        <el-table-column
          prop="balance"
          :label="$t('finance_detail.balance')"
        ></el-table-column>
        <el-table-column
          prop="mome"
          :label="$t('finance_detail.remarks')"
        ></el-table-column>
      </el-table>
      <el-pagination
        layout="prev,pager,next"
        :total="total"
        style="text-align:center;margin-top:20px;"
        @prev-click="handlePrevClick"
        @current-change="handleChange"
        @next-click="handleNextClick"
        background
        :current-page.sync="currentPage1"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: '',
  data() {
    return {
      tableData: [],
      loading: true,
      total: 0,
      currentPage1: 1
    }
  },
  middleware: 'auth',
  created() {
    let page = this.$store.state.finance;
    if (page > 1) {
      this.currentPage1 = Number(page);
      this.getPage(page);
    } else {
      this.getPage(1);
    }
  },
  methods: {
    getPage(page) {
      axios.post('/api/finance/info', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        type: this.$route.params.id,
        page: page
      }).then(res => {
        console.log(res);
        this.loading = false;
        this.tableData = res.data.data.finances;
        this.total = res.data.data.total;
      }).catch(err => {
        console.log(err);
      })
    },
    handlePrevClick(val) {
      this.loading = true;
      this.getPage(val);
      this.$store.commit('SET_FINANCE', val);
    },
    handleNextClick(val) {
      this.loading = true;
      this.getPage(val);
      this.$store.commit('SET_FINANCE', val);
    },
    handleChange(val) {
      this.loading = true;
      this.getPage(val);
      this.$store.commit('SET_FINANCE', val);
    },
    timefilter(val) {
      return this.$format1(val * 1000);
    }
  },
}
</script>

<style>
.wallet {
  width: 1200px;
  margin: 50px auto;
}
</style>