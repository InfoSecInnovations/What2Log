<template>
  <div id="main-content">
    <div class="title-block">
      <h1>{{article.title}}</h1>
      <div>
        <h2 v-for="os of article.source.os" :key="os">{{os}}</h2>
      </div>
      <div class="info-block">
        <AuthorCard :author="article.author" :date="article.createdAt" />
        <div v-if="article.credits && article.credits.length" class="credits">
          <p v-for="(credit, index) of article.credits" :key="`credits-${index}`">{{credit}}</p>
        </div>
      </div>
      <div class="info-block">
        <h4>{{article.default_enabled ? 'Enabled by default' : 'Disabled by default'}}</h4>
        <h4 v-if="article.source.service">Service: {{article.source.service}}</h4>
        <h4 v-if="article.source.log">Log type: {{article.source.log}}</h4>
      </div>
      <p class="info">{{article.collect_reason}}</p>
      <div class="compliance-block" v-if="article.compliance && Object.keys(article.compliance).length">
        <h3>Compliance</h3>
        <div v-for="(value, name) of article.compliance" :key="`compliance-${name}`" class="info-block">
          <h4>{{name}}</h4>
          <p>Level: {{value.level}}</p>
          <p><a :href="value.reference" target="_blank">{{value.reference}}</a></p>
        </div>
      </div>
    </div>
    <div class="columns">
      <template v-for="(section, index) of content">
        <div :key="`enable-txt-${index}`" v-html="$md.render(section.txt)" :class="`section ${!section.img ? 'wide' : ''}`"></div>
        <img v-if="section.img" :key="`enable-img-${index}`" :src="`/images/${section.img}`">
        <div v-else :key="`enable-img-placeholder-${index}`" hidden></div>
      </template>
    </div>
    <div class="info-block" v-if="article.references && article.references.length">
      <h3>Additional References</h3>
      <p v-for="(ref, index) of article.references" :key="`reference-${index}`"><a :href="ref" target="_blank">{{ref}}</a></p>
    </div>
    <div v-if="article.log_pile.view_logs || article.log_pile.check_status || article.log_pile.enable_logs || article.log_pile.disable_logs" class="logpile-section">
      <LogpileScript v-if="article.log_pile.view_logs" :script="article.log_pile.view_logs" script_type="view" :script_language="article.log_pile.language" :oses="article.source.os" :slug="article.slug"/>
      <MissingLogpileScript v-else script_type="view"/>
      <LogpileScript v-if="article.log_pile.check_status" :script="article.log_pile.check_status" script_type="check" :script_language="article.log_pile.language" :oses="article.source.os" :slug="article.slug"/>
      <MissingLogpileScript v-else script_type="check"/>
      <LogpileScript v-if="article.log_pile.disable_logging" :script="article.log_pile.disable_logging" script_type="disable" :script_language="article.log_pile.language" :oses="article.source.os" :slug="article.slug"/>
      <MissingLogpileScript v-else script_type="disable"/>
      <LogpileScript v-if="article.log_pile.enable_logging" :script="article.log_pile.enable_logging" script_type="enable" :script_language="article.log_pile.language" :oses="article.source.os" :slug="article.slug"/>
      <MissingLogpileScript v-else script_type="enable"/>
      <div class="script-info">
        <div class="script-language">Language: {{article.log_pile.language}}</div>
        <NuxtLink class="button" to="/logpile/">View Log Pile</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, app, params}) {
    const article = await $content(`${app.i18n.locale}/platforms/${params.platform}/logs/${params.log}`).fetch();
    let content = []
    if (article.GUI && article.GUI.enable) content = [...content, ...article.GUI.enable]
    if (article.CLI && article.CLI.enable) content = [...content, ...article.CLI.enable]
    if (article.GUI && article.GUI.view) content = [...content, ...article.GUI.view]
    if (article.CLI && article.CLI.view) content = [...content, ...article.CLI.view]
    return {
      article,
      content
    }
  },
  head() {
    return { title: this.article ? this.article.title : '' }
  }
}
</script>