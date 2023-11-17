import { registerNode } from "../types";
import { imageList } from "./index";
import { NodeConfig } from "../types";
// 初始化图形 链接桩
const ports = {
  groups: {
    top: {
      position: "top",
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    right: {
      position: "right",
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    bottom: {
      position: "bottom",
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    left: {
      position: "left",
      attrs: {
        circle: {
          r: 6,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
  },
  items: [
    {
      group: "top",
    },
    {
      group: "right",
    },
    {
      group: "bottom",
    },
    {
      group: "left",
    },
  ],
};

// 初始化文字编辑
const editorTool = {
  name: "node-editor",
  args: {
    attrs: {
      fontSize: 18,
      backgroundColor: "transparent",
    },
  },
};

export const rectNode: registerNode = {
  name: NodeConfig.shape.CUSTOMRECT,
  node: {
    inherit: "rect",
    width: 80,
    height: 50,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: "black",
        fill: "#fff",
      },
      text: {
        fontSize: 18,
        fill: "black",
      },
    },
    tools: [
      {
        ...editorTool,
      },
    ],
    ports: { ...ports },
  },
};

export const textNode: registerNode = {
  name: NodeConfig.shape.CUSTOMTEXT,
  node: {
    inherit: "rect",
    width: 60,
    height: 30,
    label: "文本",
    attrs: {
      body: {
        strokeWidth: 0,
        fill: "transparent",
      },
      text: {
        class: NodeConfig.shape.CUSTOMTEXT,
        fontSize: 18,
        fill: "black",
      },
    },
    tools: [
      {
        ...editorTool,
      },
    ],
  },
};

export const circleNode: registerNode = {
  name: NodeConfig.shape.CUSTOMCIRCLE,
  node: {
    inherit: "circle",
    width: 60,
    height: 60,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: "black",
        fill: "#fff",
      },
      text: {
        fontSize: 18,
        fill: "black",
      },
    },
    tools: [
      {
        ...editorTool,
      },
    ],
    ports: { ...ports },
  },
};

export const diamondNode: registerNode = {
  name: NodeConfig.shape.CUSTOMDIAMOND,
  node: {
    inherit: "polygon",
    width: 80,
    height: 46,
    points: "0 30 30 0 60 30 30 60",
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: "black",
        fill: "#fff",
      },
      text: {
        fontSize: 18,
        fill: "black",
      },
    },
    tools: [
      {
        ...editorTool,
      },
    ],
    ports: {
      ...ports,
    },
  },
};

export const imageNode: registerNode = {
  name: NodeConfig.shape.CUSTOMIMAGE,
  node: {
    inherit: "image",
    width: 80,
    height: 80,
    tools: [
      {
        ...editorTool,
      },
    ],
    ports: { ...ports },
  },
};

export const registerNodes = [
  textNode,
  rectNode,
  circleNode,
  diamondNode,
  imageNode,
];
