import Cookies from 'universal-cookie'
import { FiMenu } from "react-icons/fi";
import '../style/menu.css'
import { useState } from 'react';
import { Link,Outlet } from 'react-router-dom';
import { FiUsers, FiChevronDown, FiSettings } from "react-icons/fi";
import { GiEntryDoor } from "react-icons/gi";

import logo_texto from '../image/logo_texto.png'
import logo from '../image/logo.png'
import user_icon from '../image/user-icon.png'

const cookies = new Cookies()

const Menu = () => {

    const [menuToggle, setMenuToggle] = useState(false)

    const openMenu = () => {
        setMenuToggle(!menuToggle)
    }

    const closeMenu = () => {
        setMenuToggle(false)
    }

    const cerrarSesion = () => {
        cookies.remove('id', { path: "/" })
        cookies.remove('apellido_paterno', { path: "/" })
        cookies.remove('apellido_materno', { path: "/" })
        cookies.remove('nombre', { path: "/" })
        cookies.remove('username', { path: "/" })
        window.location.href = '/'
    }


    if (!cookies.get('username')) {
        window.location.href = "/"
    }


    // console.log(cookies.get('id'))
    // console.log('apellido_paterno: ' + cookies.get('apellido_paterno'))
    // console.log('apellido_materno: ' + cookies.get('apellido_materno'))
    // console.log('nombre: ' + cookies.get('nombre'))
    // console.log('username: ' + cookies.get('username'))
    // console.log('isAdmin: ' + cookies.get('isAdmin'))

    const id = cookies.get('id')
    const apellido_paterno = cookies.get('apellido_paterno')
    const apelllido_materno = cookies.get('apellido_materno')
    const nombre = cookies.get('nombre')
    const username = cookies.get('username')
    const isAdmin = cookies.get('isAdmin')

    return (
        <>
            <header className='contenedor-header'>
                <div className='header'>
                    <Link to='/menu' className='contenedor-logo-menu'>
                        <img className='logo1' src={logo_texto} alt="logo" />
                        <img className='logo2' src={logo} alt="logo" />
                    </Link>
                    <div className='contenedor-usuario' onClick={openMenu}>
                        <div className='contenedor-saludo-usuario disable'>
                            <p className='usuario'>{`Hola! ${nombre} ${apellido_paterno}`}</p>
                            <FiChevronDown className='icono-user' />
                        </div>
                        <div className='contenedor-img-usuario'>
                            <img src={user_icon} alt="" />
                        </div>
                    </div>
                    {
                        menuToggle &&
                        <ul className='contenedor-menu__user'>
                            <Link to='/menu/usuarios' className={isAdmin == 0 ? 'isNotAdmin' : 'list'}>
                                <FiUsers className='icono-li' />
                                <p>Administrar usuarios</p>
                            </Link>
                            <li className='list'>
                                <FiSettings className='icono-li' />
                                <p>Configuración</p>
                            </li>
                            <li className='list' onClick={cerrarSesion}>
                                <GiEntryDoor className='icono-li' />
                                <p>Cerrar sesión</p>
                            </li>
                        </ul>
                    }
                </div>
            </header>

            <div onClick={closeMenu} className='outlet'>
                <Outlet />
            </div>
        </>
    )
}

export default Menu