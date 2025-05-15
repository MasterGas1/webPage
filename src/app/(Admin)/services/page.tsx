"use client";

import React, { useContext, useEffect, useState } from "react";
import { Context as ServicesContext } from "@/context/serviceContext";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";

import { ServicesInterface } from "@/app/(Admin)/services/interface/servicesInterface";

import TableService from "./components/TableService/TableService";
import InfoService from "./components/InfoService/InfoService";
import LinkList from "./components/LinkList";
import usePermission from "@/hook/usePermission";
import { permissionsCategoryEnum } from "@/data/permissionCategory";

import styles from "./page.module.css";

const page = () => {
  const { hasPermission } = usePermission(permissionsCategoryEnum.SERVICE);

  const {
    state: { service, reload },
    getServices,
  } = useContext(ServicesContext);

  useEffect(() => {
    if (service === null || reload) {
      getServices();
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <h1>Servicios</h1>
      </div>

      <LinkList />

      {(service === null ||
        service.type === "root service" ||
        service.type === "subservice") &&
      hasPermission(["Service:*", "Service:create"]) ? (
        <div className={styles.addButtonPosition}>
          <Link
            href={
              service === null
                ? "/services/createService"
                : `/services/createService/${service?._id}`
            }
            className={styles.addButton}
          >
            <IoAdd size={30} color="white" />
          </Link>
        </div>
      ) : null}

      <InfoService />

      {service === null ||
      service.type === "root service" ||
      service.type === "subservice" ? (
        <TableService />
      ) : null}
    </div>
  );
};

export default page;
