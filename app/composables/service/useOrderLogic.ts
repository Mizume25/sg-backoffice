import type { DateValue } from '@internationalized/date';
import type { FormSubmitEvent } from '@nuxt/ui'
import type { StoreOrderSchema } from '~~/shared/schemas/orders/create';
import type { UpdateOrderSchema } from '~~/shared/schemas/orders/edit';


const INIT_STATE = {
  amount: 0,
  units: 0,
  order_date: '',
  product_id: ''
}


export const useOrderLogic = () => {

  /** Datos */
  const { data: products } = useProductsApi().products.useList();
  const orders = useProductsApi().orders.useList().data


  /** Items */
  const selectDay = ref<string>('')
  const selected = shallowRef<DateValue>();
  const { confirm } = useConfirm();
  const isOpen = ref(false);
  const edit = ref(false);



  const cleanUp = () => Object.assign(OrderState, { ...INIT_STATE });


  /** Estado incial de Formulario*/
  const OrderState = reactive({ ...INIT_STATE });
  const EditOrderState = reactive({ ...INIT_STATE, id: '', });

  /** Rates de la fecha selecionada */
  const currentRate = (rates: Rate[], date: string): number => {
    const order = new Date(date).getTime();

    const vigente = rates
      .filter(r => {
        const start = new Date(r.start_date).getTime();
        const end = new Date(r.end_date).getTime();
        return start <= order && order <= end;
      })
      .sort((a, b) =>
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      )[0];

    return vigente?.price ?? 0;
  };


  /** Cunado obtenga valor esos 3, comenzara a calcularse el amount */
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
      if (price == 0) {
        useNotify().error('No existe tarifa vigente para la fecha solicitada')

        cleanUp();

      } else {
        OrderState.amount = Number((price * units).toFixed(2))
      }



    }
  )

  /** Crear Ordens */
  const onSubmit = async (e: FormSubmitEvent<StoreOrderSchema>) => {

    if (checkOrder(e.data)) return;

    try {

      await useProductsApi().orders.post(e.data);


      useNotify().success('Se ha creado la orden correctamente')
      cleanUp();

    } catch (error) {

      useNotify().error('Ha habido un error al crear la orden')
    }
  }


  /** Crear Ordens */
  const onUpdate = async (e: FormSubmitEvent<UpdateOrderSchema>, id: string) => {
    try {

      await useProductsApi().orders.put(id, e.data);


      useNotify().success('Se ha actualizado la orden correctamente')
      cleanUp();

    } catch (error) {

      useNotify().error('Ha habido un error al editar la orden')
    }
  }


  /***
   * Borrar Pedido
   */
  const onDelete = async (id: string) => {
    const ok = await confirm({
      title: 'Borrar Pedido',
      description: `¿Deseas eliminar este pedido? Esta acción no se puede deshacer.`
    });

    if (!ok) return
    try {

      await useProductsApi().orders.delete(id);
      isOpen.value = false;


      useNotify().success('La orden se elimino correctamente')
    } catch (error) {
      useNotify().error('No se puedo eliminar la orden')
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
    useNotify().info('Ya existe un producto para la fecha indicada');
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
