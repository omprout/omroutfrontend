import React, { useEffect, useState } from "react";
import { fetchData } from "../../redux/slice/slice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./AdminHome.css";

const AdminHome = () => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [professionInput, setProfessionInput] = useState("");
  const [updateAlert, setUpdateAlert] = useState(false);

  const dispatch = useDispatch();
  const adminHomeData = useSelector((state) => state.portfolio.data);
  const adminHomeLoading = useSelector((state) => state.portfolio.isLoading);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (adminHomeLoading) {
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

  if (
    !adminHomeData ||
    !adminHomeData.home ||
    adminHomeData.home.length === 0
  ) {
    return <div className="about">No data available</div>;
  }

  // Unconditionally declare state variables

  const update = async () => {
    try {
      const response = await axios.post("https://omroutbackend.onrender.com/api/portfolio/update-portfolio-data", {
        _id: adminHomeData.home[0]._id,
        description: descriptionInput,
        profession: professionInput,
      });
      if (response.data.success) {
        setUpdateAlert(true);
        setTimeout(() => {
          setUpdateAlert(false);
        }, 4000);
        console.log("Data updated successfully");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { description, profession } = adminHomeData.home[0];
  return (
    <div
      style={{
        height: "70vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <label
        htmlFor="Profession"
        style={{ display: "flex", flexDirection: "column",gap:"0.5rem" }}
      >
        Profession:
        <input
          type="text"
          id="Profession"
          placeholder="Profession"
          value={professionInput || profession}
          onChange={(e) => setProfessionInput(e.target.value)}
        />
      </label>
      <label
        htmlFor="Description"
        style={{ display: "flex", flexDirection: "column",marginBottom:"1rem",gap:"0.5rem" }}
      >
        Description:
        <input
          type="text"
          id="Description"
          placeholder="Description"
          value={descriptionInput || description}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
      </label>
      <div>
        {updateAlert && (
          <Stack sx={{ width: "100%" ,marginTop:"1rem"}} spacing={2}>
            <Alert variant="filled" severity="success">
              Home data updated successfully
            </Alert>
          </Stack>
        )}
      </div>
      
      <button onClick={update} style={{marginTop:"1rem"}}>Update</button>
    </div>
  );
};

export default AdminHome;
