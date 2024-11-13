import { daisugiApi } from "@/plugins/axios";
import { useAudiencesStore } from "@/stores/audiences"
import { useCookies } from '@vueuse/integrations/useCookies';
import { storeToRefs } from "pinia";
import { reactive, ref, watch } from 'vue'


export function useGroups() {

    const store = useAudiencesStore();
    const { audiences } = storeToRefs(store);
    const isLoading = ref(false);
    const cookies = useCookies(['jwt']);

    const errors = reactive({
        hasErrors: false,
        msg: '',
    })


   async function addNewGroup(group: any) {
        isLoading.value = true;
        try {
            errors.hasErrors = false;
            errors.msg = '';

            const resp = await daisugiApi.post('/audiences/create-group', {
                description: group.description,
                audience: group.audience,
            },
            {
                headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
            })

            if (resp && resp.data) {
                const audienceToAddGroup = audiences.value.findIndex((a:any) => a.description === group.audience)
                if (!audiences.value[audienceToAddGroup].groups) {
                    audiences.value[audienceToAddGroup].groups = [];
                }
                audiences.value[audienceToAddGroup].groups.push({
                    description: resp.data.description,
                    id: resp.data.id,
                });
            }

            isLoading.value = false;

        } catch (error) {
            console.log(error)
            errors.hasErrors = true;
            errors.msg = 'No se pudo crear el grupo'
            isLoading.value = false;
        }
    }

    async function deleteGroup(id: string) {
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

    async function editGroup(id: string, body: any) {
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
        addNewGroup,
        deleteGroup,
        editGroup,
    }
}
