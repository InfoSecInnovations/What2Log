# What2Log

An InfoSec Innovations project to collect information on how to set up logging on various platforms, all in one convenient place: https://what2log.com/.

We use the [Nuxt Content](https://content.nuxtjs.org/) module to transform [TOML](https://toml.io/) files into HTML pages.

Join the discussion on [Discord](https://discord.gg/B9yRpw9tYd), [Twitter](https://twitter.com/What2Log) and [Reddit](https://www.reddit.com/r/What2Log/)

## Planned features

- Select scripts based on compliance frameworks
- Translation support

## Build Setup

Requires Node.js 12 or later.

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Contributing

While we welcome contributions to the code side of things, the easiest and most useful way to get started is by adding content. The directory structure of the `content` directory closely mirrors the routes present on the website, so for example if you want to add a new log page, create your file in `content/en/logs` (in the future you'll be able to create files in other languages, but for now please stick with English). The file should be a `.toml` file that follows the [TOML 1.0.0 spec](https://toml.io/en/v1.0.0). Please follow the template provided in the root directory. Place any images used by your page (each section requires an image to go with the text) in `static/images`. The path you specify for images will be relative to this directory.

We recommend using the "Even Better TOML" extension in Visual Studio Code, as this supports the TOML 1.0.0 spec unlike some other extensions, and it will highlight any errors for you.

Please try out your changes by running the dev server (see above) before submitting them to us to ensure the page displays correctly.

Once you're happy with your work, submit a GitHub Pull Request, and if we like what you've done, we'll accept it and update the site.