/**
 *
 * @author 池奕辰
 * @describe 日期相关方法，包含计算今日、昨日、本周、上周、本月、上月的起止时间
 */

function add0(m) {
  return String(m).padStart(2, '0')
}

function getMonthDays(year, month) {
  var newYear = year // 取当前的年份
  var nextMonth = month++
  if (month > 12) {
    nextMonth -= 12 // 月份减
    newYear++ // 年份增
  }
  var nextMonthFirstDay = new Date(newYear, nextMonth, 1) // 下个月第一天
  var oneDay = 1000 * 60 * 60 * 24
  var dateString = new Date(nextMonthFirstDay - oneDay)
  var dateTime = dateString.getDate()
  return dateTime
}

function getPriorMonthFirstDay(year, month) {
  // 年份为0代表,是本年的第一月,所以不能减
  if (month === 0) {
    month = 11 // 月份为上年的最后月份
    year-- // 年份减1
    return new Date(year, month, 1)
  }
  // 否则,只减去月份
  month--
  return new Date(year, month, 1)
}

export default {
  getYMD(date) {
    return [date.getFullYear(), ('0' + (date.getMonth() + 1)).substr(-2), ('0' + date.getDate()).substr(-2)]
  },
  getDate(str) {
    const arr = str.split(/-|:|\/|\s/)
    arr[1] -= 1
    const len = 6 - arr.length
    arr.push(...new Array(len).fill('00'))
    console.log(new Date(...arr).getTime())
    return new Date(...arr)
  },
  getTodayDate: function() {
    var todayDate = new Date()
    var y = todayDate.getFullYear()
    var m = todayDate.getMonth() + 1
    var d = todayDate.getDate()
    return y + '-' + add0(m) + '-' + add0(d) // 今日开始
  },
  getYesterdayDate: function() {
    var dateTime = []
    var today = new Date()
    var yesterday = new Date(today.setTime(today.getTime() - 24 * 60 * 60 * 1000))
    var y = yesterday.getFullYear()
    var m = yesterday.getMonth() + 1
    var d = yesterday.getDate()
    var s = y + '-' + add0(m) + '-' + add0(d) // 开始
    var e = y + '-' + add0(m) + '-' + add0(d) // 结束
    dateTime.push(s)
    dateTime.push(e)
    return (dateTime)
  },
  getCurrentWeek: function() {
    var startStop = []
    // 获取当前时间
    var currentDate = new Date()
    // 返回date是一周中的某一天
    var week = currentDate.getDay()
    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24
    // 减去的天数
    var minusDay = week !== 0 ? week - 1 : 6
    // alert(minusDay)
    // 本周 周一
    var monday = new Date(currentDate.getTime() - (minusDay * millisecond))
    // 本周 周日
    var sunday = new Date(monday.getTime() + (6 * millisecond))
    var sy = monday.getFullYear()
    var sm = monday.getMonth() + 1
    var sd = monday.getDate()
    var ey = sunday.getFullYear()
    var em = sunday.getMonth() + 1
    var ed = sunday.getDate()
    var s = sy + '-' + add0(sm) + '-' + add0(sd) // 开始
    var e = ey + '-' + add0(em) + '-' + add0(ed) // 结束
    startStop.push(s)
    startStop.push(e)
    return startStop
  },
  getLastWeek: function() {
    // 起止日期数组
    var startStop = []
    // 获取当前时间
    var currentDate = new Date()
    // 返回date是一周中的某一天
    var week = currentDate.getDay()
    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24
    // 减去的天数
    var minusDay = week !== 0 ? week - 1 : 6
    // 获得当前周的第一天
    var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay))
    // 上周最后一天即本周开始的前一天
    var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond)
    // 上周的第一天
    var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6))
    var sy = priorWeekFirstDay.getFullYear()
    var sm = priorWeekFirstDay.getMonth() + 1
    var sd = priorWeekFirstDay.getDate()
    var ey = priorWeekLastDay.getFullYear()
    var em = priorWeekLastDay.getMonth() + 1
    var ed = priorWeekLastDay.getDate()
    var s = sy + '-' + add0(sm) + '-' + add0(sd) + ' 00:00:00'// 开始
    var e = ey + '-' + add0(em) + '-' + add0(ed) + ' 23:59:59'// 结束
    startStop.push(s)
    startStop.push(e)
    return startStop
  },
  getCurrentMonth: function() {
    // 起止日期数组
    var startStop = []
    // 获取当前时间
    var currentDate = new Date()
    // 获得当前月份0-11
    var currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear()
    // 求出本月第一天
    var firstDay = new Date(currentYear, currentMonth, 1)
    // 当为12月的时候年份需要加1
    // 月份需要更新为0 也就是下一年的第一个月
    if (currentMonth === 11) {
      currentYear++
      currentMonth = 0 // 就为
    } else {
      // 否则只是月份增加,以便求的下一月的第一天
      currentMonth++
    }
    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24
    // 下月的第一天
    var nextMonthDayOne = new Date(currentYear, currentMonth, 1)
    // 求出上月的最后一天
    var lastDay = new Date(nextMonthDayOne.getTime() - millisecond)
    var sy = firstDay.getFullYear()
    var sm = firstDay.getMonth() + 1
    var sd = firstDay.getDate()
    var ey = lastDay.getFullYear()
    var em = lastDay.getMonth() + 1
    var ed = lastDay.getDate()
    var s = sy + '-' + add0(sm) + '-' + add0(sd) // 开始
    var e = ey + '-' + add0(em) + '-' + add0(ed) // 结束
    startStop.push(s)
    startStop.push(e)
    return startStop
  },
  getWeekArea(date, isToday) {
    let n = date.getDay()
    n = n === 0 ? 7 : n
    date.setDate(7 - n + date.getDate())
    var year1 = date.getFullYear()
    var month1 = ('0' + (1 + date.getMonth())).substr(-2)
    let day1 = ('0' + date.getDate()).substr(-2)
    const now = new Date()
    if (date.getTime() > now.getTime()) {
      now.setDate(now.getDate() - +!isToday)
      day1 = ('0' + (now.getDate())).substr(-2)
      month1 = ('0' + (1 + now.getMonth())).substr(-2)
      year1 = now.getFullYear()
    }
    date.setDate(date.getDate() - 6)
    var year2 = date.getFullYear()
    var month2 = ('0' + (1 + date.getMonth())).substr(-2)
    var day2 = ('0' + date.getDate()).substr(-2)
    // 起止日期数组
    var startStop = []
    // 获取当前时间
    // 获得当前月份0-11
    startStop.push(year2 + `年${month2}月${day2}日`)
    startStop.push(year1 + `年${month1}月${day1}日`)
    const arr = [year2 + `-${month2}-${day2}`, year1 + `-${month1}-${day1}`]
    return { text: startStop, value: arr }
  },
  getMonthArea(date, isToday) {
    const now = new Date()
    date = new Date(date.getTime()) || new Date()
    date.setDate(1)
    var year = date.getFullYear()
    var month = ('0' + (date.getMonth() + 1)).substr(-2)
    var startStop = []
    startStop.push(year + `年${month}月01日`)
    date.setMonth(Number(month))
    date.setDate(0)
    let days = date.getDate()
    if (now.getTime() < date.getTime()) {
      now.setDate(now.getDate() - +!isToday)
      month = ('0' + (1 + now.getMonth())).substr(-2)
      year = now.getFullYear()
      days = now.getDate()
    }
    days = ('0' + days).substr(-2)
    startStop.push(year + `年${month}月${days}日`)
    const arr = [year + `-${month}-01`, year + `-${month}-${days}`]
    return { text: startStop, value: arr }
  },
  getYearArea: function(year) {
    // 起止日期数组
    var startStop = []
    // 获取当前时间
    var date = new Date()
    // 获得当前月份0-11
    // 获得当前年份4位年
    var currentYear = date.getFullYear()
    if (year && year < currentYear) {
      startStop.push(year + '年01月01日')
      startStop.push(year + '年12月31日')
    } else {
      startStop.push(currentYear + '年01月01日')
      const month = '0' + String(date.getMonth() + 1)
      const day = '0' + String(date.getDate())
      startStop.push(currentYear + `年${month.substr(-2)}月${day.substr(-2)}日`)
    }
    return startStop
  },
  getLastMonth: function() {
    var startStop = []
    // 获取当前时间
    var currentDate = new Date()
    // 获得当前月份0-11
    var currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear()
    // 获得上一个月的第一天
    var priorMonthFirstDay = getPriorMonthFirstDay(currentYear, currentMonth)
    // 获得上一月的最后一天
    var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth() + 1))
    var sy = priorMonthFirstDay.getFullYear()
    var sm = priorMonthFirstDay.getMonth() + 1
    var sd = priorMonthFirstDay.getDate()
    var ey = priorMonthLastDay.getFullYear()
    var em = priorMonthLastDay.getMonth() + 1
    var ed = priorMonthLastDay.getDate()
    var s = sy + '-' + add0(sm) + '-' + add0(sd) + ' 00:00:00'// 开始
    var e = ey + '-' + add0(em) + '-' + add0(ed) + ' 23:59:59'// 结束
    startStop.push(s)
    startStop.push(e)
    return startStop
  }
}
