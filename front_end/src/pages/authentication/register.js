import React from "react";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="flex">
      <div className="flex items-center justify-center min-h-screen flex-[7] bg-gray-50">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-6 flex items-center justify-center">
            <div className="bg-color-item w-6 h-8 mr-2"></div>
            <h1 className="text-3xl color-item font-bold">D</h1>
          </div>

          {/* Tiêu đề */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Bạn muốn sử dụng DevJobs như thế nào?
          </h1>
          <p className="text-gray-600 mb-6">
            Chúng tôi sẽ tùy chỉnh trải nghiệm cài đặt để phù hợp nhất với bạn
          </p>

          {/* Tuỳ chọn */}
          <div className="space-y-4">
            <Link to="/register-company" className="no-underline  ">
            <div className="flex items-center justify-between mb-6 bg-gray-100 border border-gray-300 rounded-lg p-4 hover:shadow-md cursor-pointer">
              <div className="flex items-center space-x-3">
                
                <div className="text-left">
                  <p className="text-gray-900 font-semibold">
                  tìm kiếm và tuyển dụng nhân tài công nghệ
                  </p>
                  <p className="text-gray-500 text-sm">
                  Giúp doanh nghiệp đánh giá ứng viên hiệu quả.
                  </p>
                </div>
              </div>
              <span className="pl-2 color-item text-lg font-semibold">Danh nghiệp</span>
            </div>
            </Link>
            <Link to="/register-candidate" className="no-underline ">
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 hover:shadow-md cursor-pointer">
              <div className="flex items-center space-x-3">
               
                <div className="text-left">
                  <p className="text-gray-900 font-semibold">
                  Tạo CV ấn tượng và ứng tuyển vào công việc mơ ước.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Giải quyết vấn đề việc làm cho ứng viên
                  </p>
                </div>
              </div>
              <span className="pl-2 color-item text-lg font-semibold">ứng Viên</span>
            </div>
            </Link>
          </div>

        </div>
      </div>
      <div className="flex-[3] bg-black text-black"> h</div>
    </div>
  );
};

export default Register;
