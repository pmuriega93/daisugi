import { defineStore } from 'pinia'
import { useStorage, StorageSerializers } from '@vueuse/core';
import { computed } from 'vue';
import type { LoginResp } from '@/interfaces/login';

export const useUserStore = defineStore('user', () => {
 const isLoggedIn = useStorage('is-logged', false);
 const userInfo = useStorage<LoginResp>('user-info', null, undefined, { serializer: StorageSerializers.object });

 const isAdmin = computed(() => userInfo.value?.roles.includes('admin'))
 const isSuperUser = computed(() => userInfo.value?.roles.includes('super-user'))


 function setLoginStatus(val: boolean) {
  isLoggedIn.value = val;
 }

 function saveUserInfo(val: any) {
  userInfo.value = val;
 }

  return { isLoggedIn, isAdmin, isSuperUser, userInfo, setLoginStatus, saveUserInfo }
})
