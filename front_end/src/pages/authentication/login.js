import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleCandidateLogin = () => {
    navigate("/login-candidate"); 
  };

  const handleEmployerLogin = () => {
    navigate("/login-employer"); 
  };

  return (
    <div>
     
      <div className="flex flex-col md:flex-row justify-center items-center h-auto bg-gradient-to-r from-green-100 via-white py-24 to-green-100">
      
      {/* For Companies Section */}
      <div className="flex flex-col justify-between items-center bg-white shadow-lg rounded-lg m-4 p-12 text-center w-100 h-70">
        <span className="text-sm font-bold text-white bg-green-600 rounded uppercase p-2 mb-2">
          Nhà Tuyển Dụng
        </span>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Dành Cho <span className="text-green-600">Công Ty</span>
        </h2>
        <p className="text-gray-600 px-24 text-sm mb-6">
        Chúng tôi là nền tảng hàng đầu cho các công ty tìm kiếm và tuyển dụng các nhà phát triển hàng đầu có kỹ năng phù hợp thông qua các cuộc phỏng vấn kỹ thuật.
        </p>
        <button className="bg-green-600 text-white py-2 px-8 rounded hover:bg-green-700 " id="login-employer" onClick={handleEmployerLogin}>
          Login
        </button>
        <p className="text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <br/>
          <a href="/register-company" className="text-green-600 font-semibold hover:underline">
            Sign up
          </a>.
        </p>
      </div>

      {/* For Developers Section */}
      <div className="flex flex-col justify-between items-center bg-white shadow-lg rounded-lg m-4 p-12 text-center w-100 h-70">
      <span className="text-sm font-bold bg-green-600 text-white uppercase mb-2 p-2 rounded">
          Ứng Viên
        </span>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Dành Cho <span className="text-green-600">Người Tìm Việc</span>
        </h2>
        <p className="text-gray-600 px-24 text-sm mb-6">
        Tham gia cộng đồng các nhà phát triển đang phát triển mạnh mẽ, nâng cao kỹ năng lập trình, chuẩn bị cho các cuộc phỏng vấn kỹ thuật và có được công việc mơ ước của bạn .
        </p>
        <button className=" text-green-600 border-black py-2 px-8 rounded border-1" id="login-candidate" onClick={handleCandidateLogin}>
          Login
        </button>
        <p className="text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <br/>
          <a href="/register-candidate" className="text-green-600 font-semibold hover:underline">
            Sign up
          </a>.
        </p>
      </div>
    </div>
    </div>
   
  );
};

export default Login;
