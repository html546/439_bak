<template>
  <div>
    <div class="trade1">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table
            :data="tableData"
            :border="true"
            v-loading="loading1"
            :element-loading-text="$t('trade1.loading')"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column
              :label="$t('trade1.time')"
              prop="time"
            >
              <template slot-scope="scope">
                <div>
                  {{scope.row.time |timefilter }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('trade1.number')"
              prop="username"
            ></el-table-column>
            <el-table-column
              :label="$t('trade1.num')"
              prop="num"
            ></el-table-column>
            <el-table-column
              :label="$t('trade1.oneprice')"
              prop="oneprice"
            ></el-table-column>
            <el-table-column
              :label="$t('trade1.trust')"
              prop="credit"
            ></el-table-column>
            <el-table-column
              :label="$t('trade1.operate')"
              prop="wealth"
            >
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleBuy(scope.row,1)"
                  >{{$t('trade1.purchase')}}</el-button>
                </div>
              </template>
            </el-table-column>
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
        </el-col>
        <el-col :span="12">
          <el-table
            :data="tableData1"
            :border="true"
            v-loading="loading2"
            :element-loading-text="$t('trade1.loading')"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column
              :label="$t('trade1.time')"
              prop="time"
            >
              <template slot-scope="scope">
                <div>
                  {{scope.row.time | timefilter}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('trade1.number')"
              prop="username"
            ></el-table-column>
            <el-table-column
              :label="$t('trade1.num')"
              prop="num"
            ></el-table-column>
            <el-table-column
              :label="$t('trade1.oneprice')"
              prop="oneprice"
            ></el-table-column>
            <el-table-column
              :label="$t('trade1.trust')"
              prop="credit"
            ></el-table-column>
            <el-table-column
              :label="$t('trade1.operate')"
              prop="wealth"
            >
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleBuy(scope.row,2)"
                  >{{$t('trade1.sell')}}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="prev,pager,next"
            :total="total1"
            background
            style="text-align:center;margin-top:20px;"
            @prev-click="handlePrevClick1"
            @current-change="handleChange1"
            @next-click="handleNextClick1"
            :current-page.sync="currentPage2"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  layout: 'trade',
  data() {
    return {
      tableData: [],
      tableData1: [],
      total: 0,
      total1: 0,
      currentPage1: 1,
      currentPage2: 1,
      loading1: true,
      loading2: true,
    }
  },
  created() {
    let page1 = this.$store.state.page1;
    let page2 = this.$store.state.page2;
    if (page1) {
      this.currentPage1 = Number(page1);
      this.getData(page1, 1);
    } else {
      this.getData(1, 1);
    }
    if (page2) {
      this.currentPage2 = Number(page2);
      this.getData(page2, 2);
    } else {
      this.getData(1, 2);
    }
  },
  mounted() {
  },
  methods: {
    getData(page, type) {
      console.log(this.$store.state);
      // var message = JSON.parse(localStorage.getItem('store'));
      var message = this.$store.state.message;
      console.log(message, 333333);
      axios.post('/api/trade/index', {
        userid: message.userid,
        sessionid: message.sessionid,
        page: page,
        tradetype: type
      }).then(res => {
        if (type == 1) {
          this.loading1 = false;
          this.tableData = res.data.data.trades.data;
        } else if (type == 2) {
          this.loading2 = false;
          this.tableData1 = res.data.data.trades.data;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handlePrevClick(val) {
      this.loading1 = true;
      this.getData(val, 1);
      this.$store.state.commit('SET_PAGE', val);
    },
    handleNextClick(val) {
      this.loading1 = true;
      this.getData(val, 1);
      this.$store.state.commit('SET_PAGE', val);
    },
    handleChange(val) {
      this.loading1 = true;
      this.getData(val, 1);
      this.$store.state.commit('SET_PAGE', val);
    },
    handlePrevClick1(val) {
      this.loading2 = true;
      this.getData(val, 2);
      this.$store.state.commit('SET_PAGE2', val);
    },
    handleNextClick1(val) {
      this.loading2 = true;
      this.getData(val, 2);
      this.$store.state.commit('SET_PAGE2', val);
    },
    handleChange1(val) {
      this.loading2 = true;
      this.getData(val, 2);
      this.$store.state.commit('SET_PAGE2', val);
    },
    handleBuy(row, type) {
      axios.post('/api/trade/buytrade', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: row.id,
        buynum: row.num,
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$message({
            type: 'success',
            message: res.data.msg,
            showClose: true,
            onClose: this.onclose(type)
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg,
            showClose: true
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onclose(type) {
      if (type == 1) {
        this.getData(this.$store.state.page1, 1);
        this.$store.commit('SET_PAGE', this.$store.state.page1);
      } else {
        this.getData(this.$store.state.page2, 1);
        this.$store.commit('SET_PAGE2', this.$store.state.page2);
      }
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
@import url("~/assets/trade1.css");
</style>