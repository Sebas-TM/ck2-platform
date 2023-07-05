import "../style/usuarios.css";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import useFetchAndLoad from "../hooks/useFetchAndLoad";
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/users";
import { Toaster, toast } from "sonner";
import swal from "sweetalert";
import Spinner from "../components/Spinner";
import { config } from "../config";
import axios from "axios";

const Usuarios = () => {
    const cookies = new Cookies();
    const rol = cookies.get("rol");
    const { loading, callEndpoint } = useFetchAndLoad();
    const [users, setUsers] = useState([]);
    const [tabla, setTabla] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerUsuarios();
    }, []);
    // console.log(users);
    const obtenerUsuarios = async () => {
        const res = await axios.get(`${config.API_URL}users/list`);
        setUsers(res.data);
        setTabla(res.data);
    };
    const eliminarUsuario = (userId) => {
        swal({
            text: "¿Estás seguro de eliminar este usuario?",
            buttons: ["No", "Si"],
        }).then((respuesta) => {
            if (respuesta) {
                try {
                    axios.delete(`${config.API_URL}users/delete/${userId}`);
                } catch (e) {
                    console.log(e);
                }
                toast.success("Dato eliminado!");
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== userId)
                );
            }
        });
    };

    if (!cookies.get("username")) {
        window.location.href = "/";
    }
    if (rol != 1) {
        window.location.href = "/menu";
    }

    const handleChange = (e) => {
        filtrar(e.target.value);
    };

    const filtrar = (terminoBusqueda) => {
        var resultadoBusqueda = tabla.filter((elemento) => {
            if (
                elemento.id
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                elemento.nombre
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                elemento.apellido_paterno
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                elemento.apellido_materno
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                elemento.dni
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                elemento.username
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                elemento.rol
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setUsers(resultadoBusqueda);
    };

    return (
        <>
            {users.length < 1 && <Spinner />}
            <Toaster position="top-center" richColors />
            <div className="form-group">
                <div className="form-group-header">
                    <button
                        className={rol != 3 ? "btn_add" : "disable-button"}
                        onClick={() => navigate(`/menu/usuarios/crear`)}>
                        <FiUserPlus className="icon" />
                        <p className="disable">Agregar</p>
                    </button>
                    <input
                        className="busqueda"
                        type="text"
                        onChange={handleChange}
                        placeholder="Realizar búsqueda"
                    />
                </div>
                <table cellSpacing="0" cellPadding="0" className="tabla">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>DNI</th>
                            <th>Username</th>
                            <th>Rol</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td className="data data_id">{index + 1}</td>
                                <td className="data data_nombre">
                                    {user.nombre}
                                </td>
                                <td className="data data_apaterno">
                                    {`${user.apellido_paterno} ${user.apellido_materno}`}
                                </td>
                                <td className="data data_amaterno">
                                    {user.dni}
                                </td>
                                <td className="data data_username">
                                    {user.username}
                                </td>
                                <td className="data data_admin">
                                    {user.rol == 1
                                        ? "Administrador"
                                        : user.rol == 2
                                        ? "Usuario"
                                        : "Lector"}
                                </td>
                                <td className="data data_opciones">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/menu/usuarios/${user.id}/editar`
                                            )
                                        }
                                        className="btn_option edit">
                                        <FiEdit className="icon" />
                                    </button>
                                    <button
                                        onClick={() => eliminarUsuario(user.id)}
                                        className="btn_option delete">
                                        <FiTrash className="icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="contenedor-general-cards">
                    {users.map((user, index) => (
                        <div key={index} className="contenedor-cards">
                            <div className="cards cards-usuarios">
                                <div className="contenedor-datos">
                                    <p className="dato">Nombre:</p>
                                    <p className="dato-info">{user.nombre}</p>
                                </div>
                                <div className="contenedor-datos">
                                    <p className="dato">Apellido paterno:</p>
                                    <p className="dato-info">
                                        {user.apellido_paterno}
                                    </p>
                                </div>
                                <div className="contenedor-datos">
                                    <p className="dato">Apellido materno:</p>
                                    <p className="dato-info">
                                        {user.apellido_materno}
                                    </p>
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
                                    <p className="dato">Rol:</p>
                                    <p className="dato-info">
                                        {user.rol == 1
                                            ? "Administrador"
                                            : user.rol == 2
                                            ? "Usuario"
                                            : "Lector"}
                                    </p>
                                </div>
                            </div>
                            <div className="data data_opciones">
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/menu/usuarios/${user.id}/editar`
                                        )
                                    }
                                    className="btn_option edit">
                                    <FiEdit className="icon" />
                                </button>
                                <button
                                    onClick={() => eliminarUsuario(user.id)}
                                    className="btn_option delete">
                                    <FiTrash className="icon" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Usuarios;
