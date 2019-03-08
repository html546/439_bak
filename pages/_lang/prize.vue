<template>
  <div>
    <div class="prize">
      <div class="table_box">
        <el-table
          :data="tableData"
          :border="true"
          :stripe="true"
          style="width:100%;"
          v-loading="loading"
          :element-loading-text="$t('prize.loading')"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column
            prop="bonus1"
            :label="label1"
          ></el-table-column>
          <el-table-column
            prop="bonus2"
            :label="label2"
          >
          </el-table-column>
          <el-table-column
            prop="bonus3"
            :label="label3"
          ></el-table-column>
          <el-table-column
            prop="calc_date"
            :label="$t('prize.date')"
          >
            <template slot-scope="scope">
              <p>{{scope.row.calc_date | timefilter}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="prize"
            :label="$t('prize.bonus')"
          ></el-table-column>
          <el-table-column
            prop="income"
            :label="$t('prize.income')"
          ></el-table-column>
          <el-table-column
            prop="total_income"
            :label="$t('prize.amount')"
          ></el-table-column>
          <el-table-column
            prop="wealth"
            :label="$t('prize.operate')"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleDetail(scope)"
              >{{$t('prize.details')}}</el-button>
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
          :title="$t('prize.details')"
          :visible.sync="dialogTableVisible"
        >
          <div
            v-for="(item,index) in data"
            :key="index"
          >
            <p>{{item.name}}</p>
            <el-table
              :data="item.list"
              :border="true"
              :stripe="true"
            >
              <el-table-column
                :label="$t('prize.source')"
                prop="fromname"
              ></el-table-column>
              <el-table-column
                :label="$t('prize.generate')"
                prop="trueval"
              ></el-table-column>
              <el-table-column
                :label="$t('prize.formula')"
                prop="memo"
              ></el-table-column>
              <el-table-column
                :label="$t('prize.layer')"
                prop="layer"
              ></el-table-column>
            </el-table>
          </div>
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
      label1: '',
      label2: '',
      label3: '',
      dialogTableVisible: false,
      gridData: [],
      data: [],
      total: 0,
      currentpage: 1,
      loading: true
    }
  },
  created() {
    var prize_page = this.$store.state.prize_page;
    if (prize_page > 1) {
      this.currentpage = Number(prize_page);
      this.getData(prize_page);
    } else {
      this.getData(1);
    }
  },
  methods: {
    getData(page) {
      axios.post('/api/prize/index', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        page: page
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.res;
        this.loading = false;
        var bonus = res.data.data.bonus;
        for (var i in bonus) {
          if (bonus[i].sheet == 'bonus1') {
            this.label1 = bonus[i].name;
          } else if (bonus[i].sheet == 'bonus2') {
            this.label2 = bonus[i].name;
          } else if (bonus[i].sheet == 'bonus3') {
            this.label3 = bonus[i].name;
          }
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handleDetail(scope) {
      axios.post('/api/prize/prizeform', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid,
        id: scope.row.id
      }).then(res => {
        console.log(res);
        this.data = res.data.data;
        this.dialogTableVisible = true;
      }).catch(err => {
        console.log(err);
      })
    },
    handlePrev(val) {
      this.loading = true;
      this.getData(val);
      this.$store.state.commit('SET_PRIZEPAGE', val);
    },
    handleNext(val) {
      this.loading = true;
      this.getData(val);
      this.$store.state.commit('SET_PRIZEPAGE', val);
    },
    handleChange(val) {
      this.loading = true;
      this.getData(val);
      this.$store.state.commit('SET_PRIZEPAGE', val);
    },
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
.prize {
  width: 1200px;
  margin: 50px auto;
}
.table_box {
  width: 800px;
  margin: 0 auto;
}
</style>