import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CandidateApi from "../../../api/user/candidate";

import io from "socket.io-client";
const socket = io("http://localhost:5000");


function YourJob() {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var user = JSON.parse(sessionStorage.getItem("data"));
        const data = await CandidateApi.getInfo(`/${user.id}/yourjob`);
        setJobListings(data); 

        socket.on("update_post_admin", async (post) => {
          const data = await CandidateApi.getInfo(`/${user.id}/yourjob`);
          setJobListings(data);
        });
      } catch (error) {
        setError(error.message); // Cập nhật lỗi nếu có
      } finally {
        setLoading(false); // Đặt loading = false khi hoàn tất fetch
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Tính toán chỉ số các mục cần hiển thị
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);

  // Tính tổng số trang
  const totalPages = Math.ceil(jobListings.length / itemsPerPage);

  return (
    <div className="container text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-2">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div
              key={job.idBaiDang}
              className="bg-gray-700 px-4 py-3 rounded-lg shadow-md relative"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={job.logo}
                  alt={job.tenCongTy}
                  className="rounded-full w-16 h-16"
                />
                <div className="mt-3">
                  <p className="font-semibold py-1 px-2 m-0">{job.tenCongTy}</p>
                  <p
                      className=" text-white px-2 py-1 m-0 truncate"
                      style={{
                        maxWidth: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {job.tenBaiDang}
                    </p>
                </div>
              </div>
              {/* Hạn chót ở góc trên bên phải */}
              <p className="absolute top-2 bg-orange-500 p-1 rounded-lg right-2 text-sm">
                Deadline: {job.hanChot}
              </p>

            <div className="mt-2 text-sm px-2 flex justify-between">
                <p className="m-0">{job.tenViTri}</p>
                <p className="m-0 color-item">Phù hợp: {job.doHopNhau} %</p>
              </div>
              <div className=" text-sm px-2 flex justify-between">
                <p className="m-0">{job.tenTinhThanh}</p>
                <p>Số lượng: {job.soLuong}</p>
              </div>
              <Link
                to={`/job/${job.idBaiDang}`}
                className="color-item no-underline hover:no-underline hover:text-[#0cc0df]"
              >
                <p className="text-sm  text-red-500 px-2 m-0 text-right">Xem chi tiết</p>
              </Link>
            </div>
          ))
        ) : (
          <div>Không có bài đăng nào</div>
        )}
      </div>

      <div className="flex justify-between w-full  mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-xl  text-black rounded-l-lg disabled:opacity-50"
        >
          Previous
        </button>
      

        <span className="px-4 py-2 text-black">{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-black text-xl rounded-r-lg disabled:opacity-50"
        >
          Next
        </button>
       
      </div>
    </div>
  );
}

export default YourJob;
