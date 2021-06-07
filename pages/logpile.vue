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
              <input type="checkbox" v-on:change="check('enable', levels, $event)" :checked="checked('enable', levels)">
              <input type="checkbox" v-on:change="check('disable', levels, $event)" :checked="checked('disable', levels)">
              <input type="checkbox" v-on:change="check('view', levels, $event)" :checked="checked('view', levels)">
              <input type="checkbox" v-on:change="check('check', levels, $event)" :checked="checked('check', levels)">
            </div>
            <template v-for="(scripts, level) of levels">
              <div class="logpile-row second-level" :key="`${os}-${level}`">
                <div class="logpile-category">{{level}}</div>
                <input type="checkbox" v-on:change="check('enable', scripts, $event)" :checked="checked('enable', scripts)">
                <input type="checkbox" v-on:change="check('disable', scripts, $event)" :checked="checked('disable', scripts)">
                <input type="checkbox" v-on:change="check('view', scripts, $event)" :checked="checked('view', scripts)">
                <input type="checkbox" v-on:change="check('check', scripts, $event)" :checked="checked('check', scripts)">
              </div>
              <template v-for="script of scripts">
                <div class="logpile-row child" :key="`${os}-${level}-${script}`">
                  <div class="logpile-category">{{script}}</div>
                  <input type="checkbox" v-on:change="check('enable', script, $event)" :checked="checked('enable', script)">
                  <input type="checkbox" v-on:change="check('disable', script, $event)" :checked="checked('disable', script)">
                  <input type="checkbox" v-on:change="check('view', script, $event)" :checked="checked('view', script)">
                  <input type="checkbox" v-on:change="check('check', script, $event)" :checked="checked('check', script)">
                </div>
              </template>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return { title: 'The Log Pile'}
  },
  async asyncData({$content, app}) {
    const scriptData = await $content(`${app.i18n.locale}/logs`).only(['source', 'log_pile', 'slug', 'suggested_log_level']).fetch()
    return {
      categories: scriptData.reduce((result, script) => {
        script.source.os.forEach(os => {
          if (!result[os]) result[os] = {}
          if (!result[os][script.suggested_log_level]) result[os][script.suggested_log_level] = []
          result[os][script.suggested_log_level].push(script.slug)
        })
        return result
      }, {})
    }
  },
  methods: {
    check(script_type, data, event) {
      if (typeof data == 'string') return this.$store.commit('setScriptStatus', {path: data, script_type, status: event.target.checked})
      if (Array.isArray(data)) return data.forEach(script => this.check(script_type, script, event))
      Object.values(data).forEach(value => this.check(script_type, value, event))
    },
    checked(script_type, data) {
      if (typeof data == 'string') return this.$store.getters.getScriptStatus(data, script_type)
      if (Array.isArray(data)) return data.some(script => this.checked(script_type, script))
      return Object.values(data).some(value => this.checked(script_type, value))
    }
  }
}
</script>