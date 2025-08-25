import { useEffect, useState } from "react";

import { AddRoleInterface, RoleInterface } from "../interfaces/RoleInterface";

import { createRole, getRoles } from "../services/roles";

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
      }
    } catch (error) {
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
