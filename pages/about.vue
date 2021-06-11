<template>
  <div>
    <W2LHeader />
    <Navbar />
    <div class="about-section">
      <h2 class="home">What2Log</h2>
      <p> What2Log was a project that began when we saw a noticeable gap in
        computer security notation in regards to logs. There had not been a centralized resource
        of what and how to understand the logs of the major operating systems
        that are used everyday. What2Log was made to fill that exact gap.</p>
    </div>

    <div class="about-section">
      <h2 class="home">Why</h2>
      <div>
        <p>
          Logging is essential in computer security. Computer logs can tell
          someone everything they need to know about what happened on a particular
          machine at a particular time. Events can be strung together to
          create a timeline of several events that happened during a time period.
        </p>

        <p>
          Logging is generally seen as boring and as a time sink for analysts, but
          we believe it can be a much easier and more interesting process. Logs contain
          key information about what happened on a system and are vital, especially
          in the aftermath of an attack. Learning to better utilize a computers built
          in logs can allow for a better understanding of an attack as well aside a
          better understanding of the computers functions.
        </p>
      </div>
    </div>

    <div class="about-section">
      <h2 class="home">Credits</h2>
      <p>What2Log is a project of <a href="https://www.infosecinnovations.com">InfoSec Innovations.</a></p>
      <p>The icons used on this site come from the Font Awesome 5 free plan. [License.](https://fontawesome.com/license/free)</p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return { title: 'About' }
  }
}
</script>
