import React, { useState } from "react";
import AuthApi from "../../api/auth/auth";

const LoginEmployer = () => {
  const [formData, setFormData] = useState({
    email: "",
    matKhau: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthApi.auth(formData, "/login-candidate").then(
        async (response) => {
          if (response.status < 300) {
            const token = `Bearer ${response.data.token}`;
            await sessionStorage.setItem("token", token);
            sessionStorage.setItem("data", JSON.stringify(response.data.data));
            setTimeout(() => {
              window.location.href = " http://localhost:3000/";
            }, 3000);
          }
        }
      );
    } catch (error) {
      console.log(error.response?.data || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col justify-center items-center bg-black text-white w-full md:w-1/2 p-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-color-item w-6 h-8 mr-2"></div>
            <h1 className="text-3xl color-item font-bold">D</h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Chào mừng đến với cộng đồng DevJobs
          </h2>
          <p className="text-gray-400 mb-8">
            Nơi quy tụ hàng ngàn lập trình viên trên khắp Việt Nam
          </p>
          <a
            href="/"
            className="text-green-400 font-semibold hover:no-underline "
          >
            Wellcome
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-white w-full md:w-1/2 p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-500 mb-6">Login to your account</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border-1 border-gray-900 rounded-md focus:ring-2"
                placeholder="Nhập email"
                required
                minLength={8}
                maxLength={100}
              />
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="matKhau"
                  name="matKhau"
                  value={formData.matKhau}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-1 border-gray-900 rounded-md text-black focus:ring-2"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2.5 text-gray-600 focus:outline-none"
                >
                  {showPassword ? "Ẩn" : "Hiển Thị"}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a
                href="/"
                className="text-sm text-green-500 font-semibold hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Đăng Nhập
            </button>
          </form>

          <div className="my-6 text-center text-gray-500">or</div>

          <div className="flex justify-between mb-4">
            <button className="flex w-100 items-center justify-center w-1/2 border rounded-md py-2 mx-1 hover:bg-gray-100">
              <img
                src="https://img.icons8.com/color/16/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Continue with Google
            </button>
          </div>

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{" "}
            <a
              href="/register-company"
              className="text-green-500 font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginEmployer;
