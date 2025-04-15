import { CompanyInstallerInterface } from "./companyInstaller";

export interface companyInstallerRequestInterface {
  name: string;
  lastName: string;
  email: string;
  rfc: string;
  companyInstaller: CompanyInstallerInterface;
}
