import { Dispatch } from "react";
import { toast } from "react-toastify";

import dbApi from "@/api/DbApi";
import { LinkListServicesInterface, RequestRootServiceInterface, ServiceInterface, ServicesInterface } from "@/interfaces/servicesInterface";
import dataContext from "./dataContext";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface ServiceState {
    services: ServicesInterface[]
    service : ServiceInterface | null
    servicesLink: LinkListServicesInterface[]
    reload: boolean
    loading: boolean
    errorMessage: string | null
}

export type ServicesActions =
    | { type: 'addService', payload: { service: ServicesInterface } }
    | { type: "getServices", payload: { services: ServicesInterface[] } }
    | { type: "getOneService", payload: { service: ServiceInterface } }
    | { type: "getOneServiceLink", payload: { service: ServiceInterface } }
    | { type: "getInfoService", payload: { service: ServiceInterface } }
    | { type: "updateService", payload: { service: ServicesInterface } }
    | { type: 'deleteService', payload: { id: string } }
    | { type: 'loading' }
    | { type: 'errorMessage', payload: { errorMessage: string } }

type ServicesContextProps = {
    state: ServiceState,
    getServices: () => void,
    getOneService: (id: string) => void
    getOneServiceLink: (id: string) => void
    getInfoService: (id: string) => void
    createService: (body: RequestRootServiceInterface, router: AppRouterInstance) => void
    updateService: (id: string, body: RequestRootServiceInterface, router: AppRouterInstance) => void
    deleteService: (id: string, router: AppRouterInstance) => void
    errorMessage: (message: string) => void
}

const serviceReduce = (prevState: ServiceState, action: ServicesActions): ServiceState => {
    switch (action.type) {
        case 'addService':
            return {
                ...prevState,
                services: prevState.services.concat(action.payload.service),
                errorMessage: null,
                loading: false
            }
        case 'getServices':
            return {
                ...prevState,
                services: action.payload.services,
                service: null,
                reload: false,
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
        case 'getInfoService':
            return {
                ...prevState,
                service: action.payload.service,
                errorMessage: null,
                reload: true,
                loading: false
            }
        case 'updateService':
            return {
                ...prevState,
                services: prevState.services.map(service => service._id === action.payload.service._id ? action.payload.service : service),
                service: {
                    ...action.payload.service,
                    fatherServiceId: {
                        name: ''
                    },
                    subservicesId: []
                },
                errorMessage: null,
                loading: false
            }
        case 'deleteService':
            return {
                ...prevState,
                services: prevState.services.filter(service => service._id !== action.payload.id),
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
        }
    }
}

const createService = (dispatch: Dispatch<ServicesActions>) => async (body: RequestRootServiceInterface, router: AppRouterInstance) => {
    try {
        dispatch({ type: 'loading' })
        const { data } = await dbApi.post<ServicesInterface>('/service', body);
        dispatch({ type: 'addService', payload: { service: data } })
        router.push('/services')
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
}


const getOneService = (dispatch: Dispatch<ServicesActions>) => async (id: string) => {
    try {
        dispatch({ type: 'loading' })

        const { data } = await dbApi.get<ServiceInterface>(`/service/${id}`);
        dispatch({ type: 'getOneService', payload: { service: data } })
        
    } catch (error: any) {
        if (error.response.data.message) {
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

const getInfoService = (dispatch: Dispatch<ServicesActions>) => async (id: string) => {
    try {
        dispatch({ type: 'loading' })
        const { data } = await dbApi.get<ServiceInterface>(`/service/${id}`);
        dispatch({ type: 'getInfoService', payload: { service: data } })
    } catch (error: any) {
        if (error.response.data.message) {
        }
    }
}

const updateService = (dispatch: Dispatch<ServicesActions>) => async (id: string, body: RequestRootServiceInterface, router: AppRouterInstance) => {
    try {
        dispatch({ type: 'loading' })
        const {data} = await dbApi.put<ServicesInterface>(`/service/${id}`, body)
        dispatch({ type: 'updateService', payload: { service: data } })
        router.push('/services')
    } catch (error: any) {

    }
}

const deleteService = (dispatch: Dispatch<ServicesActions>) => async (id: string, router: AppRouterInstance) => {
    try {
        dispatch({ type: 'loading' })
        await dbApi.delete(`/service/${id}`)
        dispatch({ type: 'deleteService', payload: { id } })
        router.push('/services')
    } catch (error: any) {
        console.log(error)
        if (error.response) {
            toast.error(error.response.data.message)
        }
    }
}

export const { Provider, Context } = dataContext<ServicesContextProps>(serviceReduce, 
    { 
        getServices, 
        createService, 
        getOneService, 
        getOneServiceLink,
        getInfoService,
        updateService,
        deleteService
    }, 
    { 
      services: [],
      servicesLink: [],
      service: null,
      reload: true,
      loading: false, 
      errorMessage: null 
    }
)