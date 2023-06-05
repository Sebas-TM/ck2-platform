import '../style/login.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'
import { Toaster, toast } from 'sonner'
import Spinner from '../components/Spinner'
import logo_texto from '../image/logo_texto.png'

const url = "http://127.0.0.1:8000/api/users/list"
const cookies = new Cookies()
const Login = () => {

    const [usuario, setUsuario] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [cargando, setCargando] = useState(false)

    const datos = {
        username: usuario,
        password: md5(contraseña)
    }
    // console.log(datos)
    const iniciarSesion = async () => {
        setCargando(true)
        await axios.get(url, {
            params: {
                username: usuario,
                password: md5(contraseña)
            }
        }).then(response => {
            return response.data;
        }).then(response => {
            if (usuario == '' || contraseña == '') {
                toast.error('Rellenar todos los campos')
            }

            if (response.length > 0 && usuario != '' && contraseña != '') {
                for (let i = 0; response.length > i; i++) {
                    if (response[i].username == datos.username && response[i].password == datos.password) {
                        var respuesta = response[i]
                        cookies.set('id', respuesta.id, { path: "/" })
                        cookies.set('apellido_paterno', respuesta.apellido_paterno, { path: "/" })
                        cookies.set('apellido_materno', respuesta.apellido_materno, { path: "/" })
                        cookies.set('nombre', respuesta.nombre, { path: "/" })
                        cookies.set('username', respuesta.username, { path: "/" })
                        cookies.set('isAdmin', respuesta.isAdmin, { path: "/" })
                        // alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`)
                        toast.success('Ingreso correcto')
                        window.location.href = "./menu"
                        return
                    }
                }
                toast.error('El usuario y/o la contraseña son incorrectos')
            } else {
            }
        }).catch(error => {
            console.log(error)
        })
        setCargando(false)
    }


    if (cookies.get('username')) {
        window.location.href = "./menu"
    }


    return (
        <div className='contenedor-principal'>
            {cargando && <Spinner />}
            <Toaster position="top-center" richColors />
            <div className='contenedor-uno'>
                <img className='form-group__logo' src={logo_texto} alt="logo" />


                <div className='form-group'>
                    <h1 className='form-group__titulo'>Bienvenido(a)</h1>
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
                    <button className='form-group__boton' onClick={iniciarSesion} >Iniciar sesión</button>
                </div>
            </div>
            <div className='contenedor-dos'>
                <img src="" alt="" />
            </div>
        </div>
    )
}

export default Login