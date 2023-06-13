import { config } from '../config'
import { loadAbort } from '../utils/loadAbort'

export const getEmployees =  () => {
    const controller = loadAbort()

    return {
        call:fetch(`${config.API_URL}employees/list`, {signal: controller.signal}),
        controller
    }
    
}

export const getEmployee =  (id) => {
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}employees/list/${id}`, { signal: controller.signal }),
        controller
    }
}

export const postEmployee =  (employee) => {
    const controller = loadAbort()

    return{
        call: fetch(`${config.API_URL}employees/create`,{
            signal: controller.signal,
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
    }
}

export  function updateEmployee(employee, id){
    const controller = loadAbort()

    return{
        call: fetch(`${config.API_URL}employees/update/${id}`,{
            signal: controller.signal,
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
    }
}

export  function deleteEmployee(id){
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}employees/delete/${id}`,
            {
                signal: controller.signal,
                method: 'DELETE'
            }),
        controller
    }
}