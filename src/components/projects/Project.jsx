import React, { useEffect } from "react";
import "./Project.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slice/slice";
import { ThreeDots } from "react-loader-spinner";

// Import your default image
import defaultImage from "../../../src/image/project image.jpg";

const Project = () => {
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.portfolio.data);
  const projectLoader = useSelector((state) => state.portfolio.isLoading);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (projectLoader === true) {
    return (
      <div className="project2">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#ffff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (!projectData || !projectData.project || projectData.project.length === 0) {
    return <div className="project2">No data available</div>;
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
  } = projectData.project[0];

  return (
    <div className="project">
      <div className="headerPart">
        <span className="subHeading">ACCOMPLISHMENTS</span>
        <h2 className="heading">My Projects</h2>
        <p className="projectParagraph">{description}</p>
      </div>
      {/* ########################################## */}
      <div className="projects">
        <div className="projectsOne">
          <div className="projectOne">
            <img src={img1 || defaultImage} alt={projname1} />
            <a className="anchor" href={link1}>
              {projname1}
            </a>
          </div>
          <div className="projectTwo">
            <img src={img2 || defaultImage} alt={projname2} />
            <a className="anchor" href={link2}>
              {projname2}
            </a>
          </div>
          <div className="projectThree">
            <img src={img3 || defaultImage} alt={projname3} />
            <a className="anchor" href={link3}>
              {projname3}
            </a>
          </div>
          <div className="projectFour">
            <img src={img4 || defaultImage} alt={projname4} />
            <a className="anchor" href={link4}>
              {projname4}
            </a>
          </div>
        </div>

        <div className="projectsTwo">
          <div className="projectFive">
            <img src={img5 || defaultImage} alt={projname5} />
            <a className="anchor" href={link5}>
              {projname5}
            </a>
          </div>
          <div className="projectSix">
            <img src={img6 || defaultImage} alt={projname6} />
            <a className="anchor" href={link6}>
              {projname6}
            </a>
          </div>
          <div className="projectSeven">
            <img src={img7 || defaultImage} alt={projname7} />
            <a className="anchor" href={link7}>
              {projname7}
            </a>
          </div>
          <div className="projectEight">
            <img src={img8 || defaultImage} alt={projname8} />
            <a className="anchor" href={link8}>
              {projname8}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
