<script setup lang="ts">
import TheHeader from '@/components/admin-console/TheHeader.vue';
import TheSidebar from '@/components/admin-console/TheSidebar.vue';
import { useLogin } from '@/composables/useLogin';
import { useRouter } from 'vue-router';

const { userInfo, logout } = useLogin()
const router = useRouter()

function callAction(e: string) {
    if (e === 'logout') {
        logout()
        return;
    }

    if (e === 'goToUserInfo') {
        router.push({ name: 'userInfo' })
        return;
    }


}

</script>
<template>
    <div class="w-full h-screen">
        <div class="">
            <TheHeader
                :name="userInfo.fullName"
                @button-clicked="e => callAction(e)"    
            />
        </div>

        <div class="h-full flex items-start">
            <TheSidebar />
            <div class="container mx-auto p-5">
                <RouterView />
            </div>
        </div>

    </div>
</template>

