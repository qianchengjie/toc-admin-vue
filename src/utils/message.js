import { Message } from 'element-ui'

export function showMsg (msg) {
  Message({
    message: msg,
    duration: 5 * 1000
  })
}
