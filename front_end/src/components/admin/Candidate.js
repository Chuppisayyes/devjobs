import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import AdminApi from "../../api/admin/admin";



const statusOptions = ["Sửa", "Duyệt", "Hủy", "Khóa"];

const CandidateList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Quản lý ứng viên được chọn
  const itemsPerPage = 5;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidates = await AdminApi.getAdmin("/all-candidate");
        setData(candidates)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleStatusChange = async (id, newStatus) => {
    const newTrangThai =
      newStatus === "Duyệt"
        ? "Đã Duyệt"
        : newStatus === "Hủy"
        ? "Đã Hủy"
        : "Đã Khóa";

    const updatedCandidates = data.map((candidate) =>
      candidate.idNguoiDung === id
        ? { ...candidate, trangThai: newTrangThai }
        : candidate
    );
    setData(updatedCandidates); 
    const payload = {
      idUpdate: id,
      trangThai: newTrangThai,
    };

    try {
      await AdminApi.getUpdateManager("update/candidate", payload);

      // const res = await AuthApi.getAdmin("/all-candidate");
      // setData(res);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const closeDetailsModal = () => {
    setSelectedCandidate(null);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-2xl font-semibold mb-2 text-gray-300">
        Quản Lí Ứng Viên
      </h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-custom-item">
            <tr className="bg-custom-item">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Tên</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Tỉnh Thành</th>
              <th className="px-6 py-3">Trạng Thái</th>
              <th className="px-6 py-3">Chỉnh Sửa</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((candidate) => (
              <tr
                key={candidate.idNguoiDung}
                className="bg-gray-800 border-b text-white cursor-pointer"
              >
                <td className="px-6 py-3 font-medium text-white">
                  {candidate.idNguoiDung}
                </td>
                <td className="px-6 py-3 flex">
                  <img
                    src={
                      candidate.anhDaiDien
                        ? candidate.anhDaiDien
                        : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                    }
                    alt={candidate.ten}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <div>{candidate.ten}</div>
                    <div className="text-gray-500 text-sm">
                      {candidate.tenViTri}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3">{candidate.email}</td>
                <td className="px-6 py-3">{candidate.tenTinhThanh}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium inline-block rounded-full ${
                      candidate.trangThai === "Đã Duyệt"
                        ? "bg-blue-200 text-blue-800"
                        : candidate.trangThai === "Chờ Duyệt"
                        ? "bg-yellow-200 text-yellow-800"
                        : candidate.trangThai === "Đã Hủy"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-red-800"
                    }`}
                  >
                    {candidate.trangThai}
                  </span>
                </td>
                <td className="px-6 py-3 flex items-center ">
                  <select
                    value={candidate.trangThai}
                    onChange={(e) =>
                      handleStatusChange(candidate.idNguoiDung, e.target.value)
                    }
                    className="border border-gray-300 text-gray-900 rounded-md text-sm p-1"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <p
                    onClick={() => handleViewDetails(candidate)}
                    className="text-xs pt-2 pl-2 text-white hover:text-red-200"
                  >
                    xem chi tiết
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-green-500 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-500 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {selectedCandidate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white py-10 px-12 rounded-lg shadow-2xl w-3/4 max-w-4xl">
            {/* Nút đóng */}
            <button
              onClick={closeDetailsModal}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-red-600 focus:outline-none"
            >
              <IoMdClose />
            </button>

            {/* Ảnh, Tên và Vị trí */}
            <div className="text-center mb-10">
              <img
                src={
                  selectedCandidate.anhDaiDien
                    ? selectedCandidate.anhDaiDien
                    : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                }
                alt={selectedCandidate.ten}
                className="w-32 h-32 rounded-full mx-auto border-4 border-orange-500 shadow-lg"
              />
              <h3 className="mt-4 text-2xl font-semibold text-orange-600">
                {selectedCandidate.ten}
              </h3>
              <p className="text-lg font-medium text-gray-600">
                {selectedCandidate.tenViTri}
              </p>
            </div>

            {/* Thông tin chi tiết */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-10 justify-center text-gray-800">
              <p className="text-lg">
                <span className="font-bold text-gray-600">Email:</span>{" "}
                {selectedCandidate.email}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-600">Số Điện Thoại:</span>{" "}
                {selectedCandidate.sdt}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-600">Ngày Sinh:</span>{" "}
                {selectedCandidate.ngaySinh}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-600">Tỉnh Thành:</span>{" "}
                {selectedCandidate.tenTinhThanh}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-600">Trạng Thái:</span>{" "}
                {selectedCandidate.trangThai}
              </p>
              <p className="text-lg">
                <span className="font-bold text-gray-600">Cấp Độ:</span>{" "}
                {selectedCandidate.tenCapDo}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
