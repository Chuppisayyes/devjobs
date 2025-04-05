import React, { useState , useEffect} from "react";
import { FaEdit } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";

import AdminApi from "../../api/admin/admin";


const PositionManager = () => {
  const [positions, setPositions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedPosition, setEditedPosition] = useState({
    tenViTri: "",
    trangThai: "",
  });
  const [isAdding, setIsAdding]  = useState(false);
  const [newPosition, setNewPosition] = useState({
    tenViTri: "",
    trangThai: "Đã Duyệt",
  });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const positions = await AdminApi.getAdmin("/all-position");
          setPositions(positions)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

  const handleEditClick = (position) => {
    setEditingId(position.idViTri);
    setEditedPosition(position);
  };

  const handleSaveClick = async (idViTri) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.idViTri === idViTri ? editedPosition : position
      )
    );
    const data = {
      trangThai: editedPosition.trangThai,
      tenViTri: editedPosition.tenViTri,
      idViTri: idViTri,
    };
    await AdminApi.getUpdateManager("/update/position", data);
    await AdminApi.getAdmin("/all-position").then((res) => {
      setPositions(res);
    });

    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedPosition({ tenViTri: "", trangThai: "Đã Duyệt" });
  };

  

  const handleAddPosition = () => {
    setIsAdding(true);
  };

  const handleSaveNewPosition = async () => {
    if (newPosition.tenViTri.trim()) {
      const data = {
        ten: newPosition.tenViTri.trim(),
      };
      await AdminApi.AddManager("add/position", data);
      const position = await AdminApi.getAdmin("/all-position");
      setIsAdding(false);
      setPositions(position)
    }
  };

  const handleCancelNewPosition = () => {
    setIsAdding(false);
    setNewPosition({ tenViTri: "", trangThai: "Đã Duyệt" });
  };

  return (
    <div className="flex flex-col w-1/2 mr-2 bg-custom-item rounded h-full">
      <div className="shadow-md rounded pl-6 py-2 flex items-center justify-between">
        <h1 className="text-lg text-white font-bold">Quản lý vị trí</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-h-70 overflow-y-auto space-y-2">
          {positions.map((position) => (
            <div
              key={position.idViTri}
              className="flex items-center justify-between bg-white shadow-md rounded-md px-3 py-2"
            >
              <div>
                {editingId === position.idViTri ? (
                  <>
                    <input
                      type="text"
                      value={editedPosition.tenViTri}
                      onChange={(e) =>
                        setEditedPosition({
                          ...editedPosition,
                          tenViTri: e.target.value,
                        })
                      }
                      className="border rounded p-1 text-sm"
                    />
                    <select
                      value={editedPosition.trangThai}
                      onChange={(e) =>
                        setEditedPosition({
                          ...editedPosition,
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
                    <h2 className="font-bold text-sm mr-2">
                      {position.tenViTri}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        position.trangThai === "Đã Duyệt"
                          ? "bg-green-100 text-green-500"
                          : position.trangThai === "Đã Khóa"
                          ? "bg-red-100 text-red-500"
                          : "bg-blue-100 text-blue-500"
                      }`}
                    >
                      {position.trangThai}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                {editingId === position.idViTri ? (
                  <>
                    <button
                      className="text-green-500 hover:text-green-600 mx-2"
                      onClick={() => handleSaveClick(position.idViTri)}
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
                      onClick={() => handleEditClick(position)}
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
          <div className="flex items-center justify-between bg-white shadow-md rounded-md px-3 py-2">
            <div>
              <input
                type="text"
                value={newPosition.tenViTri}
                onChange={(e) =>
                  setNewPosition({ ...newPosition, tenViTri: e.target.value })
                }
                placeholder="Tên vị trí"
                className="border rounded p-1 text-sm"
              />
            </div>
            <div className="flex items-center">
              <button
                className="text-green-500 hover:text-green-600 mx-2"
                onClick={handleSaveNewPosition}
              >
                Lưu
              </button>
              <button
                className="text-gray-500 hover:text-gray-600"
                onClick={handleCancelNewPosition}
              >
                Hủy
              </button>
            </div>
          </div>
        )}
        <button
          className="bg-orange-500 text-white text-sm px-3 py-2 rounded-md hover:bg-orange-600 flex items-center gap-2"
          onClick={handleAddPosition}
        >
          <MdAddCircle size={16} />
          Thêm vị trí
        </button>
      </div>
    </div>
  );
};

export default PositionManager;
