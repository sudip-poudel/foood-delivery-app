import React from "react";
import LeftPanel from "../components/Admin/LeftPanel";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Page404 from "./Page404";
import OrderPage from "./OrderPage";

const AdminPage = () => {
  const { auth } = useAuth();
  const role = auth?.user?.role;
  console.log(role);
  return role === "admin" ? (
    <div>
      <div>
        <LeftPanel />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  ) : (
    <Page404 />
  );
};

export default AdminPage;
