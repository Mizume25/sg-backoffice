import type { FormSubmitEvent } from '@nuxt/ui'
import type { StoreOrderSchema } from '~~/shared/schemas/orders/create';

export const useOrderLogic = () => {


  const { data: products } = useProductsApi().products.useList();
  const toast = useToast();

  /** Estado incial */
  const OrderState = reactive({
    amount: 0,
    units: 0,
    order_date: '',
    product_id: '',
  })

  /** Calculamos segun unidades */
  watch(() => OrderState.units, (NewUnit) => {
    const producto = products.value!.find((p) => p.id == OrderState.product_id );

    let amount = producto!.rates[0]!.price * OrderState.units
    OrderState.amount = Number(amount.toFixed(2))


  })

  /** Crear Ordens */
  const onSubmit = async (e: FormSubmitEvent<StoreOrderSchema>) => {
    try {

      await $fetch('/api/orders', { method: 'POST', body: e.data });

      toast.add({ title: 'Se ha creado la orden correctamente', icon: 'lucide:check' })

    } catch (error) {
      toast.add({ title: 'Ha habido un error al crear la orden', icon: 'lucide:x' })
    }
  }



  return {
    OrderState,
    products,
    onSubmit
  }

}
