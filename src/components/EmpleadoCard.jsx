const EmpleadoCard = ({ dato, dato_info }) => {
  return (
    <div className="contenedor-datos">
      <div className="contenedor-datos_texto-dato">
        <p className="dato">{dato}</p>
      </div>
      <div className="contenedor-datos_texto-dato-info">
        <p className="dato-info">{dato_info}</p>
      </div>
    </div>
  );
};
export default EmpleadoCard;
