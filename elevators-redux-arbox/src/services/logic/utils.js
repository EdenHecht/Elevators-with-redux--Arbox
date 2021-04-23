export const getFloorName = (floorNumber) => {
  switch (floorNumber) {
    case 0:
      return "Ground Floor";
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";

    default:
      return `${floorNumber}th`;
  }
};
