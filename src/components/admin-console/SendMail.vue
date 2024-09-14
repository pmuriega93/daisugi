<script setup lang="ts">
import { isRequired } from '@/helpers/validators';
import Button from 'primevue/button';

import { useEmail } from '@/composables/useEmail'

import useVuelidate from '@vuelidate/core';
import { computed, reactive, ref, watch } from 'vue';
import Message from 'primevue/message';

import { useToast } from "primevue/usetoast";
const toast = useToast();

const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};

const props = defineProps<{
    client: any
}>()


const emit = defineEmits<{
    (e:'close-modal'): void
}>()

const success = ref(false);

const { errors, isLoading, sendEmail } = useEmail();

const state = reactive({
    subject: '',
    message: ''
})

const validations = {
    subject: { isRequired },
    message: { isRequired },
}

const v$ = useVuelidate(validations, state, { $lazy: true });

const subjectErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'email'));
const messageErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'name'));


async function onSubmit() {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;

    const body = reactive({
        recipients:[ {
            name: props.client.fullName,
            address: props.client.email
        }],
        subject: state.subject,
        html: state.message
    })

    await sendEmail(body);

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
    <div class="fixed top-0 w-full h-full bg-black/50">
        <div class="top-36 left-[35%] w-[500px] h-[500px] p-7 max-w-full flex flex-col items-center rounded-md bg-primary-blue-900 text-white">
            <header class="w-full flex items-center justify-between">
                <h3 class="text-start font-semibold">Enviar Mail</h3>
    
                <i class="pi pi-times cursor-pointer" @click="emit('close-modal')" />
            </header>

            <form @submit.prevent="onSubmit" class="mt-12 w-full" >
                <div class="flex flex-col gap-3 w-full">
                    <label for="user" class="text-white text-lg">Asunto</label>
                    <input v-model="state.subject" type="text" class="border text-black-text border-gray-400 rounded-md py-1 px-2" name="subject" id="subject">
                    <span v-if="subjectErrors" class="text-red-500">{{ subjectErrors.$message.toString() }}</span>
                </div>
                <div class="flex flex-col gap-3 w-full">
                    <label for="password" class="text-white text-lg">Mensaje</label>
                    <textarea v-model="state.message" type="text" class="border border-gray-400 text-black-text rounded-md py-1 px-2" name="message" id="message" />
                    <span v-if="messageErrors" class="text-red-500">{{ messageErrors.$message.toString() }}</span>
                </div>

                <div class="h-11">
                    <Button class="button h-11" type="submit" rounded label="Ingresar" :loading="isLoading" />
                </div>
                <Toast class="mx-auto" position="bottom-center" />
                <Message v-if="success" severity="success">Enviado con éxito</Message>
                <Message v-if="errors.hasErrors" severity="error">{{ errors.msg }}</Message>
            </form>

        </div>
    </div>
</template>
 