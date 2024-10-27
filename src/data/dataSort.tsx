import { BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { TbCalendarUp, TbCalendarDown } from "react-icons/tb";

export type DataSortType = {
  title: string;
  icon: React.ReactElement;
  value: {
    field: string;
    sort: string;
  };
};

export const dataSort = [
  {
    title: "Latest",
    icon: <TbCalendarUp size={20} />,
    value: { field: "createAt", sort: "desc" },
  },
  {
    title: "Oldest",
    icon: <TbCalendarDown size={20} />,
    value: { field: "createAt", sort: "asc" },
  },
  {
    title: "Price descending",
    icon: <BsSortDown size={20} />,
    value: { field: "regularPrice", sort: "desc" },
  },
  {
    title: "Price ascending",
    icon: <BsSortDownAlt size={20} />,
    value: { field: "regularPrice", sort: "asc" },
  },
];
