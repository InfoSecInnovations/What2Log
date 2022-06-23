export default (a, b, ordering) => {
  if (!ordering) return a.localeCompare(b)
  if (ordering.includes(a) && ordering.includes(b)) return ordering.indexOf(a) - ordering.indexOf(b)
  if (ordering.includes(a)) return - 1
  if (ordering.includes(b)) return 1
  return a.localeCompare(b)
}