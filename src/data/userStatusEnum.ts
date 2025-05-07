export enum userStatusEnum {
  active = "Activo",
  blocked = "Bloqueado",
}

export enum userStatusReverseEnum {
  Activo = "active",
  Bloqueado = "blocked",
}

export const userStatusOptions = [
  { label: "Activo", value: userStatusEnum.active },
  { label: "Bloqueado", value: userStatusEnum.blocked },
];
