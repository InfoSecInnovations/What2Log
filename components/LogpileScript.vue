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
      <!--<div :class="`button ${enabled ? 'enabled' : ''}`" v-on:click="addToSelection">{{buttonText()}}</div>!-->
    </div>
    <pre>{{content}}</pre> 
  </div>
</template>

<script>
import copyText from '~/assets/copyText'
import getScriptBlob from '~/assets/getScriptBlob'
export default {
  data() {
    return {loaded: false}
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
      // TODO: header and footer
      return this.script
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

    }
  }
}
</script>