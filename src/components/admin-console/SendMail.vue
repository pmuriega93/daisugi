<script setup lang="ts">
import { isRequired } from '@/helpers/validators';
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { useEmail } from '@/composables/useEmail'
import useVuelidate from '@vuelidate/core';
import { computed, reactive, ref, watch } from 'vue';
import Message from 'primevue/message';
import { useToast } from "primevue/usetoast";
import type { Client } from '@/interfaces/clients'
import Editor from 'primevue/editor'
import EmailsList from '@/components/admin-console/EmailsList.vue'
const toast = useToast();
import Calendar from 'primevue/calendar';
import ToggleButton from 'primevue/togglebutton';

const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};

const props = defineProps<{
    client: Client[]
}>()

const emit = defineEmits<{
    (e:'close-modal'): void
}>()

const success = ref(false);

const { errors, isLoading, sendEmail, templates } = useEmail();

const state = reactive({
    subject: '',
    message: '',
    scheduled: '',
})

const validations = {
    subject: { isRequired },
    message: { isRequired },
}

const v$ = useVuelidate(validations, state, { $lazy: true });

const subjectErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'subject'));
const messageErrors = computed(() => v$.value.$errors.find((error:any) => error.$property === 'message'));


async function sendWithoutTemplate() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  console.log(state.subject)
  console.log(state.message)
  for (const client of props.client) {
    const body = {
        to:[client.email],
        subject: state.subject,
        html: state.message
    }

    let scheduleDate;
    if (birthdaySelected.value) {
      const now = new Date();
      const splitDate = (client.birthday.split('-'))
      const buildedDate = `${splitDate[0]}-${splitDate[1]}-${splitDate[1] <= (now.getMonth() + 1) ? now.getFullYear() : now.getFullYear() + 1}`
      scheduleDate = new Date(buildedDate).toISOString();
    } else if(schedule.value) {
      scheduleDate = schedule.value;
    }
    if (scheduleDate) {
      body.scheduledAt = scheduleDate;
    }

    const resp = await sendEmail(body);
    if (resp.data.data.id) {
      show();
      emit('close-modal')
    }
  }

    if (errors.hasErrors) {
        return;
    }
}

const selectedTemplate = ref();

async function checkScheduleAndSend(template?: any) {
  selectedTemplate.value = template;
  openSchedule.value = true;
}

const openSchedule = ref(false);
const datetime12h = ref();
const schedule = computed(() => datetime12h.value ? new Date(datetime12h.value).toISOString() : null)
const birthdaySelected = ref(false);
async function sendSelectedTemplate() {
  for (const client of props.client) {
    const body = {
      to: [ client.email ],
      subject: selectedTemplate.value.subject,
      html: selectedTemplate.value.html,
    }
    let scheduleDate;
    if (client.birthday && birthdaySelected.value) {
      const now = new Date();
      const splitDate = (client.birthday.split('-'))
      const buildedDate = `${splitDate[0]}-${splitDate[1]}-${splitDate[1] <= (now.getMonth() + 1) ? now.getFullYear() : now.getFullYear() + 1}`
      scheduleDate = new Date(buildedDate).toISOString();
    } else if(schedule.value) {
      scheduleDate = schedule.value;
    }
    if (scheduleDate) {
      body.scheduledAt = scheduleDate;
    }

    const resp = await sendEmail(body);
    if (resp.data.data.id) {
      show();
      emit('close-modal')
    }
  }
}

async function selectModeAndSend(args: 'now' | 'scheduled') {

  if (args === 'now') {
    birthdaySelected.value = false;
    datetime12h.value = undefined;
  }

  if (selectedTemplate.value && selectedTemplate.value.id) {
    console.log('no deberia entrar aca')

    await sendSelectedTemplate();
  } else {
    console.log('hola')
    await sendWithoutTemplate()
  }
}

watch(success, (val) => {
    if (val) {
        show();
        emit('close-modal')
    }
})

</script>
<template>
  <div class="fixed top-0 left-0 w-full h-full">
    <div class="w-1/2 top-1/4 left-[20%] h-[600px] p-7 max-w-full flex flex-col items-center rounded-md bg-primary-blue-900 text-white">
            <header class="w-full flex items-center justify-between">
                <h3 class="text-start font-semibold">Enviar Mail</h3>
    
                <i class="pi pi-times cursor-pointer" @click="emit('close-modal')" />
            </header>

            <TabView>
              <TabPanel header="Elegir plantilla">
                <div class="max-h-full min-w-[690px] overflow-auto">
                  <template
                    v-for="template in templates"
                    :key="template.id"
                  >
                    <EmailsList
                      :template="template"
                      @selected-message="checkScheduleAndSend(template)"
                    />
                  </template>
                </div>
              </TabPanel>/
              <TabPanel header="Enviar nuevo">
                <form @submit.prevent="checkScheduleAndSend" class="w-full" >
                  <div class="flex flex-col gap-3 w-full">
                    <label for="user" class="text-primary-blue-900 text-lg">Asunto</label>
                    <input v-model="state.subject" type="text" class="border text-black-text border-gray-400 rounded-md py-1 px-2" name="subject" id="subject">
                    <span v-if="subjectErrors" class="text-red-500">{{ subjectErrors.$message.toString() }}</span>
                  </div>

                 <div class="flex flex-col gap-3 w-full">
                    <label for="password" class="text-primary-blue-900 text-lg">Mensaje</label>
                    <Editor
                      v-model="state.message"
                      editorStyle="height: 100px"
                    />
                    <span v-if="messageErrors" class="text-red-500">{{ messageErrors.$message.toString() }}</span>
                  </div>

                  <div class="h-11 mb-3">
                    <Button class="button h-11" type="submit" rounded label="Enviar" />
                  </div>
                  <Toast class="mx-auto" position="bottom-center" />
                  <Message v-if="success" severity="success">Enviado con éxito</Message>
                  <Message v-if="errors.hasErrors" severity="error">{{ errors.msg }}</Message>
                </form>
              </TabPanel>
            </TabView>

          <div
            v-if="openSchedule"
            class="w-[500px] h-[350px] z-99 rounded-md bg-secondary-orange-600 absolute p-5"
          >
            <div class="flex flex-col h-full justify-between items-center">
              <div class="flex items-center w-full justify-between">
                <h3>¿Deseas programar el envío?</h3>
                <i class="pi pi-times cursor-pointer" @click="openSchedule = !openSchedule" />
              </div>
              <div class="w-full flex flex-col items-center">
                <div class="flex-auto">
                  <label for="calendar-12h" class="font-bold block mb-2"> Seleccioná una fecha y hora </label>
                  <Calendar id="calendar-12h" v-model="datetime12h" showTime hourFormat="12" />
                </div>

                <div v-if="props.client.some(cl => cl.birthday)" class="mt-5 flex flex-col">
                  <p>
                    O seleccioná una fecha asociada al cliente:
                  </p>

                  <div class="mt-5 flex items-center">
                    <ToggleButton input-id="birthday" v-model="birthdaySelected" onLabel="Si" offLabel="No" />
                    <label for="birthday" class="ml-2"> Fecha de cumpleaños </label>
                  </div>
                </div>

              </div>
              <div class="flex items-center justify-center gap-3">
                <Button label="Programar" @click="selectModeAndSend('scheduled')" />
                <Button label="Enviar ahora" @click="selectModeAndSend('now')" />
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
 