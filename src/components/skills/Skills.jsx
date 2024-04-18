import React, { useEffect } from "react";
import "./Skills.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slice/slice";
import { ThreeDots } from "react-loader-spinner";

const Skills = () => {
  const dispatch = useDispatch();
  const skillData = useSelector((state) => state.portfolio.data);
  const isLoader = useSelector((state) => state.portfolio.isLoading);
console.log(skillData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  
  if (isLoader === true) {
    return (
      <div className="skills2">
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

  if (!skillData || !skillData.skill || skillData.skill.length === 0) {
    return <div className="skills2">No data available</div>;
}

  const { description } = skillData.skill[0];
  console.log(description)

  return (
    <div className="skills">
      <div className="skillsHeading">
        <span className="subHeading">SKILLS</span>
        <h2 className="heading">My Skills</h2>
        <p className="skillsParagraph">{description}</p>
      </div>
      {/* ************************************* */}
      <div className="mainTable">
        <div className="skillsTable1">
          <div className="Table one">
            <h2>HTML</h2>
            <div className="progressbar">
              <div className="percent">95%</div>
            </div>
          </div>
          <div className="Table two">
            <h2>CSS</h2>
            <div className="progressbar">
              <div className="percent">90%</div>
            </div>
          </div>
          <div className="Table three">
            <h2>React</h2>
            <div className="progressbar">
              <div className="percent">70%</div>
            </div>
          </div>
        </div>
        <div className="skillsTable2">
          <div className="Table four">
            <h2>Node</h2>
            <div className="progressbar">
              <div className="percent">75%</div>
            </div>
          </div>
          <div className="Table five">
            <h2>Express</h2>
            <div className="progressbar">
              <div className="percent">80%</div>
            </div>
          </div>
          <div className="Table six">
            <h2>MongoDB</h2>
            <div className="progressbar">
              <div className="percent">85%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
