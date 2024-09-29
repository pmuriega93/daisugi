<script setup lang="ts">
import type { Client } from '@/interfaces/clients';
import Button from 'primevue/button';

const props = defineProps<{
    clients?: Client[]
}>()

const emit = defineEmits<{
    (e: 'send-mail', id: Client): void,
    (e: 'delete', id: string): void,
    (e: 'edit', id: Client): void,
}>()

</script>

<template>
    <div class="flex flex-col items-start">

        <div class="flex items-center justify-around w-full text-gray-text-500">
            <div class="flex-1">
                <p>Nombre del cliente</p>
            </div>
            <div class="flex-1">
                <p>Email</p>
            </div>
            <div class="flex-1">
                <p>Acciones</p>
            </div>
        </div>
        <div class="separator" />

        <template
            v-for="client in clients"
            :key="client.id"
        >
            <div class="flex items-center justify-around w-full border-b-2 border-gray-200">
                <div class="flex-1">
                    <p>{{client.fullName}}</p>
                </div>
                <div class="flex-1">
                    <p>{{client.email}}</p>
                </div>
                <div class="flex-1">
                    <div class="flex items-center justify-start gap-3">
                        <Button @click="emit('send-mail', client)" label="Enviar Mensaje" class="text-sm" icon="pi pi-send" />
                        <Button @click="emit('delete', client.id)" label="Borrar" class="text-sm" icon="pi pi-delete-left" />
                        <Button @click="emit('edit', client)" label="Editar" class="text-sm" icon="pi pi-user-edit" />
                    </div>
                </div>
            </div>
        </template>


        
    </div>
</template>
