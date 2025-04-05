import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CVApi {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:5000/cv",
    });
  }

  getAuthHeaders() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Bạn Cần Đăng Nhập vào Hệ Thống.");
      return {};
    }
    return { Authorization: token }; 
  }

 

  async updateCV(urlApi, data) {
    try {
      const response = await this.apiClient.put(urlApi, data, {
        headers: this.getAuthHeaders(),
        "Content-Type": "application/json",
      });
      await toast.success(response.data.message);
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Có lỗi xảy ra!");
      } else if (error.request) {
        toast.error("Không thể kết nối đến server. Vui lòng thử lại.");
      } else {
        toast.error(error.message);
      }
    }
  }

  async AddCV(urlApi, data) {
    try {
      const response = await this.apiClient.post(urlApi, data, {
        headers: this.getAuthHeaders(),
        "Content-Type": "application/json",
      });
      await toast.success(response.data.message);
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Có lỗi xảy ra!");
      } else if (error.request) {
        toast.error("Không thể kết nối đến server. Vui lòng thử lại.");
      } else {
        toast.error(error.message);
      }
    }
  }

  async getCV(urlApi) {
    try {
      const response = await this.apiClient.get(urlApi, {
        headers: this.getAuthHeaders(), 
      });
      
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message || "Có lỗi xảy ra!");
      } else if (error.request) {
        console.log("Không thể kết nối đến server. Vui lòng thử lại.");
      } else {
        console.log(error.message);
      }
    }
  }

  async deleteCV(urlApi) {
    try {
      const response = await this.apiClient.delete(urlApi, {
        headers: this.getAuthHeaders(), 
      });
      
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message || "Có lỗi xảy ra!");
      } else if (error.request) {
        console.log("Không thể kết nối đến server. Vui lòng thử lại.");
      } else {
        console.log(error.message);
      }
    }
  }
}

export default new CVApi ();
