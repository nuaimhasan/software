import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useAllUsersQuery } from "../../../../Redux/user/userApi";
import { useEffect, useState } from "react";
import { useUpdateDeveloperProjectMutation } from "../../../../Redux/develoeprProjectApi";
import TagsInput from "react-tagsinput";

export default function EditModal({ project }) {
  const [tecnology, setTecnology] = useState([]);
  const [developer, setDeveloper] = useState(project?.developer?._id);

  useEffect(() => {
    if (project?.technologies) {
      setTecnology(project?.technologies);
    }

    if (project?.developer?._id) {
      setDeveloper(project?.developer?._id);
    }
  }, [project]);

  let query = { role: "cto", user: "developer" };
  const { data } = useAllUsersQuery({ ...query });
  const developers = data?.data;

  const [updateDeveloperProject, { isLoading }] =
    useUpdateDeveloperProjectMutation();

  const handleEdit = async (e) => {
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

    const id = project?._id;

    const res = await updateDeveloperProject({ id, data, role: "cto" });
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
          <h2 className="text-neutral">Edit Project</h2>

          <button
            onClick={() =>
              document.getElementById("edit_project_modal").close()
            }
            className="absolute right-2 top-4 text-neutral-content"
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleEdit} className="form_group">
          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Project Name</p>
            <input
              type="text"
              name="name"
              required
              defaultValue={project?.name}
            />
          </div>

          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Tecnology</p>
            <TagsInput
              value={tecnology}
              onChange={(tags) => setTecnology(tags)}
            />
          </div>

          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Asign Developer</p>
            <select
              name="developer"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
            >
              {developers?.map((developer) => (
                <option key={developer?._id} value={developer?._id}>
                  {developer?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="mt-2">
              <p className="mb-1 text-sm text-neutral-content">Asign Date</p>
              <input
                type="date"
                name="asignDate"
                required
                defaultValue={project?.asignDate}
              />
            </div>

            <div className="mt-2">
              <p className="mb-1 text-sm text-neutral-content">Handover Date</p>
              <input
                type="date"
                name="handoverDate"
                required
                defaultValue={project?.handoverDate}
              />
            </div>
          </div>

          <div className="mt-2">
            <p className="mb-1 text-sm text-neutral-content">Note</p>
            <textarea name="note" defaultValue={project?.note}></textarea>
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
