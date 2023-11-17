import rect from "./svg/rect.svg";
import circle from "./svg/circle.svg";
import diamond from "./svg/diamond.svg";
import text from "./svg/text.svg";
import db from "./image/db.png";
import yun from "./image/yun.png";
import { NodeConfig } from "../types";

export const commonList: Array<{
  id: NodeConfig.shape;
  shape: string;
  component: any;
}> = [
  {
    id: NodeConfig.shape.CUSTOMTEXT,
    shape: "text",
    component: text,
  },
  {
    id: NodeConfig.shape.CUSTOMRECT,
    shape: "rect",
    component: rect,
  },
  {
    id: NodeConfig.shape.CUSTOMCIRCLE,
    shape: "circle",
    component: circle,
  },
  {
    id: NodeConfig.shape.CUSTOMDIAMOND,
    shape: "diamond",
    component: diamond,
  },
];

export const imageList: Array<{
  id: NodeConfig.shape;
  shape: string;
  image: string;
}> = [
  {
    id: NodeConfig.shape.CUSTOMIMAGE,
    shape: "db",
    image: db,
  },
  {
    id: NodeConfig.shape.CUSTOMIMAGE,
    shape: "yun",
    image: yun,
  },
];
