import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
 const isLoggedIn = useStorage('is-logged', false);

 function setLoginStatus(val: boolean) {
  isLoggedIn.value = val;
 }

  return { isLoggedIn, setLoginStatus }
})
