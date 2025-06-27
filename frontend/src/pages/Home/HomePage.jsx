import React from "react";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
import Section5 from "./sections/Section5";
import Section6 from "./sections/Section6";
import Section7 from "./sections/Section7";
import TestimonialSlider from "./sections/Section5";
import { store } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../store/authThunk/authThunk";
import { refreshToken } from "../../store/authThunk/authThunk";

const HomePage = () => {
  // const token = store.getState().auth.token;
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //     // const RefreshToken = async () => {
  //     //   const result = await dispatch(refreshToken()).unwrap();
  //     //   dispatch(setToken(result));
  //   }
  //   // RefreshToken();
  // }, []);
  // useEffect(() => {
  //   console.log("This Is The Token In UseEffect",token);
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);
  console.log("This Is The Token", token);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <TestimonialSlider />
      <Section6 />
      <Section7 />
    </div>
  );
};

export default HomePage;
