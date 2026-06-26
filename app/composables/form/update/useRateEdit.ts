import { ratesSchemaCreate, type StoreRateSchema } from "~~/shared/schemas/products/create";
import { ratesSchemaEdit, type EditRateSchema } from "~~/shared/schemas/products/edit";
import type { FormSubmitEvent } from '@nuxt/ui'
export const useRateEdit = (product_id: string) => {

  /** Items  */
  const { data: product } = useProductsApi().products.useOne(product_id);
  const { confirm } = useConfirm();
  const toast = useToast();

  const rates = computed(() => product.value?.rates)
  const rateStatus = ref(false);
  const { checkValues } = useRateLogic();
  const { CreateRate , cleanRate } = useRateLogic();  


  /** Esuqmea de Fomrulario */
  const RateSchema = computed(() => rateStatus.value ? ratesSchemaEdit : ratesSchemaCreate);

  /** Estado de edicion */
  const EditRate: Ref<EditRateSchema | undefined> = ref({
    id: rates.value![0]?.id,
    price: rates.value![0]?.price,
    start_date: rates.value![0]?.start_date.split('T')[0],
    end_date: rates.value![0]?.end_date.split('T')[0],
  });




  /** Actualizacion de estados */
  const RateState = computed(() => rateStatus.value ? EditRate.value : CreateRate)


  /**
   * Funcion para poder borrar un rate
   * @param id 
   * @returns 
   */
  async function deleteRate(id: string) {

    if (rates.value?.length == 1) return toast.add({ title: 'Debe existir por lo menos 1 tarifa', color: 'error' });

    const ok = await confirm({
      title: 'Borrar Tarifa',
      description: `¿Eliminar este tarifa? Esta acción no se puede deshacer.`
    })

    if (!ok) return

    try {

      await useProductsApi().rates.delete(product_id, id);

      toast.add({ title: 'Tarifa Borrada correctamente', color: 'primary' })

    } catch (error) {
      toast.add({ title: 'Ha habido un problema', color: 'error' });
    }

  }

  /** Funcion para cambiar rates */
  const changeRate = (id: string | undefined, stauts: boolean) => {
    if (!stauts) return;
    let rate = rates.value?.find((p) => p.id == id)
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
      toast.add({ title: 'Valores incoherentes', color: 'error' })
      return;
    }

    if (!checkValues(e.data.price, e.data.start_date, e.data.end_date)) return;


    if (rateStatus.value && 'id' in e.data) {



      try {

        await useProductsApi().rates.put(product_id, e.data.id, e.data)

        toast.add({ title: 'Tarifa Actualizada Correctamente', color: 'primary' });

      } catch (e) {
        toast.add({ title: 'Ha habido problemas en actualizar la tarifa', color: 'error' });
      }

    } else {

      const rate: StoreRateSchema = {
        price: e.data.price,
        start_date: e.data.start_date,
        end_date: e.data.end_date,
        product_id,
      }

      try {

        await useProductsApi().rates.post(product_id, rate)

        toast.add({ title: 'Tarifa Creada Correctamente', color: 'primary' });

        cleanRate();

      } catch (error) {
        toast.add({ title: 'Ha habido problemas en crear la tarifa', color: 'error' });
      }
    }
  }




  return {
    rates, deleteRate, rateStatus, RateSchema, RateState, EditRate, CreateRate, changeRate, actionRate
  }

}
