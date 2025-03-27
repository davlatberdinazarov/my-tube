import React, { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ComplexNavbar } from "../components/navbar";
import { $api } from "../utils";

export const MainContext = createContext();

export default function MainLayout() {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const fetchProfle = async () => {
    try {
      const response = await $api.get("/auth/profile");
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(profile);

  useEffect(() => {
    fetchProfle();
  }, [navigate]);

  const LogOut = () => {
    localStorage.clear();
    navigate("/login");
  };



  return (
    <MainContext.Provider value={{ LogOut, profile }}>
      <ComplexNavbar />
      <Outlet />
    </MainContext.Provider>
  );
}
