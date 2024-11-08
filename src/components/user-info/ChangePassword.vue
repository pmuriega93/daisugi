<script setup lang="ts">
import { useChangePassword } from '@/composables/useChangePassword';
import { areEqual, hasLowerCase, hasMinLength, hasNumber, hasSpecialChar, hasUpperCase, isRequired } from '@/helpers/validators';
import useVuelidate from '@vuelidate/core';
import Panel from 'primevue/panel';
import { computed, reactive, ref, watch } from 'vue';
import Button from 'primevue/button';
import ConfirmModal from '../base/ConfirmModal.vue';

const { changePassword, errors, success, isLoading } = useChangePassword()

const showPassword = ref(false);
const showOldPassword = ref(false);
const showPasswordRepeat = ref(false);

const showConfirmModal = ref(false);

const state = reactive({
    password: '',
    oldPassword: '',
    repeatPassword: '',
})
const validations = {
    oldPassword: { isRequired },
    password: { isRequired, hasUpperCase, hasLowerCase, hasMinLength: hasMinLength(6), hasNumber, hasSpecialChar },
    repeatPassword: { isRequired, areEqual: areEqual(computed(() => state.password)) } 
}
const v$ = useVuelidate(validations, state, { $lazy: true });

const oldPasswordErrors = computed(() => v$.value.$errors.find(error => error.$property === 'password'));
const passwordErrors = computed(() => v$.value.$errors.find(error => error.$property === 'password'));
const repeatPasswordErrors = computed(() => v$.value.$errors.find(error => error.$property === 'repeatPassword'));

const disableFields = computed(() => state.oldPassword.length === 0 || state.password.length === 0 || state.repeatPassword.length === 0)

async function onSubmit() {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;

    await changePassword(state.oldPassword, state.password)

    if (errors.hasErrors) {
        return;
    }
}

function toggleConfirmModal() {
    showConfirmModal.value = !showConfirmModal.value;
}

watch(success, (val, oldval) => {
    if (val && !oldval) {
        toggleConfirmModal()
    }
})

</script>

<template>
    <div class="w-full bg-gray-50 mt-7">
    <Panel header="Cambiar contraseña" toggleable collapsed>
        <form @submit.prevent="toggleConfirmModal">
            <div class="flex flex-col w-1/2 gap-3">
                <div class="flex flex-col gap-3 w-full">
                    <label for="old-password" class="text-black-text text-lg">Contraseña anterior:</label>
                    <input v-model="state.oldPassword" :type="showOldPassword ? 'text' : 'password'" class="border border-gray-400 rounded-md py-1 px-1" name="old-password" id="old-password">
                    <div @click="showOldPassword = !showOldPassword" class="text-gray-600 cursor-pointer absolute right-3 top-11">
                        <i v-if="showOldPassword" class="pi pi-eye" />
                        <i v-else class="pi pi-eye-slash" />
                    </div>

                    <span v-if="oldPasswordErrors" class="text-red-500">{{ oldPasswordErrors.$message.toString() }}</span>
                    </div>
                </div>
                <div class="flex flex-col w-1/2 gap-3">
                    <div class="flex flex-col gap-3 w-full">
                    <label for="password" class="text-black-text text-lg">Nueva contraseña</label>
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

                <div class="mt-8">
                    <Button type="submit" label="Confirmar" :loading="isLoading" :disabled="disableFields || isLoading" />

                </div>
                <ConfirmModal
                    v-if="showConfirmModal"
                    :isLoading="isLoading"
                    confirm-cta-test="Aceptar"
                    reject-cta-test="Cancelar"
                    question="¿Desea cambiar la contraseña?"
                    @accept-button-clicked="onSubmit"
                    @reject-button-clicked="showConfirmModal = false"
                />

                <div v-if="success" class="mt-8">
                    <p class="text-green-500">
                        Se ha cambiado la contraseña con éxito.
                    </p>
                </div>

            </div>
            
        </form>
    </Panel>
    </div>
</template>
