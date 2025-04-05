import React, { useState } from "react";

import AuthApi from "../../api/auth/auth";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    matKhau: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Hàm thay đổi trạng thái hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Hàm thay đổi giá trị các trường trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthApi.auth(formData, "/login-admin").then(async (response) => {
        if (response.status < 300) {
          const token = `Bearer ${response.data.token}`;
          await sessionStorage.setItem("token", token);
          const admin = response.data.data;
          await sessionStorage.setItem("admin", JSON.stringify(admin));
          setTimeout(() => {
            window.location.href = " http://localhost:3000/dashboard";
          }, 3000);
        }
      });
    } catch (error) {
      console.error(
        "Đăng nhập thất bại:",
        error.response?.data || "Có lỗi xảy ra"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Đăng nhập Admin
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Nhập email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="matKhau"
              className="block text-sm font-medium text-gray-600"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="matKhau"
                name="matKhau"
                value={formData.matKhau}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPassword ? "Ẩn" : "Hiển thị"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
