import { Graph } from "@antv/x6";
import { Transform } from "@antv/x6-plugin-transform";
import { NodeConfig } from "../../types";

const useTransformPlugin = (graph: Graph) => {
  // node放大缩小
  graph.use(
    new Transform({
      resizing: {
        minWidth: 40,
        maxWidth: (node) => {
          if (node.shape === NodeConfig.shape.CUSTOMTEXT) {
            return undefined;
          }
          return 120;
        },
        minHeight: 40,
        maxHeight: (node) => {
          if (node.shape === NodeConfig.shape.CUSTOMTEXT) {
            return undefined;
          }
          return 120;
        },
        enabled: true,
        preserveAspectRatio: (node) => {
          // 部分图形 等比例缩放
          if (
            node.shape === NodeConfig.shape.CUSTOMCIRCLE ||
            node.shape === NodeConfig.shape.CUSTOMIMAGE
          ) {
            return true;
          }
          return false;
        },
      },
      rotating: true,
    })
  );
};

export default useTransformPlugin;
