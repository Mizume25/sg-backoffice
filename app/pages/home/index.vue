<script setup lang="ts">

const { profile } = storeToRefs(useProfileStore())

console.log("Inciado buenismo de " , profile.value?.name);

</script>

  
<template>
  <div>

  </div>
</template>

<style scoped></style>
