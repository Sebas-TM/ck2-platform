import { config } from '../config'

export const getEmployees = async () => {
    const respuesta = await fetch(`${config.API_URL}employees/list`)
    const resultado = await respuesta.json()

    return resultado
}

export const getEmployee = async (id) => {
    const respuesta = await fetch(`${config.API_URL}employees/list/${id}` ) 
    const resultado = await respuesta.json()

    return resultado
}