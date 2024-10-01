import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
const dailyWorkName = [
  "Post Upload",
  "Ads Run",
  "Website Setup",
  "Pixel Setup",
];

export default function DailyWork() {
  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">Daily Works</h1>
          <Link to="/seo/dailywork/all" className="primary_btn">
            Add Today
          </Link>
        </div>
      </div>

      <div className="min-h-[80vh] overflow-x-auto">
        <table className="zebra_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Client</th>
              {dailyWorkName.map((name, i) => (
                <th key={i}>{name}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {/* <td>{moment(client?.onBoardDate).format("DD-MM-YYYY")}</td>
               */}
              <td>01-10-2024</td>
              <td>eManager</td>
              {dailyWorkName.map((name, i) => (
                <td key={i}>
                  <input type="checkbox" checked />
                </td>
              ))}
              <td>
                <div className="dropdown dropdown-end dropdown-hover">
                  <button
                    tabIndex={0}
                    className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-sm"
                  >
                    Action <MdArrowDropDown />
                  </button>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] w-52 rounded-lg bg-base-100 p-2 shadow"
                  >
                    <li>
                      <div>delete</div>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
