import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo-removebg-preview.png";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import getTimeAgo from "../../assets/Js/configTime";
import CandidateApi from "../../api/user/candidate";
import CompanyApi from "../../api/company/company";
import { IoIosSearch } from "react-icons/io";
import { toast } from "react-toastify";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

var user = JSON.parse(sessionStorage.getItem("data")) || {
  quyen: null,
};

function Navbar() {
  const [isDropdownInfo, setIsDropdownInfo] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterMode, setFilterMode] = useState("Tất Cả");
  const [notificationList, setNotificationList] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleViewSchedule = async (idBD, idTB) => {

    await CandidateApi.updateInfo(`notification/${idTB}`, [])
    const data = await CandidateApi.getInfo(
      `/${user.id}/job/${idBD}/view-schedule`
    );
    const tb = await CandidateApi.getInfo(`/${user.id}/notifycation`);
    setNotificationList(tb);

    const date = new Date(data.thoiBatDau);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Định dạng ngày tháng năm
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    data.thoiBatDau = `${hours}:${minutes} ngày ${formattedDate}`
    setSubmittedData(data);
    setShowSchedule(true);
  };

  const filteredNotifications = notificationList.filter((notification) =>
    filterMode === "Tất Cả" ? true : notification.trangThai === 0
  );

  const markAsRead = (id) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.idThongBao === id
          ? { ...notification, trangThai: 1 }
          : notification
      )
    );
  };
  const toggleDropdownNotifi = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownInfo(!isDropdownInfo);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.quyen === "User") {
          const tb = await CandidateApi.getInfo(`/${user.id}/notifycation`);
          setNotificationList(tb);
        } else {
          if (user.quyen === "Company") {
            const tb = await CompanyApi.getInfo(`/${user.id}/notifycation`);
            setNotificationList(tb);
            socket.on("new_notifycation_company", async (post) => {
              const tb = await CompanyApi.getInfo(`/${user.id}/notifycation`);
              setNotificationList(tb);
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    toast.success("Đăng xuất Thành Công");
    sessionStorage.removeItem("data");
    sessionStorage.clear();
    user = {
      quyen: null,
    };
    navigate("/");
  };
  return (
    <nav className="bg-custom text-white px-2 fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className=" mx-12 flex items-center justify-between">
        <ul className="flex gap-8 items-center m-0">
          <li>
            <div className="flex items-center justify-center py-2">
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-auto h-16 object-cover"
                />
              </Link>
            </div>
          </li>
          <li>
            <Link
              to="/"
              className="text-white uppercase no-underline hover:text-gray-300 transition duration-300"
            >
              Trang Chủ
            </Link>
          </li>
          {user.quyen === "User" && (
            <li>
              <Link
                to="/yourjob"
                className="text-white uppercase no-underline hover:text-gray-300 transition duration-300"
              >
                Việc Thích Hợp
              </Link>
            </li>
          )}

          <li>
            <Link
              to="/company"
              className="text-white uppercase no-underline hover:text-gray-300 transition duration-300"
            >
              Danh Nghiệp
            </Link>
          </li>
          {user.quyen === "Company" && (
            <li>
              <Link
                to="/post-job"
                className="text-white uppercase no-underline hover:text-gray-300 transition duration-300"
              >
                Đăng Bài
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white p-2 w-64 rounded-md pl-8 placeholder-gray-400"
            />
            <IoIosSearch className="absolute right-2 top-2 text-white text-xl" />
          </div>

          {user.quyen ? (
            <div className="flex justify-between items-center w-24 relative">
              <div className="relative" ref={dropdownRef}>
                <IoNotifications
                  className="text-2xl cursor-pointer"
                  onClick={toggleDropdownNotifi}
                />

                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 mt-2 bg-blue-200 text-black rounded-md shadow-md w-64 max-h-96 z-10 overflow-y-auto">
                    <div className="sticky top-0 bg-white z-20 shadow-sm">
                      <h5 className="p-2 font-bold border-b">Thông Báo</h5>
                      <div className="flex space-x-2 items-center px-2 py-2">
                        <button
                          className={`py-1 px-3 text-lg rounded ${
                            filterMode === "Tất Cả" ? "bg-green-100" : ""
                          }`}
                          onClick={() => setFilterMode("Tất Cả")}
                        >
                          Tất Cả
                        </button>
                        <button
                          className={`py-1 px-3 rounded ${
                            filterMode === "Chưa Đọc" ? "bg-red-100" : ""
                          }`}
                          onClick={() => setFilterMode("Chưa Đọc")}
                        >
                          Chưa Đọc
                        </button>
                      </div>
                    </div>
                    {user.quyen === "User" ? (
                      <ul className="p-0">
                        {filteredNotifications.length > 0 ? (
                          filteredNotifications.map((notification) => (
                            <li
                              key={notification.idThongBao}
                              className="px-2 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                              onClick={() =>
                                handleViewSchedule(notification.idBaiDang, notification.idThongBao)
                              }
                            >
                              <div className="flex space-x-2 items-center">
                                <img
                                  src={notification.hinhAnh}
                                  className="h-10 w-10 rounded-full"
                                  alt="Notification"
                                />
                                <div>
                                  <p
                                    className={` text-sm m-0 ${
                                      notification.trangThai === 0
                                        ? "font-bold"
                                        : ""
                                    }`}
                                  >
                                    {notification.noidung}
                                  </p>
                                  <p className="text-sm text-gray-500 m-0">
                                    {getTimeAgo(notification.thoiGian)}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <p className="p-4 text-center text-gray-500">
                            Không có thông báo
                          </p>
                        )}
                      </ul>
                    ) : (
                      <ul className="p-0">
                        {filteredNotifications.length > 0 ? (
                          filteredNotifications.map((notification) => (
                            <Link
                              to={`history/update-post/${notification.idBaiDang}`}
                              className="no-underline text-black"
                            >
                              {" "}
                              <li
                                key={notification.idThongBao}
                                className="px-2 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                  markAsRead(notification.idThongBao)
                                }
                              >
                                <div className="flex space-x-2 items-center">
                                  <img
                                    src={notification.hinhAnh}
                                    className="h-10 w-10 rounded-full"
                                    alt="Notification"
                                  />
                                  <div>
                                    <p
                                      className={` text-sm m-0 ${
                                        notification.trangThai === 0
                                          ? "font-bold"
                                          : ""
                                      }`}
                                    >
                                      {notification.noidung}
                                    </p>
                                    <p className="text-sm text-gray-500 m-0">
                                      {getTimeAgo(notification.thoiGian)}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </Link>
                          ))
                        ) : (
                          <p className="p-4 text-center text-gray-500">
                            Không có thông báo
                          </p>
                        )}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              {/* Avatar */}
              <div className="relative" ref={dropdownRef}>
                <img
                  className="w-10 h-10 bg-gray-600 rounded-full cursor-pointer"
                  src={user.avatar}
                  alt="User Avatar"
                  onClick={toggleDropdown}
                />

                {/* Dropdown */}
                {isDropdownInfo && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                    {user.quyen === "User" ? (
                      <ul className="text-sm text-red-600  font-semibold m-0 p-0 border-1 ">
                        <Link
                          to={`/info-candidate/${user.id}`}
                          class="no-underline color-item  rounder"
                        >
                          <li className="px-4 py-2 hover:bg-[#0cc0df] hover:text-white cursor-pointer">
                            Thông tin tài khoản
                          </li>
                        </Link>
                        <Link
                          to={`/forgot-password/${user.id}`}
                          class="no-underline color-item  rounder"
                        >
                          <li className="px-4 py-2 hover:bg-[#0cc0df] hover:text-white cursor-pointer">
                            Đổi mật khẩu
                          </li>
                        </Link>
                        <Link
                          to={`/CV/${user.id}`}
                          class="no-underline color-item  rounder"
                        >
                          <li className="px-4 py-2 hover:bg-[#0cc0df] hover:text-white cursor-pointer">
                            Cập nhật CV
                          </li>
                        </Link>

                        <li
                          className="px-4 py-2  cursor-pointer"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </li>
                      </ul>
                    ) : (
                      <ul className="text-sm text-red-600  font-semibold m-0 p-0 border-1 ">
                        <Link
                          to={`/info-company/${user.id}`}
                          class="no-underline color-item  rounder"
                        >
                          <li className="px-4 py-2 hover:bg-[#0cc0df] hover:text-white cursor-pointer">
                            Thông tin tài khoản
                          </li>
                        </Link>
                        <Link
                          to={`/forgot-password/${user.id}`}
                          class="no-underline color-item  rounder"
                        >
                          <li className="px-4 py-2 hover:bg-[#0cc0df] hover:text-white cursor-pointer">
                            Đổi mật khẩu
                          </li>
                        </Link>
                        <Link
                          to={`/history/${user.id}`}
                          class="no-underline color-item  rounder"
                        >
                          <li className="px-4 py-2 hover:bg-[#0cc0df] hover:text-white cursor-pointer">
                            Danh Sách bài Đăng
                          </li>
                        </Link>

                        <li
                          className="px-4 py-2  cursor-pointer"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <ul className="flex m-0 gap-8  items-center ">
                <li className="bg-color-item py-2 px-4 rounded-lg ">
                  <Link
                    to="/login"
                    className="text-white uppercase no-underline hover:text-gray-300 transition duration-300"
                  >
                    Đăng Nhập
                  </Link>
                </li>
                <li className="bg-color-item py-2 px-4 rounded-lg ">
                  <Link
                    to="/register"
                    className="text-white uppercase no-underline hover:text-gray-300 transition duration-300"
                  >
                    Đăng Kí
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {showSchedule && submittedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 border border-gray-300 text-gray-700 rounded-md w-full max-w-md shadow-lg">
            <button
              onClick={() => setShowSchedule(false)}
              className="mb-4 p-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Đóng
            </button>
            <h3 className="text-lg font-semibold">Lịch Phỏng Vấn</h3>
            <div className="mb-3">
              <p>
                <strong>Thời gian :</strong> {submittedData.thoiBatDau}
              </p>
              <p>
                <strong>Kiểu phỏng vấn:</strong> {submittedData.kieuPhongVan}
              </p>
              {submittedData.kieuPhongVan === "Online" ? (
                <p>
                  <strong>Link phỏng vấn:</strong> {submittedData.link}
                </p>
              ) : (
                <p>
                  <strong>Địa chỉ phỏng vấn:</strong> {submittedData.diaChi}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
