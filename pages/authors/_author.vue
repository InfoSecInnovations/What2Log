<template>
  <div id="w2l-container">
    <W2LHeader />
    <HomeNavbar />
    <div id="container">
      <div id="inner-container">
        <article>
          <h1>{{author.name}}</h1>
          <h2 v-if="author.organization">{{author.organization}}</h2>
          <img v-if="author.icon" :src="`/images/${author.icon}`" />
          <p v-if="author.bio[$i18n.locale]">{{author.bio[$i18n.locale]}}</p>
        </article>
        <div class="author-pages">
          <PageFeed directory="blog" :items_per_page="5" :query="{author: author.name}" title="Blog Posts"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // TODO: there is no this here, can we use fetch instead?
  async asyncData({$content, params}) {
    const author = await $content(`authors/${params.author}`).fetch()
    return {
      author
    }
  },  
  head() {
    return { title: (this.author && this.author.name) || '' }
  }
}
</script>