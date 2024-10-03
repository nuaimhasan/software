import { useAllUsersQuery } from "../../../../Redux/user/userApi";
import AddModal from "./AddModal";

export default function Developers() {
  let query = { role: "cto", user: "developer" };
  const { data } = useAllUsersQuery({ ...query });
  const developers = data?.data;

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
            </tr>
          </thead>
          <tbody>
            {developers?.map((developer, i) => (
              <tr key={developer?._id}>
                <td>{i + 1}</td>
                <td>{developer?.name}</td>
                <td>{developer?.email}</td>
                <td>{developer?.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
