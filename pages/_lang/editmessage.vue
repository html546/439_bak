<template>
  <div>
    <el-card class="message-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{$t('editmessage.message')}}</span>
        <el-button
          type="text"
          @click="handleSubmit"
          style="float:right;padding:3px 0;"
        >{{$t('editmessage.confirm')}}</el-button>
      </div>
      <div>
        <el-form
          ref="form"
          label-width="100px"
          style="width:800px;margin:0 auto;"
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
  middleware: "auth",
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
      let formData = new FormData();
      formData.append('userid', this.$store.state.message.userid);
      formData.append('sessionid', this.$store.state.message.sessionid);
      formData.append('username', this.$store.state.message.username);
      console.log(this.$refs.form);
      for (let i = 0; i < this.$refs.form.$el.length; i++) {
        formData.append(this.$refs.form.$el[i].name, this.$refs.form.$el[i].value);
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
.message-card {
  width: 1200px;
  margin: 30px auto;
}
</style>