import { Graph } from "@antv/x6";
import { Export } from "@antv/x6-plugin-export";

const useExportPlugin = (graph: Graph) => {
  // 对齐
  graph.use(new Export());
};

export default useExportPlugin;
