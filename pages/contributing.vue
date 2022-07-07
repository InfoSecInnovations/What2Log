<template>
  <div id="w2l-container">
    <W2LHeader />
    <HomeNavbar />
    <div class="about-section">
      <h1>Contributing</h1>
      <p>We welcome contributions to the project, either directly or via feedback.</p>
      <p>If you wish to create an article yourself, please visit <a href="https://github.com/InfoSecInnovations/What2Log" target="_blank">our GitHub</a> and follow the contributing guide there. The What2Log pages are generated from the <a href="https://toml.io" target="_blank">TOML file format</a>, so you'll want to be familiar with that first.</p>
      <p>If you have any feedback, bug reports, or feature/content requests, you can head over to <a href="https://github.com/InfoSecInnovations/What2Log/issues" target="_blank">our GitHub issues page</a> and post these there.</p>
      <p>Feel free to join <a href="https://discord.gg/B9yRpw9tYd" target="_blank">the InfoSec Innovations Discord</a> too if you want to chat!</p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return { title: 'Contributing' }
  }
}
</script>