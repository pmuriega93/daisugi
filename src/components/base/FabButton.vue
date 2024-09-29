<script setup lang="ts">
import Button from 'primevue/button';

const emit = defineEmits<{
    (e: 'btn-clicked'): void
}>()

</script>
<template>
    <div class="fixed h-14 w-14 bottom-5 right-5 flex items-center justify-center">
        <Button @click="emit('btn-clicked')" rounded aria-label="logout" icon="pi pi-user-plus" class="h-full w-full text-white"
        :pt="{
            label: 'hidden',
            icon: 'left-[2px]'
        }"
        />
    </div>
</template>
