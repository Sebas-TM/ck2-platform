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
    console.log(user);

    return{
        call: fetch(`${config.API_URL}users/create`,{
            signal: controller.signal,
            method: 'POST',
            headers:{
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            },
            body:JSON.stringify(user)
        })
    }

}
export const loginUser =  (user) => {
    const controller = loadAbort()

    return{
        call: fetch(`${config.API_URL}users/login`,{
            signal: controller.signal,
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        })
    }

    // console.log(user);
}

export  function updateUser(user, id) {
    const controller = loadAbort()
    return{
        call: fetch(`${config.API_URL}users/update/${id}`,{
            signal: controller.signal,
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        }),
        controller
    }
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