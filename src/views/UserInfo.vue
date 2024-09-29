<script setup lang="ts">
import { useLogin } from '@/composables/useLogin';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';

const { userInfo } = useLogin();
</script>

<template>
    <section class="flex flex-col">
        <RouterLink :to="{ name: 'clients' }" class="flex items-center gap-1 text-primary-blue-400 hover:text-primary-blue-300">
            <Icon icon="material-symbols:arrow-back-ios" /> <span class="text-lg">Volver</span>
        </RouterLink>

        <div class="mt-8 rounded-lg p-7 flex items-center justify-center w-full bg-gray-200">

        </div>
    </section>
</template>
