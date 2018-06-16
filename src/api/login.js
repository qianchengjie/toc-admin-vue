import request from '@/utils/request'
import qs from 'qs'

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function sendCode ({ phone }) {
  const data = stringify({ phone })
  return request({
    url: '/admin/sendCode',
    method: 'post',
    data
  })
}

export function loginByCode ({ phone, code }) {
  const data = stringify({
    phone,
    code
  })
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function logout () {
  // return request({
  //   url: '/logout',
  //   method: 'post'
  // })
}

export function getUserInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

function stringify (str) {
  return qs.stringify(str)
}
