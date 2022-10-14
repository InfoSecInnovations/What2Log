<template>
  <div id="w2l-container">
    <W2LHeader />
    <Navbar :platform="(platformInfo && platformInfo.name) || $route.params.platform" />
    <div id="container">
      <input id="sidebar-toggle-button" class="sidebar-toggle" type="checkbox" @input="resetScroll">
      <label for="sidebar-toggle-button" class="sidebar-toggle-label"><img src="/images/menu.svg" /></label>
      <div id="sidebar" v-if="sidebar">
        <div v-for="entry of orderedSidebar" :key="`sidebar-${entry.category}`">
          <input type="checkbox" :id="entry.category">
          <label :for="entry.category" class="top-level sidebar-element">{{entry.category}}</label>
          <div v-for="{logs, level} of sortLevels(entry.items)" :key="`sidebar-${entry.category}-${level}`" class="sidebar-list">
            <input type="checkbox" :id="`${entry.category}-${level}`">
            <label :for="`${entry.category}-${level}`" class="mid-level sidebar-element">{{level}}</label>
            <NuxtLink v-for="log of logs" :key="`sidebar-${entry.category}-${level}-${log.slug}`" :to="`/${$route.params.platform}/logs/${log.slug}/`"  @click.native="linkClick"  :class="`inner-level sidebar-element sidebar-list ${$route.params.log == log.slug ? 'selected' : ''}`">{{log.title}}</NuxtLink>
          </div>
        </div>
      </div>
      <NuxtChild />
    </div>
  </div>
</template>

<script>
import compareLevels from '~/assets/compareLevels'
import compareCategories from '~/assets/compareCategories'
export default {
  async asyncData({$content, app, params}) {
    const logPath = `${app.i18n.locale}/platforms/${params.platform}/logs`
    const sidebarData = await $content(logPath, {deep: true}).sortBy('title').only(['source', 'title', 'dir', 'slug']).fetch()
    const platformInfo = await $content(`${app.i18n.locale}/platforms/${params.platform}/info`).fetch()
    const sidebar = sidebarData.reduce((result, data) => {
      console.log(data.dir)
      const path = data.dir.replace(`/${logPath}/`, '').split('/')
      console.log(path)
      let currentObj = result
      path.forEach((p, i, arr) => {
        if (!currentObj[p]) currentObj[p] = i < arr.length - 1 ? {} : []
        currentObj = currentObj[p] 
      })
      currentObj.push(data)
      return result
    }, {})
    console.log(sidebar)
    return {
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