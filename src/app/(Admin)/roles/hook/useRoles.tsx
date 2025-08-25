import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { AddRoleInterface, RoleInterface } from "../interfaces/RoleInterface";

import { createRole, getRoles } from "../services/roles";
import axios from "axios";
import { ErrorResponseInterface } from "@/interfaces/errorResponse";

const useRoles = () => {
  const [roles, setRoles] = useState<RoleInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await getRoles();

        setRoles(response ?? []);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const addRole = async (body: AddRoleInterface) => {
    try {
      setIsLoading(true);
      const response = await createRole(body);

      if (response) {
        setRoles([...roles, response]);
        toast.success("Rol creado con éxito")
      }
    } catch (error) {
      if (axios.isAxiosError<ErrorResponseInterface>(error)) {
        toast.error(error.response?.data.message)
        throw new Error(error.response?.data.message)
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    roles,
    isLoading,
    addRole,
  };
};

export default useRoles;
