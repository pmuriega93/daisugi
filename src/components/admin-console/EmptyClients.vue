<script setup lang="ts">
import Button from 'primevue/button';

const emit = defineEmits<{
    (e: 'btn-clicked'): void
}>()

</script>
<template>
    <div class="p-10 max-w-md w-full mx-auto rounded-md border border-gray-400 shadow-lg flex flex-col items-center justify-center">
        <div>
            <i class="pi pi-times-circle text-4xl text-primary-blue-500" />
        </div>

        <p>Todavía no tenés clientes registrados</p>

        <Button @click="emit('btn-clicked')" label="Cargar" rounded class="button w-32" />
    </div>
</template>
