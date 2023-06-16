import {
  AiFillCloseCircle,
  AiOutlineFundProjectionScreen,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { CgMenuLeftAlt } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { BsCloudDrizzle } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import {
  MdOutlineFavoriteBorder,
  MdProductionQuantityLimits,
} from "react-icons/md";
const Icons = {
  close: AiFillCloseCircle,
  menu: <CgMenuLeftAlt className="w-7 h-7 cursor-pointer text-green-800" />,
  dashboard: <RxDashboard className="w-5 h-5   cursor-pointer" />,
  product: <MdProductionQuantityLimits className="w-5 h-5   cursor-pointer" />,
  toBuy: <AiOutlineFundProjectionScreen className="w-5 h-5   cursor-pointer" />,
  order: <MdOutlineFavoriteBorder className="w-5 h-5   cursor-pointer" />,
  sales: <BsCloudDrizzle className="w-5 h-5   cursor-pointer" />,
  team: <CiStar className="w-5 h-5   cursor-pointer" />,
  profile: <AiOutlineUser className="w-5 h-5   cursor-pointer" />,
  logout: <AiOutlineLogout className="w-5 h-5   cursor-pointer" />,
};
export default Icons;
