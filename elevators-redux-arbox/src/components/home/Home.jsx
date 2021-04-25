import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Settings from "../settings/Settings";
import Building from "../building/Building";
import { initBaseComponents } from "../../redux/actions";

const Home = () => {
  const isSet = useSelector((state) => state.isSet);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSet) dispatch(initBaseComponents());
  }, [isSet]);

  return <>{isSet ? <Building /> : <Settings />}</>;
};

export default Home;
