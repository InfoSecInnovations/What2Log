import TOML from '@ltd/j-toml'
import remark from 'remark'
import strip from 'strip-markdown'
import fs from 'fs-extra'

const excerptLength = 150

const stripMarkdown = markdown => new Promise((resolve, reject) => {
  const md = remark()
  md.use(strip).process(markdown, (err, file) => {
    if (err) return reject(err)
    resolve(String(file))
  })
})

export default async () => { 
  const config = await fs.readJSON('w2lconfig.json').catch(() => null)
  return {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      titleTemplate: 'What2Log - %s',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
      '~/assets/main'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
      '~/plugins/v-tooltip.js',
      '~/plugins/filters.js'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/content
      '@nuxt/content',
      'nuxt-i18n',
      '@nuxtjs/markdownit'
    ],

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: { 
      extendParser: {
        '.toml': file => TOML.parse(file, 1.0, '\n', false)
      },
      markdown: {
        remarkPlugins: ['remark-unwrap-images']
      }
    },

    // i18n configuration: https://i18n.nuxtjs.org/options-reference
    i18n: {
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          name: 'English',
        },
      ],
      defaultLocale: 'en',
      noPrefixDefaultLocale: true,
    },

    // markdownit configuration
    markdownit: {
      linkify: true,
      use: [
        [
          'markdown-it-link-attributes', 
          {
            attrs: {target: '_blank'}
          }
        ]
      ]
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    generate: {
      dir: (config && config.dir) || 'dist'
    },

    hooks: {
      'content:file:beforeInsert': async (document) => { 
        if (document.extension === '.md') {
          const text = document.description ? `${document.description} ${document.text}` : document.text
          const stripped = await stripMarkdown(text)
          document.excerpt = stripped.length < excerptLength ? stripped : stripped.substr(0, stripped.lastIndexOf(' ', excerptLength))
        }
        if (document.extension === '.toml') {
          if (document.collect_reason) document.excerpt = document.collect_reason.length < excerptLength ? document.collect_reason : document.collect_reason.substr(0, document.collect_reason.lastIndexOf(' ', excerptLength))
        }
      }
    }
  }
}
