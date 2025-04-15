"use client";

import { Checkbox, Spinner } from "@nextui-org/react";
import { useState } from "react";

import GroupForm from "@/components/GroupForm/GroupForm";
import Success from "../Success/Success";
import Spacer from "@/components/Spacer";
import { Button, Input } from "@/components";

import { useForm } from "@/hook/useForm";

import { registerCompanyInstaller } from "@/services/company-installer";

import styles from "./Form.module.css";

interface FormProps {
  onSuccess: (value: boolean) => void;
}

const Form = ({ onSuccess }: FormProps) => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: "",
    lastName: "",
    rfc: "",
    email: "",

    companyName: "",
    phoneNumber: "",
    IMSSNumber: "",
    employeesNumber: "",
    website: "",
    ownOffice: "false",
    ownVehicle: "false",

    state: "",
    city: "",
    address: "",

    specializedTools: "",
    certifications: "",
    securityCourses: "",
    yearsExperience: "",
  };

  const validations = {
    name: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    lastName: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    rfc: {
      errorMessage: "Ingrese un RFC valido",
      regexValidation: /^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/,
    },
    email: {
      errorMessage: "El correo debe ser valido",
      regexValidation:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },

    companyName: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    phoneNumber: {
      errorMessage: "Campo requerido",
      regexValidation: /^[0-9]{10}$/,
    },
    IMSSNumber: {
      errorMessage: "Campo requerido",
      regexValidation: /^[0-9]{12}$/,
    },
    employeesNumber: {
      errorMessage: "Campo requerido",
      regexValidation: /^[0-9]{1,}$/,
    },
    website: {
      errorMessage: "Campo requerido",
      regexValidation: /^https?:\/\/[\w-]{2,}\.[\w-]{2,}[\w-./?%&=]*/,
    },

    state: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    city: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    address: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ'0-9\s]+$/,
    },

    specializedTools: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    certifications: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    securityCourses: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?=.{4,}$)[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    },
    yearsExperience: {
      errorMessage: "Campo requerido",
      regexValidation: /^[0-9]{1,}$/,
    },
  };

  const onSubmit = () => {
    try {
      const { name, lastName, rfc, email, ...companyInstaller } = values;

      setIsLoading(true);
      const body = {
        name,
        lastName,
        rfc,
        email,
        companyInstaller: {
          ...companyInstaller,
          employeesNumber: Number(employeesNumber),
          yearsExperience: Number(yearsExperience),
          ownOffice: Boolean(ownOffice),
          ownVehicle: Boolean(ownVehicle),
        },
      };
      registerCompanyInstaller(body);
      setSuccess(true);
      onSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    name,
    lastName,
    rfc,
    email,
    companyName,
    phoneNumber,
    IMSSNumber,
    employeesNumber,
    website,
    ownOffice,
    ownVehicle,
    state,
    city,
    address,
    specializedTools,
    certifications,
    securityCourses,
    yearsExperience,
    values,
    errors,
    onChange,
    handleSubmit,
  } = useForm(initialValues, validations, onSubmit);

  return (
    <div className={styles.formContainer}>
      {success ? (
        <Success />
      ) : (
        <>
          <GroupForm name="Datos personales">
            <Input
              label="Nombre(s)"
              onChange={(e) => onChange(e.target.value, "name")}
              variants="bordered"
              value={name}
              required
              errorMessage={errors.name}
            />

            <Input
              label="Apellido(s)"
              onChange={(e) => onChange(e.target.value, "lastName")}
              variants="bordered"
              value={lastName}
              required
              errorMessage={errors.lastName}
            />

            <Input
              label="RFC"
              onChange={(e) => onChange(e.target.value, "rfc")}
              variants="bordered"
              value={rfc}
              required
              errorMessage={errors.rfc}
            />

            <Input
              label="Correo electronico"
              onChange={(e) => onChange(e.target.value, "email")}
              variants="bordered"
              value={email}
              required
              errorMessage={errors.email}
            />
          </GroupForm>
          <Spacer />

          <GroupForm name="Datos de la empresa">
            <Input
              label="Nombre de la empresa"
              onChange={(e) => onChange(e.target.value, "companyName")}
              variants="bordered"
              value={companyName}
              required
              errorMessage={errors.companyName}
            />

            <Input
              label="Telefono de la empresa"
              onChange={(e) => onChange(e.target.value, "phoneNumber")}
              variants="bordered"
              value={phoneNumber}
              required
              errorMessage={errors.phoneNumber}
            />

            <Input
              label="Número patronal IMSS"
              onChange={(e) => onChange(e.target.value, "IMSSNumber")}
              variants="bordered"
              value={IMSSNumber}
              required
              errorMessage={errors.IMSSNumber}
            />

            <Input
              label="Número de empleados"
              onChange={(e) => onChange(e.target.value, "employeesNumber")}
              variants="bordered"
              value={employeesNumber}
              required
              type="number"
              errorMessage={errors.employeesNumber}
            />

            <Input
              label="URL Sitio web"
              onChange={(e) => onChange(e.target.value, "website")}
              variants="bordered"
              value={website}
              required
              errorMessage={errors.website}
            />

            <div className={styles.checkboxSection}>
              <span>Cuenta con ...</span>
              <div>
                <Checkbox
                  color="success"
                  isSelected={ownOffice === "true"}
                  onValueChange={(e) => onChange(e.toString(), "ownOffice")}
                >
                  Oficina propia
                </Checkbox>
                <Checkbox
                  className="ml-4"
                  color="success"
                  isSelected={ownVehicle === "true"}
                  onValueChange={(e) => onChange(e.toString(), "ownVehicle")}
                >
                  Vechiculo propia
                </Checkbox>
              </div>
            </div>
          </GroupForm>
          <Spacer />

          <GroupForm name="Ubicación de la empresa">
            <Input
              label="Estado"
              onChange={(e) => onChange(e.target.value, "state")}
              variants="bordered"
              value={state}
              required
              errorMessage={errors.state}
            />

            <Input
              label="Ciudad"
              onChange={(e) => onChange(e.target.value, "city")}
              variants="bordered"
              value={city}
              required
              errorMessage={errors.city}
            />

            <Input
              label="Dirección"
              onChange={(e) => onChange(e.target.value, "address")}
              variants="bordered"
              value={address}
              required
              errorMessage={errors.address}
            />
          </GroupForm>
          <Spacer />

          <GroupForm name="Giro de la empresa">
            <Input
              label="Herramientas especializadas"
              onChange={(e) => onChange(e.target.value, "specializedTools")}
              variants="bordered"
              value={specializedTools}
              required
              errorMessage={errors.specializedTools}
            />

            <Input
              label="Certificaciones"
              onChange={(e) => onChange(e.target.value, "certifications")}
              variants="bordered"
              value={certifications}
              required
              errorMessage={errors.certifications}
            />

            <Input
              label="Cursos de seguridad"
              onChange={(e) => onChange(e.target.value, "securityCourses")}
              variants="bordered"
              value={securityCourses}
              required
              errorMessage={errors.securityCourses}
            />

            <Input
              label="Años de experiencia"
              onChange={(e) => onChange(e.target.value, "yearsExperience")}
              variants="bordered"
              value={yearsExperience}
              required
              type="number"
              errorMessage={errors.yearsExperience}
            />
          </GroupForm>

          <div className={styles.buttonPosition}>
            <Button
              label="Registrar"
              onClick={() => handleSubmit()}
              className={styles.buttonContainer}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
