import { Graph } from "@antv/x6";
import { Keyboard } from "@antv/x6-plugin-keyboard";

// 删除
const bindDelete = (graph: Graph) => {
  graph.bindKey("backspace", () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.removeCells(cells);
    }
  });
};

// 绑定键盘事件
const useKeyboardPlugin = (graph: Graph) => {
  graph.use(new Keyboard());
  bindDelete(graph);
};

export default useKeyboardPlugin;
