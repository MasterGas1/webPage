export interface ServicesInterface {
    name: string
    description: string
    image: string
    type: string
    fatherService: string
    subServices: string[]
    price: number
    available: boolean
}