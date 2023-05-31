import React from 'react'
import FormularioEmpleado from './FormularioEmpleado'
import { Form, redirect } from 'react-router-dom'
import { useActionData } from 'react-router-dom'
import { addEmployee } from '../services/employees'

export async function action({request}){
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    await addEmployee(datos)
    return redirect('/menu/recursos_humanos')
}

const NuevoEmpleado = () => {
    return (
        <section className='contenedor_nuevo-dato'>
            <Form
                method="post"
                noValidate
            >
                <FormularioEmpleado />
            </Form>
        </section>
    )
}

export default NuevoEmpleado