import { useDeleteServiceMutation } from "../../../../../Redux/serviceApi";
import { toast } from "react-hot-toast";

export default function DeleteModal({ service }) {
  const id = service?._id;
  const [deleteService, { isLoading }] = useDeleteServiceMutation();

  const handleDeleteService = async () => {
    const res = await deleteService({ id, role: "seo" });

    if (res?.data?.success) {
      document.getElementById("service_delete_modal").close();
      toast.success("Service delete successfully!");
    } else {
      toast.error("Failed to delete service!");
      console.log(res);
    }
  };

  return (
    <dialog id="service_delete_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-center text-lg font-medium">Delete Service</h3>
        <p className="mt-2">
          Are you sure went to delete {service?.name} service?
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            className="rounded bg-gray-200 px-4 py-2 duration-300 hover:bg-gray-300"
            onClick={() =>
              document.getElementById("service_delete_modal").close()
            }
          >
            Cancel
          </button>
          <button
            className="primary_btn"
            onClick={handleDeleteService}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
