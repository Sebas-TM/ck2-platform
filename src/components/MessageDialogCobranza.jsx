import "../style/MessageDialogCobranza.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
const MessageDialogCobranza = ({
    messageDialogIsOpen,
    setMessageDialogIsOpen,
    celular,
    dataToSendToCustomer,
}) => {
    const [fields, setFields] = useState({
        cliente: dataToSendToCustomer.cliente,
        monto: dataToSendToCustomer.pago,
        customerId: dataToSendToCustomer.customer_id,
        fecha_venc: dataToSendToCustomer.fecha_vencimiento,
    });
    const [message, setMessage] = useState("");

    const getMessage = () => {
        const parrafo = document.querySelector(".message");
        if (parrafo) {
            const texto = parrafo.textContent;
            setMessage(texto);
        }
    };

    const celularFormated = celular.replace(/\s+/g, "");

    useEffect(() => {
        getMessage();
    }, [fields]);


    return (
        <div className="messageDialog">
            <div className="messageDialogCobranza_container">
                <div className="subcontainer_1">
                    <div className="input_group">
                        <label htmlFor="cliente">
                            Nombre de cliente:
                            <input
                                id="cliente"
                                type="text"
                                onChange={(e) => {
                                    setFields({
                                        ...fields,
                                        cliente: e.target.value,
                                    });
                                }}
                                defaultValue={dataToSendToCustomer.cliente} 
                            />
                        </label>
                        <label htmlFor="monto">
                            Monto a pagar:
                            <input
                                id="monto"
                                type="text"
                                onChange={(e) =>
                                    setFields({
                                        ...fields,
                                        monto: e.target.value,
                                    })
                                }
                                defaultValue={dataToSendToCustomer.pago}        
                            />
                        </label>
                        <label htmlFor="customer_Id">
                            Customer ID:
                            <input
                                id="customer_Id"
                                type="text"
                                onChange={(e) =>
                                    setFields({
                                        ...fields,
                                        customerId: e.target.value,
                                    })
                                }
                                defaultValue={dataToSendToCustomer.customer_id}
                            />
                        </label>
                        <label htmlFor="fecha_venc">
                            Fecha de vencimiento:
                            <input
                                id="fecha_venc"
                                type="text"
                                onChange={(e) =>
                                    setFields({
                                        ...fields,
                                        fecha_venc: e.target.value,
                                    })
                                }
                                defaultValue={
                                    dataToSendToCustomer.fecha_vencimiento
                                }
                            />
                        </label>
                    </div>
                    <div className="button_group">
                        <Link
                            target="blank"
                            to={`https://wa.me/51${celularFormated}?text=${message}`}
                            className="send"
                        >
                            <BsWhatsapp />
                            Enviar
                        </Link>
                        <button
                            className="cancel"
                            onClick={() => setMessageDialogIsOpen(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
                <div className="subcontainer_2">
                    <p className="message">
                        ¡Hola <span>{fields.cliente}</span>! Recuerda que tienes
                        una factura vencida por falta pago de tu Servicio Hogar
                        Claro, tu monto es de S/ <span>{fields.monto}</span>{" "}
                        soles, puedes realizar tu pago en agentes y desde la
                        Web/App de tu banco con tu código de pago H
                        <span>{fields.customerId}</span>.<br></br> Verifique sus
                        datos antes de realizar su pago. Tu fecha de vencimiento
                        fue el <span>{fields.fecha_venc}</span>, cancela tu
                        recibo y evita pagos de reconexión u morosidad.<br></br>{" "}
                        Descarga
                        https://play.google.com/store/apps/details?id=com.claro.pe.miclaro
                        y entérate de todos tus consumos y beneficios.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessageDialogCobranza;
