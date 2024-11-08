<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import Button from 'primevue/button';
import { ref } from 'vue';

interface Emit {
    (e: 'acceptButtonClicked'):void;
    (e: 'rejectButtonClicked'):void;
}

const emit = defineEmits<Emit>();

interface Props {
    question: string;
    confirmCtaTest: string;
    rejectCtaTest: string;
    isLoading: boolean;
}

const props = defineProps<Props>();

const modal = ref(null)

onClickOutside(modal, () => emit('rejectButtonClicked'))

</script>
<template>
    <div ref="modal" class="confirm-modal">
        <div class="w-full h-[150px] flex flex-col items-center justify-around">
            <div>
                <p class="text-lg font-semibold">{{ question }}</p>
            </div>
    
            <div class="flex items-center gap-3">
                <Button :disabled="isLoading" :loading="isLoading" :label="confirmCtaTest" @click="emit('acceptButtonClicked')" />
                <Button :disabled="isLoading" :loading="isLoading" :label="rejectCtaTest" @click="emit('rejectButtonClicked')" outlined />
            </div>
        </div>
    </div>
</template>
