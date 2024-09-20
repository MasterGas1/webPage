import { Dispatch } from "react";
import { toast } from "react-toastify";

import dbApi from "@/api/DbApi";
import { LinkListServicesInterface, ServiceInterface, ServicesInterface } from "@/interfaces/servicesInterface";
import dataContext from "./dataContext";

export interface ServiceState {
    services: ServicesInterface[]
    service : ServiceInterface | null
    servicesLink: LinkListServicesInterface[]
    loading: boolean
    errorMessage: string | null
}

export type ServicesActions =
    | { type: "getServices", payload: { services: ServicesInterface[] } }
    | { type: "getOneService", payload: { service: ServiceInterface } }
    | { type: "getOneServiceLink", payload: { service: ServiceInterface } }
    | { type: 'loading' }
    | { type: 'errorMessage', payload: { errorMessage: string } }

    type ServicesContextProps = {
        state: ServiceState,
        getServices: () => void,
        getOneService: (id: string) => void
        getOneServiceLink: (id: string) => void
        createService: (body: ServicesInterface) => void
        errorMessage: (message: string) => void
    }

const serviceReduce = (prevState: ServiceState, action: ServicesActions): ServiceState => {
    switch (action.type) {
        case 'getServices':
            return {
                ...prevState,
                services: action.payload.services,
                service: null,
                servicesLink: [],
                errorMessage: null,
                loading: false
            }
        case 'getOneService':
        
            let servicesLink = prevState.servicesLink

            servicesLink = servicesLink.concat({id: prevState.service?._id, name: prevState.service?.name})
            
            return {
                ...prevState,
                service: action.payload.service,
                services: action.payload.service.subservicesId,
                servicesLink: 
                    prevState.servicesLink.length === 0 
                    ? [{id: "", name: 'Servicios principales'}] 
                    : servicesLink
                ,
                errorMessage: null,
                loading: false
            }
        case 'getOneServiceLink':

            let serviceSpliced = prevState.servicesLink.splice(prevState.servicesLink.findIndex(({id}) => id === action.payload.service._id))

            return {
                ...prevState,
                service: action.payload.service,
                services: action.payload.service.subservicesId,
                servicesLink: serviceSpliced,
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

const getServices = (dispatch: Dispatch<ServicesActions>) => async () => {
    try {
        dispatch({ type: 'loading' })
        const { data } = await dbApi.get<ServicesInterface[]>('/service/rootServices');
        dispatch({ type: 'getServices', payload: { services: data } })
    } catch (error: any) {
        if (error.response.data.message) {
            toast.error(error.response.data.message.split(':')[1])
            dispatch({ type: 'errorMessage', payload: { errorMessage: error.response.data.message.split(':')[1] } })
        }
    }
}

const createService = (dispatch: Dispatch<ServicesActions>) => async (body: ServicesInterface) => {
    try {
        dispatch({ type: 'loading' })
        const { data } = await dbApi.post<ServicesInterface[]>('/service', body);
        dispatch({ type: 'getServices', payload: { services: data } })
    } catch (error: any) {
        if (error.response.data.message) {
            toast.error(error.response.data.message.split(':')[1])
            dispatch({ type: 'errorMessage', payload: { errorMessage: error.response.data.message.split(':')[1] } })
        }
    }
}


const getOneService = (dispatch: Dispatch<ServicesActions>) => async (id: string) => {
    try {
        dispatch({ type: 'loading' })

        const { data } = await dbApi.get<ServiceInterface>(`/service/${id}`);
        dispatch({ type: 'getOneService', payload: { service: data } })
        
    } catch (error: any) {
        if (error.response.data.message) {
            toast.error(error.response.data.message.split(':')[1])
            dispatch({ type: 'errorMessage', payload: { errorMessage: error.response.data.message.split(':')[1] } })
        }
    }
}

const getOneServiceLink = (dispatch: Dispatch<ServicesActions>) => async (id: string) => {
    try {
        dispatch({ type: 'loading' })
        if (id === '') {
            getServices(dispatch)()
        } else {
            const { data } = await dbApi.get<ServiceInterface>(`/service/${id}`);
            dispatch({ type: 'getOneServiceLink', payload: { service: data } })
        }
    } catch (error: any) {
        if (error.response.data.message) {
            toast.error(error.response.data.message.split(':')[1])
            dispatch({ type: 'errorMessage', payload: { errorMessage: error.response.data.message.split(':')[1] } })
        }
    }
}

export const { Provider, Context } = dataContext<ServicesContextProps>(serviceReduce, 
    { getServices, createService, getOneService, getOneServiceLink }, 
    { services: [],
      servicesLink: [],
      service: null,
      loading: false, 
      errorMessage: null 
    }
)