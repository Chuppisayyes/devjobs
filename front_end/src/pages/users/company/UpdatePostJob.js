import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { SlPhone } from "react-icons/sl";
import { TbWorld } from "react-icons/tb";
import CandidateList from "../../../components/user/ListCandidate";
import uploadImage from "../../../assets/Js/UploadImage";
import AuthApi from "../../../api/auth/auth";
import CompanyApi from "../../../api/company/company";
import { toast } from "react-toastify";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const PostDetails = () => {
  const [candidates, setCandidates] = useState([]);
  const [postData, setPostData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [yeuCau, setYeuCau] = useState([]);
  const [newYeuCau, setNewYeuCau] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [tinhThanh, setTinhThanhOptions] = useState([""]);
  const [viTri, setViTriOptions] = useState([""]);
  const [capDo, setCapDoOptions] = useState([""]);

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
  const { idJob } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await AuthApi.getAllAuth("/all-position");
        const province = await AuthApi.getAllAuth("/all-city");
        const level = await AuthApi.getAllAuth("/all-level");
        const post = await AuthApi.getAllAuth(`/post/${idJob}`);

        const yeuCau = post.yeuCau;
        const listCandidate = await CompanyApi.getInfo(
          `all-candidate/${idJob}`
        );

        setCandidates(listCandidate);
        setTinhThanhOptions(province);
        setViTriOptions(position);
        setCapDoOptions(level);
        setPostData(post);
        setYeuCau(yeuCau);

        const newApplay = async (post) => {
          const listCandidate = await CompanyApi.getInfo(
            `all-candidate/${idJob}`
          );
          setCandidates(listCandidate);
        };

        socket.on("new_apply", newApplay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleAdd = async () => {
    if (newYeuCau.trim()) {
      await CompanyApi.AddInfo(`request/${idJob}/add`, { noiDung: newYeuCau });
      const yeuCau = await CompanyApi.getInfo(`/${idJob}/all-request`);
      console.log(yeuCau);
      setYeuCau(yeuCau);
    } else {
      toast.error("Nội dung yêu cầu không thể để trống!");
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const itemToEdit = yeuCau.find((item) => item.idYeuCau === id);
    setEditValue(itemToEdit.noiDung);
  };

  const handleSaveEdit = async () => {
    await CompanyApi.updateInfo(`request/${editingId}/update`, {
      noiDung: editValue,
    });
    const yeuCau = await CompanyApi.getInfo(`/${idJob}/all-request`);
    setYeuCau(yeuCau);
    setEditingId(null);
    setEditValue("");
  };

  const handleDelete = async (id) => {
    await CompanyApi.deleteInfo(`request/${id}/remove`);
    const yeuCau = await CompanyApi.getInfo(`/${idJob}/all-request`);
    setYeuCau(yeuCau);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (postData.kinhnghiemUnit !== null && postData.kinhnghiemUnit == "year") {
      postData.kinhNghiem = parseInt(postData.kinhNghiem * 12);
    } else {
      postData.kinhNghiem = parseInt(postData.kinhNghiem);
    }

    const data = {
      tenBaiDang: postData.tenBaiDang,
      TrinhDo: postData.trinhDo,
      kinhnghiem: postData.kinhNghiem,
      soLuong: postData.soLuong,
      idTinhThanh: postData.idTinhThanh,
      idViTri: postData.idViTri,
      idCapDo: postData.idCapDo,
      hanChot: postData.hanChot,
      hinhAnh: postData.hinhAnh,
      diaChiCuThe: postData.diaChiCuThe,
      luongBatDau: postData.luongBatDau,
      luongKetThuc: postData.luongKetThuc,
      moTa: postData.moTa,
    };
    var user = JSON.parse(sessionStorage.getItem("data"));
    await CompanyApi.updateInfo(`/${user.id}/job/${idJob}/update`, data);
    setIsEditing(false);
    const post = await AuthApi.getAllAuth(`/post/${idJob}`);
    setPostData(post);
  };
  const handleCancel = async () => {
    setIsEditing(false);
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Lấy file từ input
    if (file) {
      try {
        const url = await uploadImage(file);
        if (url) {
          setPostData((prev) => ({
            ...prev,
            hinhAnh: url,
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
    <div className=" flex container shadow-lg">
      <div className="flex w-2/3 border-r-2">
        <div className="bg-white p-2 rounded-lg overflow-hidden w-full">
          <div className="relative">
            <img
              src={postData.hinhAnh}
              alt="Background"
              className=" max-h-96 min-w-80 mx-auto object-cover"
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

          <div className="p-4">
            <div className="flex ">
              <div className="flex w-3/4">
                <img
                  src={postData.logo}
                  alt={postData.tenCongTy}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-bold text-orange-600">
                    {isEditing ? (
                      <input
                        type="text"
                        name="tenBaiDang"
                        id="tenBaiDang"
                        value={postData.tenBaiDang}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-1/2"
                      />
                    ) : (
                      postData.tenBaiDang
                    )}{" "}
                    tại - {postData.tenCongTy}
                  </h2>
                  <p className="text-sm text-gray-500">{postData.nganhNghe}</p>
                </div>
              </div>
              <div className="w-1/4 justify-between items-center">
                <p>
                  <i className="text-sm text-orange-600">
                    <strong className="pr-2">Ngày Đăng: </strong>
                    {postData.ngayDang}
                  </i>
                </p>
                <div className="flex  items-center text-orange-600">
                  <strong className="pr-2">Hạn nộp: </strong>
                  {isEditing ? (
                    <input
                      type="date"
                      name="hanChot"
                      id="hanChot"
                      value={postData.hanChot}
                      onChange={handleInputChange}
                      className="border block rounded p-1 w-2/4"
                    />
                  ) : (
                    <i className="m-0 p-0">{postData.hanChot}</i>
                  )}
                </div>
              </div>
            </div>
            <div className="py-4 pl-4 text-green-500">
              {isEditing ? (
                <input
                  type="number"
                  name="luongBatDau"
                  id="luongBatDau"
                  value={postData.luongBatDau}
                  onChange={handleInputChange}
                  className="border text-green-500 rounded p-1 mr-2 w-1/4"
                />
              ) : (
                <strong>{postData.luongBatDau} - </strong>
              )}
              {isEditing ? (
                <input
                  type="number"
                  name="luongKetThuc"
                  id="luongKetThuc"
                  value={postData.luongKetThuc}
                  onChange={handleInputChange}
                  className="border text-green-500 rounded p-1 w-1/4"
                />
              ) : (
                <strong>{postData.luongKetThuc} VND </strong>
              )}
            </div>
            <div className="flex justify-between gap-2">
              <div className="w-1/3">
                <h3 className=" text-lg font-semibold text-gray-800">
                  Thông Tin Tuyển Dụng
                </h3>
                <div className="text-sm text-gray-600 space-y-2 mt-2 items-center">
                  <div className="flex items-center">
                    <strong className="pr-2 w-1/2">Vị trí: </strong>
                    {isEditing ? (
                      <select
                        name="idViTri"
                        value={postData.idViTri}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-1/2"
                      >
                        {viTri.map((position) => (
                          <option
                            key={position.idViTri}
                            value={position.tenViTri}
                          >
                            {position.tenViTri}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>
                        {" "}
                        {
                          viTri.find(
                            (item) => item.idViTri === postData.idViTri
                          )?.tenViTri
                        }
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <strong className="pr-2 w-1/2">Tỉnh thành: </strong>
                    {isEditing ? (
                      <select
                        name="idTinhThanh"
                        value={postData.tenTinhThanh}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-1/2"
                      >
                        {tinhThanh.map((position) => (
                          <option
                            key={position.idTinhThanh}
                            value={position.idTinhThanh}
                          >
                            {position.tenTinhThanh}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="w-1/2">
                        {" "}
                        {tinhThanh.find(
                          (tt) => tt.idTinhThanh === postData.idTinhThanh
                        )?.tenTinhThanh || ""}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <strong className="pr-2 w-1/2">Cấp Độ: </strong>
                    {isEditing ? (
                      <select
                        name="tenCapDo"
                        value={postData.tenCapDo}
                        onChange={handleInputChange}
                        className="border rounded p-1"
                      >
                        {capDo.map((capdo) => (
                          <option
                            key={capdo.idCapDo}
                            value={capdo.tenCapDo}
                            className="text-black w-1/2"
                          >
                            {capdo.tenCapDo}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="w-1/2">
                        {" "}
                        {capDo.find((tt) => tt.idCapDo === postData.idCapDo)
                          ?.tenCapDo || ""}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <strong className="pr-2 w-1/2">Trình Độ:</strong>
                    {isEditing ? (
                      <select
                        id="trinhDo"
                        name="trinhDo"
                        value={postData.trinhDo}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-1/2"
                      >
                        <option value="">Chọn Trình Độ</option>
                        {education_level.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="w-1/2">{postData.trinhDo}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <strong className="pr-2 w-1/2">Kinh Nghiệm:</strong>
                    {isEditing ? (
                      <div className="flex w-1/2">
                        <input
                          type="number"
                          id="kinhNghiem"
                          name="kinhNghiem"
                          value={postData.kinhNghiem}
                          onChange={handleInputChange}
                          className="w-3/5 px-2 py-1 border rounded"
                          placeholder="Nhập số"
                        />
                        <select
                          id="kinhnghiemUnit"
                          name="kinhnghiemUnit"
                          value={postData.KinhnghiemUnit}
                          onChange={handleInputChange}
                          className="w-2/5 px-2 py-1 border rounded ml-1"
                        >
                          <option value="month">Tháng</option>
                          <option value="year">Năm</option>
                        </select>
                      </div>
                    ) : (
                      <span className="w-1/2">
                        {postData.kinhNghiem
                          ? postData.kinhNghiem < 12
                            ? `${postData.kinhNghiem} tháng`
                            : `${Math.floor(postData.kinhNghiem / 12)} năm`
                          : "Không yêu cầu"}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <strong className="pr-2 w-1/2">Số lượng: </strong>
                    {isEditing ? (
                      <input
                        name="soLuong"
                        id="soLuong"
                        value={postData.soLuong}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-1/2"
                      />
                    ) : (
                      <p className="m-0 p-0 w-1/2">{postData.soLuong}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-1/3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Yêu Cầu Công Việc
                </h3>
                {isEditing ? (
                  <div className="px-4 mt-4">
                    <ul className="p-0 list-disc list-inside text-sm text-gray-600">
                      {yeuCau.map((item) => (
                        <li
                          key={item.idYeuCau}
                          className="flex items-center text-base justify-between"
                        >
                          {editingId === item.idYeuCau ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="border p-1 rounded"
                            />
                          ) : (
                            <span>{item.noiDung}</span>
                          )}

                          <div className="flex space-x-2">
                            {editingId === item.idYeuCau ? (
                              <button
                                onClick={handleSaveEdit}
                                className="text-green-500"
                              >
                                Lưu
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEdit(item.idYeuCau)}
                                className="text-blue-500"
                              >
                                Sửa
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(item.idYeuCau)}
                              className="text-red-500"
                            >
                              Xóa
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Add new requirement */}
                    <input
                      type="text"
                      value={newYeuCau}
                      onChange={(e) => setNewYeuCau(e.target.value)}
                      className="border p-1 rounded w-full"
                      placeholder="Thêm yêu cầu công việc"
                    />
                    <button
                      onClick={handleAdd}
                      className="bg-blue-500 text-white py-1 px-3 mt-2 rounded"
                    >
                      Thêm
                    </button>
                  </div>
                ) : (
                  <ul className="p-0 list-disc list-inside text-sm text-gray-600">
                    {yeuCau.map((item) => (
                      <li key={item.idYeuCau}>{item.noiDung}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Liên Lạc
                </h3>
                <div className="text-sm text-gray-600 space-y-2 mt-2">
                  <p className="flex items-center space-x-2">
                    <AiOutlineMail className="text-lg text-gray-600" />
                    <span className="text-sm text-gray-800">
                      {postData.email}
                    </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <SlPhone className="text-lg text-gray-600" />
                    <span className="text-sm text-gray-800">
                      {postData.sdt}
                    </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <TbWorld className="text-lg text-gray-600" />
                    <span className="text-sm text-gray-800">
                      {postData.linkWeb}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center py-2">
              <strong className="pr-2 w-1/6">Địa Chỉ Cụ thể: </strong>
              {isEditing ? (
                <input
                  name="diaChiCuThe"
                  id="diaChiCuThe"
                  value={postData.diaChiCuThe}
                  onChange={handleInputChange}
                  className="border rounded p-1 w-5/6"
                />
              ) : (
                <p className="m-0 p-0">{postData.diaChiCuThe}</p>
              )}
            </div>
            <div className=" items-center py-2">
              <p className="pr-2 font-bold mb-2">Mô Tả: </p>
              {isEditing ? (
                <textarea
                  name="moTa"
                  id="moTa"
                  value={postData.moTa}
                  onChange={handleInputChange}
                  className="border rounded p-1 w-full"
                />
              ) : (
                <p className="m-0 p-0">{postData.moTa}</p>
              )}
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="mt-4">
            {isEditing ? (
              <div className="flex justify-between">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Lưu
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <CandidateList candidates={candidates} setCandidates={setCandidates} />
      </div>
    </div>
  );
};

export default PostDetails;
