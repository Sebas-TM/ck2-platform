import SpinnerIcono from "./SpinnerIcono";
import '../style/errorMessage.css'
const ErrorMessage = () => {
    return (
        <h1 className="error_message_filter">
            <SpinnerIcono />
            No hay resultados
        </h1>
    );
};

export default ErrorMessage;
