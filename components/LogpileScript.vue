<template>
  <div class="quick-script">
    <div class="quick-script-controls">
      <div class="script-label">{{label}}</div>
      <div class="quick-script-icon-buttons">
        <img class="icon-button" src='/images/copy.svg' v-on:click="copy">
        <a v-if="loaded" :href="getScriptBlob()" :download="getScriptName()">
          <img class="icon-button" src='/images/download.svg'>
        </a>
      </div>
      <div :class="`button enabled`">TODO: Add To Logpile</div>
    </div>
    <pre>{{content}}</pre> 
  </div>
</template>

<script>
import copyText from '~/assets/copyText'
import getScriptBlob from '~/assets/getScriptBlob'
export default {
  data() {
    return {loaded: false, scriptData: null}
  },
  async fetch() {
    const file = await this.$content('/scripts').only([this.script_language]).fetch()
    this.scriptData = file[this.script_language]
  },
  props: ['script', 'script_type', 'script_language'],
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
      return `what2log${this.script_type}-${this.$route.params.log.toLowerCase()}${this.scriptData.extension}`
    }
  }
}
</script>