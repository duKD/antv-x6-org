import { Graph } from "@antv/x6";
import { Snapline } from "@antv/x6-plugin-snapline";

const useSnaplinePlugin = (graph: Graph) => {
  // 对齐
  graph.use(
    new Snapline({
      enabled: true,
    })
  );
};

export default useSnaplinePlugin;
