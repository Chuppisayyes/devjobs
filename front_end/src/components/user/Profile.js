import React, { useState, useEffect } from "react";
import CandidateApi from "../../api/user/candidate";
import AuthApi from "../../api/auth/auth";
import uploadImage from "../../assets/Js/UploadImage";
import { toast } from "react-toastify";
const Profile = () => {
  const [candidate, setCandidate] = useState({
    idNguoiDung: "",
    ten: "",
    idViTri: 1,
    email: "",
    idTinhThanh: 1,
    trangThai: "",
    anhDaiDien: "",
    ngaySinh: "",
    sdt: "",
    luongBatDau: 0,
    luongKetThuc: 0,
    idCapDo: 1,
  });
  const [viTriOptions, setViTriOptions] = useState([
    { idViTri: 1, tenViTri: "A" },
  ]);
  const [tinhThanhOptions, setTinhThanhOptions] = useState([
    { idTinhThanh: 1, tenTinhThanh: "a" },
  ]);
  const [capDoOptions, setCapDoOptions] = useState([
    { idCapDo: 1, tenCapDo: "a" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        var user = JSON.parse(sessionStorage.getItem("data"));

        const info = await CandidateApi.getInfo(`/${user.id}`);
        const tinhThanh = await AuthApi.getAllAuth(`all-city`);
        const viTri = await AuthApi.getAllAuth(`all-position`);
        const capDo = await AuthApi.getAllAuth(`all-level`);
        console.log(info)
        setViTriOptions(viTri);
        setTinhThanhOptions(tinhThanh);
        setCapDoOptions(capDo);
        setCandidate(info);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const education_level = [
    "Chứng chỉ nghề",
    "Cao đẳng",
    "Cử nhân",
    "Kỹ sư",
    "Thạc sĩ",
    "Tiến sĩ",
    "Phó giáo sư",
    "Giáo sư",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Lấy file từ input
    if (file) {
      try {
        const url = await uploadImage(file);
        if (url) {
          setCandidate((prev) => ({
            ...prev,
            anhDaiDien: url,
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

  const toggleEdit = () => {
    setIsEditing(true);
  };

  const saveData = async () => {
    if (
      candidate.kinhnghiemUnit !== null &&
      candidate.kinhnghiemUnit == "year"
    ) {
      candidate.kinhnghiem = parseInt(candidate.kinhnghiem * 12);
    } else {
      candidate.kinhnghiem = parseInt(candidate.kinhnghiem);
    }
    const { kinhnghiemUnit, ...rest } = candidate;
    setCandidate(rest);
    console.log(candidate)
    var user = JSON.parse(sessionStorage.getItem("data"));
    await CandidateApi.updateInfo(`/${user.id}/update`, candidate);
   
   setTimeout(async() => {
    setIsEditing(false);
    const info = await CandidateApi.getInfo(`/${user.id}`);
    setCandidate(info);
   }, 1000);
  };

  return (
    <div className="p-2 bg-custom-item min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl">
        <div className="items-center space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <img
              src={candidate.anhDaiDien}
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
          {isEditing ? (
            <input
              type="text"
              name="ten"
              required
              value={candidate.ten}
              onChange={handleChange}
              placeholder="Tên ứng viên"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <h2 className="text-xl flex flex-col items-center font-bold">
              {candidate.ten}
            </h2>
          )}
        </div>
        <div>
          {isEditing ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vị Trí
              </label>
              <select
                name="idViTri"
                value={candidate.idViTri}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {viTriOptions.map((option) => (
                  <option key={option.idViTri} value={option.idViTri}>
                    {option.tenViTri}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-xl flex flex-col items-center ">
              {
                viTriOptions.find(
                  (option) => option.idViTri === candidate.idViTri
                )?.tenViTri
              }
            </p>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* Tỉnh thành */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tỉnh thành
            </label>
            {isEditing ? (
              <select
                name="idTinhThanh"
                value={candidate.idTinhThanh}
                required
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {tinhThanhOptions.map((option) => (
                  <option key={option.idTinhThanh} value={option.idTinhThanh}>
                    {option.tenTinhThanh}
                  </option>
                ))}
              </select>
            ) : (
              <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                {
                  tinhThanhOptions.find(
                    (option) => option.idTinhThanh === candidate.idTinhThanh
                  )?.tenTinhThanh
                }
              </p>
            )}
          </div>

          {/* Cấp độ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cấp độ
            </label>
            {isEditing ? (
              <select
                name="idCapDo"
                value={candidate.idCapDo}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {capDoOptions.map((option) => (
                  <option key={option.idCapDo} value={option.idCapDo}>
                    {option.tenCapDo}
                  </option>
                ))}
              </select>
            ) : (
              <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                {
                  capDoOptions.find(
                    (option) => option.idCapDo === candidate.idCapDo
                  )?.tenCapDo
                }
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* Tỉnh thành */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trình độ
            </label>
            {isEditing ? (
              <select
                name="trinhDo"
                value={candidate.trinhDo}
                required
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn Trình Độ</option>
                {education_level.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            ) : (
              <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                {candidate.trinhDo}
              </p>
            )}
          </div>

          {/* Cấp độ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kinh nghiệm
            </label>
            {isEditing ? (
            <div className="flex mt-1">
            <input
              type="number"
              id="kinhnghiem"
              name="kinhnghiem"
              value={candidate.kinhnghiem}
              onChange={handleChange}
              className="w-3/5 px-3 py-2 border rounded"
              placeholder="Nhập số"
            />
            <select
              id="kinhnghiemUnit"
              name="kinhnghiemUnit"
              value={candidate.KinhnghiemUnit}
              onChange={handleChange}
              className="w-2/5 px-3 py-2 border rounded ml-1"
            >
              <option value="month">Tháng</option>
              <option value="year">Năm</option>
            </select>
          </div>
            ) : (
              <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
               {candidate.kinhnghiem
                      ? candidate.kinhnghiem < 12
                        ? `${candidate.kinhnghiem} tháng`
                        : `${Math.floor(candidate.kinhnghiem / 12)} năm`
                      : "Không yêu cầu"}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-4 boder-1">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                required
                value={candidate.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 block w-full px-3 py-2 text-gray-600 border rounded-md shadow-sm">
                {candidate.email}
              </p>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ngày Sinh
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="ngaySinh"
                  value={candidate.ngaySinh}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="mt-1 block w-full px-3 py-2 text-gray-600 border rounded-md shadow-sm">
                  {candidate.ngaySinh}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số Điện Thoại
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="sdt"
                  value={candidate.sdt}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="mt-1 block w-full px-3 py-2 text-gray-600 border rounded-md shadow-sm">
                  {candidate.sdt}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lương Bắt Đầu
            </label>
            {isEditing ? (
              <div className="flex w-full jsutify-center items-center ">
                <input
                  name="luongBatDau"
                  value={candidate.luongBatDau}
                  onChange={handleChange}
                  type="number"
                  required
                  className="mt-1  w-5/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></input>
                <span className="w-1/6 px-2 font-bold">VND</span>
              </div>
            ) : (
              <div className="flex w-full jsutify-center items-center ">
                <p className="mt-1  w-5/6  px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                  {candidate.luongBatDau}
                </p>
                <span className="w-1/6 px-2 font-bold">VND</span>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lương Kết Thúc
            </label>
            {isEditing ? (
              <div className="flex w-full jsutify-center items-center ">
                <input
                  name="luongKetThuc"
                  value={candidate.luongKetThuc}
                  onChange={handleChange}
                  type="number"
                  required
                  className="mt-1  w-5/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></input>
                <span className="w-1/6 px-2 font-bold">VND</span>
              </div>
            ) : (
              <div className="flex w-full jsutify-center items-center ">
                <p className="mt-1  w-5/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                  {candidate.luongKetThuc}
                </p>
                <span className="w-1/6 px-2 font-bold">VND</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {isEditing ? (
            <button
              onClick={saveData}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Lưu
            </button>
          ) : (
            <button
              onClick={toggleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
