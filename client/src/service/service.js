import axios from 'axios'

export const getNotes = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/notes`, {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}