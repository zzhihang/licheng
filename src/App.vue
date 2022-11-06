<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getAppList } from '@/api/common';

export default {
  name: 'App',
  // metaInfo() {
  //   return {
  //     title:
  //       this.$store.state.settings.dynamicTitle &&
  //       this.$store.state.settings.title,
  //     titleTemplate: (title) => {
  //       return title
  //         ? `${title} - ${process.env.VUE_APP_TITLE}`
  //         : process.env.VUE_APP_TITLE
  //     }
  //   }
  // },
  computed: {
    ...mapState('user', ['token'])
  },
  watch: {
    token: {
      handler(val) {
        val && getAppList().then(res => {
          if (res.code === 200) {
            this.setAppList(res.data.map(({appCode:value,appName:label})=>({label,value})))
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('app', ['setAppList'])
  }
}
</script>
