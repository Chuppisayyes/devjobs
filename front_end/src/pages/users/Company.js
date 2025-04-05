import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthApi from "../../api/auth/auth";

const jobList = await AuthApi.getAllAuth("/all-post");
const companyList = await AuthApi.getAllAuth("/all-company");

const Company = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5; 


  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companyList.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );


  const totalPages = Math.ceil(companyList.length / companiesPerPage);


  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="flex container w-full">
      <div className="p-4 space-y-4 w-4/6">
        {currentCompanies.map((company) => (
          <Link
            to={`/company/${company.idCongTy}`}
            className="no-underline flex items-start "
          >
            {" "}
            <div
              key={company.idCongTy}
              className="flex items-start bg-green-50  rounded-lg shadow-lg p-4 border hover:shadow-xl hover:bg-green-100 hover:border-2 transition-shadow duration-300 items-center"
            >
              {/* Logo */}
              <img
                src={company.logo}
                alt={company.tenCongTy}
                className="flex w-24 h-24 rounded object-cover "
              />

              {/* Thông tin chi tiết */}
              <div className="ml-4 flex-1">
                {/* Tiêu đề */}
                <h4 className="text-lg font-semibold color-item truncate truncate w-[500px]">
                  {company.tenCongTy}
                </h4>

                {/* Tên công ty */}
                <p className="text-sm text-gray-700 font-semibold mb-1">
                  {company.diaChi}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  {company.nganhNghe}
                </p>

                {/* Địa điểm và vị trí */}
                <p className="text-sm text-gray-700 mb-1">
                  Số Điện Thoại: {company.sDT} | Email : {company.email}
                </p>

                {/* Mức lương */}
              </div>

              {/* Thời gian cập nhật và nút lưu */}
              <div className="ml-4 text-right">
                <p className="text-sm text-gray-700">
                  Ngày Thành Lập:{" "}
                  {company.ngayThanhLap
                    ? new Date(company.ngayThanhLap).toISOString().split("T")[0]
                    : "Không rõ"}
                </p>
                <button className="color-item hover:text-red-600 mt-2">
                  xem Chi Tiết
                </button>
              </div>
            </div>
          </Link>
        ))}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPreviousPage}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-bold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="w-2/6 text-black flex flex-col ">
        <div className="space-y-2 bg-green-100 rounded border-1 ml-20 my-4 p-4 ">
          <h5 className=" flex text-red-600 uppercase px-2">Job Hot</h5>
          {jobList.map((jobItem) => (
            <Link to={`/job/${jobItem.idBaiDang}`} className="no-underline ">
              <div
                key={jobItem.id}
                className="border-b-2 border-gray-600  px-4 py-2"
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    {/* Tên bài đăng */}
                    <h6 className="font-bold text-base truncate w-64 text-black ">
                      {jobItem.tenBaiDang}
                    </h6>
                    {/* Tên công ty */}
                    <p className="text-sm text-gray-600 truncate w-64 mb-1 ">
                      {jobItem.tenCongTy}
                    </p>
                  </div>
                </div>

                {/* Thông tin tỉnh thành, vị trí và lương */}
                <div className="flex justify-between m-0">
                  <p className="text-sm text-gray-600 m-0 ">
                    {jobItem.tenTinhThanh}
                  </p>
                  <p className="text-sm text-gray-600 m-0">{jobItem.tenViTri}</p>
                </div>
                <div className="flex justify-between m-0">
                  <p className="text-sm text-gray-800">
                    {`Lương: ${jobItem.luongBatDau} - ${jobItem.luongKetThuc}`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company;
