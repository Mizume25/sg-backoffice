import type { CalendarDate, DateValue } from '@internationalized/date';
import type { FormSubmitEvent } from '@nuxt/ui'
import type { StoreOrderSchema } from '~~/shared/schemas/orders/create';
import type { UpdateOrderSchema } from '~~/shared/schemas/orders/edit';

export const useOrderLogic = () => {

  /** Datos */
  const { data: products } = useProductsApi().products.useList();
  const orders = useProductsApi().orders.useList().data


  /** Items */
  const toast = useToast();
  const selectDay = ref<string>('')
  const selected = shallowRef<DateValue>();



  const isOpen = ref(false);
  const edit = ref(false);
  const INIT_STATE = {
    amount: 0,
    units: 0,
    order_date: '',
    product_id: ''
  }

  const cleanUp = () => Object.assign(OrderState, { ...INIT_STATE });


  /** Estado incial */
  const OrderState = reactive({ ...INIT_STATE });
  const EditOrderState = reactive({ ...INIT_STATE, id: '', });

  const currentRate = (rates: Rate[], date: string): number | undefined => {
    const order = new Date(date).getTime()


    const pasadas = rates
      .map(r => ({
        diff: new Date(r.end_date).getTime() - order,
        price: r.price
      }))
      .filter(r => r.diff <= 0)

    if (pasadas.length === 0) return undefined


    const max = Math.max(...pasadas.map(p => p.diff))
    return pasadas.find(p => p.diff === max)?.price
  }


  watch(
    () => ({
      product_id: OrderState.product_id,
      orderDate: OrderState.order_date,
      units: OrderState.units,
    }),
    ({ product_id, orderDate, units }) => {
      const producto = products.value?.find(p => p.id === product_id)
      if (!producto || !orderDate || !units) return

      const price = currentRate(producto.rates, orderDate)
      if (price == null) return

      OrderState.amount = Number((price * units).toFixed(2))

    }
  )

  /** Crear Ordens */
  const onSubmit = async (e: FormSubmitEvent<StoreOrderSchema>) => {

    if (checkOrder(e.data)) return;

    try {

      await useProductsApi().orders.post(e.data);

      toast.add({ title: 'Se ha creado la orden correctamente', icon: 'lucide:check' });
      cleanUp();

    } catch (error) {
      toast.add({ title: 'Ha habido un error al crear la orden', icon: 'lucide:x' })
    }
  }


  /** Crear Ordens */
  const onUpdate = async (e: FormSubmitEvent<UpdateOrderSchema>, id: string) => {
    try {

      await useProductsApi().orders.put(id, e.data);

      toast.add({ title: 'Se ha actualizado la orden correctamente', icon: 'lucide:check' });
      cleanUp();

    } catch (error) {
      toast.add({ title: 'Ha habido un error al editar la orden', icon: 'lucide:x' })
    }
  }


  /***
   * Borrar Pedido
   */
  const onDelete = async (id: string) => {
    try {

      await useProductsApi().orders.delete(id);
      isOpen.value = false;

      toast.add({ title: 'La orden se elimino correctamente', icon: 'lucide:check' })
    } catch (error) {
      toast.add({ title: 'No se puedo eliminar la orden', color: 'error', icon: 'lucide:x' })
    }
  }


  const orderDates = computed(() => new Set((orders.value ?? []).map(o => o.order_date.slice(0, 10))))
  const currentDates = reactive<OrderRecord[]>([]);

  watch(selected, (date) => {
    if (!date) return
    const key = date.toString().slice(0, 10);
    if (!orderDates.value.has(key)) return

    currentDates.splice(0, currentDates.length);

    currentDates.push(...orders.value!.filter(p => p.order_date.slice(0, 10) === key))
    selectDay.value = key
    isOpen.value = true
  })


  const handleOrder = (id: string) => {
    let order = currentDates.find((p) => p.id == id);

    Object.assign(EditOrderState, {
      id: order?.id,
      amount: order?.amount,
      order_date: order?.order_date.slice(0, 10),
      units: order?.units,
      product_id: order?.product_id,
    })

    isOpen.value = false;
    edit.value = true;

  }

  /**
   * Comprobamos que no exista la orden de un producto y fecha
   * @param order StoreOrderSchema
   */
  const checkOrder = (order: StoreOrderSchema): boolean => {
    let repet = orders.value!.find((p) =>
      p.product_id == order.product_id &&
      p.order_date.slice(0, 10) == order.order_date.slice(0, 10));

    if (!repet) return false;

    const { products, created_at, updated_at, ...data } = repet
    Object.assign(EditOrderState, {
      ...data,
      order_date: data.order_date.slice(0, 10)
    })


    cleanUp();

    toast.add({ title: 'Ya existe un producto para la fecha indicada', color: 'info', icon: 'lucide:info' });

    edit.value = true;

    return true;

  }




  return {
    OrderState,
    onSubmit,
    orderDates,
    isOpen,
    selected,
    currentDates,
    onDelete,
    EditOrderState,
    onUpdate,
    edit,
    handleOrder
  }

}
