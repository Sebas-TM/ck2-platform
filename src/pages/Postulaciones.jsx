import {useState} from 'react'
import axios from 'axios'

const Postulaciones = () => {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleImagenChange = (event) => {
        setImagen(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            'nombre': nombre,
            'imagen': imagen
        }
        console.log(formData);
        console.log(nombre);
        console.log(imagen);
        try {
        await axios.post('http://127.0.0.1:8000/api/addImage', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Usuario registrado correctamente');
        // Realiza las acciones necesarias después de registrar al usuario correctamente

        } catch (error) {
        console.log('Error al registrar al usuario', error);
        // Maneja el error de registro de usuario
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={handleNombreChange} />
            </div>
            <div>
                <label>Imagen:</label>
                <input type="file" onChange={handleImagenChange} />
            </div>
            <button type="submit">Registrar</button>
        </form>
    )
}

export default Postulaciones