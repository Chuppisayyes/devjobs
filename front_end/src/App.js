import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layouts/LayoutHome.js";
import Home from "./pages/users/Home.js";
import YourJob from "./pages/users/candidate/yourJob.js";
import Company from "./pages/users/Company.js";
import PostJob from "./pages/users/company/PostJob.js";
import Login from "./pages/authentication/login.js";
import Dashboard from "./pages/admin/dashboard.js";
import LoginCandidate from "./pages/authentication/LoginCandidate.js";
import LoginEmployer from "./pages/authentication/loginEmployer.js";
import RegisterCandidate from "./pages/authentication/registerCandidate.js";
import CVFormScreen from "./pages/users/candidate/CV.js";
import RegisterCompany from "./pages/authentication/RegisterCompany.js";
import Register from "./pages/authentication/register.js";
import ViewJob from "./pages/users/viewJob.js";
import CompanyDetail from "./pages/users/CompanyDetail.js";
import InfoCandidate from "./pages/users/candidate/InfoCandidate.js";
import ChangePassword from "./components/user/ChangePassword.js";
import HistoryPost from "./pages/users/company/HistoryPost.js";
import UpdatePostJob from "./pages/users/company/UpdatePostJob.js";
import ViewCVCandidate from "./pages/users/company/ViewCVCandidate.js";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho Toast
import AdminLogin from "./pages/admin/login.js";
import InfoCompany from "./pages/users/company/infoCompany.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout-wrapped routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/yourjob" element={<YourJob />} />
          <Route path="/company" element={<Company />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/login" element={<Login />} />
          <Route path="/company/:idCompany" element={<CompanyDetail />} />
          <Route path="/login-candidate" element={<LoginCandidate />} />
          <Route path="/login-employer" element={<LoginEmployer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-candidate" element={<RegisterCandidate />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/CV/:id" element={<CVFormScreen />} />
          <Route path="/info-candidate/:id" element={<InfoCandidate />} />
          <Route path="/info-company/:id" element={<InfoCompany />} />
          <Route path="/job/:idJob" element={<ViewJob />} />
          <Route path="/forgot-password/:id" element={<ChangePassword />} />
          <Route path="/history/:id" element={<HistoryPost />} />
          <Route path="/history/update-post/:idJob" element={<UpdatePostJob />} />
          <Route path="/view/CV/:idCandidate" element={<ViewCVCandidate />} />
        </Route>
        <Route path="/login-admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer autoClose={5000} position="top-right" />
    </Router>
  );
}

export default App;
