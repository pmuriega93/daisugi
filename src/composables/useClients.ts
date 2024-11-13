import { daisugiApi } from "@/plugins/axios";
import { reactive, ref } from "vue"
import { useCookies } from '@vueuse/integrations/useCookies';
import type { Client } from "@/interfaces/clients";
import { useClientsStore } from "@/stores/clients";
import { storeToRefs } from "pinia";

export function useClients() {

    const clientsStore = useClientsStore();

    const { clients } = storeToRefs(clientsStore);
    
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

            clientsStore.saveClients(resp.data);
        } catch (err) {
            errors.hasErrors = true;
            errors.msg = 'Ha ocurrido un error. Intente nuevamente más tarde.';
            isLoading.value = false;
        }
    }

    if (!clients.value) {
        getAllClients();
    }


    async function addNewClient(client: Client) {
        isLoading.value = true;
        try {
            errors.hasErrors = false;
            errors.msg = '';

            const resp = await daisugiApi.post('/clients', {
                email: client.email,
                fullName: client.fullName,
                phone: client.phone,
                file: client.file
            },
            {
                headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
            })

            if (resp && resp.data) {
                clients.value?.push(resp.data);
            }

            isLoading.value = false;

        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo cargar el usuario'
            isLoading.value = false;
        }

    }

    async function deleteClient(client: Client) {
        isLoading.value = true;
        try {
            clients.value = clients.value?.filter(cl => cl.id !== client.id);

            await daisugiApi.delete('/clients/'+client.id,
                {
                    headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
                }
            )
        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo borrar el usuario'
            isLoading.value = false;
        }
    }

    async function deleteMultiple(clients: Client[]) {
        for (const client of clients) {
            await deleteClient(client);
        }
    }

    async function editClient(id: string, body: Partial<Client>) {
        isLoading.value = true;
        if (body.id) delete body.id
        try {
            const resp = await daisugiApi.patch('/clients/'+id,
                {
                    ...body
                },
                {
                    headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
                }
            )

            if (resp && resp.data && clients.value) {
                const editedClientIdx = clients.value?.findIndex(cl => cl.id === id);
                clients.value[editedClientIdx] = resp.data;
            }
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
        deleteMultiple,
        editClient
    }
}