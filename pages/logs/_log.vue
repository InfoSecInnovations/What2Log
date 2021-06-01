<template>
  <div class="container">
    <pre>{{article}}</pre>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const { $content, app, params} = context;
    const article = await $content(`${app.i18n.locale}/logs/${params.log}`).fetch();

    return {
      article,
    }
  }
}
</script>