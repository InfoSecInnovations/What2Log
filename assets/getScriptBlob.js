export default script => {
  const blob = new Blob([script])
  return URL.createObjectURL(blob)
}