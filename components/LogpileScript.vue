<template>
  <div class="quick-script">
    <div class="script-label">{{label}}</div>
    <pre>{{content}}</pre> 
    <div class="quick-script-icon-buttons">
      <img class="icon-button" src="/images/copy.svg" v-on:click="copy" v-tooltip.bottom="'Copy to clipboard'">
      <a v-if="loaded" :href="getScriptBlob()" :download="getScriptName()" v-tooltip.bottom="'Download script'">
        <img class="icon-button" src="/images/download.svg">
      </a>
      <img class="icon-button" :src="enabled? '/images/remove.svg' : '/images/basket.svg'" v-on:click="enable"  v-tooltip.bottom="enabled ? 'Remove from Log Pile' : 'Add to Log Pile'">
    </div>
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
    this.scriptData = await this.$content('/scripts').where({name: this.script_language}).fetch().then(res => res[0])
  },
  props: ['script', 'script_type', 'script_language', 'platform', 'category', 'slug', 'langInfo'],
  computed: {
    label() {
      return this.langInfo.script_task_long_names[this.script_type] || `${this.script_type[0].toUpperCase()}${this.script_type.substring(1)}`
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
      return this.$store.getters['logpile/getScriptStatus']({category: this.category, slug: this.slug, script_type: this.script_type, platform: this.platform})
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
      return `what2log-${this.script_type}-${this.$route.params.item.toLowerCase()}${(this.scriptData && this.scriptData.file_extension) || '.txt'}`
    },
    enable() {
      const enabled = this.enabled
      this.$store.commit('logpile/setScriptStatus', {category: this.category, slug: this.slug, script_type: this.script_type, status: !enabled, platform: this.platform})
    }
  }
}
</script>