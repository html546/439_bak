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
        element-loading-text="拼命加载中"
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
          prop="oneprice"
          :label="$t('trade2.oneprice')"
        ></el-table-column>
        <el-table-column
          prop="all"
          :label="$t('trade2.total')"
        >
          <template slot-scope="scope">
            <p>{{scope.row.num* scope.row.oneprice}}</p>
          </template>
        </el-table-column>
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
            <p>{{scope.row.buytime | timefilter}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="fee"
          :label="$t('trade2.fee')"
        ></el-table-column>
        <el-table-column
          prop="usdtprice"
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
        title="交易详情"
        :visible.sync="dialogFormVisible"
        top="5vh"
      >
        <el-form :model="form">
          <el-form-item label="卖家编号">
            <el-input
              v-model="form.saleusername"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input
              v-model="form.bank_name"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input
              v-model="form.bank_number"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户名">
            <el-input
              v-model="form.bank_username"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="买家编号">
            <el-input
              v-model="form.username"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="购买数量">
            <el-input
              v-model="form.num"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="购买价格">
            <el-input
              v-model="form.oneprice"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="购买时间">
            <el-input
              v-model="buytime"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="交易汇款"
        :visible.sync="dialogFormVisible1"
        :close="handleClose"
        top="5vh"
      >
        <el-form
          :model="form1"
          label-width="80px"
        >
          <el-form-item label="卖家编号">
            <el-input
              v-model="form1.saleusername"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="汇款金额">
            <el-input
              v-model="money"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="汇款时间"
            class="time"
          >
            <el-date-picker
              v-model="remitTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions1"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="汇款凭证">
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
              >点击上传</el-button>
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
            >立即提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="申诉内容"
        :visible.sync="dialogFormVisible2"
        top="5vh"
      >
        <el-form>
          <el-form-item label="申诉内容">
            <el-input
              type="textarea"
              v-model="content"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleArbitrateSubmit"
            >立即提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="上传交易凭据"
        :visible.sync="dialogFormVisible3"
        top="5vh"
      >
        <el-form>
          <el-form-item label="交易凭据">
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
              >点击上传</el-button>
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
            >立即提交</el-button>
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
    }
  },
  created() {
    var page = this.$store.state.page3;
    if (page) {
      this.currentPage = Number(page);
      this.getPage(page);
    } else {
      this.getPage(1);
    }
  },
  computed: {
    money() {
      return this.form1.num * this.form1.oneprice;
    }
  },
  methods: {
    getPage(page) {
      axios.post('/api/trade/buyinfo', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        page: page
      }).then(res => {
        console.log(res);
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
      this.$store.state.commit('SET_PAGE3', val);
    },
    handleNextClick(val) {
      this.loading = true;
      this.getPage(val);
      this.$store.state.commit('SET_PAGE3', val);
    },
    handleChange(val) {
      this.loading = true;
      this.getPage(val);
      this.$store.state.commit('SET_PAGE3', val);
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
      this.buytime = format1(scope.row.buytime * 1000);
      this.id = scope.row.id;
    },
    handleRemit(scope) {
      console.log(scope);
      this.form1 = scope.row;
      this.dialogFormVisible1 = true;
      this.id = scope.row.id;
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