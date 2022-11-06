export const reviewStatus = [
  { value: 'APPROVE', label: '审批通过' },
  { value: 'AUTO_APPROVE', label: '自动审批' },
  { value: 'AUTO_SUBMIT', label: '自动上报' },
  { value: 'SUBMIT', label: '已上报' },
  { value: 'APPROVAL_REJECT', label: '审批驳回' },
  { value: 'INIT', label: '未上报' }
]
export const hiddenDangerStatus = [
  { value: 'DRAFT', label: '  草稿' },
  { value: 'SENDED', label: '已下发' },
  { value: 'RECTIFICATIONING', label: ' 整改中' },
  { value: 'RECTIFICATION', label: '已整改' },
  { value: 'REVIEW_REJECT', label: ' 复核不通过' },
  { value: 'REVIEW_PASS', label: '复核通过' }
]
export const hiddenReviewStatus = [
  { label: '复核通过', value: 'REVIEW_PASS' },
  { label: '复核不通过', value: 'REVIEW_REJECT' }
]
export const enabled = [{ label: '启用', value: '0' }, { label: '禁用', value: '1' }]
export const enabledNum = [{ label: '启用', value: 0 }, { label: '禁用', value: 1 }]
export const companyType = [{ label: '集团公司', value: '1' }, { label: '外部劳务公司', value: '2' }]
export const approveState = [{ label: '待审核', value: 'E' }, { label: '审核通过', value: 'Y' }, { label: '审核不通过', value: 'N' }]

export const userStatus = [
  { value: '0', label: '在职' }, { value: '1', label: '不在职' }
]
export const certiStatus = [
  { value: 0, label: '在用证书' }, { value: 1, label: '历史证书' }
]
export const appList = [
  { value: 'sso', label: '统一权限认证' }, { value: 'scf', label: '供应链金融' },{ value: 'bid', label: '招投标系统' }
]
export const menuType = [
  { value: 0, label: '目录' }, { value: 1, label: '菜单' }, { value: 2, label: '按钮' }
]
export const MENU_TYPE_DIR = 0
export const MENU_TYPE_MENU = 1
export const MENU_TYPE_BTN = 2
