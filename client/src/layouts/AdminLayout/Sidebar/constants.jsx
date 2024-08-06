import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { LuFileType2 } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { FaFirstOrderAlt } from "react-icons/fa";
import { FaCommentsDollar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

import { ROUTES } from "../../../constants/routes";

export const SIDE_BAR_ITEM = [
  {
    name: "Dashboard",
    icon: <MdOutlineDashboardCustomize />,
    path: ROUTES.ADMIN.DASHBOARD,
  },
  {
    name: "Category",
    icon: <TbCategory />,
    path: ROUTES.ADMIN.CATEGORY_LIST,
  },
  {
    name: "Types",
    icon: <LuFileType2 />,
    path: ROUTES.ADMIN.TYPE_LIST,
  },
  {
    name: "Products",
    icon: <AiFillProduct />,
    path: ROUTES.ADMIN.PRODUCT_LIST,
  },
  {
    name: "Orders",
    icon: <FaFirstOrderAlt />,
    path: ROUTES.ADMIN.ORDER_MANAGE,
  },
  {
    name: "Comments",
    icon: <FaCommentsDollar />,
    path: ROUTES.ADMIN.COMMENT_MANAGE,
  },
  {
    name: "Accounts",
    icon: <FaUsers />,
    path: ROUTES.ADMIN.USER_MANAGE,
  },
];
