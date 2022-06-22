import React from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
const ToastMessage = ({ toastData, openLogin }) => {
    const toastId = React.useRef(null);
    switch (toastData && toastData.type) {
        case "success":
            if (toastData.type === "success") {
                if (!toast.isActive(toastId.current)) {
                    
                    toastId.current = toast.success(`${toastData.message}`);
                    return false

                }
            }
            else return false
            break;
        // return (toast.success(toastData.message))
        case "error":
            if (toastData.type === "error") {
                
                return toast.error(toastData.message)
            }
            //return null
            break;
        case "warning":
            if (toastData.type === "warning") {
                
                return toast.warn(toastData.message)
            }

            break;
        default:
            return null
    }
}

export default ToastMessage;
