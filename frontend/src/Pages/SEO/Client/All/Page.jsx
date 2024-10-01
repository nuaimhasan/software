import { Link } from "react-router-dom";
import { useAllClientsQuery } from "../../../../Redux/client/clientApi";
import moment from "moment";
import DatePicker from "react-multi-date-picker";
import { FaEdit, FaEye, FaMoneyBill, FaPrint } from "react-icons/fa";
import { MdArrowDropDown, MdDelete } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import PaymentModal from "./PaymentModal";
import { CiSearch } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { BsPersonBadge } from "react-icons/bs";

export default function AllClients() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [sortOnBoardDate, setSortOnBoardDate] = useState(true);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(Date.now());
  const [onBoardBy, setOnBoardBy] = useState("");
  const [status, setStatus] = useState("all");

  let query = {};
  query["role"] = "seo";
  query["sort"] = sortOnBoardDate ? 1 : -1;
  query["search"] = search ? search : "";
  query["date"] = date ? JSON.stringify(date) : [];
  query["onBoardBy"] = onBoardBy ? onBoardBy : "all";
  query["status"] = status ? status : "all";
  const { data, isLoading } = useAllClientsQuery({ ...query });
  const clients = data?.data;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Clients</h1>
          <Link to="/seo/client/add" className="primary_btn">
            Add New Client
          </Link>
        </div>
      </div>

      {/* Filter */}
      <div className="border-b px-4 py-2">
        <div className="filter_option grid grid-cols-2 gap-2 text-neutral-content lg:grid-cols-5">
          <div className="col-span-2 flex h-10">
            <div className="flex items-center rounded-l border border-r-0 border-gray-300 bg-gray-200 px-2.5 py-1.5">
              <CiSearch className="text-lg text-neutral-content" />
            </div>

            <input
              type="text"
              placeholder="search client by name or number"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex h-10">
            <div className="flex items-center rounded-l border border-r-0 border-gray-300 bg-gray-200 px-2.5 py-1.5">
              <FaCalendarAlt className="text-neutral-content" />
            </div>

            <div className="filter_date_ranger">
              <DatePicker
                value={date}
                onChange={setDate}
                range
                numberOfMonths={2}
                displayWeekNumbers
                rangeHover
                highlightToday
                shadow={false}
              />
            </div>
          </div>

          <div className="flex h-10">
            <div className="flex items-center rounded-l border border-r-0 border-gray-300 bg-gray-200 px-2.5 py-1.5">
              <BsPersonBadge className="text-lg text-neutral-content" />
            </div>
            <select onChange={(e) => setOnBoardBy(e.target.value)}>
              <option value="all">On Board By</option>
              <option value="sajjad">Sajjad</option>
              <option value="mim">Mim</option>
            </select>
          </div>

          <div className="flex h-10">
            <div className="flex items-center rounded-l border border-r-0 border-gray-300 bg-gray-200 px-2.5 py-1.5">
              <BsPersonBadge className="text-lg text-neutral-content" />
            </div>
            <select onChange={(e) => setStatus(e.target.value)}>
              <option value="all">Status</option>
              <option value="active">Active</option>
              <option value="close">Close</option>
            </select>
          </div>
        </div>
      </div>

      <div className="min-h-[80vh] overflow-x-auto">
        <table className="zebra_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Client</th>
              <th>
                <button
                  onClick={() => setSortOnBoardDate(!sortOnBoardDate)}
                  className="flex w-full items-center justify-between"
                >
                  <span>On Board Date</span>
                  <IoMdArrowDropdown />
                </button>
              </th>
              <th>Service</th>
              <th>Priority</th>
              <th>On Board By</th>
              <th>Total Due</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients?.length > 0 ? (
              clients?.map((client, i) => (
                <tr key={client?._id}>
                  <td>{i + 1}</td>
                  <td>
                    <p>{client?.name}</p>
                    <p>{client?.company}</p>
                    <p>{client?.number}</p>
                    <p>{client?.address}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      {client?.socials?.map((social, i) => (
                        <Link
                          key={i}
                          to={social?.link}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          {social?.name}
                        </Link>
                      ))}
                    </div>
                  </td>
                  <td>{moment(client?.onBoardDate).format("DD-MM-YYYY")}</td>
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
                          <div>
                            <button
                              onClick={() => {
                                setSelectedClient(client);
                                document
                                  .getElementById("client_payment_modal")
                                  .showModal();
                              }}
                              className="flex items-center gap-2"
                            >
                              <FaMoneyBill /> Make Payment
                            </button>

                            <PaymentModal client={selectedClient} />
                          </div>
                        </li>
                        <li>
                          <Link to={`/seo/client/edit/${client?._id}`}>
                            <FaEdit /> Edit Client
                          </Link>
                        </li>
                        <li>
                          <div>
                            <button
                              onClick={() => {
                                setSelectedClient(client);
                                document
                                  .getElementById("client_delete_modal")
                                  .showModal();
                              }}
                              className="flex items-center gap-2"
                            >
                              <MdDelete className="text-base" /> Delete Client
                            </button>

                            <DeleteModal client={selectedClient} />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <p className="text-center text-sm text-red-500">
                    No client found!
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
