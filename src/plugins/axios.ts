import axios from 'axios'

export const daisugiApi = axios.create({
    baseURL: 'http://localhost:3000/api',
})
