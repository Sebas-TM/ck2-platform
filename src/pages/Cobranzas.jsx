import { useForm } from "react-hook-form";
import "../style/cobranzas.css";
import { useState } from "react";
import { utils as XLSXUtils, readFile as XLSXRead } from "xlsx";
const ExcelReader = () => {
    const { handleSubmit, register } = useForm();
    const [fileName, setFileName] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
        const data = await file.arrayBuffer();
        const workbook = XLSXRead(data);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const colsJSON = XLSXUtils.sheet_to_json(worksheet, {
            header: 1,
            defVal: "",
        });
        const headers = colsJSON[0];
        const rows = colsJSON.slice(1);

        setHeaders(headers);
        setRows(rows);
    };

    return (
        <div className="contenedorCobranzas">
            <h1>Data Excel</h1>

            <input type="file" onChange={(e) => handleFile(e)} />

            <table cellSpacing="0" cellPadding="0" className="tabla tabla-cobranzas">
                <thead>
                    <tr>
                        {fileName &&
                            headers.map((h, i) => <th key={i}>{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            {r.map((fila, i) => (
                                <td key={i}>{fila}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExcelReader;
