import Cookies from 'universal-cookie'
import '../style/menu.css'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { config } from '../config'
import logo_texto from '../image/logo_texto_ver2.png'
import logo from '../image/logo_ver2.png'
import foto_usuario from '../image/foto_personal.webp'

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
        cookies.remove('imagen', { path: "/" })
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
    // console.log('rol: ' + cookies.get('rol'))

    const id = cookies.get('id')
    const apellido_paterno = cookies.get('apellido_paterno')
    const apelllido_materno = cookies.get('apellido_materno')
    const nombre = cookies.get('nombre')
    const imagen = cookies.get('imagen')
    const username = cookies.get('username')
    const rol = cookies.get('rol')
    return (
        <div >
            <header className='contenedor-header'>
                <div className='header'>
                    <ul className='subcontenedor-header'>
                        <Link to='/menu' className='contenedor-logo-menu'>
                            <img className='logo1' src={logo_texto} alt="logo" />
                            <img className='logo2' src={logo} alt="logo" />
                        </Link>
                        <Link to='/menu' className='list disable'>
                            <p className='texto_header'>Menú</p>
                        </Link>
                        <Link to='/menu/usuarios' className={rol != 1 ? 'isNotAdmin' : 'list disable'}>
                            <p className='texto_header'>Usuarios</p>
                        </Link>
                    </ul>
                    <ul className='contenedor-usuario'>
                        <li className='disable'>
                            <p>{`Hola! ${nombre} ${apellido_paterno}`}</p>
                            {/* <FiChevronDown className='icono-user' /> */}
                        </li>

                        <li onClick={openMenu} className='contenedor-img-usuario'>
                            <img className='img-usuario' src={imagen ==null ? foto_usuario : `${config.API_URL}${imagen}`} alt="" />
                        </li>
                    </ul>

                    {menuToggle &&
                        <ul className='contenedor-menu__user'>
                            <Link to='/menu' className='list_user disable_user'>
                                <p className='texto_header'>Menú</p>
                            </Link>
                            <Link to='/menu/usuarios' className={rol != 1 ? 'isNotAdmin' : 'list_user disable_user'}>
                                <p className='texto_header'>Usuarios</p>
                            </Link>
                            
                            <li className='list_user' onClick={cerrarSesion}>
                                <p className='texto_header'>Cerrar sesión</p>
                            </li>
                        </ul>
                    }

                </div>
            </header>

            <div onClick={closeMenu} className='outlet'>
                <Outlet />
            </div>
        </div>
    )
}

export default Menu