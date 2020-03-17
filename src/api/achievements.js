import request from '@/utils/request'

export default {
  getAllAchievements: () => {
    return request
      .get('/admin/achievements/')
      .then(res => res.data)
  },
  addAchievement: (title, content) => {
    return request
      .post('/admin/achievements/', { title: title, image: content })
      .then(res => res.data)
  },
  assignAchievement: (userIds, achievementId, comment) => {
    return request
      .post('/admin/achievements/assign/', { users: userIds, achievement: achievementId, comment: comment })
      .then(res => res.data)
  },
  unassignAchievement: (userIds, achievementId) => {
    return request
      .post('/admin/achievements/unassign/', { users: userIds, achievement: achievementId })
      .then(res => res.data)
  }
}
