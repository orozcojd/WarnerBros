import axios from 'axios'
import { API_URL, API_IMAGE_URL, API_TOKEN } from '@/common/config'

export const ApiService = (options = {}) => {
  return axios.create({
    baseURL: API_URL,
    ...options,
    headers: { Authorization: API_TOKEN }
  })
}

export const ApiImageService = ({headers = {}}) => {
  return axios.create({
    baseURL: API_IMAGE_URL
    // headers: {
    //   Authorization: API_TOKEN,
    //   ...headers
    // }
  })
}
