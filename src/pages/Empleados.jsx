import {
    useLoaderData,
    Form,
    Link,
    Outlet,
    useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { BsWhatsapp } from "react-icons/bs";
import {
    FiUserPlus,
    FiTrash,
    FiEdit,
    FiEye,
    FiSearch,
    FiUsers,
    FiChevronDown,
} from "react-icons/fi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FiGrid } from "react-icons/fi";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import foto_personal from "../image/foto_personal.webp";
import { config } from "../config";
import "../style/empleados.css";
import "../style/paginacion.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import EmpleadoDataCard from "../components/EmpleadoDataCard";
import { useForm } from "react-hook-form";
import VerEmpleado from "../components/VerEmpleado";
import SpinnerIcono from "../components/SpinnerIcono";

const cookies = new Cookies();

const Empleados = () => {
    const rol = cookies.get("rol");
    const [employees, setEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
    const [tabla, setTabla] = useState([]);
    const [termino, setTermino] = useState("");
    const [handleModal, setHandleModal] = useState(false);
    const tableRef1 = useRef(null);
    const tableRef = useRef(null);
    const [employeeId, setEmployeeId] = useState();
    const [panelIsOpen, setPanelIsOpen] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const sortedEmployees = employees.sort((a, b) => b.id - a.id);

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

    const [activeEmployees, setActiveEmployees] = useState(0);
    const [activeEmployeesData, setActiveEmployeesData] = useState([]);
    const [activeEmployeesPagination, setActiveEmployeesPagination] = useState(
        {}
    );
    const [sedeLima, setSedeLima] = useState(0);
    const [sedeLimaData, setSedeLimaData] = useState([]);
    const [sedeLimaPagination, setSedeLimaPagination] = useState({});
    const [sedeTrujillo, setSedeTrujillo] = useState(0);
    const [sedeTrujilloData, setSedeTrujilloData] = useState([]);
    const [sedeTrujilloPagination, setSedeTrujilloPagination] = useState({});
    const [asesor, setAsesor] = useState(0);
    const [asesorData, setAsesorData] = useState([]);
    const [asesorPagination, setAsesorPagination] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setCargando(true);
            await obtenerEmpleados();
            await filterCard("Trujillo", "sede", 1);
            await filterCard("Lima", "sede", 1);
            await filterCard("asesor(a)", "puesto", 1);
            await filterCard("activo", "estado", 1);
            setCargando(false);
        };

        fetchData();
    }, []);

    const filterCard = async (termino, columna, page = 1) => {
        if (termino == "activo") {
            const res = await axios.post(
                `${config.API_URL}api/employees/filterCard?termino=${termino}&columna=${columna}&page=${page}`
            );
            const { data, meta } = res.data;

            setActiveEmployees(meta.total);
            setActiveEmployeesData(data);
            setActiveEmployeesPagination(meta);
        } else if (termino == "Trujillo") {
            const res = await axios.post(
                `${config.API_URL}api/employees/filterCard?termino=${termino}&columna=${columna}&page=${page}`
            );
            const { data, meta } = res.data;

            setSedeTrujillo(meta.total);
            setSedeTrujilloData(data);
            setSedeTrujilloPagination(meta);
        } else if (termino == "Lima") {
            const res = await axios.post(
                `${config.API_URL}api/employees/filterCard?termino=${termino}&columna=${columna}&page=${page}`
            );
            const { data, meta } = res.data;

            setSedeLima(meta.total);
            setSedeLimaData(data);
            setSedeLimaPagination(meta);
        } else if (termino == "asesor(a)") {
            const res = await axios.post(
                `${config.API_URL}api/employees/filterCard?termino=${termino}&columna=${columna}&page=${page}`
            );
            const { data, meta } = res.data;

            setAsesor(meta.total);
            setAsesorData(data);
            setAsesorPagination(meta);
        }
    };
    const obtenerEmpleados = async (page = 1) => {
        setCargandoBusqueda(true);
        const res = await axios.get(
            `${config.API_URL}api/employees/list?page=${page}`
        );
        const { data, meta } = res.data;
        setEmployees(data);
        setTabla(data);
        setPagination(meta);
        setAllEmployees(meta.total);
        setCargandoBusqueda(false);
        tableRef1.current.scrollTo(0, 0);
        tableRef.current.scrollTo(0, 0);
    };

    const submitData = async (data) => {
        setCargandoBusqueda(true);
        if (data.termino) {
            setTermino(data.termino);
        } else {
            setTermino("");
            obtenerEmpleados();
            tableRef.current.scrollTo(0, 0);
        }
        setCargandoBusqueda(false);
    };

    const searchData = async (page = 1) => {
        setCargandoBusqueda(true);
        await axios
            .post(
                `${config.API_URL}api/employees/search?termino=${termino}&page=${page}`
            )
            .then((res) => {
                setEmployees(res.data.data);
                setPagination(res.data.meta);
            });
        setCargandoBusqueda(false);
    };

    useEffect(() => {
        if (termino) {
            searchData();
            tableRef.current.scrollTo(0, 0);
            tableRef1.current.scrollTo(0, 0);
        } else {
            return () => {};
        }
    }, [termino]);

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
        if (termino == "") {
            obtenerEmpleados(selected + 1);
            tableRef.current.scrollTo(0, 0);
            tableRef1.current.scrollTo(0, 0);
        } else {
            searchData(selected + 1);
            tableRef.current.scrollTo(0, 0);
            tableRef1.current.scrollTo(0, 0);
        }
        // filterCard("Lima","sede",selected+1)
    };

    const handlePanelIsOpen = () => {
        setPanelIsOpen(!panelIsOpen);
    };

    return (
        <div className="contenedor-empleados">
            <div
                className={`panel-filtro ${panelIsOpen ? "show" : ""}`}
                onClick={handlePanelIsOpen}
            >
                <div className="panel_filtro_titulo">
                    <h1>Total de registros: {allEmployees}</h1>
                    <FiChevronDown
                        className={`panel_filtro_titulo_arrow ${
                            panelIsOpen ? "show" : ""
                        }`}
                    />
                </div>
                <Link
                    to="/menu/areas"
                    className={`link_filtro ${
                            panelIsOpen ? "show" : ""
                        }`}
                >
                    <FiGrid className="link_filtro_icon" />
                    <p>Áreas</p>
                </Link>
                <Link
                    to="/menu/puestos"
                    className={`link_filtro ${
                            panelIsOpen ? "show" : ""
                        }`}
                >
                    <FiGrid className="link_filtro_icon" />
                    <p>Puestos</p>
                </Link>
            </div>
            <div className="form-group form-group-empleados">
                <div className="empleados-data-card-contenedor">
                    <div className="empleados-data-card">
                        <button
                            onClick={() => {
                                setEmployees(activeEmployeesData);
                                setPagination(activeEmployeesPagination);
                            }}
                        >
                            <EmpleadoDataCard
                                icono={<FiUsers />}
                                dato={activeEmployees}
                                descripcion={"Colaboradores Activos"}
                            />
                        </button>
                        <button
                            onClick={() => {
                                setEmployees(sedeLimaData);
                                setPagination(sedeLimaPagination);
                            }}
                        >
                            <EmpleadoDataCard
                                icono={<FiUsers />}
                                dato={sedeLima}
                                descripcion={"Colaboradores Lima"}
                            />
                        </button>
                        <button
                            onClick={() => {
                                setEmployees(sedeTrujilloData);
                                setPagination(sedeTrujilloPagination);
                            }}
                        >
                            <EmpleadoDataCard
                                icono={<FiUsers />}
                                dato={sedeTrujillo}
                                descripcion={"Colaboradores Trujillo"}
                            />
                        </button>
                        <button
                            onClick={() => {
                                setEmployees(asesorData);
                                setPagination(asesorPagination);
                            }}
                        >
                            <EmpleadoDataCard
                                icono={<TfiHeadphoneAlt />}
                                dato={asesor}
                                descripcion={"Asesores"}
                            />
                        </button>
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
                    }
                >
                    <button
                        className={rol != 3 ? "btn_add" : "disable-button"}
                        onClick={() =>
                            navigate(`/menu/recursos_humanos/empleado/crear`)
                        }
                    >
                        <FiUserPlus className="icon" />
                        <p className="disable">Agregar</p>
                    </button>
                    <form
                        className="form-buscar-empleados"
                        onSubmit={handleSubmit(submitData)}
                    >
                        <input
                            className="busqueda"
                            type="text"
                            id="termino"
                            name="termino"
                            {...register("termino")}
                            placeholder="Buscar..."
                        />
                        <button className="btn_add" type="submit">
                            {cargandoBusqueda ? (
                                <SpinnerIcono />
                            ) : (
                                <FiSearch className="icon" />
                            )}
                        </button>
                    </form>
                </div>

                <div>
                    <table
                        cellSpacing="0"
                        cellPadding="0"
                        className="tabla tabla-empleados"
                        ref={tableRef1}
                    >
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
                                    }
                                >
                                    <td
                                        align="center"
                                        onClick={() =>
                                            openHandleModal(sortedEmployee.id)
                                        }
                                    >
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
                                        }
                                    >
                                        {sortedEmployee.nombre}
                                    </td>
                                    <td
                                        className="data data_apaterno"
                                        onClick={() =>
                                            openHandleModal(sortedEmployee.id)
                                        }
                                    >
                                        {`${sortedEmployee.apellido_paterno} ${sortedEmployee.apellido_materno}`}
                                    </td>
                                    <td
                                        className="data data_dni"
                                        onClick={() =>
                                            openHandleModal(sortedEmployee.id)
                                        }
                                    >
                                        {sortedEmployee.dni}
                                    </td>
                                    <td
                                        className="data data_estado"
                                        onClick={() =>
                                            openHandleModal(sortedEmployee.id)
                                        }
                                    >
                                        {sortedEmployee.estado}
                                    </td>
                                    <td className="data data_opciones">
                                        <button
                                            onClick={() =>
                                                openHandleModal(
                                                    sortedEmployee.id
                                                )
                                            }
                                            className="btn_option view"
                                        >
                                            <FiEye className="icon" />
                                        </button>

                                        <Link
                                            className="btn_option wsp"
                                            target="blank"
                                            to={`https://wa.me/51${sortedEmployee.celular}`}
                                        >
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
                                            }
                                        >
                                            <FiEdit className="icon" />
                                        </button>

                                        <button
                                            onClick={() =>
                                                eliminarEmpleado(
                                                    sortedEmployee.id
                                                )
                                            }
                                            className={
                                                rol == 1
                                                    ? "btn_option delete"
                                                    : "disable-button"
                                            }
                                        >
                                            <FiTrash className="icon" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {employees.length < 1 && <ErrorMessage />}
                    <div className="contenedor-general-cards" ref={tableRef}>
                        {sortedEmployees.map((sortedEmployee, index) => (
                            <div
                                key={index}
                                className={
                                    sortedEmployee.estado === "No activo"
                                        ? "empleado-no-activo contenedor-cards"
                                        : "contenedor-cards"
                                }
                            >
                                <div
                                    className="cards cards-employee"
                                    onClick={() =>
                                        openHandleModal(sortedEmployee.id)
                                    }
                                >
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
                                        className="btn_option view"
                                    >
                                        <FiEye className="icon" />
                                    </button>
                                    <Link
                                        className="btn_option wsp"
                                        target="blank"
                                        to={`https://wa.me/51${sortedEmployee.celular}`}
                                    >
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
                                        }
                                    >
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
                                        }
                                    >
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
        </div>
    );
};

export default Empleados;
