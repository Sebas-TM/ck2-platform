import { config } from '../config'
import { loadAbort } from '../utils/loadAbort'

export const getEmployees =  () => {
    const controller = loadAbort()

    return {
        call:fetch(`${config.API_URL}api/employees/list`, {signal: controller.signal}),
        controller
    }
    
}

export const getEmployee =  (id) => {
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}api/employees/list/${id}`, { signal: controller.signal }),
        controller
    }
}

export const postEmployee =  (employee) => {
    const controller = loadAbort()

    return{
        call: fetch(`${config.API_URL}api/employees/create`,{
            signal: controller.signal,
            method: 'POST',
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify(employee)
        })
    }
    console.log(employee)
}

export  function updateEmployee(employee, id){
    const controller = loadAbort()
    console.log(employee);

    return{
        call: fetch(`${config.API_URL}api/employees/update/${id}`,{
            signal: controller.signal,
            method: 'POST',
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify(employee)
        })
    }
}

export  function deleteEmployee(id){
    const controller = loadAbort()

    return {
        call: fetch(`${config.API_URL}api/employees/delete/${id}`,
            {
                signal: controller.signal,
                method: 'DELETE'
            }),
        controller
    }
}