import { Dispatch } from "react";
import { toast } from "react-toastify";

import dbApi from '@/api/DbApi';

import dataContext from "./dataContext";
import { LoginInterface } from "@/interfaces/loginInterface";
import { UserResponseInterface } from "@/interfaces/userResponseInterface";

export interface AuthState {
    token: string | null
    role: string | null
    loading: boolean
    errorMessage: string | null
}

export type AuthAction =
    | {type: 'signin', payload: {token: string, role: string}}
    | {type: 'loading'}
    | {type: 'errorMessage', payload: {errorMessage: string}}


type AuthContextProps = {
    state: AuthState,
    signin: (body: LoginInterface) => void,
    errorMessage: (message: string) => void
}

const authReduce = (prevState: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'signin':
            return {
                ...prevState,
                token: action.payload.token,
                role: action.payload.role,
                errorMessage: null,
                loading: false
            }
        case 'loading':
            return {
                ...prevState,
                loading: true
            }
        case 'errorMessage':
            return {
                ...prevState,
                errorMessage: action.payload.errorMessage,
                loading: false
            }
        default:
            return prevState;
    }
}

const signin = (dispatch: Dispatch<AuthAction>) => async(body: LoginInterface) => {
    try {
        dispatch({type: 'loading'})
        const {data} = await dbApi.post<UserResponseInterface>('/user/auth', body);
        dispatch({type: 'signin', payload: {token: data.token, role: data.role}})
    } catch(error: any) {
        if (error.response.data.message) {
            toast.error(error.response.data.message.split(':')[1])
            dispatch({type: 'errorMessage', payload: {errorMessage: error.response.data.message.split(':')[1]}})
        }
    }
}

export const {Provider, Context} = dataContext<AuthContextProps>(authReduce, 
    {
        signin
    },
    {
        token: null,
        role: null,
        errorMessage: null,
        loading: false
    }
)