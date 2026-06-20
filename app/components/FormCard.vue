<script setup lang="ts">
const props = defineProps<{
  title?: string
  back?: string
}>()
</script>

<template>

  <div
    class="w-full flex-1 lg:flex-none lg:w-100 lg:max-w-md shrink-0 flex flex-col bg-blue-300 p-4 rounded-2xl border border-black">

    <div
      class="w-full flex-1 lg:flex-none lg:max-h-[80vh] flex flex-col items-center bg-blue-900 rounded-2xl p-4 sm:p-6 shadow-2xl">
    <div class="w-full h-10 mt-2">
        <NuxtLink
          :to="props.back"
          :class="back == undefined ? 'hidden' : ''"
          class="flex items-center gap-2 text-blue-300 hover:text-blue-100 text-sm transition-colors duration-200 cursor-pointer group mb-4">
          <UIcon name="lucide:arrow-left" class="size-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Volver</span>
        </NuxtLink>
      </div>

      <h2 v-if="title" class="shrink-0 mb-4 text-center text-2xl font-bold text-blue-200">
        {{ title }}
      </h2>


      <slot name="header" />

      <div
        class="w-full flex-1 lg:overflow-y-auto overflow-x-hidden pr-2 flex flex-col items-start gap-6 scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>