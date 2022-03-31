<template>
  <div id="navbar">
    <NuxtLink to="/logs/win10accountchanged">The Logs</NuxtLink>
    <NuxtLink to="/tools/win10note">Tools</Nuxtlink>
    <NuxtLink to="/about/">About Us</NuxtLink>
    <NuxtLink to="/logpile/">The Log Pile</NuxtLink>
    <NuxtLink to="/blog/">Log Blog</NuxtLink>
    <input v-model="query" type="search" autocomplete="off" v-on:click.stop="searchFocus = !searchFocus"/>
    <ul class="search-result-dropdown" v-if="searchFocus" id="result-dropdown">
      <li v-for="result of results" :key="result.path">
        <NuxtLink :to="result.path.replace(`${$i18n.locale}/`, '')" v-on:click.native="resetQuery">
          <p>{{result.title}}</p>
          <p class="search-meta">{{`${result.dir.endsWith('logs') ? `${result.source.os.join(' / ')} Logs` : `${result.operating_system.join('/ ')} Tools`}`}}</p>
        </NuxtLink>
      </li>
      <li v-if="results.length">
        <NuxtLink :to="{path: '/search', query: { query }}" v-on:click.native="resetQuery">See all results...</NuxtLink>  
      </li>
      <li>
        <NuxtLink to="/tags" v-on:click.native="resetQuery">Browse tags...</NuxtLink>  
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      results: [],
      searchFocus: false
    }
  },
  watch: {
    async query (query) {
      if (!query) {
        this.results = []
        return
      }

      this.results = await this.$content(`${this.$i18n.locale}`, {deep: true})
      .where({dir: {$in: [`/${this.$i18n.locale}/logs`, `/${this.$i18n.locale}/tools`]}})
      .sortBy('createdAt', 'asc')
      .limit(12)
      .search(query)
      .fetch()

    }
  },
  methods: {
    resetQuery() {
      this.query = ''
      this.searchFocus = false
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      this.searchFocus = false
    })
  }
}
</script>
