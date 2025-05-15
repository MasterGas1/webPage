import LinkList from "../components/LinkList";
export interface ServicesInterface {
  _id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
  available: string;
}

export interface ServiceInterface {
  _id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  price?: number;
  available: string;
  fatherServiceId: {
    name: string;
  };
  subservicesId: ServicesInterface[];
}

export interface RequestRootServiceInterface {
  name: string;
  description: string;
  type: string;
  price?: number;
  fatherServiceId?: string;
  image?: File;
}

export interface LinkListServicesInterface {
  id?: string;
  name?: string;
}
