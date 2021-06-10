<template>
  <div>
    <h1>{{author.name}}</h1>
    <img v-if="author.icon" :src="`/${author.icon}`" />
    <p v-if="author.bio">{{author.bio}}</p>
    <div v-for="post of posts" :key="post.slug">
      <NuxtLink :to="`/blog/${post.slug}/`">{{post.title}}</NuxtLink>
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