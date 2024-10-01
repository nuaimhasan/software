import { toast } from "react-hot-toast";
import { useDeleteClientMutation } from "../../../../Redux/client/clientApi";
import { useState } from "react";

export default function DeleteModal({ client }) {
  const id = client?._id;
  const [isMatch, setIsMatch] = useState(false);

  const [deleteClient, { isLoading }] = useDeleteClientMutation();

  const handleDelete = async () => {
    const res = await deleteClient({ id, role: "seo" });

    if (res?.data?.success) {
      document.getElementById("client_delete_modal").close();
      toast.success("client delete successfully!");
    } else {
      toast.error("Failed to delete client!");
      console.log(res);
    }
  };

  return (
    <dialog id="client_delete_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-center text-lg font-medium">Delete Service</h3>
        <p className="mt-2 text-center">
          Are you sure went to delete{" "}
          <span className="font-bold text-primary">{client?.name}</span>{" "}
          service?
        </p>

        <div className="mx-auto my-2 w-[80%]">
          <input
            type="text"
            placeholder="type client name"
            onChange={(e) => {
              if (e.target.value === client?.name) {
                setIsMatch(true);
              } else {
                setIsMatch(false);
              }
            }}
          />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            className="rounded bg-gray-200 px-4 py-2 duration-300 hover:bg-gray-300"
            onClick={() =>
              document.getElementById("client_delete_modal").close()
            }
          >
            Cancel
          </button>
          <button
            className="primary_btn"
            onClick={handleDelete}
            disabled={isLoading || !isMatch}
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
