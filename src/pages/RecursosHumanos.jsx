import { Outlet, Link, useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie'
import '../style/recursosHumanos.css'

const cookies = new Cookies()

const RecursosHumanos = () => {
    if (!cookies.get('username')) {
        window.location.href = "/"
    }

    const location = useLocation()

    return (
        <>

            <div className='contenedor-navegacion'>
                <nav className='navegacion'>
                    <Link className={`${location.pathname === '/menu/recursos_humanos' ? 'link_rrhh_seleccionado' : 'link_rrhh'}`} to='/menu/recursos_humanos'>Personal</Link>
                    <Link className={`${location.pathname === '/menu/recursos_humanos/postulaciones' ? 'link_rrhh_seleccionado' : 'link_rrhh'}`} to='/menu/recursos_humanos/postulaciones'>Postulaciones</Link>
                    <Link className={`${location.pathname === '/menu/recursos_humanos/gestiones' ? 'link_rrhh_seleccionado' : 'link_rrhh'}`} to='/menu/recursos_humanos/gestiones'>Otras gestiones</Link>

                </nav>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default RecursosHumanos