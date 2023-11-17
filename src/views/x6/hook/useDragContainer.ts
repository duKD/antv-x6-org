import { onMounted, ref } from "vue";

export default function useDragContainer(
  id: string,
  options: {
    handleDrop: (event: DragEvent) => void;
  }
) {
  const container = ref<Element | null>();
  onMounted(() => {
    container.value = document.getElementById(id);
    if (container.value) {
      container.value.addEventListener("dragenter", () => {
        // console.log("ondragenter 元素进入容器");
      });

      container.value.addEventListener("dragover", (event) => {
        //阻止默认事件
        event.preventDefault();
        // console.log("dragover 元素进入容器内部拖动");
      });

      container.value.addEventListener("drop", (event: any) => {
        // 在dragover 中一定要执行preventDefault() 否则ondrop 事件不会被触发
        console.log("drop 在元素内部释放鼠标触发", event);
        options.handleDrop(event as DragEvent);
      });
    }
  });
}
