class Cookie {
  setCookie(key, value, time, global) {
    const exp = new Date();
    exp.setTime(exp.getTime() + time * 1000 * 60);
    let cookie = key + '=' + value + ';expires=' + exp.toGMTString();
    if (global) {
      const host = location.hostname
      let domain
      if (/(^localhost$)|(^(\d{1,3}\.){3}\d{1,3}$)/.test(host)) {
        domain = host
      } else {
        domain = location.host.match(/.*?(\..*)/i)[1]
      }
      cookie += `;path=/;domain=${domain}`
    }
    document.cookie = cookie
  }

  getCookie(cookieName) {
    //使用字符串匹配的方式
    if (document.cookie.length > 0) {
      let start = document.cookie.indexOf(cookieName + '=')
      if (start !== -1) {
        start = start + cookieName.length + 1
        let end = document.cookie.indexOf(';', start)
        if (end === -1) end = document.cookie.length
        return document.cookie.substring(start, end)
      }
    }
    return null
  }

//删除cookie
  delCookie(name, global) {
    //将cookie有效期设置为<0
    if (this.getCookie(name) !== null) {
      const exp = new Date();
      exp.setTime(exp.getTime() - 1000 * 3600 * 24);
      let cookie = name + '=;expires=' + exp.toGMTString();
      if (global) {
        const host = location.hostname
        let domain
        if (/(^localhost$)|(^(\d{1,3}\.){3}\d{1,3}$)/.test(host)) {
          domain = host
        } else {
          domain = location.host.match(/.*?(\..*)/i)[1]
        }
        cookie += `;path=/;domain=${domain}`
      }
      document.cookie = cookie
    }
  }
}

export default new Cookie()
