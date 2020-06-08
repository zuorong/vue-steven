import store from '@/store'
export function checkPermission(pers) {
  const permission = store.state.user.permission
  return permission.includes(pers)
}
