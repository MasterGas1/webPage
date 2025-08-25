import axios from "axios";

import dbApi from "@/api/DbApi";

import { AddRoleInterface, RoleInterface } from "../interfaces/RoleInterface";
import { ErrorResponseInterface } from "@/interfaces/errorResponse";

export const getRoles = async () => {
  try {
    const response = await dbApi.get<RoleInterface[]>("/role");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponseInterface>(error)) {
      throw new Error(`Error getting roles: ${error.response?.data.message}`);
    }
  }
};

export const createRole = async (body: AddRoleInterface) => {
  const response = await dbApi.post<RoleInterface>("/role", body);

  return response.data;
};
