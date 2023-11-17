import { Graph } from "@antv/x6";
import { scaleEventHandle, translateEventHandle } from "../types";

/**
 * 监听 画布移动
 * @param graph
 * @param handle
 */
export const translate = (graph: Graph, handle: translateEventHandle) => {
  graph.on("translate", handle);
};

/**
 * 监听 画布移动
 * @param graph
 * @param handle
 */
export const scale = (graph: Graph, handle: scaleEventHandle) => {
  graph.on("scale", handle);
};
