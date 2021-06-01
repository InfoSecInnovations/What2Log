<template>
  <div class="container">
    <div class="sidebar">
      <div v-for="item of sidebar" :key="item.path" class="top-level">{{item.source.os[0]}}, {{item.suggested_log_level}}, {{item.title}}</div>
    </div>
    <div class="main-content">
      <h1>{{article.title}}</h1>
      <p>{{article.collect_reason}}</p>
      <div class="columns">
        <template v-for="(section, index) of content">
          <div :key="`enable-txt-${index}`" v-html="$md.render(section.txt)"></div>
          <img :key="`enable-img-${index}`" :src="`/${section.img}`">
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const { $content, app, params} = context;
    const article = await $content(`${app.i18n.locale}/logs/${params.log}`).fetch();
    const sidebar = await $content(`${app.i18n.locale}/logs`).only(['source', 'suggested_log_level', 'title']).fetch()
    let content = []
    if (article.GUI && article.GUI.enable) content = [...content, ...article.GUI.enable]
    if (article.CLI && article.CLI.enable) content = [...content, ...article.CLI.enable]
    if (article.GUI && article.GUI.view) content = [...content, ...article.GUI.view]
    if (article.CLI && article.CLI.view) content = [...content, ...article.CLI.view]
    return {
      article,
      sidebar,
      content
    }
  }
}
</script>

<style lang="stylus">
  @require '~/assets/log.styl'
</style>