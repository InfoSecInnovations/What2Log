<template>
  <div id="navbar">
    <NuxtLink v-if="platform" :to="`/${$route.params.platform}/`">Back to {{platform}}</NuxtLink>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink v-for="group of $config.platforms[$route.params.platform].filter(group => group != 'logs')" :key="group" :to="`/${$route.params.platform}/${group}/`">{{`${group[0].toUpperCase()}${group.substring(1)}`}}</NuxtLink>
    <NuxtLink to="/about/">About Us</NuxtLink>
    <NuxtLink to="/blog/">Log Blog</NuxtLink>
    <input v-model="query" type="search" autocomplete="off" v-on:click.stop="searchFocus = !searchFocus" v-on:keyup="onEnter"/>
    <ul class="search-result-dropdown" v-if="searchFocus" id="result-dropdown">
      <li v-for="result of results" :key="result.path">
        <NuxtLink :to="result.path.replace(`${$i18n.locale}/platforms/`, '')" v-on:click.native="resetQuery">
          <p>{{result.title}}</p>
          <p class="search-meta">{{`${result.dir.endsWith('logs') ? `${result.source.os.join(' / ')} Logs` : `${result.operating_system.join('/ ')} Tools`}`}}</p>
        </NuxtLink>
      </li>
      <li v-if="results.length">
        <NuxtLink :to="{path: `/${$route.params.platform}/search`, query: { query }}" v-on:click.native="resetQuery">See all results...</NuxtLink>  
      </li>
      <li>
        <NuxtLink :to="`/${$route.params.platform}/tags`" v-on:click.native="resetQuery">Browse tags...</NuxtLink>  
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['platform'],
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

      this.results = await this.$content(`${this.$i18n.locale}/platforms/${this.$route.params.platform}`, {deep: true})
      .where({dir: {$in: [`/${this.$i18n.locale}/platforms/${this.$route.params.platform}/logs`, `/${this.$i18n.locale}/platforms/${this.$route.params.platform}/tools`]}})
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
    },
    onEnter(e) {
      if (e.key == 'Enter') {
        if (this.query) this.$router.push({path: '/search', query: { query: this.query }})
        else this.$router.push("/tags")
        this.resetQuery()
      } 
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      this.searchFocus = false
    })
  }
}
</script>
