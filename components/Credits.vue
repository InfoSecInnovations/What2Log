<template>
  <div v-if="article.credits && article.credits.length" class="credits">
    <p v-for="(credit, index) of article.credits" :key="`credits-${index}`">{{credit}}</p>
  </div>
</template>

<script>
export default {
  props: ["article"]
}
</script>