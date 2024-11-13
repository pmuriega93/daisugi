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
        redirect: { name: 'clients' },
        component: () => import('@/views/AdminConsole.vue'),
        meta: {
            layout: 'AppLayoutDefault',
            requiresAuth: true,
        },
        children: [
            {
                path: '',
                name: 'clients',
                component: () => import('@/views/ClientsList.vue'),
            },
            {
                path: '/usuario',
                name: 'userInfo',
                component: () => import('@/views/UserInfo.vue'),
            },
            {
                path: '/audiencias',
                name: 'audiences',
                component: () => import('@/views/AudiencesList.vue'),
            },
            {
                path: '/audiencias/:id',
                name: 'audience-clients',
                component: () => import('@/views/AudienceWithClients.vue'),
            },
            {
                path: '/grupos/:id',
                name: 'group-clients',
                component: () => import('@/views/GroupClients.vue'),
            },
            {
                path: '/emails',
                name: 'emails',
                component: () => import('@/views/EmailsList.vue'),
            },
            {
                path: '/nueva-plantilla',
                name: 'new-template',
                component: () => import('@/views/CreateTemplate.vue'),
            },
            {
                path: '/plantilla/:id',
                name: 'view-template',
                component: () => import('@/views/ViewTemplate.vue'),
            },
        ],
    }
]
