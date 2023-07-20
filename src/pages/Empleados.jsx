import {
    useLoaderData,
    Form,
    Link,
    Outlet,
    useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { BsWhatsapp } from "react-icons/bs";
import {
    FiUserPlus,
    FiTrash,
    FiEdit,
    FiEye,
    FiSearch,
    FiUsers,
} from "react-icons/fi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import Spinner from "../components/Spinner";
import foto_personal from "../image/foto_personal.webp";
import { config } from "../config";
import "../style/empleados.css";
import "../style/paginacion.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import EmpleadoDataCard from "../components/EmpleadoDataCard";
import { useForm } from "react-hook-form";
import VerEmpleado from "../components/VerEmpleado";

const cookies = new Cookies();

const Empleados = () => {
    const rol = cookies.get("rol");
    const [employees, setEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [tabla, setTabla] = useState([]);
    const [termino, setTermino] = useState();
    const [handleModal, setHandleModal] = useState(false);
    const [employeeId, setEmployeeId] = useState();
    const navigate = useNavigate();
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const sortedEmployees = employees.sort((a, b) => b.id - a.id);
    const [
        cantidadEmpleadosPorEstadoActivo,
        setCantidadEmpleadosPorEstadoActivo,
    ] = useState();
    const [cantidadEmpleadosPorSedeLima, setCantidadEmpleadosPorSedeLima] =
        useState();
    const [
        cantidadEmpleadosPorSedeTrujillo,
        setCantidadEmpleadosPorSedeTrujillo,
    ] = useState();
    const [cantidadEmpleadosPorPuesto, setCantidadEmpleadosPorPuesto] =
        useState();

    const openHandleModal = (id) => {
        setHandleModal(!handleModal);
        setEmployeeId(id);
    };

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            setCargando(true);
            await obtenerEmpleados();
            await obtenerTodosEmpleados();
            setCargando(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (allEmployees.length) {
            setCantidadEmpleadosPorSedeLima(
                buscarPorDatoSede("Lima", allEmployees)
            );
            setCantidadEmpleadosPorSedeTrujillo(
                buscarPorDatoSede("Trujillo", allEmployees)
            );
            setCantidadEmpleadosPorEstadoActivo(
                buscarPorDatoEstado("Activo", allEmployees)
            );
            setCantidadEmpleadosPorPuesto(
                buscarPorDatoPuesto("Asesor(a)", allEmployees)
            );
        } else {
            return () => {};
        }
    }, [allEmployees]);

    const buscarPorDatoSede = (valor, arreglo) => {
        const repeticiones = arreglo.filter(
            (item) => item.sede === valor
        ).length;
        return repeticiones;
    };

    const buscarPorDatoEstado = (valor, arreglo) => {
        const repeticiones = arreglo.filter(
            (item) => item.estado === valor
        ).length;
        return repeticiones;
    };

    const buscarPorDatoPuesto = (valor, arreglo) => {
        const repeticiones = arreglo.filter(
            (item) => item.puesto === valor
        ).length;
        return repeticiones;
    };

    const obtenerEmpleados = async (page = 1) => {
        setCargando(true);
        const res = await axios.get(
            `${config.API_URL}api/employees/list?page=${page}`
        );
        const { data, meta } = res.data;
        setEmployees(data);
        setTabla(data);
        setPagination(meta);
        setCargando(false);
    };

    const obtenerTodosEmpleados = async () => {
        const res = await axios.get(`${config.API_URL}api/employees/listAll`);
        setAllEmployees(res.data);
    };

    const submitData = async (data) => {
        setCargando(true);
        if (data.termino) {
            await axios
                .post(
                    `${config.API_URL}api/employees/search?termino=${data.termino}`
                )
                .then((res) => setEmployees(res.data.data));
        } else {
            obtenerEmpleados();
        }
        setCargando(false);
    };
    console.log(employees);
    const eliminarEmpleado = (employeeId) => {
        swal({
            text: "¿Estás seguro de eliminar este registro?",
            buttons: ["No", "Si"],
        }).then((respuesta) => {
            if (respuesta) {
                try {
                    axios.delete(
                        `${config.API_URL}api/employees/delete/${employeeId}`
                    );
                } catch (e) {
                    console.log(e);
                }
                toast.success("Dato eliminado!");
                setEmployees((prevEmployees) =>
                    prevEmployees.filter(
                        (employee) => employee.id !== employeeId
                    )
                );
            }
        });
    };

    const handlePageChange = ({ selected }) => {
        obtenerEmpleados(selected + 1);
    };
    return (
        <div className="contenedor-empleados">
            <div className="panel-filtro">
                <h1>Total de registros: {allEmployees.length}</h1>
            </div>
            <div className="form-group form-group-empleados">
                <div className="empleados-data-card-contenedor">
                    <div className="empleados-data-card">
                        <EmpleadoDataCard
                            icono={<FiUsers />}
                            dato={cantidadEmpleadosPorEstadoActivo}
                            descripcion={"Colaboradores Activos"}
                        />
                        <EmpleadoDataCard
                            icono={<FiUsers />}
                            dato={cantidadEmpleadosPorSedeLima}
                            descripcion={"Colaboradores Lima"}
                        />
                        <EmpleadoDataCard
                            icono={<FiUsers />}
                            dato={cantidadEmpleadosPorSedeTrujillo}
                            descripcion={"Colaboradores Trujillo"}
                        />
                        <EmpleadoDataCard
                            icono={<TfiHeadphoneAlt />}
                            dato={cantidadEmpleadosPorPuesto}
                            descripcion={"Asesores"}
                        />
                    </div>
                </div>
                {cargando && <Spinner />}
                {handleModal && (
                    <VerEmpleado
                        handleModal={handleModal}
                        setHandleModal={setHandleModal}
                        employeeId={employeeId}
                    />
                )}
                <Toaster position="top-center" richColors />
                <div
                    className={
                        rol != 3
                            ? "form-group-header"
                            : "form-group-header-lector"
                    }>
                    <button
                        className={rol != 3 ? "btn_add" : "disable-button"}
                        onClick={() =>
                            navigate(`/menu/recursos_humanos/empleado/crear`)
                        }>
                        <FiUserPlus className="icon" />
                        <p className="disable">Agregar</p>
                    </button>
                    <form
                        className="form-buscar-empleados"
                        onSubmit={handleSubmit(submitData)}>
                        <input
                            className="busqueda"
                            type="text"
                            id="termino"
                            name="termino"
                            {...register("termino")}
                            placeholder="Realizar búsqueda"
                        />
                        <button className="btn_add" type="submit">
                            <FiSearch className="icon" />
                        </button>
                    </form>
                </div>
                <table
                    cellSpacing="0"
                    cellPadding="0"
                    className="tabla tabla-empleados">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="nombre">Nombre</th>
                            <th className="apellidos">Apellidos</th>
                            {/* <th>Apellido materno</th> */}
                            <th className="dni">DNI</th>
                            <th className="estado">Estado</th>
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
                                        openHandleModal(sortedEmployee.id)
                                    }>
                                    <div className="contenedor-imagenTable">
                                        <img
                                            loading="lazy"
                                            className="img_empleados"
                                            src={
                                                sortedEmployee.imagen
                                                    ? `${config.API_URL}${
                                                          sortedEmployee.imagen
                                                      }?${Date.now()}`
                                                    : foto_personal
                                            }
                                            alt="foto_personal"
                                        />
                                    </div>
                                </td>
                                <td
                                    className="data data_nombre"
                                    onClick={() =>
                                        openHandleModal(sortedEmployee.id)
                                    }>
                                    {sortedEmployee.nombre}
                                </td>
                                <td
                                    className="data data_apaterno"
                                    onClick={() =>
                                        openHandleModal(sortedEmployee.id)
                                    }>
                                    {`${sortedEmployee.apellido_paterno} ${sortedEmployee.apellido_materno}`}
                                </td>
                                <td
                                    className="data data_amaterno"
                                    onClick={() =>
                                        openHandleModal(sortedEmployee.id)
                                    }>
                                    {sortedEmployee.dni}
                                </td>
                                <td
                                    className="data data_amaterno"
                                    onClick={() =>
                                        openHandleModal(sortedEmployee.id)
                                    }>
                                    {sortedEmployee.estado}
                                </td>
                                <td className="data data_opciones">
                                    <button
                                        onClick={() =>
                                            openHandleModal(sortedEmployee.id)
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
                                    openHandleModal(sortedEmployee.id)
                                }>
                                <div className="container">
                                    <div className="contenedor-foto">
                                        <div className="contenedor-redondo-foto">
                                            <img
                                                loading="lazy"
                                                src={
                                                    sortedEmployee.imagen
                                                        ? `${config.API_URL}${sortedEmployee.imagen}`
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
                                        openHandleModal(sortedEmployee.id)
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
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel="<"
                    pageCount={pagination.last_page}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={3}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                    activeLinkClassName="page-num"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                />
            </div>
        </div>
    );
};

export default Empleados;
