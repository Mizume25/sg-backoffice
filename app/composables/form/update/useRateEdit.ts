import { ratesSchemaCreate, type StoreRateSchema } from "~~/shared/schemas/products/create";
import { ratesSchemaEdit, type EditRateSchema } from "~~/shared/schemas/products/edit";
import type { FormSubmitEvent } from '@nuxt/ui'
export const useRateEdit = (product_id: string) => {

  /** Items  */
  const { data: product } = useProductsApi().products.useOne(product_id);
  const { confirm } = useConfirm();

  const rates = computed(() => product.value?.rates)
  const rateStatus = ref(false);
  const { checkValues } = useRateLogic();
  const { CreateRate, cleanRate } = useRateLogic();


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

    if (rates.value?.length == 1) return useNotify().success('Debe existir por lo menos 1 tarifa');

    const ok = await confirm({
      title: 'Borrar Tarifa',
      description: `¿Eliminar este tarifa? Esta acción no se puede deshacer.`
    })

    if (!ok) return

    try {

      await useProductsApi().rates.delete(product_id, id);

      useNotify().success('Tarifa Borrada correctamente')

    } catch (error) {
      useNotify().error('Ha habido un problema')
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
      useNotify().error('Valores incoherentes');
      return;
    }

    if (!checkValues(e.data.price, e.data.start_date, e.data.end_date)) return;


    if (rateStatus.value && 'id' in e.data) {



      try {

        await useProductsApi().rates.put(product_id, e.data.id, e.data)


        useNotify().success('Tarifa Actualizada Correctamente');

      } catch (e) {

        useNotify().error('Ha habido problemas en actualizar la tarifa');
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

        useNotify().success('Tarifa Creada Correctamente');

        cleanRate();

      } catch (error) {
        useNotify().error('Ha habido problemas en crear la tarifa');
      }
    }
  }




  return {
    rates, deleteRate, rateStatus, RateSchema, RateState, EditRate, CreateRate, changeRate, actionRate
  }

}
