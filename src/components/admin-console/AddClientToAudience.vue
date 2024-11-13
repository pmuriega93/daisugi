<script setup lang="ts">
import { computed, ref } from 'vue'
import { useClients } from '@/composables/useClients'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button'
import { useRoute } from 'vue-router'

const emit = defineEmits<{
    (e:'close-modal'): void
}>()

const props = defineProps<{
  audienceName: string
}>()

const { clients, editClient } = useClients()

const columns = [
  { field: 'fullName', name: 'Nombre' },
  { field: 'email', name: 'Email' },
]

const route = useRoute()

const selected = ref()

async function addToAudience() {
  if (!clients.value || !clients.value.length) return;
  for (const client of selected.value) {
    if (client.id) {
      await editClient(client.id, {
        audiences: [props.audienceName],
      })
    }
  }

  emit('close-modal');
}

const clientsWithNoAudience = computed(() => clients.value?.filter(cl => !cl.audiences || cl.audiences.length === 0 || cl.audiences?.some(a => a.id !== route.params.id)))
</script>
<template>
  <div class="fixed top-0 left-0 w-full h-full">
    <div
      class="max-w-[90%] mx-auto top-1/4 p-7 flex flex-col items-center rounded-md bg-primary-blue-100 text-white"
    >
      <DataTable
        v-model:selection="selected"
        :value="clientsWithNoAudience"
        selectionMode="multiple"
        :metaKeySelection="false"
        dataKey="id"
        tableStyle="min-width: 50rem"
      >
        <Column
          v-for="column in columns"
          :key="column.name"
          :field="column.field"
          :header="column.name"
        />
      </DataTable>

      <div class="flex items-center justify-center w-full gap-5">
        <Button @click="addToAudience" class="mt-3" label="Agregar a audiencia" />
        <Button @click="emit('close-modal')" class="mt-3" outlined label="Cancelar" />
      </div>
    </div>
  </div>
</template>