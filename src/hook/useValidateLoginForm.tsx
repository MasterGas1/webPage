import { useRef, useState } from "react";

import { LoginInterface } from "@/interfaces/loginInterface";

export const useValidateLoginForm = ({email, password}: LoginInterface) => {
    
    let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const [state, setState] = useState({
        errorEmail: '',
        errorPassword: ''
    });

    const isValid = useRef(false);
    
    const validateInputs = () => {
        setState({
            errorEmail: email.match(validEmailRegex) ? '' : 'El correo no es valido',
            errorPassword: password.length > 7 ? '' : 'La contraseña debe ser igual o mayor a 8 caracteres'
        })

        isValid.current = email.match(validEmailRegex) && password.length > 7 ? true : false
    }

    return {
        ...state,
        isValid,
        validateInputs
    }
}