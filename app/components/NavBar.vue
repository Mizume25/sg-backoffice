<script setup lang="ts">

/** Titlo dínamico  */
const route = useRoute();

/** Perfil Actual  */
const { profile } = storeToRefs(useProfileStore())



const logout = async () => {
  const { clearProfile } = useAuth();

  /** Cerramos sesion , limpieamos perfil y redireccionamos */
  await useSupabaseClient().auth.signOut();
  clearProfile();
  await navigateTo('/auth/login')
}

</script>

<template>
  <!-- Top Bar -->
  <nav class="h-18 w-full bg-white border border-black fixed top-0 left-0 right-0 flex items-center  p-3 justify-between z-50">
    
      <!-- Logo y Titulo de la página -->
    <div class="flex flex-row  gap-5 items-center ms-10">
      <NuxtImg src="/icons/sg_shop_logo.png" width="50" height="50" />
      <h1 class="text-black lg:text-2xl font-bold md:text-xl ">{{ route.meta.title ?? 'Catalogo de Productos' }}</h1>
    </div>

      <!-- Perfil y logout del usuario -->
    <div class="flex flex-row  gap-5 items-center">

        <!-- Avatar -->
      <UAvatar :alt="profile?.name" size="md" class="max-lg:block sm:hidden flex flex-row items-center justify-center" />

        <!-- Menu  -->
      <UDropdownMenu class="w-25 cursor-pointer" :items="[{ label: 'Log-out', onSelect: logout, icon: 'lucide:log-out' }]">
        <UButton label="Log out" color='info' class="border border-black" icon='lucide:log-out' />
      </UDropdownMenu>


    </div>

  </nav>


</template>


