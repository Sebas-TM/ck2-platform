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
    FiX,
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
import NuevoEmpleado from "../components/NuevoEmpleado";

const cookies = new Cookies();

const Empleados = () => {
    const rol = cookies.get("rol");
    const [employees, setEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
    const [tabla, setTabla] = useState([]);
    const [termino, setTermino] = useState();
    const [page, setPage] = useState();
    const [handleModal, setHandleModal] = useState(false);
    const tableRef1 = useRef(null);
    const tableRef = useRef(null);
    const [employeeId, setEmployeeId] = useState();
    const [employeeIdEdit, setEmployeeIdEdit] = useState();
    const [panelIsOpen, setPanelIsOpen] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();
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
    const [sedeLima, setSedeLima] = useState(0);
    const [sedeTrujillo, setSedeTrujillo] = useState(0);
    const [asesor, setAsesor] = useState(0);
    const [filtro, setFiltro] = useState();
    const [columna, setColumna] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setCargando(true);
            await obtenerEmpleados();
            setSedeTrujillo(await filterCard("Trujillo", "sede", 1));
            setSedeLima(await filterCard("Lima", "sede", 1));
            setAsesor(await filterCard("asesor(a)", "puesto", 1));
            setActiveEmployees(await filterCard("activo", "estado", 1));
            setCargando(false);
        };

        fetchData();
    }, []);

    const handleModalIsOpen = (id) => {
        setModalIsOpen(!modalIsOpen);
        setEmployeeIdEdit(id);
    };

    const filterCard = async (termino, columna, pg = 1) => {
        const res = await axios.post(
            `${config.API_URL}api/employees/filterCard?termino=${termino}&columna=${columna}&page=${pg}`
        );

        const { meta, data } = res.data;
        setPage(pg);

        return meta.total;
    };

    const filter = async (filtro, columna, pg = 1) => {
        const res = await axios.post(
            `${config.API_URL}api/employees/filterCard?termino=${filtro}&columna=${columna}&page=${pg}`
        );
        const { data, meta } = res.data;
        setPage(pg);
        setValue("termino", "");
        setFiltro(filtro);
        setColumna(columna);
        setEmployees(data);
        setPagination(meta);
        tableRef.current.scrollTo(0, 0);
        tableRef1.current.scrollTo(0, 0);
    };

    const obtenerEmpleados = async (pg = 1) => {
        setCargandoBusqueda(true);
        const res = await axios.get(
            `${config.API_URL}api/employees/list?page=${pg}`
        );
        const { data, meta } = res.data;

        const sortedEmployees = data.sort((a, b) => b.id - a.id);
        setEmployees(sortedEmployees);
        setTabla(data);
        setPagination(meta);
        setAllEmployees(meta.total);
        setCargandoBusqueda(false);

        tableRef1.current.scrollTo(0, 0);
        tableRef.current.scrollTo(0, 0);
        setPage(pg);
        setFiltro();
    };

    const submitData = async (data) => {
        setCargandoBusqueda(true);
        if (data.termino) {
            <div className=""></div>;
            setTermino(data.termino);
        } else {
            setTermino();
            obtenerEmpleados();
            tableRef.current.scrollTo(0, 0);
        }
        setCargandoBusqueda(false);
    };

    const searchData = async (pg = 1) => {
        setCargandoBusqueda(true);
        await axios
            .post(
                `${config.API_URL}api/employees/search?termino=${termino}&page=${pg}`
            )
            .then((res) => {
                setEmployees(res.data.data);
                setPagination(res.data.meta);
            });
        setCargandoBusqueda(false);
        setPage(pg);
        setFiltro();
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
        if (!filtro) {
            if (!termino) {
                obtenerEmpleados(selected + 1);
            } else {
                searchData(selected + 1);
            }
        } else {
            filter(filtro, columna, selected + 1);
        }

        tableRef.current.scrollTo(0, 0);
        tableRef1.current.scrollTo(0, 0);
    };

    const handlePanelIsOpen = () => {
        setPanelIsOpen(!panelIsOpen);
    };
    return (
        <div className="contenedor-empleados">
            {modalIsOpen && (
                <NuevoEmpleado
                    employeeIdEdit={employeeIdEdit}
                    setModalIsOpen={setModalIsOpen}
                    modalIsOpen={modalIsOpen}
                    employees={employees}
                    setEmployees={setEmployees}
                    pagination={pagination}
                    setPagination={setPagination}
                    termino={termino}
                    page={page}
                    filtro={filtro}
                    columna={columna}
                />
            )}
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
                    className={`link_filtro ${panelIsOpen ? "show" : ""}`}
                >
                    <FiGrid className="link_filtro_icon" />
                    <p>Áreas</p>
                </Link>
                <Link
                    to="/menu/puestos"
                    className={`link_filtro ${panelIsOpen ? "show" : ""}`}
                >
                    <FiGrid className="link_filtro_icon" />
                    <p>Puestos</p>
                </Link>
            </div>
            <div className="form-group form-group-empleados">
                <div className="empleados-data-card-contenedor">
                    <div className="empleados-data-card">
                        <button onClick={() => filter("activo", "estado", 1)}>
                            <EmpleadoDataCard
                                icono={<FiUsers />}
                                dato={activeEmployees}
                                descripcion={"Colaboradores Activos"}
                            />
                        </button>
                        <button onClick={() => filter("Lima", "sede", 1)}>
                            <EmpleadoDataCard
                                icono={<FiUsers />}
                                dato={sedeLima}
                                descripcion={"Colaboradores Lima"}
                            />
                        </button>
                        <button onClick={() => filter("Trujillo", "sede", 1)}>
                            <EmpleadoDataCard
                                icono={<FiUsers />}
                                dato={sedeTrujillo}
                                descripcion={"Colaboradores Trujillo"}
                            />
                        </button>
                        <button
                            onClick={() => filter("asesor(a)", "puesto", 1)}
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

                <div className="container_form_table_pagination">
                    <div
                        className={
                            rol != 3
                                ? "form-group-header"
                                : "form-group-header-lector"
                        }
                    >
                        <form
                            className="form-buscar-empleados"
                            onSubmit={handleSubmit(submitData)}
                        >
                            <p className="btn_add">
                                <FiX />
                                Borrar filtro
                            </p>
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
                        <button
                            className={rol != 3 ? "btn_add" : "disable-button"}
                            onClick={() => handleModalIsOpen(null)}
                        >
                            <FiUserPlus className="icon" />
                            <p className="disable">Agregar</p>
                        </button>
                    </div>
                    <table
                        cellSpacing="0"
                        cellPadding="0"
                        className="tabla tabla-empleados"
                        ref={tableRef1}
                    >
                        <thead>
                            <tr>
                                <th></th>
                                <th className="nombre">Colaborador(a)</th>
                                <th className="area">Área</th>
                                <th className="sede">Sede</th>
                                <th className="estado">Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => (
                                <tr key={employee.id}>
                                    <td
                                        align="center"
                                        onClick={() =>
                                            openHandleModal(employee.id)
                                        }
                                    >
                                        <div className="contenedor-imagenTable">
                                            <img
                                                loading="lazy"
                                                className="img_empleados"
                                                onError={(e) => {
                                                    e.target.src =
                                                        foto_personal;
                                                }}
                                                src={
                                                    employee.imagen
                                                        ? `${config.API_URL}${
                                                              employee.imagen
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
                                            openHandleModal(employee.id)
                                        }
                                    >
                                        <div className="data_nombre_container">
                                            <p className="colaborador">{`${employee.nombre} ${employee.apellido_paterno} ${employee.apellido_materno}`}</p>
                                            <p className="dni">
                                                {employee.dni}
                                            </p>
                                        </div>
                                    </td>
                                    <td
                                        className="data data_area_puesto"
                                        onClick={() =>
                                            openHandleModal(employee.id)
                                        }
                                    >
                                        <div className="data_nombre_container">
                                            <p className="puesto">
                                                {employee.puesto}
                                            </p>
                                            <p className="area">
                                                {employee.area}
                                            </p>
                                        </div>
                                    </td>
                                    <td
                                        className="data data_sede"
                                        onClick={() =>
                                            openHandleModal(employee.id)
                                        }
                                    >
                                        <p className="p_sede_lima">
                                            {employee.sede}
                                        </p>
                                    </td>
                                    <td
                                        className="data data_estado"
                                        onClick={() =>
                                            openHandleModal(employee.id)
                                        }
                                    >
                                        <p
                                            className={
                                                employee.estado == "Activo"
                                                    ? "p_estado_activo"
                                                    : "p_estado_no_activo"
                                            }
                                        ></p>
                                    </td>
                                    <td className="data data_opciones">
                                        <button
                                            onClick={() =>
                                                openHandleModal(employee.id)
                                            }
                                            className="btn_option view"
                                        >
                                            <FiEye className="icon" />
                                        </button>

                                        <Link
                                            className="btn_option wsp"
                                            target="blank"
                                            to={`https://wa.me/51${employee.celular}`}
                                        >
                                            <BsWhatsapp className="icon" />
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleModalIsOpen(employee.id)
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
                                                eliminarEmpleado(employee.id)
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
                        {employees.map((employee, index) => (
                            <div
                                key={index}
                                className={
                                    employee.estado === "No activo"
                                        ? "empleado-no-activo contenedor-cards"
                                        : "contenedor-cards"
                                }
                            >
                                <div
                                    className="cards cards-employee"
                                    onClick={() => openHandleModal(employee.id)}
                                >
                                    <div className="container">
                                        <div className="contenedor-foto">
                                            <div className="contenedor-redondo-foto">
                                                <img
                                                    loading="lazy"
                                                    src={
                                                        employee.imagen
                                                            ? `${config.API_URL}${employee.imagen}`
                                                            : foto_personal
                                                    }
                                                    alt="foto_personal"
                                                />
                                            </div>
                                        </div>
                                        <div className="datos-principales">
                                            <p className="datos-principales_nombre">{`${employee.nombre} ${employee.apellido_paterno}`}</p>
                                            <p className="datos-principales_dni">
                                                {employee.dni}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="contenedor-info">
                                        <div className="contenedor-datos">
                                            <p className="dato">Celular:</p>
                                            <p className="dato-info">
                                                {employee.celular}
                                            </p>
                                        </div>
                                        <div className="contenedor-datos">
                                            <p className="dato">Área:</p>
                                            <p className="dato-info">
                                                {employee.area}
                                            </p>
                                        </div>
                                        <div className="contenedor-datos">
                                            <p className="dato">Estado:</p>
                                            <p className="dato-info">
                                                {employee.estado}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="data data_opciones">
                                    <button
                                        onClick={() =>
                                            openHandleModal(employee.id)
                                        }
                                        className="btn_option view"
                                    >
                                        <FiEye className="icon" />
                                    </button>
                                    <Link
                                        className="btn_option wsp"
                                        target="blank"
                                        to={`https://wa.me/51${employee.celular}`}
                                    >
                                        <BsWhatsapp className="icon" />
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleModalIsOpen(employee.id)
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
                                            eliminarEmpleado(employee.id)
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
