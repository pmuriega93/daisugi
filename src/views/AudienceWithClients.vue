<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useAudienceWithClients } from '@/composables/useAudienceWithClients'
import ClientListComponent from '@/components/admin-console/ClientListComponent.vue'
import EmptyDataAlert from '@/components/admin-console/EmptyDataAlert.vue'
import { ref } from 'vue'
import type { Client } from '@/interfaces/clients'
import SendMail from '@/components/admin-console/SendMail.vue'
import { useClients } from '@/composables/useClients'
import { useRoute } from 'vue-router'
import AddClientToAudience from '@/components/admin-console/AddClientToAudience.vue'
import FabButton from '@/components/base/FabButton.vue'

const { audience, clients } = useAudienceWithClients()

const route = useRoute()

const { editClient } = useClients()

const isCreateClientModalVisible = ref(false);
const isSendMessageModalVisible = ref(false);
const selectedClient = ref();

function showModal() {
  isCreateClientModalVisible.value = true;
}

function openMailModal(e: Client) {
  selectedClient.value = e;
  isSendMessageModalVisible.value = true;
}

async function removeFromAudience(e: Client[]) {
  for (const client of e) {
    if (client && client.id) {
      await editClient(client.id, {
        audiences: [],
      })
    }
  }
}
</script>

<template>
  <section>
    <router-link to="/audiencias" class="text-lg underline mb-3 flex items-center text-primary-blue-500">
      <Icon icon="mdi-light:chevron-left" class="text-2xl" />
      Volver
    </router-link>
    <div class="flex flex-col">
      <h2 class="capitalize text-2xl font-semibold mb-5">{{ audience.description }}</h2>

      <template v-if="clients && clients.length === 0">
        <div class="mt-12">
          <EmptyDataAlert
            message="<b>No tenés clientes en esta audiencia.</b>"
            @btn-clicked="showModal"
          />
        </div>
      </template>
      <div v-else>
        <ClientListComponent
          :clients="clients"
          :show-actions="['mail', 'delete']"
          :actions-labels="{ delete: 'Quitar de audiencia' }"
          @send-mail="openMailModal"
          @delete="removeFromAudience"
        />
      </div>

      <AddClientToAudience
          v-if="isCreateClientModalVisible"
          :audience-name="audience.description"
          @close-modal="isCreateClientModalVisible = false"
      />
      <SendMail
        v-if="isSendMessageModalVisible"
        @close-modal="isSendMessageModalVisible = false"
        :client="selectedClient"
      />
      <FabButton @btn-clicked="showModal" />
    </div>
  </section>
</template>
