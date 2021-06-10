<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="inner-container">
        <article>
          <div class="title-block">
            <div class="header-block">
              <NuxtLink to="/blog/">Back to posts</NuxtLink>
              <h1 class="home">{{article.title}}</h1>
            </div>
            <div class="author-block">
              <NuxtLink :to="`/authors/${author.slug}/`">
                <img class="author-icon" v-if="author.icon" :src="`/images/${author.icon}`" :alt="author.name" />
                <p>{{author.name}}</p>
              </NuxtLink>
              <p>{{article.createdAt | formatDate}}</p>
            </div>
            <p class="info">{{article.description}}</p>
            <img v-if="article.img" :src="`/${article.img}`" :alt="article.alt"/>
          </div>
          <nuxt-content :document="article"/>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, app }) {
    const article = await $content(`${app.i18n.locale}/blog/${params.post}`).fetch()
    const author = await $content(`/authors`).where({name: article.author}).limit(1).fetch().then(res => res[0])
    return {
      article,
      author
    }
  }
}
</script>