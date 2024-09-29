import router from '@/router';
import axios from 'axios'

export const daisugiApi = axios.create({
    baseURL: 'http://localhost:3000/api',
})


daisugiApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          // Redirect to login page
          router.push('/login')
        } else {
          // Show a generic error message
          alert('An error occurred. Please try again later.')
        }
      }
      return Promise.reject(error)
    },
);

