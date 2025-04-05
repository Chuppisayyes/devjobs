import React, { useState } from "react";
import AdminApi from "../../api/admin/admin";

const ChangePasswordAdmin = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChangePassword = async(e) => {
    e.preventDefault();
    setError("");
    setSuccess("");


    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    if (currentPassword >= 8 && newPassword.length >= 8) {
      const dataAdmin = await sessionStorage.getItem("admin");
      if (dataAdmin) {
        const adminData = JSON.parse(dataAdmin);
        const data = {
          id: adminData.id,
          matKhau: currentPassword,
          matKhauMoi: newPassword,
        }
        await AdminApi.getUpdateManager("/change-password/admin",data);
        setCurrentPassword("");
        setConfirmPassword("");
        setNewPassword("");
      }
    
      // setSuccess("Đổi mật khẩu thành công!");
    } else {
      setError("Vui lòng nhập đúng thông tin.(mật khẩu cần lớn 8 ký tự)");
    }
  };

  // Toggle hiển thị mật khẩu
  const toggleShowPassword = (field) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="flex justify-center items-center py-12 bg-custom">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đổi mật khẩu</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleChangePassword}>
          {/* Mật khẩu hiện tại */}
          <div className="mb-4 relative">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium mb-2"
            >
              Mật khẩu hiện tại
            </label>
            <input
              type={showPasswords.current ? "text" : "password"}
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("current")}
              className="absolute top-9 right-3 text-gray-600"
            >
              {showPasswords.current ? "Ẩn" : "Hiển thị"}
            </button>
          </div>

          {/* Mật khẩu mới */}
          <div className="mb-4 relative">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium mb-2"
            >
              Mật khẩu mới
            </label>
            <input
              type={showPasswords.new ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("new")}
              className="absolute top-9 right-3 text-gray-600"
            >
              {showPasswords.new ? "Ẩn" : "Hiển thị"}
            </button>
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              type={showPasswords.confirm ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("confirm")}
              className="absolute top-9 right-3 text-gray-600"
            >
              {showPasswords.confirm ? "Ẩn" : "Hiển thị"}
            </button>
          </div>

          {/* Nút đổi mật khẩu */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordAdmin;
