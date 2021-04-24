import React from "react";
import { useSelector } from "react-redux";
import Settings from "../settings/Settings";
import Building from "../building/Building";

const Home = () => {
  const isSet = useSelector((state) => state.isSet);

  return <>{isSet ? <Building /> : <Settings />}</>;
};

export default Home;
