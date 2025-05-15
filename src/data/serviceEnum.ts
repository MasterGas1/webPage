export const serviceTypeEnum = {
  "root service": "Servicio raiz",
  subservice: "Subservicio",
  "root service price": "Servicio raiz con precio",
  price: "Precio",
} as const;

export const serviceTypeReverseEnum = {
  "Servicio raiz": "root service",
  Subservicio: "subservice",
  "Servicio raiz con precio": "root service price",
  Precio: "price",
} as const;

export const rootServiceOptions = [
  {
    value: serviceTypeEnum["root service"],
    label: serviceTypeEnum["root service"],
  },
  {
    value: serviceTypeEnum["root service price"],
    label: serviceTypeEnum["root service price"],
  },
];

export const subserviceOptions = [
  {
    value: serviceTypeEnum.subservice,
    label: serviceTypeEnum.subservice,
  },
  {
    value: serviceTypeEnum.price,
    label: serviceTypeEnum.price,
  },
];

export const availableOptions = [
  {
    value: "Disponible",
    label: "Disponible",
  },
  {
    value: "No disponible",
    label: "No disponible",
  },
];
