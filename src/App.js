import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer";
import Skills from "./components/skills/Skills.jsx";
import Projects from "./components/projects/Project.jsx";
import "./App.css";
import Contact from "./components/contact/Contact.jsx";
import Admin from "./Admin/Admin.jsx";
import { ThreeDots } from "react-loader-spinner";
import Login from "./Login/Login.jsx";
import Error404 from "./components/ErrorPage/Error404.js";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });


  
  return (
    <div>
      {loading ? (
        <div className="app">
          {" "}
          <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#fff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        </div>
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Skills" element={<Skills />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
