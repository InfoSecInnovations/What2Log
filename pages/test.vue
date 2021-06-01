<template>
  <div class="container">
    <pre>{{article}}</pre>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const { $content} = context;
    const article = await $content('test').fetch();

    return {
      article,
    }
  }
}
</script>