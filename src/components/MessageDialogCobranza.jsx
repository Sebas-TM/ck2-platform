import "../style/MessageDialogCobranza.css";
import { useEffect, useState } from "react";
const MessageDialogCobranza = () => {
    const [nombre, setNombre] = useState("_____________");
    const [monto, setMonto] = useState("_____________");
    const [customerId, setCustomerId] = useState("_____________");
    const [fecha_venc, setFecha_venc] = useState("_____________");
    const [message, setMessage] = useState(
        `¡Hola ${nombre}! Recuerda que tienes una factura vencida por falta pago de tu Servicio Hogar Claro, tu monto es de S/ ${monto} soles, puedes realizar tu pago en agentes y desde la Web/App de tu banco con tu código de pago H${customerId}. Verifique sus datos antes de realizar su pago. Tu fecha de vencimiento fue el ${fecha_venc}, cancela tu recibo y evita pagos de reconexión u morosidad. Descarga https://play.google.com/store/apps/details?id=com.claro.pe.miclaro y entérate de todos tus consumos y beneficios.`
    );
    console.log(nombre);

    useEffect(() => {
        setMessage(
            `¡Hola ${nombre}! Recuerda que tienes una factura vencida por falta pago de tu Servicio Hogar Claro, tu monto es de S/ ${monto} soles, puedes realizar tu pago en agentes y desde la Web/App de tu banco con tu código de pago H${customerId}. Verifique sus datos antes de realizar su pago. Tu fecha de vencimiento fue el ${fecha_venc}, cancela tu recibo y evita pagos de reconexión u morosidad. Descarga https://play.google.com/store/apps/details?id=com.claro.pe.miclaro y entérate de todos tus consumos y beneficios.`
        );
    }, [nombre || monto || customerId || fecha_venc]);
    return (
        <div className="messageDialog">
            <div className="messageDialogCobranza_container">
                <div className="subcontainer_1">
                    <div className="input_group">
                        <label htmlFor="nombre">
                            Nombre de cliente:
                            <input
                                id="nombre"
                                type="text"
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </label>
                        <label htmlFor="precio">
                            Monto a pagar:
                            <input
                                id="precio"
                                type="text"
                                onChange={(e) => setMonto(e.target.value)}
                            />
                        </label>
                        <label htmlFor="customerId">
                            Customer ID:
                            <input
                                id="customerId"
                                type="text"
                                onChange={(e) => setCustomerId(e.target.value)}
                            />
                        </label>
                        <label htmlFor="fecha_venc">
                            Fecha de vencimiento:
                            <input
                                id="fecha_venc"
                                type="text"
                                onChange={(e) => setFecha_venc(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="button_group">
                        <button className="send">Enviar</button>
                        <button className="cancel">Cancelar</button>
                    </div>
                </div>
                <div className="subcontainer_2">
                    <p className="message">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default MessageDialogCobranza;
