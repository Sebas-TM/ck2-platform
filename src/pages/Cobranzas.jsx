import "../style/cobranzas.css";
import { useState, useRef } from "react";
import { utils as XLSXUtils, readFile as XLSXRead } from "xlsx";
import BodyTableCobranzas from "../components/BodyTableCobranzas";
import { useForm } from "react-hook-form";
import axios from "axios";
import { config } from "../config";
import { Toaster, toast } from "sonner";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Spinner from "../components/Spinner";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaSave, FaFileExport } from "react-icons/fa";
import { ImDownload2 } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import SpinnerContenido from "../components/SpinnerContenido";
import SpinnerIcono from "../components/SpinnerIcono";
import { CSVLink } from "react-csv";
import ErrorMessage from "../components/ErrorMessage";
const Cobranzas = () => {
    const [fileName, setFileName] = useState(null);
    const [rows, setRows] = useState([]);
    const [active, setActive] = useState(0);
    const [page, setPage] = useState();
    const [filterDate, setFilterDate] = useState();
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [dataCobranzas, setDataCobranzas] = useState([]);
    const [dataCobranzasExcel, setDataCobranzasExcel] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    });
    const tableRef = useRef(null);
    const [cargandoConsulta, setCargandoConsulta] = useState(false);
    const [cargandoGuardar, setCargandoGuardar] = useState(false);
    const [cargandoFilterDate, setCargandoFilterDate] = useState(false);
    const csvLinkRef = useRef();

    const handleFile = async (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
        const data = await file.arrayBuffer();
        const workbook = XLSXRead(data);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const colsJSON = XLSXUtils.sheet_to_json(worksheet, {
            header: 1,
            defVal: "",
        });
        const headers = colsJSON[0];
        const rows = colsJSON.slice(1);

        setRows(rows);
    };

    const transformData = (data) => {
        return data.map((item) => {
            return {
                agente: item[0] ? item[0] : "",
                supervisor: item[1] ? item[1] : "",
                fecha: item[2] ? item[2] : "",
                titular_nombres_apellidos: item[3] ? item[3] : "",
                tipo_doc: item[4] ? item[4] : "",
                nro_documento: item[5] ? item[5] : "",
                celular_grabacion_legal: item[6] ? item[6] : "",
                celular_adicional_1: item[7] ? item[7] : "",
                celular_adicional_2: item[8] ? item[8] : "",
                producto_play: item[9] ? item[9] : "",
                producto: item[10] ? item[10] : "",
                plan_telefono: item[11] ? item[11] : "",
                plan_internet: item[12] ? item[12] : "",
                plan_cable: item[13] ? item[13] : "",
                tipo_venta: item[14] ? item[14] : "",
                precio_total: item[15] ? item[15] : 0,
                sot: item[16] ? item[16] : 0,
                sec: item[17] ? item[17] : 0,
                contrato: item[18] ? item[18] : 0,
                estado: item[19] ? item[19] : "",
                ciclo_facturacion: item[20] ? item[20] : 0,
                fecha_emision: item[21] ? item[21] : "",
                vencimiento_facturas: item[22] ? item[22] : "",
                factura: item[23] ? item[23] : "",
                pago: item[24] ? item[24] : "",
                estado_pago: item[25] ? item[25] : "",
                fecha_pago_mes_1: item[26] ? item[26] : "",
                fecha_pago_mes_2: item[27] ? item[27] : "",
                fecha_pago_mes_3: item[28] ? item[28] : "",
                seguimiento_recibo: item[29] ? item[29] : "",
                customerId: item[30] ? item[30] : 0,
                comentario_llamada: item[31] ? item[31] : "",
                observacion: item[32] ? item[32] : "",
                motivo_no_pago_1: item[33] ? item[33] : "",
                fecha_gestion: item[34] ? item[34] : "",
                medio_pago: item[35] ? item[35] : "",
            };
        });
    };

    const dataExcel = transformData(rows);
    const guardarDatos = async () => {
        console.log(dataExcel);
        if (dataExcel.length > 0) {
            setCargandoGuardar(true);
            await axios
                .post(`${config.API_URL}api/cobranzas/insert`, dataExcel, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataExcel),
                })
                .then(() => toast.success("Datos registrados"))
                .catch((res) => {
                    toast.success(res.status);
                });
            setCargandoGuardar(false);
        } else {
            toast.error("No se ha seleccionado ningún archivo");
        }
    };

    const consultarDatos = async (pg = 1) => {
        const res = await axios.get(
            `${config.API_URL}api/cobranzas/list?page=${pg}`
        );
        const { data, meta } = res.data;
        setDataCobranzas(data);
        setPagination(meta);
        setPage(pg);
    };

    const onClickConsultarDatos = async () => {
        setCargandoConsulta(true);
        await consultarDatos();
        setCargandoConsulta(false);
    };

    const eliminarDatos = () => {
        swal({
            text: "¿Deseas eliminar todos los registros?",
            buttons: ["No", "Si"],
        }).then((res) => {
            if (res) {
                try {
                    axios.delete(`${config.API_URL}api/cobranzas/delete`);
                } catch (e) {
                    console.log(e);
                }
                toast.success("Todos los registros fueron eliminados");
            }
        });
    };

    const searchAndFilter = async (info) => {
        setCargandoFilterDate(true);
        await searchAndFilterFunction(info, 1);
        setCargandoFilterDate(false);
    };
    const searchAndFilterFunction = async (info, pg = 1) => {
        await axios
            .post(`${config.API_URL}api/cobranzas/search?page=${pg}`, info, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                const { data, meta } = res.data;
                setDataCobranzas(data);
                setPagination(meta);
                setPage(1);
                setFilterDate(info);
                setPage(pg);
                if (info.date_filter) {
                    setValue("from_date", meta.from_date);
                    setValue("to_date", meta.to_date);
                }
            })
            .catch((e) => console.log(e));
    };
    const borrarFilterByDate = async () => {
        setFilterDate(null);
        await consultarDatos();
        setValue("date_filter", "");
        setValue("from_date", "");
        setValue("to_date", "");
        setValue("termino", "");
    };

    const handlePageChange = ({ selected }) => {
        if (!filterDate) {
            return consultarDatos(selected + 1);
        }
        searchAndFilterFunction(filterDate, selected + 1);
        tableRef.current.scrollTo(0, 0);
    };

    const fetchAllDataToExport = async () => {
        if (filterDate) {
            await axios
                .post(
                    `${config.API_URL}api/cobranzas/search?allData=1`,
                    filterDate,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => setDataCobranzasExcel(res.data))
                .catch((e) => console.log(e));
        } else {
            await axios
                .get(`${config.API_URL}api/cobranzas/listAll`)
                .then((res) => {
                    setDataCobranzasExcel(res.data);
                })
                .catch((e) => console.log(e));
        }
    };

    const exportDataToExcel = async () => {
        await fetchAllDataToExport();
        swal({
            text: `Se exportarán los registros`,
            buttons: ["Cancelar", "Aceptar"],
        }).then((res) => {
            if (res) {
                try {
                    csvLinkRef.current.link.click();
                } catch (e) {
                    console.log(e);
                }
            }
        });
    };
    return (
        <div className="contenedorCobranzas">
            <Toaster position="top-center" richColors />
            <div className="header_cobranza">
                <div className="title">
                    <h1>Cobranzas</h1>
                    <h3>Gestión de datos de clientes</h3>
                </div>
                <div className="container_buttons_cobranzas">
                    <label className="uploadExcel" htmlFor="uploadExcel">
                        <p>
                            <span>Subir archivo</span>
                            <RiFileExcel2Fill className="icon_button_cobranza" />
                        </p>
                        <input
                            type="file"
                            id="uploadExcel"
                            className="input_uploadExcel"
                            onChange={(e) => handleFile(e)}
                        />
                    </label>
                    <button className="button_save" onClick={guardarDatos}>
                        Guardar
                        {cargandoGuardar ? (
                            <SpinnerIcono />
                        ) : (
                            <FaSave className="icon_button_cobranza " />
                        )}
                    </button>
                    <button
                        className="button_load"
                        onClick={onClickConsultarDatos}
                    >
                        Consultar
                        {cargandoConsulta ? (
                            <SpinnerIcono />
                        ) : (
                            <ImDownload2 className="icon_button_cobranza" />
                        )}
                    </button>
                    <button className="button_delete" onClick={eliminarDatos}>
                        Eliminar
                        <AiFillDelete className="icon_button_cobranza" />
                    </button>
                    <button className="button_save" onClick={exportDataToExcel}>
                        Exportar
                        <FaFileExport className="icon_button_cobranza" />
                    </button>
                    <CSVLink
                        data={dataCobranzasExcel}
                        filename={"cobranzas.csv"}
                        className="button_save_hidden"
                        ref={csvLinkRef}
                    ></CSVLink>
                </div>
            </div>
            <div className="filters">
                <form
                    className="filterByDate"
                    onSubmit={handleSubmit(searchAndFilter)}
                >
                    <div className="formFilter_subcontainer">
                        <div className="filterByDate_subcontenedor">
                            <label htmlFor="date_filter">
                                <p>Filtrar por fecha:</p>
                                <select
                                    className="date_filter"
                                    name="date_filter"
                                    id="date_filter"
                                    {...register("date_filter")}
                                >
                                    <option value="">Personalizada</option>
                                    <option value="today">Hoy</option>
                                    <option value="yesterday">Ayer</option>
                                    <option value="this_week">
                                        Esta semana
                                    </option>
                                    <option value="this_month">Este mes</option>
                                    <option value="last_month">
                                        El mes pasado
                                    </option>
                                    <option value="this_year">Este año</option>
                                </select>
                            </label>
                        </div>
                        <div className="filerByDate_subcontenedor_1">
                            <label htmlFor="from_date">
                                <p>Desde:</p>
                                <input
                                    type="date"
                                    name="from_date"
                                    id="from_date"
                                    {...register("from_date")}
                                />
                            </label>
                            <label htmlFor="to_date">
                                <p>Hasta:</p>
                                <input
                                    type="date"
                                    name="to_date"
                                    id="to_date"
                                    {...register("to_date")}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="formFilter_subcontainer_2">
                        <div className="filterByDate_subcontenedor_2">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                name="termino"
                                id="termino"
                                {...register("termino")}
                            />
                        </div>
                        <div className="filerByDate_subcontenedor_3">
                            <button>
                                {cargandoFilterDate ? (
                                    <SpinnerIcono />
                                ) : (
                                    "Buscar"
                                )}
                            </button>
                            {filterDate && (
                                <p
                                    className="btn_borrar_filtro"
                                    onClick={borrarFilterByDate}
                                >
                                    <FiX />
                                    Borrar filtro
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            <table
                cellSpacing="0"
                cellPadding="0"
                className="tabla tabla-cobranzas"
                ref={tableRef}
            >
                <thead>
                    <tr>
                        <th className="columnId-cobranzas">#</th>
                        <th>Asesor</th>
                        <th>Titular</th>
                        <th>DOC</th>
                        <th>Celular 1</th>
                        <th>Estado</th>
                        <th>SEC</th>
                        <th className="columnButton-cobranzas"></th>
                    </tr>
                </thead>

                <tbody>
                    {dataCobranzas.map((item, i) => (
                        <BodyTableCobranzas
                            item={item}
                            index={i}
                            key={i}
                            active={active}
                            setActive={setActive}
                            consultarDatos={consultarDatos}
                            page={page}
                            searchAndFilterFunction={searchAndFilterFunction}
                            filterDate={filterDate}
                        />
                    ))}
                </tbody>
            </table>
            {dataCobranzas.length < 1 && <ErrorMessage />}
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
    );
};

export default Cobranzas;
