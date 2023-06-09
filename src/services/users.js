import { config } from '../config'
import { loadAbort } from '../utils/loadAbort'
export const getUsers = () => {
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}users/list`, { signal: controller.signal }),
        controller
    }
}

export const getUser = (id) => {
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}users/list/${id}`, { signal: controller.signal }),
        controller
    }
}

export const postUser =  (user) => {
    const controller = loadAbort()

    return{
        call: fetch(`${config.API_URL}users/create`,{
            signal: controller.signal,
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        })
    }
}

export async function updateUser(id, datos) {
    try {
        const respuesta = await fetch(`${config.API_URL}users/update/${id}`, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
    // console.log(datos)
}

export const deleteUser = (id) => {
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}users/delete/${id}`,
            {
                signal: controller.signal,
                method: 'DELETE'
            }),
        controller
    }
}