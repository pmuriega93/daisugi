import { daisugiApi } from "@/plugins/axios";
import { reactive, ref } from "vue"
import { useCookies } from '@vueuse/integrations/useCookies';
import { useUserStore } from "@/stores/user";


export function useEditUser() {
    const errors = reactive({
        hasErrors: false,
        msg: '',
    })
    const success = ref(false);

    const cookies = useCookies(['jwt']);

    const store = useUserStore()
    const oldUser = store.userInfo;

    async function editUser(info: any, id: string) {
        try {
            const resp = await daisugiApi.patch(`/auth/${id}`, {
                ...info,
            },
            {
                headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
            },
            )

            if (!resp) throw new Error();

            success.value = true;

            if (resp) {
                store.saveUserInfo(resp.data);
            }
        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo editar el perfil, por favor intente nuevamente más tarde.'
        }
    }


    return {
        errors,
        success,
        editUser
    }
}