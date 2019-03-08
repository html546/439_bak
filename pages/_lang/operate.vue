<template>
  <div>
    <div class="operate">
      <div class="operate_box">
        <el-table
          :data="tableData"
          :border="true"
          :stripe="true"
          v-loading="loading"
        >
          <el-table-column
            prop="buy_date"
            :label="$t('operate.buydate')"
          >
            <template slot-scope="scope">
              <p>{{scope.row.buy_date | timefilter}}</p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('operate.paydate')"
            prop="pay_date"
          >
            <template slot-scope="scope">
              <p>{{scope.row.pay_date|timefilter}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="bd_money"
            :label="$t('operate.amount')"
          ></el-table-column>
          <el-table-column
            prop="bd_type"
            :label="$t('operate.type')"
          ></el-table-column>
          <el-table-column
            prop="bd_state"
            :label="$t('operate.status')"
          ></el-table-column>
          <el-table-column
            prop="wealth"
            :label="$t('operate.operate')"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleCheck(scope)"
              >{{$t('operate.check')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev,pager,next"
          :total="total"
          style="text-align:center;margin-top:20px;"
          :background="true"
          :current-page.sync="currentpage"
          @prev-click="handlePrev"
          @next-click="handleNext"
          @current-change="handleChange"
        ></el-pagination>
        <el-dialog
          :title="$t('manage.detail')"
          :visible.sync="dialogTableVisible"
          @closed="handleClose"
        >
          <el-table :data="salesdetail">
            <el-table-column
              prop="username"
              :label="$t('manage.number')"
            ></el-table-column>
            <el-table-column
              prop="buy_date"
              :label="$t('manage.buydate')"
            >
              <template slot-scope="scope">
                <p>{{scope.row.buy_date | timefilter}}</p>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('manage.arritedate')"
              prop="pay_date"
            >
              <template slot-scope="scope">
                <p>{{scope.row.pay_date | timefilter}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="bd_type"
              :label="$t('manage.type')"
            ></el-table-column>
            <el-table-column
              prop="bd_state"
              :label="$t('manage.status')"
            ></el-table-column>
            <el-table-column
              prop="bd_money"
              :label="$t('manage.amount')"
            ></el-table-column>
          </el-table>
        </el-dialog>
      </div>
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
      salesdetail: [],
      dialogTableVisible: false,
      total: 0,
      currentpage: 1,
      loading: true
    }
  },
  created() {
    let page = this.$store.state.operate;
    if (page > 1) {
      this.currentpage = Number(page);
      this.getData(page);
    } else {
      this.getData(1);
    }
  },
  methods: {
    getData(page) {
      axios.post('/api/member/mActionList', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        page: page
      }).then(res => {
        console.log(res);
        this.loading = false;
        this.tableData = res.data.data.sales;
      }).catch(err => {
        console.log(err);
      })
    },
    handlePrev(val) {
      this.loading = true;
      this.getData(val);
      this.$store.state.commit('SET_OPERATE', val);
    },
    handleNext(val) {
      this.loading = true;
      this.getData(val);
      this.$store.state.commit('SET_OPERATE', val);
    },
    handleChange(val) {
      this.loading = true;
      this.getData(val);
      this.$store.state.commit('SET_OPERATE', val);
    },
    handleCheck(scope) {
      axios.post('/api/member/saleView', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: scope.row.id
      }).then(res => {
        this.dialogTableVisible = true;
        this.salesdetail.push(res.data.data.sale);
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    handleClose() {
      this.salesdetail = [];
    }
  },
  filters: {
    timefilter(val) {
      return format1(val * 1000);
    }
  }
}
function add0(m) { return m < 10 ? '0' + m : m }
function format1(shijianchuo) {
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return y + '-' + add0(m) + '-' + add0(d);
}
</script>

<style>
.operate {
  width: 1200px;
  margin: 50px auto;
}
.operate_box {
  width: 800px;
  margin: 0 auto;
}
</style>