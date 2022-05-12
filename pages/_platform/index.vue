<template>
  <div>
    <W2LHeader />
    <div id="container">
      <div id="inner-container">

      <h1>{{platformData.name || $route.params.platform}}</h1>

        <div class="row">
          <div class="column">
            <h2 class="home">Logs</h2>
            <p>Click here to learn more about what you should be logging and how to do so.</p>
            <NuxtLink to="logs/" class="button">Learn More</NuxtLink>
          </div>
          <div class="column">
            <h2 class="home">Tools</h2>
            <p>Click here to learn more about the tools of this platform.</p>
            <NuxtLink to="tools/" class="button">Learn More</NuxtLink>
          </div>
          <div class="column">
            <h2 class="home">The Log Pile</h2>
            <p>Click here to learn more about The Log Pile and build custom scripts for your system.</p>
            <NuxtLink to="logpile/" class="button">Learn More</NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return { title: (this.platformData && this.platformData.name) || '' }
  },
  async asyncData({$content, app, params}) {
    const platformData = await $content(`${app.i18n.locale}/platforms/${params.platform}/info`).only('name').fetch()
    return {platformData}
  }
}
</script>