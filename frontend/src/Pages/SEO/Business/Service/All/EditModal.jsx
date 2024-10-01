import { useEffect, useState } from "react";
import { useUpdateServiceMutation } from "../../../../../Redux/serviceApi";
import { toast } from "react-hot-toast";

export default function EditModal({ service }) {
  const id = service?._id;
  const [type, setType] = useState("");
  useEffect(() => {
    setType(service?.type);
  }, [service]);

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const handleEditService = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;

    if (!name || !type) {
      alert("All fields are required!");
      return;
    }

    const data = { name, type };
    const res = await updateService({ id, data, role: "seo" });

    if (res?.data?.success) {
      document.getElementById("service_edit_modal").close();
      form.reset();
      toast.success("Service edited successfully!");
    } else {
      toast.error("Failed to edit service!");
      console.log(res);
    }
  };

  return (
    <dialog id="service_edit_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-center text-lg font-medium">
          Edit {service?.Name}
        </h3>

        <form onSubmit={handleEditService} className="flex flex-col gap-4">
          <div>
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter service name"
              required
              defaultValue={service?.name}
            />
          </div>

          <div>
            <label>Service Type</label>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="ontime">On Time</option>
            </select>
          </div>

          <div className="flex gap-3 text-sm">
            <div
              onClick={() =>
                document.getElementById("service_edit_modal").close()
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
