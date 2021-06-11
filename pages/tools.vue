<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="sidebar">
        <div v-for="(tools, os) of sidebar" :key="os">
          <input type="checkbox" :id="os" checked="true">
          <label :for="os" class="top-level sidebar-element">{{os}}</label>
          <NuxtLink :to="`/tools/${tool.slug}/`" v-for="tool of tools" :key="`${os}-${tool.title}`" :class="`inner-level sidebar-element sidebar-list ${$route.params.tool == tool.slug ? 'selected' : ''}`">{{tool.title}}</NuxtLink>
        </div>
      </div>
      <NuxtChild />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$content, app}) {
    const sidebarData = await $content(`${app.i18n.locale}/tools`).sortBy('title').only(['operating_system', 'title', 'slug']).fetch()
    const sidebar = sidebarData.reduce((result, data) => {
      data.operating_system.forEach(os => {
        if (!result[os]) result[os] = []
        result[os].push(data)
      })
      return result
    }, {})
    return {
      sidebar
    }
  },
}
</script>