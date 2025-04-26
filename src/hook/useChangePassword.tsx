import { useState } from "react";

import dbApi from "@/api/DbApi";
import { changePasswordReponseInterface } from "@/interfaces/changePasswordInterface";
import { isAxiosError } from "axios";

export const useChangePassword = () => {
  const [userInformation, setUserInformation] = useState({
    status: "",
    updatePassword: true,
    passwordChanged: false,
  });

  const [errorPassword, setErrorPassword] = useState(false);

  const getStatusUpdatePassword = async (token: string) => {
    try {
      const { data } = await dbApi.get<changePasswordReponseInterface>(
        `/user/getUserStatusAndUpdateByToken/${token}`
      );

      setUserInformation({
        ...userInformation,
        status: data.status,
        updatePassword: data.updatePassword,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.code === "ERR_BAD_REQUEST") {
          setErrorPassword(true);
        }

        console.log(error);
      }
    }
  };

  const updatePassword = async (token: string, password: string) => {
    try {
      await dbApi.put(
        "/company-installer/activatePassword",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInformation({
        ...userInformation,
        passwordChanged: true,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    userInformation,
    errorPassword,
    getStatusUpdatePassword,
    updatePassword,
  };
};
