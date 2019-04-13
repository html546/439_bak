<template>
  <div>
    <div class="hang_out">
      <el-card class="box-card">
        <div slot="header">
          <p style="text-align:left;">{{$t('trade3.hangout')}}</p>
        </div>
        <div>
          <el-form
            label-width="140px"
            ref="form"
            :model="form"
            style="width:660px;margin:0 auto;"
          >

            <el-form-item :label="$t('trade3.mode')">
              <el-select
                v-model="form.tradetype"
                :placeholder="$t('trade3.hangout_mode')"
                style="width:100%;"
                @change="handleChange"
              >
                <el-option
                  :label="$t('trade3.sale')"
                  value="1"
                ></el-option>
                <el-option
                  :label="$t('trade3.bill')"
                  value="2"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('trade3.fee')"
              v-show="fee"
            >
              <el-input
                v-model="form.fee"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('trade3.price')">
              <el-input
                v-model="form.price"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('trade3.num')">
              <el-input v-model="form.num"></el-input>
            </el-form-item>
            <el-form-item :label="$t('trade3.pass2')">
              <el-input
                v-model="form.pass2"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleHangOut"
              >{{$t('trade3.submit')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          border
          stripe
          v-loading="loading"
          :element-loading-text="$t('trade2.loading')"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column
            prop="time"
            :label="$t('trade3.time')"
          >
            <template slot-scope="scope">
              {{timefilter(scope.row.time)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            :label="$t('trade3.num')"
          ></el-table-column>
          <el-table-column
            prop="oneprice"
            :label="$t('trade3.oneprice')"
          ></el-table-column>
          <el-table-column
            prop="state"
            :label="$t('trade3.state')"
          >
            <template slot-scope="scope">
              {{scope.row.state==0?$t('trade3.undone'):$t('trade3.completed')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="tradetype"
            :label="$t('trade3.transaction')"
          ></el-table-column>
          <el-table-column :label="$t('trade3.operate')">
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click="handleCancel(scope.row.id)"
              >{{$t('trade3.cancel')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev,pager,next"
          :page-count="allPage"
          class="pagination"
          style="text-align:center"
          background
          @prev-click="handlePrevClick"
          @current-change="handleChange1"
          @next-click="handleNextClick"
          :current-page="currentPage"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: '',
  data() {
    return {
      form: {
        fee: '',
        tradetype: '',
        paytype: '',
        price: '',
        num: '',
        pass2: '',
      },
      fee: '',
      currentPage: 1,
      tableData: '',
      allPage: '',
      loading: true
    }
  },
  middleware: "auth",
  created() {
    this.getFee();
    this.getPrice();
    var page = this.$store.state.page4;
    console.log(page);
    if (page) {
      this.currentPage = Number(page);
      this.getPage(page);
    } else {
      this.getPage(this.currentPage);
    }
  },
  methods: {
    onclose5() {
      setTimeout(() => {
        this.$router.replace('/login');
      }, 3000);
    },
    getPage(page) {
      axios.post('/api/trade/tradeinfo', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        page: page,
      }).then(res => {
        console.log(res);
        if (res.data.status == 0) {
          this.commit('clearMessage');
          this.$message({
            type: 'error',
            message: res.data.msg,
            onClose: this.onclose5()
          })
        }
        this.loading = false;
        this.allPage = res.data.data.allPage;
        this.tableData = res.data.data.trades;
      }).catch(err => {
        console.log(err);
      })
    },
    handlePrevClick(val) {
      this.loading = true;
      this.getPage(val);
      this.$store.commit('SET_PAGE4', val);
    },
    handleNextClick(val) {
      this.loading = true;
      this.getPage(val);
      this.$store.commit('SET_PAGE4', val);
    },
    handleChange1(val) {
      this.loading = true;
      this.getPage(val);
      this.$store.commit('SET_PAGE4', val);
    },
    handleCancel(id) {
      axios.post('/api/trade/canceltrade', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: id
      }).then(res => {
        console.log(res);
        this.$message({
          type: "success",
          message: res.data.msg,
          showClose: true,
          onClose: this.onclose1()
        })
      }).catch(err => {
        console.log(err);
      })
    },
    onclose1() {
      this.getPage(this.$store.state.page4);
    },
    getPrice() {
      axios.post('/api/trade/getprice', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        if (res.data.status == 0) {
          this.$store.commit('clearMessage');
          this.$router.replace('/login');
        }
        this.form.price = res.data.data.price.usdtprized;
      }).catch(err => {
        console.log(err);
      })
    },
    getFee() {
      axios.post('/api/trade/getFee', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        if (res.data.status == 0) {
          this.$store.commit('clearMessage');
          this.$router.replace('/login');
        }
        this.form.fee = res.data.data.tax;
      }).catch(err => {
        console.log(err);
      })
    },
    handleChange(e) {
      console.log(e);
      if (e == 1) {
        this.fee = true;
      } else if (e == 2) {
        this.fee = false;
      }
    },
    handleHangOut() {
      axios.post('/api/trade/start', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        tradetype: this.form.tradetype,
        paytype: this.form.paytype,
        price: this.form.price,
        num: this.form.num,
        pass2: this.form.pass2
      }).then(res => {
        if (res.data.status == 1) {
          this.$message({
            message: res.data.msg,
            type: 'success',
            showClose: true,
            onClose: this.onclose()
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            showClose: true
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onclose() {
      this.form.tradetype = '';
      this.form.paytype = '';
      this.form.num = '';
      this.form.pass2 = '';
    },
    timefilter(val) {
      return this.$format1(val * 1000);
    }
  },
}
</script>

<style>
.hang_out {
  width: 1200px;
  margin: 50px auto 120px;
}
.pagination {
  margin-top: 20px;
}
</style>
