const sortItems = (a, b) => {
  if (a.category && !b.category) return 1
  if (!a.category && b.category) return -1
  return 0
} // TODO: category ordering

const handleItems = items => {
  items.sort(sortItems)
  items.forEach(item => {
    if (item.items) item.items = handleItems(item.items)
  })
  return items
}

export default data => handleItems(data.reduce((result, item) => {
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
}, [])) 