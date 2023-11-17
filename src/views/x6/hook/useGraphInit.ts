import { Ref, onMounted, ref } from "vue";
import { Graph } from "@antv/x6";
import { initGraph } from "../lib/graph";
import { getInject } from "../hook/useContext";
import { isInitGraphKey } from "../types";

export default function useGraphInit(id: string) {
  const graph = ref<Graph>();

  const isInitGraph = getInject<Ref<boolean>>(isInitGraphKey);

  onMounted(() => {
    graph.value = initGraph({ id });
    isInitGraph.value = true;
  });
  return { graph };
}
