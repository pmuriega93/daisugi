<script setup lang="ts">
import { useLogin } from '@/composables/useLogin';
import Button from 'primevue/button';

const { logout } = useLogin();

</script>
<template>
    <header class="w-full flex items-center justify-between px-4 py-2">
        <div>
            <img class="w-40" src="/logo/daisugi-logo.png" alt="Logo Daisugi">
        </div>
        <div class="h-14 w-14">
            <Button rounded aria-label="logout" icon="pi pi-sign-out" class="text-white w-full h-full" @click="logout"
                :pt="{
                    label: 'hidden',
                    icon: 'left-[2px]'
                }"
            />
        </div>

    </header>
    <hr class="separator" />
</template>
