import filesize from 'filesize'

export function jsonFileMapper(jsonStr) {
  let json
  try {
    json = JSON.parse(jsonStr)
  } catch (e) {}
  if (!json) {
    json = {}
  }
  if (json.path) {
    json.ext = json.path.split('.').pop()
    json.path = process.env.VUE_APP_BASE_API + json.path
  }
  if (json.size) {
    json.sizeText = filesize(json.size)
  }
  return json
}
