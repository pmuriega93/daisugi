import { useCookies } from '@vueuse/integrations/useCookies';
import { daisugiApi } from "@/plugins/axios";
import { useUserStore } from "@/stores/user";
import { ref, reactive } from "vue";

export function useRegister() {

    const isLoading = ref(false);
    const errors = reactive({
        hasErrors: false,
        msg: ''
    });

    const cookies = useCookies(['jwt']);
    const store = useUserStore();

    async function register(data: { username: string, email: string, password: string }) {

        try {
            const resp = await daisugiApi.post('/auth/register', {
                email: data.email,
                password: data.password,
                fullName: data.username
            })

            cookies.set('jwt', resp.data.token)
            store.setLoginStatus(true);

            errors.hasErrors = false;
            errors.msg = '';
    
            return resp;

        } catch (err: any) {
            errors.hasErrors = true;
            if (err.response && err.response.status === 400) {
                errors.msg = 'Ya existe un usuario registrado con ese email'
            } else {
                errors.msg = 'Ha ocurrido un error. Intente nuevamente más tarde.'
            }

            isLoading.value = false;
        }

        isLoading.value = false;
    }
    return {
        register,
        isLoading,
        errors
    }
}
