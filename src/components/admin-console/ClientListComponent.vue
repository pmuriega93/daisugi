<script setup lang="ts">
import type { Client } from '@/interfaces/clients';
import Button from 'primevue/button';
import { computed, ref } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { useUserStore } from '@/stores/user'

const props = defineProps<{
    clients?: Client[],
    showActions?: string[],
    actionsLabels?: {
      delete?: string,
      mail?: string,
      edit?: string
    },
}>()

const emit = defineEmits<{
    (e: 'send-mail', id: Client[]): void,
    (e: 'delete', id: Client[]): void,
    (e: 'edit', id: Partial<Client>): void,
}>()
const editingRows = ref([]);
const filters = ref();

const store = useUserStore()

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
};

initFilters();

const clearFilter = () => {
  initFilters();
};

const showDeleteButton = computed(() => props.showActions && props.showActions.includes('delete'))
const showMailButton = computed(() => props.showActions && props.showActions.includes('mail'))

const selectedClient = ref()

const columns = [
  { field: 'fullName', header: 'Nombre' },
  { field: 'email', header: 'Email' },
  { field: 'birthday', header: 'Fecha de nacimiento' },
  { field: 'file', header: 'Legajo' },
  { field: 'phone', header: 'Teléfono' }
];

function onCellEditComplete(event: any) {
  delete event.newData.user;
  delete event.newData.audiences;
  delete event.newData.groups;

  emit('edit', event.newData)
}

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
}

</script>

<template>
    <div class="flex flex-col items-start">

      <DataTable
        v-model:filters="filters"
        v-model:selection="selectedClient"
        v-model:editingRows="editingRows"
        ref="dt"
        editMode="row"
        selectionMode="multiple"
        :value="clients"
        :metaKeySelection="false"
        dataKey="id"
        tableStyle="min-width: 80rem"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @row-edit-save="onCellEditComplete"
      >
        <template #header>
          <div class="flex justify-content-end w-full">
            <div>
              <IconField iconPosition="left">
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText class="ml-2" v-model="filters['global'].value" placeholder="Buscar clientes" />
              </IconField>
            </div>

            <div v-if="store.isAdmin || store.isSuperUser" class="ml-5">
              <div style="text-align: left">
                <Button icon="pi pi-external-link" label="Exportar" class="border-none" @click="exportCSV($event)" />
              </div>
            </div>

            <div v-if="selectedClient && selectedClient.length > 0" class="flex items-center ml-5 gap-5">
                <Button
                  v-if="showMailButton"
                  @click="emit('send-mail', selectedClient)"
                  :label="actionsLabels?.mail || 'Mail'"
                  class="text-sm  border-none"
                  icon="pi pi-send"
                />
                <Button
                  v-if="showDeleteButton"
                  @click="emit('delete', selectedClient)"
                  :label="actionsLabels?.delete || 'Borrar'"
                  class="text-sm bg-red-500 hover:bg-red-600 border-none"
                  icon="pi pi-delete-left"
                />
            </div>
          </div>
        </template>
        <template #empty>No se encontraron coincidencias</template>
        <template #loading>Cargando data de los clientes.</template>
        <Column
          v-for="column in columns"
          :key="column.header"
          :field="column.field"
          :header="column.header"
          sortable
        >
          <template #body="{ data, field }">
            <p>{{ data[field] }}</p>
          </template>
          <template #editor="{ data, field }">
              <InputText v-model="data[field]" autofocus />
          </template>
        </Column>
        <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
      </DataTable>
    </div>
</template>
