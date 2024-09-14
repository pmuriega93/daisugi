<script setup lang="ts">
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();


const goToLogin = () => {
    router.push({ name: 'login' })
}

const goToRegister = () => {
    router.push({ name: 'register' })
}

</script>
<template>
    <header class="w-full">
        <nav class="flex justify-between items-center">
            <div class="flex items-center pl-12 py-5 gap-12">
                <img class="w-40" src="/logo/daisugi-logo.png" alt="Logo Daisugi">

                <div class="hidden text-grey-text-400 text-base md:block">
                    <ul class="flex items-center gap-7">
                        <li>
                            <a href="#">Soluciones y Servicios</a>
                        </li>
                        <li>
                            <a href="#">Planes</a>
                        </li>
                        <li>
                            <a href="#">Nosotros</a>
                        </li>
                        <li>
                            <a href="#">Contacto</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="flex items-center gap-7 pr-12">
                <Button @click="goToLogin" class="border-primary-blue-500 text-primary-blue-500 px-7" label="Inicia sesión" size="small" rounded outlined />
                <Button @click="goToRegister" class="bg-primary-blue-500 hover:bg-primary-blue-300 px-7" label="Registrate" size="small" rounded />
            </div>
        </nav>
    </header>

</template>

<style scoped>
a {
  background-image: linear-gradient(
    to right,
    #0999ee,
    #0999ee 50%,
    #000 50%
  );
  background-size: 200% 100%;
  background-position: -100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease-in-out;
}

a:before {
  content: '';
  background: #0999ee;
  display: block;
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 3px;
  transition: all 0.3s ease-in-out;
}

a:hover {
 background-position: 0;
}

a:hover::before {
  width:100%;
}
</style>
