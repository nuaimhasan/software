import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import "react-tagsinput/react-tagsinput.css";
import Select from "react-dropdown-select";
import { MdDelete } from "react-icons/md";
import { useAddClientMutation } from "../../../../Redux/client/clientApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    name: "plan 1",
    order: 1,
  },
  {
    id: 2,
    name: "plan 2",
    order: 2,
  },
  {
    id: 3,
    name: "plan 3",
    order: 3,
  },
  {
    id: 4,
    name: "Page Setup",
    order: 4,
  },
  {
    id: 5,
    name: "Web Development",
    order: 5,
  },
  {
    id: 6,
    name: "Domain & Hosting",
    order: 6,
  },
  {
    id: 7,
    name: "Video Making",
    order: 7,
  },
  {
    id: 8,
    name: "Like & Follow",
    order: 8,
  },
];

export default function AddClient() {
  const navigate = useNavigate();
  const [onboardDate, setOnboardDate] = useState(new Date());
  const [selectedServices, setSelectedServices] = useState([]);
  const [payment, setpayment] = useState(0);

  const [addClient, { isLoading }] = useAddClientMutation();

  let subTotal = 0;
  let due = 0;

  // onchange handler price input field in service table
  const handlePriceChange = (value, service) => {
    setSelectedServices(
      selectedServices.map((s) => {
        if (s.id === service.id) {
          return { ...s, price: parseInt(value), discount: 0, value: "" };
        }
        return s;
      }),
    );
  };

  const handleDiscountChange = (value, service) => {
    setSelectedServices(
      selectedServices.map((s) => {
        if (s.id === service.id) {
          return { ...s, discount: value ? parseInt(value) : 0 };
        }
        return s;
      }),
    );
  };

  const handleValueChange = (value, service) => {
    setSelectedServices(
      selectedServices.map((s) => {
        if (s.id === service.id) {
          return { ...s, value: value ? value : "" };
        }
        return s;
      }),
    );
  };

  // now calculate total discount
  const totalDiscount = selectedServices.reduce(
    (acc, current) => acc + current.discount,
    0,
  );

  // calculate total price
  const totalPrice = selectedServices.reduce(
    (acc, current) => acc + current.price,
    0,
  );

  // calculate sub total
  subTotal = totalPrice - totalDiscount;
  due = subTotal - payment;

  // handle payment change event
  const handlePaymentChange = (value) => {
    setpayment(parseInt(value));
    due = due - parseInt(value);
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      onBoardDate: onboardDate,
      name: formData.get("name"),
      company: formData.get("company"),
      number: formData.get("number"),
      address: formData.get("address"),
      onbordedBy: formData.get("onbordedBy"),
      remark: formData.get("remark"),
      priority: formData.get("priority"),
      services: selectedServices,
      paymentInfo: {
        totalPrice: subTotal,
        totalPayment: payment,
        due: due,
        paymentHistory:
          payment > 0 ? [{ date: new Date(), amount: payment }] : [],
      },
    };

    const res = await addClient(data);
    if (res?.data?.success) {
      toast.success("Client added successfully");
      form.reset();
      setOnboardDate(new Date());
      setSelectedServices([]);
      setpayment(0);
      due = 0;
      subTotal = 0;
      navigate("/seo/client/all");
    } else {
      toast.error(res?.data?.message);
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-3">
        <h2>Add New Client</h2>
      </div>

      <form onSubmit={handleAddClient} className="p-3">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label htmlFor="date">On-Board Date *</label>
            <div className="date_ranger">
              <DatePicker
                value={onboardDate}
                onChange={(date) => setOnboardDate(date)}
                rangeHover
                highlightToday
                shadow={false}
                multiple={false}
              />
            </div>
          </div>

          <div>
            <label htmlFor="name">Client Name *</label>
            <input type="text" name="name" required />
          </div>

          <div>
            <label htmlFor="name">Company Name *</label>
            <input type="text" name="company" required />
          </div>

          <div>
            <label htmlFor="name">Contact Number *</label>
            <input type="text" name="number" required />
          </div>

          <div className="col-span-2">
            <label htmlFor="name">Address</label>
            <input type="text" name="address" />
          </div>

          <div>
            <label htmlFor="name">On Borded by *</label>
            <select name="onbordedBy">
              <option value="" disabled>
                Select{" "}
              </option>
              <option value="sajjad">Sajjad</option>
              <option value="min">Mim</option>
            </select>
          </div>

          <div>
            <label htmlFor="name">Client Priority *</label>
            <select name="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="col-span-2">
            <label htmlFor="name">Remark</label>
            <textarea name="remark"></textarea>
          </div>
        </div>

        {/* Services */}
        <div className="mt-4">
          <div>
            <label htmlFor="name">Services</label>
            <Select
              options={services}
              onChange={(values) => setSelectedServices(values)}
              multi
              values={selectedServices}
              labelField="name"
              valueField="name"
            />
          </div>

          {selectedServices.length > 0 && (
            <div className="mt-4">
              <div className="relative overflow-x-auto">
                <table className="border_table">
                  <thead>
                    <tr>
                      <th>Service Name</th>
                      <th>Price</th>
                      <th>Value</th>
                      <th>Discount(tk)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedServices.map((service, i) => (
                      <tr key={i}>
                        <td>{service?.name}</td>
                        <td>
                          <input
                            type="number"
                            name="price"
                            min={0}
                            className="text-end"
                            onChange={(e) =>
                              handlePriceChange(e.target.value, service)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="value"
                            className="text-end"
                            onChange={(e) =>
                              handleValueChange(e.target.value, service)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="discount"
                            className="text-end"
                            min={0}
                            onChange={(e) =>
                              handleDiscountChange(e.target.value, service)
                            }
                          />
                        </td>
                        <td>
                          <div
                            onClick={() => {
                              setSelectedServices(
                                selectedServices.filter(
                                  (s) => s.id !== service.id,
                                ),
                              );
                            }}
                            className="cursor-pointer text-xl hover:text-red-500"
                          >
                            <MdDelete />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr className="bg-gray-50">
                      <th>Total</th>
                      <th>
                        <p className="text-end">
                          {totalPrice ? totalPrice : "00"}TK
                        </p>
                      </th>
                      <td></td>
                    </tr>

                    <tr>
                      <th>Discount</th>
                      <th>
                        <p className="text-end text-red-500">
                          - {totalDiscount ? totalDiscount : "00"}TK
                        </p>
                      </th>
                      <td></td>
                    </tr>

                    <tr className="bg-gray-50">
                      <th>Sub Total</th>
                      <th>
                        <p className="text-end">
                          {subTotal ? subTotal : "00"}TK
                        </p>
                      </th>
                      <td></td>
                    </tr>

                    <tr>
                      <th>Payment</th>
                      <th>
                        <input
                          type="number"
                          name="payment"
                          className="text-end"
                          onChange={(e) => handlePaymentChange(e.target.value)}
                          defaultValue={payment}
                        />
                      </th>
                      <td></td>
                    </tr>

                    <tr className="bg-gray-100">
                      <th>Due</th>
                      <th>
                        <p className="text-end">{due}TK</p>
                      </th>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button className="primary_btn">
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
