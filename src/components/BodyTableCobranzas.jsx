import { useState } from "react";
import "../style/cobranzas.css";
import { FiChevronDown } from "react-icons/fi";
import { config } from "../config";
import axios from "axios";
import { Toaster, toast } from "sonner";
import SpinnerIcono from "./SpinnerIcono";
import { useForm } from "react-hook-form";
const BodyTableCobranzas = ({
    item,
    index,
    data,
    active,
    setActive,
    consultarDatos,
    page,
    filterByDateFunction,
    filterDate,
}) => {
    const {
        agente,
        supervisor,
        fecha,
        titular_nombres_apellidos,
        tipo_doc,
        nro_documento,
        celular_grabacion_legal,
        celular_adicional_1,
        celular_adicional_2,
        producto_play,
        producto,
        plan_telefono,
        plan_internet,
        plan_cable,
        tipo_venta,
        precio_total,
        sot,
        sec,
        contrato,
        estado,
        ciclo_facturacion,
        fecha_emision,
        vencimiento_facturas,
        factura,
        pago,
        estado_pago,
        fecha_pago_mes_1,
        fecha_pago_mes_2,
        fecha_pago_mes_3,
        seguimiento_recibo,
        customerId,
        comentario_llamada,
        observacion,
        motivo_no_pago_1,
        fecha_gestion,
        medio_pago,
        id,
    } = item;
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [cargandoUpdateRow, setCargandoUpdateRow] = useState(false);
    const handleRowIsOpen = (id) => {
        setActive(id === active ? 0 : id);

        setValue("agente", agente);
        setValue("supervisor", supervisor);
        setValue("fecha", fecha);
        setValue("titular_nombres_apellidos", titular_nombres_apellidos);
        setValue("tipo_doc", tipo_doc);
        setValue("nro_documento", nro_documento);
        setValue("celular_grabacion_legal", celular_grabacion_legal);
        setValue("celular_adicional_1", celular_adicional_1);
        setValue("celular_adicional_2", celular_adicional_2);
        setValue("producto_play", producto_play);
        setValue("producto", producto);
        setValue("plan_telefono", plan_telefono);
        setValue("plan_internet", plan_internet);
        setValue("plan_cable", plan_cable);
        setValue("tipo_venta", tipo_venta);
        setValue("precio_total", precio_total);
        setValue("sot", sot);
        setValue("sec", sec);
        setValue("contrato", contrato);
        setValue("estado", estado);
        setValue("ciclo_facturacion", ciclo_facturacion);
        setValue("fecha_emision", fecha_emision);
        setValue("vencimiento_facturas", vencimiento_facturas);
        setValue("factura", factura);
        setValue("pago", pago);
        setValue("estado_pago", estado_pago);
        setValue("fecha_pago_mes_1", fecha_pago_mes_1);
        setValue("fecha_pago_mes_2", fecha_pago_mes_2);
        setValue("fecha_pago_mes_3", fecha_pago_mes_3);
        setValue("seguimiento_recibo", seguimiento_recibo);
        setValue("customerId", customerId);
        setValue("comentario_llamada", comentario_llamada);
        setValue("observacion", observacion);
        setValue("motivo_no_pago_1", motivo_no_pago_1);
        setValue("fecha_gestion", fecha_gestion);
        setValue("medio_pago", medio_pago);
    };

    const listRow = async (id) => {
        const res = await axios.get(
            `${config.API_URL}api/cobranzas/list/${id}`
        );
        const { data } = res;
    };

    const submitData = async (info) => {
        setCargandoUpdateRow(true);
        if (id) {
            await axios
                .post(`${config.API_URL}api/cobranzas/update/${id}`, info, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .catch((e) => console.log(e));

            if (filterDate) {
                filterByDateFunction(filterDate, page);
            } else {
                consultarDatos(page);
            }
        } else {
            console.log("No se puede actualizar");
        }
        setCargandoUpdateRow(false);
    };

    return (
        <>
            <tr className="accordion-title" onClick={() => handleRowIsOpen(id)}>
                <td className={active === id ? "border-red" : ""}>{id}</td>
                <td align="start">{agente}</td>
                <td align="start">{titular_nombres_apellidos}</td>
                <td align="start">
                    <p className="accordion-title-nro_documento">
                        {nro_documento}
                    </p>
                    <p className="accordion-title-tipo_documento">{tipo_doc}</p>
                </td>
                <td>{celular_grabacion_legal}</td>
                <td>
                    <p
                        className={
                            estado === "ACTIVO"
                                ? "cobranza_estado_activo estado"
                                : estado === "SUSPENDIDO"
                                ? "cobranza_estado_suspendido estado"
                                : estado === "DE BAJA"
                                ? "cobranza_estado_de_baja estado"
                                : "estado"
                        }
                    >
                        {estado ? estado : "No revisado"}
                    </p>
                </td>
                <td>{sec}</td>
                <td>
                    <FiChevronDown
                        className={`icon_flecha_cobranzas ${
                            active === id ? "rotate" : ""
                        }`}
                    />
                </td>
            </tr>

            <tr
                className={`accordion-content ${
                    active === id ? "show_tr " : ""
                }`}
            >
                <td colSpan={8}>
                    <form
                        onSubmit={handleSubmit(submitData)}
                        className={`formInputCobranza ${
                            active === id ? "border-red" : ""
                        }`}
                    >
                        <div className={active === id ? "border-red" : ""}>
                            <div
                                className={`subcontenedor_td ${
                                    active === id ? "show" : ""
                                }`}
                            ></div>
                        </div>
                        <div>
                            <div
                                className={`subcontenedor_td ${
                                    active === id ? "show" : ""
                                }`}
                            >
                                <div className="input-group">
                                    <Toaster
                                        position="top-center"
                                        richColors
                                        style={{ textTransform: "none" }}
                                    />

                                    <label htmlFor="agente">Agente</label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="agente"
                                        {...register("agente")}
                                        name="agente"
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="supervisor">
                                        Supervisor
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="supervisor"
                                        {...register("supervisor")}
                                        name="supervisor"
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="fecha">Fecha</label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="fecha"
                                        name="fecha"
                                        {...register("fecha")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="contrato">Contrato</label>
                                    <input
                                        type="text"
                                        id="contrato"
                                        name="contrato"
                                        {...register("contrato")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="estado">Estado</label>
                                    <select
                                        id="estado"
                                        name="estado"
                                        {...register("estado")}
                                    >
                                        <option value="">--Seleccione--</option>
                                        <option value="ACTIVO">ACTIVO</option>
                                        <option value="SUSPENDIDO">
                                            SUSPENDIDO
                                        </option>
                                        <option value="DE BAJA">DE BAJA</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="ciclo_facturacion">
                                        Ciclo de facturación
                                    </label>
                                    <input
                                        type="text"
                                        id="ciclo_facturacion"
                                        name="ciclo_facturacion"
                                        {...register("ciclo_facturacion")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className={`subcontenedor_td ${
                                    active === id ? "show" : ""
                                }`}
                            >
                                <div className="input-group">
                                    <label htmlFor="titular_nombres_apellidos">
                                        Titular
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="titular_nombres_apellidos"
                                        name="titular_nombres_apellidos"
                                        {...register(
                                            "titular_nombres_apellidos"
                                        )}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="tipo_doc">
                                        Tipo de documento
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="tipo_doc"
                                        name="tipo_doc"
                                        {...register("tipo_doc")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="nro_documento">
                                        Número de documento
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="nro_documento"
                                        name="nro_documento"
                                        {...register("nro_documento")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="fecha_emision">
                                        Fecha de emisión
                                    </label>
                                    <input
                                        type="text"
                                        id="fecha_emision"
                                        name="fecha_emision"
                                        {...register("fecha_emision")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="vencimiento_facturas">
                                        Vencimiento de facturas
                                    </label>
                                    <input
                                        type="text"
                                        id="vencimiento_facturas"
                                        name="vencimiento_facturas"
                                        {...register("vencimiento_facturas")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="factura">Factura</label>
                                    <input
                                        type="text"
                                        id="factura"
                                        name="factura"
                                        {...register("factura")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className={`subcontenedor_td ${
                                    active === id ? "show" : ""
                                }`}
                            >
                                <div className="input-group">
                                    <label htmlFor="celular_grabacion_legal">
                                        Celular de grabación legal
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="celular_grabacion_legal"
                                        name="celular_grabacion_legal"
                                        {...register("celular_grabacion_legal")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="celular_adicional_1">
                                        Celular adicional 1
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="celular_adicional_1"
                                        name="celular_adicional_1"
                                        {...register("celular_adicional_1")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="celular_adicional_2">
                                        Celular adicional 2
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="celular_adicional_2"
                                        name="celular_adicional_2"
                                        {...register("celular_adicional_2")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="pago">Pago</label>
                                    <input
                                        type="text"
                                        id="pago"
                                        name="pago"
                                        {...register("pago")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="estado_pago">
                                        Estado de pago
                                    </label>
                                    <input
                                        type="text"
                                        id="estado_pago"
                                        name="estado_pago"
                                        {...register("estado_pago")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="fecha_pago_mes_1">
                                        Fecha de pago mes 1
                                    </label>
                                    <input
                                        type="text"
                                        id="fecha_pago_mes_1"
                                        name="fecha_pago_mes_1"
                                        {...register("fecha_pago_mes_1")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className={`subcontenedor_td ${
                                    active === id ? "show" : ""
                                }`}
                            >
                                <div className="input-group">
                                    <label htmlFor="producto_play">
                                        Producto Play
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="producto_play"
                                        name="producto_play"
                                        {...register("producto_play")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="producto">Producto</label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="producto"
                                        name="producto"
                                        {...register("producto")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="tipo_venta">
                                        Tipo de venta
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="tipo_venta"
                                        name="tipo_venta"
                                        {...register("tipo_venta")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="fecha_pago_mes_2">
                                        Fecha de pago mes 2
                                    </label>
                                    <input
                                        type="text"
                                        id="fecha_pago_mes_2"
                                        name="fecha_pago_mes_2"
                                        {...register("fecha_pago_mes_2")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="fecha_pago_mes_3">
                                        Fecha de pago mes 3
                                    </label>
                                    <input
                                        type="text"
                                        id="fecha_pago_mes_3"
                                        name="fecha_pago_mes_3"
                                        {...register("fecha_pago_mes_3")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="seguimiento_recibo">
                                        Seguimiento de recibo
                                    </label>
                                    <input
                                        type="text"
                                        id="seguimiento_recibo"
                                        name="seguimiento_recibo"
                                        {...register("seguimiento_recibo")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className={`subcontenedor_td ${
                                    active === id ? "show" : ""
                                }`}
                            >
                                <div className="input-group">
                                    <label htmlFor="plan_telefono">
                                        Plan de teléfono
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="plan_telefono"
                                        name="plan_telefono"
                                        {...register("plan_telefono")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="plan_internet">
                                        Plan de internet
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="plan_internet"
                                        name="plan_internet"
                                        {...register("plan_internet")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="plan_cable">
                                        Plan de cable
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="plan_cable"
                                        name="plan_cable"
                                        {...register("plan_cable")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="customerId">
                                        Customer ID
                                    </label>
                                    <input
                                        type="text"
                                        id="customerId"
                                        name="customerId"
                                        {...register("customerId")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="comentario_llamada">
                                        Comentario de la llamada
                                    </label>
                                    <input
                                        type="text"
                                        id="comentario_llamada"
                                        name="comentario_llamada"
                                        {...register("comentario_llamada")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="observacion">
                                        Observación
                                    </label>
                                    <input
                                        type="text"
                                        id="observacion"
                                        name="observacion"
                                        {...register("observacion")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className={`subcontenedor_td ${
                                    active === id ? "show" : ""
                                }`}
                            >
                                <div className="input-group">
                                    <label htmlFor="precio_total">
                                        Precio total
                                    </label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="precio_total"
                                        name="precio_total"
                                        {...register("precio_total")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="sot">SOT</label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="sot"
                                        name="sot"
                                        {...register("sot")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="sec">SEC</label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        id="sec"
                                        name="sec"
                                        {...register("sec")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="motivo_no_pago_1">
                                        Motivo de no pago 1
                                    </label>
                                    <input
                                        type="text"
                                        id="motivo_no_pago_1"
                                        name="motivo_no_pago_1"
                                        {...register("motivo_no_pago_1")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="fecha_gestion">
                                        Fecha de gestión
                                    </label>
                                    <input
                                        type="text"
                                        id="fecha_gestion"
                                        name="fecha_gestion"
                                        {...register("fecha_gestion")}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="medio_pago">
                                        Medio de pago
                                    </label>
                                    <input
                                        type="text"
                                        id="medio_pago"
                                        name="medio_pago"
                                        {...register("medio_pago")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className={` subcontenedor_td ${
                                    active === id ? "show" : ""
                                }`}
                            >
                                <button className=" btn_cobranzas">
                                    {cargandoUpdateRow ? (
                                        <SpinnerIcono />
                                    ) : (
                                        "Guardar"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
        </>
    );
};

export default BodyTableCobranzas;
