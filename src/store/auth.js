import { Bucket, data, action } from '@romgerman/bucket-store'
import authRoutes from '@/store/routes/auth'

const bucket = new Bucket(
  ...authRoutes,
  data({
    user: null,
    accessToken: null,
    refreshToken: null
  }),
  action('login', ({ routes, data }, username, password) => {
    return routes.login({
      username,
      password
    }).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      data.accessToken = res.access_token
      data.refreshToken = res.refresh_token
    })
  }),
  action('register', ({ routes }, username, email, name, password) => {
    return routes.register({
      username,
      email,
      name,
      password
    }).then(res => {
      if (res.success !== 1) {
        return Promise.reject()
      }
    })
  }),
  action('recover', ({ routes }, email) => {
    return routes.recover({
      email
    }).then(res => {
      if (res.success !== 1) {
        return Promise.reject()
      }
    })
  }),
  action('setPassword', ({ routes }, password, token) => {
    return routes.setPassword({
      password,
      token
    }).then(res => {
      if (res.success !== 1) {
        return Promise.reject()
      }
    })
  }),
  action('logout', ({ data }) => {
    data.accessToken = null
    data.refreshToken = null
  })
)

export default bucket