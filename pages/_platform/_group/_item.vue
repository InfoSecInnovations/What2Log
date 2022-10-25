<template>
  <Component :is="component" :article="article" :platformInfo="platformInfo" :scriptCategories="scriptCategories"/>
</template>

<script>
export default {
  props: ['scriptCategories', 'platformInfo'],
  async asyncData({ $content, app, params}) {
    const article = (await $content(`${app.i18n.locale}/platforms/${params.platform}/${params.group}`, {deep: true}).where({slug: params.item}).fetch())[0]
    return {
      article
    }
  },
  computed: {
    component() {
      if (this.$route.params.group == "logs") return "LogPage"
      return "ItemPage"
    }
  },
  head() {
    return { title: this.article ? this.article.title : '' }
  }
}
</script>