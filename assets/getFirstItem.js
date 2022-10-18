export default sidebar => {
  let item = sidebar[0]
  while (!item.slug) item = item.items[0]
  return item
}