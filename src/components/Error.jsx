import { toast } from "sonner";

const Error = ({ children }) => {
    toast.error(children);
    return <></>;
};

export default Error;
