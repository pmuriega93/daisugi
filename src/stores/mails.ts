import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useMailStore = defineStore('mails', () => {

  const templates = ref()

  return {
    templates,

    saveMails: (templatesToSave: any[]) => {
      templates.value = templatesToSave;
    }
  }
})
