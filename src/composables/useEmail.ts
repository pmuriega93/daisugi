import { daisugiApi } from "@/plugins/axios";
import { reactive, ref } from "vue"
import { useCookies } from '@vueuse/integrations/useCookies'
import { useMailStore } from '@/stores/mails'
import { storeToRefs } from 'pinia'

export function useEmail() {
    const errors = reactive({
        hasErrors: false,
        msg: ''
    });
    const success = ref(false);
    const isLoading = ref(false);
    const cookies = useCookies(['jwt']);

    const mailerStore = useMailStore()

    const { templates } = storeToRefs(mailerStore)

    async function sendEmail(data: any) {

        isLoading.value = true
        try {
            const resp = await daisugiApi.post('/mailer/send-email', {
                ...data
                },
              {
                  headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
                }
            )
            return resp;
        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo enviar el mensaje, intente más tarde'
        }

    }

    async function getAllTemplates() {
        isLoading.value = true;

        try {
            const resp = await daisugiApi.get(`/mailer/templates`, {
                headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
             })

            if (resp && resp.data) {
                mailerStore.saveMails(resp.data);
            }

            return resp.data;

        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudieron traer los templates'
        } finally {
            isLoading.value = true;
        }
    }

    if (!templates.value) {
        getAllTemplates()
    }

    async function saveTemplate(data: any) {
        isLoading.value = true;
        try {
            const resp = await daisugiApi.post(`/mailer/save-template`,
              {
                  subject: data.subject,
                  html: data.value
              },
              {
                headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
              }
            )
            success.value = true;

            if (!templates.value) {
                templates.value = []
            }
            templates.value.push(resp.data)
            return resp.data;

        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudieron traer los templates'
        } finally {
            isLoading.value = true;
        }
    }

    async function deleteTemplate(templateId: string) {
        isLoading.value = true;

        try {
            const resp = await daisugiApi.delete(`mailer/templates/${templateId}`,
              {
                  headers: { Authorization: 'Bearer ' + cookies.get('jwt') }
              })

            if (resp.data) {
                templates.value = templates.value.filter(t => t.id !== templateId)
            }

            return resp.data;

        } catch(e) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo borrar el template'
        } finally {
            isLoading.value = false;
        }
    }

    return {
        sendEmail,
        errors,
        isLoading,
        success,
        templates,
        getAllTemplates,
        saveTemplate,
        deleteTemplate
    }

}