import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useAllUsersQuery } from "../../../../Redux/user/userApi";
import { useAddAsignProjectMutation } from "../../../../Redux/asignProjectApi";

export default function AddModal() {
  let query = { role: "cto", user: "developer" };
  const { data } = useAllUsersQuery({ ...query });
  const developers = data?.data;

  const [addAsignProject, { isLoading }] = useAddAsignProjectMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const developer = form.get("developer");
    const asignDate = form.get("asignDate");
    const handoverDate = form.get("handoverDate");
    const note = form.get("note");

    const data = {
      name,
      developer,
      asignDate,
      handoverDate,
      note,
    };

    const res = await addAsignProject({ data, role: "cto" });
    if (res?.data?.success) {
      document.getElementById("add_project_modal").close();
      toast.success(
        res?.data?.message ? res?.data?.message : "Project added successfully",
      );
    } else {
      toast.error(
        res?.data?.message ? res?.data?.message : "Something went wrong!",
      );
      console.log(res);
    }
  };

  return (
    <dialog id="add_project_modal" className="modal">
      <div className="modal-box">
        <div className="relative p-3 text-center">
          <h2 className="text-neutral">Add Project</h2>

          <button
            onClick={() => document.getElementById("add_project_modal").close()}
            className="absolute right-2 top-4 text-neutral-content"
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleAdd} className="form_group">
          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Project Name</p>
            <input type="text" name="name" required />
          </div>

          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Asign Developer</p>
            <select name="developer">
              {developers?.map((developer) => (
                <option key={developer?._id} value={developer?._id}>
                  {developer?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Asign Date</p>
            <input type="date" name="asignDate" required />
          </div>

          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Handover Date</p>
            <input type="date" name="handoverDate" required />
          </div>

          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Note</p>
            <textarea name="note"></textarea>
          </div>

          <div className="mt-4">
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
