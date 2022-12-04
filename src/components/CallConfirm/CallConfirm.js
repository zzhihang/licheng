/** call confirm 项目二次弹窗封装.js */

export function callConfirm({title, tip, info, hiddenConfirm, onConfirm}){
  const h = this.$createElement;
  if(hiddenConfirm){
    onConfirm()
  }else{
    return this.$msgbox({
      title: title || '操作提示',
      message: h('p', null, [
        h('span', {class: 'content'}, info || `是否确定进行此操作?`),
        h('div', {style: 'font-size: 12px; color: #9BA2AB;'}, tip)
      ]),
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = '请求中...';
          onConfirm && onConfirm(() => {
            instance.confirmButtonLoading = false;
            done()
          })
          done()
        } else {
          done();
        }
      }
    })
  }
}
