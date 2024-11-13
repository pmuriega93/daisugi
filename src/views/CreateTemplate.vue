<script setup lang="ts">
import Editor from 'primevue/editor';
import InputText from 'primevue/inputtext';
import { computed, reactive, ref } from 'vue'
import Button from 'primevue/button';
import { Icon } from '@iconify/vue'
import { useEmail } from '@/composables/useEmail'
import { isRequired } from '@/helpers/validators'
import useVuelidate from '@vuelidate/core'
import { useToast } from 'primevue/usetoast'
import Message from 'primevue/message'
import { useRouter } from 'vue-router'

const { saveTemplate, isLoading, success } = useEmail();
const toast = useToast();
const show = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};

const state = reactive({
  subject: '',
  value: '',
})

const validations = {
  subject: { isRequired },
  value: { isRequired },
}

const router = useRouter();

const v$ = useVuelidate(validations, state, { $lazy: true });
const subjectErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'subject'));
const valueErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'value'));

async function onSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  await saveTemplate({
    subject: state.subject,
    value: state.value
  })

  if (success.value) {
    show();

    setTimeout(() => {
      router.push('/emails')
    }, 200)
  }
}

</script>

<template>
  <section>
    <RouterLink :to="{ name: 'emails' }" class="flex items-center gap-1 text-primary-blue-400 hover:text-primary-blue-300">
      <Icon icon="material-symbols:arrow-back-ios" /> <span class="text-lg">Volver</span>
    </RouterLink>

    <h1 class="text-2xl font-semibold mb-5">Crear plantilla</h1>
    <Toast class="mx-auto" position="bottom-center" />
    <Message v-if="success" severity="success">Creado con éxito</Message>
    <form @submit.prevent="onSubmit" class="w-full flex flex-col gap-5 items-start justify-center">
      <div class="w-60">
        <label for="subject" class="font-semibold text-lg">
          Asunto
        </label>
        <InputText
          id="subject"
          type="text"
          v-model="state.subject"
          class="w-full"
        />
        <span v-if="subjectErrors" class="text-red-500">{{ subjectErrors.$message.toString() }}</span>
      </div>
      <div class="w-full">
        <Editor
          v-model="state.value"
          :readonly="isLoading"
          editorStyle="height: 320px"
        />
        <span v-if="valueErrors" class="text-red-500">{{ valueErrors.$message.toString() }}</span>
      </div>
      <div class="self-end">
        <Button
          label="Guardar"
          type="submit"
          :loading="isLoading"
        />
      </div>
    </form>

  </section>
</template>
