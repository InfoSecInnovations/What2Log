<template>
  <div id="w2l-container">
    <W2LHeader />
    <Navbar />
    <div id="container">
      <input id="sidebar-toggle-button" class="sidebar-toggle" type="checkbox" @input="resetScroll">
      <label for="sidebar-toggle-button" class="sidebar-toggle-label"><img src="/images/menu.svg" /></label>
      <div id="sidebar" v-if="sidebar">
        <div v-for="entry of orderedSidebar" :key="`sidebar-${entry.category}`">
          <input type="checkbox" :id="entry.category">
          <label :for="entry.category" class="top-level sidebar-element">{{entry.category}}</label>
          <NuxtLink :to="`/${$route.params.platform}/tools/${tool.slug}/`" @click.native="linkClick" v-for="tool of tools" :key="`sidebar-${entry.category}-${tool.slug}`" :class="`inner-level sidebar-element sidebar-list ${$route.params.tool == tool.slug ? 'selected' : ''}`">{{tool.title}}</NuxtLink>
        </div>
      </div>
      <NuxtChild />
    </div>
  </div>
</template>

<script>
import compareCategories from '~/assets/compareCategories'
export default {
  async asyncData({$content, app, params}) {
    const sidebarData = await $content(`${app.i18n.locale}/platforms/${params.platform}/tools`).sortBy('title').only(['operating_system', 'title', 'slug', 'category']).fetch()
    const platformInfo = await $content(`${app.i18n.locale}/platforms/${params.platform}/info`).only('category_ordering').fetch()
    const sidebar = sidebarData.reduce((result, data) => {
      if (!result[data.category]) result[data.category] = []
      result[data.category].push(data)
      return result
    }, {})
    return {
      sidebar,
      platformInfo
    }
  },
  async mounted () {
    if (!this.$route.params.tool) {
      this.$router.push(`/${this.$route.params.platform}/tools/${Object.values(this.sidebar)[0][0].slug}`)
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
    linkClick() {
      document.getElementById('sidebar-toggle-button').checked = false
    },
    resetScroll(e) {
      e.target.labels[0].scrollIntoView()
    }
  }
}
</script>