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
import compareLevels from '~/assets/compareLevels'
import compareCategories from '~/assets/compareCategories'
import categorizeData from '~/assets/categorizeData'
export default {
  async asyncData({$content, app, params}) {
    const logPath = `${app.i18n.locale}/platforms/${params.platform}/logs`
    const sidebarData = await $content(logPath, {deep: true}).sortBy('title').only(['source', 'title', 'dir', 'slug']).fetch().then(items => items.map(item => ({...item, path: item.dir.replace(`/${logPath}/`, '').split('/')})))
    const platformInfo = await $content(`${app.i18n.locale}/platforms/${params.platform}/info`).fetch()
    const sidebar = categorizeData(sidebarData)
    console.log(sidebar)
    return {
      baseUrl: logPath,
      sidebar,
      platformInfo
    }
  },
  async mounted () {
    if (!this.$route.params.log) {
      this.$router.push(`/${this.$route.params.platform}/logs/${Object.values(Object.values(this.sidebar)[0])[0][0].slug}`)
    } 
  },
  computed: {
    orderedSidebar() {
      return Object.entries(this.sidebar)
      .sort(
        ([categoryA, itemsA], [categoryB, itemsB]) => compareCategories(categoryA, categoryB, this.platformInfo && this.platformInfo.category_ordering)
      )
      .map(([category, items]) => ({category, items}))
    }
  },
  methods: {
    sortLevels(levels) { 
      return Object.entries(levels).sort((a, b) => compareLevels(a[0], b[0])).map(level => ({level: level[0], logs: level[1]})) 
    },
    linkClick() {
      document.getElementById('sidebar-toggle-button').checked = false
    },
    resetScroll(e) {
      e.target.labels[0].scrollIntoView()
    }
  }
}
</script>