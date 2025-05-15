import React, { useContext, useState } from "react";
import { IoPencil, IoRefreshOutline, IoTrashOutline } from "react-icons/io5";

import { useRouter } from "next/navigation";

import {
  Button,
  ConfirmationModal,
  Pill,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components";

import { Context as ServicesContext } from "@/context/serviceContext";

import usePermission from "@/hook/usePermission";

import { permissionsCategoryEnum } from "@/data/permissionCategory";

import styles from "./TableService.module.css";

const TableService = () => {
  const { state, getOneService, deleteService, getInfoService } =
    useContext(ServicesContext);
  const { hasPermission } = usePermission(permissionsCategoryEnum.SERVICE);

  const [idService, setIdService] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  return (
    <div className={styles.tableContainer}>
      <Table>
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>Disponibilidad</TableColumn>
          <TableColumn>Precio</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No hay servicios registrados" cursorPointer>
          {state.services.map((service) => (
            <TableRow
              key={service._id}
              doubleClick={() => getOneService(service._id)}
            >
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>
                <Pill
                  text={service.available ? "Disponible" : "No disponible"}
                  color={service.available ? "principal" : "error"}
                />
              </TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>
                <div className={styles.actionsButton}>
                  {hasPermission(["Service:*", "Service:update"]) && (
                    <Button
                      icon={<IoPencil size={20} />}
                      backgroundColor="secondary"
                      onClick={() => {
                        getInfoService(service._id);
                        router.push(`/services/editService/${service._id}`);
                      }}
                    />
                  )}

                  {hasPermission(["Service:*", "Service:delete"]) && (
                    <Button
                      icon={<IoTrashOutline size={20} />}
                      backgroundColor="secondary"
                      onClick={() => {
                        setIdService(service._id);
                        setOpenModal(true);
                      }}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmationModal
        isOpen={openModal}
        header="Eliminar servicio"
        content="¿Desea eliminar el servicio?"
        onOpenChange={() => setOpenModal(false)}
        onClickConfirmation={() => deleteService(idService, router)}
      />
    </div>
  );
};

export default TableService;
