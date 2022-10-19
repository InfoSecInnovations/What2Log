<template>
  <div id="w2l-container">
    <W2LHeader />
    <HomeNavbar/>
    <TagsPage ref="pageChild" dir="blog" contentDir="blog" :tags="tags"/>
  </div>
</template>

<script>
export default {
  head() {
    return { title: 'Tags' }
  },
  data() {
    return {
      tags: [],
      results: [],
      currentPage: 0,
      lastPage: 0,
      itemsPerPage: 10
    }
  },
  async asyncData({$content, app, params}) {
    return {
      tags: await $content(`${app.i18n.locale}/blog`, {deep: true})
      .only('tags')
      .fetch()
      .then(res => [...new Set(res.filter(item => item.tags && item.tags.length).map(item => item.tags).flat())])
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$refs.pageChild.routeUpdate(to)
    next()
  },
}
</script>