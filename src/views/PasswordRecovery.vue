<script setup lang="ts">
import { computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import Button from 'primevue/button';
import Message from 'primevue/message';
import {isEmail, isRequired } from '@/helpers/validators';
import { useRecoverPassword } from '@/composables/useRecoverPassword';

const validations = {
    email: { isRequired, isEmail },
}
const state = reactive({ email: '' });
const v$ = useVuelidate(validations, state, { $lazy: true });

const { 
    sendRecoverEmail,
    isLoading,
    isSuccess,
    hasErrors 
} = useRecoverPassword()

const emailErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'email'));
const onSubmit = async() => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;

    await sendRecoverEmail(state.email)
    
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
                <label for="user" class="text-black-text text-lg">Email</label>
                <input v-model="state.email" type="text" class="border border-gray-400 rounded-md py-1 px-2" name="user" id="user">
                <span v-if="emailErrors" class="text-red-500">{{ emailErrors.$message.toString() }}</span>
            </div>

            <Button class="button" type="submit" rounded label="Ingresar" :loading="isLoading" />
            <Message v-if="isSuccess" severity="success">Si el usuario existe, recibirá un correo electrónico</Message>
            <Message v-if="hasErrors" severity="error"></Message>
        </form>

    </section>
</template>

<style scoped>
section {
    background: rgb(240,248,255);
    background: linear-gradient(120deg, rgba(240,248,255,1) 0%, rgba(223,240,255,1) 20%, rgba(254,253,195,1) 100%);

}
</style>
