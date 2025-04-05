import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import ProvinceManagement from "../../components/admin/Province";
import PositionManager from "../../components/admin/Position";
import LevelManager from "../../components/admin/Level";
import ProfileAdmin from "../../components/admin/profile";
import PostManagement from "../../components/admin/Post";
import CandidateList from "../../components/admin/Candidate";
import BusinessManagement from "../../components/admin/Business";
import AddAdmin from "../../components/admin/AddAdmin";
import ChangePasswordAdmin from "../../components/admin/changePassword";
import { FaUser } from "react-icons/fa6";
import { ImOffice } from "react-icons/im";
import { MdPostAdd } from "react-icons/md";
import AdminApi from "../../api/admin/admin";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCompanies: 0,
    totalPosts: 0,
  });
  const [admin, setadmin] = useState({
      anhDaiDien: null,
      ten: null,
    });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const totalUser = await AdminApi.getTotal("total-user");
        const totalCompany = await AdminApi.getTotal("total-company");
        const totalPost = await AdminApi.getTotal("total-post");

        setStats({
          totalUsers: totalUser?.totall || 0,
          totalCompanies: totalCompany?.totall || 0,
          totalPosts: totalPost?.totall || 0,
        });

        const data = await sessionStorage.getItem("admin");
              if (data) {
                const adminData = JSON.parse(data);
                try {
                  const response = await AdminApi.getAdmin(`/admin/${adminData.id}`);
                  console.log(response.data);
                  setadmin(response.data);
                } catch (error) {
                  console.log("Error fetching admin data:", error);
                }
              }
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("Failed to fetch statistics");
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    toast.success("Đăng xuất thành công");
    sessionStorage.clear();
    navigate("/");
  };

  const renderStatsCard = (icon, label, value) => (
    <div className="bg-custom-item shadow rounded-md p-6">
      <div className="flex items-center text-gray-300 text-xl mb-2">
        {icon}
        <h2 className="pl-2 my-auto text-sm font-bold">{label}</h2>
      </div>
      <p className="text-gray-600 text-4xl font-semibold text-white">{value}</p>
    </div>
  );

  return (
    <div className="flex bg-custom">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow bg-custom p-6 ml-64">
        <header className="flex items-center justify-between px-6 py-2 rounded-md mb-6">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center text-white text-xl justify-between px-4 py-2 rounded-md">
            <img
              src={admin.anhDaiDien || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwkVfEKEdjFIryQmVhdVlLIwBGfGBzAA3GA&s"}
              alt="Profile"
              className="mr-2 ml-4 w-8 h-8 rounded-full"
            />
            <div className="text-sm font-semibold">
            {admin.ten}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 p-2 rounded mx-3 text-sm"
            >
              Đăng Xuất
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-6">
          {renderStatsCard(
            <FaUser className="text-xl" />,
            "Số Ứng Viên",
            stats.totalUsers
          )}
          {renderStatsCard(
            <ImOffice className="text-xl" />,
            "Số Doanh Nghiệp",
            stats.totalCompanies
          )}
          {renderStatsCard(
            <MdPostAdd className="text-xl" />,
            "Số Bài Đăng",
            stats.totalPosts
          )}
        </div>

        {/* Components */}
        <div className="" id="Dashboard">
          <div className="flex h-96">
            <ProvinceManagement />
            <PositionManager />
          </div>
          <div className="flex h-96 justify-center mt-10">
            <LevelManager />
          </div>
        </div>
        <div id="CandidateList">
          <CandidateList />
        </div>
        <div id="Business">
          <BusinessManagement />
        </div>
        <div id="Post">
          <PostManagement />
        </div>
        <div id="Sitting">
          <ProfileAdmin />
        </div>
        <div id="ChangePasswordAdmin">
          <ChangePasswordAdmin />
        </div>
        <div id="AddAdmin">
          <AddAdmin />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
