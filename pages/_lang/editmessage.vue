<template>
  <div>
    <el-card class="message-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{$t('editmessage.message')}}</span>
      </div>
      <div>
        <el-form
          ref="form"
          label-width="100px"
          style="width:800px;margin:0 auto;"
          @submit.native="handleSubmit"
        >
          <template v-for="(val,key) in editInfo">
            <el-form-item
              :key="key"
              :label="val.name"
            >
              <el-input
                :name="key"
                v-model="val.default"
                v-if="val.input=='text'"
              ></el-input>
              <el-select
                v-model="val.default"
                v-else-if="val.input=='select'"
                :name="key"
                style="width:100%"
              >
                <template>
                  <el-option
                    v-for="(val1,key1) in val.select"
                    :key="key1"
                    :label="val1"
                    :value="key1"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
          </template>
          <el-button
            type="danger"
            native-type="submit"
            class="confirmBtn"
          >{{$t('editmessage.confirm')}}</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: '',
  data() {
    return {
      editInfo: ''
    }
  },
  created() {
    this.getPage();
  },
  methods: {
    getPage() {
      axios.post('/api/member/profileManagement', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        console.log(res);
        this.editInfo = res.data.data.editinfo;
      }).catch(err => {
        console.log(err);
      })
    },
    handleSubmit(e) {
      e.preventDefault();
      console.log(e);
      let formData = new FormData();
      formData.append('userid', this.$store.state.message.userid);
      formData.append('sessionid', this.$store.state.message.sessionid);
      formData.append('username', this.$store.state.message.username);
      for (let i = 0; i < e.target.length; i++) {
        formData.append(e.target[i].name, e.target[i].value);
      }
      axios.post('/api/member/saveprofile', formData).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$message({
            message: res.data.msg,
            type: 'success',
            showClose: true
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
    }
  },
}
</script>

<style >
.confirmBtn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>