<template>
  <div id="w2l-container">
    <W2LHeader />
    <HomeNavbar />
    <div id="container">
      <div id="inner-container" class="blog">
        <h1>Log Blog</h1>
        <div class="blog-posts">
          <PageCard v-for="post of posts" :key="post.slug" :article="post" :link="`/blog/${post.slug}/`"/>
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