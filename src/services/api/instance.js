import axios from 'axios'

const apiBase = process.env.VUE_APP_API_URL

export const api = axios.create({
  baseURL: apiBase,
  headers: {
    'Content-Type': 'application/json'
  }
})

export function getAccessToken() {
  return localStorage.getItem('accessToken')
}