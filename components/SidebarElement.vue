<template>
  <div v-if="content.category" class="sidebar-list">
    <input type="checkbox" :id="content.category">
    <label :for="content.category" :class="`${topLevel ? 'top-level' : 'mid-level'} sidebar-element`">{{content.category}}</label>
    <SidebarElement v-for="item of content.items" :key="item.category || item.slug" :content="item" :baseUrl="baseUrl"/>
  </div>
  <NuxtLink v-else :to="`/${baseUrl}/${content.slug}/`" :class="`inner-level sidebar-element sidebar-list`">{{content.title}}</NuxtLink>
</template>

<script>
export default {
  props: ['content', 'baseUrl', 'topLevel']
}
</script>