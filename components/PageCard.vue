<template>
  <div class="page-card">
    <NuxtLink :to="`/blog/${article.slug}/`" class="card-link">
      <h3>{{article.title}}</h3>
      <img v-if="article.img" :src="`/${article.img}`" :alt="article.alt"/>
      <div v-else class="excerpt">{{article.excerpt}}</div>
      <p class="more">Read more...</p>
    </NuxtLink>
    <AuthorCard :author="article.author" :date="article.createdAt"/>
  </div>
</template>

<script>
export default {
  props: ['article']
}
</script>