<template>
  <div id="navbar">
    <NuxtLink to="/logs/win10accountchanged">The Logs</NuxtLink>
    <NuxtLink to="/tools/win10note">Tools</Nuxtlink>
    <NuxtLink to="/about/">About Us</NuxtLink>
    <NuxtLink to="/logpile/">The Log Pile</NuxtLink>
    <NuxtLink to="/blog/">Log Blog</NuxtLink>
    <input v-model="query" type="search" autocomplete="off"/>
    <ul v-if="results.length" class="search-result-dropdown">
      <li v-for="result of results" :key="result.slug">
        <NuxtLink :to="result.path.replace(`${$i18n.locale}/`, '')" v-on:click.native="resetQuery">{{result.title}}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      results: []
    }
  },
  watch: {
    async query (query) {
      if (!query) {
        this.results = []
        return
      }

      this.results = await this.$content(`${this.$i18n.locale}`, {deep: true})
      .only('title', 'path', 'dir')
      .sortBy('createdAt', 'asc')
      .limit(12)
      .search(query)
      .fetch()
    }
  },
  methods: {
    resetQuery() {
      this.query = ''
      console.log('yes')
    }
  }
}
</script>
