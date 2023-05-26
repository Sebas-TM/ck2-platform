import '../style/nuevoUsuario.css'
import { FiX } from "react-icons/fi";
import { Toaster, toast } from 'sonner'
import { useState } from 'react';
import { addUser} from '../services/users';
import { Form, useActionData, redirect, useLoaderData } from 'react-router-dom';
import Formulario from './Formulario';

export async function action({ request }) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    await addUser(datos)
    return redirect('/menu/usuarios')
}



const NuevoUsuario = () => {

    return (
        <section className='contenedor_usuario'>
            <Toaster />
            
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