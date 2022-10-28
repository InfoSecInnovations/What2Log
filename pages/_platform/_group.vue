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
      <NuxtChild :scriptCategories="scriptCategories" :platformInfo="platformInfo" :langInfo="langInfo"/>
    </div>
  </div>
</template>

<script>
import categorizeData from '~/assets/categorizeData'
import getFirstItem from '~/assets/getFirstItem'
export default {
  async asyncData({$content, app, params}) {
    const groupPath = `${app.i18n.locale}/platforms/${params.platform}/${params.group}`
    const sidebarData = await $content(groupPath, {deep: true}).sortBy('title').only(['source', 'title', 'dir', 'slug', 'splitPath', 'logging']).fetch()
    const platformInfo = await $content(`${app.i18n.locale}/platforms/${params.platform}/info`).fetch()
    const langInfo = await $content(`${app.i18n.locale}/info`).fetch()
    const sidebar = categorizeData(sidebarData, platformInfo && platformInfo.category_ordering && platformInfo.category_ordering[params.group])
    const scriptCategories = [...new Set(sidebarData.filter(item => item.logging && item.logging.scripting && item.logging.scripting.tasks).map(item => Object.keys(item.logging.scripting.tasks)).flat())]
    return {
      baseUrl: `${params.platform}/${params.group}`,
      sidebar,
      platformInfo,
      scriptCategories,
      langInfo
    }
  },
  async mounted () {
    if (!this.$route.params.item) {
      this.$router.push(`/${this.$route.params.platform}/${this.$route.params.group}/${getFirstItem(this.sidebar).slug}`)
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