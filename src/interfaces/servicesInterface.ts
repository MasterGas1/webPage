import LinkList from '../app/(Admin)/services/components/LinkList';
export interface ServicesInterface {
    _id: string
    name: string
    description: string
    image: string
    type: string
    price: number
    available: boolean
}

export interface ServiceInterface {
    _id: string
    name: string
    description: string
    image: string
    type: string
    price?: number
    available: boolean
    subservicesId: ServicesInterface[]
}

export interface RequestRootServiceInterface {
    name: string
    description: string
    type: string
    price?: number
    fatherServiceId?: string
}

export interface LinkListServicesInterface {
    id?: string
    name?: string 
}
