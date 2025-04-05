import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { SlPhone } from "react-icons/sl";
import { TbWorld } from "react-icons/tb";
import AuthApi from "../../api/auth/auth";
import CandidateApi from "../../api/user/candidate";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function ViewJob() {
  const [job, setJob] = useState({});
  const [countAplly, setCountAplly] = useState(0)
  const [jobList, setJobList] = useState([]);
  var user = JSON.parse(sessionStorage.getItem("data")) || {
    quyen: null,
  };
  const { idJob } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const job = await AuthApi.getAllAuth(`/post/${idJob}`);
        setJob(job);
        const jobList = await AuthApi.getAllAuth("/post-many");
        setJobList(jobList);
        const count = await AuthApi.getAllAuth(`/${idJob}/count`);
        setCountAplly(count.data);

        // Lắng nghe sự kiện socket
        const handleUpdatePost = async (post) => {
          if (post.idBaiDang === parseInt(idJob)) {
            const updatedJob = await AuthApi.getAllAuth(`/post/${idJob}`);
            setJob(updatedJob);
            const count = await AuthApi.getAllAuth(`/${idJob}/count`); 
            setCountAplly(count.data);
          }
        };
       

        socket.on("update_post_company", handleUpdatePost);
        socket.on("new_apply", handleUpdatePost);

        // Hủy đăng ký socket khi component unmount hoặc khi `idJob` thay đổi
        return () => {
          socket.off("update_post_company", handleUpdatePost);
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idJob]); // Thêm `idJob` vào mảng phụ thuộc

  const handleApply = async () => {
    var user = JSON.parse(sessionStorage.getItem("data"));
    await CandidateApi.AddInfo(`/${user.id}/apply/${idJob}`);
    await CandidateApi.AddInfo(`/${user.id}/add-notifycation/${idJob}`);
  };

  return (
    <div className="container flex ">
      <div className="flex w-full p-12 ">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-4/6">
          <div className="relative">
            <img
              src={job.hinhAnh}
              alt="Background"
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex justify-between m-0">
              <div className="flex">
                <img
                  src={job.logo}
                  alt={job.tenCongTy}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-bold color-item">
                    {job.tenBaiDang} tại - {job.tenCongTy}
                  </h2>
                  <p className="text-sm m-0 text-gray-500">{job.nganhNghe}</p>
                </div>
              </div>
              <div className="justify-between items-center">
                <p>
                  <i className="p-2 text-sm color-item">
                    <strong>Hạn Chốt: </strong>
                    {job.hanChot && new Date(job.hanChot) < new Date() ? (
                      <span className="text-red-500">Hết hạn</span>
                    ) : (
                      job.hanChot
                    )}
                  </i>
                </p>
                <p className="px-2 py-1 text-xs font-medium inline-block rounded-full bg-color-item text-white">
                  {job.tenTinhThanh}
                </p>

                <p className="px-2 py-1 text-xs font-medium ">
                  {countAplly <=0 ?(`chưa có người Nộp`):(`số người đã nộp: ${countAplly}`)}
                </p> 
              </div>
             
            </div>

            <div className="flex items-center m-0 justify-between ">
              <p className="text-lg font-semibold m-0 text-green-600">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(job.luongBatDau)}{" "}
                -{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(job.luongKetThuc)}
              </p>
            </div>
            <div className="text-sm text-gray-600 my-2">
              <p className="m-0">
                <strong>Địa Chỉ Cụ thể:</strong> {job.diaChiCuThe},{" "}
                {job.tinhThanh}
              </p>
            </div>

            <div className="flex justify-between justify-center">
              <div className="w-1/3 p-1">
                <h3 className=" text-lg font-semibold text-gray-800">
                  Thông Tin Tuyển Dụng
                </h3>
                <div className="text-base text-gray-600 space-y-2 mt-2">
                  <p className="m-1">
                    <strong>Vị Trí:</strong> {job.tenViTri}
                  </p>
                  <p className="m-1">
                    <strong>Cấp Độ:</strong> {job.tenCapDo}
                  </p>
                  <p className="m-1">
                    <strong>Trình Độ:</strong> {job.trinhDo}
                  </p>
                  <p className="m-1">
                    <strong>Kinh Nghiệm:</strong>{" "}
                    {job.kinhNghiem
                      ? job.kinhNghiem < 12
                        ? `${job.kinhNghiem} tháng`
                        : `${Math.floor(job.kinhNghiem / 12)} năm`
                      : "Không yêu cầu"}
                  </p>
                  <p className="m-1">
                    <strong>Số lượng cần tuyển:</strong> {job.soLuong} người
                  </p>
                </div>
              </div>
              <div className="w-1/3 p-1 ">
                <h3 className=" text-lg font-semibold text-gray-800">
                  Yêu Cầu Công Việc
                </h3>
                <ul className="list-disc list-inside  text-gray-600 mt-2">
                  {job.yeuCau?.map((item) => (
                    <li key={item.idYeuCau}>{item.noiDung}</li>
                  ))}
                </ul>
              </div>
              <div className="">
                <h3 className="text-lg font-semibold text-gray-800">
                  Liên Lạc
                </h3>
                <div className="text-gray-600 space-y-2 mt-2">
                  <p className="flex items-center space-x-2">
                    <AiOutlineMail className="text-lg text-gray-600" />
                    <span className="text-sm text-gray-800">{job.email}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <SlPhone className="text-lg text-gray-600" />
                    <span className="text-sm text-gray-800">{job.sdt}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <TbWorld className="text-lg text-gray-600" />
                    <span className="text-sm text-gray-800">{job.linkWeb}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <p>
                <strong className="text-lg font-semibold text-gray-800">
                  Mô tả:{" "}
                </strong>
                {job.moTa}
              </p>
            </div>
          </div>
          <div className="relative">
            {user &&
              user.quyen === "User" &&
              job.hanChot &&
              new Date(job.hanChot) >= new Date() && (
                <div>
                  <button
                    onClick={handleApply}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg absolute bottom-4 right-2"
                  >
                    Nộp CV
                  </button>
                </div>
              )}
          </div>
        </div>
        <div className="w-2/6 px-4 py-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Danh sách công việc
          </h3>
          <div className="space-y-4 mt-4">
            {jobList.map((jobItem) => (
              <div
                key={jobItem.idBaiDang}
                className="bg-white rounded-lg shadow-lg px-4 py-2"
              >
                <div className="flex items-center">
                  <img
                    src={jobItem.logo}
                    alt={jobItem.tenCongTy}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <h6 className="font-semibold text-lg truncate w-64 color-item truncate">
                      {jobItem.tenBaiDang}
                    </h6>
                    <p className="text-sm text-gray-600 truncate">
                      {jobItem.tenCongTy}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between m-0">
                  <p className="text-sm text-gray-600 truncate">
                    {jobItem.tenTinhThanh}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {jobItem.tenViTri}
                  </p>
                </div>

                <Link
                  to={`/job/${jobItem.idBaiDang}`}
                  className="color-item hover:text-red-600 mt-2 block "
                >
                  Xem chi tiết
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewJob;
