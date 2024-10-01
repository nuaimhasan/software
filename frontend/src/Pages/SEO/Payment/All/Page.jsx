import { Link } from "react-router-dom";
import moment from "moment";
import { useAllClientPaymentQuery } from "../../../../Redux/client/clientPaymentApi";
import { FaCalendarAlt, FaEdit, FaEye } from "react-icons/fa";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { IoMdArrowDropdown } from "react-icons/io";

export default function AllPayment() {
  const [sortDate, setSortDate] = useState(true);
  const [date, setDate] = useState([Date.now()]);

  let query = {};
  query["role"] = "seo";
  query["sort"] = sortDate ? 1 : -1;
  query["filterDate"] = date ? JSON.stringify(date) : [];

  const { data, isLoading } = useAllClientPaymentQuery({ ...query });
  const payaments = data?.data;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">Payments</h1>
          <Link to="/seo/payment/make" className="primary_btn">
            Make Payment
          </Link>
        </div>
      </div>

      {/* Filter */}
      <div className="border-b px-4 py-2">
        <div className="filter_option grid grid-cols-2 gap-2 text-neutral-content lg:grid-cols-5">
          <div className="col-span-2 flex h-10">
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
        </div>
      </div>

      <div className="min-h-[80vh] overflow-x-auto">
        <table className="zebra_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>
                <button
                  onClick={() => setSortDate(!sortDate)}
                  className="flex items-center gap-2"
                >
                  <span>Date</span>
                  {sortDate ? (
                    <IoMdArrowDropdown className="duration-200" />
                  ) : (
                    <IoMdArrowDropdown className="rotate-180 transform duration-200" />
                  )}
                </button>
              </th>
              <th>Client</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payaments?.map((payment, index) => (
              <tr key={payment?._id}>
                <td>{index + 1}</td>
                <td>{moment(payment?.date).format("DD-MM-YYYY")}</td>
                <td>{payment?.client?.company}</td>
                <td>{payment?.amount.toLocaleString("en-IN")}/=</td>
                <td>
                  <div className="flex items-center gap-3">
                    <Link
                      className="duration-300 hover:text-primary"
                      to={`/seo/payment/edit/${payment?._id}`}
                    >
                      <FaEdit />
                    </Link>
                    <Link
                      className="duration-300 hover:text-primary"
                      to={`/seo/payment/view/${payment?._id}`}
                    >
                      <FaEye />
                    </Link>
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
