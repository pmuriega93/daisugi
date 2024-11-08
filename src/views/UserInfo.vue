<script setup lang="ts">
import ChangePassword from '@/components/user-info/ChangePassword.vue';
import EditUser from '@/components/user-info/EditUser.vue';
import { Icon } from '@iconify/vue';


</script>

<template>
    <section class="flex flex-col">
        <RouterLink :to="{ name: 'clients' }" class="flex items-center gap-1 text-primary-blue-400 hover:text-primary-blue-300">
            <Icon icon="material-symbols:arrow-back-ios" /> <span class="text-lg">Volver</span>
        </RouterLink>

        <h2 class="text-xl font-semibold mt-7">Mi perfil</h2>

        <EditUser />

        <ChangePassword />
    </section>
</template>
