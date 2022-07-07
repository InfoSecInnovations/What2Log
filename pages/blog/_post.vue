<template>
  <div>
    <W2LHeader />
    <HomeNavbar />
    <div id="container">
      <div id="inner-container">
        <article>
          <div class="title-block">
            <div class="header-block">
              <NuxtLink to="/blog/">Back to posts</NuxtLink>
              <h1 class="home">{{article.title}}</h1>
            </div>
            <AuthorCard :author="article.author" :date="article.createdAt" />
            <p class="info">{{article.description}}</p>
            <img v-if="article.img" :src="`/${article.img}`" :alt="article.alt"/>
          </div>
          <nuxt-content :document="article"/>
        </article>

      </div>
    </div>
    <footer>
      <PageCard v-if="prev" :article="prev" :link="`/blog/${prev.slug}/`"/>
      <PageCard v-if="next" :article="next" :link="`/blog/${next.slug}/`"/>
    </footer>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, app }) {
    const [prev, next] = await $content(`${app.i18n.locale}/blog`)
      .sortBy('createdAt')
      .surround(params.post)
      .fetch()
    return {
      article: await $content(`${app.i18n.locale}/blog/${params.post}`).fetch(),
      prev,
      next
    }
  }
}
</script>