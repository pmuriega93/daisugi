import { daisugiApi } from "@/plugins/axios"
import { reactive, ref } from "vue";

import { useCookies } from '@vueuse/integrations/useCookies';
import { useUserStore } from '../stores/user';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

export function useLogin() {

    const isLoading = ref(false);
    const errors = reactive({
        hasErrors: false,
        msg: ''
    });

    const cookies = useCookies(['jwt']);
    const store = useUserStore();

    const { userInfo } = storeToRefs(store);

    const router = useRouter();

    async function login(email: string, password: string) {
        isLoading.value = true;
        try {
            const resp = await daisugiApi.post('/auth/login', {
                email,
                password
            })

            if (!resp) throw new Error('Ha ocurrido un error. Intente nuevamente más tarde.')

            const current = new Date();
            const expireTime = current.setTime(current.getTime() + (30 * 60 * 1000))
            cookies.set('jwt', resp.data.token, { expires: new Date(expireTime) })
            store.setLoginStatus(true);
            store.saveUserInfo(resp.data);

            errors.hasErrors = false;
            errors.msg = '';

            return resp;
        } catch (err: any) {
            errors.hasErrors = true;
            if (err.response && err.response.status === 401) {
                errors.msg = 'Usuario o contraseña incorrectos.'
            } else {
                errors.msg = 'Ha ocurrido un error. Intente nuevamente más tarde.'
            }

            isLoading.value = false;
        }

        isLoading.value = false;
       
    }

    async function logout() {
        store.setLoginStatus(false);
        cookies.remove('jwt');
        router.push('/');
    }

    return {
        login,
        logout,
        isLoading,
        errors,
        userInfo
    }
}
