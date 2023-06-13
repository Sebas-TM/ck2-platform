import '../style/login.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'
import { Toaster, toast } from 'sonner'
import Spinner from '../components/Spinner'
import logo_texto from '../image/logo_texto.png'
import useFetchAndLoad from '../hooks/useFetchAndLoad';
import { useForm } from "react-hook-form";
import { loginUser } from '../services/users'
import { useNavigate } from 'react-router-dom'

const cookies = new Cookies()
const Login = () => {

    const [user, setUser] = useState()
    const [cargando, setCargando] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { loading, callEndpoint } = useFetchAndLoad()
    const navigate = useNavigate()


    // console.log(datos)
    // const iniciarSesion = async () => {
    //     setCargando(true)
    //     await axios.get(url, {
    //         params: {
    //             username: usuario,
    //             password: md5(contraseña)
    //         }
    //     }).then(response => {
    //         return response.data;
    //     }).then(response => {
    //         if (usuario == '' || contraseña == '') {
    //             toast.error('Rellenar todos los campos')
    //         }

    //         if (response.length > 0 && usuario != '' && contraseña != '') {
    //             for (let i = 0; response.length > i; i++) {
    //                 if (response[i].username == datos.username && response[i].password == datos.password) {
    //                     var respuesta = response[i]
    //                     cookies.set('id', respuesta.id, { path: "/" })
    //                     cookies.set('apellido_paterno', respuesta.apellido_paterno, { path: "/" })
    //                     cookies.set('apellido_materno', respuesta.apellido_materno, { path: "/" })
    //                     cookies.set('nombre', respuesta.nombre, { path: "/" })
    //                     cookies.set('username', respuesta.username, { path: "/" })
    //                     cookies.set('isAdmin', respuesta.isAdmin, { path: "/" })
    //                     // alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`)
    //                     toast.success('Ingreso correcto')
    //                     window.location.href = "./menu"
    //                     return
    //                 }
    //             }
    //             toast.error('El usuario y/o la contraseña son incorrectos')
    //         } else {
    //         }
    //     }).catch(error => {
    //         console.log(error)
    //     })
    //     setCargando(false)
    // }


    if (cookies.get('username')) {
        window.location.href = "./menu"
    }

    const onSubmit = data => {
        callEndpoint(loginUser(data))
            .then(resp => resp.json())
            .then(resp => {
                setUser(resp)
            })
    }
    console.log(user);

    if(user?.id){
        console.log('Hola');
    }


    return (
        <div className='contenedor-principal'>
            {cargando && <Spinner />}
            <Toaster position="top-center" richColors />
            <div className='contenedor-uno'>
                <img className='form-group__logo' src={logo_texto} alt="logo" />


                <form className='form-group' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='form-group__titulo'>Iniciar sesión</h1>
                    <div className='form-group__input-group'>
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            {...register('username',
                                {
                                    required: true
                                })
                            }
                            name='username'
                            id='username'
                            placeholder='Ingrese su usuario' />
                        {errors.username?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                    </div>
                    <div className='form-group__input-group'>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            {...register('password',
                                {
                                    required: true
                                })
                            }
                            name='password'
                            id='password'
                            placeholder='Ingrese su contraseña' />
                        {errors.password?.type === 'required' && <p className="error-message">Este campo es obligatorio</p>}
                    </div>
                    <input className='form-group__boton' type='submit' value='Ingresar' />
                    {/* <input type="button" onSubmit={iniciarSesion} className='form-group__boton' value='Ingresar'/> */}
                </form>
            </div>
            <div className='contenedor-dos'>
                <img src="" alt="" />
            </div>
        </div>
    )
}

export default Login