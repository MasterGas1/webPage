"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

import CustomCreationTitle from "@/components/CustomCreationTitle";
import { Button, Input, Loading, Select, SelectItem } from "@/components";

import { useForm } from "@/hook/useForm";

import {
  rootServiceOptions,
  serviceTypeEnum,
  serviceTypeReverseEnum,
} from "@/data/serviceEnum";

import { Context as ServicesContext } from "@/context/serviceContext";

import styles from "./page.module.css";

import { RequestRootServiceInterface } from "../interface/servicesInterface";

import ImageIcon from "../../../../../public/ImageIcon.png";

import usePermission from "@/hook/usePermission";
import { permissionsCategoryEnum } from "@/data/permissionCategory";

const page = () => {
  const { hasPermission, permissionsCategory } = usePermission(
    permissionsCategoryEnum.SERVICE
  );
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const [checkType, setCheckType] = useState("");

  const {
    state: { loading },
    createService,
  } = useContext(ServicesContext);

  const initialValues = {
    name: "",
    description: "",
    type: "",
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

  const onSubmit = async (value: RequestRootServiceInterface) => {
    const { price, ...newValue } = value;

    const body: RequestRootServiceInterface = {
      ...newValue,
    };

    if (newValue.type === "root service price") {
      body.price = price;
    }

    createService(
      {
        ...body,
        image: file,
      },
      router
    );
  };

  const { name, description, type, price, errors, onChange, handleSubmit } =
    useForm(initialValues, validations, onSubmit);

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
    if (
      permissionsCategory.length &&
      !hasPermission(["Service:*", "Service:create"])
    ) {
      router.push("/dashboard");
    }
  }, [permissionsCategory]);

  return (
    <div className={styles.pageCreateServiceContainer}>
      {loading && <Loading />}
      <div className={styles.formContainer}>
        <CustomCreationTitle title="Crear servicio" />
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
            <Input
              label="Nombre del Servicio"
              name="name"
              type="text"
              value={name}
              errorMessage={errors.name}
              onChange={(e) => onChange(e.target.value, "name")}
              variants="bordered"
            />

            <br />

            <div className="grid gap-4 grid-cols-2 w-full">
              <Select
                value={serviceTypeEnum[type as keyof typeof serviceTypeEnum]}
                onChange={(e) => {
                  onChange(
                    serviceTypeReverseEnum[
                      e as keyof typeof serviceTypeReverseEnum
                    ],
                    "type"
                  );

                  setCheckType(
                    serviceTypeReverseEnum[
                      e as keyof typeof serviceTypeReverseEnum
                    ]
                  );
                }}
                variants="bordered"
                label="Tipo de Servicio"
                errorMessage={errors.type}
              >
                {rootServiceOptions.map(({ value, label }, index) => (
                  <SelectItem key={index} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </Select>

              {type === "root service price" && (
                <Input
                  label="Precio"
                  name="price"
                  type="number"
                  value={price}
                  errorMessage={errors.price}
                  onChange={(e) => onChange(e.target.value, "price")}
                  variants="bordered"
                />
              )}
            </div>

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
              src={imagePreview || ImageIcon}
              width={400}
              height={400}
              alt="image"
              className={styles.image}
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
          <Button label="Crear" type="button" onClick={handleSubmit} />
        </div>
      </div>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default page;
