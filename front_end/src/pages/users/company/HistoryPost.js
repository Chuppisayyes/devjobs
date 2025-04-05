import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompanyApi from "../../../api/company/company";

const HistoryPost = () => {
  const statusOptions = ["Sửa", "Duyệt", "Hủy", "Khóa"];
  const [posts, setPost] = useState([]);
  const [currentPost, setCurrentPost] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        var user = JSON.parse(sessionStorage.getItem("data"));
        const posts = await CompanyApi.getInfo(`/${user.id}/all-job`);
        setPost(posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const itemsPerPage = 5;
  const totalPages =
    posts.length > 0 ? Math.ceil(posts.length / itemsPerPage) : 1;

  const handleStatusChange = async (id, newStatus) => {
    try {
      await CompanyApi.updateStatus(id, newStatus); // Cần định nghĩa API này
      const update = posts.map((post) =>
        post.id_baiDang === id
          ? {
              ...post,
              trangThai:
                newStatus === "Duyệt"
                  ? "Đã Duyệt"
                  : newStatus === "Hủy"
                  ? "Đã Hủy"
                  : "Đã Khóa",
            }
          : post
      );
      setPost(update);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const startIndex = (currentPost - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = posts.slice(startIndex, endIndex);
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
      <div className="overflow-x-auto shadow-md sm:rounded-lg ">
        {currentData.length > 0 ? (
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
                  key={post.id_baiDang}
                  className="bg-gray-800 border-b text-white cursor-pointer"
                >
                  <td className="px-6 py-3 font-medium text-white">
                    {post.id_baiDang}
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
                          : post.trangThai === "Chờ Duyệt"
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
                        handleStatusChange(post.id_baiDang, e.target.value)
                      }
                      className="border border-gray-300 text-gray-900 rounded-md text-sm p-1"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <Link
                      to={`/history/update-post/${post.idBaiDang}`}
                      className="text-xs pt-2 pl-2 text-white hover:text-red-200 no-underline"
                    >
                      Xem Thông Tin
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <tr>
            <td colSpan="7" className="text-center text-gray-300">
              Không có bài đăng nào.
            </td>
          </tr>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPost((prev) => Math.max(prev - 1, 1))}
          disabled={currentPost === 1}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPost} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPost((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPost === totalPages}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HistoryPost;
