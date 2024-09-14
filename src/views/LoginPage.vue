<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { useRouter } from "vue-router";
import useVuelidate from '@vuelidate/core';
import { hasLowerCase, hasMinLength, hasNumber, hasSpecialChar, hasUpperCase, isEmail, isRequired } from '@/helpers/validators';
import { useLogin } from '@/composables/useLogin';

import { useToast } from "primevue/usetoast";
const toast = useToast();

const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};

const success = ref(false);

const router = useRouter();

const { login, isLoading, errors } = useLogin();

const validations = {
    email: { isRequired, isEmail },
    password: { isRequired, hasUpperCase, hasLowerCase, hasMinLength: hasMinLength(6), hasNumber, hasSpecialChar },
}
const state = reactive({ email: '', password: '' });
const v$ = useVuelidate(validations, state, { $lazy: true });

const emailErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'email'));
const passwordErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'password'));

const showPassword = ref(false);

const onSubmit = async() => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;


    await login(state.email, state.password)
    
    if (errors.hasErrors) {
        return;
    }
    success.value = true;
}

watch(success, (val) => {
    if (val) {
        show();
        router.push({name: 'console'});
    }
})


</script>
<template>
    <section class="w-full mx-auto h-screen flex flex-col gap-12 items-center justify-center">

        <img src="/logo/daisugi-logo.png" />

        <form @submit.prevent="onSubmit" class="w-80 flex flex-col gap-5 items-center justify-center">
            <div class="flex flex-col gap-3 w-full">
                <label for="user" class="text-black-text text-lg">Email</label>
                <input v-model="state.email" type="text" class="border border-gray-400 rounded-md py-1 px-2" name="user" id="user">
                <span v-if="emailErrors" class="text-red-500">{{ emailErrors.$message.toString() }}</span>
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="password" class="text-black-text text-lg">Contraseña</label>
                <input v-model="state.password" :type="showPassword ? 'text' : 'password'" class="border border-gray-400 rounded-md py-1 px-2" name="password" id="password" />
                <div @click="showPassword = !showPassword" class="text-gray-600 cursor-pointer absolute right-3 top-11">
                    <i v-if="showPassword" class="pi pi-eye" />
                    <i v-else class="pi pi-eye-slash" />
                </div>

                <span v-if="passwordErrors" class="text-red-500">{{ passwordErrors.$message.toString() }}</span>
            </div>

            <Button class="button" type="submit" rounded label="Ingresar" :loading="isLoading" />
            <Toast class="mx-auto" position="bottom-center" />
            <Message v-if="success" severity="success">Logeado con éxito</Message>
            <Message v-if="errors.hasErrors" severity="error">{{ errors.msg }}</Message>
        </form>

    </section>
</template>


<style scoped>
section {
    background: rgb(240,248,255);
    background: linear-gradient(120deg, rgba(240,248,255,1) 0%, rgba(223,240,255,1) 20%, rgba(254,253,195,1) 100%);

}
</style>
