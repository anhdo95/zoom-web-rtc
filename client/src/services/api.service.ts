import axios from './axios'

export function getRoomId(): Promise<string> {
  return axios.get('/')
}
