import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import 'tailwindcss/tailwind.css';



import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Tailwind from "primevue/passthrough/tailwind";

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, { unstyled: true, pt: Tailwind });
app.use(ToastService)

app.mount('#app')
