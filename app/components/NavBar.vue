<script setup lang="ts">

const route = useRoute();
const { logout } = useAuth();
const { profile } = storeToRefs(useProfileStore())

</script>

<template>
  <nav class="h-18 w-full bg-white border border-black fixed top-0 left-0 right-0 flex items-center  p-3 justify-between z-50">
      <div class="flex flex-row  gap-5 items-center">
        <NuxtImg src="/icons/sg_shop_logo.png" width="50" height="50" />
        <h1 class="text-black text-xl font-bold">{{ route.meta.title ?? 'Catalogo de Productos' }}</h1>
      </div>
       <div class="flex flex-row  gap-5 items-center">
        <UAvatar   :alt="profile?.name"
  size="md">

        </UAvatar>
        <UDropdownMenu class="w-25 cursor-pointer" 
        :items="[{label: 'Log-out' , icon:'lucide:log-out' , onSelect: logout}] ">
          <UButton label="Log out" trailing-icon="lucide:log-out "  color='info' class="border border-black"  />
        </UDropdownMenu>
      </div>
      
    </nav>
</template>

<style scoped></style>
