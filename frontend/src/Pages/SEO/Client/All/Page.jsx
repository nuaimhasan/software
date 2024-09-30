import { Link } from "react-router-dom";
import { useAllClientsQuery } from "../../../../Redux/client/clientApi";
import moment from "moment";
import { FaEdit, FaEye, FaPrint } from "react-icons/fa";
import { MdArrowDropDown, MdDelete } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

export default function AllClients() {
  const [sortOnBoardDate, setSortOnBoardDate] = useState(true);
  let query = {};
  query["role"] = "seo";
  query["sort"] = sortOnBoardDate ? 1 : -1;
  const { data, isLoading } = useAllClientsQuery({ ...query });
  const clients = data?.data;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="rounded border-b bg-base-100 px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Clients</h1>
          <Link to="/seo/client/add" className="primary_btn">
            Add New Client
          </Link>
        </div>
      </div>

      <div className="min-h-[80vh] overflow-x-auto rounded bg-base-100">
        <table className="zebra_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>
                <button
                  onClick={() => setSortOnBoardDate(!sortOnBoardDate)}
                  className="flex w-full items-center justify-between"
                >
                  <span>On Board Date</span>
                  <IoMdArrowDropdown />
                </button>
              </th>
              <th>Client</th>
              <th>Service</th>
              <th>Priority</th>
              <th>Total Price</th>
              <th>Total Due</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, i) => (
              <tr key={client?._id}>
                <td>{i + 1}</td>
                <td>{moment(client?.onBoardDate).format("DD-MM-YYYY")}</td>
                <td>
                  <p>{client?.name}</p>
                  <p>{client?.company}</p>
                  <p>{client?.number}</p>
                  <p>{client?.address}</p>
                </td>
                <td>
                  {client?.services?.map((service, i) => (
                    <p key={service?._id}>
                      {i + 1}. {service?.name}
                    </p>
                  ))}
                </td>
                <td>
                  <p
                    className={
                      client?.priority == "low"
                        ? "text-yellow-600"
                        : client?.priority == "medium"
                          ? "text-orange-600"
                          : "text-green-600"
                    }
                  >
                    {client?.priority}
                  </p>
                </td>
                <td>
                  {client?.paymentInfo?.totalPrice.toLocaleString("en-IN")}/=
                </td>
                <td>{client?.paymentInfo?.due.toLocaleString("en-IN")}/=</td>
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
                        <Link to={`/seo/client/view/${client?._id}`}>
                          <FaEye /> View Full Details
                        </Link>
                      </li>
                      <li>
                        <Link to={`/seo/client/make-invoice/${client?._id}`}>
                          <FaPrint /> Make Invoice
                        </Link>
                      </li>
                      <li>
                        <Link to={`/seo/client/edit/${client?._id}`}>
                          <FaEdit /> Edit Client
                        </Link>
                      </li>
                      <li>
                        <button>
                          <MdDelete /> Delete Client
                        </button>
                      </li>
                    </ul>
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
