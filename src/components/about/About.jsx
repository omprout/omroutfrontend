import React, { useEffect } from "react";
import "./About.css";
import { FaHeadphones } from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { MdOutlineSportsCricket } from "react-icons/md";
import { fetchData } from "../../redux/slice/slice";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

const About = () => {
  const dispatch = useDispatch();
  const aboutData = useSelector((state) => state.portfolio.data);
  const isLoader = useSelector((state) => state.portfolio.isLoading);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoader === true) {
    return (
      <div className="about2">
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

  if (!aboutData || !aboutData.about || aboutData.about.length === 0) {
    return <div className="about">No data available</div>;
    
  }

  const { src, address, description, dob, email, name, phone, zipcode } =
    aboutData.about[0];
  return (
    <div className="about">
      <div className="profile_image">
        <img className="avatar" src={src} alt="ProfileImage" />
      </div>

      <div className="bio">
        <p>MY INTRO</p>
        <h1>About Me</h1>
        <p style={{ textAlign: "center" }} >{description}</p>
        <ul>
          <li>
            <span>Name:</span>
            {name}
          </li>
          <li>
            <span>Date of birth:</span>
            {dob}
          </li>
          <li>
            <span>Address:</span>
            {address}
          </li>
          <li>
            <span>Zip code:</span>
            {zipcode}
          </li>
          <li>
            <span>Email:</span>
            {email}
          </li>
          <li>
            <span>Phone:</span>
            {phone}
          </li>
        </ul>
        <div className="hubby">
          <div className="hubbyOne">
            <div>
              <span>
                <FaHeadphones />
              </span>
              Music
            </div>
            <div>
              <span>
                <BiMoviePlay />
              </span>
              Movie
            </div>
          </div>
          <div className="hubbyTwo">
            <div>
              <span>
                <MdCardTravel />
              </span>
              Travel
            </div>
            <div>
              <span>
                <MdOutlineSportsCricket />
              </span>
              Sports
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
