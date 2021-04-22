import React, { useState, useEffect } from "react";

export const useElevator = (initialValue) => {
  const [elevators, setElevators] = useState(initialValue);
  const [isElevatorsUpdating, setIsElevatorsUpdating] = useState(false);

  useEffect(() => {
    setIsElevatorsUpdating(false);
  }, [elevators]);

  const updateElevators = (newValue) => {
    if (!isElevatorsUpdating) {
      setIsElevatorsUpdating(true);
      setElevators(newValue);
    }
  };

  return [elevators, updateElevators];
};
