import { IoMdClose } from "react-icons/io";
import React, { useState, useEffect } from "react";
import AdminApi from "../../api/admin/admin";

const statusOptions = ["Sửa", "Duyệt", "Hủy", "Khóa"];
const BusinessManagement = () => {
  const [businesses, setBusinesses] = useState([]);
  const [currentBusiness, setCurrentBusiness] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(businesses.length / itemsPerPage);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const business = await AdminApi.getAdmin("/all-company");
        setBusinesses(business);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleStatusChange = async (id, newStatus) => {
    businesses.map((business) =>
      business.idCongTy === id
        ? {
            ...business,
            trangThai:
              newStatus === "Duyệt"
                ? "Đã Duyệt"
                : newStatus === "Hủy"
                ? "Đã Hủy"
                : "Đã Khóa",
          }
        : business
    );
    const newTrangThai =
      newStatus === "Duyệt"
        ? "Đã Duyệt"
        : newStatus === "Hủy"
        ? "Đã Hủy"
        : "Đã Khóa";
    const data = {
      idUpdate: id,
      trangThai: newTrangThai,
    };

    await AdminApi.getUpdateManager("update/company", data);
    await AdminApi.getAdmin("/all-company").then((res) => {
      setBusinesses(res);
    });
  };

  const startIndex = (currentBusiness - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = businesses.slice(startIndex, endIndex);
  const handleViewDetails = (candidate) => {
    setIsModalOpen(candidate); // Hiển thị thông tin ứng viên trong modal
  };

  const closeDetailsModal = () => {
    setIsModalOpen(null);
  };

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-2xl font-semibold mb-2 text-gray-300">
        Quản Lí Danh nghiệp
      </h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-custom-item">
            <tr className="bg-custom-item">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Tên</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Địa Chỉ</th>
              <th className="px-6 py-3">Trạng Thái</th>
              <th className="px-6 py-3">Chỉnh Sửa</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((businesses) => (
              <tr
                key={businesses.idCongTy}
                className="bg-gray-800 border-b text-white cursor-pointer"
              >
                <td className="px-6 py-3 font-medium text-white">
                  {businesses.idCongTy}
                </td>
                <td className="px-6 py-3 flex">
                  <img
                    src={businesses.logo}
                    alt={businesses.tenCongTy}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <div>{businesses.tenCongTy}</div>
                    <div className="text-gray-500 text-sm">
                      {businesses.nganhNghe}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3">{businesses.email}</td>
                <td className="px-6 py-3">{businesses.diaChi}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium inline-block rounded-full ${
                      businesses.trangThai === "Đã Duyệt"
                        ? "bg-blue-200 text-blue-800"
                        : businesses.trangThai === "Chờ Duyệt"
                        ? "bg-yellow-200 text-yellow-800"
                        : businesses.trangThai === "Đã Hủy"
                        ? "bg-red-300 text-red-800"
                        : "bg-gray-300 text-red-800"
                    }`}
                  >
                    {businesses.trangThai}
                  </span>
                </td>
                <td className="px-6 py-3 flex items-center ">
                  <select
                    value={businesses.trangThai}
                    onChange={(e) =>
                      handleStatusChange(businesses.idCongTy, e.target.value)
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
                    onClick={() => handleViewDetails(businesses)}
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

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentBusiness((prev) => Math.max(prev - 1, 1))}
          disabled={currentBusiness === 1}
          className="px-4 py-2 bg-green-500 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentBusiness} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentBusiness((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentBusiness === totalPages}
          className="px-4 py-2 bg-green-500 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center text-black  bg-opacity-50">
          <div className="relative bg-white py-6 px-12 rounded-lg shadow-lg w-1/2">
            <button
              onClick={closeDetailsModal}
              className=" absolute top-2 right-2 text-2xl font-bold hover:text-red-600 focus:outline-none"
            >
              <IoMdClose />
            </button>
            <div className="text-center">
              <img
                src={isModalOpen.logo}
                alt={isModalOpen.tenCongTy}
                className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300"
              />
              <h3 className="text-xl font-semibold mb-2 text-orange-600">
                {isModalOpen.tenCongTy}
              </h3>
              <p className="text-gray-900 text-sm mb-4 text-green-600">
                {isModalOpen.nganhnghe}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-2">
                <p className="mb-2">
                  <strong>Địa Chỉ:</strong> {isModalOpen.diaChi}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong>Email:</strong> {isModalOpen.email}
                </p>
                <p className="mb-2">
                  <strong>Số Điện Thoại:</strong> {isModalOpen.sDT}
                </p>
                <p className="mb-2">
                  <strong>Website:</strong>{" "}
                  <a
                    href={isModalOpen.linkWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline"
                  >
                    {isModalOpen.linkWeb}
                  </a>
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong>Trạng Thái:</strong> {isModalOpen.trangThai}
                </p>
                <p className="mb-2">
                  <strong>Ngày Thành Lập:</strong> {isModalOpen.ngayThanLap}
                </p>
                <p className="mb-2">
                  <strong>Số Lượng Nhân Viên:</strong>{" "}
                  {isModalOpen.soLuongNhanVien}
                </p>
              </div>
              <div className="col-span-2">
                <p className="mb-2">
                  <strong>Mô Tả:</strong> {isModalOpen.moTa}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessManagement;
