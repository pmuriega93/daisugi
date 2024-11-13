import { daisugiApi } from "@/plugins/axios";
import { useAudiencesStore } from "@/stores/audiences"
import { useCookies } from '@vueuse/integrations/useCookies';
import { storeToRefs } from "pinia";
import { reactive, ref, watch } from 'vue'


export function useAudiences() {

    const store = useAudiencesStore();
    const { audiences, availableTypes } = storeToRefs(store);
    const isLoading = ref(false);
    const cookies = useCookies(['jwt']);

    const errors = reactive({
        hasErrors: false,
        msg: '',
    })


    async function getAvailableAudiencesTypes() {
        isLoading.value = true;

        try {
            const resp = await daisugiApi<string[]>('/audiences/audience-types');

            if (!resp) throw new Error();

            availableTypes.value = resp.data;

            isLoading.value = false;

        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudieron encontrar las audiencias.'
            isLoading.value = false;
        }
    }

    async function getAllAudiences() {
        isLoading.value = true;

        try {
            const resp = await daisugiApi('/audiences/find-all', {
                headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
            });

            if (!resp) throw new Error();

            store.saveAudiences(resp.data)

            isLoading.value = false;

        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudieron encontrar las audiencias.'
            isLoading.value = false;
        } finally {
            await getAudiencesGroups()
        }
    }

    if (!audiences.value) {
        getAvailableAudiencesTypes()
        getAllAudiences()
    }

    async function getAudiencesGroups() {
        try {
            const apiCalls = [];
            for (let i = 0; i < audiences.value.length; i++) {
                apiCalls.push(daisugiApi(`/audiences/groups/${audiences.value[i].id}`, {
                    headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
                }))
            }
            const resp = await Promise.all(apiCalls);

            const data = resp.map(res => res.data)

            if (!data) throw new Error();

            audiences.value = audiences.value.map((a:any) => {
                const groupData = data.find((g) => {
                    return g.find(((j:any) =>
                      j.audience.id === a.id
                    ));
                })
                return {
                    ...a,
                    groups: groupData.map((g: any) => {
                        return {
                            description: g.description,
                            id: g.id,
                        }
                    })
                }
            })

        } catch {
            errors.hasErrors = true;
            errors.msg = 'No se pudieron cargar los grupos.'
            isLoading.value = false;
        }
    }

    async function addNewAudience(audience: any) {
        isLoading.value = true;
        try {
            errors.hasErrors = false;
            errors.msg = '';

            const resp = await daisugiApi.post('/audiences/create-audience', {
                description: audience.description,
                type: audience.type,
            },
            {
                headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
            })

            if (resp && resp.data) {
                audiences.value?.push(resp.data);
            }

            isLoading.value = false;

        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo crear la audiencia'
            isLoading.value = false;
        }

    }

    async function deleteAudience(id: string) {
        isLoading.value = true;
        try {
            audiences.value = audiences.value?.filter((au: any) => au.id !== id);

            await daisugiApi.delete('/audiences/'+id,
                {
                    headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
                }
            )
        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo borrar la audiencia'
            isLoading.value = false;
        }
    }

    async function editAudience(id: string, body: any) {
        isLoading.value = true;
        try {
            const resp = await daisugiApi.patch('/audiences/'+id,
                {
                    description: body.description,
                    type: body.type,
                },
                {
                    headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
                }
            )

            if (resp && resp.data && audiences.value) {
                const editedAudienceIdx = audiences.value?.findIndex((au:any) => au.id === id);
                audiences.value[editedAudienceIdx] = resp.data;
            }
        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo editar la audiencia'
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        errors,
        audiences,
        availableTypes,
        addNewAudience,
        getAllAudiences,
        deleteAudience,
        editAudience
    }
}
