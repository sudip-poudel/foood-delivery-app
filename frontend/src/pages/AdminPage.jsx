import React from "react";
import LeftPanel from "../components/Admin/LeftPanel";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <div>
        <LeftPanel />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminPage;
