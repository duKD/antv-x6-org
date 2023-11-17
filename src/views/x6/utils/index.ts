import { useBase64 } from "@vueuse/core";
import { resolve } from "path";

export const isBase64 = (str: string) => {
  if (str === "" || str.trim() === "") {
    return false;
  }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
};

export const urlToBase64 = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    if (isBase64(url)) {
      resolve(url);
    } else {
      const image = new Image();
      image.src = url;
      image.setAttribute("crossOrigin", "Anonymous");
      image.onload = () => {
        const base64 = getBase64Image(image);
        resolve(base64);
      };
      image.onerror = () => {
        resolve("");
      };
    }
  });
};

const getBase64Image = (img: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0, img.width, img.height);
  const ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  const dataURL = canvas.toDataURL("image/" + ext);
  return dataURL;
};
