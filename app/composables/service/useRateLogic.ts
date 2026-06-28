import type { StoreRateSchema } from "~~/shared/schemas/products/create";

/** Valores Estaticos */
const INIT_STATE = {
  price: 0,
  start_date: '',
  end_date: ''
}

/*** Tarifa Reactiva */
const CreateRate = reactive<StoreRateSchema>({ ...INIT_STATE })

/*** Array de rates creados */
const rates = reactive<StoreRateSchema[]>([]);




export const useRateLogic = () => {

  const notify = useNotify();

  /**
   * Validacion de perido de fecha
   * @param startDate string
   * @param endDate string
   * @returns 
   */
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


  /**
   * Comprobacion de requisitos
   * @param price number
   * @param start_date string
   * @param end_date string
   * @returns boolean
   */
  const checkValues = (price: number, start_date: string, end_date: string): boolean => {
    if (price <= 0) {
      notify.error('El precio debe establecer un valor mínimo')
      return false
    }
    if (start_date.length === 0 || end_date.length === 0) {
      notify.error('Debes añadir una fecha de inicio y final')
      return false
    }
    if (new Date(start_date) < new Date()) {
      notify.warning('La fecha de inicio no puede ser anterior o igual a la fecha actual')
      return false
    }
    if (new Date(start_date) >= new Date(end_date)) {
      notify.warning('La fecha de inicio no puede ser mayor o igual a la fecha final')
      return false
    }
    if (isValidDate(start_date, end_date)) {
      notify.warning('El periodo mínimo es de 2 meses')
      return false
    }
    return true
  }



  /** Borramos 1 Rate */
  const removeRate = (id: number) => rates.splice(id, 1);


  /** Agregar Tarifa */
  const addRate = () => {


    /** Comprobamos */
    if (!checkValues(CreateRate.price, CreateRate.start_date, CreateRate.end_date)) return;


    /** Agregamos card */
    rates.push({
      price: CreateRate.price,
      start_date: CreateRate.start_date,
      end_date: CreateRate.end_date,
    });

    /** Notificamos */
    notify.success('Tarifa Agregada Correctamente !');

    Rate.cleanForm();

  }

  const Rate = {
    add: addRate,
    cleanForm: () => Object.assign(CreateRate, { ...INIT_STATE }),
    cleanAll: () => rates.splice(0, rates.length),
    remove: removeRate,
  }

  return {
    CreateRate,
    rates,
    Rate,
    checkValues


  }

}
