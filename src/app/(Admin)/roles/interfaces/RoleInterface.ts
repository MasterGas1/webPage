export interface RoleInterface {
  _id: string;
  name: string;
  description: string;
  permissionsId: PermissionsId[];
  isEditable: boolean;
}

export interface PermissionsId {
  _id: string;
  name: string;
  description: string;
  category: string;
}

export interface AddRoleInterface {
  name: string;
  description: string;
}
