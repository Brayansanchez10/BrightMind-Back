import axios from "axios";

const instance = axios.create({
    baseURL: 'https://back-brightmind.vercel.app/PE',
    withCredentials: true
})

export default instance