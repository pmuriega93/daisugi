<script setup lang="ts">
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import AddGroup from '@/components/admin-console/AddGroup.vue'
import { ref } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { useRouter } from 'vue-router'

const emit = defineEmits<{
  (e: 'button-new-clicked'): void
  (e: 'button-delete-clicked', a: any): void
  (e: 'button-edit-clicked', a: any): void
}>()

const props = defineProps<{
  audiences: any[]
}>()

const selectedAudience = ref();
const showNewGroupModal = ref(false);

const selectedGroup = ref();
const editingRows = ref([]);

function selectAudience(aud: any) {
  selectedAudience.value = aud;
  showNewGroupModal.value = true;
}

function onCellEditComplete(event: any) {
  console.log(event)
}

function deleteGroup(selected: any[]) {
  console.log(selected)
}

const columns = [
  { field: 'description', header: 'Grupo' },
]

const router = useRouter()

function goTo(id: string) {
  router.push(`/grupos/${id}`)
}

</script>

<template>
  <section>
    <div class="flex flex-col items-start">
      <template v-for="audience in audiences" :key="audience.id">
        <div class="flex items-center justify-around w-full text-gray-text-500">
          <div class="flex-1">
            <p>Audiencia</p>
          </div>
          <div class="flex-1">
            <p>Tipo</p>
          </div>
          <div class="flex-1">
            <p>Acciones</p>
          </div>
        </div>
        <div class="separator w-[98%]" />
        <Panel
          toggleable
          :pt="{
            root: { class: 'w-full mb-12' },
            header: { class: 'flex items-center bg-none rounded-none' },
            icons: { class: 'mb-3' }
          }"
        >
          <template #header>
            <div class="flex items-center justify-around w-full border-b-2 border-gray-200">
              <div class="flex-1">
                <p class="capitalize">{{ audience.description }}</p>

              </div>
              <div class="flex-1">
                <p class="capitalize">{{ audience.type }}</p>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-start gap-3 pb-2">
                  <Button
                    @click="emit('button-edit-clicked', audience)"
                    label="Editar"
                    class="text-sm border-none"
                    icon="pi pi-user-edit"
                  />
                  <Button
                    @click="emit('button-delete-clicked', audience)"
                    label="Borrar"
                    class="text-sm border-none bg-red-500 hover:bg-red-600"
                    icon="pi pi-delete-left"
                  />
                  <RouterLink
                    :to="`/audiencias/${audience.id}`"
                    class="text-primary-blue-500 underline"
                  >
                    Ver integrantes
                  </RouterLink>
                </div>
              </div>
            </div>
          </template>

          <div class="flex flex-col">
            <div class="flex flex-col mb-5">
              <h3 class="font-semibold">Grupos</h3>
              <p class="italic">
                Segmentá tus audiencias en grupos para personalizar aún más tus mensajes
              </p>
            </div>

            <div v-if="!audience.groups || audience.groups.length === 0" class="flex flex-col">
              <p class="font-semibold mb-2">No creaste ningún grupo</p>
              <Button @click="selectAudience(audience)" label="Crear grupo" class="max-w-[200px]"  />
            </div>

            <DataTable
              v-model:selection="selectedGroup"
              v-model:editingRows="editingRows"
              editMode="row"
              selectionMode="single"
              :value="audience.groups"
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
                    <Button @click="selectAudience(audience)" label="Crear grupo" class="border-none text-sm ml-5 max-w-[200px]"  />
                  </div>
                  <div v-if="selectedGroup" class="flex items-center ml-5 gap-5">
                    <Button
                      @click="deleteGroup(selectedGroup)"
                      label="Borrar"
                      class="text-sm bg-red-500 hover:bg-red-600 border-none"
                      icon="pi pi-delete-left"
                    />
                    <Button
                      @click="goTo(selectedGroup.id)"
                      label="Ver integrantes"
                      outlined
                      class="text-sm border-none"
                    />
                  </div>
                </div>
              </template>
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

            <AddGroup
              v-if="showNewGroupModal"
              :audience="selectedAudience.description"
              @close-modal="showNewGroupModal = false"
            />

          </div>
        </Panel>
      </template>
    </div>
  </section>
</template>
