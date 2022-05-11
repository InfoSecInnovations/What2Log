<template>
  <div>
    <W2LHeader />
    <div id="container">
      <div id="inner-container">

        <!-- Main page image container-->
        <div id="splash-container">
          <h1 class="home">What2Log</h1>
          <h2 class="home">Logging made easy</h2>
          <NuxtLink to="about/" class="button">Learn More</NuxtLink>
          <NuxtLink to="windows/logs/win10accountchanged/" class="button">View the Logs</NuxtLink>
        </div>

        <!-- Three column layout-->
        <div class="row">
          <div class="column">
            <h2 class="home">Tools</h2>
            <p>Click here to learn more about the tools of our supported Operating Systems.</p>
            <NuxtLink to="windows/tools/win10note/" class="button">Learn More</NuxtLink>
          </div>
          <div class="column">
            <h2 class="home">The Log Pile</h2>
            <p>Click here to learn more about The Log Pile and build custom scripts for your system.</p>
            <NuxtLink to="logpile/" class="button">Learn More</NuxtLink>
          </div>
          <div class="column">
            <h2 class="home">Log Blog</h2>
            <p>Click here to learn more about what you should be logging. </p>
            <NuxtLink to="blog/" class="button">Learn More</NuxtLink>
          </div>
        </div>

        <div id="contributing-guide">
          <h3>Contributing</h3>
          <p>We welcome contributions to the project, either directly or via feedback.</p>
          <p>If you wish to create an article yourself, please visit <a href="https://github.com/InfoSecInnovations/What2Log" target="_blank">our GitHub</a> and follow the contributing guide there. The What2Log pages are generated from the <a href="https://toml.io" target="_blank">TOML file format</a>, so you'll want to be familiar with that first.</p>
          <p>If you have any feedback, bug reports, or feature/content requests, you can head over to <a href="https://github.com/InfoSecInnovations/What2Log/issues" target="_blank">our GitHub issues page</a> and post these there.</p>
          <p>Feel free to join <a href="https://discord.gg/B9yRpw9tYd" target="_blank">the InfoSec Innovations Discord</a> too if you want to chat!</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return { title: 'Home' }
  }
}
</script>
