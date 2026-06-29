<script setup lang="ts">
import { OrderSchema } from '~~/shared/schemas/orders/create';
import { EditOrderSchema } from '~~/shared/schemas/orders/edit'
definePageMeta({
  title: "Orders"
})

const { data: orders } = await useProductsApi().orders.list();
const { data: products } = await useProductsApi().products.list();

const { OrderState, onSubmit, orderDates, isOpen, selected , currentDates , onDelete , EditOrderState , onUpdate , edit , handleOrder} = useOrderLogic();







</script>

<template>
  <!-- Contenedor con scroll propio (el <main> padre tiene overflow-hidden) -->
  <div class="h-full overflow-y-auto p-4 sm:p-6">
    <!-- Contenedor acotado y centrado -->
    <div class="mx-auto w-full max-w-5xl">
      <div class="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,420px)] gap-6 justify-center items-start">

        <!-- Calendario -->
        <UCard :ui="{ body: 'flex justify-center' }" class="w-full">
          <template #header>
            <h2 class="text-lg font-semibold">Calendario de pedidos</h2>
          </template>

          <UCalendar v-model="selected" :ui="{
            root: 'p-2',
            heading: 'font-semibold text-highlighted',
            cellTrigger: 'rounded-md data-[today]:font-bold data-[selected]:bg-primary data-[selected]:text-inverted hover:bg-elevated transition-colors'
          }">
            <template #day="{ day }">
              <UChip :show="orderDates.has(day.toString().slice(0, 10))" color="primary" size="2xs">
                {{ day.day }}
              </UChip>
            </template>
          </UCalendar>
        </UCard>

        <!-- Formulario -->
        <UCard class="w-full">
          <template #header>
            <h2 class="text-lg font-semibold">Nueva cita de pedido</h2>
          </template>

          <UForm v-if="OrderState" class="space-y-4" :schema="OrderSchema" :state="OrderState" @submit="onSubmit">
            <UFormField label="Fecha del pedido" name="orderDate" :ui="{ label: 'font-medium text-highlighted' }">
              <UInput type="date" class="w-full" v-model="OrderState.order_date" />
            </UFormField>

            <UFormField label="Producto a comprar" name="product_id" :ui="{ label: 'font-medium text-highlighted' }">
              <USelectMenu placeholder="Selecciona un producto" class="w-full cursor-pointer" :items="products"
                value-key="id" label-key="name" v-model="OrderState.product_id" />
            </UFormField>

            <UFormField label="Unidades a comprar" name="units" :ui="{ label: 'font-medium text-highlighted' }">
              <UInputNumber :min="1" class="w-32" v-model="OrderState.units" />
            </UFormField>

            <UFormField label="Coste total" name="totalCost" hint="Calculado según la tarifa"
              :ui="{ label: 'font-medium text-highlighted' }">
              <UInput type="number" disabled class="w-full" v-model="OrderState.amount" />
            </UFormField>

            <div class="flex justify-end gap-2 pt-2">
              <UButton type="submit" label="Guardar pedido" class="sm:w-auto cursor-pointer" />
            </div>
          </UForm>
        </UCard>

        <UModal v-model:open="isOpen" >
          <template #close />
          <template #title>
            Pedidos del {{ formatDate(currentDates[0]?.order_date) }}
          </template>
          <template #body>
            <li class="flex items-center gap-3 rounded-lg border border-gray-200 p-2 dark:border-gray-800" v-for="date in currentDates">

              <a :href="makeURL(date.products.code) + date.products.product_images[0]!.path" target="_blank" class="shrink-0">
                <NuxtImg :src="makeURL(date.products.code)+ date.products.product_images[0]!.path" class="h-14 w-14 rounded-md object-cover" />
              </a>

              <!-- Info en el centro -->
              <div class="min-w-0 flex-1">
                <a href="#" target="_blank" class="truncate text-sm hover:underline">
                  {{ date.products.name }} - {{ date.products.code }}
                </a>
              </div>

              <!-- Botones a la derecha -->
              <div class="flex shrink-0 items-center gap-3">
                <UButton icon="lucide:pen" color="warning" size="sm" class="cursor-pointer" @click="handleOrder(date.id)"/>
                <UButton icon="lucide:trash" color="error" size="sm" class="cursor-pointer" @click="onDelete(date.id)"/>
              </div>
            </li>
          </template>


        </UModal>

        <UModal v-model:open="edit">
          <template #close />
            <template #title >
              Actualizar Orden
            </template>
          <template #body>
            <UForm v-if="EditOrderState" class="space-y-4" :schema="EditOrderSchema" :state="EditOrderState" @submit="(e) => onUpdate(e , EditOrderState.id)">
            <UFormField label="Fecha del pedido" name="orderDate" :ui="{ label: 'font-medium text-highlighted' }">
              <UInput type="date" class="w-full" v-model="EditOrderState.order_date" />
            </UFormField>

            <UFormField label="Producto a comprar" name="product_id" :ui="{ label: 'font-medium text-highlighted' }">
              <USelect placeholder="Selecciona un producto" class="w-full cursor-pointer" :items="products"
                value-key="id" label-key="name" v-model="EditOrderState.product_id" />
            </UFormField>

            <UFormField label="Unidades a comprar" name="units" :ui="{ label: 'font-medium text-highlighted' }">
              <UInputNumber :min="1" class="w-32" v-model="EditOrderState.units" />
            </UFormField>

            <UFormField label="Coste total" name="totalCost" hint="Calculado según la tarifa"
              :ui="{ label: 'font-medium text-highlighted' }">
              <UInput type="number" disabled class="w-full" v-model="EditOrderState.amount" />
            </UFormField>

            <div class="flex justify-end gap-2 pt-2">
              <UButton type="submit" label="Actualizar" color="warning" class="sm:w-auto cursor-pointer"/>
            </div>
          </UForm>
          </template>
        </UModal>


        <ConfirmModal />

      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped></style>