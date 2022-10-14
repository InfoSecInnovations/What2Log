<template>
  <div id="main-content" v-if="article">
    <h1>{{article.title}}</h1>
    <Tags :tags="article.tags"/>
    <div class="info-block">
      <div v-if="article.credits && article.credits.length" class="credits">
        <p v-for="(credit, index) of article.credits" :key="`credits-${index}`">{{credit}}</p>
      </div>
      <h4 v-if="article.source.event_id">Windows Event ID: {{article.source.event_id}}</h4>
      <h4>{{typeof article.default_enabled == 'boolean' ? 'Enabled by default' : 'Disabled by default'}}</h4>
      <h4 v-if="article.source.service">Service: {{article.source.service}}</h4>
      <h4 v-if="article.source.log">Log type: {{article.source.log}}</h4>
    </div>
    <p v-if="article.collect_reason" class="info">{{article.collect_reason}}</p>
    <div v-if="article.log_pile.view_logs || article.log_pile.check_status || article.log_pile.enable_logs || article.log_pile.disable_logs" class="logpile-section">
      <LogpileScript v-if="article.log_pile.view_logs" :script="article.log_pile.view_logs" script_type="view" :script_language="article.log_pile.language" :category="article.category" :slug="article.slug"/>
      <MissingLogpileScript v-else script_type="view"/>
      <LogpileScript v-if="article.log_pile.check_status" :script="article.log_pile.check_status" script_type="check" :script_language="article.log_pile.language" :category="article.category" :slug="article.slug"/>
      <MissingLogpileScript v-else script_type="check"/>
      <LogpileScript v-if="article.log_pile.disable_logging" :script="article.log_pile.disable_logging" script_type="disable" :script_language="article.log_pile.language" :category="article.category" :slug="article.slug"/>
      <MissingLogpileScript v-else script_type="disable"/>
      <LogpileScript v-if="article.log_pile.enable_logging" :script="article.log_pile.enable_logging" script_type="enable" :script_language="article.log_pile.language" :category="article.category" :slug="article.slug"/>
      <MissingLogpileScript v-else script_type="enable"/>
      <div class="script-info">
        <div class="script-language">Language: {{article.log_pile.language}}</div>
        <NuxtLink class="button" :to="`/${$route.params.platform}/`">Back to {{platformInfo.name}}</NuxtLink>
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
      <template v-for="(section, index) of content">
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
  async asyncData({ $content, app, params}) {
    const article = (await $content(`${app.i18n.locale}/platforms/${params.platform}/logs`, {deep: true}).where({slug: params.log}).fetch())[0]
    const platformInfo = await $content(`${app.i18n.locale}/platforms/${params.platform}/info`).fetch()
    let content = []
    if (article.GUI && article.GUI.enable) content = [...content, ...article.GUI.enable]
    if (article.CLI && article.CLI.enable) content = [...content, ...article.CLI.enable]
    if (article.GUI && article.GUI.view) content = [...content, ...article.GUI.view]
    if (article.CLI && article.CLI.view) content = [...content, ...article.CLI.view]
    return {
      article,
      content,
      platformInfo
    }
  },
  head() {
    return { title: this.article ? this.article.title : '' }
  }
}
</script>