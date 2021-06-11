<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="inner-container" class="blog">
        <h1>Log Blog</h1>
        <div class="blog-posts">
          <PageCard v-for="post of posts" :key="post.slug" :article="post"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$content, app}) {
    return {
      posts: await $content(`${app.i18n.locale}/blog`).sortBy('createdAt', 'desc').fetch()
    }
  }
}
</script>