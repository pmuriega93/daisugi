import { daisugiApi } from "@/plugins/axios";
import { reactive, ref } from "vue"

export function useEmail() {
    const errors = reactive({
        hasErrors: false,
        msg: ''
    });

    const isLoading = ref(false);
    
    async function sendEmail(data: any) {

        isLoading.value = true
        try {
            const resp = await daisugiApi.post('/mailer/send-email', {
                ...data
            })
        } catch (error) {
            errors.hasErrors = true;
            errors.msg = 'No se pudo enviar el mensaje, intente más tarde'
        }

    }


    return {
        sendEmail,
        errors,
        isLoading
    }

}