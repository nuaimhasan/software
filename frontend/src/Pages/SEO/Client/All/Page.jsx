import { Link } from "react-router-dom";
import { useAllClientsQuery } from "../../../../Redux/client/clientApi";
import moment from "moment";
import { FaDownload, FaEye } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

export default function AllClients() {
  const [sortOnBoardDate, setSortOnBoardDate] = useState(true);
  let query = {};
  query["role"] = "seo";
  query["sort"] = sortOnBoardDate ? 1 : -1;
  const { data, isLoading } = useAllClientsQuery({ ...query });
  const clients = data?.data;

  console.log("clients", clients);

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

      <div className="relative overflow-x-auto rounded bg-base-100 shadow">
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
              <th>On Board by</th>
              <th>Total Price</th>
              <th>Total Payment</th>
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
                <td>{client?.onbordedBy}</td>
                <td>{client?.totalPrice}/=</td>
                <td>{client?.totalPayment}/=</td>
                <td>{client?.due}/=</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to="" className="duration-200 hover:text-green-500">
                      <FaEye />
                    </Link>
                    <button
                      className="tooltip tooltip-left tooltip-primary duration-200 hover:text-blue-500"
                      data-tip="Download PDF Invoice"
                    >
                      <FaDownload className="text-sm" />
                    </button>
                    <button className="duration-200 hover:text-red-500">
                      <FaDeleteLeft />
                    </button>
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
