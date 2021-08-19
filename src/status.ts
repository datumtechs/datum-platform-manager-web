/**
 *
 * 设备状态
 *
 * 全部：0
 * 正常：1
 * 故障：2
 * 离线：3
 */
export const deviceStatus = [
  {
    id: 'all',
    name: '全部',
  },
  {
    id: 1,
    name: '正常',
  },
  {
    id: 2,
    name: '故障',
  },
  {
    id: 3,
    name: '离线',
  },
]
// 子设备列表
export const deviceDictionary = [
  { category_device_id: 1, device_name: '信号机' },
  { category_device_id: 2, device_name: '摄像头' },
  { category_device_id: 3, device_name: '雷达' },
  { category_device_id: 4, device_name: 'LED' },
  { category_device_id: 5, device_name: '工控机' },
]
// 告警类型
export const waringType = [
  { id: 'all', name: '全部' },
  { id: 1, name: '信号机告警' },
  { id: 2, name: '摄像头告警' },
  { id: 3, name: '雷达告警' },
  { id: 4, name: 'LED告警' },
  { id: 5, name: '工控机告警' },
  { id: 6, name: '路口告警' },
]

/**
 * 告警配置
 * ipcConfig 工控机
 * signalConfig 信号机
 * cameraConfig 摄像头
 * radarConfig  雷达
 * ledConfig    LED屏
 * crossConfig  路口
 *
 * */
export const signalConfig = [
  {
    type: 1,
    id: 1,
    title: '信号机故障告警',
    tip: '信号机上报异常故障，建议设置时间5分钟',
    threshold: 0,
    duration: 5,
    vailType: 0,
    indicator: 1,
    before: '监测到信号机故障，',
    methods: ['email'],
    status: false,
  },
  {
    type: 1,
    id: 2,
    title: '信号机离线告警',
    tip: '检测到信号机离线，建议设置时间5分钟',
    threshold: 0,
    duration: 5,
    vailType: 0,
    indicator: 2,
    before: '监测到信号机离线，',
    methods: ['email'],
    status: false,
  },
]
export const cameraConfig = [
  {
    type: 2,
    id: 1,
    title: '摄像头故障告警',
    tip: '摄像头上报异常故障，建议设置时间5分钟',
    threshold: 0,
    duration: 5,
    vailType: 0,
    indicator: 1,
    before: '监测到摄像头故障，',
    methods: ['email'],
    status: false,
  },
  {
    type: 2,
    id: 2,
    title: '摄像头离线告警',
    tip: '检测到摄像头离线，建议设置时间5分钟',
    threshold: 0,
    duration: 5,
    vailType: 0,
    indicator: 2,
    before: '监测到摄像头离线，',
    methods: ['email'],
    status: false,
  },
]
export const radarConfig = [
  {
    type: 3,
    id: 1,
    title: '雷达故障告警',
    tip: '雷达上报异常故障，建议设置时间5分钟',
    threshold: 0,
    duration: 5,
    vailType: 0,
    indicator: 1,
    before: '监测到雷达故障，',
    methods: ['email'],
    status: false,
  },
  {
    type: 3,
    id: 2,
    title: '雷达离线告警',
    tip: '检测到雷达离线，建议设置时间5分钟',
    threshold: 0,
    duration: 5,
    vailType: 0,
    indicator: 2,
    before: '监测到雷达离线，',
    methods: ['email'],
    status: false,
  },
]
export const ledConfig = [
  {
    type: 4,
    id: 1,
    title: 'LED屏故障告警',
    tip: 'LED屏上报异常故障，建议设置时间5分钟',
    threshold: 0,
    duration: 5,
    vailType: 0,
    indicator: 1,
    before: '监测到LED屏故障，',
    methods: ['email'],
    status: false,
  },
  {
    type: 4,
    id: 2,
    title: 'LED屏离线告警',
    tip: '检测到LED屏离线，建议设置时间5分钟',
    threshold: 0,
    duration: 5,
    vailType: 0,
    indicator: 2,
    before: '监测到LED屏离线，',
    methods: ['email'],
    status: false,
  },
]
export const crossConfig = [
  {
    type: 6,
    id: 1,
    title: '路口状态告警',
    tip: '路口状态告警，建议设置上下线频次为2次',
    threshold: 2,
    duration: 0,
    vailType: 0,
    indicator: 9,
    before: '1分钟内上下线频次达到',
    beforeUnit: '次',
    methods: ['email'],
    status: false,
  },
]
export const ipcConfig = [
  {
    type: 5,
    id: 9,
    title: '工控机离线告警',
    tip: '检测到工控机离线，建议设置时间5分钟',
    threshold: 0,
    duration: 5,
    vailType: 0,
    indicator: 2,
    before: '监测到工控机离线，',
    methods: ['email'],
    status: false,
  },
  {
    type: 5,
    id: 2,
    title: '高负载告警',
    tip: '平均负载用来衡量系统繁忙程度，建议设置平均负载超过1，持续时间为5分钟',
    threshold: 1,
    duration: 5,
    vailType: 1,
    indicator: 3,
    before: '平均负载超过',
    methods: ['email'],
    status: false,
  },
  {
    type: 5,
    id: 3,
    title: '低网速告警',
    tip:
      '持续的低网速影响到服务，需检修网络，建议设置低网速10K/s，持续时间为5分钟',
    threshold: 10,
    duration: 5,
    vailType: 2,
    indicator: 4,
    before: '网速低于',
    beforeUnit: 'K/s',
    methods: ['email'],
    status: false,
  },
  {
    type: 5,
    id: 4,
    title: 'CPU告警',
    tip:
      'CPU使用率持续过高，需检修工控机服务，建议设置CPU使用率为100%，持续时间为5分钟',
    threshold: 100,
    duration: 5,
    vailType: 3,
    indicator: 5,
    before: 'CPU使用率超过',
    beforeUnit: '%',
    methods: ['email'],
    status: false,
  },
  {
    type: 5,
    id: 5,
    title: 'GPU告警',
    tip:
      'GPU使用率持续过高，需检修工控机服务，建议设置GPU使用率为100%，持续时间为5分钟',
    threshold: 100,
    duration: 5,
    vailType: 3,
    indicator: 6,
    before: 'GPU使用率超过',
    beforeUnit: '%',
    methods: ['email'],
    status: false,
  },
  {
    type: 5,
    id: 6,
    title: '内存告警',
    tip:
      '内存使用率持续过高，需检修工控机服务，建议设置内存使用率为100%，持续时间为5分钟',
    threshold: 100,
    duration: 5,
    vailType: 3,
    indicator: 7,
    before: '内存使用率超过',
    beforeUnit: '%',
    methods: ['email'],
    status: false,
  },
  {
    type: 5,
    id: 7,
    title: '磁盘告警',
    tip:
      '磁盘使用率持续过高，需检修工控机服务，建议设置磁盘使用率为100%，持续时间为5分钟',
    threshold: 100,
    duration: 5,
    vailType: 3,
    indicator: 8,
    before: '磁盘使用率超过',
    beforeUnit: '%',
    methods: ['email'],
    status: false,
  },
]
export const socketData = {
  cross_num: 'crossroad-1-2',
  cross_name: '芙蓉大道与青梅路交叉口',
  longitude: '113.856307',
  latitude: '34.088500',
  cross_type: 1,
  status: 1,
  device_info: [
    {
      direction: 1,
      device_list: [
        { id: 18, device_name: '摄像头1', device_status: 2 },
        { id: 22, device_name: '雷达1', device_status: 1 },
        { id: 27, device_name: 'LED1', device_status: 1 },
      ],
    },
    {
      direction: 0,
      device_list: [
        { id: 21, device_name: '摄像头0', device_status: 2 },
        { id: 26, device_name: '雷达0', device_status: 2 },
      ],
    },
    {
      direction: 2,
      device_list: [
        { id: 19, device_name: '摄像头2', device_status: 1 },
        { id: 24, device_name: '雷达2', device_status: 1 },
        { id: 28, device_name: 'LED2', device_status: 1 },
      ],
    },
    {
      direction: 3,
      device_list: [
        { id: 20, device_name: '摄像头3', device_status: 1 },
        { id: 25, device_name: '雷达3', device_status: 1 },
        { id: 29, device_name: 'LED3', device_status: 1 },
      ],
    },
    {
      direction: 4,
      device_list: [
        { id: 21, device_name: '摄像头4', device_status: 1 },
        { id: 26, device_name: '雷达4', device_status: 1 },
        { id: 30, device_name: 'LED4', device_status: 1 },
      ],
    },
  ],
}
