import { defineStore } from "pinia";
import { ref } from "vue";

export const useAudiencesStore = defineStore('audiences', () => {

    const audiences = ref();
    
    const availableTypes = ref<string[]>();

    return {
        audiences,
        availableTypes,
        saveAudiences: (audiencesToSave: any[]) => {
            audiences.value = audiencesToSave;
        }
    }
})
