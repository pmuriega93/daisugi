<script setup lang="ts">
import ClientList from '../components/admin-console/ClientList.vue'
import FabButton from '../components/base/FabButton.vue'
import EmptyClients from '../components/admin-console/EmptyClients.vue'
import AddClient from '../components/admin-console/AddClient.vue'
import EditClient from '../components/admin-console/EditClient.vue'
import SendMail from '../components/admin-console/SendMail.vue'


import { useClients } from '@/composables/useClients';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import type { Client } from '@/interfaces/clients'
import { useUserStore } from '@/stores/user'
const router = useRouter();

const { clients, deleteClient } = useClients();

const isCreateClientModalVisible = ref(false);
const isEditClientModalVisible = ref(false);
const isSendMessageModalVisible = ref(false);

const selectedClient = ref();

function showModal() {
    isCreateClientModalVisible.value = true;
}

function openEditModal(e: Client) {
    selectedClient.value = e;

    isEditClientModalVisible.value = true;
}

function openMailModal(e: Client) {
    selectedClient.value = e;
    isSendMessageModalVisible.value = true;
}

watch(isCreateClientModalVisible, (val, oldval) => {
    if (!val && oldval) {
        router.go(0);
    }
})

watch(isEditClientModalVisible, (val, oldval) => {
    if (!val && oldval) {
        router.go(0);
    }
})

const store = useUserStore()

</script>

<template>
    <h1 class="text-2xl font-semibold">Mis clientes</h1>
    <template v-if="clients && clients.length === 0">
        <div class="mt-12">
            <EmptyClients @btn-clicked="showModal" />
        </div>
    </template>
    <template v-else>
        <ClientList 
            :clients=clients
            @delete="e => deleteClient(e)"
            @edit="e => openEditModal(e)"
            @send-mail="e => openMailModal(e)"
        />
    </template>

<div class="flex justify-center">
    <AddClient v-if="isCreateClientModalVisible" @close-modal="isCreateClientModalVisible = false" />
    <EditClient v-if="isEditClientModalVisible" @close-modal="isEditClientModalVisible = false" :client="selectedClient" />
    <SendMail v-if="isSendMessageModalVisible" @close-modal="isSendMessageModalVisible = false" :client="selectedClient" />
</div>

<FabButton @btn-clicked="showModal" />
</template>