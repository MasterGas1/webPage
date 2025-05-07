export interface InstallerInterface {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  picture: string;
  score: number;
  status: string;
  rfc: string;
  createdAt: string;
}

export interface InstallerRequestInterface {
  name: string;
  lastName: string;
  email: string;
  rfc: string;
  status?: string;
}
