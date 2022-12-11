/** call confirm 项目二次弹窗封装.js */

export function callConfirm({title, tip, info, hiddenConfirm, onConfirm}){
  const h = this.$createElement;
  if(hiddenConfirm){
    onConfirm()
  }else{
    return this.$msgbox({
      title: title || '操作提示',
      message: h('div', null, [
        h('span', {class: 'content'}, info || `是否确定进行此操作?`),
        h('div', {style: 'font-size: 12px; color: #9BA2AB;'}, tip),
        // h('p', {style: 'font-size: 12px; color: #333333; margin-top: 16px'}, '请填写驳回原因：'),
        // h('textarea', {style: 'font-size: 12px; width: 200px; height: 50px; border-radius: 8px;\n' +
        //     'border: 1px solid #D9D9D9;'}),
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
