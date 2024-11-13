<script setup lang="ts">
import Button from 'primevue/button';
import { useEmail } from '@/composables/useEmail'
const emit = defineEmits(['selected-message'])

const props = defineProps<{
  template: any
}>()

const { deleteTemplate } = useEmail()

function chopMessage(str: string) {
  return str.substring(0, 20) + '...';
}

function buttonClicked() {
  emit('selected-message', props.template)
}
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="w-full flex items-center p-5 font-semibold text-lg">
      <div class="flex-1">
        <p>Asunto</p>
      </div>
      <div class="flex-1">
        <p>Mensaje</p>
      </div>
      <div class="flex-1">
        <p>Opciones</p>
      </div>
    </div>
    <div @click="buttonClicked" class="group cursor-pointer select-none">
      <a class="w-full flex items-center rounded-md border border-gray-200 p-5 hover:bg-primary-blue-100">
        <p class="flex-1">{{template.subject}}</p>
        <p class="flex-1">{{chopMessage(template.html)}}</p>
        <div class="flex-1">
          <Button label="Borrar" icon="pi pi-delete-left"  @click="deleteTemplate(template.id)" class="border-none bg-red-500 text-sm hover:bg-red-600" />
        </div>
      </a>
    </div>
  </div>
</template>
