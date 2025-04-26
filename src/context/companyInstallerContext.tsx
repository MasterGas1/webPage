import { Dispatch } from "react";

import dbApi from "@/api/DbApi";

import dataContext from "./dataContext";

import { companyInstallerResponseInterface } from "@/interfaces/companyInstallerInterface";
import axios from "axios";
import { ErrorResponseInterface } from "@/interfaces/errorResponse";

export interface CompanyInstallerState {
  companyInstallersActive: companyInstallerResponseInterface[];
  companyInstallersApproved: companyInstallerResponseInterface[];
  companyInstallersPending: companyInstallerResponseInterface[];
  companyInstallersRejected: companyInstallerResponseInterface[];
  companyInstaller: companyInstallerResponseInterface | null;
  loading: boolean;
  errorMessage: string | null;
}

type Status = "pending" | "approved" | "rejected" | "blocked" | "active";

export type InstallerAction =
  | {
      type: "getCompanyInstallersActive";
      payload: { companyInstallers: companyInstallerResponseInterface[] };
    }
  | {
      type: "getCompanyInstallersApproved";
      payload: { companyInstallers: companyInstallerResponseInterface[] };
    }
  | {
      type: "getCompanyInstallersPending";
      payload: { companyInstallers: companyInstallerResponseInterface[] };
    }
  | {
      type: "getCompanyInstallersRejected";
      payload: { companyInstallers: companyInstallerResponseInterface[] };
    }
  | {
      type: "getCompanyInstaller";
      payload: { companyInstaller: companyInstallerResponseInterface };
    }
  | { type: "clearInstaller" }
  | { type: "clearInstaller" }
  | { type: "loading" }
  | { type: "errorMessage"; payload: { errorMessage: string } };

type InstallerContextProps = {
  state: CompanyInstallerState;
  getCompanyInstallers: (status: string) => void;
  getInstaller: (id: string) => void;
  changeStatus: (id: string, status: string) => void;
};

const installerReduce = (
  prevState: CompanyInstallerState,
  action: InstallerAction
): CompanyInstallerState => {
  switch (action.type) {
    case "getCompanyInstallersActive":
      return {
        ...prevState,
        companyInstallersActive: action.payload.companyInstallers,
        errorMessage: null,
        loading: false,
      };
    case "getCompanyInstallersApproved":
      return {
        ...prevState,
        companyInstallersApproved: action.payload.companyInstallers,
        errorMessage: null,
        loading: false,
      };
    case "getCompanyInstallersPending":
      return {
        ...prevState,
        companyInstallersPending: action.payload.companyInstallers,
        errorMessage: null,
        loading: false,
      };
    case "getCompanyInstallersRejected":
      return {
        ...prevState,
        companyInstallersRejected: action.payload.companyInstallers,
        errorMessage: null,
        loading: false,
      };
    case "getCompanyInstaller":
      return {
        ...prevState,
        errorMessage: null,
        companyInstaller: action.payload.companyInstaller,
      };
    case "clearInstaller":
      return {
        ...prevState,
        companyInstaller: null,
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

const getCompanyInstallers =
  (dispatch: Dispatch<InstallerAction>) => async (status: Status) => {
    try {
      dispatch({ type: "loading" });

      const { data } = await dbApi.get<companyInstallerResponseInterface[]>(
        "/company-installer",
        {
          params: {
            status,
          },
        }
      );

      if (status === "approved") {
        dispatch({
          type: "getCompanyInstallersApproved",
          payload: { companyInstallers: data },
        });
      } else if (status === "pending") {
        dispatch({
          type: "getCompanyInstallersPending",
          payload: { companyInstallers: data },
        });
      } else if (status === "active") {
        dispatch({
          type: "getCompanyInstallersActive",
          payload: { companyInstallers: data },
        });
      } else if (status === "rejected") {
        dispatch({
          type: "getCompanyInstallersRejected",
          payload: { companyInstallers: data },
        });
      }
    } catch (error: any) {
      if (axios.isAxiosError<ErrorResponseInterface>(error)) {
        console.log(error.response?.data.message);
      }
    }
  };

const getInstaller =
  (dispatch: Dispatch<InstallerAction>) => async (id: string) => {
    try {
      const { data } = await dbApi.get<companyInstallerResponseInterface>(
        `/company-installer/${id}`
      );
      dispatch({
        type: "getCompanyInstaller",
        payload: { companyInstaller: data },
      });
    } catch (error: any) {
      if (error.response.data.message) {
      }
    }
  };

const changeStatus =
  (dispatch: Dispatch<InstallerAction>) =>
  async (id: string, status: string) => {
    try {
      await dbApi.put<companyInstallerResponseInterface>(
        `/company-installer/status/${id}`,
        {
          status,
        }
      );
      getCompanyInstallers(dispatch)("approved");
      getCompanyInstallers(dispatch)("pending");
      getCompanyInstallers(dispatch)("rejected");
      dispatch({ type: "clearInstaller" });
    } catch (error: any) {
      if (error.response.data.message) {
      }
    }
  };

export const { Provider, Context } = dataContext<InstallerContextProps>(
  installerReduce,
  {
    getCompanyInstallers,
    getInstaller,
    changeStatus,
  },
  {
    companyInstallersActive: [],
    companyInstallersApproved: [],
    companyInstallersPending: [],
    companyInstallersRejected: [],
    companyInstaller: null,
    loading: false,
    errorMessage: null,
  }
);
