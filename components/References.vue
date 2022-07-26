<template>
  <div class="info-block">
    <h3>Additional References</h3>
    <template v-if="article.references">
      <p v-for="(ref, index) of article.references" :key="`reference-${index}`"><a :href="ref" target="_blank">{{ref}}</a></p>
    </template>
    <a :href="`https://github.com/InfoSecInnovations/What2Log/blob/main/content/${article.path}${article.extension}`" target="_blank"> View this article on GitHub</a>
  </div>
</template>

<script>
export default {
  props: ['article']
}
</script>