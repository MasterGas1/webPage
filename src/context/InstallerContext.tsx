import { Dispatch } from "react";

import dbApi from '@/api/DbApi';

import dataContext from "./dataContext";

import { installerResponseInterface } from "@/interfaces/installerInterface";

export interface InstallerState {
    installersApproved: installerResponseInterface[],
    installersPending: installerResponseInterface[],
    loading: boolean
    errorMessage: string | null
}

export type InstallerAction = 
    | { type: 'getInstallersApproved', payload: { installers: installerResponseInterface[] } }
    | { type: 'getInstallersPending', payload: { installers: installerResponseInterface[] } }
    | { type: 'loading' }
    | { type: 'errorMessage', payload: { errorMessage: string } }

type InstallerContextProps = {
    state: InstallerState
    getInstallers: (status: string) => void
}

const installerReduce = (prevState: InstallerState, action: InstallerAction): InstallerState => {
    switch (action.type) {
        case 'getInstallersApproved':
            return {
                ...prevState,
                installersApproved: action.payload.installers,
                errorMessage: null,
                loading: false
            }
        case 'getInstallersPending':
            return {
                ...prevState,
                installersPending: action.payload.installers,
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
            return prevState
    }
}

const getInstallers = (dispatch: Dispatch<InstallerAction>) => async (status: string) => {
    try {
        dispatch({ type: 'loading' })
    
        const { data } = await dbApi.get<installerResponseInterface[]>(
            '/installer',
            {
                params: {
                    status
                }
            }
        )
        if (status === 'approved') {
            dispatch({ type: 'getInstallersApproved', payload: { installers: data } })
        } else if (status === 'pending') {
            dispatch({ type: 'getInstallersPending', payload: { installers: data } })
        }
    } catch (error: any) {
        if (error.response.data.message) {}
    }
}

export const {Provider, Context} = dataContext<InstallerContextProps>(
    installerReduce,
    {
        getInstallers
    },
    {
        installersApproved: [],
        installersPending: [],
        loading: false,
        errorMessage: null
    }
)