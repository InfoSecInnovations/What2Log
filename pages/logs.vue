<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="sidebar">
        <div v-for="(levels, os) of sidebar" :key="os">
          <input type="checkbox" :id="os">
          <label :for="os" class="top-level sidebar-element">{{os}}</label>
          <div v-for="{scripts, level} of sortLevels(levels)" :key="`${os}-${level}`" class="sidebar-list">
            <input type="checkbox" :id="`${os}-${level}`">
            <label :for="`${os}-${level}`" class="mid-level sidebar-element">{{level}}</label>
            <NuxtLink :to="`/logs/${script.slug}/`" v-for="script of scripts" :key="`${os}-${level}-${script.title}`" class="inner-level sidebar-element sidebar-list">{{script.title}}</NuxtLink>
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
  async asyncData({$content, app}) {
    const sidebarData = await $content(`${app.i18n.locale}/logs`).sortBy('title').only(['source', 'suggested_log_level', 'title', 'slug']).fetch()
    const sidebar = sidebarData.reduce((result, data) => {
      data.source.os.forEach(os => {
        if (!result[os]) result[os] = {}
        if (!result[os][data.suggested_log_level]) result[os][data.suggested_log_level] = []
        result[os][data.suggested_log_level].push(data)
      })
      return result
    }, {})
    return {
      sidebar
    }
  },
  methods: {
    sortLevels(levels) { 
      return Object.entries(levels).sort((a, b) => compareLevels(a[0], b[0])).map(level => ({level: level[0], scripts: level[1]})) 
    }
  }
}
</script>