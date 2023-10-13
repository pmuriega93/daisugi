import type { RouteRecordRaw } from "vue-router";


export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'product-page',
        component: () => import('@/views/ProductPage.vue'),
        meta: {
            layout: 'AppPPLayout'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginPage.vue'),
        meta: {
            layout: 'AppLayoutDefault'
        }
    }
]
