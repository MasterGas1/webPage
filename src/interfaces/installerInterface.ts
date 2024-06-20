import estadosMunicipios from '@/jsons/estados-municipios.json';

export interface createInstallerInterface extends userInterface {
    installer: installersInterface
}

export interface userInterface {
    name: string
    lastName: string
    email: string
    rfc: string
}

export interface installersInterface {
    companyName: string
    phoneNumber: string
    IMSSNumber: string
    employeesNumber: number
    website: string
    ownOffice: boolean
    ownVehicle: boolean
    state: keyof typeof estadosMunicipios
    city: string
    address: string
    specializedTools: string
    certifications: string
    securityCourses: string
    yearsExperience: number

}
