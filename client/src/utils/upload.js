/**
 * 上传图片到 Cloudinary（未配置时返回空串，后端会使用默认头像）
 */
export const uploadImage = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
  if (!cloudName || !preset) return "";

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", preset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: data }
  );
  const json = await res.json();
  return json.secure_url || json.url || "";
};

export const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default uploadImage;
