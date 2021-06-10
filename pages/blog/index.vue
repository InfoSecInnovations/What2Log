<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="inner-container">
        <NuxtLink v-for="post of posts" :key="post.slug" :to="post.slug">{{post.title}}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$content, app}) {
    return {
      posts: await $content(`${app.i18n.locale}/blog`).sortBy('createdAt', 'desc').only(['title', 'slug']).fetch()
    }
  }
}
</script>