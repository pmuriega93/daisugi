<script setup lang="ts">
import EmptyDataAlert from '@/components/admin-console/EmptyDataAlert.vue';
import { useAudiences } from '@/composables/useAudiences';
import { ref } from 'vue';
import AudiencesListComponent from '@/components/admin-console/AudiencesListComponent.vue'
import EditAudience from '@/components/admin-console/EditAudience.vue'
import AddAudience from '@/components/admin-console/AddAudience.vue'
import FabButton from '@/components/base/FabButton.vue'

const { audiences, deleteAudience } = useAudiences();

const isCreateAudienceModalVisible = ref(false);
function showModal() {
    isCreateAudienceModalVisible.value = true;
}

const showEditModal = ref(false);
const selected = ref();
function openEditAudienceModal(e: any) {
  showEditModal.value = true;
  selected.value = e;
}

</script>
<template>
    <section>
        <h1 class="text-2xl font-semibold mb-5">Mis audiencias</h1>
        <template v-if="audiences && audiences.length === 0">
            <div class="mt-12">
                <EmptyDataAlert
                    message="<b>Todavía no tenés audiencias registradas.</b><br><i>Las audiencias y grupos funcionan para difundir mensajes.</i>"
                    @btn-clicked="showModal"
                />
            </div>
        </template>
        <template v-else-if="audiences && audiences.length > 0">
            <AudiencesListComponent
                :audiences=audiences
                @button-delete-clicked="e => deleteAudience(e.id)"
                @button-edit-clicked="e => openEditAudienceModal(e)"
            />
        </template>
      <AddAudience v-if="isCreateAudienceModalVisible" @close-modal="isCreateAudienceModalVisible = false" />
      <EditAudience v-if="showEditModal" :audience="selected" @close-modal="showEditModal = false" />
      <FabButton @btn-clicked="isCreateAudienceModalVisible = true" />
    </section>
</template>
