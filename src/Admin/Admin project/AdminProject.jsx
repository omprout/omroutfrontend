import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slice/slice";
import { ThreeDots } from "react-loader-spinner";
import "./adminProject.css";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const AdminProject = () => {
  const dispatch = useDispatch();
  const ProjectData = useSelector((state) => state.portfolio.data);
  const loader = useSelector((state) => state.portfolio.isLoading);
  // const error = useSelector((state) => state.portfolio.isError);

  const [Description, setDescription] = useState("");
  const [Link1,setLink1] = useState("");
  const [Link2,setLink2] = useState("");
  const [Link3,setLink3] = useState("");
  const [Link4,setLink4] = useState("");
  const [Link5,setLink5] = useState("");
  const [Link6,setLink6] = useState("");
  const [Link7,setLink7] = useState("");
  const [Link8,setLink8] = useState("");
  const [Img1,setImg1] = useState("");
  const [Img2,setImg2] = useState("");
  const [Img3,setImg3] = useState("");
  const [Img4,setImg4] = useState("");
  const [Img5,setImg5] = useState("");
  const [Img6,setImg6] = useState("");
  const [Img7,setImg7] = useState("");
  const [Img8,setImg8] = useState("");
  const [Projname1,setProjname1] = useState("");
  const [Projname2,setProjname2] = useState("");
  const [Projname3,setProjname3] = useState("");
  const [Projname4,setProjname4] = useState("");
  const [Projname5,setProjname5] = useState("");
  const [Projname6,setProjname6] = useState("");
  const [Projname7,setProjname7] = useState("");
  const [Projname8,setProjname8] = useState("");
  const [UpdateAlert, setUpdateAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loader || !ProjectData) {
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
    !ProjectData ||
    !ProjectData.project ||
    ProjectData.project.length === 0
  ) {
    return <div className="about">No data available</div>;
  }

  const {
    description,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    projname1,
    projname2,
    projname3,
    projname4,
    projname5,
    projname6,
    projname7,
    projname8,
    link1,
    link2,
    link3,
    link4,
    link5,
    link6,
    link7,
    link8,
  } = ProjectData.project[0];

  const Update = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://omroutbackend.onrender.com/api/portfolio/update-project-data", {
        _id: ProjectData.project[0]._id,
        description: Description,
        link1: Link1,
        link2: Link2,
        link3: Link3,
        link4: Link4,
        link5: Link5,
        link6: Link6,
        link7: Link7,
        link8: Link8,
        img1:Img1,
        img2:Img2,
        img3:Img3,
        img4:Img4,
        img5:Img5,
        img6:Img6,
        img7:Img7,
        img8: Img8,
        projname1:Projname1,
        projname2:Projname2,
        projname3:Projname3,
        projname4:Projname4,
        projname5:Projname5,
        projname6:Projname6,
        projname7:Projname7,
        projname8:Projname8,
      });
      console.log("Response:", response); 
      if (response.data.success) {
        console.log("Data updated successfully");
        setUpdateAlert(true);
        setTimeout(() => {
          setUpdateAlert(false);
        }, 4000);
      }
    } catch (error) {
      console.error("Error",error)
    }
  }

  return (
    <div className="adminProject">
      <label htmlFor="Description">
        Description:
        <input
          type="text"
          id="Description"
          value={Description||description}
          onChange={(e) =>setDescription (e.target.value)}
        ></input>
      </label>

      <div className="mainparent">
        <div className="parent1">
          <div className="child1">
            {" "}
            <label htmlFor="Image1">
              Image1:{" "}
              <input
                type="text"
                id="Image1"
                value={Img1||img1}
                onChange={(e) =>setImg1(e.target.value) }
              ></input>
            </label>
            <label htmlFor="Link1">
              Link1:
              <input
                type="text"
                id="Link1"
                value={Link1||link1}
                onChange={(e) =>setLink1(e.target.value) }
              ></input>
            </label>
            <label htmlFor="ProjectName1">
              Project Name1:
              <input
                type="text"
                id="ProjectName1"
                value={Projname1||projname1}
                onChange={(e) =>setProjname1 (e.target.value)}
              ></input>
            </label>
          </div>
          <div className="child2">
            {" "}
            <label htmlFor="Image2">
              Image2:
              <input
                type="text"
                id="Image2"
                value={Img2||img2}
                onChange={(e) =>setImg2 (e.target.value)}
              ></input>
            </label>
            <label htmlFor="Link2">
              Link2:
              <input
                type="text"
                id="Link2"
                value={Link2||link2}
                onChange={(e) =>setLink2 (e.target.value)}
              ></input>
            </label>
            <label htmlFor="ProjectName2">
              Project Name2:
              <input
                type="text"
                id="ProjectName2"
                value={Projname2||projname2}
                onChange={(e) => setProjname2 (e.target.value)}
              ></input>
            </label>
          </div>
          <div className="child3">
            {" "}
            <label htmlFor="Image3">
              Image3:
              <input
                type="text"
                id="Image3"
                value={Img3||img3}
                onChange={(e) => setImg3(e.target.value)}
              ></input>
            </label>
            <label htmlFor="Link3">
              Link3:
              <input
                type="text"
                id="Link3"
                value={Link3||link3}
                onChange={(e) =>setLink3 (e.target.value)}
              ></input>
            </label>
            <label htmlFor="ProjectName3">
              Project Name3:
              <input
                type="text"
                id="ProjectName3"
                value={Projname3||projname3}
                onChange={(e) => setProjname3 (e.target.value)}
              ></input>
            </label>
          </div>
          <div className="child4">
            {" "}
            <label htmlFor="Image4">
              Image4:
              <input
                type="text"
                id="Image4"
                value={Img4||img4}
                onChange={(e) =>setImg4 (e.target.value)}
              ></input>
            </label>
            <label htmlFor="Link4">
              Link4:
              <input
                type="text"
                id="Link4"
                value={Link4||link4}
                onChange={(e) =>setLink4( e.target.value)}
              ></input>
            </label>
            <label htmlFor="ProjectName4">
              Project Name4:
              <input
                type="text"
                id="ProjectName4"
                value={Projname4||projname4}
                onChange={(e) => setProjname4 (e.target.value)}
              ></input>
            </label>
          </div>
        </div>
        <div className="parent2">
          <div className="child5">
            {" "}
            <label htmlFor="Image5">
              Image5:
              <input
                type="text"
                id="Image5"
                value={Img5||img5}
                onChange={(e) =>setImg5 (e.target.value)}
              ></input>
            </label>
            <label htmlFor="Link5">
              Link5:
              <input
                type="text"
                id="Link5"
                value={Link5||link5}
                onChange={(e) =>setLink5 (e.target.value)}
              ></input>
            </label>
            <label htmlFor="ProjectName5">
              Project Name5:
              <input
                type="text"
                id="ProjectName5"
                value={Projname5||projname5}
                onChange={(e) => setProjname5 (e.target.value)}
              ></input>
            </label>
          </div>
          <div className="child6">
            {" "}
            <label htmlFor="Image6">
              Image6:
              <input
                type="text"
                id="Image6"
                value={Img6||img6}
                onChange={(e) => setImg6(e.target.value)}
              ></input>
            </label>
            <label htmlFor="Link6">
              Link6:
              <input
                type="text"
                id="Link6"
                value={Link6||link6}
                onChange={(e) =>setLink6 (e.target.value)}
              ></input>
            </label>
            <label htmlFor="ProjectName6">
              Project Name6:
              <input
                type="text"
                id="ProjectName6"
                value={Projname6||projname6}
                onChange={(e) => setProjname6 (e.target.value)}
              ></input>
            </label>
          </div>
          <div className="child7">
            {" "}
            <label htmlFor="Image7">
              Image7:
              <input
                type="text"
                id="Image7"
                value={Img7||img7}
                onChange={(e) => setImg7(e.target.value)}
              ></input>
            </label>
            <label htmlFor="Link7">
              Link7:
              <input
                type="text"
                id="Link7"
                value={Link7||link7}
                onChange={(e) =>setLink7 (e.target.value)}
              ></input>
            </label>
            <label htmlFor="ProjectName7">
              Project Name7:
              <input
                type="text"
                id="ProjectName7"
                value={Projname7||projname7}
                onChange={(e) =>setProjname7 (e.target.value)}
              ></input>
            </label>
          </div>
          <div className="child8">
            {" "}
            <label htmlFor="Image8">
              Image8:
              <input
                type="text"
                id="Image8"
                value={Img8||img8}
                onChange={(e) => setImg8(e.target.value)}
              ></input>
            </label>
            <label htmlFor="Link8">
              Link8:
              <input
                type="text"
                id="Link8"
                value={Link8||link8}
                onChange={(e) =>setLink8 (e.target.value)}
              ></input>
            </label>
            <label htmlFor="ProjectName8">
              Project Name8:
              <input
                type="text"
                id="ProjectName8"
                value={Projname8||projname8}
                onChange={(e) => setProjname8 (e.target.value)}
              ></input>
            </label>
          </div>
        </div>
      </div>
      <div>
        {UpdateAlert && (
          <Stack sx={{ width: "100%" ,marginTop:"1rem"}} spacing={2}>
            <Alert variant="filled" severity="success">
              Project data updated successfully
            </Alert>
          </Stack>
        )}
      </div>
      <button onClick={Update}>Update</button>
    </div>
  );
};

export default AdminProject;
