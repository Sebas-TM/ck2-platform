import '../style/nuevoUsuario.css'
import { FiX } from "react-icons/fi";
import { Toaster, toast } from 'sonner'
import { useState } from 'react';
import { addUser } from '../services/users';
import { Form, useActionData, redirect, useLoaderData } from 'react-router-dom';
import Formulario from './Formulario';
import Error from './Error';

export async function action({ request }) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)

    const errores = []

    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }

    if (Object.keys(errores).length) {
        return errores
    }


    await addUser(datos)
    return redirect('/menu/usuarios')
}



const NuevoUsuario = () => {
    const errores = useActionData()

    return (
        <section className='contenedor_nuevo-dato'>

            <Form
                method="post"
                noValidate
            >
                <Formulario />
            </Form>
        </section>
    )
}

export default NuevoUsuario