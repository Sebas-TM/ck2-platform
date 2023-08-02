import "../style/cobranzas.css";
import { useState } from "react";
import { utils as XLSXUtils, readFile as XLSXRead } from "xlsx";
import BodyTableCobranzas from "../components/bodyTableCobranzas";
import { useForm } from "react-hook-form";

const Cobranzas = () => {
    const [fileName, setFileName] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();

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

        setHeaders(headers);
        setRows(rows);
    };

    const transformData = (data) => {
        return data.map((item, index) => {
            return {
                id: index + 1,
                agente: item[0],
                supervisor: item[1],
                fecha: item[2],
                titular_nombres_apellidos: item[3],
                tipo_doc: item[4],
                nro_documento: item[5],
                celular_grabacion_legal: item[6],
                celular_adicional_1: item[7],
                celular_adicional_2: item[8],
                producto_play: item[9],
                producto: item[10],
                plan_telefono: item[11],
                plan_internet: item[12],
                plan_cable: item[13],
                tipo_venta: item[14],
                precio_total: item[15],
                sot: item[16],
                sec: item[17],
                contrato: item[18],
                estado: item[19],
                ciclo_facturacion: item[20],
                fecha_emision: item[21],
                vencimiento_facturas: item[22],
                factura: item[23],
                pago: item[24],
                estado_pago: item[25],
                fecha_pago_mes_1: item[26],
                fecha_pago_mes_2: item[27],
                fecha_pago_mes_3: item[28],
                seguimiento_recibo: item[29],
                customer_id: item[30],
                comentario_llamada: item[31],
                observacion: item[32],
                motivo_no_pago_1: item[33],
                fecha_gestion: item[34],
                medio_pago: item[35],
            };
        });
    };

    const newRows = transformData(rows);
    const [data, setData] = useState(newRows);
    const columns = [
        {
            name: "id",
            selector: (row) => row.id,
            sortable: true,
        },
        { name: "agente", selector: (row) => row.agente, sortable: true },
        {
            name: "supervisor",
            selector: (row) => row.supervisor,
            sortable: true,
        },
        { name: "fecha", selector: (row) => row.fecha, sortable: true },
        {
            name: "titular_nombres_apellidos",
            label: "TITULAR - NOMBRES Y APELLIDOS",
            selector: (row) => row.titular_nombres_apellidos,
            sortable: true,
        },
        {
            name: "tipo_doc",
            label: "Tipo DOC",
            selector: (row) => row.tipo_doc,
            sortable: true,
            editable: true,
        },
        {
            name: "nro_documento",
            label: "Nro. Documentos",
            selector: (row) => row.nro_documento,
            sortable: true,
        },
        {
            name: "celular_grabacion_legal",
            label: "CELULAR GRABACION LEGAL",
            selector: (row) => row.celular_grabacion_legal,
            sortable: true,
        },
        {
            name: "celular_adicional_1",
            label: "CELULAR ADICIONAL 1",
            selector: (row) => row.celular_adicional_1,
            sortable: true,
        },
        {
            name: "celular_adicional_2",
            label: "CELULAR ADICIONAL 2",
            selector: (row) => row.celular_adicional_2,
            sortable: true,
        },
        {
            name: "producto_play",
            label: "PRODUCTO (PLAY)",
            selector: (row) => row.producto_play,
            sortable: true,
        },
        {
            name: "producto",
            label: "PRODUCTO",
            selector: (row) => row.producto,
            sortable: true,
        },
        {
            name: "plan_telefono",
            label: "PLAN TELEFONO",
            selector: (row) => row.plan_telefono,
            sortable: true,
        },
        {
            name: "plan_internet",
            label: "PLAN INTERNET",
            selector: (row) => row.plan_internet,
            sortable: true,
        },
        {
            name: "plan_cable",
            label: "PLAN CABLE",
            selector: (row) => row.plan_cable,
            sortable: true,
        },
        {
            name: "tipo_venta",
            label: "TIPO DE VENTA",
            selector: (row) => row.tipo_venta,
            sortable: true,
        },
        {
            name: "precio_total",
            label: "PRECIO TOTAL",
            selector: (row) => row.precio_total,
            sortable: true,
        },
        {
            name: "sot",
            label: "SOT",
            selector: (row) => row.sot,
            sortable: true,
        },
        {
            name: "sec",
            label: "SEC",
            selector: (row) => row.sec,
            sortable: true,
        },
        {
            name: "contrato",
            label: "CONTRATO",
            selector: (row) => row.contrato,
            sortable: true,
        },
        {
            name: "estado",
            label: "ESTADO",
            selector: (row) => row.estado,
            sortable: true,
        },
        {
            name: "ciclo_facturacion",
            label: "CICLO FACTURACION",
            selector: (row) => row.ciclo_facturacion,
            sortable: true,
        },
        {
            name: "fecha_emision",
            label: "FECHA DE EMISION",
            selector: (row) => row.fecha_emision,
            sortable: true,
        },
        {
            name: "vencimiento_facturas",
            label: "VENCIMIENTO DE FACTURAS",
            selector: (row) => row.vencimiento_facturas,
            sortable: true,
        },
        {
            name: "factura",
            label: "FACTURA",
            selector: (row) => row.factura,
            sortable: true,
        },
        {
            name: "pago",
            label: "PAGO S/",
            selector: (row) => row.pago,
            sortable: true,
        },
        {
            name: "estado_pago",
            label: "ESTADO DE PAGO",
            selector: (row) => row.estado_pago,
            sortable: true,
        },
        {
            name: "fecha_pago_mes_1",
            label: "FECHA DE PAGO MES 1",
            selector: (row) => row.fecha_pago_mes_1,
            sortable: true,
        },
        {
            name: "fecha_pago_mes_2",
            label: "FECHA DE PAGO MES 2",
            selector: (row) => row.fecha_pago_mes_2,
            sortable: true,
        },
        {
            name: "fecha_pago_mes_3",
            label: "FECHA DE PAGO MES 3",
            selector: (row) => row.fecha_pago_mes_3,
            sortable: true,
        },
        {
            name: "seguimiento_recibo",
            label: "SEGUIMIENTO DE RECIBO",
            selector: (row) => row.seguimiento_recibo,
            sortable: true,
        },
        {
            name: "customer_id",
            label: "COSTUMER ID",
            selector: (row) => row.customer_id,
            sortable: true,
        },
        {
            name: "comentario_llamada",
            label: "COMENTARIO DE LLAMADA",
            selector: (row) => row.comentario_llamada,
            sortable: true,
        },
        {
            name: "observacion",
            label: "OBSERVACION",
            selector: (row) => row.observacion,
            sortable: true,
        },
        {
            name: "motivo_no_pago_1",
            label: "MOTIVO DE NO PAGO 1",
            selector: (row) => row.motivo_no_pago_1,
            sortable: true,
        },
        {
            name: "fecha_gestion",
            label: "FECHA DE GESTION",
            selector: (row) => row.fecha_gestion,
            sortable: true,
        },
        {
            name: "medio_pago",
            label: "MEDIO DE PAGO",
            selector: (row) => row.medio_pago,
            sortable: true,
        },
    ];

    const guardarDatos = () => {
        if (newRows.length > 0) {
            console.log(newRows);
        } else {
            console.log("No hay datos para cargar");
        }
    };

    const submitData = (data) => {
        console.log(data);
    };

    return (
        <div className="contenedorCobranzas">
            <h1>Data Excel</h1>

            <input type="file" onChange={(e) => handleFile(e)} />

            <form onSubmit={handleSubmit(submitData)}>
                <table
                    cellSpacing="0"
                    cellPadding="0"
                    className="tabla tabla-cobranzas"
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
                        {newRows.map((item, i) => (
                            <BodyTableCobranzas
                                item={item}
                                index={i}
                                key={i}
                                data={data}
                                register={register}
                                errors={errors}
                                setValue={setValue}
                            />
                        ))}
                    </tbody>
                </table>
            </form>
            <button onClick={guardarDatos}>Cargar datos</button>
        </div>
    );
};

export default Cobranzas;
