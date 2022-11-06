const isBrowser = function() {
  return typeof window !== 'undefined'
}

const storage = {
  set(key, value) {
    isBrowser() && localStorage.setItem(key, JSON.stringify(value))
  },
  get(key) {
    if (isBrowser()) {
      try {
        return JSON.parse(localStorage.getItem(key))
      } catch (e) {
        return undefined
      }
    }
  },
  remove(key) {
    if (isBrowser()) {
      localStorage.removeItem(key)
    }
  },
  clear() {
    if (isBrowser()) {
      localStorage.clear()
    }
  }
}

export default storage
