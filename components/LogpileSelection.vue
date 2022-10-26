<template>
  <div v-if="content.category">
    <div :class="`${topLevel ? 'top-level' : 'second-level'} logpile-row`">
      <div class="logpile-category">{{content.category}}</div>
      <template v-for="scriptCategory of scriptCategories">
        <input type="checkbox" :key="`logpile-selection-${content.category}-${scriptCategory}`" v-on:change="setStatus(content, scriptCategory, $event)">
      </template>
    </div>
    <LogpileSelection v-for="item of content.items" :key="item.category || item.slug" :content="item" :baseUrl="baseUrl" :category="category"/>
  </div>
  <div v-else class="logpile-row child">
    <NuxtLink :to="`/${baseUrl}/${content.slug}/`" class="logpile-category">{{content.title}}</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['content', 'baseUrl', 'topLevel', 'scriptCategories', 'platform', 'category'],
  methods: {
    setStatus(data, scriptCategory, event) {
      if (data.items) return data.items.forEach(item => this.setStatus(item, scriptCategory, event))
      this.$store.commit('logpile/setScriptStatus', {category: this.category, slug: data.slug, script_type: scriptCategory, status: event.target.checked, platform: this.platform})
    }
  }
}
</script>