import "../style/cobranzas.css";
import { useState, useRef } from "react";
import { utils as XLSXUtils, readFile as XLSXRead } from "xlsx";
import BodyTableCobranzas from "../components/bodyTableCobranzas";
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

const Cobranzas = () => {
    const [fileName, setFileName] = useState(null);
    const [rows, setRows] = useState([]);
    const [active, setActive] = useState(0);
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [dataCobranzas, setDataCobranzas] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    });
    const tableRef = useRef(null);
    const [cargando, setCargando] = useState(false);

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
        if (dataExcel.length > 0) {
            await axios
                .post(`${config.API_URL}api/cobranzas/insert`, dataExcel, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataExcel),
                })
                .catch((error) => {
                    console.log(error);
                });
            toast.success("Datos registrados");
        } else {
            console.log("No hay datos para cargar");
        }
    };

    const consultarDatos = async (page) => {
        setCargando(true);
        const res = await axios.get(
            `${config.API_URL}api/cobranzas/list?page=${page}`
        );
        const { data, meta } = res.data;
        setDataCobranzas(data);
        setPagination(meta);
        setCargando(false);
        console.log(page);
        console.log(pagination);
        console.log(dataCobranzas);
    };

    const eliminarDatos = () => {
        swal({
            text: "¿Deseas eliminar todos los registros?",
            buttons: ["No", "Si"],
        }).then((res) => {
            if (res) {
                try {
                    axios.delete(`${config.API_URL}api/cobranzas/delete`);
                    consultarDatos();
                } catch (e) {
                    console.log(e);
                }
                toast.success("Todos los registros fueron eliminados");
            }
        });
    };
    const submitData = (info) => {
        console.log(info);
    };
    const handlePageChange = ({ selected }) => {
        consultarDatos(selected + 1);
        tableRef.current.scrollTo(0, 0);
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
                        Guardar datos
                        <FaSave className="icon_button_cobranza " />
                    </button>
                    <button className="button_load" onClick={consultarDatos}>
                        Consultar datos
                        <ImDownload2 className="icon_button_cobranza" />
                    </button>
                    <button className="button_delete" onClick={eliminarDatos}>
                        Eliminar datos
                        <AiFillDelete className="icon_button_cobranza" />
                    </button>
                    <button className="button_save" onClick={eliminarDatos}>
                        Exportar datos
                        <FaFileExport className="icon_button_cobranza" />
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(submitData)}>
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
                                // data={info}
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                active={active}
                                setActive={setActive}
                            />
                        ))}
                    </tbody>
                </table>
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
            </form>
        </div>
    );
};

export default Cobranzas;
