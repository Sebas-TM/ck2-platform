const EmpleadoCard = ({dato,dato_info}) => {
    return(
        <div className="contenedor-datos">
            <p className="dato">{dato}</p>
            <p className="dato-info">{dato_info}</p>
        </div>
    )
}
export default EmpleadoCard