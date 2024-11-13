import type { Client } from "@/interfaces/clients";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useClientsStore = defineStore('client', () => {

    const clients = ref<Client[]>()


    return {
        clients,

        saveClients: (clientsToSave: Client[]) => {
            clients.value = clientsToSave
        },

    }

})