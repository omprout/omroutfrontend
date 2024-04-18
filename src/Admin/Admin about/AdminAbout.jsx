import React, { useEffect, useState } from "react";
import { fetchData } from "../../redux/slice/slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { ThreeDots } from "react-loader-spinner";
import "./AdminAbout.css";

const AdminAbout = () => {
  const dispatch = useDispatch();
  const adminAboutData = useSelector((state) => state.portfolio.data);
  const adminAboutLoading = useSelector((state) => state.portfolio.isLoading);

  // for input field
  const [Description, setDescription] = useState("");
  const [ImageSrc, setImageSrc] = useState("");
  const [Name, setName] = useState("");
  const [Dob, setDob] = useState("");
  const [Address, setAddress] = useState("");
  const [Zipcode, setZipcode] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [updateAlert, setUpdateAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (adminAboutLoading) {
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
    !adminAboutData ||
    !adminAboutData.about ||
    adminAboutData.about.length === 0
  ) {
    return <div className="about">No data available</div>;
  }

  const { address, description, dob, email, name, phone, zipcode } =
    adminAboutData.about[0];

  const src = adminAboutData.about[0].src;
  

  const Update = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/portfolio/update-about-data", {
        _id: adminAboutData.about[0]._id,
        description: Description || description,
        src: ImageSrc || src,
        name: Name || name,
        dob: Dob || dob,
        address: Address || address,
        zipcode: Zipcode || zipcode,
        email: Email || email,
        phone: Phone || phone,
      });
      if (response.data.success) {
        console.log("Data updated successfully");

        // Create an object with the updated data
        const updatedData = {
          description: Description || description,
          src: ImageSrc || src,
          name: Name || name,
          dob: Dob || dob,
          address: Address || address,
          zipcode: Zipcode || zipcode,
          email: Email || email,
          phone: Phone || phone,
        };

        // Update state variables with the new data
        setDescription(updatedData.description);
        setImageSrc(updatedData.src);
        setName(updatedData.name);
        setDob(updatedData.dob);
        setAddress(updatedData.address);
        setZipcode(updatedData.zipcode);
        setEmail(updatedData.email);
        setPhone(updatedData.phone);

        setUpdateAlert(true);
        setTimeout(() => {
          setUpdateAlert(false);
        }, 4000);
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="AdminAbout">
      
      <div className="inputItem">
        <label htmlFor="Description">
          Description:
          <input
            type="text"
            id="Description"
            value={Description || description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label htmlFor="Image Src">
          Image Src:
          <input
            type="text"
            id="Image Src"
            value={ImageSrc || src}
            onChange={(e) => setImageSrc(e.target.value)}
          />
        </label>
        <label htmlFor="Name">
          Name:
          <input
            type="text"
            id="Name"
            value={Name || name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="DOB">
          DOB:
          <input
            type="text"
            id="DOB"
            value={Dob || dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <label htmlFor="Address">
          Address:
          <input
            type="text"
            id="Address"
            value={Address || address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label htmlFor="Zipcode">
          Zipcode:
          <input
            type="text"
            id="Zipcode"
            value={Zipcode || zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </label>
        <label htmlFor="Email">
          Email:
          <input
            type="text"
            id="Email"
            value={Email || email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="Phone">
          Phone:
          <input
            type="text"
            id="Phone"
            value={Phone || phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <div>
          {updateAlert && (
            <Stack sx={{ width: "100%", marginTop: "1rem" }} spacing={2}>
              <Alert variant="filled" severity="success">
                About data updated successfully
              </Alert>
            </Stack>
          )}
        </div>
        <button onClick={Update}>Update</button>
      </div>
    </div>
  );
};

export default AdminAbout;
