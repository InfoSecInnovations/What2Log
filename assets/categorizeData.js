export default data => data.reduce((result, item) => {
  let current = result
  item.path.forEach(path => {
    if (!path) return
    let container = current.find(other => other.category && other.category == path)
    if (!container) {
      container =  { category: path, items: [] }
      current.push(container)
    }
    current = container.items
  })
  current.push(item)
  return result
}, []) // TODO: ordering