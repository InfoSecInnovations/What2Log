<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div id="container">
      <div id="inner-container">
        <PageCard v-for="post of posts" :article="post" :key="post.slug"/>
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