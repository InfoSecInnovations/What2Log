const fs = require('fs-extra')
const path = require('path')
const toml = require('@ltd/j-toml')

const baseDir = "./content/en/platforms"

fs.readdir(baseDir, {withFileTypes: true})
.then(dirs => Promise.all(
  dirs.filter(f => f.isDirectory())
  .map(async dir => {
    const fullPath = path.join(baseDir, dir.name, 'logs')
    const files = await fs.readdir(fullPath, { withFileTypes: true })
    return await Promise.all(files.map(async (file) => {
      if (file.isFile()) {
        const parsed = await fs.readFile(path.join(fullPath, file.name))
          .then(text => toml.parse(text, 1.0, '\n'))
        const fileLocation = path.join(fullPath, parsed.category, parsed.suggested_log_level, file.name)
        await fs.move(path.join(fullPath, file.name), fileLocation)
      }
    }))
  })
))