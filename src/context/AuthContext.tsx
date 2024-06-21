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
    | {type: 'signout'}
    | {type: 'getToken', payload: {token: string}}
    | {type: 'loading'}
    | {type: 'errorMessage', payload: {errorMessage: string}}


type AuthContextProps = {
    state: AuthState,
    signin: (body: LoginInterface) => void,
    signout: () => void,
    getToken: () => void
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
        case 'signout':
            return {
                token: null,
                role: null,
                errorMessage: null,
                loading: false
            }
        case 'getToken':
            return {
                ...prevState,
                token: action.payload.token
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
        const {data} = await dbApi.post<UserResponseInterface>('/auth', body);
        localStorage.setItem('mg-23-token', data.token)
        dispatch({type: 'signin', payload: {token: data.token, role: data.role}})
    } catch(error: any) {
        if (error.response.data.message) {
            toast.error(error.response.data.message)
            dispatch({type: 'errorMessage', payload: {errorMessage: error.response.data.message}})
        }
    }
}

const signout = (dispatch: Dispatch<AuthAction>) => async() => {

    localStorage.removeItem('mg-23-token')
    dispatch({type: 'signout'})
}

const getToken = (dispaych: Dispatch<AuthAction>) => async() => {

    const token = localStorage.getItem('mg-23-token')

    if (token) {
        dispaych({type: 'getToken', payload: {token}})
    }
}

export const {Provider, Context} = dataContext<AuthContextProps>(authReduce, 
    {
        signin,
        signout,
        getToken
    },
    {
        token: null,
        role: null,
        errorMessage: null,
        loading: false
    }
)