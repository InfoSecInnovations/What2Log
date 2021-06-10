<template>
  <div id="main-content">
    <div class="title-block">
      <h1>{{article.title}}</h1>
      <div>
        <h2 v-for="os of article.source.os" :key="os">{{os}}</h2>
      </div>
      <AuthorCard :author="article.author" :date="article.createdAt" />
      <p class="info">{{article.collect_reason}}</p>
    </div>
    <div class="columns">
      <template v-for="(section, index) of content">
        <div :key="`enable-txt-${index}`" v-html="$md.render(section.txt)"></div>
        <img :key="`enable-img-${index}`" :src="`/images/${section.img}`">
      </template>
    </div>
    <div v-if="article.log_pile.view_logs || article.log_pile.check_status || article.log_pile.enable_logs || article.log_pile.disable_logs" class="logpile-section">
      <LogpileScript v-if="article.log_pile.view_logs" :script="article.log_pile.view_logs" script_type="view" :script_language="article.log_pile.language" :oses="article.source.os" :slug="article.slug"/>
      <LogpileScript v-if="article.log_pile.check_status" :script="article.log_pile.check_status" script_type="check" :script_language="article.log_pile.language" :oses="article.source.os" :slug="article.slug"/>
      <LogpileScript v-if="article.log_pile.disable_logging" :script="article.log_pile.disable_logging" script_type="disable" :script_language="article.log_pile.language" :oses="article.source.os" :slug="article.slug"/>
      <LogpileScript v-if="article.log_pile.enable_logging" :script="article.log_pile.enable_logging" script_type="enable" :script_language="article.log_pile.language" :oses="article.source.os" :slug="article.slug"/>
      <div class="script-info">
        <div class="script-language">Language: {{article.log_pile.language}}</div>
        <NuxtLink class="button" to="/logpile/">View Log Pile</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const { $content, app, params} = context;
    const article = await $content(`${app.i18n.locale}/logs/${params.log}`).fetch();
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