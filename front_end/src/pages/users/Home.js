import React, { useState, useEffect } from "react";
import { RxCaretDown } from "react-icons/rx";
import AuthApi from "../../api/auth/auth";
import { Link } from "react-router-dom";

const Home = () => {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedViTri, setSelectedViTri] = useState([]);
  const [selectedTinhThanh, setSelectedTinhThanh] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [isDropdownViTriOpen, setDropdownViTriOpen] = useState(false);
  const [isDropdownTinhThanhOpen, setDropdownTinhThanhOpen] = useState(false);
  const [isDropdownCompaniesOpen, setDropdownCompaniesOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 9; // Số công việc hiển thị trên mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AuthApi.getAllAuth("/all-post");
        setJobListings(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  // Apply filter logic
  const applyFilters = () => {
    let filtered = jobListings;

    if (selectedViTri.length > 0) {
      filtered = filtered.filter((job) => selectedViTri.includes(job.tenViTri));
    }
    if (selectedTinhThanh.length > 0) {
      filtered = filtered.filter((job) =>
        selectedTinhThanh.includes(job.tenTinhThanh)
      );
    }
    if (selectedCompanies.length > 0) {
      filtered = filtered.filter((job) =>
        selectedCompanies.includes(job.tenCongTy)
      );
    }

    setFilteredJobs(filtered);
    setDropdownViTriOpen(false);
    setDropdownTinhThanhOpen(false);
    setDropdownCompaniesOpen(false);
    setCurrentPage(1); // Reset về trang đầu tiên
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedViTri([]);
    setSelectedTinhThanh([]);
    setSelectedCompanies([]);
    setFilteredJobs(jobListings);
    setCurrentPage(1);
  };

  // Dynamic unique values based on filteredJobs
  const uniqueViTri = [...new Set(filteredJobs.map((job) => job.tenViTri))];
  const uniqueTinhThanh = [
    ...new Set(filteredJobs.map((job) => job.tenTinhThanh)),
  ];
  const uniqueCompanies = [
    ...new Set(filteredJobs.map((job) => job.tenCongTy)),
  ];

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);

  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <div className="flex space-x-4">
          {/* Dropdown Vị trí */}
          <div className="relative">
            <div
              className="flex justify-between items-center px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
              onClick={() => setDropdownViTriOpen(!isDropdownViTriOpen)}
            >
              <span className="text-xl font-bold">Vị trí</span>
              <RxCaretDown className="text-2xl" />
            </div>
            {isDropdownViTriOpen && (
              <div className="absolute bg-white border shadow-lg mt-2 rounded-lg w-60 z-10">
                <div className="max-h-60 overflow-y-auto p-2">
                  {uniqueViTri.map((viTri, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedViTri.includes(viTri)}
                        onChange={() =>
                          setSelectedViTri((prev) =>
                            prev.includes(viTri)
                              ? prev.filter((item) => item !== viTri)
                              : [...prev, viTri]
                          )
                        }
                        className="form-checkbox"
                      />
                      <span>{viTri}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between p-2 border-t">
                  <button
                    onClick={() => setDropdownViTriOpen(false)}
                    className="px-4 py-1 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Tỉnh Thành */}
          <div className="relative">
            <div
              className="flex justify-between items-center px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
              onClick={() => setDropdownTinhThanhOpen(!isDropdownTinhThanhOpen)}
            >
              <span className="text-xl font-bold">Tỉnh Thành</span>
              <RxCaretDown className="text-2xl" />
            </div>
            {isDropdownTinhThanhOpen && (
              <div className="absolute bg-white border shadow-lg mt-2 rounded-lg w-60 z-10">
                <div className="max-h-60 overflow-y-auto p-2">
                  {uniqueTinhThanh.map((tinhThanh, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTinhThanh.includes(tinhThanh)}
                        onChange={() =>
                          setSelectedTinhThanh((prev) =>
                            prev.includes(tinhThanh)
                              ? prev.filter((item) => item !== tinhThanh)
                              : [...prev, tinhThanh]
                          )
                        }
                        className="form-checkbox"
                      />
                      <span>{tinhThanh}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between p-2 border-t">
                  <button
                    onClick={() => setDropdownTinhThanhOpen(false)}
                    className="px-4 py-1 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Công Ty */}
          <div className="relative">
            <div
              className="flex justify-between items-center px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
              onClick={() => setDropdownCompaniesOpen(!isDropdownCompaniesOpen)}
            >
              <span className="text-xl font-bold">Công Ty</span>
              <RxCaretDown className="text-2xl" />
            </div>
            {isDropdownCompaniesOpen && (
              <div className="absolute bg-white border shadow-lg mt-2 rounded-lg w-60 z-10">
                <div className="max-h-60 overflow-y-auto p-2">
                  {uniqueCompanies.map((company, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company)}
                        onChange={() =>
                          setSelectedCompanies((prev) =>
                            prev.includes(company)
                              ? prev.filter((item) => item !== company)
                              : [...prev, company]
                          )
                        }
                        className="form-checkbox"
                      />
                      <span>{company}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between p-2 border-t">
                  <button
                    onClick={() => setDropdownCompaniesOpen(false)}
                    className="px-4 py-1 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Xoá Lọc
        </button>
      </div>

      {/* Job Listings */}
      <div className="mt-8 grid text-white grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentJobs.map((job) => (
          <div
            key={job.idBaiDang}
            className="bg-gray-700 px-4 py-3 rounded-lg shadow-md relative"
          >
            <div className="flex items-center space-x-3">
              <img
                src={job.logo}
                alt={job.tenCongTy}
                className="rounded-full w-16 h-16"
              />
              <div className="mt-2">
                <p className="font-semibold py-1 px-2  m-0">{job.tenCongTy}</p>
                <p className="text-base text-white py-1 px-2  m-0">
                  {job.tenBaiDang}
                </p>
              </div>
            </div>
            {/* Hạn chót ở góc trên bên phải */}
            <p className="absolute top-2 bg-orange-500 p-1 rounded-lg right-2 text-sm">
              Deadline: {job.hanChot}
            </p>

            <p className="text-sm px-2 m-0">{job.tenViTri}</p>
            <div className="mt-2 text-sm px-2 flex justify-between">
              <p className="m-0">{job.tenTinhThanh}</p>
              <p>{job.soLuong}</p>
            </div>
            <Link
              to={`/job/${job.idBaiDang}`}
              className="color-item hover:no-underline hover:text-[#0cc0df]"
            >
              <p className="text-sm px-2 m-0 text-right">Xem chi tiết</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
