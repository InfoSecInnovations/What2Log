<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="inner-container">
        <article>
          <h1>{{author.name}}</h1>
          <h2 v-if="author.organization">{{author.organization}}</h2>
          <img v-if="author.icon" :src="`/images/${author.icon}`" />
          <p v-if="author.bio[$i18n.locale]">{{author.bio[$i18n.locale]}}</p>
          <h2>Blog Posts</h2>
          <div class="blog-posts">
            <PageCard v-for="post of posts" :key="post.slug" :article="post"/>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$content, params, app}) {
    const author = await $content(`authors/${params.author}`).fetch()
    const posts = await $content(`${app.i18n.locale}/blog`).where({author: author.name}).fetch()
    return {
      author,
      posts
    }
  }
}
</script>