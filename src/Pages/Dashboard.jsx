import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <Header toggle={toggle} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <Outlet/>
    </>
  );
};

export default Dashboard;
