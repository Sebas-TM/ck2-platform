import { useState, useEffect } from "react"
import ModuloCard from '../components/ModuloCard';
import area_rrhh from '../image/area_rrhh.jpg'
const Modulos = () => {

    const urlAreas = 'http://localhost:3001/areas'
    const [areas, setAreas] = useState([])

    const consultarAreas = async () => {
        const respuesta = await fetch(urlAreas)
        const resultado = await respuesta.json()
        setAreas(resultado)
    }

    useEffect(() => {
        consultarAreas()
    }, [])
    return (

        <section className='contenedor-modulo'>
            {areas.map(area => (
                <ModuloCard key={area.id} imagen={area_rrhh} texto={`Área de ${area.nombre}`} />
            ))}
        </section>
    )
}

export default Modulos