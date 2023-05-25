import '../style/nuevoUsuario.css'
import { FiX } from "react-icons/fi";
import { Toaster, toast } from 'sonner'
import { useState } from 'react';
import { addUser } from '../services/users';
import { Form, useActionData, redirect } from 'react-router-dom';

export async function action({request}){
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    await addUser(datos)
    console.log('usuario agregado')
    return redirect('/menu/usuarios')
}

const NuevoUsuario = ({ openModal, setOpenModal }) => {

    const [nombre, setNombre] = useState('')
    const [apellido_paterno, setApellidoPaterno] = useState('')
    const [apellido_materno, setApellidoMaterno] = useState('')
    const [dni, setDni] = useState('')
    const [usuario, setUsuario] = useState('')
    const [contraseña, setContraseña] = useState('')


    return (
        <section className='contenedor-nuevo_usuario'>
            <Toaster />
            <button onClick={() => setOpenModal(!openModal)}><FiX className='icono' /></button>
            <Form
                method="post"
                noValidate
            >
                <div className='contenedor-form'>
                    <h1 className='contenedor-form__texto'>Nuevo usuario</h1>
                    <div className='form-group__input-group'>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            name='nombre'
                            id='nombre'
                            placeholder='Ingrese su nombre'
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="apellido_paterno">Apellido paterno</label>
                        <input
                            type="text"
                            name='apellido_paterno'
                            id='apellido_paterno'
                            placeholder='Ingrese su apellido paterno'
                            onChange={(e) => setApellidoPaterno(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="apellido_materno">Apellido materno</label>
                        <input
                            type="text"
                            name='apellido_materno'
                            id='apellido_materno'
                            placeholder='Ingrese su apellido materno'
                            onChange={(e) => setApellidoMaterno(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="dni">DNI</label>
                        <input
                            type="text"
                            name='dni'
                            id='dni'
                            placeholder='Ingrese su DNI'
                            onChange={(e) => setDni(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            name='usuario'
                            id='usuario'
                            placeholder='Ingrese su usuario'
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="contraseña">Contraseña</label>
                        <input
                            type="password"
                            name='contraseña'
                            id='contraseña'
                            placeholder='Ingrese su contraseña'
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="admin">Administrador</label>
                        <select
                            className='select_admin'
                        >
                            <option value="" disabled>--Seleccione--</option>
                            <option value="1">1</option>
                            <option value="0">0</option>
                        </select>
                    </div>
                    <div className='form-group__input-group'>
                        <input
                            type='submit'
                            className='btn_registrar'
                            value='Registrar usuario'
                        />
                    </div>
                </div>
            </Form>
        </section>
    )
}

export default NuevoUsuario