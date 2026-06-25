<script setup lang="ts">
import { OrderSchema } from '~~/shared/schemas/orders/create';

definePageMeta({
    title: "Orders"
})


const { OrderState , allproducts , onSubmit} = useOrderLogic();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
    <!-- Calendario -->
    <UCard :ui="{ body: 'flex justify-center' }">
      <template #header>
        <h2 class="text-lg font-semibold">Calendario de pedidos</h2>
      </template>

      <UCalendar
        :ui="{
          root: 'p-2',
          heading: 'font-semibold text-highlighted',
          cellTrigger: 'rounded-md data-[today]:font-bold data-[selected]:bg-primary data-[selected]:text-inverted hover:bg-elevated transition-colors'
        }"
      >
        <template #day="{ day }">
          <span class="relative">
            {{ day.day }}
            <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-primary" />
          </span>
        </template>
      </UCalendar>
    </UCard>

    <!-- Formulario -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">Nueva cita de pedido</h2>
      </template>

      <UForm class="space-y-5" v-if="OrderState" :schema="OrderSchema" :state="OrderState" @submit="onSubmit" >
        <UFormField 
  
          label="Fecha del pedido"
          name="orderDate"
          :ui="{ label: 'font-medium text-highlighted' }"
        >
          <UInput type="date" class="w-full" v-model="OrderState.order_date" />
        </UFormField>

        <UFormField 
          label="Producto a comprar"
          name="product_id"
          :ui="{ label: 'font-medium text-highlighted' }"
        >
          <USelect placeholder="Selecciona un producto" class="w-full cursor-pointer" :items="allproducts" value-key="id" label-key="name" v-model="OrderState.product_id"  />
        </UFormField>

        <UFormField 
        
          label="Unidades a comprar"
          name="units"
          :ui="{ label: 'font-medium text-highlighted' }"
        >
          <UInputNumber :min="1" class="w-30"    v-model="OrderState.units" />
        </UFormField>

        <UFormField 
  
          label="Coste total"
          name="totalCost"
          hint="Calculado según la tarifa"
          :ui="{ label: 'font-medium text-highlighted' }"
        >
          <UInput type="number" disabled class="w-full"   v-model="OrderState.amount" />
        </UFormField>

        <div class="flex justify-end gap-2 pt-2">
          <UButton type="submit" label="Guardar pedido" />
        </div>
      </UForm>
    </UCard>
  </div>
</template>



<style lang="scss" scoped>

</style>