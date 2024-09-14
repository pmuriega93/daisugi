<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue';
import Button from 'primevue/button';
import Message from 'primevue/message';
import useVuelidate from '@vuelidate/core';
import { useRouter } from 'vue-router';
import { areEqual, hasLowerCase, hasMinLength, hasNumber, hasSpecialChar, hasUpperCase, isEmail, isRequired } from '@/helpers/validators';
import { useRegister } from '@/composables/useRegister';

import { useToast } from "primevue/usetoast";
const toast = useToast();

const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};

const router = useRouter();

const success = ref(false);

const validations = {
    user: { isRequired },
    email: { isRequired, isEmail },
    password: { isRequired, hasUpperCase, hasLowerCase, hasMinLength: hasMinLength(6), hasNumber, hasSpecialChar },
    repeatPassword: { isRequired, areEqual: areEqual(computed(() => state.password)) } }
const state = reactive({ user: '', email: '', password: '', repeatPassword: '' });
const v$ = useVuelidate(validations, state, { $lazy: true });

const userErrors = computed(() => v$.value.$errors.find(error => error.$property === 'user'));
const emailErrors = computed(() => v$.value.$errors.find(error => error.$property === 'email'));
const passwordErrors = computed(() => v$.value.$errors.find(error => error.$property === 'password'));
const repeatPasswordErrors = computed(() => v$.value.$errors.find(error => error.$property === 'repeatPassword'));

const { register, errors, isLoading } = useRegister();

const onSubmit = async() => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;
    await register({ email: state.email, password: state.password, username: state.user })

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
                <label for="user" class="text-black-text text-lg">Nombre de usuario</label>
                <input v-model="state.user" type="text" class="border border-gray-400 rounded-md py-1 px-1" name="user" id="user">
                <span v-if="userErrors" class="text-red-500">{{ userErrors.$message.toString() }}</span>
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="user" class="text-black-text text-lg">Email</label>
                <input v-model="state.email" type="text" class="border border-gray-400 rounded-md py-1 px-1" name="user" id="user">
                <span v-if="emailErrors" class="text-red-500">{{ emailErrors.$message.toString() }}</span>
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="password" class="text-black-text text-lg">Contraseña</label>
                <input v-model="state.password" type="password" class="border border-gray-400 rounded-md py-1 px-1" name="password" id="password">
                <span v-if="passwordErrors" class="text-red-500">{{ passwordErrors.$message.toString() }}</span>
            </div>
            <div class="flex flex-col gap-3 w-full">
                <label for="password" class="text-black-text text-lg">Repetir Contraseña</label>
                <input v-model="state.repeatPassword" type="password" class="border border-gray-400 rounded-md py-1 px-1" name="repeat-password" id="repeat-password">
                <span v-if="repeatPasswordErrors" class="text-red-500">{{ repeatPasswordErrors.$message.toString() }}</span>
            </div>

            <Button class="button" type="submit" rounded :loading="isLoading" label="Registrarse" />
            <Toast class="mx-auto" position="bottom-center" />
            <Message v-if="success" severity="success">Se ha registrado con éxito</Message>
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