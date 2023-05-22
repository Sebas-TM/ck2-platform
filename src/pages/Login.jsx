import '../style/login.css'
import { useState } from 'react'
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'
import { Toaster, toast } from 'sonner'

const url = "http://localhost:3000/usuarios"
const cookies = new Cookies()
const Login = () => {

    const [usuario, setUsuario] = useState('')
    const [contraseña, setContraseña] = useState('')

    const iniciarSesion = async () => {
        await axios.get(url, {
            params: {
                username: usuario,
                password: md5(contraseña)
            }
        }).then(response => {
            return response.data;
        }).then(response => {
            if (response.length > 0) {
                var respuesta = response[0]
                cookies.set('id', respuesta.id, { path: "/" })
                cookies.set('apellido_paterno', respuesta.apellido_paterno, { path: "/" })
                cookies.set('apellido_materno', respuesta.apellido_materno, { path: "/" })
                cookies.set('nombre', respuesta.nombre, { path: "/" })
                cookies.set('username', respuesta.username, { path: "/" })
                // alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`)
                // toast.success('Ingreso correcto')
                window.location.href = "./menu"
            } else if(usuario=='' || contraseña==''){                
                toast.error('Rellenar todos los campos')
            } else{
                toast.error('El usuario y/o la contraseña son incorrectos')
            }
        }).catch(error => {
            console.log(error)

        })
    }


    if (cookies.get('username')) {
        window.location.href = "./menu"
    }


    return (
        <div className='contenedor-principal'>
            <Toaster position="top-center" richColors />
            <div className='contenedor-secundario'>
                <h1 className='form-group__titulo'>Comunik2</h1>
                <div className='form-group'>
                    <div className='form-group__input-group'>
                        <label htmlFor="user">Usuario</label>
                        <input
                            type="text"
                            name='user'
                            id='user'
                            placeholder='Ingrese su usuario'
                            onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name='password'
                            id='password'
                            placeholder='Ingrese su contraseña'
                            onChange={(e) => setContraseña(e.target.value)} />
                    </div>
                    <button className='form-group__boton' onClick={iniciarSesion}>Ingresar</button>
                </div>
            </div>
        </div>
    )
}

export default Login