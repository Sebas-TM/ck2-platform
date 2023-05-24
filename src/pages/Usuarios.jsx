import '../style/usuarios.css'
import { useEffect, useState } from 'react'
const Usuarios = () => {

    const [datos, setDatos] = useState({})

    const consultarDatos = async () => {
        const url = "http://127.0.0.1:8000/api/users/list"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setDatos(resultado)
    }

    useEffect(() => {
        consultarDatos()
    }, [])

    return (
        <div className="usuarios">
            <div className="form-group">
                <div className="form-group-header">
                    <h1>Administrar usuarios</h1>
                    <input className='busqueda' type="text" placeholder="Realizar búsqueda" />
                </div>
                <div className='contenedor-tabla'>
                    <table cellspacing="0" cellpadding="0" className='tabla'>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Nombre</td>
                                <td>Apellido paterno</td>
                                <td>Apellido materno</td>
                                <td>Username</td>
                                <td>Admin</td>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map(dato => (
                                <tr key={dato.id}>
                                    <td>{dato.id}</td>
                                    <td>{dato.nombre}</td>
                                    <td>{dato.apellido_paterno}</td>
                                    <td>{dato.apellido_materno}</td>
                                    <td>{dato.username}</td>
                                    <td>{dato.isAdmin == 1 ? 'SI' : 'NO'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}
export default Usuarios