import React, { useState } from "react";
import uploadImage from "../../assets/Js/UploadImage";
import AdminApi from "../../api/admin/admin";

const AddAdmin = () => {
  const [user, setUser] = useState({
    ten: "",
    email: "",
    anhDaiDien: "",
    ngaySinh: "",
    sDT: "",
    matKhau: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImage(file);
      setUser((prev) => ({
        ...prev,
        anhDaiDien: url,
      }));
    }
  };

  const handleSave = async () => {
    try {
      console.log(user)
     await AdminApi.AddManager("/add/admin",user)
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setUser({
        ten: "",
        email: "",
        anhDaiDien: "",
        ngaySinh: "",
        sDT: "",
        matKhau: ""
      });
    }
  };

  return (
    <div className="p-2 bg-custom-item min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-center mb-4">Thêm Admin</h2>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <img
              src={user.anhDaiDien || "https://via.placeholder.com/150"}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full"
            />
            <input
              type="file"
              
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full py-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <input
            type="text"
            name="ten"
            required
            value={user.ten}
            onChange={handleChange}
            placeholder="Tên người dùng"
            className="mt-1 block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            name="matKhau"
            required
            value={user.matKhau}
            onChange={handleChange}
            placeholder="Mật khẩu"
            className="mt-1 block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="mt-1 block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="date"
            name="ngaySinh"
            value={user.ngaySinh}
            required
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="text"
            name="sDT"
            value={user.sDT}
            onChange={handleChange}
            required
            placeholder="Số điện thoại"
            className="mt-1 block w-full px-3 py-2 my-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
