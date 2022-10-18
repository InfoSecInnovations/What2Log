const sortItems = (a, b, ordering) => {
  // if we're comparing a leaf node and a category, we want the leaf node up top
  if (a.category && !b.category) return 1
  if (!a.category && b.category) return -1
  const aText = a.category || a.slug
  const bText = b.category || b.slug
  if (aText && bText) {
    if (ordering) {
      if (ordering.includes(aText) && ordering.includes(bText)) return ordering.indexOf(aText) - ordering.indexOf(bText)
      if (ordering.includes(aText)) return - 1
      if (ordering.includes(bText)) return 1
    }
    return aText.localeCompare(bText)
  }
  return 0
}

const handleItems = (items, ordering, level = 0) => {
  items.sort((a, b) => sortItems(a, b, ordering && ordering[level]))
  items.forEach(item => {
    if (item.items) item.items = handleItems(item.items, ordering, level + 1)
  })
  return items
}

export default (data, ordering) => handleItems(data.reduce((result, item) => {
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
}, []), ordering) 