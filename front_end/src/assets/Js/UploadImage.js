import axios from "axios";

const uploadImage = async (file) => {
  const cloudName = "dypjamkif";
  const presetName = "dev-jobs";
  const folderName = "devjobs";

  const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("upload_preset", presetName);
  formData.append("folder", folderName);
  formData.append("file", file);

  try {
    const response = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Trả về giá trị secure_url từ response
    return await response.data.secure_url;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error.response?.data || error.message
    );
    throw error; // Quăng lỗi để phía gọi xử lý
  }
};

export default uploadImage;
