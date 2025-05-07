import axios from "axios";

import dbApi from "@/api/DbApi";

import { ErrorResponseInterface } from "@/interfaces/errorResponse";
import {
  InstallerInterface,
  InstallerRequestInterface,
} from "@/app/(Admin)/installers/interfaces/installerInterface";

export const getInstallers = async () => {
  try {
    const response = await dbApi.get<InstallerInterface[]>(
      `/installer/by-token`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponseInterface>(error)) {
      throw new Error(
        `Error getting installers: ${error.response?.data.message}`
      );
    }
  }
};

export const createInstaller = async (body: InstallerRequestInterface) => {
  try {
    const response = await dbApi.post<InstallerInterface>("/installer", body);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponseInterface>(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const deleteInstaller = async (id: string) => {
  try {
    await dbApi.delete(`/installer/${id}`);
  } catch (error) {
    if (axios.isAxiosError<ErrorResponseInterface>(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const updateInstaller = async (
  id: string,
  body: InstallerRequestInterface
) => {
  try {
    const response = await dbApi.put<InstallerInterface>(
      `/installer/${id}`,
      body
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponseInterface>(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const getOneInstaller = async (id: string) => {
  try {
    const response = await dbApi.get<InstallerInterface>(`/installer/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponseInterface>(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
