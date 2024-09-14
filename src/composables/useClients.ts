import { daisugiApi } from "@/plugins/axios";
import { reactive, ref } from "vue"
import { useCookies } from '@vueuse/integrations/useCookies';

export function useClients() {

    const clients = ref();
    const errors = reactive({
        hasErrors: false,
        msg: ''
    });

    const isLoading = ref(false);
    const cookies = useCookies(['jwt']);


    async function getAllClients() {
        isLoading.value = true;
        try {
            const resp = await daisugiApi.get('/clients', {
                headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
            })

            if (!resp) throw new Error();
            isLoading.value = false;

            clients.value = resp.data;
        } catch (err) {
            errors.hasErrors = true;
            errors.msg = 'Ha ocurrido un error. Intente nuevamente más tarde.';
            isLoading.value = false;
        }
    }

    getAllClients();


    async function addNewClient(email: string, fullName: string) {
        isLoading.value = true;
        try {
            errors.hasErrors = false;
            errors.msg = '';

            const resp = await daisugiApi.post('/clients', {
                email,
                fullName
            },
            {
                headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
            })

            console.log(resp);
           
            isLoading.value = false;

        } catch (error) {

            errors.hasErrors = true;
            errors.msg = 'No se pudo cargar el usuario'
            isLoading.value = false;
        }

        await getAllClients();

    }

    async function deleteClient(id: string) {
        isLoading.value = true;
        try {
            await daisugiApi.delete('/clients/'+id,
                {
                    headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
                }
            )

            await getAllClients();

        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo borrar el usuario'
            isLoading.value = false;
        }
    }

    async function editClient(id: string, body: any) {
        isLoading.value = true;
        try {
            await daisugiApi.patch('/clients/'+id,
                {
                    email: body.email,
                    fullName: body.name
                },
                {
                    headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
                }
            )

            await getAllClients();

        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo editar el usuario'
            isLoading.value = false;
        }
    }

    return {
        clients,
        errors,
        addNewClient,
        isLoading,
        deleteClient,
        editClient
    }
}