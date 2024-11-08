<script setup lang="ts">
import { useLogin } from '@/composables/useLogin';
import { computed, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import { isEmail, isRequired } from '@/helpers/validators';
import useVuelidate from '@vuelidate/core';
import { useEditUser } from '@/composables/useEditUser';


const { userInfo } = useLogin();
const { errors, success, editUser } = useEditUser();

const roles = computed(() => userInfo.value.roles.flat());

const disableFields = ref(true);
const emailErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'email'));
const nameErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'fullName'));

const state = reactive({
    fullName: userInfo.value.fullName,
    email: userInfo.value.email,
})

const validations = {
    email: { isRequired, isEmail },
    fullName: { isRequired },
}
const v$ = useVuelidate(validations, state, { $lazy: true });

const onSubmit = async() => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;


    await editUser(state, userInfo.value.id);
    
    if (errors.hasErrors) {
        return;
    }
    success.value = true;
}

watch(success, (val) => {
    if (val) {
        disableFields.value = true;
    }
})

</script>

<template>
    <form @submit.prevent="onSubmit" class="mt-8 rounded-lg p-7 flex justify-center w-full bg-gray-50">
        <div class="flex flex-col w-full gap-3">
            <div class="flex flex-col gap-1 w-full">
                <label class="text-lg text-primary-blue-500" for="name">Nombre completo:</label>
                <input class="max-w-xs px-3" type="text" :disabled="disableFields" v-model="state.fullName" />

                <span v-if="nameErrors" class="text-red-500">{{ nameErrors.$message.toString() }}</span>

            </div>
            <div class="flex flex-col gap-1 w-full">
                <label class="text-lg text-primary-blue-500" for="name">Correo electrónico:</label>
                <input class="max-w-xs px-3" type="email" :disabled="disableFields" v-model="state.email" />
                
                <span v-if="emailErrors" class="text-red-500">{{ emailErrors.$message.toString() }}</span>

            </div>

        </div>
        <div class="flex flex-col w-full gap-3">
            <div class="flex flex-col gap-1 w-full">
                <label class="text-lg text-primary-blue-500" for="name">Permisos:</label>
                <input class="max-w-xs px-3" type="text" disabled :value="roles" />
                <span class="text-red-500 text-xs">Los permisos no se pueden editar</span>
            </div>

            <div class="mt-8 flex items-center gap-12">
                <Button :label="disableFields ? 'Editar' : 'Cancelar'" link @click="disableFields = !disableFields" />

                <Button type="submit" label="Confirmar" :disabled="disableFields" />
            </div>
        </div>
    </form>
</template>
