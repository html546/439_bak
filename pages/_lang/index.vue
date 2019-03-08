<template>
  <div>
    <div class="download">
      <div class="download_center">
        <el-row
          type="flex"
          class="download_row"
        >
          <el-col :span="12">
            <div class="download_android">
              <img
                src="~assets/android.png"
                alt=""
              >
              <div class="download_android_right">
                <p>{{$t('home.android')}}</p>
                <el-button round>{{$t('home.download_now')}}</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="download_android">
              <img
                src="~assets/ios.png"
                alt=""
              >
              <div class="download_android_right">
                <p>{{$t('home.ios')}}</p>
                <el-button round>{{$t('home.download_now')}}</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="panel">
      <div class="panel_table">
        <el-table
          :data="post"
          :border="true"
        >
          <el-table-column
            prop="name"
            :label="$t('home.coin_name')"
          ></el-table-column>
          <el-table-column
            prop="current_price"
            :label="$t('home.zh_price')"
          ></el-table-column>
          <el-table-column
            prop="current_price_usd"
            :label="$t('home.us_price')"
          >
          </el-table-column>
          <el-table-column
            :label="$t('home.coin_gain')"
            prop="change_percent"
          ></el-table-column>
          <el-table-column :label="$t('home.logo')">
            <template slot-scope="scope">
              <img
                :src="scope.row.logo"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="fullname"
            :label="$t('home.cn_name')"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      isActive: false,
    }
  },
  asyncData() {
    return axios.get('http://t439.shangtua.com:88/api/Login/get_price')
      .then(res => {
        console.log(res);
        return { post: res.data.data }
      })
  },
}
</script>
<style>
.download {
  width: 100%;
  height: 180px;
  background: #fff;
}
.download_center {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
}
.download_android {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.download_android_right {
  display: flex;
  flex-direction: column;
}
.download_android_right p {
  color: #258ffc;
  font-size: 16px;
  text-align: center;
}

.download_android_right .el-button {
  margin-top: 10px;
  background: #fff;
  width: 165px;
  height: 40px;
  color: #258ffc;
}
.download_android_right .el-button:hover {
  background: #258ffc;
  color: #fff;
}

.download_row {
  height: 100%;
}
.panel {
  width: 100%;
  height: auto;
  background: #f3f3f3;
  padding: 1px;
}
.panel_table {
  width: 1200px;
  margin: 50px auto 80px;
  background: #fff;
}
.el-table .cell {
  text-align: center;
}
</style>

