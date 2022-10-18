<template>
  <div id="main-content" v-if="article">
    <h1>{{article.title}}</h1>
    <Tags :tags="article.tags"/>
    <p v-if="article.description" class="info">{{article.description}}</p>
    <div class="columns">
      <template v-for="(section, index) of content">
        <div :key="`enable-txt-${index}`" v-html="$md.render(section.txt)" :class="`section ${!section.img ? 'wide' : ''}`"></div>
        <img v-if="section.img" :key="`enable-img-${index}`" :src="`/images/${section.img}`">
        <div v-else :key="`enable-img-placeholder-${index}`" hidden></div>
      </template>
    </div>
    <References :article="article"/>
  </div>
</template>

<script>
export default {
  props: ["article", "platformInfo"],
  data () {
    let content = []
    if (this.article.app && this.article.app.install) content = [...content, ...this.article.app.install]
    if (this.article.app && this.article.app.info) content = [...content, ...this.article.app.info]
    return {
      content
    }
  }
}
</script>