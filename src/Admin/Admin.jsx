import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import "./Admin.css";
import AdminAbout from "./Admin about/AdminAbout";
import AdminContact from "./Admin contact/AdminContact";
import AdminHome from "./Admin Home/AdminHome";
import AdminSkill from "./Admin skill/AdminSkill";
import AdminProject from "./Admin project/AdminProject";

function Admin() {
  const [value, setValue] = useState("1");
  const [logoutTimer, setLogoutTimer] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    // Set initial logout timer when component mounts
    setLogoutTimer(setTimeout(handleLogout,120000)); // 2 minute

    // Event listeners for user activity to reset timer
    const resetTimer = () => {
      clearTimeout(logoutTimer);
      setLogoutTimer(setTimeout(handleLogout, 120000)); // Reset timer to 2 minute
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Event listener for beforeunload event to handle refresh/logout
    const handleBeforeUnload = (event) => {
      localStorage.removeItem("token");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listeners and timer on component unmount
    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [logoutTimer]);

  useEffect(() => {
    // Redirect to login page if token is not present
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="admin">
      <div className="admin-tabs-container">
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            variant="scrollable" // Enable scrolling
            scrollButtons="auto" // Show scroll buttons when tabs overflow
          >
            <Tab value="1" label="Home" />
            <Tab value="2" label="About" />
            <Tab value="3" label="Skill" />
            <Tab value="4" label="Project" />
            <Tab value="5" label="Contact" />
            <Tab value="6" onClick={handleLogout} label="Logout" sx={{ color: 'red' }} />
          </Tabs>
        </TabContext>
      </div>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <TabPanel value="1"><AdminHome /></TabPanel>
          <TabPanel value="2"><AdminAbout /></TabPanel>
          <TabPanel value="3"><AdminSkill /></TabPanel>
          <TabPanel value="4"><AdminProject /></TabPanel>
          <TabPanel value="5"><AdminContact /></TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Admin;
