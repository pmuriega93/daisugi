import { daisugiApi } from "@/plugins/axios";
import { ref } from "vue"


export function useRecoverPassword() {

    const isLoading = ref(false)
    const isSuccess = ref(false)
    const hasErrors = ref(false)

    async function sendRecoverEmail(email: string) {
        isLoading.value = true;

        try {
            const resp = await daisugiApi.post('/auth/forgot-password', {
                email,
            });

            if (!resp || resp.status !== 201)
                throw new Error('No se pudo enviar el mail, intente nuevamente por favor')

            isSuccess.value = true

        } catch (error) {
            console.log(error)
            hasErrors.value = true
        } finally {
            isLoading.value = false
        }
    }

    async function resetPassword(newPassword: string, resetToken: string) {
        isLoading.value = true;

        try {
            const resp = await daisugiApi.patch('/auth/reset-password', {
                newPassword,
                resetToken
            });

            if (!resp || resp.status !== 200)
                throw new Error('No se pudo actualizar la contraseña, intente nuevamente por favor')

            isSuccess.value = true

        } catch (error) {
            console.log(error)
            hasErrors.value = true
        } finally {
            isLoading.value = false
        }
    }

    return {
        sendRecoverEmail,
        resetPassword,
        isLoading,
        isSuccess,
        hasErrors
    }
}
