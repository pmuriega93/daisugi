<script setup lang="ts">
import { reactive, ref } from 'vue';
import Button from 'primevue/button';
import Message from 'primevue/message';

const user = ref<string>();
const password = ref<string>();
const errorMessage = reactive({
    hasErrors: false,
    msg: '',
})
const success = ref(false);

const onSubmit = () => {
    if (user.value && user.value.length > 0 && password.value && password.value.length > 0) {
        success.value = true;
        setTimeout(() => {
            success.value = false;
        }, 2000);
    } else {
        errorMessage.hasErrors = true;
        errorMessage.msg = 'Datos incorrectos. Revise los campos e intente nuevamente';
    }
}

</script>
<template>
    <section class="w-full mx-auto h-screen flex flex-col gap-12 items-center justify-center">

        <img src="/logo/daisugi-logo.png" />

        <form @submit.prevent="onSubmit" class="flex flex-col gap-5 items-center justify-center">
            <div class="flex flex-col gap-3">
                <label for="user" class="text-black-text text-lg">Nombre de usuario</label>
                <input v-model="user" type="text" class="border border-gray-400 rounded-md py-1 px-1" name="user" id="user">
            </div>
            <div class="flex flex-col gap-3">
                <label for="password" class="text-black-text text-lg">Contraseña</label>
                <input v-model="password" type="password" class="border border-gray-400 rounded-md py-1 px-1" name="password" id="password">
            </div>

            <Button class="bg-primary-blue-500 mt-5 px-14" type="submit" rounded label="Ingresar" />
            <Toast class="mx-auto" position="bottom-center" />
            <Message v-if="success" severity="success">Logeado con éxito</Message>
        </form>

    </section>
</template>


<style scoped>
section {
    background: rgb(240,248,255);
    background: linear-gradient(120deg, rgba(240,248,255,1) 0%, rgba(223,240,255,1) 20%, rgba(254,253,195,1) 100%);

}
</style>