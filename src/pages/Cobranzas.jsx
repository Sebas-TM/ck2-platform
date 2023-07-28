import { useForm } from "react-hook-form";
import "../style/cobranzas.css";
import { useState } from "react";
import { utils as XLSXUtils, readFile as XLSXRead } from "xlsx";
import DataTable from "react-data-table-component";

const Cobranzas = () => {
    const { handleSubmit, register } = useForm();
    const [fileName, setFileName] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);

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

    console.log(rows);
    console.log(headers);

    const transformData = data => {
        return data.map((item, index)=>{
            return {
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
                medio_pago: item[35]            
            }
        })
    }

    const newRows = transformData(rows)

    const columns = [
        {name: 'Agente', selector:'agente', sortable: true}
    ]

    const handleChangeCell = (e) => {
        console.log(e.target.value);
    };

    return (
        <div className="contenedorCobranzas">
            {/* <h1>Data Excel</h1>

            <input type="file" onChange={(e) => handleFile(e)} />

            <table cellSpacing="0" cellPadding="0" className="">
                <thead>
                    <tr>
                        {fileName &&
                            headers.map((h, i) => <th key={i}>{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {newRows.map((r, i) => (
                        <tr key={i}>
                            <td>{r.agente}</td>
                            <td>{r.supervisor}</td>
                            <td>{r.fecha}</td>
                            <td>{r.titular_nombres_apellidos}</td>
                            <td>{r.tipo_doc}</td>
                            <td>{r.nro_documento}</td>
                            <td>{r.celular_grabacion_legal}</td>
                            <td>{r.celular_adicional_1}</td>
                            <td>{r.celular_adicional_2}</td>
                            <td>{r.producto_play}</td>
                            <td>{r.producto}</td>
                            <td>{r.plan_telefono}</td>
                            <td>{r.plan_internet}</td>
                            <td>{r.plan_cable}</td>
                            <td>{r.tipo_venta}</td>
                            <td>{r.precio_total}</td>
                            <td>{r.sot}</td>
                            <td>{r.sec}</td>
                            <td>{r.contrato}</td>
                            <td>{r.estado}</td>
                            <td>{r.ciclo_facturacion}</td>
                            <td>{r.fecha_emision}</td>
                            <td>{r.vencimiento_facturas}</td>
                            <td>{r.factura}</td>
                            <td>{r.pago}</td>
                            <td>{r.estado_pago}</td>
                            <td>{r.fecha_pago_mes_1}</td>
                            <td>{r.fecha_pago_mes_2}</td>
                            <td>{r.fecha_pago_mes_3}</td>
                            <td>{r.seguimiento_recibo}</td>
                            <td>{r.customer_id}</td>
                            <td>{r.comentario_llamada}</td>
                            <td>{r.supervisor}</td>
                            <td>{r.observacion}</td>
                            <td>{r.motivo_no_pago_1}</td>
                            <td>{r.fecha_gestion}</td>
                            <td>{r.medio_pago}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default Cobranzas;
