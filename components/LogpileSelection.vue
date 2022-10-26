<template>
  <div v-if="content.category">
    <div :class="`${topLevel ? 'top-level' : 'second-level'} logpile-row`">
      <div class="logpile-category">{{content.category}}</div>
      <template v-for="scriptCategory of scriptCategories">
        <input type="checkbox" :key="`logpile-selection-${category}-${scriptCategory}`" v-on:change="setStatus(content, scriptCategory, $event)" :checked="checked(content, scriptCategory)" :indeterminate.prop="indeterminate(content, scriptCategory)">
      </template>
    </div>
    <LogpileSelection v-for="item of content.items" :key="item.category || item.slug" :content="item" :baseUrl="baseUrl" :category="category" :scriptCategories="scriptCategories" :platform="platform"/>
  </div>
  <div v-else class="logpile-row child">
    <NuxtLink :to="`/${baseUrl}/${content.slug}/`" class="logpile-category">{{content.title}}</NuxtLink>
      <template v-for="scriptCategory of scriptCategories">
        <input type="checkbox" :key="`logpile-selection-${category}-${scriptCategory}-${content.slug}`" v-on:change="setStatus(content, scriptCategory, $event)" :checked="checked(content, scriptCategory)">
      </template>
  </div>
</template>

<script>
export default {
  props: ['content', 'baseUrl', 'topLevel', 'scriptCategories', 'platform', 'category'],
  methods: {
    setStatus(data, scriptCategory, event) {
      if (data.items) return data.items.forEach(item => this.setStatus(item, scriptCategory, event))
      this.$store.commit('logpile/setScriptStatus', {category: this.category, slug: data.slug, script_type: scriptCategory, status: event.target.checked, platform: this.platform})
    },
    checked(data, scriptCategory) {
      if (data.slug) return this.$store.getters['logpile/getScriptStatus']({category: this.category, slug: data.slug, script_type: scriptCategory, platform: this.platform})
      return data.items.some(item => this.checked(item, scriptCategory))
    },
    indeterminate(data, scriptCategory) {
      if (data.slug) return false
      if (!this.checked(data, scriptCategory)) return false
      return !data.items.every(item => this.checked(item, scriptCategory) && !this.indeterminate(item, scriptCategory))
    }
  }
}
</script>