import React, { useState } from "react";
import AuthApi from "../../api/auth/auth";
import uploadImage from "../../assets/Js/UploadImage";

const position = await AuthApi.getAllAuth("/all-position");
const province = await AuthApi.getAllAuth("/all-city");
const level = await AuthApi.getAllAuth("/all-level");

const positions = position;
const provinces = province;
const levels = level;

const RegisterCandidate = () => {
  const [formData, setFormData] = useState({
    ten: "",
    ngaySinh: "",
    sdt: "+84",
    diaChi: "",
    email: "",
    matKhau: "",
    idViTri: "",
    luongBatDau: "",
    luongKetThuc: "",
    anhDaiDien: "",
    idTinhThanh: "",
    idCapDo: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.anhDaiDien !== null && formData.anhDaiDien !== "") {
        const url = await uploadImage(formData.anhDaiDien);
        formData.anhDaiDien = url;
      }
      if (formData.idCapDo !== null && formData.idCapDo !== "") {
        formData.idCapDo = parseInt(formData.idCapDo);
      } else {
        formData.idCapDo = 1;
      }
      if (formData.idTinhThanh !== null && formData.idTinhThanh !== "") {
        formData.idTinhThanh = parseInt(formData.idTinhThanh);
      } else {
        formData.idTinhThanh = 1;
      }

      if (formData.idViTri !== null && formData.idViTri !== "") {
        formData.idViTri = parseInt(formData.idViTri);
      } else {
        formData.idViTri = 1;
      }

      if (formData.luongBatDau !== null && formData.luongBatDau !== "") {
        formData.luongBatDau = parseFloat(formData.luongBatDau);
      } else {
        formData.luongBatDau = 1;
      }
      if (formData.luongKetThuc !== null && formData.luongKetThuc !== "") {
        formData.luongKetThuc = parseFloat(formData.luongKetThuc);
      } else {
        formData.luongKetThuc = 1;
      }

      if (formData.ngaySinh !== null && formData.ngaySinh !== "") {
        formData.ngaySinh = new Date(formData.ngaySinh);
      } else {
        formData.ngaySinh = new Date();
      }
      if (
        formData.kinhnghiemUnit !== null &&
        formData.kinhnghiemUnit !== "year"
      ) {
        formData.kinhnghiem = parseInt(formData.kinhnghiem * 12);
      }else{
        formData.kinhnghiem = parseInt(formData.kinhnghiem);
      }
      const { kinhnghiemUnit, ...rest } = formData; // Tách kinhnghiemUnit và giữ lại các phần khác
      setFormData(rest);
      console.log(formData);
      const data = await AuthApi.auth(formData, "/register-candidate");
      if (data.status < 300) {
        setTimeout(() => {
          window.location.href = " http://localhost:3000/login";
        }, 5000);
      }
    } catch (error) {
      console.log(error.response?.data || "An error occurred");
    }

    // navigate("/register-CV", { state: formData });
  };
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      anhDaiDien: e.target.files[0],
    });
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="flex flex-col justify-center items-center bg-black text-white w-full md:w-1/2 pt-2">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-color-item w-6 h-8 mr-2"></div>
            <h1 className="text-3xl color-item font-bold">D</h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Chào mừng đến với cộng đồng DevJobs
          </h2>
          <p className="text-gray-400 mb-8">
            Nơi quy tụ hàng ngàn lập trình viên trên khắp Việt Nam
          </p>
          <a
            href="/"
            className="text-green-400 font-semibold hover:no-underline "
          >
            Wellcome
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-black w-full md:w-1/2 p-2">
        <h2 className="text-2xl font-bold text-gray-800 text-center ">
          Đăng Ký Tài Khoản
        </h2>
        <div className="bg-white p-2 rounded-lg shadow-md w-full max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="ten" className="block text-gray-700 font-medium">
                Tên
              </label>
              <input
                type="text"
                id="ten"
                name="ten"
                value={formData.ten}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Nhập tên của bạn"
                required
              />
            </div>
            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="matKhau"
                  className="block text-gray-700 font-medium"
                >
                  Mật Khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="matKhau"
                    name="matKhau"
                    value={formData.matKhau}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-green-500"
                    placeholder="Nhập mật khẩu"
                    required
                    minLength={8}
                    maxLength={100}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2.5 text-gray-600 focus:outline-none"
                  >
                    {showPassword ? "Ẩn" : "Hiển Thị"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="diaChi"
                className="block text-gray-700 font-medium"
              >
                Địa Chỉ
              </label>
              <input
                type="text"
                id="diaChi"
                name="diaChi"
                value={formData.diaChi}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Nhập địa chỉ"
                required
              />
            </div>
            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <label
                  htmlFor="ngaySinh"
                  className="block text-gray-700 font-medium"
                >
                  Ngày Sinh
                </label>
                <input
                  type="date"
                  id="ngaySinh"
                  name="ngaySinh"
                  value={formData.ngaySinh}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Số điện thoại */}
              <div className="flex-1">
                <label
                  htmlFor="sdt"
                  className="block text-gray-700 font-medium"
                >
                  Số Điện Thoại
                </label>
                <input
                  type="tel"
                  id="sdt"
                  name="sdt"
                  value={formData.sdt}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <label
                  htmlFor="luongBatDau"
                  className="block text-gray-700 font-medium"
                >
                  Lương Bắt Đầu
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    id="luongBatDau"
                    name="luongBatDau"
                    value={formData.luongBatDau}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Nhập lương bắt đầu (VND)"
                    required
                  />
                  <span className="font-bold">VND</span>
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="luongKetThuc"
                  className="block text-gray-700 font-medium"
                >
                  Lương Kết Thúc
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    id="luongKetThuc"
                    name="luongKetThuc"
                    value={formData.luongKetThuc}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Nhập lương kết thúc"
                    required
                  />
                  <span className="font-bold">VND</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <label
                  htmlFor="idViTri"
                  className="block text-gray-700 font-medium"
                >
                  Vị Trí Ứng Tuyển
                </label>
                <select
                  id="idViTri"
                  name="idViTri"
                  value={formData.idViTri}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="" disabled>
                    Chọn vị trí
                  </option>
                  {positions.map((position) => (
                    <option key={position.idViTri} value={position.idViTri}>
                      {position.tenViTri}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label
                  htmlFor="idTinhThanh"
                  className="block text-gray-700 font-medium"
                >
                  Tỉnh Thành
                </label>
                <select
                  id="idTinhThanh"
                  name="idTinhThanh"
                  value={formData.idTinhThanh}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="" disabled>
                    Chọn tỉnh thành
                  </option>
                  {provinces.map((province) => (
                    <option
                      key={province.idTinhThanh}
                      value={province.idTinhThanh}
                    >
                      {province.tenTinhThanh}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex-1">
                <label
                  htmlFor="TrinhDo"
                  className="block text-gray-700 font-medium"
                >
                  Trình Độ
                </label>
                <select
                  id="TrinhDo"
                  name="TrinhDo"
                  value={formData.TrinhDo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Chọn Trình Độ</option>
                  {education_level.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="idViTri"
                  className="block text-gray-700 font-medium"
                >
                  Cấp Độ
                </label>
                <select
                  id="idCapDo"
                  name="idCapDo"
                  value={formData.idCapDo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="" disabled>
                    Chọn cấp độ
                  </option>
                  {levels.map((level) => (
                    <option key={level.idCapDo} value={level.idCapDo}>
                      {level.tenCapDo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex flex-col">
                <label
                  htmlFor="kinhnghiem"
                  className="block text-gray-700 font-medium"
                >
                  Kinh Nghiệm
                </label>
                <div className="flex items-center space-x-2">
                  {/* Input số kinh nghiệm */}
                  <input
                    type="number"
                    id="kinhnghiem"
                    name="kinhnghiem"
                    value={formData.kinhnghiem}
                    onChange={handleChange}
                    className="w-3/5 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Nhập số"
                    required
                  />
                  {/* Dropdown chọn đơn vị */}
                  <select
                    id="kinhnghiemUnit"
                    name="kinhnghiemUnit"
                    value={formData.kinhnghiemUnit}
                    onChange={handleChange}
                    className="w-2/5 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="month">Tháng</option>
                    <option value="year">Năm</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="anhDaiDien"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ảnh Đại Diện
                </label>
                <input
                  type="file"
                  id="anhDaiDien"
                  name="anhDaiDien"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 mt-4 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            >
              Đăng Ký
            </button>
          </form>
        </div>
        <p class="text-black p-2">
          Already have an account? <a href="/login"> Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterCandidate;
