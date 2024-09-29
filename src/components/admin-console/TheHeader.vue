<script setup lang="ts">
import Button from 'primevue/button';

const emit = defineEmits<{
    (e: 'button-clicked', action: string): void
}>()

const props = defineProps<{
    name: string
}>()


</script>
<template>
    <header class="w-full flex items-center justify-between px-4 py-2 border-b-[1px] border-gray-200">
        <div class="flex items-center gap-3">
            <img class="w-40" src="/logo/daisugi-logo.png" alt="Logo Daisugi">
            <div>
                <h2 class="text-primary-blue-500 text-xl">¡Hola {{ props.name }}!</h2>
            </div>
        </div>
        <div class="flex items-center justify-center gap-3 mr-6">
            <div class="flex items-center justify-center group">
                <Button 
                    rounded
                    aria-label="logout"
                    icon="pi pi-id-card"
                    class="text-white h-10 w-10"
                    @click="emit('button-clicked', 'goToUserInfo')"
                    :pt="{
                        label: 'hidden',
                        icon: 'right-[4px]'
                    }"
                />

                <div class="hidden absolute top-12 w-20 bg-black bg-opacity-80 rounded-lg p-1 group-hover:block">
                    <p class="text-white font-semibold text-xs text-center mx-auto">Mis datos</p>
                </div>
            </div>
            <div class="flex items-center justify-center group">
                <Button 
                    rounded
                    aria-label="logout"
                    icon="pi pi-sign-out"
                    class="text-white h-10 w-10"
                    @click="emit('button-clicked', 'logout')"
                    :pt="{
                        label: 'hidden',
                        icon: 'right-[4px]'
                    }"
                />
                <div class="hidden absolute top-12 w-20 bg-black bg-opacity-80 rounded-lg p-1 group-hover:block">
                    <p class="text-white font-semibold text-xs text-center mx-auto">Salir</p>
                </div>
            </div>
        </div>

    </header>
</template>
