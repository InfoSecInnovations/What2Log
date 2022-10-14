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
            <div class="column">
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
          <template v-for="entry of orderedCategories">
            <div class="logpile-row top-level" :key="entry.category">
              <div class="logpile-category">{{entry.category}}</div>
              <input type="checkbox" v-if="Object.values(entry.items).some(level => level.some(script => scriptLookup[script].log_pile && scriptLookup[script].log_pile.enable_logging))" v-on:change="check('enable', entry.items, entry.category, $event)" :checked="checked('enable', entry.category, entry.items)" :indeterminate.prop="indeterminate('enable', entry.category, entry.items)">
              <div v-else></div>
              <input type="checkbox" v-if="Object.values(entry.items).some(level => level.some(script => scriptLookup[script].log_pile && scriptLookup[script].log_pile.disable_logging))" v-on:change="check('disable', entry.items, entry.category, $event)" :checked="checked('disable', entry.category, entry.items)" :indeterminate.prop="indeterminate('disable', entry.category, entry.items)">
              <div v-else></div>
              <input type="checkbox" v-if="Object.values(entry.items).some(level => level.some(script => scriptLookup[script].log_pile && scriptLookup[script].log_pile.view_logs))" v-on:change="check('view', entry.items, entry.category, $event)" :checked="checked('view', entry.category, entry.items)" :indeterminate.prop="indeterminate('view', entry.category, entry.items)">
              <div v-else></div>
              <input type="checkbox" v-if="Object.values(entry.items).some(level => level.some(script => scriptLookup[script].log_pile && scriptLookup[script].log_pile.check_status))" v-on:change="check('check', entry.items, entry.category, $event)" :checked="checked('check', entry.category, entry.items)" :indeterminate.prop="indeterminate('check', entry.category, entry.items)">
              <div v-else></div>
            </div>
            <template v-for="{level, scripts} of sortLevels(entry.items)">
              <div class="logpile-row second-level" :key="`${entry.category}-${level}`">
                <div class="logpile-category">{{level}}</div>
                <input type="checkbox" v-if="scripts.some(script => scriptLookup[script].log_pile && scriptLookup[script].log_pile.enable_logging)" v-on:change="check('enable', scripts, entry.category, $event)" :checked="checked('enable', entry.category, scripts)" :indeterminate.prop="indeterminate('enable', entry.category, scripts)">
                <div v-else></div>
                <input type="checkbox" v-if="scripts.some(script => scriptLookup[script].log_pile && scriptLookup[script].log_pile.disable_logging)" v-on:change="check('disable', scripts, entry.category, $event)" :checked="checked('disable', entry.category, scripts)" :indeterminate.prop="indeterminate('disable', entry.category, scripts)">
                <div v-else></div>
                <input type="checkbox" v-if="scripts.some(script => scriptLookup[script].log_pile && scriptLookup[script].log_pile.view_logs)" v-on:change="check('view', scripts, entry.category, $event)" :checked="checked('view', entry.category, scripts)" :indeterminate.prop="indeterminate('view', entry.category, scripts)">
                <div v-else></div>
                <input type="checkbox" v-if="scripts.some(script => scriptLookup[script].log_pile && scriptLookup[script].log_pile.check_status)" v-on:change="check('check', scripts, entry.category, $event)" :checked="checked('check', entry.category, scripts)" :indeterminate.prop="indeterminate('check', entry.category, scripts)">
                <div v-else></div>
              </div>
              <template v-for="script of scripts">
                <div class="logpile-row child" :key="`${entry.category}-${level}-${script}`">
                  <NuxtLink class="logpile-category" :to="`/${$route.params.platform}/logs/${scriptLookup[script].slug}/`">{{scriptLookup[script].title}}</NuxtLink>
                  <input type="checkbox" v-if="scriptLookup[script].log_pile && scriptLookup[script].log_pile.enable_logging" v-on:change="check('enable', script, entry.category, $event)" :checked="checked('enable', entry.category, script)">
                  <div v-else></div>
                  <input type="checkbox" v-if="scriptLookup[script].log_pile && scriptLookup[script].log_pile.disable_logging" v-on:change="check('disable', script, entry.category, $event)" :checked="checked('disable', entry.category, script)">
                  <div v-else></div>
                  <input type="checkbox" v-if="scriptLookup[script].log_pile && scriptLookup[script].log_pile.view_logs" v-on:change="check('view', script, entry.category, $event)" :checked="checked('view', entry.category, script)">
                  <div v-else></div>
                  <input type="checkbox" v-if="scriptLookup[script].log_pile && scriptLookup[script].log_pile.check_status" v-on:change="check('check', script, entry.category, $event)" :checked="checked('check', entry.category, script)">
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
import compareLevels from '~/assets/compareLevels'
import compareCategories from '~/assets/compareCategories'
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
    const log = await $content(logPath, {deep: true}).sortBy('title').only(['source', 'log_pile', 'slug', 'title', 'category', 'dir']).fetch()
    const platformInfo = await $content(`${app.i18n.locale}/platforms/${params.platform}/info`).fetch()
    return {
      categories: log.reduce((result, script) => {
        const path = script.dir.replace(`/${logPath}/`, '').split('/')
        let currentObj = result
        path.forEach((p, i, arr) => {
          if (!currentObj[p]) currentObj[p] = i < arr.length - 1 ? {} : []
          currentObj = currentObj[p] 
        })
        currentObj.push(script.slug)
        return result
      }, {}),
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
    orderedCategories() {
      return Object.entries(this.categories)
      .sort(
        ([categoryA, itemsA], [categoryB, itemsB]) => compareCategories(categoryA, categoryB, this.platformInfo && this.platformInfo.category_ordering)
      )
      .map(([category, items]) => ({category, items}))
    },
    platformName() {
      return (this.platformInfo && this.platformInfo.name) || this.$route.params.platform
    }
  },
  methods: {
    check(script_type, data, category, event) {
      if (typeof data == 'string') return this.$store.commit('logpile/setScriptStatus', {category, slug: data, script_type, status: event.target.checked})
      if (Array.isArray(data)) return data.forEach(script => this.check(script_type, script, category, event))
      Object.values(data).forEach(value => this.check(script_type, value, category, event))
    },
    reset(){
      this.$store.commit('logpile/reset')
    },
    checked(script_type, category, data) {
      if (typeof data == 'string') return this.$store.getters['logpile/getScriptStatus'](category, data, script_type)
      if (Array.isArray(data)) return data.some(script => this.checked(script_type, category, script))
      return Object.values(data).some(value => this.checked(script_type, category, value))
    },
    indeterminate(script_type, category, data) {
      if (!this.checked(script_type, category, data)) return false
      if (Array.isArray(data)) return !data.every(script => this.checked(script_type, category, script))
      return !Object.values(data).every(value => this.checked(script_type, category, value) && !this.indeterminate(script_type, category, value))
    },
    sortLevels(levels) { 
      return Object.entries(levels).sort((a, b) => compareLevels(a[0], b[0])).map(level => ({level: level[0], scripts: level[1]})) 
    },
    getScripts() {
      this.results = Object.entries(this.categories)
      .sort(([categoryA, itemsA], [categoryB, itemsB]) => compareCategories(categoryA, categoryB, this.platformInfo && this.platformInfo.category_ordering))
      .map(([category, categoryItems]) => Object.values(categoryItems).map(level => level.map(script => {
        const scripts = []
        const language = this.scriptLookup[script].log_pile.language
        const languageKey = language.toLowerCase()
        const handleScript = script_type => {
          if (this.$store.getters['logpile/getScriptStatus'](category, script, script_type)) scripts.push({
            content: this.scriptLookup[script].log_pile[script_type == 'enable' ? 'enable_logging' : script_type == 'disable' ? 'disable_logging' : script_type == 'view' ? 'view_logs' : 'check_status'], 
            category, 
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