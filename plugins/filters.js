import Vue from 'vue'

Vue.filter('formatDate', function(value) {
  if (value) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(value).toLocaleDateString('en', options)
  }
})