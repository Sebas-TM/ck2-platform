import { useState } from "react";
import "../style/cobranzas.css";
import { FiChevronDown } from "react-icons/fi";

const BodyTableCobranzas = ({ item, index, data, register, errors, setValue }) => {
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
        customer_id,
        comentario_llamada,
        observacion,
        motivo_no_pago_1,
        fecha_gestion,
        medio_pago,
        id,
    } = item;

    const [rowIsOpen, setRowIsOpen] = useState(false);
    const [borderRed, setBorderRed] = useState(false);
    const [isRotating, setIsRotating] = useState();

    const handleRowIsOpen = () => {
        setRowIsOpen(!rowIsOpen);
        setBorderRed(!borderRed);
        setIsRotating(!isRotating);
    };

    setValue("agente",agente)
    setValue("supervisor",supervisor)
    setValue("fecha",fecha)
    setValue("titular_nombres_apellidos",titular_nombres_apellidos)
    setValue("tipo_doc",tipo_doc)
    setValue("nro_documento",nro_documento)
    setValue("celular_grabacion_legal",celular_grabacion_legal)
    setValue("celular_adicional_1",celular_adicional_1)
    setValue("celular_adicional_2",celular_adicional_2)
    setValue("producto_play",producto_play)
    setValue("producto",producto)
    setValue("plan_telefono",plan_telefono)
    setValue("plan_internet",plan_internet)
    setValue("plan_cable",plan_cable)
    setValue("tipo_venta",tipo_venta)
    setValue("precio_total",precio_total)
    setValue("sot",sot)
    setValue("sec",sec)
    setValue("contrato",contrato)
    setValue("estado",estado)
    setValue("ciclo_facturacion",ciclo_facturacion)
    setValue("fecha_emision",fecha_emision)
    setValue("vencimiento_facturas",vencimiento_facturas)
    setValue("factura",factura)
    setValue("pago",pago)
    setValue("estado_pago",estado_pago)
    setValue("fecha_pago_mes_1",fecha_pago_mes_1)
    setValue("fecha_pago_mes_2",fecha_pago_mes_2)
    setValue("fecha_pago_mes_3",fecha_pago_mes_3)
    setValue("seguimiento_recibo",seguimiento_recibo)
    setValue("customer_id",customer_id)
    setValue("comentario_llamada",comentario_llamada)
    setValue("observacion",observacion)
    setValue("motivo_no_pago_1",motivo_no_pago_1)
    setValue("fecha_gestion",fecha_gestion)
    setValue("medio_pago",medio_pago)

    return (
        <>
            <tr
                className="accordion-title"
                onClick={handleRowIsOpen}
            >
                <td className={borderRed ? "border-red" : ""}>{id}</td>
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
                            isRotating ? "rotate" : ""
                        }`}
                    />
                </td>
            </tr>

            {rowIsOpen && (
                <tr className="accordion-content" >
                    <td className={borderRed ? "border-red" : ""}></td>
                    <td>
                        <div>
                            <div className="input-group">
                                <label htmlFor="agente">Agente</label>
                                <input
                                    disabled={true}
                                    type="text"
                                    id="agente"
                                    {...register("agente",{
                                        required:true
                                    })}
                                    name="agente"
                                />
                                {errors.agente?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="input-group">
                                <label htmlFor="supervisor">Supervisor</label>
                                <input
                                    disabled={true}
                                    type="text"
                                    id="supervisor"
                                    {...register("supervisor",{
                                        required:true
                                    })}
                                    name="supervisor"
                                />
                                {errors.supervisor?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="input-group">
                                <label htmlFor="fecha">Fecha</label>
                                <input
                                    disabled={true}
                                    type="text"
                                    id="fecha"
                                    name="fecha"
                                    {...register('fecha')}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="contrato">Contrato</label>
                                <input
                                    type="text"
                                    id="contrato"
                                    name="contrato"
                                    {...register('contrato')}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="estado">Estado</label>
                                <input
                                    type="text"
                                    id="estado"
                                    name="estado"
                                    {...register("estado")}
                                />
                                {errors.estado?.type === "required" && (
                                    <p className="error-message">
                                        Este campo es obligatorio
                                    </p>
                                )}
                            </div>
                            <div className="input-group">
                                <label htmlFor="ciclo_facturacion">
                                    Ciclo de facturación
                                </label>
                                <input
                                    type="text"
                                    id="ciclo_facturacion"
                                    name="ciclo_facturacion"
                                    {...register('ciclo_facturacion')}
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>
                            <div className="input-group">
                                <label htmlFor="titular_nombres_apellidos">
                                    Titular
                                </label>
                                <input
                                    disabled={true}
                                    type="text"
                                    id="titular_nombres_apellidos"
                                    name="titular_nombres_apellidos"
                                    defaultValue={titular_nombres_apellidos}
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
                                    defaultValue={tipo_doc}
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
                                    defaultValue={nro_documento}
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
                                    defaultValue={fecha_emision}
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
                                    defaultValue={vencimiento_facturas}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="factura">Factura</label>
                                <input
                                    type="text"
                                    id="factura"
                                    name="factura"
                                    defaultValue={factura}
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>
                            <div className="input-group">
                                <label htmlFor="celular_grabacion_legal">
                                    Celular de grabación legal
                                </label>
                                <input
                                    disabled={true}
                                    type="text"
                                    id="celular_grabacion_legal"
                                    name="celular_grabacion_legal"
                                    defaultValue={celular_grabacion_legal}
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
                                    defaultValue={celular_adicional_1}
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
                                    defaultValue={celular_adicional_2}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="pago">Pago</label>
                                <input
                                    type="text"
                                    id="pago"
                                    name="pago"
                                    defaultValue={pago}
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
                                    defaultValue={estado_pago}
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
                                    defaultValue={fecha_pago_mes_1}
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>
                            <div className="input-group">
                                <label htmlFor="producto_play">
                                    Producto Play
                                </label>
                                <input
                                    disabled={true}
                                    type="text"
                                    id="producto_play"
                                    name="producto_play"
                                    defaultValue={producto_play}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="producto">Producto</label>
                                <input
                                    disabled={true}
                                    type="text"
                                    id="producto"
                                    name="producto"
                                    defaultValue={producto}
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
                                    defaultValue={tipo_venta}
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
                                    defaultValue={fecha_pago_mes_2}
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
                                    defaultValue={fecha_pago_mes_3}
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
                                    defaultValue={seguimiento_recibo}
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>
                            <div className="input-group">
                                <label htmlFor="plan_telefono">
                                    Plan de teléfono
                                </label>
                                <input
                                    disabled={true}
                                    type="text"
                                    id="plan_telefono"
                                    name="plan_telefono"
                                    defaultValue={plan_telefono}
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
                                    defaultValue={plan_internet}
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
                                    defaultValue={plan_cable}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="customer_id">Customer ID</label>
                                <input
                                    type="text"
                                    id="customer_id"
                                    name="customer_id"
                                    defaultValue={customer_id}
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
                                    defaultValue={comentario_llamada}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="observacion">Observación</label>
                                <input
                                    type="text"
                                    id="observacion"
                                    name="observacion"
                                    defaultValue={observacion}
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div>
                            <div className="input-group">
                                <label htmlFor="precio_total">
                                    Precio total
                                </label>
                                <input
                                    disabled={true}
                                    type="text"
                                    id="precio_total"
                                    name="precio_total"
                                    defaultValue={precio_total}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="sot">SOT</label>
                                <input
                                    disabled={false}
                                    type="text"
                                    id="sot"
                                    name="sot"
                                    defaultValue={sot}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="sec">SEC</label>
                                <input
                                    disabled={true}
                                    type="text"
                                    id="sec"
                                    name="sec"
                                    defaultValue={sec}
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
                                    defaultValue={motivo_no_pago_1}
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
                                    defaultValue={fecha_gestion}
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
                                    defaultValue={medio_pago}
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="container_btn_cobranzas">
                            <input
                                className="btn_registrar btn_cobranzas"
                                type="submit"
                                value="Guardar"
                            />
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default BodyTableCobranzas;