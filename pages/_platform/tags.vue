<template>
  <div id="w2l-container">
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="inner-container">
        <div class="page-feed">
          <h1>Browse Tags</h1>
          <Tags :tags="tags"/>
          <div class="search-results">
            <PageCard v-for="result of results" :key="result.path" :article="result" :link="result.path.replace(`${$i18n.locale}/platforms/`, '')"/>
          </div>
          <div v-if="lastPage" class="feed-nav">
            <div v-if="currentPage < lastPage" v-on:click="setPage(currentPage + 1)" class="nav-link">Previous</div>
            <div v-if="currentPage > 0" v-on:click="setPage(currentPage - 1)" class="nav-link">Next</div>
          </div>
        </div>
      </div>
    </div>
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
      tags: await $content(`${app.i18n.locale}/platforms/${params.platform}`, {deep: true})
      .where({dir: {$in: [`/${app.i18n.locale}/platforms/${params.platform}/logs`, `/${app.i18n.locale}/platforms/${params.platform}/tools`]}})
      .only('tags')
      .fetch()
      .then(res => [...new Set(res.filter(item => item.tags && item.tags.length).map(item => item.tags).flat())])
    }
  },
  methods: {
    async updateSearch(query) {
      if (!query) {
        this.results = []
        this.lastPage = 0
        this.currentPage = 0
        return
      }
      const search = this.$content(`${this.$i18n.locale}/platforms/${this.$route.params.platform}`, {deep: true})
      .where({dir: {$in: [`/${this.$i18n.locale}/platforms/${this.$route.params.platform}/logs`, `/${this.$i18n.locale}/platforms/${this.$route.params.platform}/tools`]}})
      .where({tags: {$contains: query}})
      this.lastPage = await search.fetch().then(res => Math.floor((res.length - 1) / this.itemsPerPage))
      this.results = await search
      .sortBy('createdAt', 'asc')
      .skip(this.currentPage * this.itemsPerPage)
      .limit(this.itemsPerPage)
      .fetch()
    },
    setPage(number) {
      this.currentPage = number
    }
  },
  watch: {
    currentPage(value) {
      this.updateSearch(this.$route.query.query)
    }
  },
  created() {
    this.updateSearch(this.$route.query.query)
  },
  beforeRouteUpdate (to, from, next) {
    this.updateSearch(to.query.query);
    next();
  }
}
</script>