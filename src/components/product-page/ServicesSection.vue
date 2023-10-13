<script setup lang="ts">
import { computed, ref } from 'vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const isTablet = breakpoints.isGreaterOrEqual('md');
const isDesktop = breakpoints.isGreaterOrEqual('lg');

const itemsToShow = computed(() => {
    if (isTablet) return 2;
    if (isDesktop) return 3;
    return 1;
});

const products = ref([
    {
        title: 'Campañas de Correo Electrónico',
        image: '/features/mail.png',
        description: 'Optimizá tus campañas de correo electrónico con flujos de trabajo automatizados, segmentación precisa y personalización avanzada. Entregá el mensaje adecuado en el momento perfecto y mejora las tasas de conversión.',
    },
    {
        title: 'Gestión de Leads y CRM',
        image: '/features/crm.png',
        description: 'Rastreá, calificá y nutrí a tus leads de manera efectiva con nuestras soluciones de gestión de leads y CRM. Mantené un seguimiento de tus prospectos, identificá oportunidades y fortalecé tus relaciones con los clientes.',
    },
    {
        title: 'Análisis y Reportes Avanzados',
        image: '/features/reportes.png',
        description: 'Obtené información valiosa sobre el rendimiento de tus campañas con análisis detallados y reportes personalizables. Tomá decisiones informadas basadas en datos sólidos.',
    },
    {
        title: 'Campañas mediante Whatsapp',
        image: '/features/whatsapp.png',
        description: 'Llegá a tus clientes en cualquier momento mediante mensajes a Whatsapp. Mantenelos informados sobre estado de cuentas, promociones, etc.',
    }
])
</script>
<template>
    <section>
        <div class="container mx-auto flex flex-col items-center mt-10 gap-5">
            <h3 class="text-3xl text-center mb-5">Nuestra Gama de Servicios</h3>
            
            <carousel snap-align="start" :autoplay="4000" :wrap-around="true" :items-to-show="itemsToShow" :itemsToScroll="1">
                <slide v-for="product in products" :key="product.title">
                    <div class="flex flex-col items-center justify-start gap-7 h-[400px]">
                        <p class="text-center text-lg">{{ product.title }}</p>
                        <img class="w-full object-contain h-52" :src="product.image" :alt="product.title">
                        <span class="text-center leading-[1.5] flex-1 px-12 h-56">
                            {{ product.description }}
                        </span>
                    </div>
                </slide>
            </carousel>
        </div>
    </section>
</template>


<style scoped>

</style>