import type { StoreRateSchema } from "~~/shared/schemas/products/create";

const INIT_STATE = {
  price: 0,
  start_date: '',
  end_date: ''
}

/*** Tarifa Reactiva */
const CreateRate = reactive<StoreRateSchema>({...INIT_STATE})

/*** Array de rates creados */
const rates = reactive<StoreRateSchema[]>([])

export const useRateLogic = () => {


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
  const checkValues = (price: number, start_date: string, end_date: string): boolean => {

    let check = true;



    if (price < 0) useNotify().error( 'El precio es incoherente'), check = false;

    else if (start_date.length == 0 || end_date.length == 0) useNotify().error( 'Debes añadir una fecha de inicio y final'), check = false;

    else if (new Date(start_date) < new Date()) useNotify().error( 'La fecha de inicio no puede ser anterior o igual a la fecha actual'), check = false;

    else if (new Date(start_date) >= new Date(end_date)) useNotify().error('La fecha de inicio no puede ser mayor o igual a la fecha final'), check = false;

    else if (isValidDate(start_date, end_date)) useNotify().error('El periodo mínimo es de 2 meses'), check = false;


    return check;
  }

  /***Limpiamos rate */
  const cleanRate = () => Object.assign(CreateRate, {...INIT_STATE})

  const removeRate = (id: number) => {
    rates.splice(id, 1);
  }

  /** Agregar Tarifa */
  const addRate = () => {

    if (!checkValues(CreateRate.price, CreateRate.start_date, CreateRate.end_date)) return;

    const card = {
      price: CreateRate.price,
      start_date: CreateRate.start_date,
      end_date: CreateRate.end_date
    }
    /** Agregamos card */
    rates.push(card);

  
    useNotify().success('Tarifa Agregada Correctamente !')

    /** Limpiamos rate */
    cleanRate();



  }



  const clearRates = () => rates.splice(0, rates.length);






  return {
    CreateRate,
    rates,
    addRate,
    removeRate,
    clearRates,
    checkValues,
    isValidDate,
    cleanRate

  }

}
