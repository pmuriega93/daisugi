import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies';
import { routes } from './routes'
import { useUserStore } from '@/stores/user';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const store = useUserStore();

  const cookies = useCookies(['jwt']);

  const isAuthenticated = cookies.get('jwt') && store.isLoggedIn;

  if (isAuthenticated && to.path.includes('/login')) {
    return { name: 'console' }
  }

  if (!isAuthenticated && to.meta.requiresAuth) {
    store.setLoginStatus(false);
    cookies.remove('jwt');

    return { name: 'login' }
  }
 
})

export default router
