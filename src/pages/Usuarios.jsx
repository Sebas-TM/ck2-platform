import '../style/usuarios.css'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import Cookies from 'universal-cookie'
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import { useLoaderData, useNavigate, Form, redirect } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/users';
import { Toaster, toast } from 'sonner'


const cookies = new Cookies()

export function loader() {
    const usuarios = getUsers()
    return usuarios
}

export const action = async ({ params }) => {
    await deleteUser(params.usuarioId)
    location.reload()
    
    return toast.success('Eliminado correctamente')
}



const Usuarios = () => {
    if (!cookies.get('username')) {
        window.location.href = "/"
    }
    if (cookies.get('isAdmin') != 1) {
        window.location.href = "/menu"
    }

    const usuarios = useLoaderData()    
    const [users, setUsers] = useState(usuarios)
    const [tabla, setTabla] = useState(users)

    // setUsers(usuarios)
    // console.log(tabla);
    const navigate = useNavigate()

    
    
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
            {!users.length && <Spinner />}
            <div className="form-group">
                <Toaster position='top-center'/>
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
                                <td>Admin</td>
                                <td>Opciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user,index) => (
                                <tr key={user.id}>
                                    <td className='data data_id'>{index+1}</td>
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
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}
export default Usuarios