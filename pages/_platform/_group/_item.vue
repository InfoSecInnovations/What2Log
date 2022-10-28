<template>
  <div id="main-content" v-if="article">
    <h1>{{article.title}}</h1>
    <Tags :tags="article.tags" :dir="$route.params.platform"/>
    <div class="info-block">
      <Credits :article="article"/>
      <template v-if="article.logging">
        <h4 v-if="article.logging.event_id">Windows Event ID: {{article.logging.event_id}}</h4>
        <h4>{{typeof article.logging.default_enabled == 'boolean' ? 'Enabled by default' : 'Disabled by default'}}</h4>
        <h4 v-if="article.logging.service">Service: {{article.logging.service}}</h4>
        <h4 v-if="article.logging.channel">Log type: {{article.logging.channel}}</h4>
      </template>
      <h4 v-if="article.application">{{typeof article.application.default_installed == 'boolean' ? 'Installed by default' : 'Not installed by default'}}</h4>
    </div>
    <p v-if="article.description" class="info">{{article.description}}</p>
    <div v-if="$route.params.group == 'logs' && article.logging && scriptCategories && scriptCategories.length" class="logpile-section">
      <template v-for="task of scriptCategories">
        <LogpileScript v-if="article.logging.scripting.tasks[task]" :script="article.logging.scripting.tasks[task]" :script_type="task" :script_language="article.logging.scripting.language" :platform="$route.params.platform" :category="article.category" :slug="article.slug" :langInfo="langInfo" :key="`scripting-${task}`"/>
        <MissingLogpileScript v-else :script_type="task" :key="`scripting-${task}`"/>
      </template>
      <div class="script-info">
        <div class="script-language">Language: {{article.logging.scripting.language}}</div>
        <NuxtLink class="button" :to="`/${$route.params.platform}/`">View {{platformInfo.name}} script selection</NuxtLink>
      </div>
    </div>
    <div class="compliance-block" v-if="article.compliance && Object.keys(article.compliance).length">
      <h3>Compliance</h3>
      <div v-for="(value, name) of article.compliance" :key="`compliance-${name}`" class="info-block">
        <h4>{{name}}</h4>
        <p>Level: {{value.level}}</p>
        <p><a :href="value.reference" target="_blank">{{value.reference}}</a></p>
      </div>
    </div>
    <div class="columns">
      <template v-for="(section, index) of article.content">
        <div :key="`enable-txt-${index}`" v-html="$md.render(section.txt)" :class="`section ${!section.img ? 'wide' : ''}`"></div>
        <img v-if="section.img" :key="`enable-img-${index}`" :src="`/images/${section.img}`">
        <div v-else :key="`enable-img-placeholder-${index}`" hidden></div>
      </template>
    </div>
    <References :article="article"/>
  </div>
</template>

<script>
export default {
  props: ['scriptCategories', 'platformInfo', 'langInfo'],
  async asyncData({ $content, app, params}) {
    const article = (await $content(`${app.i18n.locale}/platforms/${params.platform}/${params.group}`, {deep: true}).where({slug: params.item}).fetch())[0]
    return {
      article
    }
  },
  head() {
    return { title: this.article ? this.article.title : '' }
  }
}
</script>