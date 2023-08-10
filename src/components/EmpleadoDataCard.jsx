import "../style/empleadoDataCard.css";

const EmpleadoDataCard = ({ icono, dato, descripcion }) => {
    return (
        <div className="empleado-data-card">
            <p>{descripcion}</p>

            <div className="empleado-data-card_descripcion">
                <p className="empleado-data-card_dato">{dato}</p>
                <div className="empleado-data-card_grafico">{icono}</div>
            </div>
        </div>
    );
};

export default EmpleadoDataCard;
