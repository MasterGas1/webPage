import { ServicesInterface } from "@/app/(Admin)/services/interface/servicesInterface";
import React, { useContext } from "react";
import Image from "next/image";

import { Pill } from "@/components";

import { Context as ServicesContext } from "@/context/serviceContext";

import styles from "./InfoService.module.css";

const InfoService = () => {
  const {
    state: { service },
  } = useContext(ServicesContext);

  return (
    <>
      {service !== null ? (
        <div className={styles.infoServiceContainer}>
          <Image
            src={service.image}
            alt={service.name}
            width={200}
            height={200}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ display: "flex", gap: "2rem" }}>
              <span className={styles.labelText}>
                Nombre: <span className="text-black">{service.name}</span>
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <span className={styles.labelText}>Dispoinibilidad:</span>
                <Pill
                  text={service.available ? "Disponible" : "No disponible"}
                  color={service.available ? "principal" : "error"}
                />
              </div>
            </div>
            <div>
              <span className={styles.labelText}>
                Tipo:{" "}
                <span style={{ color: "black" }}>
                  {service.type === "root service"
                    ? "Servicio principal"
                    : service.type === "subservice"
                    ? "Subservicio"
                    : service.type === "price"
                    ? "Precio"
                    : "Servicio principal precio"}
                </span>
              </span>
              {service.price !== undefined && (
                <span
                  className={styles.labelText}
                  style={{ marginLeft: "1rem" }}
                >
                  Precio:{" "}
                  <span style={{ color: "black" }}>{service.price}</span>
                </span>
              )}
            </div>
            <div>
              <span className={styles.labelText}>Descripción:</span>
              <p style={{ color: "black", fontWeight: "600" }}>
                {service.description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default InfoService;
