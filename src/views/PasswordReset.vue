<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { areEqual, hasLowerCase, hasMinLength, hasNumber, hasSpecialChar, hasUpperCase, isRequired } from '@/helpers/validators';
import { useRecoverPassword } from '@/composables/useRecoverPassword';
import { useRoute } from 'vue-router';

const route = useRoute()

const token = computed(() => route.query.token?.toString() || '')

const showPassword = ref(false);
const showPasswordRepeat = ref(false);


const validations = {
    password: { isRequired, hasUpperCase, hasLowerCase, hasMinLength: hasMinLength(6), hasNumber, hasSpecialChar },
    repeatPassword: { isRequired, areEqual: areEqual(computed(() => state.password)) } }
const state = reactive({ user: '', email: '', password: '', repeatPassword: '' });
const v$ = useVuelidate(validations, state, { $lazy: true });
const { 
    resetPassword,
    isLoading,
    isSuccess,
    hasErrors
} = useRecoverPassword()

const passwordErrors = computed(() => v$.value.$errors.find(error => error.$property === 'password'));
const repeatPasswordErrors = computed(() => v$.value.$errors.find(error => error.$property === 'repeatPassword'));
const onSubmit = async() => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect || !token.value || token.value.length === 0) return;

    await resetPassword(state.password, token.value)
    
    if (hasErrors) {
        return;
    }
}

</script>
<template>
    <section class="w-full mx-auto h-screen flex flex-col gap-12 items-center justify-center">
        <img src="/logo/daisugi-logo.png" />
        <form @submit.prevent="onSubmit" class="w-96 max-w-[90vw] flex flex-col gap-5 items-center justify-center">
            <div class="flex flex-col gap-3 w-full">
                <label for="password" class="text-black-text text-lg">Contraseña</label>
                <input v-model="state.password" :type="showPassword ? 'text' : 'password'" class="border border-gray-400 rounded-md py-1 px-1" name="password" id="password">
                <div @click="showPassword = !showPassword" class="text-gray-600 cursor-pointer absolute right-3 top-11">
                    <i v-if="showPassword" class="pi pi-eye" />
                    <i v-else class="pi pi-eye-slash" />
                </div>

                <span v-if="passwordErrors" class="text-red-500">{{ passwordErrors.$message.toString() }}</span>
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="password" class="text-black-text text-lg">Repetir Contraseña</label>
                <input v-model="state.repeatPassword" :type="showPasswordRepeat ? 'text' : 'password'" class="border border-gray-400 rounded-md py-1 px-1" name="repeat-password" id="repeat-password">
                <div @click="showPasswordRepeat = !showPasswordRepeat" class="text-gray-600 cursor-pointer absolute right-3 top-11">
                    <i v-if="showPasswordRepeat" class="pi pi-eye" />
                    <i v-else class="pi pi-eye-slash" />
                </div>

                <span v-if="repeatPasswordErrors" class="text-red-500">{{ repeatPasswordErrors.$message.toString() }}</span>

            </div>

            <Button class="button" type="submit" rounded label="Resetear contraseña" :loading="isLoading" />
            <Message v-if="isSuccess" severity="success">Se ha modificado la contraseña con éxito <br><RouterLink to="/login" class="underline text-blue-500">Ir al login</RouterLink></Message>
            <Message v-if="hasErrors" severity="error">Link inválido</Message>
        </form>

    </section>
</template>

<style scoped>
section {
    background: rgb(240,248,255);
    background: linear-gradient(120deg, rgba(240,248,255,1) 0%, rgba(223,240,255,1) 20%, rgba(254,253,195,1) 100%);

}
</style>
