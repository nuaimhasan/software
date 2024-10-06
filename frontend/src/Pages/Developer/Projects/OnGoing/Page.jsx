import moment from "moment";
import { MdEdit } from "react-icons/md";
import { useAllDeveloperProjectQuery } from "../../../../Redux/develoeprProjectApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditModal from "./EditModal";

export default function OnGoingProjects() {
  const { loggedUser } = useSelector((state) => state.user);
  const [selectedProject, setSelectedProject] = useState(null);

  const { data, isLoading } = useAllDeveloperProjectQuery({
    role: "developer",
    status: "ongoing",
    user: loggedUser?.data?._id,
  });
  const projects = data?.data;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        <h2>On Going Projects</h2>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
        <table className="zebra_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Project Name</th>
              <th>Developer</th>
              <th>Asign Date</th>
              <th>Start Date</th>
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
                <td>{moment(project?.startDate).format("D MMMM YYYY")}</td>
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
