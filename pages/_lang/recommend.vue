<template>
  <div>
    <div
      class="network"
      id="network"
    >

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: '',
  data() {
    return {

    }
  },
  created() {
    this.getNetwork();
  },
  methods: {
    getNetwork() {
      axios.post('/api/net/recommendInWork', {
        userid: this.$store.state.message.userid,
        sessionid: this.$store.state.message.sessionid
      }).then(res => {
        console.log(res);
        document.getElementById('network').innerHTML = res.data.data.htmlstr;
      }).catch(err => {
        console.log(err);
      })
    }
  },

}
</script>

<style>
.network {
  width: 1200px;
  margin: 50px auto;
  overflow-x: auto;
}
.thistable {
  margin: 0 auto;
}
.floatdivtable {
  width: 100%;
}

.floatdivtable th,
.floatdivtable td {
  border: 1px solid #cecece;
  text-align: center;
  line-height: 25px;
}

.nettd {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #a5d1ec;
  color: #ffffff;
}

#tdcolor1 {
  background-color: #1bbc9d;
}

#tdcolor2 {
  background-color: #aaaaaa;
}

#tdcolor3 {
  background-color: #e7f2fb;
  line-height: 20px;
}

.nettd a {
  color: #fff;
}

.thistable {
  /* background-color: #517DBF; */
  margin: 0px auto 0 auto;
  border: 1px solid #ededed;
}

.la1 {
  width: 60px;
  height: 25px;
  color: #ffffff;
  background-color: #1bbc9d;
}

.la2 {
  width: 60px;
  height: 25px;
  color: #ffffff;
  background-color: #aaaaaa;
}

.la3 {
  background-color: #ffffff;
}

.la4 {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #a5d1ec;
  background-color: #1bbc9d;
}

.la5 {
  background-color: #999;
}

.floatDiv {
  border: 3px solid rgb(213, 221, 223);
  position: absolute;
  background: rgb(255, 255, 255);
  padding: 10px;
  display: none;
}

.floatDiv table tbody tr td {
  height: 40px;
  line-height: 40px;
}

.tdright {
  text-align: right;
}

.rdleft {
  text-align: left;
}

.currentNavTab {
  width: 100px;
  color: #fff;
}

.hengxian {
  background-color: #003399;
}
</style>