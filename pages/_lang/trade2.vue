<template>
  <div>
    <div class="detail">
      <h3>{{$t('trade2.detail')}}</h3>
      <p>TRANSACTION DETAILS</p>
      <el-table
        :data="detailData"
        :border="true"
        :stripe="true"
        v-loading="loading"
        :element-loading-text="$t('trade2.loading')"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="trade2_btn"
      >

        <el-table-column
          prop="saleusername"
          :label="$t('trade2.number')"
        ></el-table-column>
        <el-table-column
          prop="num"
          :label="$t('trade2.num')"
        ></el-table-column>
        <el-table-column
          prop="ordertype"
          :label="$t('trade2.type')"
        ></el-table-column>
        <el-table-column
          prop="oneprice"
          :label="$t('trade2.oneprice')"
        ></el-table-column>
        <!-- <el-table-column
          prop="all"
          :label="$t('trade2.total')"
        >
          <template slot-scope="scope">
            <p>{{scope.row.num* scope.row.oneprice*6.3/scope.row.usdtprice | allFilter}}</p>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="state"
          :label="$t('trade2.state')"
        >
          <template slot-scope="scope">
            <div>
              <template v-if="scope.row.state == 0">
                {{$t('trade2.unpaid')}}
              </template>
              <template v-else-if="scope.row.state == 1">
                {{$t('trade2.paid')}}
              </template>
              <template v-else-if="scope.row.state == 2">
                {{$t('trade2.completed')}}
              </template>
              <template v-else-if="scope.row.state == 3">
                {{$t('trade2.rescinded')}}
              </template>
              <template v-else-if="scope.row.state == 4">
                {{$t('trade2.Arbitration')}}
              </template>
              <template v-else-if="scope.row.state == 5">
                {{$t('trade2.seller')}}
              </template>
              <template v-else-if="scope.row.state == 6">
                {{$t('trade2.buyer')}}
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="buytime"
          :label="$t('trade2.time')"
        >
          <template slot-scope="scope">
            <p>{{timefilter(scope.row.buytime)}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="fee"
          :label="$t('trade2.fee')"
        ></el-table-column>
        <el-table-column
          prop="remitmoney"
          :label="$t('trade2.pay')"
        ></el-table-column>
        <el-table-column
          prop="wealth"
          :label="$t('trade2.operate')"
        >
          <template slot-scope="scope">
            <template v-if="CheckState1(scope)">
              <el-button
                type="warning"
                size="mini"
                @click="handleRemit(scope)"
              >
                {{$t('trade2.remit')}}
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleCancel(scope)"
              >
                {{$t('trade2.cancel')}}
              </el-button>
            </template>
            <template v-else-if="CheckState2(scope)">
              <el-button
                type="warning"
                size="mini"
                @click="handleArbitrate(scope)"
              >
                {{$t('trade2.arbitration')}}
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleSure(scope)"
              >
                {{$t('trade2.confirm')}}
              </el-button>
            </template>
            <template v-else-if="checkState3(scope)">
              <el-button
                type="primary"
                size="mini"
                @click="handleUpload(scope)"
              >
                {{$t('trade2.proof')}}
              </el-button>
            </template>
            <el-button
              type="primary"
              size="mini"
              @click="handleCheck(scope)"
            >
              {{$t('trade2.details')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev,pager,next"
        :total="total"
        class="pagination"
        background
        @prev-click="handlePrevClick"
        @current-change="handleChange"
        @next-click="handleNextClick"
        :current-page="currentPage"
      >
      </el-pagination>
      <el-dialog
        :title="$t('trade2.detail1')"
        :visible.sync="dialogFormVisible"
        :close="dialogClose"
        top="5vh"
      >
        <el-form :model="form">
          <el-form-item :label="$t('trade2.sellid')">
            <el-input
              v-model="form.saleusername"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.saller_address')">
            <el-input
              v-model="saleuser.usdtaddress"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.buyer1')">
            <el-input
              v-model="form.username"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.buyer_address')">
            <el-input
              v-model="buyuser.usdtaddress"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.type')">
            <el-input
              v-model="ordertype"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.tel')">
            <el-input
              v-model="tel"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.num1')">
            <el-input
              v-model="form.num"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.price')">
            <el-input
              v-model="form.oneprice"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.pay')">
            <el-input
              v-model="form.remitmoney"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.state')">
            <template>
              <div>
                <el-input
                  v-if="state == 0"
                  :readonly="true"
                  :value="$t('trade2.unpaid')"
                />
                <el-input
                  v-else-if="state == 1"
                  :readonly="true"
                  :value="$t('trade2.paid')"
                />
                <el-input
                  v-else-if="state == 2"
                  :readonly="true"
                  :value="$t('trade2.completed')"
                />
                <el-input
                  v-else-if="state == 3"
                  :readonly="true"
                  :value="$t('trade2.rescinded')"
                />
                <el-input
                  v-else-if="state == 4"
                  :readonly="true"
                  :value="$t('trade2.Arbitration')"
                />
                <el-input
                  v-else-if="state == 5"
                  :readonly="true"
                  :value="$t('trade2.seller')"
                />
                <el-input
                  v-else-if="state == 6"
                  :readonly="true"
                  :value="$t('trade2.buyer')"
                />
              </div>
            </template>
          </el-form-item>
          <el-form-item :label="$t('trade2.buytime')">
            <el-input
              v-model="buytime"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('trade2.voucher')"
            v-if="buydata"
          >
            <img
              :src="buydata"
              style="max-width:100%;max-height:500px;"
              alt=""
            >
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        :title="$t('trade2.remit1')"
        :visible.sync="dialogFormVisible1"
        :close="handleClose"
        top="5vh"
      >
        <el-form
          :model="form1"
          label-width="150px"
        >
          <el-form-item :label="$t('trade2.sellid')">
            <el-input
              v-model="form1.saleusername"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.saller_address')">
            <el-input
              v-model="usdt_address"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('trade2.money')">
            <el-input
              v-model="money"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('trade2.time1')"
            class="time"
          >
            <el-date-picker
              v-model="remitTime"
              type="datetime"
              :placeholder="$t('trade2.timedate')"
              align="right"
              :picker-options="pickerOptions1"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('trade2.voucher')">
            <el-upload
              class="upload-demo"
              :action="upload"
              :limit="1"
              :on-success="handleSuccess"
              :data="uploadData"
              :on-exceed="handleExceed"
            >
              <el-button
                size="small"
                type="primary"
              >{{$t('trade2.upload')}}</el-button>
              <img
                :src="imageUrl"
                style="max-width:200px;"
                alt=""
              >
            </el-upload>
          </el-form-item>
          <el-form-item style="text-align:left;">
            <el-button
              type="primary"
              @click="handleRemitSubmit"
            >{{$t('trade2.submit')}}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        :title="$t('trade2.appeal')"
        :visible.sync="dialogFormVisible2"
        top="5vh"
      >
        <el-form>
          <el-form-item :label="$t('trade2.appeal')">
            <el-input
              type="textarea"
              v-model="content"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleArbitrateSubmit"
            >{{$t('trade2.submit')}}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        :title="$t('trade2.proof1')"
        :visible.sync="dialogFormVisible3"
        top="5vh"
      >
        <el-form>
          <el-form-item :label="$t('trade2.proof')">
            <el-upload
              class="upload-demo"
              :action="upload"
              :limit="1"
              :on-success="handleSuccess"
              :data="uploadData"
              :on-exceed="handleExceed"
            >
              <el-button
                size="small"
                type="primary"
              >{{$t('trade2.upload')}}</el-button>
              <img
                :src="imageUrl"
                style="max-width:200px;"
                alt=""
              >
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleTradeSubmit"
            >{{$t('trade2.submit')}}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'default',
  name: '',
  middleware: "auth",
  data() {
    return {
      detailData: [],
      total: 0,
      currentPage: 1,
      loading: true,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form: {},
      form1: {},
      buytime: '',
      remitTime: '',
      upload: '/api/trade/upload',
      uploadData: {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
      },
      imageUrl: '',
      content: '',
      usdt_address: '',
      buyuser: '',
      saleuser: '',
      pickerOptions1: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }
        ]
      },
      state: '',
      tel: '',
      ordertype: '',
      buydata: ''
    }
  },
  created() {
    var page = this.$store.state.page3;
    console.log(page);
    if (page) {
      this.currentPage = Number(page);
      this.getPage(page);
    } else {
      this.getPage(1);
    }
  },
  computed: {
    money() {
      return this.form1.usdtprice;
    }
  },
  methods: {
    getPage(page) {
      axios.post('/api/trade/buyinfo', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        page: page
      }).then(res => {
        if (res.data.status == 0) {
          this.commit('clearMessage');
          this.$router.replace('/login');
        }
        this.detailData = res.data.data.trade_buy;
        this.loading = false;
        this.total = res.data.data.total;
      }).catch(err => {
        console.log(err);
      })
    },
    handlePrevClick(val) {
      this.loading = true;
      this.getPage(val);
      this.$store.commit('SET_PAGE3', val);
    },
    handleNextClick(val) {
      console.log(val);
      this.loading = true;
      this.getPage(val);
      this.$store.commit('SET_PAGE3', val);
    },
    handleChange(val) {
      this.loading = true;
      this.getPage(val);
      this.$store.commit('SET_PAGE3', val);
    },
    CheckState1(scope) {
      if (scope.row.state == 0 && scope.row.username == this.$store.state.message.username) {
        return true;
      } else {
        return false;
      }
    },
    CheckState2(scope) {
      if (scope.row.state == 1 && scope.row.saleusername == this.$store.state.message.username) {
        return true;
      } else {
        return false;
      }
    },
    checkState3(scope) {
      if (scope.row.state == 4 && scope.row.username == this.$store.state.message.username) {
        return true;
      } else {
        return false;
      }
    },
    handleCheck(scope) {
      this.dialogFormVisible = true;
      console.log(scope);
      this.form = scope.row;
      this.buytime = this.$format1(scope.row.buytime * 1000);
      this.id = scope.row.id;
      axios.post('/api/trade/viewbuytrade', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: scope.row.id
      }).then(res => {
        console.log(res);
        this.saleuser = res.data.data.saleuser;
        this.buyuser = res.data.data.buyuser;
        this.state = res.data.data.state;
        this.ordertype = res.data.data.ordertype;
        this.buydata = res.data.data.buydata;
        /* if (scope.row.state == 0 && scope.row.username == this.$store.state.message.username) {
          this.tel = res.data.data.saleuser.mobile_phone;
        } else if (scope.row.state == 1 && scope.row.saleusername == this.$store.state.message.username) {
          this.tel = res.data.data.buyuser.mobile_phone;
        } else if (scope.row.state == 4 && scope.row.username == this.$store.state.message.username) {
          this.tel = res.data.data.saleuser.mobile_phone;
        } */
        if (scope.row.username == this.$store.state.message.username) {
          this.tel = res.data.data.saleuser.mobile_phone;
        } else if (scope.row.saleusername == this.$store.state.message.username) {
          this.tel = res.data.data.buyuser.mobile_phone;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handleRemit(scope) {
      console.log(scope);
      this.form1 = scope.row;
      this.dialogFormVisible1 = true;
      this.id = scope.row.id;
      axios.post('/api/trade/prizes', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: scope.row.id
      }).then(res => {
        this.usdt_address = res.data.data.trade_buy.saleusdt;
      }).catch(err => {
        console.log(err);
      })
    },
    handleArbitrate(scope) {
      this.dialogFormVisible2 = true;
      this.id = scope.row.id;
    },
    handleUpload(scope) {
      this.id = scope.row.id;
      this.dialogFormVisible3 = true;
    },
    handleSuccess(res, file) {
      console.log(file);
      this.imageUrl = file.response.data.url;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleRemitSubmit() {
      axios.post('/api/trade/remitbuytrade', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: this.id,
        remittime: this.remitTime,
        image_input: this.imageUrl
      }).then(res => {
        if (res.data.status == 1) {
          this.$message({
            message: res.data.msg,
            type: 'success',
            showClose: true,
            onClose: this.onclose1()
          })
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
            showClose: true
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handleCancel(scope) {
      axios.post('/api/trade/cancelbuytrade', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: scope.row.id
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
            showClose: true,
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handleArbitrateSubmit() {
      axios.post('/api/trade/stopbuytrade', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: this.id,
        saledata: this.content
      }).then(res => {
        if (res.data.status == 1) {
          this.$message({
            type: "success",
            message: res.data.msg,
            showClose: true,
            onClose: this.onclose2()
          })
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
            showClose: true,
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handleTradeSubmit() {
      axios.post('/api/trade/proofbuytrade', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: this.id,
        buydata: this.imageUrl
      }).then(res => {
        if (res.data.status == 1) {
          this.$message({
            type: "success",
            message: res.data.msg,
            showClose: true,
            onClose: this.onclose4()
          })
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
            showClose: true,
          })
        }
      })
    },
    handleSure(scope) {
      axios.post('/api/trade/okbuytrade', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: scope.row.id
      }).then(res => {
        if (res.data.status == 1) {
          this.$message({
            type: "success",
            message: res.data.msg,
            showClose: true,
            onClose: this.onclose3()
          })
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
            showClose: true,
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onclose() {
      this.getPage(this.currentpage);
    },
    onclose1() {
      this.dialogFormVisible1 = false;
      this.getPage(this.currentpage);
      this.image_input = '';
      this.remitTime = '';
    },
    onclose2() {
      this.dialogFormVisible2 = false;
      this.getPage(this.currentpage);
    },
    onclose3() {
      this.getPage(this.currentpage);
    },
    onclose4() {
      this.dialogFormVisible3 = false;
      this.getPage(this.currentpage);
    },
    handleClose() {
      this.image_input = '';
      this.remitTime = '';
    },
    dialogClose() {
      this.saleuser = '';
      this.buyuser = '';
    },
    timefilter(val) {
      return this.$format1(val * 1000);
    }
  },
  filters: {
    allFilter(val) {
      val = val.toFixed(2);
      return val;
    }
  }
}
</script>

<style >
html,
body {
  background: none;
}
.detail {
  width: 1200px;
  margin: 70px auto 185px;
  text-align: center;
}
.detail > h3 {
  font-size: 30px;
}
.detail > p {
  font-size: 14px;
  margin-bottom: 43px;
}
.pagination {
  margin-top: 20px;
}
.trade2_btn button {
  width: 100px;
}
.trade2_btn .el-button + .el-button {
  margin-left: 0;
}
.time .el-date-editor.el-input,
.time .el-date-editor.el-input__inner {
  width: 100%;
}
.upload-demo {
  text-align: left;
}
</style>
