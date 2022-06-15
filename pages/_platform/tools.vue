<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <input id="sidebar-toggle-button" class="sidebar-toggle" type="checkbox" @input="resetScroll">
      <label for="sidebar-toggle-button" class="sidebar-toggle-label"><img src="/images/menu.svg" /></label>
      <div id="sidebar">
        <div v-for="(tools, os) of sidebar" :key="os">
          <input type="checkbox" :id="os">
          <label :for="os" class="top-level sidebar-element">{{os}}</label>
          <NuxtLink :to="`/${$route.params.platform}/tools/${tool.slug}/`" @click.native="linkClick" v-for="tool of tools" :key="`${os}-${tool.title}`" :class="`inner-level sidebar-element sidebar-list ${$route.params.tool == tool.slug ? 'selected' : ''}`">{{tool.title}}</NuxtLink>
        </div>
      </div>
      <NuxtChild />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$content, app, params}) {
    const sidebarData = await $content(`${app.i18n.locale}/platforms/${params.platform}/tools`).sortBy('title').only(['operating_system', 'title', 'slug']).fetch()
    const sidebar = sidebarData.reduce((result, data) => {
      data.operating_system.forEach(os => {
        if (!result[os]) result[os] = []
        result[os].push(data)
      })
      return result
    }, {})
    if (!params.tool) app.router.push(`/${params.platform}/tools/${sidebarData[0].slug}`)
    return {
      sidebar
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