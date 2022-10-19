<template>
  <div id="container">
    <div id="inner-container">
      <div class="page-feed">
        <h1>Browse Tags</h1>
        <Tags :tags="tags"  :dir="dir"/>
        <h2 v-if="$route.query.query">{{$route.query.query}}</h2>
        <div class="search-results">
          <PageCard v-for="result of results" :key="result.path" :article="result" :link="`/${dir}/${result.group ? `${result.group}/` : ''}${result.slug}`"/>
        </div>
        <div v-if="lastPage" class="feed-nav">
          <div v-if="currentPage < lastPage" v-on:click="setPage(currentPage + 1)" class="nav-link">Previous</div>
          <div v-if="currentPage > 0" v-on:click="setPage(currentPage - 1)" class="nav-link">Next</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: [],
      currentPage: 0,
      lastPage: 0,
      itemsPerPage: 10
    }
  },
  props: ["dir", "contentDir", "tags"],
  methods: {
    async updateSearch(query) {
      if (!query) {
        this.results = []
        this.lastPage = 0
        this.currentPage = 0
        return
      }
      const search = this.$content(`${this.$i18n.locale}/${this.contentDir}`, {deep: true})
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
    },
    routeUpdate (to) {
      this.updateSearch(to.query.query)
    }
  },
  watch: {
    currentPage(value) {
      this.updateSearch(this.$route.query.query)
    }
  },
  created() {
    this.updateSearch(this.$route.query.query)
  }
}
</script>