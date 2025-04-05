import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CompanyApi {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:5000/company",
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

 

  async updateInfo(urlApi, data) {
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

  async AddInfo(urlApi, data) {
    try {
      const response = await this.apiClient.post(urlApi, data, {
        headers: this.getAuthHeaders(),
        "Content-Type": "application/json",
      });
      await toast.success(response.data.message);
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error( "Có lỗi xảy ra!");
        console.log(error.response.data.message)
      } else if (error.request) {
        toast.error("Không thể kết nối đến server. Vui lòng thử lại.");
      } else {
        console.log(error.message);
      }
    }
  }

  async getInfo(urlApi) {
    try {
      const response = await this.apiClient.get(urlApi, {
        headers: this.getAuthHeaders(), 
      });
      
      return response.data.data;
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

  async deleteInfo(urlApi) {
    try {
      const response = await this.apiClient.delete(urlApi, {
        headers: this.getAuthHeaders(), 
      });
      await toast.success(response.data.message);
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

export default new CompanyApi ();
