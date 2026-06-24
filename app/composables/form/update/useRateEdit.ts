import { ratesSchemaCreate, type StoreRateSchema } from "~~/shared/schemas/products/create";
import { ratesSchemaEdit, type EditRateSchema } from "~~/shared/schemas/products/edit";
import type { FormSubmitEvent } from '@nuxt/ui'
export const useRateEdit = (product_id: string) => {
  const ProductRecord = useProductsStore();

  /** Items  */
  const { confirm } = useConfirm();
  const toast = useToast();
  const rates = computed(() => ProductRecord.findProduct(product_id)).value?.rates;
  const rateStatus = ref(false);
  const { checkValues } = useRateLogic();


  /** Esuqmea de Fomrulario */
  const RateSchema = computed(() => rateStatus.value ? ratesSchemaEdit : ratesSchemaCreate);

  /** Estado de edicion */
  const EditRate: Ref<EditRateSchema | undefined> = ref({
    id: rates![0]!.id,
    price: rates![0]!.price,
    start_date: rates![0]!.start_date!.split('T')[0],
    end_date: rates![0]!.end_date!.split('T')[0],
    product_id: product_id
  });

 
  /** Estado de Creacion */
  const CreateRate: Ref<StoreRateSchema | undefined> = ref({
    price: 0,
    start_date: '',
    end_date: '',
    product_id: product_id
  });

  /** Actualizacion de estados */
  const RateState = computed(() => rateStatus.value ? EditRate.value : CreateRate.value)


  /**
   * Funcion para poder borrar un rate
   * @param id 
   * @returns 
   */
  async function deleteRate(id: string) {

    if (rates?.length == 1) return toast.add({ title: 'Debe existir por lo menos 1 tarifa', color: 'error' });

    const ok = await confirm({
      title: 'Borrar Tarifa',
      description: `¿Eliminar este tarifa? Esta acción no se puede deshacer.`
    })

    if (!ok) return

    try {

      await $fetch(`/api/products/${product_id}/rates/${id}`, { method: 'DELETE' })

      toast.add({ title: 'Tarifa Borrada correctamente', color: 'primary' })

    } catch (error) {
      console.log(error)
      toast.add({ title: 'Ha habido un problema', color: 'error' });
    }

  }

  /** Funcion para cambiar rates */
  const changeRate = (id: string | undefined, stauts: boolean) => {
    if (!stauts) return;
    let rate = rates?.find((p) => p.id == id)
    if (!rate) return
    EditRate.value = {
      ...rate,
      start_date: rate.start_date!.split('T')[0],
      end_date: rate?.end_date!.split('T')[0],
    }
  }


  /** Funcion para editar o crear tarifas */
  const actionRate = async (e: FormSubmitEvent<EditRateSchema | StoreRateSchema>) => {

    if (e.data.price == undefined || e.data.start_date == undefined || e.data.end_date == undefined) {
      toast.add({ title: 'Valores es incoherente', color: 'error' })
      return;
    }

    if (!checkValues(e.data.price, e.data.start_date, e.data.end_date)) return;


    if (rateStatus.value && 'id' in e.data) {



      try {

        await $fetch(`/api/products/${product_id}/rates/${e.data.id}`, { method: 'PUT', body: e.data })

        toast.add({ title: 'Tarifa Actualizada Correctamente', color: 'primary' });

      } catch (e) {
        toast.add({ title: 'Ha habido problemas en actualizar la tarifa', color: 'error' });
      }

    } else {



      try {

        await $fetch(`/api/products/${product_id}/rates/`, { method: 'POST', body: e.data })

        toast.add({ title: 'Tarifa Creada Correctamente', color: 'primary' });

      } catch (error) {
        toast.add({ title: 'Ha habido problemas en crear la tarifa', color: 'error' });
      }
    }
  }


 

  return {
    rates, deleteRate, rateStatus, RateSchema, RateState, EditRate, CreateRate, changeRate, actionRate
  }

}
