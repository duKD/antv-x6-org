import { Node } from "@antv/x6";
import { addNode } from "../lib/graph";

// 是否初始化 Graph
export const isInitGraphKey = Symbol("graph");

// 元素添加的位置
export const initPositionKey = Symbol("position");

// 初始化 元素添加的位置
export const initPosition = {
  x: 40,
  y: 40,
};

/**
 * 定义画布位移和 缩放比
 * x 轴偏移量
 * y 轴偏移量
 * scale 缩放比
 */
export type graphPositionType = {
  x: number;
  y: number;
  scale: number;
};

type entitiesType =
  | Node.Definition
  | (Node.Config & {
      inherit?: string | Node.Definition | undefined;
    });

export type registerNode = {
  node: entitiesType;
  name: string;
};

export type translateEventHandle = (args: { tx: number; ty: number }) => void;

export type scaleEventHandle = (args: { sx: number; sy: number }) => void;

//自定义 节点 相关类型
export namespace NodeConfig {
  export enum shape {
    CUSTOMRECT = "custom-rect",
    CUSTOMCIRCLE = "custom-circle",
    CUSTOMDIAMOND = "custom-diamond",
    CUSTOMIMAGE = "custom-image",
    CUSTOMTEXT = "custom-text",
  }

  export type addNodeOptions = {
    x: number;
    y: number;
    imageUrl?: string;
  };
}
