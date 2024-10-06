import { FaEdit } from "react-icons/fa";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../../../Redux/user/userApi";
import AddModal from "./AddModal";
import { MdDelete } from "react-icons/md";
import EditModal from "./EditModal";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Developers({ role }) {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  let query = { role, user: "developer" };
  const { data } = useAllUsersQuery({ ...query });
  const developers = data?.data;

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (developer) => {
    const isConfirm = window.confirm(
      `Are you sure to delete ${developer?.name} developer?`,
    );

    if (isConfirm) {
      const res = await deleteUser({ id: developer?._id, role: "cto" });

      if (res?.data?.success) {
        toast.success(
          res?.data?.message
            ? res?.data?.message
            : "Developer deleted successfully",
        );
      } else {
        toast.error(
          res?.data?.message
            ? res?.data?.message
            : "Failed to delete developer",
        );
      }
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        <h2>Developers</h2>
        <div>
          <button
            onClick={() =>
              document.getElementById("add_developer_modal").showModal()
            }
            className="primary_btn"
          >
            Add New
          </button>

          <AddModal />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
        <table className="zebra_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {developers?.map((developer, i) => (
              <tr key={developer?._id}>
                <td>{i + 1}</td>
                <td>{developer?.name}</td>
                <td>{developer?.email}</td>
                <td>{developer?.role}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div>
                      <button
                        onClick={() => {
                          setSelectedDeveloper(developer);
                          document
                            .getElementById("edit_developer_modal")
                            .showModal();
                        }}
                        className="secondary_btn"
                      >
                        <FaEdit />
                      </button>

                      <EditModal developer={selectedDeveloper} />
                    </div>

                    <div>
                      <button
                        onClick={() => handleDelete(developer)}
                        className="danger_btn"
                      >
                        <MdDelete className="text-lg text-red-500" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
