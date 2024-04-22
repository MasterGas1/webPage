import { useState } from "react";

export const useForm = <T extends object>(initialState: T) => {

    const [state, setState] = useState(initialState);

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return {
        ...state,
        form: state,
        onChange
    }
}