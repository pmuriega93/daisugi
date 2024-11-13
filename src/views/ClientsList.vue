<script setup lang="ts">
import ClientListComponent from '../components/admin-console/ClientListComponent.vue'
import EmptyDataAlert from '../components/admin-console/EmptyDataAlert.vue'

import { useClients } from '@/composables/useClients';
import FabButton from '@/components/base/FabButton.vue'
import { ref } from 'vue'
import AddClient from '@/components/admin-console/AddClient.vue'
import type { Client } from '@/interfaces/clients'
import EditClient from '@/components/admin-console/EditClient.vue'
import SendMail from '@/components/admin-console/SendMail.vue'
const { clients } = useClients();

const { editClient, deleteMultiple } = useClients()

const selectedClients = ref();
const isCreateClientModalVisible = ref(false);
const isEditClientModalVisible = ref(false);
const isSendMessageModalVisible = ref(false);

function showModal() {
  isCreateClientModalVisible.value = true;
}

function openMailModal(e: Client[]) {
  selectedClients.value = e;
  isSendMessageModalVisible.value = true;
}

</script>

<template>
    <section>
        <h1 class="text-2xl font-semibold mb-5">Mis clientes</h1>
        <template v-if="clients && clients.length === 0">
            <div class="mt-12">
                <EmptyDataAlert
                    message="<b>Todavía no tenés clientes registrados.</b>"
                    @btn-clicked="showModal"
                />
            </div>
        </template>
        <template v-else>
          <div>

              <ClientListComponent
                  :clients=clients
                  :show-actions="['edit', 'delete', 'mail']"
                  @delete="deleteMultiple"
                  @edit="e => editClient(e.id, e)"
                  @send-mail="openMailModal"
              />
              <FabButton @btn-clicked="showModal" />
          </div>

        </template>
        <AddClient
          v-if="isCreateClientModalVisible"
          @close-modal="isCreateClientModalVisible = false"
        />
        <EditClient
          v-if="isEditClientModalVisible"
          @close-modal="isEditClientModalVisible = false"
          :client="selectedClients"
        />
        <SendMail
          v-if="isSendMessageModalVisible"
          @close-modal="isSendMessageModalVisible = false"
          :client="selectedClients"
        />
    </section>
</template>
