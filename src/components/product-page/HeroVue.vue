<script setup lang="ts">
import Button from 'primevue/button';

</script>
<template>
    <section>
        <div class="container flex items-center justify-center mx-auto pt-12">
            <div class="flex flex-col flex-[.7] items-start justify-center gap-5 pl-12">
                <h1 class="text-5xl font-normal"><b class="text-primary-blue-500 text-6xl">Daisugi</b><br> Soluciones para Automatización de Marketing</h1>
                <h2 class="text-2xl text-gray-500 italic text-start">Ayudándote a crecer, desde la raíz</h2>
    
                <div class="mt-5">
                    <Button class="bg-primary-blue-500 border-none hover:bg-primary-blue-400 px-7" label="Conocer más" size="large" raised rounded />
                </div>
            </div>
    
            <div class="flex-1">
                <img class="mx-auto object-cover rounded-full w-[550px] h-[550px]" src="/logo/hero.jpg" alt="Hero">
            </div>
    
            
        </div>
        <div class='air air1'></div>
        <div class='air air2'></div>
        <div class='air air3'></div>
        <div class='air air4'></div>

    </section>
</template>

<style scoped>
section{
  position: relative;
  width: 100%;
  height: 90vh;
  background: #b8e3ff;
  overflow: hidden;
}
section .air{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('/logo/wave.png');
  background-size: 1000px 100px
}
section .air.air1{
  animation: wave 40s linear infinite;
  z-index: 1000;
  opacity: 1;
  animation-delay: 0s;
  bottom: 0;
}
section .air.air2{
  animation: wave2 25s linear infinite;
  z-index: 999;
  opacity: 0.5;
  animation-delay: -5s;
  bottom: 10px;
}
section .air.air3{
  animation: wave 40s linear infinite;
  z-index: 998;
  opacity: 0.2;
  animation-delay: -2s;
  bottom: 15px;
}
section .air.air4{
  animation: wave2 10s linear infinite;
  z-index: 997;
  opacity: 0.7;
  animation-delay: -5s;
  bottom: 20px;
}
@keyframes wave{
  0%{
    background-position-x: 0px; 
  }
  100%{
    background-position-x: 1000px; 
  }
}
@keyframes wave2{
  0%{
    background-position-x: 0px; 
  }
  100%{
    background-position-x: -1000px; 
  }
}

</style>
