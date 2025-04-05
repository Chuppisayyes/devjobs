import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import tuyendung from "../../assets/image/tuyendung.png";
import AuthApi from "../../api/auth/auth";


const CompanyDetail = () => {
  const [visibleJobs, setVisibleJobs] = useState(4);
  const [company, setCompany] = useState({});
  const [jobList, setJobList] = useState({});
  const { idCompany } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const company = await AuthApi.getAllAuth(`/company/${idCompany}`);
        const jobList = await AuthApi.getAllAuth(`/company/${idCompany}/job`);
        setCompany(company);
        setJobList(jobList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleJobs((prev) => Math.min(prev + 4, jobList.length)); // Tăng thêm 4 hoặc đến khi hết danh sách
  };
  return (
    <div className="flex container">
      <div className="w-4/6">
        <div className=" min-h-screen p-8">
          <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="flex items-center px-6 py-4">
              <img
                src={company.logo}
                alt={company.tenCongTy}
                className="w-48 h-auto  mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold">
                  <a
                    href={company.linkWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="color-item no-underline"
                  >
                    {company.tenCongTy}
                  </a>
                </h1>
                <p className="text-lg text-black ">{company.nganhNghe}</p>
              </div>
            </div>

            <div className="px-6 py-4 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Thông tin cơ bản
                </h2>
                <div className="grid grid-cols-2 p-2 mt-2">
                  <div className="flex ">
                    <p className="font-medium m-0  pr-2 py-1 ">Địa chỉ:</p>
                    <p className="m-0 px-0 py-1">{company.diaChi}</p>
                  </div>
                  <div className="flex ">
                    <p className="font-medium m-0  pr-2 py-1">Email:</p>
                    <p className="m-0 px-0 py-1">{company.email}</p>
                  </div>
                  <div className="flex ">
                    <p className="font-medium m-0  pr-2 py-1">
                      Ngày thành lập:
                    </p>
                    <p className="m-0 px-0 py-1">
                      {new Date(company.ngayThanhLap).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex ">
                    <p className="font-medium m-0 pr-2 py-1">Số điện thoại:</p>
                    <p className="m-0 px-0 py-1">{company.sDT}</p>
                  </div>

                  <div className="flex ">
                    <p className="font-medium m-0 pr-2 py-1">
                      Số lượng nhân viên:{" "}
                    </p>
                    <p className="m-0 px-0 py-1"> {company.soLuongNhanVien}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className=" flex">
                  <h2 className="text-xl pr-4 font-semibold text-gray-700">
                    Liên kết:
                  </h2>
                  <a
                    href={company.linkWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:no-underline hover:text-red-600"
                  >
                    {company.linkWeb}
                  </a>
                </div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Mô tả công ty
                </h2>
                <p className="mt-2 p-2 text-gray-600">{company.moTa}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 px-4">
            {jobList.length > 0 ? (
              jobList.slice(0, visibleJobs).map((job) => (
                <div
                  key={job.idBaiDang}
                  className="border-2 px-4 py-3 rounded-lg shadow-md relative"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={job.logo}
                      alt={job.tenCongTy}
                      className=" w-16 h-auto"
                    />
                    <div>
                      <p className="font-semibold m-0">{job.tenCongTy}</p>
                    </div>
                  </div>
                  {/* Hạn chót ở góc trên bên phải */}
                  <p className="absolute top-2 text-red-500 right-4 text-sm">
                    {(() => {
                      const today = new Date(); // Ngày hiện tại
                      const deadline = new Date(job.hanChot); // Ngày hết hạn
                      if (deadline < today) {
                        return "Hết hạn";
                      } else if (
                        deadline.getFullYear() === today.getFullYear() &&
                        deadline.getMonth() === today.getMonth() &&
                        deadline.getDate() === today.getDate()
                      ) {
                        return "Hôm nay";
                      } else {
                        return `Hạn nộp: ${job.hanChot}`;
                      }
                    })()}
                  </p>

                  <p className="text-base font-bold p-2 m-0">
                    {job.tenBaiDang}
                  </p>
                  <p className="text-sm px-2 m-0">{job.viTri}</p>
                  <Link
                    to={`/job/${job.idBaiDang}`}
                    className="color-item hover:no-underline hover:text-[#0cc0df]"
                  >
                    <p className="text-sm px-2 m-0 text-right">Xem chi tiết</p>
                  </Link>
                </div>
              ))
            ) : (
              <div className=" text-lg text-red-500">
                Chưa có bài ứng tuyển!
              </div>
            )}
          </div>
          {visibleJobs < jobList.length && (
            <div className="flex text-center justify-center mt-4">
              <button
                onClick={handleLoadMore}
                className=" text-blue-600 text-lg px-4 py-2 "
              >
                Xem thêm
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-2/6">
        <img src={tuyendung} className="h-auto w-3/4 mt-10 rounded-lg" />
      </div>
    </div>
  );
};
export default CompanyDetail;
