import { Graph } from "@antv/x6";
import {
  registerNode,
  translateEventHandle,
  scaleEventHandle,
  NodeConfig,
} from "../types";
import { translate, scale } from "./graphEvent";
import initPlugin from "./plugin";
import { Export } from "@antv/x6-plugin-export";

let graph: Graph | undefined = undefined;

export const initGraph = (options: any) => {
  const dom = document.getElementById(options.id);

  graph = new Graph({
    container: dom!,
    background: {
      color: "#F2F7FA",
    },
    connecting: {
      // 连接线的设置
      router: "manhattan",
      //连接桩 不能连接空白
      allowBlank: false,
      // 指定连接点计算方式 https://x6.antv.antgroup.com/api/registry/connection-point#boundary
      connectionPoint: "anchor",
      // 开启连接吸附效果
      snap: {
        radius: 20,
      },
      connector: {
        name: "rounded",
        args: {
          radius: 6,
        },
      },
      // 连接桩 连接规则
      validateConnection({ sourceCell, targetCell, targetMagnet }) {
        // 不能连接自身
        if (sourceCell === targetCell) {
          return false;
        }

        // 不能重复连线
        const edges = this.getEdges();
        if (targetMagnet) {
          const portId = targetMagnet.getAttribute("port");
          if (edges.find((edge) => edge.getTargetPortId() === portId)) {
            return false;
          }
        } else {
          return false;
        }

        return true;
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#5F95FF",
            stroke: "#5F95FF",
          },
        },
      },
    },
    // 开启鼠标滚轮 放大缩小
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: "ctrl",
      minScale: 0.5,
      maxScale: 3,
    },
    // 开启拖拽画布
    panning: true,
    grid: {
      visible: true,
      type: "doubleMesh",
      args: [
        {
          color: "#eee", // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: "#ddd", // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
  });

  // 初始化相关插件
  initPlugin(graph);

  handleError(showPort);

  return graph;
};

/**
 *  设置画布大小
 * @param options
 */
export const resize = (options: { width?: number; height?: number }) => {
  graph?.resize(options.width, options.height);
};

export const register = (info: registerNode, force = true) => {
  if (graph) {
    Graph.registerNode(info.name, info.node, force);
  }
};

export const exportFile = (
  fileName: string,
  type = 1,
  options?: Export.ToImageOptions
) => {
  type === 1
    ? graph?.exportPNG(fileName, options)
    : graph?.exportJPEG(fileName, options);
};

/**
 * 添加节点
 * @param shape
 */
export const addNode = (shape: string, options: NodeConfig.addNodeOptions) => {
  if (graph) {
    graph.addNode({
      shape: shape,
      ...options,
    });
  }
};

// 控制连接桩的显示隐藏
const showPort = () => {
  if (graph) {
    //鼠标移入
    graph.on("node:mouseenter", ({ node }) => {
      const ports = node.getPorts();
      for (const port of ports) {
        node.setPortProp(port.id!, "attrs/circle", {
          style: {
            visibility: "visible",
          },
        });
      }
    });

    //鼠标移出
    graph.on("node:mouseleave", ({ node }) => {
      const ports = node.getPorts();
      for (const port of ports) {
        node.setPortProp(port.id!, "attrs/circle", {
          style: {
            visibility: "hidden",
          },
        });
      }
    });
  }
};

// graph 相关事件
export const translateEvent = (handleTranslate: translateEventHandle) => {
  const handle = () => {
    if (graph) {
      translate(graph, handleTranslate);
    } else {
      throw "graph has not init";
    }
  };
  return handleError(handle);
};

export const scaleEvent = (scaleEventHandle: scaleEventHandle) => {
  const handle = () => {
    if (graph) {
      scale(graph, scaleEventHandle);
    } else {
      throw "graph has not init";
    }
  };
  return handleError(handle);
};

const isFunction = (val: unknown): val is Function => typeof val === "function";

const handleError = (fn: Function, args: any[] = []) => {
  try {
    isFunction(fn) && fn(...args);
  } catch (e) {
    console.error(e);
  }
};
