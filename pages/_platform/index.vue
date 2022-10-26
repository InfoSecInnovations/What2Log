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
            <div class="logpile-header">Enable</div>
            <div class="logpile-header">Disable</div>
            <div class="logpile-header">View</div>
            <div class="logpile-header">Check</div>
          </div>
          <template v-for="entry of categories">
            <div class="logpile-row top-level" :key="entry.category">
              <div class="logpile-category">{{entry.category}}</div>
              <input type="checkbox" v-if="Object.values(entry.items).some(level => level.items.some(script => scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.enable))" v-on:change="check('enable', entry.items, entry.category, $event)" :checked="checked('enable', entry.category, entry.items)" :indeterminate.prop="indeterminate('enable', entry.category, entry.items)">
              <div v-else></div>
              <input type="checkbox" v-if="Object.values(entry.items).some(level => level.items.some(script => scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.disable))" v-on:change="check('disable', entry.items, entry.category, $event)" :checked="checked('disable', entry.category, entry.items)" :indeterminate.prop="indeterminate('disable', entry.category, entry.items)">
              <div v-else></div>
              <input type="checkbox" v-if="Object.values(entry.items).some(level => level.items.some(script => scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.view))" v-on:change="check('view', entry.items, entry.category, $event)" :checked="checked('view', entry.category, entry.items)" :indeterminate.prop="indeterminate('view', entry.category, entry.items)">
              <div v-else></div>
              <input type="checkbox" v-if="Object.values(entry.items).some(level => level.items.some(script => scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.check))" v-on:change="check('check', entry.items, entry.category, $event)" :checked="checked('check', entry.category, entry.items)" :indeterminate.prop="indeterminate('check', entry.category, entry.items)">
              <div v-else></div>
            </div>
            <template v-for="subcategory of entry.items">
              <div class="logpile-row second-level" :key="`${entry.category}-${subcategory.category}`">
                <div class="logpile-category">{{subcategory.category}}</div>
                <input type="checkbox" v-if="subcategory.items.some(script => scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.enable)" v-on:change="check('enable', subcategory.items, entry.category, $event)" :checked="checked('enable', entry.category, subcategory.items)" :indeterminate.prop="indeterminate('enable', entry.category, subcategory.items)">
                <div v-else></div>
                <input type="checkbox" v-if="subcategory.items.some(script => scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.disable)" v-on:change="check('disable', subcategory.items, entry.category, $event)" :checked="checked('disable', entry.category, subcategory.items)" :indeterminate.prop="indeterminate('disable', entry.category, subcategory.items)">
                <div v-else></div>
                <input type="checkbox" v-if="subcategory.items.some(script => scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.view)" v-on:change="check('view', subcategory.items, entry.category, $event)" :checked="checked('view', entry.category, subcategory.items)" :indeterminate.prop="indeterminate('view', entry.category, subcategory.items)">
                <div v-else></div>
                <input type="checkbox" v-if="subcategory.items.some(script => scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.check)" v-on:change="check('check', subcategory.items, entry.category, $event)" :checked="checked('check', entry.category, subcategory.items)" :indeterminate.prop="indeterminate('check', entry.category, subcategory.items)">
                <div v-else></div>
              </div>
              <template v-for="script of subcategory.items">
                <div class="logpile-row child" :key="`${entry.category}-${subcategory.category}-${script.slug}`">
                  <NuxtLink class="logpile-category" :to="`/${$route.params.platform}/logs/${scriptLookup[script.slug].slug}/`">{{scriptLookup[script.slug].title}}</NuxtLink>
                  <input type="checkbox" v-if="scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.enable" v-on:change="check('enable', script.slug, entry.category, $event)" :checked="checked('enable', entry.category, script.slug)">
                  <div v-else></div>
                  <input type="checkbox" v-if="scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.disable" v-on:change="check('disable', script.slug, entry.category, $event)" :checked="checked('disable', entry.category, script.slug)">
                  <div v-else></div>
                  <input type="checkbox" v-if="scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.view" v-on:change="check('view', script.slug, entry.category, $event)" :checked="checked('view', entry.category, script.slug)">
                  <div v-else></div>
                  <input type="checkbox" v-if="scriptLookup[script.slug].scripting && scriptLookup[script.slug].scripting.tasks && scriptLookup[script.slug].scripting.tasks.check" v-on:change="check('check', script.slug, entry.category, $event)" :checked="checked('check', entry.category, script.slug)">
                  <div v-else></div>
                </div>
              </template>
            </template>
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
    const log = await $content(logPath, {deep: true}).sortBy('title').only(['source', 'scripting', 'slug', 'title', 'category', 'dir', 'splitPath']).fetch()
    const platformInfo = await $content(`${app.i18n.locale}/platforms/${params.platform}/info`).fetch()
    return {
      categories: categorizeData(log, platformInfo && platformInfo.category_ordering && platformInfo.category_ordering.logs),
      scriptLookup: log.reduce((result, script) => ({...result, [script.slug]: script}), {}),
      scriptData,
      platformInfo
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
        const language = this.scriptLookup[script.slug].scripting.language
        const languageKey = language.toLowerCase()
        const handleScript = script_type => {
          if (this.$store.getters['logpile/getScriptStatus']({category: category.category, slug: script.slug, script_type, platform: this.$route.params.platform})) scripts.push({
            content: this.scriptLookup[script.slug].scripting.tasks[script_type], 
            category: category.category, 
            type: script_type, 
            language,
            languageKey
          })
        }
        handleScript('enable')
        handleScript('disable')
        handleScript('view')
        handleScript('check')
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
      if (script_type == 'enable') return 'Enable logging'
      if (script_type == 'disable') return 'Disable logging'
      if (script_type == 'view') return 'View logs'
      return 'Check logging status'
    }
  }
}
</script>