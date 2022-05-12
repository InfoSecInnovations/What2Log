<template>
  <div>
    <W2LHeader />
    <div id="container">
      <div id="inner-container">

      <div>insert some text here</div>

        <!-- Platform links -->
        <div class="row">
          <div class="column" v-for="platform of $config.platforms" :key="platform">
            <h2 class="home">{{(platformData[platform] && platformData[platform].name) || platform}}</h2>
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