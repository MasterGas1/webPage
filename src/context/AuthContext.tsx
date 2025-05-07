import { Dispatch } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

import dbApi from "@/api/DbApi";

import dataContext from "./dataContext";
import { LoginInterface } from "@/interfaces/loginInterface";
import { UserResponseInterface } from "@/interfaces/userResponseInterface";
import { PermissionInterface } from "@/interfaces/permissionInterface";
import { ErrorResponseInterface } from "@/interfaces/errorResponse";

export interface AuthState {
  token: string | null;
  role: string | null;
  loading: boolean;
  errorMessage: string | null;
  permissions: PermissionInterface[];
  status: string | null;
}

export type AuthAction =
  | { type: "signin"; payload: { token: string; role: string; status: string } }
  | { type: "signout" }
  | { type: "getToken"; payload: { token: string } }
  | { type: "getPermissions"; payload: { permissions: PermissionInterface[] } }
  | { type: "loading" }
  | { type: "errorMessage"; payload: { errorMessage: string } };

type AuthContextProps = {
  state: AuthState;
  signin: (body: LoginInterface) => void;
  signout: () => void;
  getToken: () => void;
  getPermissions: () => void;
  errorMessage: (message: string) => void;
};

const authReduce = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "signin":
      return {
        ...prevState,
        token: action.payload.token,
        role: action.payload.role,
        errorMessage: null,
        loading: false,
        status: action.payload.status,
      };
    case "signout":
      return {
        token: null,
        role: null,
        errorMessage: null,
        loading: false,
        permissions: [],
        status: null,
      };
    case "getToken":
      return {
        ...prevState,
        token: action.payload.token,
      };
    case "getPermissions":
      return {
        ...prevState,
        permissions: action.payload.permissions,
      };
    case "loading":
      return {
        ...prevState,
        loading: true,
      };
    case "errorMessage":
      return {
        ...prevState,
        errorMessage: action.payload.errorMessage,
        loading: false,
      };
    default:
      return prevState;
  }
};

const signin =
  (dispatch: Dispatch<AuthAction>) => async (body: LoginInterface) => {
    try {
      dispatch({ type: "loading" });
      const { data } = await dbApi.post<UserResponseInterface>("/auth", body);
      Cookies.set("mg-23-token", data.token);
      dispatch({
        type: "signin",
        payload: { token: data.token, role: data.role, status: data.status },
      });
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
        dispatch({
          type: "errorMessage",
          payload: { errorMessage: error.response.data.message },
        });
      }
    }
  };

const signout = (dispatch: Dispatch<AuthAction>) => async () => {
  localStorage.removeItem("mg-23-token");
  dispatch({ type: "signout" });
};

const getToken = (dispaych: Dispatch<AuthAction>) => async () => {};

const getPermissions = (dispatch: Dispatch<AuthAction>) => async () => {
  try {
    const { data } = await dbApi.get<PermissionInterface[]>(
      "/permission/findOneByRoleByToken"
    );

    dispatch({ type: "getPermissions", payload: { permissions: data } });
  } catch (error: any) {
    if (axios.isAxiosError<ErrorResponseInterface>(error)) {
      console.log(error.response?.data.message);
      window.location.href = "/login-manager";
    }
  }
};

export const { Provider, Context } = dataContext<AuthContextProps>(
  authReduce,
  {
    signin,
    signout,
    getToken,
    getPermissions,
  },
  {
    token: null,
    role: null,
    errorMessage: null,
    loading: false,
    permissions: [],
    status: null,
  }
);
