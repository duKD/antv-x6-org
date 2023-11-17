<template>
  <a-collapse class="container" id="tool">
    <a-collapse-item header="通用" key="1">
      <section class="flex flex-wrap tool">
        <div
          class="brag-default"
          v-for="item in commonList"
          :key="item.shape"
          @click="add(item.id)"
          draggable="true"
        >
          <component :is="item.component"></component>
        </div>
      </section>
    </a-collapse-item>
    <a-collapse-item header="其他" :key="2">
      <section class="flex flex-wrap tool">
        <div
          class="brag-image w-70px h-70px p-5px"
          v-for="item in imageList"
          :key="item.id"
          @click="addOther(item)"
          draggable="true"
        >
          <img :src="item.image" />
        </div>
      </section>
    </a-collapse-item>
    <a-collapse-item header="更多" key="3">
      <section class="flex flex-wrap tool">
        <div
          class="brag-upload w-70px h-70px p-5px"
          v-for="(img, index) in fileList"
          :key="index"
          @click="addUpload(img.file.url)"
          draggable="true"
        >
          <img class="w-full h-full" :src="img.file.url" />
        </div>
        <a-upload
          list-type="picture-card"
          :auto-upload="false"
          :show-file-list="false"
          @change="uploadChange"
        />
      </section>
    </a-collapse-item>
  </a-collapse>
</template>

<script lang="ts" setup>
import { commonList, imageList } from "../asset";
import { registerNodes } from "../asset/nodeShapeDate";
import { getInject } from "../hook/useContext";
import { Ref, ref, watch, onMounted } from "vue";

import {
  initPosition,
  initPositionKey,
  graphPositionType,
  isInitGraphKey,
  NodeConfig,
} from "../types";
import { register, addNode } from "../lib/graph";
import useInitGraphEvent from "../hook/useInitGraphEvent";
import { translateEventHandle, scaleEventHandle } from "../types";
import { urlToBase64 } from "../utils";
import { FileItem } from "@arco-design/web-vue/es/upload/interfaces";
import { nextTick } from "vue";

const position = getInject<Ref<graphPositionType>>(initPositionKey);

const isInitGraph = getInject<Ref<boolean>>(isInitGraphKey);

const handleTranslate: translateEventHandle = (args: {
  tx: number;
  ty: number;
}) => {
  position.value.x = args.tx;
  position.value.y = args.ty;
};

const handleScale: scaleEventHandle = (args: { sx: number; sy: number }) => {
  position.value.scale = args.sy;
};

const add = (id: string) => {
  addNode(id, {
    x: (initPosition.x - position.value.x) / position.value.scale,
    y: (initPosition.y - position.value.y) / position.value.scale,
  });
};

const addOther = (item: {
  id: NodeConfig.shape;
  shape: string;
  image: string;
}) => {
  addNode(item.id, {
    x: (initPosition.x - position.value.x) / position.value.scale,
    y: (initPosition.y - position.value.y) / position.value.scale,
    imageUrl: item.image,
  });
};

const addUpload = async (url: string | undefined) => {
  if (!url) return;
  let base64Url = await urlToBase64(url);
  addNode(NodeConfig.shape.CUSTOMIMAGE, {
    x: (initPosition.x - position.value.x) / position.value.scale,
    y: (initPosition.y - position.value.y) / position.value.scale,
    imageUrl: base64Url,
  });
};

const close = watch(isInitGraph, (newValue) => {
  if (newValue) {
    registerNodes.forEach((item) => {
      register(item);
    });
    useInitGraphEvent({
      translateEventHandle: handleTranslate,
      scaleEventHandle: handleScale,
    });
    close();
  }
});

const fileList = ref<
  Array<{
    file: FileItem;
    base64Url: string;
  }>
>([]);

const uploadChange = async (files: FileItem[]) => {
  let len = files.length;
  fileList.value.push({
    file: files[len - 1],
    base64Url: await urlToBase64(files[len - 1].url || ""),
  });
};

watch(
  () => fileList.value.length,
  () => {
    setTimeout(() => {
      let toolDom = document.getElementById("tool");
      let uploadImage = toolDom!.querySelectorAll(".brag-upload");

      if (uploadImage?.length) {
        uploadImage[uploadImage.length - 1].addEventListener(
          "dragstart",
          (event: any) => {
            event.dataTransfer.setData(
              "nodeImageUrl",
              fileList.value[fileList.value.length - 1].base64Url
            );
          }
        );
      }
    }, 200);
  }
);

onMounted(() => {
  let toolDom = document.getElementById("tool");
  if (toolDom) {
    let childrenDefault = toolDom.querySelectorAll(".brag-default");
    if (childrenDefault?.length) {
      Array.from(childrenDefault).forEach((item: Element, index: number) => {
        item.addEventListener("dragstart", (event: any) => {
          event.dataTransfer.setData("nodeId", commonList[index].id);
        });
      });
    }
    let childrenImage = toolDom.querySelectorAll(".brag-image");
    if (childrenImage?.length) {
      Array.from(childrenImage).forEach((item: Element, index: number) => {
        item.addEventListener("dragstart", (event: any) => {
          event.dataTransfer.setData("nodeImageUrl", imageList[index].image);
        });
      });
    }
  }
});
</script>
<style scoped lang="less">
.tool {
  .icon,
  .brag-image,
  .brag-upload {
    cursor: pointer;
  }
}
.container {
  ::v-deep .arco-collapse-item-header {
    user-select: none;
  }
}
</style>
