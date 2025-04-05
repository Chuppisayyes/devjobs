import React, { useState, useEffect } from "react";
import uploadImage from "../../../assets/Js/UploadImage";
import { toast } from "react-toastify";
import CompanyApi from "../../../api/company/company";
import { useNavigate } from "react-router-dom";

const InfoCompany = () => {


  const [isEditing, setIsEditing] = useState(true);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        try {
          var user = JSON.parse(sessionStorage.getItem("data"));
          const posts = await CompanyApi.getInfo(`/${user.id}`);
          setEditedData(posts);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  const handleSave = async () => {
    try {
   var user = JSON.parse(sessionStorage.getItem("data"));

     await CompanyApi.updateInfo(`/${user.id}/update`, editedData);
      const posts = await CompanyApi.getInfo(`/${user.id}`);
      setEditedData(posts);
      setIsEditing(true)
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleLockAccount = async () => {
    try {
      var user = JSON.parse(sessionStorage.getItem("data"));
      await CompanyApi.updateInfo(`/${user.id}/lock-account`, editedData);
     
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleChange = (field) => (event) => {
    setEditedData({
      ...editedData,
      [field]: event.target.value,
    });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Lấy file từ input
    if (file) {
      try {
        const url = await uploadImage(file);
        if (url) {
          setEditedData((prev) => ({
            ...prev,
            logo: url,
          }));
        } else {
          toast.error("Có lỗi xảy ra khi tải ảnh lên.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Có lỗi xảy ra trong quá trình tải ảnh lên.");
      }
    }
  };

  return (
    <div className="relative inset-0 flex  py-16 justify-center text-black bg-opacity-50">
      <div className="relative bg-white py-6 px-12 rounded-lg shadow-lg w-1/2">
        <div className="text-center">
          <div className="flex flex-col items-center space-y-2">
            {/* Hiển thị ảnh đại diện */}
            <img
              src={editedData.logo || "default-avatar-url"} // Nếu không có ảnh, hiển thị ảnh mặc định
              alt="Avatar"
              className="w-20 h-20 rounded-full"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            )}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <input
              type="text"
              value={editedData.tenCongTy}
              onChange={handleChange("tenCongTy")}
              className="border  rounded px-2 py-1 justify-center min-w-1/4 text-xl font-semibold mb-2 flex flex-col text-orange-600"
            />
            <input
              type="text"
              value={editedData.nganhNghe}
              onChange={handleChange("nganhNghe")}
              className="border rounded px-2 py-1 justify-center min-w-1/4 text-gray-900 text-sm mb-4 text-green-600"
            />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-2">
            <p className=" px-2 mb-2 flex flex-col">
              <strong>Địa Chỉ:</strong>{" "}
              <input
                type="text"
                value={editedData.diaChi}
                onChange={handleChange("diaChi")}
                className="border rounded px-2 py-1 w-full "
              />
            </p>
          </div>
          <div>
            <p className=" px-2 mb-2 flex flex-col">
              <strong>Email:</strong>{" "}
              <input
                type="email"
                value={editedData.email}
                onChange={handleChange("email")}
                className="border rounded px-2 py-1 w-full "
              />
            </p>
            <p className=" px-2 mb-2 flex flex-col">
              <strong>Số Điện Thoại:</strong>{" "}
              <input
                type="tel"
                value={editedData.sDT}
                onChange={handleChange("sDT")}
                className="border rounded px-2 py-1 w-full "
              />
            </p>
            <p className=" px-2 mb-2 flex flex-col">
              <strong>Website:</strong>{" "}
              <input
                type="url"
                value={editedData.linkWeb}
                onChange={handleChange("linkWeb")}
                className="border rounded px-2 py-1 w-full "
              />
            </p>
          </div>
          <div>
            <p className=" px-2 mb-2 flex flex-col">
              <strong>Trạng Thái:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.trangThai}
                  className="border rounded px-2 py-1 w-full "
                />
              ) : (
                editedData.trangThai
              )}
            </p>
            <p className=" px-2 mb-2 flex flex-col">
              <strong>Ngày Thành Lập:</strong>{" "}
              {isEditing ? (
                <input
                  type="date"
                  value={editedData.ngayThanhLap}
                  onChange={handleChange("ngayThanhLap")}
                  className="border rounded px-2 py-1 w-full "
                />
              ) : (
                editedData.ngayThanLap
              )}
            </p>
            <p className=" px-2 mb-2 flex flex-col">
              <strong>Số Lượng Nhân Viên:</strong>{" "}
              <input
                type="number"
                value={editedData.soLuongNhanVien}
                onChange={handleChange("soLuongNhanVien")}
                className="border rounded px-2 py-1 w-full "
              />
            </p>
          </div>
          <div className="col-span-2">
            <p className=" px-2 mb-2 flex flex-col">
              <strong>Mô Tả:</strong>{" "}
              <textarea
                value={editedData.moTa}
                onChange={handleChange("moTa")}
                className="border rounded px-2 py-1 w-full "
              />
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-700"
          >
            Lưu
          </button>
        </div>
        
      </div>
      <div className="relative ">
          <button
            onClick={handleLockAccount}
            className="bg-yellow-500 absolute text-sm w-36 top-10 right-10 text-white py-2 px-2 rounded hover:bg-yellow-700"
          >
            Khóa Tài Khoản
          </button>
        </div>
    </div>
  );
};

export default InfoCompany;
