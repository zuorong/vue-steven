import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
const url = 'http://139.196.87.48:8001'
export function queryMenu() {
  return request({
    // url: `${url}/menu/findMenuTree`
    url: `menu.json`
  })
}

export function saveMenu(data) {
  return request({
    url: `${url}/menu/save`,
    method: 'post',
    data
  })
}

export function queryRoles(data) {
  return request({
    // url: `${url}/role/findPage`,
    // method: 'post',
    // data: {
    //   pageNum: 1,
    //   pageSize: 10,
    //   columnFilters: {
    //     name: {
    //       name: 'name',
    //       value: ''
    //     }
    //   }
    // }
    url: `roles.json`
  })
}

export function saveRoles(data) {
  return request({
    url: `${url}/role/saveRoleMenus`,
    method: 'post',
    data
  })
}

export function queryRolesDetail(params) {
  return request({
    // url: `${url}/role/findRoleMenus?roleId=${params}`
    url: `roles-${params}.json`
  })
}
