import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  InstallerInterface,
  InstallerRequestInterface,
} from "@/app/(Admin)/installers/interfaces/installerInterface";

import {
  getInstallers,
  createInstaller,
  deleteInstaller,
  updateInstaller,
} from "@/app/(Admin)/installers/services/installer";

const useInstaller = () => {
  const [installers, setInstallers] = useState<InstallerInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getInstallers();

        setInstallers(response || []);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const createNewInstaller = async (body: InstallerRequestInterface) => {
    setSuccess(false);
    setIsLoading(true);
    try {
      const response = await createInstaller(body);

      setInstallers([...installers, response as InstallerInterface]);
      setSuccess(true);

      toast.success("Instalador creado con exito");
    } catch (error: any) {
      toast.error(error.message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInstallerById = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteInstaller(id);

      setInstallers(installers.filter((installer) => installer._id !== id));

      toast.success("Instalador se elimino con exito");
    } catch (error: any) {
      toast.error(error.message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const updateInstallerById = async (
    id: string,
    body: InstallerRequestInterface
  ) => {
    setIsLoading(true);
    try {
      const response = await updateInstaller(id, body);

      setInstallers(
        installers.map((installer) =>
          installer._id === id && response ? response : installer
        )
      );
      toast.success("Instalador actualizado con exito");

      setSuccess(true);
    } catch (error: any) {
      toast.error(error.message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    installers,
    success,
    isLoading,
    createNewInstaller,
    deleteInstallerById,
    updateInstallerById,
  };
};

export default useInstaller;
