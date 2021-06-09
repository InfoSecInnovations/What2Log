<template>
  <div class="quick-script">
    <div class="quick-script-controls">
      <div class="script-label">{{label}}</div>
      <div class="quick-script-icon-buttons">
        <img class="icon-button" src="/images/copy.svg" v-on:click="copy" v-tooltip.bottom="'Copy to clipboard'">
        <a v-if="loaded" :href="getScriptBlob()" :download="getScriptName()" v-tooltip.bottom="'Download script'">
          <img class="icon-button" src="/images/download.svg">
        </a>
        <img class="icon-button" :src="enabled? '/images/remove.svg' : '/images/basket.svg'" v-on:click="enable"  v-tooltip.bottom="enabled ? 'Remove from Log Pile' : 'Add to Log Pile'">
      </div>
    </div>
    <pre>{{content}}</pre> 
  </div>
</template>

<script>
import copyText from '~/assets/copyText'
import getScriptBlob from '~/assets/getScriptBlob'
export default {
  data() {
    return {
      loaded: false, 
      scriptData: null
    }
  },
  async fetch() {
    const file = await this.$content('/scripts').only([this.script_language]).fetch()
    this.scriptData = file[this.script_language]
  },
  props: ['script', 'script_type', 'script_language', 'oses', 'slug'],
  computed: {
    label() {
      if (this.script_type == 'enable') return 'Enable Logging'
      if (this.script_type == 'disable') return 'Disable Logging'
      if (this.script_type == 'view') return 'View Logs'
      return 'Check Logging Status'
    },
    content() {
      let content = this.script
      if (this.scriptData && this.scriptData[this.script_type]) {
        if (this.scriptData[this.script_type].header) content = `${this.scriptData[this.script_type].header}\n\n${content}`
        if (this.scriptData[this.script_type].footer) content = `${content}\n\n${this.scriptData[this.script_type].footer}`
      }
      return content
    },
    enabled() {
      for (let os of this.oses) {
        if (this.$store.getters['logpile/getScriptStatus'](os, this.slug, this.script_type)) return true
      }
      return false
    }
  },
  mounted() {
    this.loaded = true
  },
  methods: {
    copy () {
      copyText(this.content)
    },
    getScriptBlob() {
      return getScriptBlob(this.content)
    },
    getScriptName() {
      if (!this.scriptData) return ''
      return `what2log-${this.script_type}-${this.$route.params.log.toLowerCase()}${this.scriptData.extension}`
    },
    enable() {
      this.oses.forEach(os => this.$store.commit('logpile/setScriptStatus', {os, slug: this.slug, script_type: this.script_type, status: !this.enabled}))
    }
  }
}
</script>