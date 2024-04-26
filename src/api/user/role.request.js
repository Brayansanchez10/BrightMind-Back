import axios from 'axios'
const api = 'http://localhost:3068/PE'

export const getAllRoles = () => axios.get(`${api}/roles/getRoles`,{withCredentials: true})
export const getRole = (_id) => axios.get(`${api}/roles/getRole/${_id}`,{withCredentials: true})
export const updateRole = async (id, data) => axios.put(`${api}/roles/updateRole/${id}`, data,{withCredentials: true});



