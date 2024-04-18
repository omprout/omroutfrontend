import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const AdminLogin = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handlegmailChange = (e) => {
    setGmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("https://omroutbackend.onrender.com/api/portfolio/login", {
        gmail,
        password,
      });
      setLoading(false);
      if (response.data.success) {
        alert(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data)); // store only the token
        window.location.href = "/admin";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again later."); // generic error message
    }
  };

  if (loading) {
    return (
      <div
        className="adminLoading"
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
        }}
      >
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#344555"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="Gmail">
          Gmail:
          <input type="email" value={gmail} onChange={handlegmailChange} />
        </label>
        <label htmlFor="Password">
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit" style={{ margin: "auto", width: "100%" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
