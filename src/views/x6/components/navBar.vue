<template>
  <header
    class="w-full flex items-center p-l-20px"
    :style="{
      height: `${props.height}px`,
    }"
  >
    <div class="cursor-pointer">设置</div>
    <div class="cursor-pointer p-l-20px" @click="exportContent">导出</div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { exportFile } from "../lib/graph";

type PropsType = {
  height: number;
};

const props = withDefaults(defineProps<PropsType>(), {
  height: 50,
});

const exportContent = () => {
  exportFile("导出.png", 1, {
    padding: 20,
  });
};
</script>
<style scoped lang="less"></style>
