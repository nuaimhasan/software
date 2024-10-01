import { toast } from "react-hot-toast";
import { useAddClientPaymentMutation } from "../../../../Redux/client/clientPaymentApi";

export default function PaymentModal({ client }) {
  const [addClientPayment, { isLoading }] = useAddClientPaymentMutation();

  const handleAddService = async (e) => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const amount = form.amount.value;

    if (!date || !amount) {
      toast.error("All fields are required!");
      return;
    }

    const data = { date, amount, client: client?._id };
    const res = await addClientPayment({ data, role: "seo" });

    if (res?.data?.success) {
      document.getElementById("client_payment_modal").close();
      form.reset();
      toast.success("payment added successfully!");
    } else {
      toast.error("Failed to add payment!");
      console.log(res);
    }
  };

  return (
    <dialog id="client_payment_modal" className="modal">
      <div className="modal-box w-8/12">
        <h3 className="text-center text-lg font-medium">Add New Payment</h3>

        <form onSubmit={handleAddService} className="flex flex-col gap-4">
          <div>
            <label>Client</label>
            <input type="text" value={client?.name} disabled />
          </div>

          <div className="date_ranger">
            <label>Payment Date</label>
            <input type="date" name="date" />
          </div>

          <div>
            <label>Amount</label>
            <input type="number" name="amount" required />
          </div>

          <div className="flex gap-3 text-sm">
            <div
              onClick={() =>
                document.getElementById("client_payment_modal").close()
              }
              className="cursor-pointer rounded bg-gray-200 px-4 py-2"
            >
              Cancel
            </div>
            <button className="primary_btn">
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
