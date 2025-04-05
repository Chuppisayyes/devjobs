import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import AdminApi from "../../api/admin/admin";


const LevelManager = () => {
  const [levels, setLevels] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedLevel, setEditedLevel] = useState({
    tenCapDo: "",
    trangThai: "",
    mucDo:"",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newLevel, setNewLevel] = useState({
    tenCapDo: "",
    trangThai: "Đã Duyệt",
    mucDo:"",
  });
   useEffect(() => {
      const fetchData = async () => {
        try {
          const level = await AdminApi.getAdmin("/all-level");
          setLevels(level)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  const handleEditClick = (level) => {
    setEditingId(level.idCapDo);
    setEditedLevel(level);
  };

  const handleSaveClick = async (idCapDo) => {
    setLevels((prevLevels) =>
      prevLevels.map((level) =>
        level.idCapDo === idCapDo ? editedLevel : level
      )
    );

    await AdminApi.getUpdateManager("/update/level", editedLevel);
    await AdminApi.getAdmin("/all-level").then((res) => {
      setEditingId(res);
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedLevel({ tenCapDo: "", trangThai: "Đã Duyệt" });
  };

  const handleAddLevel = () => {
    setIsAdding(true);
  };

  const handleSaveNewLevel = async () => {
    if (newLevel.tenCapDo.trim()) {
      const data = {
        ten: newLevel.tenCapDo.trim(),
        mucDo: newLevel.mucDo,
      };
     await AdminApi.AddManager("add/level", data);
      const level = await AdminApi.getAdmin("/all-level");
      setLevels(level);
      setIsAdding(false);
    }
  };

  const handleCancelNewLevel = () => {
    setIsAdding(false);
    setNewLevel({ tenCapDo: "", trangThai: "Đã Duyệt" });
  };

  return (
    <div className="flex flex-col w-1/2 mr-2 bg-custom-item rounded h-full">
      <div className="shadow-md rounded pl-6 py-2 flex items-center justify-between">
        <h1 className="text-lg text-white font-bold">Quản lý cấp độ</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-h-70 overflow-y-auto space-y-2">
          {levels.map((level) => (
            <div
              key={level.idCapDo}
              className="flex items-center justify-between bg-white shadow-md rounded-md px-3 py-2"
            >
              <div>
                {editingId === level.idCapDo ? (
                  <>
                    <input
                      type="text"
                      value={editedLevel.tenCapDo}
                      onChange={(e) =>
                        setEditedLevel({
                          ...editedLevel,
                          tenCapDo: e.target.value,
                        })
                      }
                      className="border rounded p-1 text-sm"
                    />
                      <input
                      type="number"
                      value={editedLevel.mucDo}
                      onChange={(e) =>
                        setEditedLevel({
                          ...editedLevel,
                          mucDo: e.target.value,
                        })
                      }
                      className="border rounded p-1 ml-2 text-sm"
                    />
                    <select
                      value={editedLevel.trangThai}
                      onChange={(e) =>
                        setEditedLevel({
                          ...editedLevel,
                          trangThai: e.target.value,
                        })
                      }
                      className="border rounded p-1 text-sm ml-2"
                    >
                      <option value="Đã Duyệt">Duyệt</option>
                      <option value="Đã Khóa">Khóa</option>
                    </select>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-sm mr-2">{level.tenCapDo}</h2>
                    <h2 className="text-sm mr-2">Mức độ: {level.mucDo}</h2>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        level.trangThai === "Đã Duyệt"
                          ? "bg-green-100 text-green-500"
                          : level.trangThai === "Đã Khóa"
                          ? "bg-red-100 text-red-500"
                          : "bg-blue-100 text-blue-500"
                      }`}
                    >
                      {level.trangThai}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                {editingId === level.idCapDo ? (
                  <>
                    <button
                      className="text-green-500 hover:text-green-600 mx-2"
                      onClick={() => handleSaveClick(level.idCapDo)}
                    >
                      Lưu
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-600"
                      onClick={handleCancelEdit}
                    >
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-yellow-500 hover:text-yellow-600 mx-2"
                      onClick={() => handleEditClick(level)}
                    >
                      <FaEdit size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shadow-md bg-custom-item justify-between p-4 flex">
        {isAdding && (
          <div className="flex items-center justify-between bg-white shadow-md rounded-md px-1 py-2">
            <div className="flex">
              <input
                type="text"
                value={newLevel.tenCapDo}
                onChange={(e) =>
                  setNewLevel({ ...newLevel, tenCapDo: e.target.value })
                }
                placeholder="Tên cấp độ"
                className="border rounded p-1 mr-2 text-sm"
              />
               <input
                type="number"
                value={newLevel.mucDo}
                onChange={(e) =>
                  setNewLevel({ ...newLevel, mucDo: e.target.value })
                }
                placeholder="Mức độ"
                className="border rounded p-1 text-sm"
              />
            </div>
            <div className="flex items-center">
              <button
                className="text-green-500 hover:text-green-600 mx-2"
                onClick={handleSaveNewLevel}
              >
                Lưu
              </button>
              <button
                className="text-gray-500 hover:text-gray-600"
                onClick={handleCancelNewLevel}
              >
                Hủy
              </button>
            </div>
          </div>
        )}
        <button
          className="bg-orange-500 text-white text-sm px-3 py-2 rounded-md hover:bg-orange-600 flex items-center gap-2"
          onClick={handleAddLevel}
        >
          <MdAddCircle size={16} />
          Thêm cấp độ
        </button>
      </div>
    </div>
  );
};

export default LevelManager;
