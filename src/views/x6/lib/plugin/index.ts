import { Graph } from "@antv/x6";
import useKeyboardPlugin from "./keyboard";
import useSelectionPlugin from "./selection";
import useSnaplinePlugin from "./snapline";
import useTransformPlugin from "./transform";
import useExportPlugin from "./export";

const initPlugin = (graph: Graph) => {
  useTransformPlugin(graph);
  useSnaplinePlugin(graph);
  useSelectionPlugin(graph);
  useKeyboardPlugin(graph);
  useExportPlugin(graph);
};

export default initPlugin;
