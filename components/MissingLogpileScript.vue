<template>
  <div class="quick-script">
    <div class="quick-script-controls">
      <div class="script-label">{{label}}</div>
    </div>
    <pre>{{content}}</pre> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: 'Unfortunately, due to current limitations, we do not yet have this command, stay tuned for updates!'
    }
  },
  props: ['script_type'],
  computed: {
    label() {
      if (this.script_type == 'enable') return 'Enable Logging'
      if (this.script_type == 'disable') return 'Disable Logging'
      if (this.script_type == 'view') return 'View Logs'
      return 'Check Logging Status'
    }
  }
}
</script>