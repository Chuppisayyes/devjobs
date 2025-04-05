import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AdminApi {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:5000/admins",
    });
  }

  // This method is now responsible for getting the token dynamically
  getAuthHeaders() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Bạn Cần Đăng Nhập vào Hệ Thống.");
      return {};
    }
    return { Authorization: token }; // Adding 'Bearer ' prefix
  }

  async getTotal(urlApi) {
    try {
      const response = await this.apiClient.get(urlApi, {
        headers: this.getAuthHeaders(), // Use dynamic token here
      });
      toast.success(response.data.message);
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

  async getUpdateManager(urlApi, data) {
    try {
      const response = await this.apiClient.put(urlApi, data, {
        headers: this.getAuthHeaders(),
        "Content-Type": "application/json",
      });

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

  async AddManager(urlApi, data) {
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

  async getAdmin(urlApi) {
    try {
      const response = await this.apiClient.get(urlApi, {
        headers: this.getAuthHeaders(), // Use dynamic token here
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

export default new AdminApi();
