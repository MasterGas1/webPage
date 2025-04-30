"use client";

import { useContext, useEffect, useRef } from "react";
import SideMenu from "./components/SideMenu/SideMenu";

import { Context as AuthContext } from "@/context/AuthContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  const isRendered = useRef(false);

  const { getPermissions } = useContext(AuthContext);

  useEffect(() => {
    if (!isRendered.current) {
      isRendered.current = true;
      getPermissions();
    }
  }, []);
  return (
    <div className="flex flex-row min-h-screen max-h-screen min-w-screen max-w-screen">
      <SideMenu />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
