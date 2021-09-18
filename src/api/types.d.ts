export interface ParamsType {
  dataName?: string
  projectName?: string
  algorithmName?: string
  userName?: string
  workflowName?: string
  projectId?: string | number
  current: number
  size: number
}

export interface TableParams {
  list: QueryType
  input: string
}

export interface QueryType {
  current: number
  size: number
}

export interface ResponseType {
  code?: number
  msg?: string
  data?: any
}
export interface AlgorithmType {
  algorithmName: string
  algorithmId: number
  nodeName?: string
}
export interface TableNameType {
  id: string | number
  name: string
  runStatus?: number | string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}
