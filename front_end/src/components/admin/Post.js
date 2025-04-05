import React, { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { SlPhone } from "react-icons/sl";
import { TbWorld } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import AdminApi from "../../api/admin/admin";
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); 

const PostManagement = () => {
  const statusOptions = ["Sửa", "Duyệt", "Hủy", "Khóa"];
  const [post, setPost] = useState([]);
  const [currentPost, setCurrentPost] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AdminApi.getAdmin("/all-post");
        setPost(data);
        socket.on('new_post', async(post) => {
          const data = await AdminApi.getAdmin("/all-post");
          setPost(data);
      });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(post.length / itemsPerPage);

  const handleStatusChange = async (id, newStatus) => {
    // Xác định trạng thái mới
    const newTrangThai =
      newStatus === "Duyệt"
        ? "Đã Duyệt"
        : newStatus === "Hủy"
        ? "Đã Hủy"
        : "Đã Khóa";

    const updatedPost = post.map((post) =>
      post.idNguoiDung === id ? { ...post, trangThai: newTrangThai } : post
    );
    setPost(updatedPost);
    const payload = {
      idUpdate: id,
      trangThai: newTrangThai,
    };

    try {
      await AdminApi.getUpdateManager("update/post", payload);
      const res = await AdminApi.getAdmin("/all-post");
      setPost(res);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const startIndex = (currentPost - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = post.slice(startIndex, endIndex);

  const handleViewDetails = (posts) => {
    setIsModalOpen(posts); // Hiển thị thông tin ứng viên trong modal
  };

  const closeDetailsModal = () => {
    setIsModalOpen(null);
  };

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-2xl font-semibold mb-2 text-gray-300">
        Quản Lí Bài Đăng
      </h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-custom-item">
            <tr className="bg-custom-item">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Danh nghiệp</th>
              <th className="px-6 py-3">Tên Bài Đăng</th>
              <th className="px-6 py-3">Vị Trí</th>
              <th className="px-6 py-3">Số lượng</th>
              <th className="px-6 py-3">Trạng Thái</th>
              <th className="px-6 py-3">Chỉnh Sửa</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((post) => (
              <tr
                key={post.idBaiDang}
                className="bg-gray-800 border-b text-white cursor-pointer"
              >
                <td className="px-6 py-3 font-medium text-white">
                  {post.idBaiDang}
                </td>
                <td className="px-6 py-3 flex">
                  <img
                    src={post.logo}
                    alt={post.tenCongTy}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <div>{post.tenCongTy}</div>
                    <div className="text-gray-500 text-sm">
                      {post.nganhNghe}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3">{post.tenBaiDang}</td>
                <td className="px-6 py-3">{post.viTri}</td>
                <td className="px-6 py-3">{post.soLuong}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium inline-block rounded-full ${
                      post.trangThai === "Đã Duyệt"
                        ? "bg-blue-200 text-blue-800"
                        : post.trangThai === "Chờ Duyệt"
                        ? "bg-yellow-200 text-yellow-800"
                        : post.trangThai === "Đã Hủy"
                        ? "bg-red-300 text-red-800"
                        : "bg-gray-300 text-red-800"
                    }`}
                  >
                    {post.trangThai}
                  </span>
                </td>
                <td className="px-6 py-3 flex items-center ">
                  <select
                    value={post.trangThai}
                    onChange={(e) =>
                      handleStatusChange(post.idBaiDang, e.target.value)
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
                    onClick={() => handleViewDetails(post)}
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
          onClick={() => setCurrentPost((prev) => Math.max(prev - 1, 1))}
          disabled={currentPost === 1}
          className="px-4 py-2 bg-green-500 text-white rounded-md disabled:bg-gray-500"
        >
          Previous
        </button>
        <span className="text-sm text-white">
          Page {currentPost} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPost((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPost === totalPages}
          className="px-4 py-2 bg-green-500 text-white rounded-md disabled:bg-gray-500"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-4/5 max-w-3xl">
            {/* Hình ảnh bìa */}
            <div className="relative">
              <img
                src={isModalOpen.hinhAnh}
                alt="Background"
                className="w-full h-40 object-cover"
              />
              <button
                onClick={closeDetailsModal}
                className=" absolute top-2 right-2 text-2xl font-bold hover:text-red-600 focus:outline-none"
              >
                <IoMdClose />
              </button>
            </div>

            {/* Nội dung chính */}
            <div className="p-6">
              {/* Tiêu đề */}
              <div className="flex justify-between">
                <div className="flex">
                  <img
                    src={isModalOpen.logo}
                    alt={isModalOpen.tenCongTy}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-orange-600">
                      {isModalOpen.tenBaiDang} tại - {isModalOpen.tenCongTy}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {isModalOpen.nganhNghe}
                    </p>
                  </div>
                </div>
                <div className="justify-between items-center">
                  <p>
                    <i className="p-2 text-sm text-orange-600">
                      <strong>Ngày Đăng: </strong>
                      {isModalOpen.ngayDang}
                    </i>
                  </p>
                  <p className="px-2 py-1 text-xs font-medium inline-block rounded-full bg-orange-600 text-white">
                    {isModalOpen.tentinhThanh}
                  </p>
                </div>
              </div>

              {/* Lương */}
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-green-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(isModalOpen.luongBatDau)}{" "}
                  -{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(isModalOpen.luongKetThuc)}
                </p>
                <p
                  className={`px-2 py-1 text-xs font-medium inline-block rounded-full ${
                    isModalOpen.trangThai === "Đã Duyệt"
                      ? "bg-blue-200 text-blue-800"
                      : isModalOpen.trangThai === "Chờ Duyệt"
                      ? "bg-yellow-200 text-yellow-800"
                      : isModalOpen.trangThai === "Đã Hủy"
                      ? "bg-red-300 text-red-800"
                      : "bg-gray-300 text-red-800"
                  }`}
                >
                  {isModalOpen.trangThai}
                </p>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                <p>
                  <strong className="text-lg font-semibold text-gray-800">
                    Mô tả:{" "}
                  </strong>
                  {isModalOpen.moTa}
                </p>
              </div>

              {/* Thông tin tuyển dụng */}
              <div className="flex justify-between">
                <div>
                  <h3 className=" text-lg font-semibold text-gray-800">
                    Thông Tin Tuyển Dụng
                  </h3>
                  <div className="text-sm text-gray-600 space-y-2 mt-2">
                    <p>
                      <strong>Vị Trí:</strong> {isModalOpen.viTri}
                    </p>
                    <p>
                      <strong>Số lượng cần tuyển:</strong> {isModalOpen.soLuong}{" "}
                      người
                    </p>
                    <p>
                      <strong>Nơi làm việc:</strong> {isModalOpen.diaChiCuThe},{" "}
                      {isModalOpen.tentinhThanh}
                    </p>
                    <p>
                      <strong>Hạn nộp:</strong> {isModalOpen.hanChot}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className=" text-lg font-semibold text-gray-800">
                    Yêu Cầu Công Việc
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                    {isModalOpen.yeuCau.map((item) => (
                      <li key={item.idYeuCau}>{item.noiDung}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Liên Lạc
                  </h3>
                  <div className="text-sm text-gray-600 space-y-2 mt-2">
                    <p className="flex items-center space-x-2">
                      <AiOutlineMail className="text-lg text-gray-600" />
                      <span className="text-sm text-gray-800">
                        {isModalOpen.email}
                      </span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <SlPhone className="text-lg text-gray-600" />
                      <span className="text-sm text-gray-800">
                        {isModalOpen.sdt}
                      </span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <TbWorld className="text-lg text-gray-600" />
                      <span className="text-sm text-gray-800">
                        {isModalOpen.linkWeb}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManagement;
