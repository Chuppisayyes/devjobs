import React, { useState, useEffect } from "react";
import cvApi from "../../../api/user/cv";
import CandidateApi from "../../../api/user/candidate";
import { FaFileDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";
const CVFormScreen = () => {
  const [data, setData] = useState({
    hocVan: [],
    kinhNghiem: [],
    kyNang: [],
    duAn: [],
    chungChi: [],
  });
  const [formData, setformData] = useState(null);
  const [currentForm, setCurrentForm] = useState(null);
  const [currentFormUpdate, setCurrentFormUpdate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [optionSkill, setOptionSkill] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        var user = JSON.parse(sessionStorage.getItem("data"));

        const cv = await cvApi.getCV(`/${user.id}`);
        const info = await CandidateApi.getInfo(`/${user.id}`);
        
        setformData(info);
        setData(cv);
        setSelectedItem(cv);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDownloadCV = () => {
    const element = document.getElementById("cvContent");

    const options = {
      margin: 0.5,
      filename: `CV_${formData.ten}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };
  const handleAdd = async (key, newItem) => {
    var user = JSON.parse(sessionStorage.getItem("data"));
    if (key === "hocVan") {
      const { ...rest } = newItem;
      const data = {
        ...rest,
        idNguoiDung: user.id,
      };
      await cvApi.AddCV("/add/education", data);
    }
    if (key === "kyNang") {
      const { ...rest } = newItem;
      const data = {
        ...rest,
        idNguoiDung: user.id,
      };
      console.log(data);
      await cvApi.AddCV("/add/skill", data);
    }

    if (key === "duAn") {
      const { ...rest } = newItem;
      const data = {
        ...rest,
        idNguoiDung: user.id,
      };
      console.log(data);
      await cvApi.AddCV("/add/project", data);
    }
    if (key === "chungChi") {
      const { ...rest } = newItem;
      const data = {
        ...rest,
        idNguoiDung: user.id,
      };
      console.log(data);
      await cvApi.AddCV("/add/cerificate", data);
    }
    if (key === "kinhNghiem") {
      const { ...rest } = newItem;
      const data = {
        ...rest,
        idNguoiDung: user.id,
      };
      console.log(data);
      await cvApi.AddCV("/add/experience", data);
    }
    const cv = await cvApi.getCV(`/${user.id}`);
    setData(cv);
    setSelectedItem(cv);
    setCurrentForm(null);
  };
  const CancelUpdate = () => {
    setCurrentFormUpdate(null);
  };
  const handleUpdate = async (id, key, newItem) => {
    var user = JSON.parse(sessionStorage.getItem("data"));
    if (key === "hocVan") {
      const { ...rest } = newItem;
      const data = {
        ...rest,
        idNguoiDung: user.id,
      };
      await cvApi.updateCV(`/update/education/${id}`, data);
    }
    if (key === "kyNang") {
      const { ...rest } = newItem;
      const data = {
        ...rest,
        idNguoiDung: user.id,
      };

      await cvApi.updateCV(`/update/skill/${id}`, data);
    }

    if (key === "duAn") {
      const { ...rest } = newItem;
      const data = {
        ...rest,
        idNguoiDung: user.id,
      };

      await cvApi.updateCV(`/update/project/${id}`, data);
    }
    if (key === "chungChi") {
      const { ...rest } = newItem;
      const data = {
        ...rest,
        idNguoiDung: user.id,
      };

      await cvApi.updateCV(`/update/cerificate/${id}`, data);
    }
    if (key === "kinhNghiem") {
      const { ...rest } = newItem;
      const data = {
        ...rest,
        idNguoiDung: user.id,
      };

      await cvApi.updateCV(`/update/experience/${id}`, data);
    }
    const cv = await cvApi.getCV(`/${user.id}`);
    setData(cv);
    setSelectedItem(cv);
    setCurrentFormUpdate(null);
    return data;
  };

  // Xóa dữ liệu
  const handleDelete = async (key, id) => {
    var user = JSON.parse(sessionStorage.getItem("data"));
    if (key === "hocVan") {
      await cvApi.deleteCV(`/delete/education/${id}`);
    }
    if (key === "kyNang") {
      await cvApi.deleteCV(`/delete/skill/${id}`);
    }

    if (key === "duAn") {
      await cvApi.deleteCV(`/delete/project/${id}`);
    }
    if (key === "chungChi") {
      await cvApi.deleteCV(`/delete/cerificate/${id}`);
    }
    if (key === "kinhNghiem") {
      await cvApi.deleteCV(`/delete/experience/${id}`);
    }
    const cv = await cvApi.getCV(`/${user.id}`);
    setData(cv);
    setSelectedItem(cv);
    setCurrentFormUpdate(null);
    return data;
  };

  const renderForm = (key) => {
    switch (key) {
      case "hocVan":
        return (
          <div className="mt-4 p-4  rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Học vấn</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                id="noiHoc"
                placeholder="Nơi học"
                className="border p-2 rounded"
              />
              <input
                type="text"
                id="diaChi"
                placeholder="Địa chỉ"
                className="border p-2 rounded"
              />
              <input
                type="text"
                id="nganhHoc"
                placeholder="Ngành học"
                className="border p-2 rounded"
              />
              <input
                type="number"
                id="diem"
                placeholder="Điểm"
                className="border p-2 rounded"
              />
              <input
                type="date"
                id="thoiGianBatDau"
                className="border p-2 rounded"
              />
              <input
                type="date"
                id="thoiGianKetThuc"
                className="border p-2 rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() =>
                  handleAdd("hocVan", {
                    noiHoc: document.getElementById("noiHoc").value,
                    diaChi: document.getElementById("diaChi").value,
                    nganhHoc: document.getElementById("nganhHoc").value,
                    diem: document.getElementById("diem").value,
                    thoiGianBatDau:
                      document.getElementById("thoiGianBatDau").value,
                    thoiGianKetThuc:
                      document.getElementById("thoiGianKetThuc").value,
                  })
                }
                className=" mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500 "
              >
                Lưu
              </button>
              <button
                onClick={() => setCurrentForm(null)}
                className=" mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-500"
              >
                hủy
              </button>
            </div>
          </div>
        );

      case "kinhNghiem":
        return (
          <div className="mt-4 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Kinh nghiệm</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                id="tenCongTy"
                placeholder="Tên công ty"
                className="border p-2 rounded"
              />
              <input
                type="text"
                id="viTri"
                placeholder="Vị trí làm việc"
                className="border p-2 rounded"
              />
              <input
                type="date"
                id="thoiGianBatDau"
                className="border p-2 rounded"
              />
              <input
                type="date"
                id="thoiGianKetThuc"
                className="border p-2 rounded"
              />
              <textarea
                id="moTa"
                placeholder="Mô tả"
                className="border p-2 rounded col-span-2"
              />
            </div>
            <div className=" flex justify-between">
              <button
                onClick={() =>
                  handleAdd("kinhNghiem", {
                    tenCongTy: document.getElementById("tenCongTy").value,
                    viTri: document.getElementById("viTri").value,
                    moTa: document.getElementById("moTa").value,
                    thoiGianBatDau:
                      document.getElementById("thoiGianBatDau").value,
                    thoiGianKetThuc:
                      document.getElementById("thoiGianKetThuc").value,
                  })
                }
                className=" mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500"
              >
                Lưu
              </button>
              <button
                onClick={() => setCurrentForm(null)}
                className=" mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-500"
              >
                hủy
              </button>
            </div>
          </div>
        );

      case "kyNang":
        return (
          <div className="mt-4 p-4  rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Kỹ năng</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select id="idLoaiKN" className="border p-2 rounded w-full">
                  <option value="4">Languages</option>
                  <option value="3">libraries / framework</option>
                  <option value="2">tools / platforms</option>
                  <option value="1">Databases</option>
                  <option value="5">khác</option>
                </select>
              </div>
              <textarea
                id="moTa"
                placeholder="Điền các kỹ năng Bạn học được vào đây!"
                className="border p-2 rounded col-span-2"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() =>
                  handleAdd("kyNang", {
                    idLoaiKN: document.getElementById("idLoaiKN").value,
                    noiDung: document.getElementById("moTa").value,
                  })
                }
                className=" mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500"
              >
                Lưu
              </button>
              <button
                onClick={() => setCurrentForm(null)}
                className=" mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-500"
              >
                hủy
              </button>
            </div>
          </div>
        );

      case "duAn":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Dự án</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                id="tenDuAn"
                type="text"
                placeholder="Tên dự án"
                className="border p-2 rounded col-span-2"
              />
              <input
                id="congNghe"
                type="text"
                placeholder="Công nghê, ngôn ngữ , ..."
                className="border p-2 rounded col-span-2"
              />
              <input
                id="link"
                type="text"
                placeholder="link hoặc GitHub , ..."
                className="border p-2 rounded col-span-2"
              />

              <textarea
                id="moTa"
                placeholder="Mô tả"
                className="border p-2 rounded col-span-2"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() =>
                  handleAdd("duAn", {
                    tenDuAn: document.getElementById("tenDuAn").value,
                    congNghe: document.getElementById("congNghe").value,
                    link: document.getElementById("link").value,
                    moTa: document.getElementById("moTa").value,
                  })
                }
                className=" mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500"
              >
                Lưu
              </button>
              <button
                onClick={() => setCurrentForm(null)}
                className=" mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-500"
              >
                hủy
              </button>
            </div>
          </div>
        );

      case "chungChi":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Chứng chỉ</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                id="tenChungChi"
                type="text"
                placeholder="Tên chứng chỉ"
                className="border p-2 rounded"
              />
              <input
                id="link"
                type="url"
                placeholder="Link"
                className="border p-2 rounded"
              />
              <input
                id="donViCap"
                type="text"
                placeholder="Đơn vị cấp"
                className="border p-2 rounded"
              />
              <input
                id="ketQua"
                type="text"
                placeholder="Kết quả"
                className="border p-2 rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() =>
                  handleAdd("chungChi", {
                    tenChungChi: document.getElementById("tenChungChi").value,
                    link: document.getElementById("link").value,
                    donViCap: document.getElementById("donViCap").value,
                    ketQua: document.getElementById("ketQua").value,
                  })
                }
                className=" mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500"
              >
                Lưu
              </button>
              <button
                onClick={() => setCurrentForm(null)}
                className=" mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-500"
              >
                hủy
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  function getByKeyAndId(id, key) {
    let datas;
    if (data[key]) {
      datas = data[key].find((item) => item.id === id);
    }

    return datas;
  }

  const renderFormUpdate = (id, key) => {
    const item = getByKeyAndId(id, key);

    if (key === "hocVan") {
      return (
        <div className="mt-4 p-4  rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Học vấn</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              id="noiHoc"
              placeholder="Nơi học"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="noiHoc"
              className="border p-2 rounded"
              value={item.noiHoc}
            />
            <input
              value={item.diaChi}
              type="text"
              id="diaChi"
              placeholder="Địa chỉ"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="diaChi"
            />
            <input
              value={item.nganhHoc}
              type="text"
              id="nganhHoc"
              placeholder="Ngành học"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="nganhHoc"
            />
            <input
              value={item.diem}
              type="number"
              id="diem"
              placeholder="Điểm"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="diem"
            />
            <input
              value={item.thoiGianBatDau}
              type="date"
              id="thoiGianBatDau"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="thoiGianBatDau"
            />
            <input
              value={item.thoiGianKetThuc}
              type="date"
              id="thoiGianKetThuc"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="thoiGianKetThuc"
            />
            <span id="id" value={item.id}></span>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() =>
                handleUpdate(item.id, "hocVan", {
                  idHocVan: document.getElementById("id").value,
                  noiHoc: document.getElementById("noiHoc").value,
                  diaChi: document.getElementById("diaChi").value,
                  nganhHoc: document.getElementById("nganhHoc").value,
                  diem: document.getElementById("diem").value,
                  thoiGianBatDau:
                    document.getElementById("thoiGianBatDau").value,
                  thoiGianKetThuc:
                    document.getElementById("thoiGianKetThuc").value,
                })
              }
              className=" left mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500 "
            >
              Sửa
            </button>
            <button
              onClick={() => CancelUpdate()}
              className="right mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-500 "
            >
              hủy
            </button>
          </div>
        </div>
      );
    }
    if (key === "kinhNghiem")
      return (
        <div className="mt-4 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Kinh nghiệm</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={item.tenCongTy}
              type="text"
              id="tenCongTy"
              placeholder="Tên công ty"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="tenCongTy"
            />
            <input
              type="text"
              value={item.viTri}
              id="viTri"
              placeholder="Vị trí làm việc"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="viTri"
            />
            <input
              value={item.thoiGianBatDau}
              type="date"
              id="thoiGianBatDau"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="thoiGianBatDau"
            />
            <input
              value={item.thoiGianKetThuc}
              type="date"
              id="thoiGianKetThuc"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="thoiGianKetThuc"
            />
            <textarea
              value={item.moTa}
              id="moTa"
              placeholder="Mô tả"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="moTa"
              className="border p-2 rounded col-span-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() =>
                handleUpdate(item.id, "kinhNghiem", {
                  tenCongTy: document.getElementById("tenCongTy").value,
                  viTri: document.getElementById("viTri").value,
                  moTa: document.getElementById("moTa").value,
                  thoiGianBatDau:
                    document.getElementById("thoiGianBatDau").value,
                  thoiGianKetThuc:
                    document.getElementById("thoiGianKetThuc").value,
                })
              }
              className=" left mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500 "
            >
              Sửa
            </button>
            <button
              onClick={() => CancelUpdate()}
              className="right mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-500 "
            >
              hủy
            </button>
          </div>
        </div>
      );

    if (key === "kyNang")
      return (
        <div className="mt-4 p-4  rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Kỹ năng</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                id="idLoaiKN"
                value={item.idLoaiKN}
                className="border p-2 rounded w-full"
                onChange={(e) =>
                  handleChange(key, id, e.target.value, e.target.name)
                }
                name="idLoaiKN"
              >
                <option value="4">Languages</option>
                <option value="3">Libraries / Frameworks</option>
                <option value="2">Tools / Platforms</option>
                <option value="1">Databases</option>
              </select>
            </div>
            <textarea
              value={item.moTa}
              id="moTa"
              placeholder="Điền các kỹ năng Bạn học được vào đây!"
              className="border p-2 rounded col-span-2"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="moTa"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() =>
                handleUpdate(item.id, "kyNang", {
                  idLoaiKN: document.getElementById("idLoaiKN").value,
                  noiDung: document.getElementById("moTa").value,
                })
              }
              className=" left mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500 "
            >
              Sửa
            </button>
            <button
              onClick={() => CancelUpdate()}
              className="right mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-500 "
            >
              hủy
            </button>
          </div>
        </div>
      );

    if (key === "duAn")
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Dự án</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={item.tenDuAn}
              id="tenDuAn"
              type="text"
              placeholder="Tên dự án"
              className="border p-2 rounded col-span-2"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="tenDuAn"
            />
            <input
              value={item.congNghe}
              id="congNghe"
              type="text"
              placeholder="Công nghê, ngôn ngữ , ..."
              className="border p-2 rounded col-span-2"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="congNghe"
            />
            <input
              value={item.link}
              id="link"
              type="text"
              placeholder="link hoặc GitHub , ..."
              className="border p-2 rounded col-span-2"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="link"
            />

            <textarea
              value={item.moTa}
              id="moTa"
              placeholder="Mô tả"
              className="border p-2 rounded col-span-2"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="moTa"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() =>
                handleUpdate(item.id, "duAn", {
                  tenDuAn: document.getElementById("tenDuAn").value,
                  congNghe: document.getElementById("congNghe").value,
                  link: document.getElementById("link").value,
                  moTa: document.getElementById("moTa").value,
                })
              }
              className=" left mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500 "
            >
              Sửa
            </button>
            <button
              onClick={() => CancelUpdate()}
              className="right mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-500 "
            >
              hủy
            </button>
          </div>
        </div>
      );

    if (key === "chungChi")
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Chứng chỉ</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              value={item.tenChungChi}
              id="tenChungChi"
              type="text"
              placeholder="Tên chứng chỉ"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="tenChungChi"
            />
            <input
              value={item.link}
              id="link"
              type="url"
              placeholder="Link"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="link"
            />
            <input
              value={item.donViCap}
              id="donViCap"
              type="text"
              placeholder="Đơn vị cấp"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="donViCap"
            />
            <input
              value={item.ketQua}
              id="ketQua"
              type="text"
              placeholder="Kết quả"
              className="border p-2 rounded"
              onChange={(e) =>
                handleChange(key, id, e.target.value, e.target.name)
              }
              name="ketQua"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() =>
                handleUpdate(item.id, "chungChi", {
                  tenChungChi: document.getElementById("tenChungChi").value,
                  link: document.getElementById("link").value,
                  donViCap: document.getElementById("donViCap").value,
                  ketQua: document.getElementById("ketQua").value,
                })
              }
              className=" left mt-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500 "
            >
              Sửa
            </button>
            <button
              onClick={() => CancelUpdate()}
              className="right mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-500 "
            >
              hủy
            </button>
          </div>
        </div>
      );
  };
  const handleChange = (key, id, newValue, name) => {
    if (data[key]) {
      data[key] = data[key].map((item) => {
        if (item.id === id) {
          item[name] = newValue;
        }
        setData({ ...data });
        return item; // Trả về item đã được cập nhật hoặc không thay đổi
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex space-x-4">
      {/* Cột bên trái */}
      <div className="w-2/5 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Thông tin</h2>

        <div key="hocVan" className="mb-4">
          <button
            onClick={() => setCurrentForm("hocVan")}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500"
          >
            Học Vấn
          </button>
          {currentForm === "hocVan" && renderForm("hocVan")}

          {/* Danh sách mục đã thêm */}
          {data["hocVan"].map((item) => (
            <div>
              <div
                key={item.id}
                className="mt-2 flex justify-between items-center bg-gray-50 rounded-lg p-2 shadow cursor-pointer hover:bg-gray-100"
              >
                <span
                  onClick={() =>
                    setCurrentFormUpdate({ type: "hocVan", id: item.id })
                  }
                  className="text-gray-700 font-medium"
                  key="hocVan"
                >
                  {item.noiHoc}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete("hocVan", item.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
              {currentFormUpdate?.type === "hocVan" &&
                currentFormUpdate?.id === item.id &&
                renderFormUpdate(item.id, "hocVan")}
            </div>
          ))}
        </div>

        <div key="kinhNghiem" className="mb-4">
          <button
            onClick={() => setCurrentForm("kinhNghiem")}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500"
          >
            Kinh Nghiệm
          </button>
          {currentForm === "kinhNghiem" && renderForm("kinhNghiem")}

          {/* Danh sách mục đã thêm */}
          {data["kinhNghiem"].map((item) => (
            <div>
              <div
                key={item.id}
                className="mt-2 flex justify-between items-center bg-gray-50 rounded-lg p-2 shadow cursor-pointer hover:bg-gray-100"
              >
                <span
                  onClick={() =>
                    setCurrentFormUpdate({ type: "kinhNghiem", id: item.id })
                  }
                  className="text-gray-700 font-medium"
                  key="kinhNghiem"
                >
                  {item.tenCongTy}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete("kinhNghiem", item.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
              {currentFormUpdate?.type === "kinhNghiem" &&
                currentFormUpdate?.id === item.id &&
                renderFormUpdate(item.id, "kinhNghiem")}
            </div>
          ))}
        </div>

        <div key="kyNang" className="mb-4">
          <button
            onClick={() => setCurrentForm("kyNang")}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500"
          >
            Kỹ Năng
          </button>
          {currentForm === "kyNang" && renderForm("kyNang")}

          {/* Danh sách mục đã thêm */}
          {data["kyNang"].map((item) => (
            <div>
              <div
                key={item.id}
                className="mt-2 flex justify-between items-center bg-gray-50 rounded-lg p-2 shadow cursor-pointer hover:bg-gray-100"
              >
                <span
                  onClick={() =>
                    setCurrentFormUpdate({ type: "kyNang", id: item.id })
                  }
                  className="text-gray-700 font-medium"
                  key="kyNang"
                >
                  {item.tenKyNang}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete("kyNang", item.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
              {currentFormUpdate?.type === "kyNang" &&
                currentFormUpdate?.id === item.id &&
                renderFormUpdate(item.id, "kyNang")}
            </div>
          ))}
        </div>

        <div key="duAn" className="mb-4">
          <button
            onClick={() => setCurrentForm("duAn")}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500"
          >
            Dự Án
          </button>
          {currentForm === "duAn" && renderForm("duAn")}

          {data["duAn"].map((item) => (
            <div>
              <div
                key={item.id}
                className="mt-2 flex justify-between items-center bg-gray-50 rounded-lg p-2 shadow cursor-pointer hover:bg-gray-100"
              >
                <span
                  onClick={() =>
                    setCurrentFormUpdate({ type: "duAn", id: item.id })
                  }
                  className="text-gray-700 font-medium"
                  key="duAn"
                >
                  {item.tenDuAn}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete("duAn", item.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
              {currentFormUpdate?.type === "duAn" &&
                currentFormUpdate?.id === item.id &&
                renderFormUpdate(item.id, "duAn")}
            </div>
          ))}
        </div>

        <div key="chungChi" className="mb-4">
          <button
            onClick={() => setCurrentForm("chungChi")}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500"
          >
            Chứng Chỉ
          </button>
          {currentForm === "chungChi" && renderForm("chungChi")}

          {data["chungChi"].map((item) => (
            <div>
              <div
                key={item.id}
                className="mt-2 flex justify-between items-center bg-gray-50 rounded-lg p-2 shadow cursor-pointer hover:bg-gray-100"
              >
                <span
                  onClick={() =>
                    setCurrentFormUpdate({ type: "chungChi", id: item.id })
                  }
                  className="text-gray-700 font-medium"
                  key="chungChi"
                >
                  {item.tenChungChi}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete("chungChi", item.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
              {currentFormUpdate?.type === "chungChi" &&
                currentFormUpdate?.id === item.id &&
                renderFormUpdate(item.id, "chungChi")}
            </div>
          ))}
        </div>
      </div>

      {/* Khu vực bên phải */}
      <div className="w-3/5 relative bg-white rounded-lg shadow-lg px-12 py-8">
        <button
          onClick={handleDownloadCV}
          className="flex items-center justify-center py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 absolute right-8 top-2"
        >
          <FaFileDownload size={24} className="mr-2" />
          Tải CV
        </button>
        <div className="w-full" id="cvContent">
          <div class="flex flex-col justify-center items-center space-y-12 px-9">
            {formData ? (
              <>
                {/* Dòng 1: Tên */}
                <h2 className="text-2xl font-bold text-gray-800 m-0 p-0 uppercase">
                  {formData.ten}
                </h2>
                <p className="text-xl p-0 m-0 uppercase">
                  {" "}
                  {formData.tenVitri} - {formData.tenCapDo} - {formData.trinhDo}
                </p>
                <div className="flex mt-1">
                  <p className="text-gray-600  m-0 px-1 border-r-2 border-black ">
                    {formData.email}
                  </p>
                  <p className="text-gray-600  m-0 px-1 border-r-2 border-black">
                    {formData.sdt}
                  </p>
                  <p className="text-gray-600  m-0 px-1">{formData.diaChi}</p>
                </div>

                {/* Dòng 3: Vị trí ứng tuyển */}
              </>
            ) : (
              <h2>CV</h2>
            )}
          </div>

          {selectedItem ? (
            <div className="space-y-3 p-2 text-gray-700">
              {/* Học Vấn */}
              {selectedItem.hocVan && selectedItem.hocVan.length > 0 && (
                <div className="px-3">
                  <p className="text-xl border-b p-2 uppercase">Học Vấn</p>
                  <div className="px-3 pb-0.5 ">
                    {selectedItem.hocVan.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between ">
                          {item.noiHoc && (
                            <p className=" font-bold uppercase m-0  ">
                              {item.noiHoc}
                            </p>
                          )}
                          {item.diaChi && <i>{item.diaChi}</i>}
                        </div>
                        <div className="flex justify-between m-0 p-0">
                          {item.nganhHoc && (
                            <p className="m-0">{item.nganhHoc}</p>
                          )}
                          <div className="flex space-x-4 m-0 p-0">
                            {item.thoiGianBatDau && (
                              <i className="">{item.thoiGianBatDau}</i>
                            )}
                            {item.thoiGianKetThuc && (
                              <i className="pl-1">{item.thoiGianKetThuc}</i>
                            )}
                          </div>
                        </div>
                        <div className="m-0 p-0">
                          {item.diem && (
                            <p className="text-gray-800 uppercase m-0 ">
                              Điểm: {item.diem}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kinh Nghiệm */}
              {selectedItem.kinhNghiem &&
                selectedItem.kinhNghiem.length > 0 && (
                  <div className="px-3">
                    <p className="text-xl border-b p-2 uppercase">
                      Kinh Nghiệm
                    </p>
                    {selectedItem.kinhNghiem.map((item, index) => (
                      <div key={index} className="space-y-4 pb-2 px-3 pb-0.5">
                        <div className="flex justify-between  ">
                          {item.tenCongTy && (
                            <p className=" font-bold uppercase m-0 ">
                              {item.tenCongTy}
                            </p>
                          )}
                          <div className="flex space-x-4 m-0 p-0">
                            {item.thoiGianBatDau && (
                              <i className="ml-1 ">{item.thoiGianBatDau}</i>
                            )}
                            {item.thoiGianKetThuc && (
                              <i className="mr-1">{item.thoiGianKetThuc}</i>
                            )}
                          </div>
                        </div>
                        {item.viTri && <p className="m-0">{item.viTri}</p>}
                        {item.moTa && <p className="m-0 px-4">{item.moTa}</p>}
                      </div>
                    ))}
                  </div>
                )}
              {/* Kỹ Năng */}
              {selectedItem.kyNang && selectedItem.kyNang.length > 0 && (
                <div className="px-3">
                  <p className="text-xl border-b p-2 uppercase">kỹ năng</p>
                  {selectedItem.kyNang.map((item, index) => (
                    <div key={index} className="flex px-3 space-y-2 ">
                      {item.tenKyNang && (
                        <p className="w-2/5 uppercase m-0">{item.tenKyNang}:</p>
                      )}
                      {item.moTa && <i className="w-3/5 m-0 ">{item.moTa}</i>}
                    </div>
                  ))}
                </div>
              )}
              {/* Dự Án */}
              {selectedItem.chungChi && selectedItem.duAn.length > 0 && (
                <div className="px-3">
                  <p className="text-xl border-b p-2 uppercase">Dự án</p>
                  {selectedItem.duAn && selectedItem.duAn.length > 0 && (
                    <div>
                      {selectedItem.duAn.map((item, index) => (
                        <div key={index} className="px-3 pb-0.5 ">
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="flex">
                              {item.tenDuAn && (
                                <p className="font-bold m-0 p-0 border-r-2 px-2 ">
                                  {item.tenDuAn}
                                </p>
                              )}
                              {item.link && (
                                <a
                                  href={`${item.link}`}
                                  className="font-bold m-0 p-0 text-black underline px-2"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Link
                                </a>
                              )}
                            </div>

                            <div className="text-right">
                              {" "}
                              {item.congNghe && (
                                <i className="m-0 p-0">{item.congNghe}</i>
                              )}
                            </div>
                          </div>
                          {item.moTa && (
                            <p className="m-0 px-6 py-2">{item.moTa}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Chứng Chỉ */}
              {selectedItem.chungChi && selectedItem.chungChi.length > 0 && (
                <div className="px-3">
                  <p className="text-xl border-b p-2 uppercase">chứng chỉ</p>
                  {selectedItem.chungChi.map((item, index) => (
                    <div
                      key={index}
                      className="flex px-3 space-y-2 justify-between "
                    >
                      <div className="flex">
                        {item.tenChungChi && (
                          <p className="font-bold m-0 p-0 text-black px-2 border-r-2">
                            {item.tenChungChi}
                          </p>
                        )}
                        {item.link && (
                          <a
                            href={`${item.link}`}
                            className="font-bold m-0 p-0 text-black underline px-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Link :
                          </a>
                        )}

                        {item.ketQua && (
                          <p className="m-0 px-2">{item.ketQua}</p>
                        )}
                      </div>
                      {item.donViCap && (
                        <p className="m-0 px-2">{item.donViCap}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-white">Chọn một mục để hiển thị chi tiết.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVFormScreen;
