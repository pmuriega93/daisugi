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
    },
    {
        path: '/recuperar-password',
        name: 'password-recovery',
        component: () => import('@/views/PasswordRecovery.vue'),
        meta: {
            layout: 'AppLayoutDefault'
        }
    },
    {
        path: '/reset-password',
        name: 'password-reset',
        component: () => import('@/views/PasswordReset.vue'),
        meta: {
            layout: 'AppLayoutDefault'
        }
    },
    {
        path: '/registro',
        name: 'register',
        component: () => import('@/views/RegisterPage.vue'),
        meta: {
            layout: 'AppLayoutDefault'
        }
    },
    {
        path: '/consola',
        name: 'console',
        component: () => import('@/views/AdminConsole.vue'),
        meta: {
            layout: 'AppLayoutDefault',
            requiresAuth: true,
        }
    }
]
