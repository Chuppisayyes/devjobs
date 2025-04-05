import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CompanyApi from "../../api/company/company";
import { FaStar } from "react-icons/fa";

const CandidateList = ({ candidates, setCandidates }) => {
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const { idJob } = useParams();
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [formData, setFormData] = useState({
    startTime: "",
    interviewType: "Online",
    interviewLink: "",
    interviewAddress: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  // Hàm để hiển thị form khi duyệt ứng viên
  const handleApproveClick = (candidate) => {
    setSelectedCandidate(candidate);
    setShowInterviewForm(true);
  };

  // Hàm để thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(selectedCandidate.idNguoiDung);

    const data = {
      newStatus: "Đã Duyệt",
      startTime: formData.startTime,
      interviewType: formData.interviewType,
      interviewLink: formData.interviewLink,
      interviewAddress: formData.interviewAddress,
    };
    await handleStatusChange(selectedCandidate, data);
    setShowInterviewForm(false);
  };

  // Thay đổi trạng thái của ứng viên
  const handleStatusChange = async (idND, newStatus) => {
    const data = {
      newStatus: newStatus,
      startTime: formData.startTime,
      interviewType: formData.interviewType,
      interviewLink: formData.interviewLink,
      interviewAddress: formData.interviewAddress,
    };
    await CompanyApi.updateInfo(
      `job/${idJob}/update-status/candidate/${idND}`,
      data
    );
    await CompanyApi.AddInfo(`/${idJob}/add-notifycation/${idND}`);
    const listCandidate = await CompanyApi.getInfo(`all-candidate/${idJob}`);
    setCandidates(listCandidate);
  };

  const handleStarClick = async (idND, currentStatus) => {
    const newStatus = currentStatus === "Chờ Duyệt" ? "Đã Note" : "Chờ Duyệt";
    const data = {
      newStatus: newStatus,
    };
    await CompanyApi.updateInfo(
      `job/${idJob}/update-note/candidate/${idND}`,
      data
    );
    const listCandidate = await CompanyApi.getInfo(`all-candidate/${idJob}`);
    setCandidates(listCandidate);
  };
  const handleViewSchedule = async (idND) => {
    const data = await CompanyApi.getInfo(
      `job/${idJob}/view-schedule/candidate/${idND}`
    );

    const date = new Date(data.thoiBatDau);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Định dạng ngày tháng năm
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    data.thoiBatDau = `${hours}:${minutes} ngày ${formattedDate}`;
    setSubmittedData(data);
    setShowSchedule(true);
  };
  const filteredCandidates =
    filterStatus === "Tất cả"
      ? candidates
      : candidates.filter((candidate) => candidate.trangThai === filterStatus);

  return (
    <div className="py-6 px-2">
      <h2 className="text-xl font-medium mb-3">Danh sách ứng viên</h2>

      {/* Lọc theo trạng thái */}
      <div className="mb-4 flex items-center">
        <label className="mr-2 text-lg">Trạng thái:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-1 border border-gray-300 rounded-md"
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Chờ Duyệt">Chờ Duyệt</option>
          <option value="Đã Note">Đã Note</option>
          <option value="Đã Duyệt">Đã Duyệt</option>
        </select>
      </div>

      {/* Danh sách ứng viên */}
      <ul className="p-0 space-y-4">
        {filteredCandidates.map((candidate) => (
          <li
            key={candidate.idNguoiDung}
            className="flex items-center px-1 justify-between"
          >
            <Link
              to={`/view/CV/${candidate.idNguoiDung}`}
              className="no-underline text-black"
            >
              <div className="flex items-center">
                <img
                  src={candidate.logo}
                  alt={candidate.tenNguoiDung}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span className="text-sm overflow-hidden whitespace-nowrap text-ellipsis w-28">
                  {candidate.tenNguoiDung}
                </span>
              </div>
            </Link>

            <div className="flex items-center space-x-2">
              {candidate.trangThai === "Chờ Duyệt" && (
                <div className="flex items-center space-x-4">
                  <span  className="px-1 text-red-500">{candidate.doHopNhau} %</span>
                  <button
                    onClick={() =>
                      handleStarClick(
                        candidate.idNguoiDung,
                        candidate.trangThai
                      )
                    }
                  >
                    <FaStar className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleApproveClick(candidate.idNguoiDung)}
                    className="p-2 border border-red-500 text-green-500 rounded-md"
                  >
                    Duyệt
                  </button>
                </div>
              )}
              {candidate.trangThai === "Đã Note" && (
                <div className="flex items-center space-x-4 ">
                  <span className="px-1 text-green-500">{candidate.doHopNhau} %</span>
                  <button
                    onClick={() =>
                      handleStarClick(
                        candidate.idNguoiDung,
                        candidate.trangThai
                      )
                    }
                    className=" text-yellow-500  "
                  >
                    <FaStar className="text-lg text-yellow-500 " />
                  </button>
                  <button
                    onClick={() => handleApproveClick(candidate.idNguoiDung)}
                    className="p-2 border border-green-500 text-green-500 rounded-md"
                  >
                    Duyệt
                  </button>
                </div>
              )}
              {candidate.trangThai === "Đã Duyệt" && (
                <div className="flex flex-col">
                  <span className="text-green-500 font-semibold">Đã Duyệt</span>
                  <button
                    onClick={() => handleViewSchedule(candidate.idNguoiDung)}
                    className="text-yellow-500 font-semibold"
                  >
                    xem lịch
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {showInterviewForm && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-semibold">Thông tin phỏng vấn</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block mb-1">Thời gian bắt đầu phỏng vấn</label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Kiểu phỏng vấn</label>
              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            {formData.interviewType === "Online" && (
              <div className="mb-3">
                <label className="block mb-1">Link phỏng vấn</label>
                <input
                  type="url"
                  name="interviewLink"
                  value={formData.interviewLink}
                  onChange={handleChange}
                  required
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            )}

            {formData.interviewType === "Offline" && (
              <div className="mb-3">
                <label className="block mb-1">Địa chỉ phỏng vấn</label>
                <input
                  type="text"
                  name="interviewAddress"
                  value={formData.interviewAddress}
                  onChange={handleChange}
                  required
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            >
              Gửi thông tin
            </button>
            <button
              type="button"
              onClick={() => setShowInterviewForm(false)}
              className="ml-2 p-2 border border-gray-300 text-gray-700 rounded-md"
            >
              Hủy
            </button>
          </form>
        </div>
      )}

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
    </div>
  );
};

export default CandidateList;
