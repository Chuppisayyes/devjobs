import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa"; // Icon từ react-icons
import { MdAddCircle } from "react-icons/md"; // Icon khác nếu cần

import AdminApi from "../../api/admin/admin";

const ProvinceManagement = () => {
  const [provinces, setProvinces] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProvince, setEditedProvince] = useState({
    tenTinhThanh: "",
    trangThai: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newProvince, setNewProvince] = useState({
    tenTinhThanh: "",
    trangThai: "Đã Duyệt",
    viDo: "",
    kinhDo: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const province = await AdminApi.getAdmin("/all-city");
        setProvinces(province);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (province) => {
    setEditingId(province.idTinhThanh); // Đặt chế độ chỉnh sửa
    setEditedProvince({
      tenTinhThanh: province.tenTinhThanh,
      trangThai: province.trangThai,
      viDo: province.viDo,
      kinhDo: province.kinhDo,
    });
  };

  const handleSaveClick = async (id) => {
    setProvinces((prevProvinces) =>
      prevProvinces.map((province) =>
        province.idTinhThanh === id
          ? { ...province, ...editedProvince }
          : province
      )
    );
    const data = {
      idTinhThanh: id,
      ...editedProvince,
    };

    await AdminApi.getUpdateManager("/update/province", data);
    await AdminApi.getAdmin("/all-city").then((res) => {
      setEditingId(res);
    });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleAddProvince = () => {
    setIsAdding(true);
  };

  const handleSaveNewProvince = async () => {
    if (newProvince.tenTinhThanh.trim() !== "") {
      const data = {
        ten: newProvince.tenTinhThanh.trim(),
        viDo: newProvince.viDo,
        kinhDo: newProvince.kinhDo,
      };
      await AdminApi.AddManager("add/province", data);
      const province = await AdminApi.getAdmin("/all-city");
      setProvinces(province);
      setIsAdding(false);
    }
  };

  const handleCancelNewProvince = () => {
    setIsAdding(false); // Thoát chế độ thêm mới
    setNewProvince({ tenTinhThanh: "", trangThai: "Đã Duyệt" });
  };

  return (
    <div className="flex flex-col w-1/2  mr-2 bg-custom-item rounded h-full ">
      {/* Header */}
      <div className="shadow-md rounded pl-6 py-2 flex items-center justify-between">
        <h1 className="text-lg text-white font-bold">Quản lý tỉnh thành</h1>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-h-70 overflow-y-auto space-y-2">
          {provinces.map((province) => (
            <div
              key={province.idTinhThanh}
              className="flex items-center justify-between bg-white shadow-md rounded-md px-3 py-2"
            >
              {/* Left Content */}
              <div>
                {editingId === province.idTinhThanh ? (
                  <>
                    <input
                      type="text"
                      value={editedProvince.tenTinhThanh}
                      onChange={(e) =>
                        setEditedProvince((prev) => ({
                          ...prev,
                          tenTinhThanh: e.target.value,
                        }))
                      }
                      className="border rounded p-1 text-sm"
                    />
                    <select
                      value={editedProvince.trangThai}
                      onChange={(e) =>
                        setEditedProvince((prev) => ({
                          ...prev,
                          trangThai: e.target.value,
                        }))
                      }
                      className="border rounded p-1 text-sm ml-2"
                    >
                      <option value="Đã Duyệt">Đã Duyệt</option>
                      <option value="Đã Khóa">Khóa</option>
                    </select>
                    <input
                      type="number"
                      value={editedProvince.viDo}
                      onChange={(e) =>
                        setEditedProvince((prev) => ({
                          ...prev,
                          viDo: e.target.value,
                        }))
                      }
                      className="border rounded p-1 text-sm mt-1"
                    />
                    <input
                      type="number"
                      value={editedProvince.kinhDo}
                      onChange={(e) =>
                        setEditedProvince((prev) => ({
                          ...prev,
                          kinhDo: e.target.value,
                        }))
                      }
                      className="border rounded p-1 mt-1 text-sm"
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-base mr-5">
                      {province.tenTinhThanh}
                    </h2>
                    <h2 className=" boder-1 text-sm mr-2">
                      Vĩ độ: {province.viDo}
                    </h2>
                    <h2 className=" text-sm mr-2">
                      kinh độ: {province.kinhDo}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        province.trangThai === "Đã Khóa"
                          ? "bg-red-100 text-red-500"
                          : province.trangThai === "Đã Duyệt"
                          ? "bg-green-100 text-green-500"
                          : "bg-green-100 text-green-500"
                      }`}
                    >
                      {province.trangThai}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Content */}
              <div className="flex items-center">
                {editingId === province.idTinhThanh ? (
                  <>
                    <button
                      className="text-green-500 hover:text-green-600 mx-2"
                      onClick={() => handleSaveClick(province.idTinhThanh)}
                    >
                      Lưu
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-600"
                      onClick={handleCancelClick}
                    >
                      Hủy
                    </button>
                  </>
                ) : (
                  <button
                    className="text-yellow-500 hover:text-yellow-600 mx-2"
                    onClick={() => handleEditClick(province)}
                  >
                    <FaEdit size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shadow-md bg-custom-item justify-between p-4">
  {isAdding ? (
    <div className="items-center justify-between bg-white shadow-md rounded-md px-3 py-2">
      <div className="flex  gap-2">
        {["Tên tỉnh/thành", "Vĩ độ", "Kinh độ"].map((placeholder, index) => (
          <input
            key={index}
            type={index === 0 ? "text" : "number"}
            value={
              index === 0
                ? newProvince.tenTinhThanh
                : index === 1
                ? newProvince.viDo
                : newProvince.kinhDo
            }
            onChange={(e) =>
              setNewProvince((prev) => ({
                ...prev,
                [index === 0
                  ? "tenTinhThanh"
                  : index === 1
                  ? "viDo"
                  : "kinhDo"]: e.target.value,
              }))
            }
            placeholder={placeholder}
            className="border rounded p-1 text-sm w-1/3"
          />
        ))}
      </div>
      {/* Nút lưu/hủy */}
      <div className="flex items-center justify-end mt-2">
        <button
          className="text-green-500 hover:text-green-600 mx-2"
          onClick={handleSaveNewProvince}
        >
          Lưu
        </button>
        <button
          className="text-gray-500 hover:text-gray-600"
          onClick={handleCancelNewProvince}
        >
          Hủy
        </button>
      </div>
    </div>
  ) : (
    <button
      className="bg-orange-500 mt-2 text-white text-text-sm px-3 py-2 rounded-md hover:bg-orange-600 flex items-center gap-2"
      onClick={handleAddProvince}
    >
      <MdAddCircle size={16} />
      Thêm tỉnh/thành phố
    </button>
  )}
</div>

    </div>
  );
};

export default ProvinceManagement;
