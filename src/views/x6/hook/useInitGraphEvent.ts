import { translateEventHandle, scaleEventHandle } from "../types";
import { translateEvent, scaleEvent } from "../lib/graph";

/**
 * 必须在graph 初始化后使用
 * @param options
 */
export default function useInitGraphEvent(options: {
  translateEventHandle?: translateEventHandle;
  scaleEventHandle?: scaleEventHandle;
}) {
  options.translateEventHandle && translateEvent(options.translateEventHandle);
  options.scaleEventHandle && scaleEvent(options.scaleEventHandle);
}
