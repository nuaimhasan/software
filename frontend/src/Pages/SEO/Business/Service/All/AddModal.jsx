import { useAddserviceMutation } from "../../../../../Redux/serviceApi";
import { toast } from "react-hot-toast";

export default function AddModal() {
  const [addservice, { isLoading }] = useAddserviceMutation();

  const handleAddService = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;

    if (!name || !type) {
      alert("All fields are required!");
      return;
    }

    const data = { name, type };
    const res = await addservice({ data, role: "seo" });

    if (res?.data?.success) {
      document.getElementById("service_add_modal").close();
      form.reset();
      toast.success("Service added successfully!");
    } else {
      toast.error("Failed to add service!");
      console.log(res);
    }
  };

  return (
    <dialog id="service_add_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-center text-lg font-medium">Add New Service</h3>

        <form onSubmit={handleAddService} className="flex flex-col gap-4">
          <div>
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter service name"
              required
            />
          </div>

          <div>
            <label>Service Type</label>
            <select name="type" required>
              <option value="">Select service type</option>
              <option value="monthly">Monthly</option>
              <option value="ontime">On Time</option>
            </select>
          </div>

          <div className="flex gap-3 text-sm">
            <div
              onClick={() =>
                document.getElementById("service_add_modal").close()
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
