import { useState, useEffect } from "react"
import ModuloCard from '../components/ModuloCard';
import area_rrhh from '../image/portada_rrhh.jpg'
import { Link } from "react-router-dom";
import '../style/modulos.css'
const Modulos = () => {


    return (

        <section className='contenedor-modulo'>
            <Link to='/menu/recursos_humanos'>
                <ModuloCard imagen={area_rrhh} texto={'Gestión de Talento Humano'} />
            </Link>
            {/* <Link>
                <ModuloCard imagen={area_rrhh} texto={'Cobranzas'} />
            </Link>
            <Link>
                <ModuloCard imagen={area_rrhh} texto={'Administración'} />
            </Link>
            <Link>
                <ModuloCard imagen={area_rrhh} texto={'Cobranzas'} />
            </Link>
            <Link>
                <ModuloCard imagen={area_rrhh} texto={'Recursos Humanos'} />
            </Link>
            <Link>
                <ModuloCard imagen={area_rrhh} texto={'Recursos Humanos'} />
            </Link>
            <Link>
                <ModuloCard imagen={area_rrhh} texto={'Recursos Humanos'} />
            </Link>
            <Link>
                <ModuloCard imagen={area_rrhh} texto={'Recursos Humanos'} />
            </Link> */}
        </section>
    )
}

export default Modulos