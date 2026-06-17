import type { StoreRateSchema } from "~~/shared/schemas/products/create";
export const useRateLogic = () => {

  const toast = useToast();



  /*** Tarifa Reactiva */
  const rate = reactive<StoreRateSchema>({
    price: 0,
    start_date: '',
    end_date: ''
  })

  /*** Array de rates creados */
  const rates = reactive<StoreRateSchema[]>([])



  const isValidDate = (startDate: string, endDate: string): boolean => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    if (isNaN(start) || isNaN(end)) return false
    if (end < start) return false

    const diffMs = end - start
    const diffDays = diffMs / (1000 * 60 * 60 * 24)
    const diffMonths = diffDays / 30.44

    return diffMonths < 2
  }


  /*** Comprobacion de valores dates */
  const checkValues = (): boolean => {

    let check = true;

    if (rate.price < 0) toast.add({ title: 'El precio es incoherente', color: 'error' }), check = false;

    if (rate.start_date.length == 0 || rate.end_date.length == 0) toast.add({ title: 'Debes añadir una fecha de inicio y final', color: 'error' }), check = false;

    if (new Date(rate.start_date) < new Date()) toast.add({ title: 'ERROR: La fecha de inicio no puede ser anterior o igual a la fecha actual', color: 'error' }), check = false;

    if (new Date(rate.start_date) >= new Date(rate.end_date)) toast.add({ title: 'ERROR: La fecha de inicio no puede ser mayor o igual a la fecha final', color: 'error' }), check = false;

    if (isValidDate(rate.start_date, rate.end_date)) toast.add({ title: 'ERROR: El periodo mínimo es de 2 meses', color: 'error' }), check = false;


    return check;
  }

  /***Limpiamos rate */
  const cleanRate = () => {
    Object.assign(rate, {
      price: 0,
      start_date: '',
      end_date: ''
    })
  }

  const removeRate = (id: number) => {
    rates.splice(id, 1);
  }

  /** Agregar Tarifa */
  const addRate = () => {

    if (!checkValues()) return;

    const card = {
      price: rate.price,
      start_date: rate.start_date,
      end_date: rate.end_date
    }
    /** Agregamos card */
    rates.push(card);

    toast.add({ title: 'Tarifa Agregada Correctamente !', color: 'primary' });

    /** Limpiamos rate */
    cleanRate();



  }








  return {
    rate,
    rates,
    addRate,
    removeRate

  }

}
