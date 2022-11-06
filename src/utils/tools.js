export function isJSON(str) {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str);
      return !!(typeof obj == 'object' && obj);
    } catch (e) {
      return false;
    }
  }
}

export function getYearList(before = 5, after = 5) {
  const value = new Date().getFullYear()
  return [...new Array(before).fill('').map((v, i) => ({ label: value + i - before, value: value + i - before })),
    { value },
    ...new Array(after).fill('').map((v, i) => ({ label: value + i + 1, value: value + i + 1 }))]
}

//导出
export function exportFile(res,name,type,url) {
  const link = document.createElement('a');  // 创建元素
  let blob = new Blob([res], { type: type?type:'application/vnd.ms-excel' });
  link.style.display = 'none';
  link.href = url?url:URL.createObjectURL(blob);   // 创建下载的链接
  //num++

  var date = new Date();//实例一个时间对象；
  var y = date.getFullYear();//获取系统的年；
  var M = date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;//获取系统月份，由于月份是从0开始计算，所以要加1
  var d = date.getDate()<10?"0"+date.getDate():date.getDate();//获取系统日
  var h = date.getHours()<10?"0"+date.getHours():date.getHours();//获取系统时间
  var mm = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes(); //分
  var ss = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();//秒

  link.setAttribute('download', name);  // 给下载后的文件命名//+"_"+y+M+d+h+mm+ss
  document.body.appendChild(link);
  link.click();  // 点击下载
  document.body.removeChild(link);  //  下载完成移除元素
  window.URL.revokeObjectURL(link.href);  // 释放掉blob对象
}
export function isImg(name){
  return /\.(jpe?g|png|gif|webp|bmp|tif|svg)$/i.test(name)
}
