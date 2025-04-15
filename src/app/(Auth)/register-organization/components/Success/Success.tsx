import Image from "next/image";
import React from "react";

import styles from "./Success.module.css";

import imageLogo from "../../../../../../public/LogoMastergas.png";

const Success = () => {
  return (
    <div className={styles.successContainer}>
      <h2>Registro exitoso</h2>
      <Image src={imageLogo} alt="Logo Mastergas" width={250} height={250} />
      <span>
        Muchas gracias por registrarte, uno de nuestros administradores se
        pondra en contacto contigo para el seguimiento de tu registro
      </span>
    </div>
  );
};

export default Success;
