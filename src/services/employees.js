import { config } from '../config'
import { loadAbort } from '../utils/loadAbort'

export const getEmployees = async () => {
    const controller = loadAbort()

    return {
        call:fetch(`${config.API_URL}employees/list`, {signal: controller.signal}),
        controller
    }
    
}

export const getEmployee = async (id) => {
    const respuesta = await fetch(`${config.API_URL}employees/list/${id}` ) 
    const resultado = await respuesta.json()

    return resultado
}

export const addEmployee = async (datos) => {
    try{
        const respuesta = await fetch(`${config.API_URL}employees/create`,{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        })
    }catch(error){
        console.log(error);
    }
    // console.log(datos);
}

export async function updateEmployee(id,datos){
    try{
        const respuesta = await fetch(`${config.API_URL}employees/update/${id}`,{
            method:'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    }catch(error){
        console.log(error);
    }
}

export async function deleteEmployee(id){
    try{
        const respuesta = await fetch(`${config.API_URL}employees/delete/${id}`,{
            method:'DELETE'
        })
        await respuesta.json()
    }catch(error){
        console.log(error)
    }
}