<template>
  <div v-if="content.category">
    <input type="checkbox" :id="content.category">
    <label :for="content.category" class="top-level sidebar-element">{{content.category}}</label>
    <SidebarElement v-for="item of content.items" :key="item.category || item.slug" :content="item" :baseUrl="baseUrl"/>
  </div>
  <NuxtLink v-else :to="`${baseUrl}/${content.slug}/`">{{content.title}}</NuxtLink>
</template>

<script>
export default {
  props: ['content', 'baseUrl']
}
</script>