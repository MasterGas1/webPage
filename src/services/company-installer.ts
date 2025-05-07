import axios, { AxiosError } from "axios";

import DbApi from "@/api/DbApi";
import { ErrorResponseInterface } from "@/interfaces/errorResponse";

import { companyInstallerRequestInterface } from "@/interfaces/companyInstallerInterface";
import { CompanyInstallerInterface } from "@/interfaces/companyInstaller";

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

export const getCompanyInstallerByToken = async () => {
  try {
    const response = await DbApi.get<CompanyInstallerInterface>(
      "company-installer/by-token"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponseInterface>(error)) {
      throw new Error(
        `Error getting company installer by token: ${error.response?.data.message}`
      );
    }
  }
};
