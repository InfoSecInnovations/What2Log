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
          <NuxtLink to="logs/test-log/" class="button">View the Logs</NuxtLink>
        </div>

        <!-- Three column layout-->
        <div class="row">
          <div class="column">
            <h2 class="home">OS Tools</h2>
            <p>Click here to learn more about the tools of our supported Operating Systems.</p>
            <NuxtLink to="ostools/" class="button">Learn More</NuxtLink>
          </div>
          <div class="column">
            <h2 class="home">The Log Pile</h2>
            <p>Click here to learn more about The Log Pile and build custom scripts for your system.</p>
            <NuxtLink to="logpile/" class="button">Learn More</NuxtLink>
          </div>
          <div class="column">
            <h2 class="home">Log Blog</h2>
            <p>Click here to learn more about what you should be logging. </p>
            <a href="https://blog.what2log.com/" class="button">Learn More</a>
          </div>
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
