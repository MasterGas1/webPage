import React, { useContext, useEffect, useState } from "react";

import { Context as AuthContext } from "@/context/AuthContext";

import { permissionsCategoryEnum } from "@/data/permissionCategory";

const usePermission = (category: permissionsCategoryEnum) => {
  const {
    state: { permissions },
  } = useContext(AuthContext);

  const [permissionsCategory, setPermissionsCategory] = useState<string[]>([]);

  useEffect(() => {
    setPermissionsCategory(
      permissions
        .filter((permission) => permission.category === category)
        .map((permission) => permission.name)
    );
  }, [permissions]);

  const hasPermission = (permission: string[]) => {
    let founded = false;
    permission.forEach((permiso) => {
      if (permissionsCategory.includes(permiso)) {
        founded = true;
      }
    });

    return founded;
  };
  return {
    hasPermission,
    permissionsCategory,
  };
};

export default usePermission;
