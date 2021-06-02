<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="sidebar">
        <div v-for="(top_value, top_key) of sidebar" :key="top_key">
          <input type="checkbox" :id="top_key">
          <label :for="top_key" class="top-level sidebar-element">{{top_key}}</label>
          <div v-for="(mid_value, mid_key) of top_value" :key="`${top_key}-${mid_key}`" class="sidebar-list">
            <input type="checkbox" :id="`${top_key}-${mid_key}`">
            <label :for="`${top_key}-${mid_key}`" class="mid-level sidebar-element">{{mid_key}}</label>
            <NuxtLink :to="item.slug" v-for="item of mid_value" :key="`${top_key}-${mid_key}-${item.title}`" class="inner-level sidebar-element sidebar-list">{{item.title}}</NuxtLink>
          </div>
        </div>
      </div>
      <NuxtChild />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const { $content, app, params} = context;
    const sidebarData = await $content(`${app.i18n.locale}/logs`).only(['source', 'suggested_log_level', 'title', 'slug']).fetch()
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
  }
}
</script>

<style lang="stylus">
  @require '~/assets/main.styl'
</style>