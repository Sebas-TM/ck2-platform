import '../style/moduloCard.css'

const ModuloCard = ({imagen, texto}) => {
  return (
    <div className='card'>
      <img src={imagen} alt="imagen_area" />
      <div className='card-group'>
        <p className='card-texto'>{`Área de ${texto}`}</p>
      </div>
    </div>
  )
}

export default ModuloCard