<template>
  <div id="navbar">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink :to="`/${$route.params.platform}/logs/`">The Logs</NuxtLink>
    <NuxtLink :to="`/${$route.params.platform}/tools/`">Tools</Nuxtlink>
    <NuxtLink :to="`/${$route.params.platform}/logpile/`">The Log Pile</NuxtLink>
    <NuxtLink to="/about/">About Us</NuxtLink>
    <NuxtLink to="/blog/">Log Blog</NuxtLink>
  </div>
</template>
