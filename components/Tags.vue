<template>
  <div class="tags" v-if="tags && tags.length"><NuxtLink v-for="tag of tags" :key="`tag-${tag}`" :to="{ path: `/${$route.params.platform}/tags`, query: { query: tag }}">{{tag}}</NuxtLink></div>
</template>

<script>
  export default {
    props: ['tags']
  }
</script>