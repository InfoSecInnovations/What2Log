<template>
  <div class="author-block">
    <div class="article-info">
      <NuxtLink v-if="authorData" :to="`/authors/${authorData.slug}/`">
        <img class="author-icon" v-if="authorData.icon" :src="`/images/${authorData.icon}`" :alt="authorData.name" />
        <p>{{authorData.name}}</p>
      </NuxtLink>
      <p v-else>{{author}}</p>
      <p>{{date | formatDate}}</p>
    </div>
    <div class="tags" v-if="tags && tags.length"><NuxtLink v-for="tag of tags" :key="tag" :to="{ path: `/${$route.params.platform}/tags`, query: { query: tag }}">{{tag}}</NuxtLink></div>
  </div>
</template>

<script>
export default {
  props: ['author', 'date', 'tags'],
  data() {
    return {authorData: undefined}
  },
  async fetch() {
    const data = await this.$content('authors').where({name: this.author}).limit(1).fetch()
    this.authorData = data ? data[0] : undefined
  },
  watch: {
    author() {
      this.$fetch()
    }
  }
}
</script>