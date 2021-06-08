<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="inner-container" class="logpile">
        <div class="title-block">
          <h1>The Log Pile</h1>
          <div class="info">Select the scripts you wish to run. You can also add to this selection from the relevant pages.</div>
        </div>
        <div class="logpile-menu">
          <div class="logpile-row">
            <div class="logpile-header"></div>
            <div class="logpile-header">Enable</div>
            <div class="logpile-header">Disable</div>
            <div class="logpile-header">View</div>
            <div class="logpile-header">Check</div>
          </div>
          <template v-for="(levels, os) of categories">
            <div class="logpile-row top-level" :key="os">
              <div class="logpile-category">{{os}}</div>
              <input type="checkbox" v-on:change="check('enable', levels, os, $event)" :checked="checked('enable', os, levels)" :indeterminate.prop="indeterminate('enable', os, levels)">
              <input type="checkbox" v-on:change="check('disable', levels, os, $event)" :checked="checked('disable', os, levels)" :indeterminate.prop="indeterminate('disable', os, levels)">
              <input type="checkbox" v-on:change="check('view', levels, os, $event)" :checked="checked('view', os, levels)" :indeterminate.prop="indeterminate('view', os, levels)">
              <input type="checkbox" v-on:change="check('check', levels, os, $event)" :checked="checked('check', os, levels)" :indeterminate.prop="indeterminate('check', os, levels)">
            </div>
            <template v-for="{level, scripts} of sortLevels(levels)">
              <div class="logpile-row second-level" :key="`${os}-${level}`">
                <div class="logpile-category">{{level}}</div>
                <input type="checkbox" v-on:change="check('enable', scripts, os, $event)" :checked="checked('enable', os, scripts)" :indeterminate.prop="indeterminate('enable', os, scripts)">
                <input type="checkbox" v-on:change="check('disable', scripts, os, $event)" :checked="checked('disable', os, scripts)" :indeterminate.prop="indeterminate('disable', os, scripts)">
                <input type="checkbox" v-on:change="check('view', scripts, os, $event)" :checked="checked('view', os, scripts)" :indeterminate.prop="indeterminate('view', os, scripts)">
                <input type="checkbox" v-on:change="check('check', scripts, os, $event)" :checked="checked('check', os, scripts)" :indeterminate.prop="indeterminate('check', os, scripts)">
              </div>
              <template v-for="script of scripts">
                <div class="logpile-row child" :key="`${os}-${level}-${script}`">
                  <div class="logpile-category">{{scriptLookup[script].title}}</div>
                  <input type="checkbox" v-on:change="check('enable', script, os, $event)" :checked="checked('enable', os, script)">
                  <input type="checkbox" v-on:change="check('disable', script, os, $event)" :checked="checked('disable', os, script)">
                  <input type="checkbox" v-on:change="check('view', script, os, $event)" :checked="checked('view', os, script)">
                  <input type="checkbox" v-on:change="check('check', script, os, $event)" :checked="checked('check', os, script)">
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
            <div class="script-block" v-for="script of results" :key="`${script.os}-${script.language}-${script.type}`">
              <div class="script-header">
                <div class="script-label">{{`${script.type.charAt(0).toUpperCase()}${script.type.slice(1)} selected items for ${script.os}. Language: ${script.language}`}}</div>  
                <div class="script-controls">
                <img class="icon-button" src='/images/copy.svg' v-on:click="copy(script.content)">             
                <a :href="getScriptBlob(script.content)" :download="getScriptName(script.language, script.os, script.type)">
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
export default {
  head() {
    return { title: 'The Log Pile'}
  },
  data() {
    return {
      results: null
    }
  },
  async asyncData({$content, app}) {
    const scriptData = await $content('/scripts').fetch()
    const log = await $content(`${app.i18n.locale}/logs`).sortBy('title').only(['source', 'log_pile', 'slug', 'suggested_log_level', 'title']).fetch()
    return {
      categories: log.reduce((result, script) => {
        script.source.os.forEach(os => {
          if (!result[os]) result[os] = {}
          if (!result[os][script.suggested_log_level]) result[os][script.suggested_log_level] = []
          result[os][script.suggested_log_level].push(script.slug)
        })
        return result
      }, {}),
      scriptLookup: log.reduce((result, script) => ({...result, [script.slug]: script}), {}),
      scriptData
    }
  },
  watch: {
    results (val) {
      if (val) this.$nextTick(() => document.getElementById('scripts-button').scrollIntoView(true))
    }
  },
  methods: {
    check(script_type, data, os, event) {
      if (typeof data == 'string') return this.$store.commit('logpile/setScriptStatus', {os, slug: data, script_type, status: event.target.checked})
      if (Array.isArray(data)) return data.forEach(script => this.check(script_type, script, os, event))
      Object.values(data).forEach(value => this.check(script_type, value, os, event))
    },
    checked(script_type, os, data) {
      if (typeof data == 'string') return this.$store.getters['logpile/getScriptStatus'](os, data, script_type)
      if (Array.isArray(data)) return data.some(script => this.checked(script_type, os, script))
      return Object.values(data).some(value => this.checked(script_type, os, value))
    },
    indeterminate(script_type, os, data) {
      if (!this.checked(script_type, os, data)) return false
      if (Array.isArray(data)) return !data.every(script => this.checked(script_type, os, script))
      return !Object.values(data).every(value => this.checked(script_type, os, value) && !this.indeterminate(script_type, os, value))
    },
    sortLevels(levels) { 
      return Object.entries(levels).sort((a, b) => compareLevels(a[0], b[0])).map(level => ({level: level[0], scripts: level[1]})) 
    },
    getScripts() {
      this.results = Object.entries(this.categories)
      .map(category => Object.entries(category[1]).map(level => level[1].map(script => {
        const scripts = []
        scripts.push({
          content: this.scriptLookup[script].log_pile.enable_logging, 
          os: category[0], 
          type: 'enable', 
          language: this.scriptLookup[script].log_pile.language
        })
        scripts.push({
          content: this.scriptLookup[script].log_pile.disable_logging, 
          os: category[0], 
          type: 'disable', 
          language: this.scriptLookup[script].log_pile.language
        })
        scripts.push({
          content: this.scriptLookup[script].log_pile.view_logs, 
          os: category[0], 
          type: 'view', 
          language: this.scriptLookup[script].log_pile.language
        })
        scripts.push({
          content: this.scriptLookup[script].log_pile.check_status, 
          os: category[0], 
          type: 'check', 
          language: this.scriptLookup[script].log_pile.language
        })
        return scripts
      })))
      .flat(4)
      .reduce((result, item) => {
        const entry = result.find(r => r.os == item.os && r.language == item.language && r.type == item.type)
        if (entry) entry.content = `${entry.content}\n\n${item.content}`
        else result.push(item)
        return result
      }, [])
      .map(item => {
        if (this.scriptData[item.language][item.type]) {
          if (this.scriptData[item.language][item.type].header) item.content = `${this.scriptData[item.language][item.type].header}\n\n${item.content}`
          if (this.scriptData[item.language][item.type].footer) item.content = `${item.content}\n\n${this.scriptData[item.language][item.type].footer}`
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
    getScriptName(language, os, script_type) {
      return `what2log-${script_type}-${os.replace(/\s/g, '').toLowerCase()}${this.scriptData[language].extension}`
    }
  }
}
</script>