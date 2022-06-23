<template>
  <div id="w2l-container">
    <W2LHeader />
    <Navbar />
    <div id="container">
      <input id="sidebar-toggle-button" class="sidebar-toggle" type="checkbox" @input="resetScroll">
      <label for="sidebar-toggle-button" class="sidebar-toggle-label"><img src="/images/menu.svg" /></label>
      <div id="sidebar">
        <div v-for="(levels, category) of sidebar" :key="`sidebar-${category}`">
          <input type="checkbox" :id="category">
          <label :for="category" class="top-level sidebar-element">{{category}}</label>
          <div v-for="{logs, level} of sortLevels(levels)" :key="`sidebar-${category}-${level}`" class="sidebar-list">
            <input type="checkbox" :id="`${category}-${level}`">
            <label :for="`${category}-${level}`" class="mid-level sidebar-element">{{level}}</label>
            <NuxtLink v-for="log of logs" :key="`sidebar-${category}-${level}-${log.title}`" :to="`/${$route.params.platform}/logs/${log.slug}/`"  @click.native="linkClick"  :class="`inner-level sidebar-element sidebar-list ${$route.params.log == log.slug ? 'selected' : ''}`">{{log.title}}</NuxtLink>
          </div>
        </div>
      </div>
      <NuxtChild />
    </div>
  </div>
</template>

<script>
import compareLevels from '~/assets/compareLevels'
export default {
  async asyncData({$content, app, params}) {
    const sidebarData = await $content(`${app.i18n.locale}/platforms/${params.platform}/logs`).sortBy('title').only(['source', 'suggested_log_level', 'title', 'slug', 'category']).fetch()
    const sidebar = sidebarData.reduce((result, data) => {
      if (!result[data.category]) result[data.category] = {}
      if (!result[data.category][data.suggested_log_level]) result[data.category][data.suggested_log_level] = []
      result[data.category][data.suggested_log_level].push(data)
      return result
    }, {})
    return {
      sidebar
    }
  },
  async mounted () {
    if (!this.$route.params.log) {
      this.$router.push(`/${this.$route.params.platform}/logs/${Object.values(Object.values(this.sidebar)[0])[0][0].slug}`)
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