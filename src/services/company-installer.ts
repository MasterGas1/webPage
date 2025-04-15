import axios, { AxiosError } from "axios";

import DbApi from "@/api/DbApi";
import { ErrorResponseInterface } from "@/interfaces/errorResponse";
import { companyInstallerRequestInterface } from "@/interfaces/installerInterface";

export const registerCompanyInstaller = async (
  body: companyInstallerRequestInterface
) => {
  try {
    await DbApi.post("company-installer", body);
  } catch (error) {
    if (axios.isAxiosError<ErrorResponseInterface>(error)) {
      throw new Error(
        `Error registering company installer: ${error.response?.data.message}`
      );
    }
  }
};
