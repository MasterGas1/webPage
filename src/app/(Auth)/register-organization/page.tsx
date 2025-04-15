"use client";

import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Form from "./components/Form/Form";

import styles from "./page.module.css";

const page = () => {
  const [success, setSuccess] = useState(false);

  return (
    <div className={styles.pageRegisterInstallerContainer}>
      <div className={styles.registerInstallerContainer}>
        {!success && (
          <div>
            <h2 className={styles.title}>Bienvenido</h2>
            <h3 className={styles.subtitle}>{`REGISTRO DE ORGANIZACIÓN`}</h3>
          </div>
        )}

        <Form onSuccess={setSuccess} />
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default page;
