import React, { useEffect, useState } from "react";
import { fetchData } from "../../redux/slice/slice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// import "./AdminHome.css";

const AdminHome = () => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [websiteInput, setwebsiteInput] = useState("");
  const [emailIDInput, setemailIDInput] = useState("");
  const [addressInput, setaddressInput] = useState("");
  const [phoneInput, setphoneInput] = useState("");
  const [updateAlert, setUpdateAlert] = useState(false);

  const dispatch = useDispatch();
  const adminContactData = useSelector((state) => state.portfolio.data);
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
    !adminContactData ||
    !adminContactData.contact ||
    adminContactData.contact.length === 0
  ) {
    return <div className="about">No data available</div>;
  }

  // Unconditionally declare state variables

  const update = async () => {
    try {
      const response = await axios.post("https://omroutbackend.onrender.com/api/portfolio/update-contact-data", {
        _id: adminContactData.contact[0]._id,
        description: descriptionInput,
        website: websiteInput,
        emailID: emailIDInput,
        address: addressInput,
        phone:phoneInput
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

  const { description, website,emailID,address,phone } = adminContactData.contact[0];
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
      <label
        htmlFor="Website"
        style={{ display: "flex", flexDirection: "column",gap:"0.5rem" }}
      >
        Website:
        <input
          type="text"
          id="Website"
          placeholder="Website"
          value={websiteInput || website}
          onChange={(e) => setwebsiteInput(e.target.value)}
        />
      </label>
      <label
        htmlFor="emailID"
        style={{ display: "flex", flexDirection: "column",gap:"0.5rem" }}
      >
        EmailID:
        <input
          type="text"
          id="emailID"
          placeholder="emailID"
          value={emailIDInput || emailID}
          onChange={(e) => setemailIDInput(e.target.value)}
        />
      </label>
      <label
        htmlFor="Address"
        style={{ display: "flex", flexDirection: "column",gap:"0.5rem" }}
      >
        Address:
        <input
          type="text"
          id="Address"
          placeholder="address"
          value={addressInput || address}
          onChange={(e) => setaddressInput(e.target.value)}
        />
      </label>
      <label
        htmlFor="Phone"
        style={{ display: "flex", flexDirection: "column",gap:"0.5rem" }}
      >
        Phone:
        <input
          type="text"
          id="Phone"
          placeholder="phone"
          value={phoneInput || phone}
          onChange={(e) => setphoneInput(e.target.value)}
        />
      </label>
      <div>
        {updateAlert && (
          <Stack sx={{ width: "100%" ,marginTop:"1rem"}} spacing={2}>
            <Alert variant="filled" severity="success">
              Contact data updated successfully
            </Alert>
          </Stack>
        )}
      </div>
      
      <button onClick={update} style={{marginTop:"1rem"}}>Update</button>
    </div>
  );
};

export default AdminHome;
