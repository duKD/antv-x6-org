<template>
  <div class="graph-container">
    <div id="graph" class="content"></div>
  </div>
</template>

<script lang="ts" setup>
import useGraphInit from "../hook/useGraphInit";
import useDragContainer from "../hook/useDragContainer";
import { Ref, ref } from "vue";
import { getInject } from "../hook/useContext";
import { addNode } from "../lib/graph";
import { initPositionKey, graphPositionType, NodeConfig } from "../types";

const position = getInject<Ref<graphPositionType>>(initPositionKey);

useGraphInit("graph");
useDragContainer("graph", {
  handleDrop: (event: DragEvent) => {
    if (event.dataTransfer) {
      let id = event.dataTransfer?.getData("nodeId");
      // 拖拽 添加对应元素
      // 处理通用
      if (id) {
        addNode(id, {
          x: (event.offsetX - position.value.x) / position.value.scale,
          y: (event.offsetY - position.value.y) / position.value.scale,
        });
      }

      let imageUrl = event.dataTransfer?.getData("nodeImageUrl");

      // 处理图片
      if (imageUrl) {
        addNode(NodeConfig.shape.CUSTOMIMAGE, {
          x: (event.offsetX - position.value.x) / position.value.scale,
          y: (event.offsetY - position.value.y) / position.value.scale,
          imageUrl,
        });
      }
    }
  },
});
</script>
<style scoped lang="less">
.graph-container {
  display: flex;
  width: 100%;
  height: calc(100vh - 160px);
  .content {
    width: 100%;
    height: 100%;
    margin-right: 8px;
    margin-left: 8px;
    border-radius: 5px;
    box-shadow:
      0 12px 5px -10px rgb(0 0 0 / 10%),
      0 0 4px 0 rgb(0 0 0 / 10%);
  }
}
</style>
