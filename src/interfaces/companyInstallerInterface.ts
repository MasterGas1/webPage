import { CompanyInstallerInterface } from "./companyInstaller";

export interface companyInstallerRequestInterface {
  name: string;
  lastName: string;
  email: string;
  rfc: string;
  companyInstaller: CompanyInstallerInterface;
}

export interface companyInstallerResponseInterface {
  _id: string;
  companyName: string;
  phoneNumber: string;
  IMSSNumber: number;
  website: string;
  employeesNumber: number;
  ownOffice: boolean;
  ownVehicle: boolean;
  state: string;
  city: string;
  address: string;
  specializedTools: string;
  yearsExperience: number;
  certifications: string;
  securityCourses: string;
  status: string;
  ownerUserId: OwnerUserId;
  createdAt: string;
}

export interface OwnerUserId {
  _id: string;
  name: string;
  lastName: string;
  rfc: string;
  email: string;
}
