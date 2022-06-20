<template>
  <div v-if="pages && pages.length" class="page-feed">
    <h2>{{title}}</h2>
    <div class="blog-posts">
      <PageCard v-for="page of pages" :key="page.slug" :article="page" :link="`/${page.dir.replace(`/${$i18n.locale}/platforms/`, '')}/${page.slug}/`" />
    </div>
    <div v-if="lastPage" class="feed-nav">
      <div v-if="currentPage < lastPage" v-on:click="setPage(currentPage + 1)" class="nav-link">Previous</div>
      <div v-if="currentPage > 0" v-on:click="setPage(currentPage - 1)" class="nav-link">Next</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['directory', 'items_per_page', 'query', 'title'],
  data () {
    return {
      currentPage: 0,
      lastPage: 0,
      pages: []
    }
  },
  async fetch() {
    let query = this.$content(`${this.$i18n.locale}`, {deep: true})
    if (this.query) query = query.where(this.query).where({'dir': {$regex: `\/${this.directory}$`}})
    this.lastPage = await query.fetch().then(res => Math.floor((res.length - 1) / this.items_per_page))
    query = query.sortBy('createdAt', 'desc').skip(this.currentPage * this.items_per_page).limit(this.items_per_page)
    this.pages = await query.fetch()
    console.log(this.pages)
  },
  watch: {
    currentPage(value) {
      this.$fetch()
    }
  },
  methods: {
    setPage(number) {
      this.currentPage = number
    }
  }
}
</script>