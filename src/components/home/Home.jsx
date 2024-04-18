import React, { useEffect } from "react";
import "./Home.css";
import "../../loader/loader.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slice/slice";
import {ThreeDots } from "react-loader-spinner";

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.portfolio.isLoading);
  const homeData = useSelector((state) => state.portfolio.data);
  console.log(homeData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);



  if (isLoading ) {
    return (
      <div className="home">
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

  if (!homeData || !homeData.home || homeData.home.length === 0) {
    return <div className="home">No data available</div>;
  }

  const { description, profession } = homeData.home[0];
  console.log(description);

  return (
    <div className="home">
      <div className="profession">
        <p>{profession}</p>
        <h1 dangerouslySetInnerHTML={{ __html: description }}></h1>
      </div>
    </div>
  );
};

export default Home;
