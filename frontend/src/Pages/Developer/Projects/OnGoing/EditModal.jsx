import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useUpdateStatusProjectMutation } from "../../../../Redux/develoeprProjectApi";

export default function EditModal({ project }) {
  const [updateStatusProject, { isLoading }] = useUpdateStatusProjectMutation();

  const handleStartProject = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const completedDate = form.get("completedDate");
    const url = form.get("url");
    const info = form.get("info");
    const password = form.get("password");

    const data = {
      completedDate,
      status: "completed",
      projectInfo: {
        url,
        info,
        password,
      },
    };

    const id = project?._id;

    const res = await updateStatusProject({ id, data, role: "developer" });
    if (res?.data?.success) {
      document.getElementById("edit_project_modal").close();
      toast.success(
        res?.data?.message ? res?.data?.message : "Project update successfully",
      );
    } else {
      toast.error(
        res?.data?.message ? res?.data?.message : "Something went wrong!",
      );
      console.log(res);
    }
  };

  return (
    <dialog id="edit_project_modal" className="modal">
      <div className="modal-box">
        <div className="relative p-3 text-center">
          <h2 className="text-neutral">Complete Project?</h2>

          <button
            onClick={() =>
              document.getElementById("edit_project_modal").close()
            }
            className="absolute right-2 top-4 text-neutral-content"
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleStartProject} className="form_group">
          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Project Name</p>
            <input
              type="text"
              name="name"
              required
              defaultValue={project?.name}
              disabled
            />
          </div>

          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Completed Date</p>
            <input type="date" name="completedDate" required />
          </div>

          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="mb-1 text-sm text-neutral-content">Project URL</p>
              <input type="text" name="url" required />
            </div>
            <div>
              <p className="mb-1 text-sm text-neutral-content">Admin Info</p>
              <input type="text" name="info" required />
            </div>
            <div>
              <p className="mb-1 text-sm text-neutral-content">
                Admin Password
              </p>
              <input type="text" name="password" required />
            </div>
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
