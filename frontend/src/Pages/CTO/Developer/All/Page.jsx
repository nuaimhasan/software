import AddBtn from "../Add/AddBtn";

export default function Developers() {
  return (
    <section className="bg-base-100 shadow rounded">
      <div className="flex justify-between items-center px-4 py-3">
        <h2>Developers</h2>
        <AddBtn />
      </div>

      <div className="relative overflow-x-auto shadow-lg">
        <table className="border_table">
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
                  <img src="" alt="" className="w-8 h-8 rounded-full border" />
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
