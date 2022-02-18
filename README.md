# What2Log

An InfoSec Innovations project to collect information on how to set up logging on various platforms, all in one convenient place: https://what2log.com/.

We use the [Nuxt Content](https://content.nuxtjs.org/) module to transform [TOML](https://toml.io/) files into HTML pages.

Join the discussion on [Discord](https://discord.gg/B9yRpw9tYd), [Twitter](https://twitter.com/What2Log) and [Reddit](https://www.reddit.com/r/What2Log/)

## Contributing

While we welcome contributions to the code side of things, the easiest and most useful way to get started is by adding content. The directory structure of the `content` directory closely mirrors the routes present on the website, so for example if you want to add a new log page, create your file in `content/en/logs` (in the future you'll be able to create files in other languages, but for now please stick with English). The file should be a `.toml` file that follows the [TOML 1.0.0 spec](https://toml.io/en/v1.0.0). Please follow the templates provided in the [templates](https://github.com/InfoSecInnovations/What2Log/tree/main/templates) directory to get started creating your own pages. Place any images used by your page in `static/images` and into their own folder for each relevant log or tool. The path you specify for images will be relative to this directory.

Check out some of our [current logs](https://github.com/InfoSecInnovations/What2Log/blob/main/content/en/logs/win10userlogon.toml) to see how we format and cover things like the Log Pile, compliance, and general layout.

Please try out your changes by running the dev server (see below) before submitting them to us to ensure the page displays correctly.

If you are new to using TOML, Visual Studio code has a "Even Better TOML" extension and supports the TOML 1.0.0 spec and it will highlight any errors for you.

Once you're happy with your work, submit a GitHub Pull Request, and we will review your work and update the site if we like what you've done.



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

To output the files from the `generate` command to a different directory, create a file called `w2lconfig.json` in the project root directory and use the `dir` property.

```
{
  "dir": "C:/some/test/dir"
}
```
