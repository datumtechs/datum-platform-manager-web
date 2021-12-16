/**
 * 成员角色
 *
 * 管理员：1
 * 编辑者：2
 * 查看者：3
 */
export const roleOptionMap: any = {
  zh: {
    1: '管理员',
    2: '编辑者',
    3: '查看者',
  },
  en: {
    1: 'Administrator',
    2: 'Editor',
    3: 'Viewer',
  },
}

/**
 * CPU选项
 *
 */
export const cpuOptions = {
  1: '1',
  2: '2',
  4: '4',
  8: '8',
  16: '16',
}

/**
 * 内存选项
 *
 */
export const memoryOptions = {
  1: '1',
  2: '2',
  4: '4',
  8: '8',
  16: '16',
}
/**
 * 最长运行时长
 *
 */
export const gpuOptions = {
  2: '2',
  4: '4',
  8: '8',
  16: '16',
}
/**
 * 带宽选项
 *
 */
export const broadbandOptions = {
  3: '3',
  10: '10',
  20: '20',
  30: '30',
}

export const authTypeList: any = {
  zh: ['按次数/按时间', '按时间', '按次数'],
  en: ['Usage count/Usage period', 'Usage period', 'Usage count'],
}
export const expireList: any = {
  zh: ['未过期', '已过期'],
  en: ['No', 'Yes'],
}
export const authStateList: any = {
  zh: ['已申请', '已授权', '已拒绝', '已撤销', '已失效'],
  en: ['Applied', 'Authorized', 'Declined', 'Canceled', 'Invalid'],
}
export const industryList: any = {
  zh: [
    '',
    '金融业（银行）',
    '金融业（保险）',
    '金融业（证券）',
    '金融业（其他）',
    '信息与通信',
    '制造业',
    '能源业',
    '交通运输业',
    '医疗健康业',
    '公共服务业',
    '传媒广告业',
    '其他行业',
  ],
  en: [
    '',
    'Finance(Banking)',
    'Finance(Insurance)',
    'Finance(Securities)',
    'Finance(Others)',
    'ICT',
    'Manufacturing',
    'Energy',
    'Transportation',
    'Healthcare',
    'Public service',
    'Media & advertising',
    'Others',
  ],
}
