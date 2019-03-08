<template>
  <div>
    <div
      class="header"
      :style="{'background':color}"
    >
      <div
        class="header-center"
        :style="{'background':color}"
      >
        <img
          src="~assets/logo.png"
          alt=""
          class="header-img"
        >
        <el-header>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :background-color="color"
            text-color="#fff"
            active-text-color="#fff"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <nuxt-link
                :to="$i18n.path('')"
                exact
              >
                {{$t('links.home')}}
              </nuxt-link>
            </el-menu-item>
            <template v-if="isActive">
              <el-submenu index="2">
                <template slot="title">
                  <a href="javascript:;">
                    {{$t('links.trade')}}
                  </a>
                </template>
                <el-menu-item index="2-1">
                  <nuxt-link :to="$i18n.path('trade1')">
                    {{$t('links.hall')}}
                  </nuxt-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <nuxt-link :to="$i18n.path('trade2')">
                    {{$t('links.details')}}
                  </nuxt-link>
                </el-menu-item>
                <el-menu-item index="2-3">
                  <nuxt-link :to="$i18n.path('trade3')">
                    {{$t('links.hangout')}}
                  </nuxt-link>
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="3">
                <nuxt-link :to="$i18n.path('browser')">
                  {{$t('links.browser')}}
                </nuxt-link>
              </el-menu-item>
              <el-menu-item index="4">
                <nuxt-link :to="$i18n.path('friend')">
                  {{$t('links.friends')}}
                </nuxt-link>
              </el-menu-item>
              <el-menu-item index="8">
                <nuxt-link :to="$i18n.path('reinvestment')">
                  {{$t('links.investment')}}
                </nuxt-link>
              </el-menu-item>
              <el-menu-item index="9">
                <nuxt-link :to="$i18n.path('activate')">
                  {{$t('links.activate')}}
                </nuxt-link>
              </el-menu-item>
              <el-submenu
                index="6"
                style="float:right;"
              >
                <template slot="title">
                  {{$store.state.message.username}}
                </template>
                <el-menu-item index="6-1">
                  <nuxt-link :to="$i18n.path('person')">
                    {{$t('links.person')}}
                  </nuxt-link>
                </el-menu-item>
                <el-menu-item
                  index="6-2"
                  @click="handleExit"
                >
                  {{$t('links.signout')}}
                </el-menu-item>
              </el-submenu>
            </template>
            <el-submenu
              index="5"
              style="float:right;"
            >
              <template slot="title">
                {{title}}
              </template>
              <el-menu-item
                index="5-1"
                v-if="$i18n.locale === 'en'"
              >
                <nuxt-link
                  :to="`/tc`+$route.fullPath"
                  active-class="none"
                  exact
                >
                  {{$t('links.chinese')}}
                </nuxt-link>
              </el-menu-item>
              <el-menu-item
                index="5-2"
                v-else
              >
                <nuxt-link
                  :to="$route.fullPath.replace(/^\/[^\/]+/, '')"
                  active-class="none"
                  exact
                >
                  {{$t('links.english')}}
                </nuxt-link>
              </el-menu-item>
            </el-submenu>
            <template v-if="!isActive">
              <el-submenu
                index="7"
                style="float:right;"
              >
                <template slot="title">
                  {{$t('links.lorr')}}
                </template>
                <el-menu-item index="7-1">
                  <nuxt-link :to="$i18n.path('login')">
                    {{$t('links.login')}}
                  </nuxt-link>
                </el-menu-item>
                <el-menu-item index="7-2">
                  <nuxt-link :to="$i18n.path('register')">
                    {{$t('links.register')}}
                  </nuxt-link>
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-header>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['color', 'opacity'],
  data() {
    return {
      activeIndex: '0',
      title: 'english',
    }
  },
  created() {
    console.log(this.$store.state, 111111);
  },
  computed: {
    isActive() {
      if (this.$store.state.message == null || Object.keys(this.$store.state.message).length == 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == '5-1') {
        this.title = 'english';
        let formdata = new FormData();
        formdata.append('lang', 'en');
        var that = this;
        axios.post('/api/Login/language', formdata).then(res => {
          console.log(res);
          // window.location.reload();
          this.$emit('page-reload');
        }).catch(err => {
          console.log(err);
        })
      } else if (key == '5-2') {
        this.title = '繁體中文';
        let formdata = new FormData();
        formdata.append('lang', 'tw');
        var that = this;
        axios.post('/api/Login/language', formdata).then(res => {
          console.log(res);
          // window.location.reload();
          this.$emit('page-reload');
        }).catch(err => {
          console.log(err);
        })
      }
    },
    handleExit() {
      this.$store.dispatch('clearMessage');
      window.localStorage.removeItem('store');
    },
    /* toTc() {
      console.log('toTc');
      axios.post('/api/Login/language', {
        lang: 'tw'
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    toEn() {
      console.log('toEn');
      axios.post('/api/Login/language', {
        lang: 'en'
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    } */
  },
}
</script>