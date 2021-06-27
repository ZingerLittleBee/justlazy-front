enum Api {
  Test = '/api/breeds/image/random',
  Login = '/login',
  GetServers = '/getUserInfo',
  GetPermCode = '/getPermCode'
}

import request from '../utils/http/request'

export function GetServers() {
  return request.get(Api.Test)
}
