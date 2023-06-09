import '../style/usuarios.css'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import useFetchAndLoad from "../hooks/useFetchAndLoad"
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import { useLoaderData, useNavigate, Form, redirect } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/users';
import { Toaster, toast } from 'sonner'



export const action = async ({ params }) => {
    await deleteUser(params.usuarioId)
    location.reload()

    return toast.success('Eliminado correctamente')
}
const Usuarios = () => {

    const cookies = new Cookies()
    const { loading, callEndpoint } = useFetchAndLoad()
    const [users, setUsers] = useState([])
    const [tabla, setTabla] = useState(users)
    const navigate = useNavigate()

    useEffect(() => {
        callEndpoint(getUsers())
            .then(res => res.json())
            .then(res => {
                setUsers(res)
            })
            .catch(error => {
                if (error.code === 'ERR_CANCELED') {
                    console.log('Request has been', error.message);
                }
            })
    }, [])
    console.log(users);

    if (!cookies.get('username')) {
        window.location.href = "/"
    }
    if (cookies.get('isAdmin') != 1) {
        window.location.href = "/menu"
    }

    const handleChange = e => {
        filtrar(e.target.value)
    }

    const filtrar = terminoBusqueda => {
        var resultadoBusqueda = tabla.filter((elemento) => {
            if (elemento.id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.apellido_paterno.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.apellido_materno.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.dni.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.isAdmin.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento
            }
        })
        setUsers(resultadoBusqueda)
    }


    return (
        <>
            <Toaster position='top-center' />
            <div className="form-group">
                <div className="form-group-header">
                    <h1>Administrar usuarios</h1>
                    <div className='contenedor-input'>
                        <input className='busqueda' type="text" onChange={handleChange} placeholder="Realizar búsqueda" />
                        <button className='btn_add' onClick={() => navigate(`/menu/usuarios/crear`)}><FiUserPlus className='icon' /></button>
                    </div>
                </div>
                <div className='contenedor-tabla'>
                    <table cellSpacing="0" cellPadding="0" className='tabla'>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Nombre</td>
                                <td>Apellido paterno</td>
                                <td>Apellido materno</td>
                                <td>DNI</td>
                                <td>Username</td>
                                <td>Administrador</td>
                                <td>Opciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td className='data data_id'>{index + 1}</td>
                                    <td className='data data_nombre'>{user.nombre}</td>
                                    <td className='data data_apaterno'>{user.apellido_paterno}</td>
                                    <td className='data data_amaterno'>{user.apellido_materno}</td>
                                    <td className='data data_amaterno'>{user.dni}</td>
                                    <td className='data data_username'>{user.username}</td>
                                    <td className='data data_admin'>{user.isAdmin == 1 ? 'SI' : 'NO'}</td>
                                    <td className='data data_opciones'>
                                        <button onClick={() => navigate(`/menu/usuarios/${user.id}/editar`)} className='btn_option edit'><FiEdit className='icon' /></button>
                                        <Form
                                            method='post'
                                            action={`/menu/usuarios/${user.id}/eliminar`}
                                            onSubmit={(e) => {
                                                if (!confirm('¿Deseas eliminar este registro?')) {
                                                    e.preventDefault()
                                                }
                                            }}
                                        >
                                            <button className='btn_option delete'><FiTrash className='icon' /></button>
                                        </Form>

                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>

                </div>
                <div className="contenedor-general-cards">
                    {
                        users.map((user, index) => (
                            <div key={index} className="contenedor-cards">
                                <div className="cards">
                                    <div className="contenedor-datos">
                                        <p className="dato">Nombre:</p>
                                        <p className="dato-info">{user.nombre}</p>
                                    </div>
                                    <div className="contenedor-datos">
                                        <p className="dato">Apellido paterno:</p>
                                        <p className="dato-info">{user.apellido_paterno}</p>
                                    </div>
                                    <div className="contenedor-datos">
                                        <p className="dato">Apellido materno:</p>
                                        <p className="dato-info">{user.apellido_materno}</p>
                                    </div>
                                    <div className="contenedor-datos">
                                        <p className="dato">DNI:</p>
                                        <p className="dato-info">{user.dni}</p>
                                    </div>
                                    <div className="contenedor-datos">
                                        <p className="dato">Usuario:</p>
                                        <p className="dato-info">{user.username}</p>
                                    </div>
                                    <div className="contenedor-datos">
                                        <p className="dato">Administrador:</p>
                                        <p className="dato-info">{user.isAdmin == 1 ? 'SI' : 'NO'}</p>
                                    </div>
                                </div>
                                <div className='data data_opciones'>
                                    <button onClick={() => navigate(`/menu/usuarios/${user.id}/editar`)} className='btn_option edit'><FiEdit className='icon' /></button>
                                    <Form
                                        method='post'
                                        action={`/menu/usuarios/${user.id}/eliminar`}
                                        onSubmit={(e) => {
                                            if (!confirm('¿Deseas eliminar este registro?')) {
                                                e.preventDefault()
                                            }
                                        }}
                                    >
                                        <button className='btn_option delete'><FiTrash className='icon' /></button>
                                    </Form>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
export default Usuarios