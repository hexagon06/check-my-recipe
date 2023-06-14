import * as axios from 'axios'

export async function get<TResponse>(url: string, options?: axios.AxiosRequestConfig) {
  const { data: response } = await axios.default.get<TResponse>(url, options)
  return response
}
