<template>
  <div id="w2l-container">
    <W2LHeader />
    <Navbar />
    <div id="container">
      <input id="sidebar-toggle-button" class="sidebar-toggle" type="checkbox" @input="resetScroll">
      <label for="sidebar-toggle-button" class="sidebar-toggle-label"><img src="/images/menu.svg" /></label>
      <div id="sidebar">
        <div v-for="(tools, category) of sidebar" :key="`sidebar-${category}`">
          <input type="checkbox" :id="category">
          <label :for="category" class="top-level sidebar-element">{{category}}</label>
          <NuxtLink :to="`/${$route.params.platform}/tools/${tool.slug}/`" @click.native="linkClick" v-for="tool of tools" :key="`sidebar-${category}-${tool.slug}`" :class="`inner-level sidebar-element sidebar-list ${$route.params.tool == tool.slug ? 'selected' : ''}`">{{tool.title}}</NuxtLink>
        </div>
      </div>
      <NuxtChild />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$content, app, params}) {
    const sidebarData = await $content(`${app.i18n.locale}/platforms/${params.platform}/tools`).sortBy('title').only(['operating_system', 'title', 'slug', 'category']).fetch()
    const sidebar = sidebarData.reduce((result, data) => {
      if (!result[data.category]) result[data.category] = []
      result[data.category].push(data)
      return result
    }, {})
    return {
      sidebar
    }
  },
  async mounted () {
    if (!this.$route.params.tool) {
      this.$router.push(`/${this.$route.params.platform}/tools/${Object.values(this.sidebar)[0][0].slug}`)
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