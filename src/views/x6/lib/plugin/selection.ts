import { Graph } from "@antv/x6";
import { Selection } from "@antv/x6-plugin-selection";
import { NodeConfig } from "../../types";

const useSelectionPlugin = (graph: Graph) => {
  // 框选
  graph.use(
    new Selection({
      rubberband: true,
      showNodeSelectionBox: true,
      multipleSelectionModifiers: ["ctrl"],
      modifiers: ["alt"],
      pointerEvents: "none",
    })
  );

  graph.on("node:unselected", ({ node }) => {
    if (node.shape === NodeConfig.shape.CUSTOMTEXT) {
      //@ts-ignore
      if (!node.label) {
        // 当文本节点内容为空时 取消编辑 自动从画布移除
        node.remove();
      } else {
        // 当文本节点内容超出容器时 自动把容器放大
        const doms = document.getElementsByClassName(
          NodeConfig.shape.CUSTOMTEXT
        );
        let target: Element | null = null;
        Array.from(doms).forEach((item) => {
          const parentElement = item.parentElement;
          if (
            parentElement &&
            parentElement.getAttribute("data-cell-id") === node.id
          ) {
            target = item;
          }
        });
        if (target) {
          const { width, height } = (target as Element).getBoundingClientRect();
          const box = node.getBBox();
          node.resize(Math.max(width, box.width), Math.max(height, box.height));
        }
      }
    }
  });
};

export default useSelectionPlugin;
