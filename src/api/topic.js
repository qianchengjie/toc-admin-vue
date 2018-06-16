import request from '@/utils/request'
import { placeholder } from '@/utils/index'
export function findAllTopic () {
  return request({
    url: '/admin/topics',
    method: 'get'
  })
}

export function findTopicById ({ id }) {
  let url = placeholder('admin/topics/{id}', { id })
  return request({
    url,
    method: 'get'
  })
}

export function findAllUnrevierTopic () {
  return request({
    url: '/admin/topics/state?state=0',
    method: 'get'
  })
}

export function updateTopicState ({ id, state }) {
  let url = placeholder('admin/topics/{id}/state?state=' + state, { id })
  return request({
    url,
    method: 'put'
  })
}

export function sevenDaysTopicChange () {
  return request({
    url: 'admin/topics/sevenDaysChange',
    method: 'get'
  })
}
