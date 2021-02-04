import { format } from "date-fns";

const getRightDataFormat = (date) => {
  if (date === "") {
    return "Release date unknown";
  }
  return format(new Date(date), "LLLL d, yyyy");
};

export default getRightDataFormat;
