<template>
  <div id="w2l-container">
    <W2LHeader />
    <Navbar/>
    <div id="container">
      <div id="inner-container" class="logpile">
        <div class="title-block">
          <h1>{{platformName}}</h1>
          <div v-if="platformInfo.info" class="info">{{platformInfo.info}}</div>
          <div class="row">
            <div class="column" v-if="$config.platforms[$route.params.platform].includes('tools')">
              <NuxtLink :to="`/${$route.params.platform}/tools/`" class="button">Tools</NuxtLink>
              <p>Read about the various tools you can use with {{platformName}} to assist with logging.</p>
            </div>
            <div class="column">
              <NuxtLink to="/blog/" class="button">Log Blog</NuxtLink>
              <p>Get updates about what's going on at What2Log and read our thoughts about logging.</p>
            </div>
            <div class="column">
              <NuxtLink :to="`/${$route.params.platform}/tags/`" class="button">Browse Tags</NuxtLink>
              <p>Discover pages relating to {{platformName}} using the tag browser.</p>
            </div>
          </div>
          <div class="info">Below you can check all the logging commands you wish to use and get some convenient scripts you can copy paste or download. If you want more information about an item, just click on the label.</div>
        </div>
        <div class="logpile-menu" v-if="categories">
          <div class="logpile-row">
            <div class="button small" @click="reset">Reset Selection</div>
            <div v-for="scriptCategory of scriptCategories" class="logpile-header" :key="`script-category-label-${scriptCategory}`">{{`${scriptCategory[0].toUpperCase()}${scriptCategory.substring(1)}`}}</div>
          </div>
          <template v-for="entry of categories">
            <LogpileSelection :key="`logpile-selection-${entry.category}`" :baseUrl="`${$route.params.platform}/logs`" :content="entry" :topLevel="true" :platform="$route.params.platform" :category="entry.category" :scriptCategories="scriptCategories"/>
          </template>
        </div>
        <div class="button" id="scripts-button" v-on:click="getScripts"> Get My Script(s)!</div>
        <template v-if="results">
          <div class="info" v-if="!results.length">You must select at least one script!</div>
          <template v-else>
            <div class="info">Copy paste the scripts below or save them to a file.</div>
            <div class="script-block" v-for="script of results" :key="`${script.category}-${script.language}-${script.type}`">
              <div class="script-header">
                <div class="script-label">{{`${getScriptTypeDescription(script.type)} of selected items for ${script.category}. Language: ${script.language}`}}</div>  
                <div class="script-controls">
                <img class="icon-button" src='/images/copy.svg' v-on:click="copy(script.content)">             
                <a :href="getScriptBlob(script.content)" :download="getScriptName(script.languageKey, script.category, script.type)">
                  <img class="icon-button" src='/images/download.svg'>
                </a>
                </div>
              </div>
              <pre>{{script.content}}</pre>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import getScriptBlob from '~/assets/getScriptBlob'
import copyText from '~/assets/copyText'
import categorizeData from '~/assets/categorizeData'
export default {
  head() {
    return { title: (this.platformInfo && this.platformInfo.name) || '' }
  },
  data() {
    return {
      results: null
    }
  },
  async asyncData({$content, app, params}) {
    const logPath = `${app.i18n.locale}/platforms/${params.platform}/logs`
    const scriptData = await $content('/scripts').fetch().then(res => res.reduce((result, item) => ({...result, [item.name.toLowerCase()]: item}), {}))
    const logPages = await $content(logPath, {deep: true}).sortBy('title').only(['source', 'logging', 'slug', 'title', 'dir', 'splitPath']).fetch()
    const platformInfo = await $content(`${app.i18n.locale}/platforms/${params.platform}/info`).fetch()
    const langInfo = await $content(`${app.i18n.locale}/info`).fetch()
    const scriptCategories = [...new Set(logPages.filter(item => item.logging && item.logging.scripting && item.logging.scripting.tasks).map(item => Object.keys(item.logging.scripting.tasks)).flat())]
    return {
      categories: categorizeData(logPages, platformInfo && platformInfo.category_ordering && platformInfo.category_ordering.logs),
      scriptLookup: logPages.reduce((result, script) => ({...result, [script.slug]: script}), {}),
      scriptData,
      scriptCategories,
      platformInfo,
      langInfo
    }
  },
  watch: {
    results (val) {
      if (val) this.$nextTick(() => document.getElementById('scripts-button').scrollIntoView(true))
    }
  },
  computed: {
    platformName() {
      return (this.platformInfo && this.platformInfo.name) || this.$route.params.platform
    }
  },
  methods: {
    check(script_type, data, category, event) {
      if (data.slug) data = data.slug
      if (typeof data == 'string') return this.$store.commit('logpile/setScriptStatus', {category, slug: data, script_type, status: event.target.checked, platform: this.$route.params.platform})
      if (Array.isArray(data)) return data.forEach(script => this.check(script_type, script, category, event))
      Object.values(data).forEach(value => this.check(script_type, value, category, event))
    },
    reset(){
      this.$store.commit('logpile/reset')
    },
    checked(script_type, category, data) {
      if (data.slug) data = data.slug
      if (typeof data == 'string') return this.$store.getters['logpile/getScriptStatus']({category, slug: data, script_type, platform: this.$route.params.platform})
      if (Array.isArray(data)) return data.some(script => this.checked(script_type, category, script))
      return Object.values(data).some(value => this.checked(script_type, category, value))
    },
    indeterminate(script_type, category, data) {
      if (!this.checked(script_type, category, data)) return false
      if (Array.isArray(data)) return !data.every(script => this.checked(script_type, category, script))
      return !Object.values(data).every(value => this.checked(script_type, category, value) && !this.indeterminate(script_type, category, value))
    },
    getScripts() {
      this.results = this.categories
      .map(category => category.items.map(subcategory => subcategory.items.map(script => {
        const scripts = []
        const language = this.scriptLookup[script.slug].logging.scripting.language
        const languageKey = language.toLowerCase()
        const handleScript = script_type => {
          if (this.$store.getters['logpile/getScriptStatus']({category: category.category, slug: script.slug, script_type, platform: this.$route.params.platform})) scripts.push({
            content: this.scriptLookup[script.slug].logging.scripting.tasks[script_type], 
            category: category.category, 
            type: script_type, 
            language,
            languageKey
          })
        }
        this.scriptCategories.forEach(scriptCategory => handleScript(scriptCategory))
        return scripts
      })))
      .flat(4)
      .filter(item => item.content)
      .reduce((result, item) => {
        const entry = result.find(r => r.category == item.category && r.languageKey == item.languageKey && r.type == item.type)
        if (entry) entry.content = `${entry.content}\n\n${item.content}`
        else result.push(item)
        return result
      }, [])
      .map(item => {
        if (this.scriptData[item.languageKey] && this.scriptData[item.languageKey][item.type]) {
          if (this.scriptData[item.languageKey][item.type].header) item.content = `${this.scriptData[item.languageKey][item.type].header}\n\n${item.content}`
          if (this.scriptData[item.languageKey][item.type].footer) item.content = `${item.content}\n\n${this.scriptData[item.languageKey][item.type].footer}`
        }
        return item
      })
    },
    copy(script) {
      copyText(script)
    },
    getScriptBlob(script) {
      return getScriptBlob(script)
    },
    getScriptName(languageKey, category, script_type) {
      return `what2log-${script_type}-${category.replace(/\s/g, '').toLowerCase()}${(this.scriptData[languageKey] && this.scriptData[languageKey].file_extension) || '.txt'}`
    },
    getScriptTypeDescription(script_type) {
      return this.langInfo.script_task_long_names[script_type] || `${script_type[0].toUpperCase()}${script_type.substring(1)}`
    }
  }
}
</script>