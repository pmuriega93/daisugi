<script setup lang="ts">
import { isRequired } from '@/helpers/validators'
import Button from 'primevue/button'

import useVuelidate from '@vuelidate/core'
import { computed, reactive, ref, watch } from 'vue'
import Message from 'primevue/message'
import { useGroups } from '@/composables/useGroups'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const show = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 })
}

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

const props = defineProps<{
  audience: string
}>()

const success = ref(false)

const { addNewGroup, errors, isLoading } = useGroups()

const state = reactive({
  description: ''
})

const validations = {
  description: { isRequired }
}

const v$ = useVuelidate(validations, state, { $lazy: true })

const descriptionErrors = computed(() =>
  v$.value.$errors.find((error: any) => error.$property === 'description')
)

async function onSubmit() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
  await addNewGroup({ description: state.description, audience: props.audience })

  if (errors.hasErrors) {
    return
  }
  success.value = true
}

watch(success, (val) => {
  if (val) {
    show()
    emit('close-modal')
  }
})
</script>
<template>
  <div v-if="props.audience" class="fixed top-0 left-0 w-full h-full">
    <div
      class="w-[300px] top-1/4 left-[35%] p-7 max-w-full flex flex-col items-center rounded-md bg-primary-blue-900 text-white"
    >
      <header class="w-full flex items-center justify-between">
        <h3 class="text-start font-semibold">Crear nuevo grupo</h3>

        <i class="pi pi-times cursor-pointer" @click="emit('close-modal')" />
      </header>

      <form @submit.prevent="onSubmit" class="mt-5 w-full">
        <div class="flex flex-col gap-3 w-full">
          <label for="description" class="text-white text-lg">Nombre</label>
          <input
            v-model="state.description"
            type="text"
            class="border text-black-text border-gray-400 rounded-md py-1 px-2"
            name="description"
            id="description"
          />
          <span v-if="descriptionErrors" class="text-red-500">{{
            descriptionErrors.$message.toString()
          }}</span>
        </div>

        <div class="h-11 mb-3">
          <Button class="button h-11" type="submit" rounded label="Cargar" :loading="isLoading" />
        </div>
        <Toast class="mx-auto" position="bottom-center" />
        <Message v-if="success" severity="success">Creado con éxito</Message>
        <Message v-if="errors.hasErrors" class="mt-12" severity="error">{{ errors.msg }}</Message>
      </form>
    </div>
  </div>
</template>