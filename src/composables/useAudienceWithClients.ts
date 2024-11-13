import { useAudiencesStore } from '@/stores/audiences'
import { useClientsStore } from '@/stores/clients'
import { computed } from 'vue'
import { useRoute } from 'vue-router'


export function useAudienceWithClients() {

  const route = useRoute()

  const audiencesStore = useAudiencesStore()
  const clientsStore = useClientsStore()

  const audience = computed(() => audiencesStore.audiences.find((a: any) => a.id === route.params.id))

  const clients = computed(() => clientsStore.clients?.filter((cl) => (cl.audiences && cl.audiences.length > 0) && cl.audiences?.some(a => a.id === route.params.id)))

  const group = computed(() => {
    const audience = audiencesStore.audiences.find((a: any) => a.groups.find((b: any) => b.id === route.params.id));
    return audience.groups.find((g: any) => g.id === route.params.id)
  })
  const groupAudience = computed(() => audiencesStore.audiences.find((a: any) => a.groups.find((b: any) => b.id === route.params.id)));

  const clientsFilteredByGroup = computed(() => clientsStore.clients?.filter((cl) => (cl.groups && cl.groups.length > 0) && cl.groups?.some(a => a.id === route.params.id)))
  return {
    audience,
    clients,
    clientsFilteredByGroup,
    group,
    groupAudience
  }
}