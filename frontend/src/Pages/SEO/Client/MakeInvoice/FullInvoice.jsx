import moment from "moment";
import numWords from "num-words";

export default function FullInvoice({ client }) {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="relative bg-base-100 text-[#111]">
      <div className="ml-6 mt-8">
        <img src="/images/invoice/top.png" alt="top" className="h-24 w-full" />
      </div>

      <div className="mt-4 h-[72vh] text-xs">
        <p className="text-center font-semibold underline">
          Invoice {client?.paymentInfo?.invoice}/
          {currentDate.split("/").join("-")}
        </p>

        <div className="mx-20 mt-4">
          <div>
            <p className="text-[13px] font-medium">Date: {currentDate}</p>

            <div className="mt-2 text-sm font-medium">
              <p className="text-[13px] font-semibold">To</p>
              <p>{client?.name}</p>
              <p>{client?.company}</p>
              <p>{client?.number}</p>
              <p>{client?.address}</p>
            </div>

            <p className="mt-4 text-sm font-medium">
              Subject: Invoice of Facebook Ad Maintenance.
            </p>

            {/* table */}
            <div className="relative mt-4 overflow-x-auto">
              <table className="invoice_table">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Solution</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {client?.services?.map((service, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{service?.name}</td>
                      <td>
                        <p className="text-end">
                          {(service?.price - service?.discount).toLocaleString(
                            "en-IN",
                          )}
                          /=
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <th colSpan="2">
                      <p className="text-end">Total</p>
                    </th>
                    <th>
                      <p className="text-end">
                        {client?.paymentInfo?.totalPrice?.toLocaleString(
                          "en-IN",
                        )}
                        /=
                      </p>
                    </th>
                  </tr>

                  {client?.paymentInfo?.paymentHistory?.map((payment, i) => (
                    <tr key={i}>
                      <th colSpan="2">
                        <p className="text-end">
                          Payment -{" "}
                          {moment(client?.payment?.date).format("DD-MM-YYYY")}
                        </p>
                      </th>
                      <th>
                        <p className="text-end">
                          {payment?.amount?.toLocaleString("en-IN")}/=
                        </p>
                      </th>
                    </tr>
                  ))}

                  <tr className="bg-orange-200">
                    <th colSpan="2">
                      <p className="text-end">Due</p>
                    </th>
                    <th>
                      <p className="text-end">
                        {client?.paymentInfo?.due?.toLocaleString("en-IN")}/=
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <th colSpan="3">
                      <p className="text-start capitalize">
                        In Word: {numWords(client?.paymentInfo?.due)} Taka Only
                      </p>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6">
              <h2 className="inline bg-green-400 px-1 py-px text-base font-medium">
                Payment Method: Prepaid
              </h2>

              <div className="mt-6">
                <h2 className="text-[17px] font-medium">* Account Details:</h2>

                <div className="mt-1 text-[15px] font-medium">
                  <div className="flex items-center">
                    <p className="w-52">Bank Name</p>
                    <p>:THE CITY BANK LTD.</p>
                  </div>
                  <div className="flex items-center">
                    <p className="w-52">Account Name</p>
                    <p>:EMANAGER IT LTD.</p>
                  </div>
                  <div className="flex items-center">
                    <p className="w-52">Branch Name</p>
                    <p>:GULSHAN AVENUE</p>
                  </div>
                  <div className="flex items-center">
                    <p className="w-52">Account Number</p>
                    <p>:1404162113001</p>
                  </div>
                  <div className="flex items-center">
                    <p className="w-52">Routing Number</p>
                    <p>:225261732</p>
                  </div>

                  <p className="mt-4">Bkash/Nagad-Send Money: 01712671915</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="pl-16 text-[13px] text-black">
          <h2>Thanks & Best Regards</h2>

          <div className="mt-2">
            <p>Mainul sakib</p>
            <p>HR & Accounts</p>
          </div>
        </div>

        <img
          src="/images/invoice/bottom.png"
          alt="top"
          className="mt-4 h-20 w-[95%]"
        />
      </div>
    </div>
  );
}
