import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import VideoList from "./components/video-list";
import Home from "./components/home";
import AppLayout from "./layouts/AppLayout";
import Login from "./components/login";
import Register from "./components/register";
import MainLayout from "./layouts/MainLayout";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path="videos" element={<VideoList />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
