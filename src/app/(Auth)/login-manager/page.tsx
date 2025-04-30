"use client";

import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button, Spinner } from "@/components";
import Spacer from "@/components/Spacer";
import Input from "./components/Input/Input";

import { Context as AuthContext } from "@/context/AuthContext";

import imageLogo from "../../../../public/LogoMastergas.png";

import { useForm } from "@/hook/useForm";

import styles from "./page.module.css";

const Page = () => {
  const router = useRouter();

  const { state, signin, getToken } = useContext(AuthContext);

  const validation = {
    email: {
      errorMessage: "El correo debe ser valido",
      regexValidation:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    password: {
      errorMessage: "La contraseña debe ser igual o mayor a 8 caracteres",
      regexValidation: /^(.{8,})$/,
    },
  };

  const { email, password, errors, onChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    validation,
    signin
  );

  useEffect(() => {
    if (!state.token) {
      getToken();
    } else if (
      state.role === "Administrator" ||
      state.role === "Company Installer"
    ) {
      router.push("/dashboard");
    }
  }, [state.token]);

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginFormContainer}>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e.target.value, "email")}
          errorMessage={errors.email}
          label="Correo electrónico"
        />
        <Spacer />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e.target.value, "password")}
          errorMessage={errors.password}
          label="Contraseña"
        />
        <div className={styles.buttonPostion}>
          <Button
            label="Iniciar sesión"
            onClick={handleSubmit}
            backgroundColor="secondary"
            className={styles.buttonContainer}
          />
        </div>
      </div>

      <div className={styles.logoContainer}>
        <div className={styles.imageContainer}>
          <Image src={imageLogo} alt="Logo mastergas" />
          <label>Bienvenido</label>
        </div>
      </div>

      {state.loading ? (
        <div className={styles.modalContainer}>
          <Spinner color="var(--principal-text-color)" />
        </div>
      ) : null}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Page;
