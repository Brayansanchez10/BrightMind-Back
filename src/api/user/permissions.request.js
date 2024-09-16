import axios from 'axios'
const api = 'https://back-brightmind.vercel.app/PE'

export const getAllPermissions = () => axios.get(`${api}/permissions/getPermissions`)