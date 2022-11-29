import axios from 'axios'

export const addnote = async (title, description) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/notes`, {title, description})
  } catch (e) {
    alert(e)
    console.log(e)
  }
}



export const deletenote = async (ind) => {
  try{
    console.log(ind)
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${ind}`)
  } catch (e) {
    alert(e)
    console.log(e)
  }
}



export const updatenote = async (ind, title, description) => {
  try{
    const response = await axios.patch(`${process.env.REACT_APP_API_URL}/notes/${ind}`, {title, description})
  } catch (e) {
    alert(e)
    console.log(e)
  }
}