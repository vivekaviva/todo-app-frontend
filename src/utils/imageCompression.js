import Compressor from "compressorjs";

export const compressImage = (file, quality = 0.6) =>
  new Promise((resolve, reject) => {
    new Compressor(file, {
      quality,
      success: resolve,
      error: reject,
    });
  });
