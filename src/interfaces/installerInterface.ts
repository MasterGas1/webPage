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
    employeesNumber: string
    webSite: string
    ownOffice: string
    ownVehicle: string
    state: keyof typeof estadosMunicipios
    city: string
    address: string
    specializedTools: string
    certifications: string
    securityCourses: string
    yearsExperience: string

}
