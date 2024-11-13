<script setup lang="ts">
import { useClients } from '@/composables/useClients';
import { isEmail, isRequired } from '@/helpers/validators';
import Button from 'primevue/button';

import useVuelidate from '@vuelidate/core';
import { computed, reactive, ref, watch } from 'vue';
import Message from 'primevue/message';

import { useToast } from "primevue/usetoast";
const toast = useToast();

const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};

const emit = defineEmits<{
    (e:'close-modal'): void
}>()

const success = ref(false);

const { errors, isLoading, addNewClient } = useClients();

const state = reactive({
    fullName: '',
    email: '',
    file: '',
    phone: ''
})

const validations = {
    email: { isRequired, isEmail },
    fullName: { isRequired },
    file: { isRequired },
    phone: { isRequired },
}

const v$ = useVuelidate(validations, state, { $lazy: true });

const emailErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'email'));
const nameErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'fullName'));
const fileErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'file'));
const phoneErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'phone'));


async function onSubmit() {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;

    await addNewClient(state);

    if (errors.hasErrors) {
        return;
    }
    success.value = true;
}

watch(success, (val) => {
    if (val) {
        show();
        emit('close-modal')
    }
})

</script>
<template>
  <div class="fixed top-0 left-0 w-full h-full">
    <div class="w-[500px] top-1/4 left-[35%] p-7 flex flex-col items-center rounded-md bg-primary-blue-900 text-white">
            <header class="w-full flex items-center justify-between">
                <h3 class="text-start font-semibold">Registrar cliente</h3>
    
                <i class="pi pi-times cursor-pointer" @click="emit('close-modal')" />
            </header>

            <form @submit.prevent="onSubmit" class="mt-12 w-full" >
                <div class="flex flex-col gap-3 w-full">
                    <label for="user" class="text-white text-lg">Email</label>
                    <input v-model="state.email" type="text" class="border text-black-text border-gray-400 rounded-md py-1 px-2" name="user" id="user">
                    <span v-if="emailErrors" class="text-red-500">{{ emailErrors.$message.toString() }}</span>
                </div>
                <div class="flex flex-col gap-3 w-full">
                    <label for="fullName" class="text-white text-lg">Nombre</label>
                    <input v-model="state.fullName" type="text" class="border border-gray-400 text-black-text rounded-md py-1 px-2" name="fullName" id="fullName" />
                    <span v-if="nameErrors" class="text-red-500">{{ nameErrors.$message.toString() }}</span>
                </div>
                <div class="flex flex-col gap-3 w-full">
                    <label for="phone" class="text-white text-lg">Teléfono</label>
                    <input v-model="state.phone" type="text" class="border border-gray-400 text-black-text rounded-md py-1 px-2" name="phone" id="phone" />
                    <span v-if="phoneErrors" class="text-red-500">{{ phoneErrors.$message.toString() }}</span>
                </div>
                <div class="flex flex-col gap-3 w-full">
                    <label for="file" class="text-white text-lg">Legajo</label>
                    <input v-model="state.file" type="text" class="border border-gray-400 text-black-text rounded-md py-1 px-2" name="file" id="file" />
                    <span v-if="fileErrors" class="text-red-500">{{ fileErrors.$message.toString() }}</span>
                </div>

                <div class="h-11 mb-3">
                    <Button class="button h-11" type="submit" rounded label="Guardar" :loading="isLoading" />
                </div>
                <Toast class="mx-auto" position="bottom-center" />
                <Message v-if="success" severity="success">Agregado con éxito</Message>
                <Message v-if="errors.hasErrors" severity="error">{{ errors.msg }}</Message>
            </form>

        </div>
    </div>
</template>
 