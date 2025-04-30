import { permissionsCategoryEnum } from "@/data/permissionCategory";

export interface PermissionInterface {
  _id: string;
  name: string;
  description: string;
  category: permissionsCategoryEnum;
  rolesId: string[];
}
