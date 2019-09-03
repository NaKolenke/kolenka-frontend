import { route } from '@romgerman/bucket-store'
import Request from '@/utils/request'

const request = new Request(process.env.VUE_APP_API_URL)

export default [
  route('login', payload => {
    return request
    .post('api/users/login/', payload)
    .then(res => res.json())
  }),
  route('register', payload => {
    return request
    .post('api/users/register/', payload)
    .then(res => res.json())
  }),
  route('recover', payload => {
    return request
    .post('api/users/recover-password/', payload)
    .then(res => res.json())
  }),
  route('setPassword', payload => {
    return request
    .post('api/users/new-password/', payload)
    .then(res => res.json())
  }),
  route('isTokenValid', payload => {
    return request
    .post('api/tokens/validate/', payload)
    .then(res => res.json())
  }),
  route('refreshToken', payload => {
    return request
    .post('api/tokens/refresh/', payload)
    .then(res => res.json())
  })
]