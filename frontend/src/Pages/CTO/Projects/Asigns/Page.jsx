import AddModal from "./AddModal";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import moment from "moment";
import { useState } from "react";
import EditModal from "./EditModal";
import toast from "react-hot-toast";
import {
  useAllDeveloperProjectQuery,
  useDeleteDeveloperProjectMutation,
} from "../../../../Redux/develoeprProjectApi";

export default function AsignsProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const { data, isLoading } = useAllDeveloperProjectQuery({
    role: "cto",
    status: "pending",
  });
  const projects = data?.data;

  const [deleteDeveloperProject] = useDeleteDeveloperProjectMutation();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure delete this project?");
    if (!confirm) return;
    const res = await deleteDeveloperProject({ id, role: "cto" });
    if (res?.data?.success) {
      toast.success(
        res?.data?.message
          ? res?.data?.message
          : "Project deleted successfully",
      );
    } else {
      toast.error(
        res?.data?.message ? res?.data?.message : "Something went wrong!",
      );
      console.log(res);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        <h2>Asigns Projects</h2>
        <div>
          <button
            onClick={() => document.getElementById("add_project_modal").show()}
            className="primary_btn"
          >
            Add Project
          </button>

          <AddModal />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
        <table className="zebra_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Project Name</th>
              <th>Developer</th>
              <th>Asign Date</th>
              <th>Handover Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project, index) => (
              <tr key={project?._id}>
                <td>{index + 1}</td>
                <td>{project?.name}</td>
                <td>{project?.developer?.name}</td>
                <td>{moment(project?.asignDate).format("D MMMM YYYY")}</td>
                <td>{moment(project?.handoverDate).format("D MMMM YYYY")}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div>
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          document.getElementById("edit_project_modal").show();
                        }}
                      >
                        <MdEdit className="text-lg text-blue-500" />
                      </button>

                      <EditModal project={selectedProject} />
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          handleDelete(project?._id);
                        }}
                      >
                        <MdDelete className="text-lg text-red-500" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
