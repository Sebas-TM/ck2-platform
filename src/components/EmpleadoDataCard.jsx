import '../style/empleadoDataCard.css'

const EmpleadoDataCard = ({icono, dato, descripcion}) =>{
    return(
        <div className="empleado-data-card">
            <div className="empleado-data-card_grafico">{icono}</div>
            <p className="empleado-data-card_dato">{dato}</p>
            <div className="empleado-data-card_descripcion">
                <p>{descripcion}</p>
            </div>
        </div>
    )
}

export default EmpleadoDataCard