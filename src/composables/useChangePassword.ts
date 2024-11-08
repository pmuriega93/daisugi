import { reactive, ref } from "vue";
import { useCookies } from '@vueuse/integrations/useCookies';
import { daisugiApi } from "@/plugins/axios";


export function useChangePassword() {
    const errors = reactive({
        hasErrors: false,
        msg: '',
    })
    const success = ref(false);

    const isLoading = ref(false);

    const cookies = useCookies(['jwt']);

    async function changePassword(oldPassword: string, newPassword: string) {
        try {
            isLoading.value = true;
            const resp = await daisugiApi.patch('/auth/change-password', {
                oldPassword,
                newPassword,
            },
            {
                headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
            },
        )
            if ((resp && resp.status !== 200) || !resp.data) throw new Error();

            success.value = true;
        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo editar el perfil, por favor intente nuevamente más tarde.'
        } finally {
            isLoading.value = false;
        }
    }

    return {
        changePassword,
        errors,
        success,
        isLoading
    }
}