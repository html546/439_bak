<template>
  <div>
    <div class="manage">
      <div class="manage_box">
        <el-table
          :data="sales"
          style="width:100%;"
          :border="true"
          :stripe="true"
          v-loading="loading"
        >
          <el-table-column
            :label="$t('manage.number')"
            prop="username"
          ></el-table-column>
          <el-table-column
            :label="$t('manage.status')"
            prop="bd_state"
          ></el-table-column>
          <el-table-column
            :label="$t('manage.paydate')"
            prop="pay_date"
          >
            <template slot-scope="scope">
              <p>{{scope.row.pay_date | timefilter}}</p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('manage.amount')"
            prop="bd_money"
          ></el-table-column>
          <el-table-column
            :label="$t('manage.registerdate')"
            prop="reg_date"
          >
            <template slot-scope="scope">
              <p>{{scope.row.reg_date | timefilter}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="truename"
            :label="$t('manage.name')"
          ></el-table-column>
          <el-table-column
            prop="memberrank"
            :label="$t('manage.memberrank')"
          ></el-table-column>
          <el-table-column
            prop="teamrank"
            :label="$t('manage.teamrank')"
          ></el-table-column>
          <el-table-column
            prop="introduce"
            :label="$t('manage.introduce')"
          ></el-table-column>
          <el-table-column
            prop="district"
            :label="$t('manage.manager')"
          ></el-table-column>
          <el-table-column
            prop="wealth"
            :label="$t('manage.operate')"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleCheck(scope)"
              >{{$t('manage.check')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      sales: [],
      loading: true,
      total: 0,
      currentpage: 1,
      salesdetail: [],
      dialogTableVisible: false
    }
  },
  created() {
    let page = this.$store.state.manage;
    if (page > 1) {
      this.currentpage = Number(page);
      this.getList(page);
    } else {
      this.getList(1);
    }
  },
  methods: {
    getList(page) {
      axios.post('/api/member/mSonOrderList', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        page: page
      }).then(res => {
        console.log(res);
        this.loading = false
        this.sales = res.data.data.sales;
        this.total = res.data.data.total;
      }).catch(err => {
        console.log(err);
      })
    },
    handlePrev(val) {
      this.loading = true;
      this.getList(val);
      this.$store.state.commit('SET_MANAGE', val);
    },
    handleNext(val) {
      this.loading = true;
      this.getList(val);
      this.$store.state.commit('SET_MANAGE', val);
    },
    handleChange(val) {
      this.loading = true;
      this.getList(val);
      this.$store.state.commit('SET_MANAGE', val);
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
      return format1(val * 1000)
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
.manage {
  width: 1200px;
  margin: 50px auto;
}
.manage_box {
  width: 950px;
  margin: 0 auto;
}
</style>