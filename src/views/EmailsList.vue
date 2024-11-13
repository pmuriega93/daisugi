<script setup lang="ts">
import EmptyDataAlert from '@/components/admin-console/EmptyDataAlert.vue'
import { useEmail } from '@/composables/useEmail'
import { useRouter } from 'vue-router'
import FabButton from '@/components/base/FabButton.vue'
const { templates } = useEmail();
import EmailsList from '../components/admin-console/EmailsList.vue';
const router = useRouter()

function goToTemplatePage() {
  router.push('/nueva-plantilla');
}
</script>
<template>
    <section>
      <h1 class="text-2xl font-semibold mb-5">Mis mails</h1>
        <div v-if="templates && templates.length === 0" class="mt-12">
          <EmptyDataAlert
            message="<b>Todavía no tenés mails guardados.</b>"
            @btn-clicked="goToTemplatePage"
          />
        </div>

        <div v-else class="w-full">
          <template
            v-for="template in templates"
            :key="template.id"
          >
           <EmailsList
              :template="template"
           />

            <FabButton @btn-clicked="goToTemplatePage" />

          </template>
        </div>
    </section>
</template>

