<template>
  <div id="main-content">
    <div class="title-block">
      <h1>{{article.title}}</h1>
      <div>
        <h2 v-for="os of article.source.os" :key="os">{{os}}</h2>
      </div>
      <p>{{article.collect_reason}}</p>
    </div>
    <div class="columns">
      <template v-for="(section, index) of content">
        <div :key="`enable-txt-${index}`" v-html="$md.render(section.txt)"></div>
        <img :key="`enable-img-${index}`" :src="`/images/${section.img}`">
      </template>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const { $content, app, params, redirect, route} = context;
    if (!params.log) {
      const slug = (await $content(`${app.i18n.locale}/logs`).only('slug').limit(1).fetch())[0].slug
      return redirect(`${route.path}/${slug}`)
    }
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