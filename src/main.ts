import './assets/style.css'
import 'tailwindcss/tailwind.css';
import AOS from 'aos'

import 'aos/dist/aos.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Tailwind from "primevue/passthrough/tailwind";

import App from './App.vue'
import router from './router'

const app = createApp(App)
AOS.init()
app.use(createPinia())
app.use(router)
app.use(PrimeVue, { unstyled: true, pt: Tailwind });
app.use(ToastService)

app.mount('#app')
