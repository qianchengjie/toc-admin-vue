import request from '@/utils/request'
import qs from 'qs'

export function findAllUser () {
  return request({
    url: '/admin/users',
    method: 'get'
  })
}

export function sevenDaysUserChange () {
  return request({
    url: 'admin/users/sevenDaysChange',
    method: 'get'
  })
}

export function searchUser ({ username, phone, pageNum }) {
  return request({
    url: 'admin/user/search' + toQueryString({ username, phone, pageNum }),
    method: 'get'
  })
}

export function addUser ({ username, phone }) {
  const data = qs.stringify({
    phone,
    username
  })
  return request({
    url: 'admin/users',
    method: 'post',
    data
  })
}

export function findAmount () {
  return request({
    url: 'admin/findUserAmountAndTopicAmount',
    method: 'get'
  })
}

export function findAllRole () {
  return request({
    url: 'admin/roles',
    method: 'get'
  })
}

export function changeRole ({ userId, roleIds }) {
  const data = qs.stringify({
    userId,
    roleIdsStr: JSON.stringify(roleIds)
  })
  return request({
    url: 'admin/user/changeRole',
    method: 'post',
    data
  })
}

function toQueryString (obj) {
  let result = []
  for (let key in obj) {
    key = encodeURIComponent(key)
    let values = obj[key]
    if (values && values.constructor === Array) {
      let queryValues = []
      for (let i = 0, len = values.length, value; i < len; i++) {
        value = values[i]
        queryValues.push(toQueryPair(key, value))
      }
      result = result.concat(queryValues)
    } else {
      result.push(toQueryPair(key, values))
    }
  }
  return '?' + result.join('&')
}

function toQueryPair (key, value) {
  if (typeof value === 'undefined') {
    return key
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value))
}
