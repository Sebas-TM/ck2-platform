import {config} from '../config'

export const getUsers = async () => {
    const respuesta = await fetch(`${config.API_URL}users/list`)
    const resultado = await respuesta.json()

    return resultado
}

export const addUser = async (datos)=>{
    try{
        const respuesta = await fetch(`${config.API_URL}users/create`,{
            method:'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type': 'application/json',
                'Accept':'*/*'
            }
        })
        await respuesta.json()

    }catch(error){
        console.log(error);
    }
    // console.log(datos)
}
