import axios from "axios";
import { config } from "../config";
import { toast } from "sonner";

const insertRowsCobranzas = async (data) => {
    try {
        await axios
            .post(`${config.API_URL}api/cobranzas/insert`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then(() => toast.success("Datos guardados correctamente"))
            .catch((error) => toast.error("No se pudieron guardar los datos"));
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateRowCobranzas = async (id, data) => {
    try {
        await axios
            .post(`${config.API_URL}api/cobranzas/update/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => toast.success("Actualizado correctamente"))
            .catch((error) => {
                console.log(error);
                toast.error("No se pudo actualizar");
            });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getData = async (pg) => {
    try {
        const response = await axios.get(
            `${config.API_URL}api/cobranzas/list?page=${pg}`
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const filterData = async (filtro, key, param) => {
    try {
        const params = `${key}=${param}`
        const response = await axios.post(
            `${config.API_URL}api/cobranzas/search?${params}`,
            filtro,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        toast.error("No se pudo obtener los datos");
        console.log(error);
        throw error;
    }
};

const listAll = async () => {
    try {
        const response = await axios.get(
            `${config.API_URL}api/cobranzas/listAll`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteRow = async (id) => {
    try {
        await axios.delete(`${config.API_URL}api/cobranzas/delete/${id}`);
        toast.success("Se eliminó el registro correctamente");
    } catch (error) {
        toast.error("El registro fue eliminado correctamente");
        console.log(error);
        throw error;
    }
};

export {
    insertRowsCobranzas,
    deleteRow,
    updateRowCobranzas,
    filterData,
    listAll,
    getData,
};
