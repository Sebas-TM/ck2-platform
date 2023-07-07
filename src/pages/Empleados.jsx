import {
    useLoaderData,
    Form,
    Link,
    Outlet,
    useNavigate,
} from "react-router-dom";
import { deleteEmployee, getEmployees } from "../services/employees";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { BsWhatsapp } from "react-icons/bs";
import { FiUserPlus, FiTrash, FiEdit, FiEye } from "react-icons/fi";
import Cookies from "universal-cookie";
import useFetchAndLoad from "../hooks/useFetchAndLoad";
import swal from "sweetalert";
import Spinner from "../components/Spinner";
import foto_personal from "../image/foto_personal.webp";
import "../style/empleados.css";
const cookies = new Cookies();

const Empleados = () => {
    const rol = cookies.get("rol");
    const { loading, callEndpoint } = useFetchAndLoad();
    const [employees, setEmployees] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [tabla, setTabla] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCargando(true);
        callEndpoint(getEmployees())
            .then((res) => res.json())
            .then((res) => {
                setEmployees(res);
                setTabla(res);
                setCargando(false);
            })
            .catch((error) => {
                if (error.code === "ERR_CANCELED") {
                    console.log("Request has been", error.message);
                }
            });
    }, []);

    const sortedEmployees = employees.sort((a, b) => b.id - a.id);

    const eliminarEmpleado = (employeeId) => {
        swal({
            text: "¿Estás seguro de eliminar este registro?",
            buttons: ["No", "Si"],
        }).then((respuesta) => {
            if (respuesta) {
                callEndpoint(deleteEmployee(parseInt(employeeId)))
                    .then((res) => res.json())
                    .then((res) => console.log(res))
                    .catch((error) => {
                        if (error.code === "ERR_CANCELED") {
                            console.log("Request has been", error.message);
                        }
                    });
                toast.success("Dato eliminado!");
                setEmployees((prevEmployees) =>
                    prevEmployees.filter(
                        (employee) => employee.id !== employeeId
                    )
                );
            }
        });
    };

    const handleChange = (e) => {
        filtrar(e.target.value);
    };

    const filtrar = (terminoBusqueda) => {
        var resultadoBusqueda = tabla.filter((e) => {
            if (
                e.nombre
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                e.apellido_paterno
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                e.apellido_materno
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                e.dni
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase()) ||
                e.estado
                    .toString()
                    .toLowerCase()
                    .includes(terminoBusqueda.toLowerCase())
            ) {
                return e;
            }
        });
        setEmployees(resultadoBusqueda);
    };
    return (
        <div className="form-group">
            {cargando && <Spinner />}
            <Toaster position="top-center" richColors />
            <div className="form-group-header">
                <button
                    className={rol != 3 ? "btn_add" : "disable-button"}
                    onClick={() =>
                        navigate(`/menu/recursos_humanos/empleado/crear`)
                    }>
                    <FiUserPlus className="icon" />
                    <p className="disable">Agregar</p>
                </button>
                <input
                    className="busqueda"
                    type="text"
                    onChange={handleChange}
                    placeholder="Realizar búsqueda"
                />

                {/* </div> */}
            </div>

            <table
                cellSpacing="0"
                cellPadding="0"
                className="tabla tabla-empleados">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        {/* <th>Apellido materno</th> */}
                        <th>DNI</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedEmployees.map((sortedEmployee, index) => (
                        <tr
                            key={sortedEmployee.id}
                            className={
                                sortedEmployee.estado === "No activo"
                                    ? "empleado-no-activo"
                                    : ""
                            }>
                            <td
                                align="center"
                                onClick={() =>
                                    navigate(
                                        `/menu/recursos_humanos/empleado/${sortedEmployee.id}`
                                    )
                                }>
                                <div className="contenedor-imagenTable">
                                    <img
                                        loading="lazy"
                                        className="img_empleados"
                                        src={
                                            sortedEmployee.imagen
                                                ? `http://127.0.0.1:8000/${sortedEmployee.imagen}`
                                                : foto_personal
                                        }
                                        alt="foto_personal"
                                    />
                                </div>
                            </td>
                            <td
                                className="data data_nombre"
                                onClick={() =>
                                    navigate(
                                        `/menu/recursos_humanos/empleado/${sortedEmployee.id}`
                                    )
                                }>
                                {sortedEmployee.nombre}
                            </td>
                            <td
                                className="data data_apaterno"
                                onClick={() =>
                                    navigate(
                                        `/menu/recursos_humanos/empleado/${sortedEmployee.id}`
                                    )
                                }>
                                {`${sortedEmployee.apellido_paterno} ${sortedEmployee.apellido_materno}`}
                            </td>
                            <td
                                className="data data_amaterno"
                                onClick={() =>
                                    navigate(
                                        `/menu/recursos_humanos/empleado/${sortedEmployee.id}`
                                    )
                                }>
                                {sortedEmployee.dni}
                            </td>
                            <td
                                className="data data_amaterno"
                                onClick={() =>
                                    navigate(
                                        `/menu/recursos_humanos/empleado/${sortedEmployee.id}`
                                    )
                                }>
                                {sortedEmployee.estado}
                            </td>
                            <td className="data data_opciones">
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/menu/recursos_humanos/empleado/${sortedEmployee.id}`
                                        )
                                    }
                                    className="btn_option view">
                                    <FiEye className="icon" />
                                </button>

                                <Link
                                    className="btn_option wsp"
                                    target="blank"
                                    to={`https://wa.me/51${sortedEmployee.celular}`}>
                                    <BsWhatsapp className="icon" />
                                </Link>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/menu/recursos_humanos/empleado/${sortedEmployee.id}/editar`
                                        )
                                    }
                                    className={
                                        rol != 3
                                            ? "btn_option edit"
                                            : "disable-button"
                                    }>
                                    <FiEdit className="icon" />
                                </button>

                                <button
                                    onClick={() =>
                                        eliminarEmpleado(sortedEmployee.id)
                                    }
                                    className={
                                        rol == 1
                                            ? "btn_option delete"
                                            : "disable-button"
                                    }>
                                    <FiTrash className="icon" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="contenedor-general-cards">
                {sortedEmployees.map((sortedEmployee, index) => (
                    <div
                        key={index}
                        className={
                            sortedEmployee.estado === "No activo"
                                ? "empleado-no-activo contenedor-cards"
                                : "contenedor-cards"
                        }>
                        <div
                            className="cards cards-employee"
                            onClick={() =>
                                navigate(
                                    `/menu/recursos_humanos/empleado/${sortedEmployee.id}`
                                )
                            }>
                            <div className="container">
                                <div className="contenedor-foto">
                                    <div className="contenedor-redondo-foto">
                                        <img
                                            loading="lazy"
                                            src={
                                                sortedEmployee.imagen
                                                    ? `http://127.0.0.1:8000/${sortedEmployee.imagen}`
                                                    : foto_personal
                                            }
                                            alt="foto_personal"
                                        />
                                    </div>
                                </div>
                                <div className="datos-principales">
                                    <p className="datos-principales_nombre">{`${sortedEmployee.nombre} ${sortedEmployee.apellido_paterno}`}</p>
                                    <p className="datos-principales_dni">
                                        {sortedEmployee.dni}
                                    </p>
                                </div>
                            </div>
                            <div className="contenedor-info">
                                <div className="contenedor-datos">
                                    <p className="dato">Celular:</p>
                                    <p className="dato-info">
                                        {sortedEmployee.celular}
                                    </p>
                                </div>
                                <div className="contenedor-datos">
                                    <p className="dato">Área:</p>
                                    <p className="dato-info">
                                        {sortedEmployee.area}
                                    </p>
                                </div>
                                <div className="contenedor-datos">
                                    <p className="dato">Estado:</p>
                                    <p className="dato-info">
                                        {sortedEmployee.estado}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="data data_opciones">
                            <button
                                onClick={() =>
                                    navigate(
                                        `/menu/recursos_humanos/empleado/${sortedEmployee.id}`
                                    )
                                }
                                className="btn_option view">
                                <FiEye className="icon" />
                            </button>
                            <Link
                                className="btn_option wsp"
                                target="blank"
                                to={`https://wa.me/51${sortedEmployee.celular}`}>
                                <BsWhatsapp className="icon" />
                            </Link>
                            <button
                                onClick={() =>
                                    navigate(
                                        `/menu/recursos_humanos/empleado/${sortedEmployee.id}/editar`
                                    )
                                }
                                className={
                                    rol != 3
                                        ? "btn_option edit"
                                        : "disable-button"
                                }>
                                <FiEdit className="icon" />
                            </button>
                            <button
                                onClick={() =>
                                    eliminarEmpleado(sortedEmployee.id)
                                }
                                className={
                                    rol == 1
                                        ? "btn_option delete"
                                        : "disable-button"
                                }>
                                <FiTrash className="icon" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Empleados;
