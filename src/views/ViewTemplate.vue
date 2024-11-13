<script setup lang="ts">
import { useEmail } from '@/composables/useEmail'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import InputText from 'primevue/inputtext'
import Editor from 'primevue/editor'
import Button from 'primevue/button'

const { templates, isLoading, errors, success } = useEmail()

const route = useRoute()

const selectedTemplate = computed(() => templates.value.find((t:any) => t.id === route.params.id))

const state = reactive({
  subject: selectedTemplate.value.subject,
  value: selectedTemplate.value.html
})

function onSubmit(e: any) {
  console.log(e)
}
</script>

<template>
  <section>
    <RouterLink :to="{ name: 'emails' }" class="flex items-center gap-1 text-primary-blue-400 hover:text-primary-blue-300">
      <Icon icon="material-symbols:arrow-back-ios" /> <span class="text-lg">Volver</span>
    </RouterLink>
    <h1 class="text-2xl font-semibold mb-5">Editar plantilla</h1>
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
      </div>
      <div class="w-full">
        <Editor
          v-model="state.value"
          :readonly="isLoading"
          editorStyle="height: 320px"
        />
      </div>
      <div class="self-end">
        <Button
          label="Editar"
          type="submit"
          :loading="isLoading"
        />
      </div>
    </form>
  </section>
</template>
