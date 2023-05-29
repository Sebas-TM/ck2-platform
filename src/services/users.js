import { config } from '../config'

export const getUsers = async () => {
    const respuesta = await fetch(`${config.API_URL}users/list`)
    const resultado = await respuesta.json()

    return resultado
}

export const getUser = async (id) => {
    const respuesta = await fetch(`${config.API_URL}users/list/${id}`)
    const resultado = await respuesta.json()

    return resultado

    // console.log(id)
}

export const addUser = async (datos) => {
    try {
        const respuesta = await fetch(`${config.API_URL}users/create`, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        })
        await respuesta.json()

    } catch (error) {
        console.log(error);
    }
    // console.log(datos)
}

export async function updateUser(id, datos){
    try{
        const respuesta = await fetch(`${config.API_URL}users/update/${id}`,{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    }catch(error){
        console.log(error)
    }
    // console.log(datos)
}

export async function deleteUser(id) {
    try {
        const respuesta = await fetch(`${config.API_URL}users/delete/${id}`, {
            method: 'DELETE'
        })

        await respuesta.json()
    }catch(error){
        console.log(error);
    }
    
}