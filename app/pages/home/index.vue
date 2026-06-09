<script setup lang="ts">

const { logout } = useAuth();


</script>

  
<template>
  <div>
<UButton @click="logout">Log out</UButton>
  </div>
</template>

<style scoped></style>
