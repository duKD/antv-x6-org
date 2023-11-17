<template>
  <section class="x6-container">
    <nav-bar :height="props.barHeight" />
    <a-split
      :style="{
        height: `calc(100% - ${props.barHeight}px)`,
        width: '100%',
        minWidth: '500px',
        border: '1px solid var(--color-border)',
      }"
      v-model:size="size"
      min="150px"
      max="500px"
    >
      <template #first>
        <a-typography-paragraph> <tool /></a-typography-paragraph>
      </template>
      <template #second>
        <a-typography-paragraph style="margin-bottom: 0">
          <graph />
        </a-typography-paragraph>
      </template>
    </a-split>
  </section>
</template>
<script lang="ts" setup>
import navBar from "./components/navBar.vue";
import graph from "./components/graph.vue";
import tool from "./components/tool.vue";
import { Ref, ref, reactive } from "vue";
import { createProvider } from "./hook/useContext";
import {
  initPosition,
  initPositionKey,
  isInitGraphKey,
  graphPositionType,
} from "./types";
import { Graph } from "@antv/x6";

type PropsType = {
  barHeight?: number;
};

const props = withDefaults(defineProps<PropsType>(), {
  barHeight: 50,
});

const size = ref<string>("150px");

const isInitGraph = ref<boolean>(false);

const position = ref<graphPositionType>({
  x: 0,
  y: 0,
  scale: 1,
});

createProvider(initPositionKey, position);
createProvider(isInitGraphKey, isInitGraph);
</script>
<style lang="less">
.x6-container {
  width: 100%;
  height: 100%;
  padding: 0;
  .x6-widget-selection-box {
    border: 2px dashed #239edd;
  }
  .x6-widget-selection-inner {
    border: 1px solid #239edd;
  }
}
</style>
