<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="sidebar">
        <div v-for="(levels, os) of sidebar" :key="os">
          <input type="checkbox" :id="os">
          <label :for="os" class="top-level sidebar-element">{{os}}</label>
          <div v-for="{logs, level} of sortLevels(levels)" :key="`${os}-${level}`" class="sidebar-list">
            <input type="checkbox" :id="`${os}-${level}`">
            <label :for="`${os}-${level}`" class="mid-level sidebar-element">{{level}}</label>
            <NuxtLink :to="`/${$route.params.platform}/logs/${log.slug}/`" v-for="log of logs" :key="`${os}-${level}-${log.title}`" :class="`inner-level sidebar-element sidebar-list ${$route.params.log == log.slug ? 'selected' : ''}`">{{log.title}}</NuxtLink>
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
    const sidebarData = await $content(`${app.i18n.locale}/platforms/${params.platform}/logs`).sortBy('title').only(['source', 'suggested_log_level', 'title', 'slug']).fetch()
    const sidebar = sidebarData.reduce((result, data) => {
      data.source.os.forEach(os => {
        if (!result[os]) result[os] = {}
        if (!result[os][data.suggested_log_level]) result[os][data.suggested_log_level] = []
        result[os][data.suggested_log_level].push(data)
      })
      return result
    }, {})
    if (!params.log) app.router.push(`/${params.platform}/logs/${sidebarData[0].slug}`)
    return {
      sidebar
    }
  },
  methods: {
    sortLevels(levels) { 
      return Object.entries(levels).sort((a, b) => compareLevels(a[0], b[0])).map(level => ({level: level[0], logs: level[1]})) 
    }
  }
}
</script>