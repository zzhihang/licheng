export const getLastPath = (path) => {
  const array = path.split('/')
  return array[array.length - 1]
}
