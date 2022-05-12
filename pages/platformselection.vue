<template>
  <div>
    <W2LHeader />
    <HomeNavbar />
    <div id="container">
      <div id="inner-container">

        <h1>Logs, Tools and The Log Pile</h1>
        <h3>Select a platform to view the relevant What2Log data.</h3>

        <!-- Platform links -->
        <div class="row">
          <div class="column" v-for="platform of $config.platforms" :key="platform">
            <h2>{{(platformData[platform] && platformData[platform].name) || platform}}</h2>
            <NuxtLink :to="`/${platform}/`" class="button">Learn More</NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return { title: 'Select your platform' }
  },
  async asyncData({$content, app, params, $config}) {
    const platformData = await Promise.all($config.platforms.map(async platform => ({platform, info: await $content(`${app.i18n.locale}/platforms/${platform}/info`).only('name').fetch()})))
    .then(info => info.reduce((result, value) => ({...result, [value.platform]: value.info}), {}))
    console.log(platformData)
    return {platformData}
  }
}
</script>