"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

import imageLogo from "../../../../../public/LogoMastergas.png";

import Spacer from "@/components/Spacer";
import { useForm } from "@/hook/useForm";

import { useChangePassword } from "@/hook/useChangePassword";

import styles from "./page.module.css";
import { Button, Input } from "@/components";

const page = ({ params }: { params: { token: string } }) => {
  const [errorMessage, setSuccessMessage] = useState("");

  const flag = useRef(false);

  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
      Cookies.remove("mg-23-token");
      getStatusUpdatePassword(params.token);
    }
  }, []);

  const handleSubmit = () => {
    if (password === confirmPassword) {
      updatePassword(params.token, password);
    } else {
      setSuccessMessage("Las contraseñas no coinciden");
    }
  };

  const validations = {
    password: {
      regexValidation: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      errorMessage:
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número",
    },
    confirmPassword: {
      regexValidation: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      errorMessage:
        "La contraseña debe contener al menos 8 caracteres, una letra mayúscula y un número",
    },
  };

  const {
    password,
    confirmPassword,
    errors,
    onChange,
    handleSubmit: handleSubmitForm,
  } = useForm(
    {
      password: "",
      confirmPassword: "",
    },
    validations,
    handleSubmit
  );

  const {
    userInformation,
    errorPassword,
    getStatusUpdatePassword,
    updatePassword,
  } = useChangePassword();

  return (
    <div className={styles.pageChangePassowordContainer}>
      <div className={styles.formChangePasswordContainer}>
        <Image src={imageLogo} alt="Logo mastergas" />

        {userInformation.updatePassword && !errorPassword ? (
          !userInformation.passwordChanged ? (
            <>
              <h1>Nueva contraseña</h1>

              <Spacer />

              <div className={styles.form} onSubmit={handleSubmitForm}>
                <Input
                  label="Nueva contraseña"
                  type="password"
                  value={password}
                  variants="bordered"
                  errorMessage={errors.password}
                  onChange={(e) => onChange(e.target.value, "password")}
                />

                <Input
                  label="Confirmar nueva contraseña"
                  type="password"
                  value={confirmPassword}
                  variants="bordered"
                  errorMessage={errors.confirmPassword}
                  onChange={(e) => onChange(e.target.value, "confirmPassword")}
                />

                <p className={styles.errorMessage}>{errorMessage}</p>

                <Button
                  label="Confirmar"
                  onClick={handleSubmitForm}
                  className={styles.buttonConfirm}
                />
              </div>
            </>
          ) : (
            <>
              <Spacer />
              <h1 className="text-4xl text-principal-color font-bold text-center">
                La contraseña se cambio de manera exitosa
              </h1>
            </>
          )
        ) : (
          <>
            <Spacer />
            <h1 className="text-4xl text-principal-color font-bold text-center">
              El link de cambio de contraseña ha expirado
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
