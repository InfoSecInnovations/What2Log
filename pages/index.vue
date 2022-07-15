<template>
  <div id="w2l-container">
    <W2LHeader />
    <div id="container">
      <div id="inner-container">

        <!-- Main page image container-->
        <div id="splash-container">
          <h1 class="home">What2Log</h1>
          <h2 class="home">Logging made easy</h2>
          <div class="row">
            <div class="column">
              <NuxtLink to="about/" class="button">About</NuxtLink>
              <p>Find out more about What2Log and InfoSec Innovations.</p>
            </div>
            <div class="column">
              <NuxtLink to="blog/" class="button">Log Blog</NuxtLink>
              <p>Get updates about what's going on at What2Log and read our thoughts about logging.</p>
            </div>     
            <div class="column">
              <NuxtLink to="contributing/" class="button">Contributing</NuxtLink>
              <p>There are many ways you can help out with this project, click here to find out how!</p>
            </div>
          </div>
        </div>
        <div class="platform-grid">
          <NuxtLink v-for="platform of $config.platforms" :key="platform" :to="`/${platform}/`" class="button">{{(platformData[platform] && platformData[platform].name) || platform}}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return { title: 'Home' }
  },
  async asyncData({$content, app, params, $config}) {
    const platformData = await Promise.all($config.platforms.map(async platform => ({platform, info: await $content(`${app.i18n.locale}/platforms/${platform}/info`).only('name').fetch()})))
    .then(info => info.reduce((result, value) => ({...result, [value.platform]: value.info}), {}))
    return {platformData}
  }
}
</script>
