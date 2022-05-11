<template>
  <div id="main-content">
    <div class="title-block">
      <h1>{{article.title}}</h1>
      <div>
        <h2 v-for="os of article.operating_system" :key="os">{{os}}</h2>
      </div>
      <AuthorCard :author="article.author" :date="article.createdAt" />
      <p v-if="article.description" class="info">{{article.description}}</p>
    </div>
    <div class="columns">
      <template v-for="(section, index) of content">
        <div :key="`enable-txt-${index}`" v-html="$md.render(section.txt)" :class="!section.img ? 'wide' : ''"></div>
        <img v-if="section.img" :key="`enable-img-${index}`" :src="`/images/${section.img}`">
        <div v-else :key="`enable-img-placeholder-${index}`" hidden></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, app, params}) {
    const article = await $content(`${app.i18n.locale}/platforms/${params.platform}/tools/${params.tool}`).fetch();
    let content = []
    if (article.app && article.app.install) content = [...content, ...article.app.install]
    if (article.app && article.app.info) content = [...content, ...article.app.info]
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