import request from '@/utils/request'

export default {
  getAllJams: (page, limit) => {
    return request
      .get(`jams/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  getJam: (url) => {
    return request
      .get(`jams/${url}/`)
      .then(res => res.data)
  },
  createJam: (title, description, shortDescription, url, startDate, endDate, criterias, logo) => {
    return request
      .post(`jams/`, {
        title,
        description,
        short_description: shortDescription,
        url,
        start_date: startDate,
        end_date: endDate,
        criterias,
        logo
      })
      .then(res => res.data)
  },
  editJam: (title, description, shortDescription, url, startDate, endDate, criterias, logo) => {
    return request
      .post(`jams/${url}/`, {
        title,
        description,
        short_description: shortDescription,
        url,
        start_date: startDate,
        end_date: endDate,
        criterias,
        logo
      })
      .then(res => res.data)
  },
  enterJam: (url) => {
    return request
      .post(`jams/${url}/participiate/`, {})
      .then(res => res.data)
  },
  leaveJam: (url) => {
    return request
      .post(`jams/${url}/leave/`, {})
      .then(res => res.data)
  },
  startJam: (url) => {
    return request
      .post(`jams/${url}/start/`, {})
      .then(res => res.data)
  },
  finishJam: (url) => {
    return request
      .post(`jams/${url}/finish/`, {})
      .then(res => res.data)
  },
  getJamEntries: (jamUrl) => {
    return request
      .get(`jams/${jamUrl}/entries/`)
      .then(res => res.data)
  },
  getMyEntry: (jamUrl) => {
    return request
      .get(`jams/${jamUrl}/entry/my/`)
      .then(res => res.data)
  },
  editJamEntry: (title, info, shortInfo, url, logo, links, jamUrl) => {
    return request
      .post(`jams/${jamUrl}/entry/my/`, {
        title,
        info,
        short_info: shortInfo,
        url,
        logo,
        links
      })
      .then(res => res.data)
  },
  getEntry: (jamUrl, entryUrl) => {
    return request
      .get(`jams/${jamUrl}/entry/${entryUrl}/`)
      .then(res => res.data)
  },
  getEntryCriterias: (jamUrl, entryUrl) => {
    return request
      .get(`jams/${jamUrl}/entry/${entryUrl}/criterias/`)
      .then(res => res.data)
  },
  addEntryVotes: (jamUrl, entryUrl, criterias) => {
    return request
      .post(`jams/${jamUrl}/entry/${entryUrl}/criterias/`, criterias)
      .then(res => res.data)
  },
}
