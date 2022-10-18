<template>
  <div id="w2l-container">
    <W2LHeader />
    <Navbar :platform="(platformInfo && platformInfo.name) || $route.params.platform" />
    <div id="container">
      <input id="sidebar-toggle-button" class="sidebar-toggle" type="checkbox" @input="resetScroll">
      <label for="sidebar-toggle-button" class="sidebar-toggle-label"><img src="/images/menu.svg" /></label>
      <div id="sidebar" v-if="sidebar">
        <SidebarElement v-for="item of sidebar" :key="`sidebar-${item.category || item.slug}`" :content="item" :baseUrl="baseUrl" :topLevel="true"/>
      </div>
      <NuxtChild />
    </div>
  </div>
</template>

<script>
import categorizeData from '~/assets/categorizeData'
import getFirstItem from '~/assets/getFirstItem'
export default {
  async asyncData({$content, app, params}) {
    const logPath = `${app.i18n.locale}/platforms/${params.platform}/logs`
    const sidebarData = await $content(logPath, {deep: true}).sortBy('title').only(['source', 'title', 'dir', 'slug']).fetch().then(items => items.map(item => ({...item, path: item.dir.replace(`/${logPath}`, '').split('/')})))
    const platformInfo = await $content(`${app.i18n.locale}/platforms/${params.platform}/info`).fetch()
    const sidebar = categorizeData(sidebarData, platformInfo && platformInfo.category_ordering && platformInfo.category_ordering.logs)
    console.log(sidebar)
    return {
      baseUrl: `${params.platform}/logs`,
      sidebar,
      platformInfo
    }
  },
  async mounted () {
    if (!this.$route.params.log) {
      this.$router.push(`/${this.$route.params.platform}/logs/${getFirstItem(this.sidebar).slug}`)
    } 
  },
  methods: {
    linkClick() {
      document.getElementById('sidebar-toggle-button').checked = false
    },
    resetScroll(e) {
      e.target.labels[0].scrollIntoView()
    }
  }
}
</script>