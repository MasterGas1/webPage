"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

import { ToastContainer } from "react-toastify";

import {
  Button,
  Input,
  Loading,
  Select,
  SelectItem,
  Spinner,
} from "@/components";
import CustomCreationTitle from "@/components/CustomCreationTitle";

import { availableOptions } from "@/data/serviceEnum";

import { Context as ServicesContext } from "@/context/serviceContext";

import styles from "./page.module.css";

import { useForm } from "@/hook/useForm";

import { RequestRootServiceInterface } from "../../interface/servicesInterface";
import usePermission from "@/hook/usePermission";
import { permissionsCategoryEnum } from "@/data/permissionCategory";

const page = () => {
  const {
    state: { service, loading },
    updateService,
    getInfoService,
  } = useContext(ServicesContext);

  const { hasPermission, permissionsCategory } = usePermission(
    permissionsCategoryEnum.SERVICE
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { id } = useParams();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const [checkType, setCheckType] = useState("");

  const initialValues = {
    name: "",
    description: "",
    type: "",
    available: "",
    price: 0,
  };

  const validations = {
    name: {
      regexValidation: /^.+$/,
      errorMessage: "Nombre es requerido",
    },
    description: {
      regexValidation: /^.+$/,
      errorMessage: "Descripcion es requerido",
    },
    type: {
      regexValidation: /^.+$/,
      errorMessage: "Tipo de servicio es requerido",
    },
    price: {
      regexValidation: checkType === "root service price" ? /^[0-9]+$/ : /^.+$/,
      errorMessage: "Precio es requerido",
    },
  };

  const onSubmit = (value: RequestRootServiceInterface) => {
    const { price, ...newValue } = value;

    if (newValue.type === "root service price" || newValue.type === "price") {
      updateService(
        id.toString(),
        { ...newValue, price, image: file ?? undefined },
        router
      );
    } else {
      updateService(
        id.toString(),
        { ...newValue, image: file ?? undefined },
        router
      );
    }
  };

  const {
    name,
    type,
    price,
    description,
    available,
    errors,
    onChange,
    setValuesForm,
    handleSubmit,
  } = useForm(initialValues, validations, onSubmit);

  useEffect(() => {
    if (service === null) {
      getInfoService(id.toString());
    }
  }, []);

  useEffect(() => {
    if (service) {
      setValuesForm({
        name: service.name,
        description: service.description,
        type: service.type,
        available: service.available,
        price: service.price,
      });
      setImagePreview(service.image);
      setCheckType(service.type);
    }
  }, [service]);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);

      setImagePreview(localUrl);
      setFile(file);
    }
  };

  useEffect(() => {
    if (!hasPermission(["Service:*", "Service:update"])) {
      router.push("/dashboard");
    }
  }, [permissionsCategory]);

  return (
    <div className={styles.pageCreateServiceContainer}>
      {loading && <Loading />}
      <div className={styles.formContainer}>
        <CustomCreationTitle title="Editar Servicio" />
        {service !== null ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                flexDirection: "row",
                gap: "1rem",
                width: "100%",
              }}
            >
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1rem",
                  }}
                >
                  <Input
                    label="Nombre del Servicio"
                    name="name"
                    type="text"
                    value={name}
                    errorMessage={errors.name}
                    onChange={(e) => onChange(e.target.value, "name")}
                    variants="bordered"
                  />

                  {service.fatherServiceId !== undefined && (
                    <Input
                      label="Nombre del padre"
                      name="parent"
                      type="text"
                      value={service?.name || ""}
                      onChange={() => {}}
                      disabled
                      variants="bordered"
                    />
                  )}
                </div>

                <br />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  <Input
                    label="Tipo de Servicio"
                    name="type"
                    type="text"
                    value={
                      type === "root service"
                        ? "Servicio principal"
                        : type === "subservice"
                        ? "Subservicio"
                        : type === "price"
                        ? "Precio"
                        : "Servicio principal precio"
                    }
                    onChange={() => {}}
                    disabled
                    variants="bordered"
                  />

                  {type === "root service price" ||
                    (type === "price" && (
                      <Input
                        label="Precio"
                        name="price"
                        type="number"
                        value={price}
                        errorMessage={errors.price}
                        onChange={(e) => onChange(e.target.value, "price")}
                        variants="bordered"
                      />
                    ))}
                </div>

                <br />
                <Select
                  label="Disponibilidad"
                  value={available ? "Disponible" : "No disponible"}
                  errorMessage={errors.available}
                  onChange={(e) =>
                    onChange(e === "Disponible" ? true : false, "available")
                  }
                  variants="bordered"
                >
                  {availableOptions.map((option) => (
                    <SelectItem value={option.value} key={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
                <br />

                <Input
                  label="Descripcion"
                  name="description"
                  type="text"
                  value={description}
                  errorMessage={errors.description}
                  onChange={(e) => onChange(e.target.value, "description")}
                  variants="bordered"
                />
              </div>

              <div className={styles.rightContainer}>
                <Image
                  src={imagePreview ?? ""}
                  width={400}
                  height={400}
                  alt="image"
                  className="w-2/5"
                />
                <Button
                  label="Subir imagen"
                  className={styles.uploadButton}
                  onClick={handleClickUpload}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  hidden
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="flex justify-end mt-10 items-end h-full">
              <Button label="Guardar" onClick={handleSubmit} />
            </div>

            <ToastContainer autoClose={2000} />
          </>
        ) : (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
