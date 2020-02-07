import axios from 'axios'
const config = require('../config.json')

export const request = ({ url, method = 'get', data = {} }) => {
  const token = localStorage.getItem('token')
  let headers = {}
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` }
  }

  return axios({
    url: `${config.apiUrl}${url}`,
    method,
    data,
    headers,
  })
    .then(({ data }) => data)
    .catch((e) => {
      console.log(e)
      return Promise.reject(e)
    })
}

export const newExpense = ({ amount, category, date }) => {
  return request({
    url: '/expenses/create',
    method: 'post',
    data: { amount, category, date },
  })
}

export const getExpense = () => {
  return request({
    url: '/expenses/',
    method: 'get',
  })
}
