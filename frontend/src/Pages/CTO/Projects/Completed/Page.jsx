import { Link } from "react-router-dom";

export default function CompletedProjects() {
  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        <h2>Completed Projects</h2>
        <Link to="/cto/project/completed/add" className="primary_btn">
          Asigns Project
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
        <table className="zebra_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div className="flex items-center gap-2">
                  <img src="" alt="" className="h-8 w-8 rounded-full border" />
                  developer?.name
                </div>
              </td>
              <td>developer?.designation</td>
              <td>
                <div className="flex items-center gap-2">
                  {/* <EditBtn id={developer?._id} />

                    <DeleteBtn id={developer?._id} /> */}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
