import moment from "moment";
import { useAllDeveloperProjectQuery } from "../../../../Redux/develoeprProjectApi";
import { Link } from "react-router-dom";
import { TbPassword, TbWorldWww } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

export default function CompletedProjects() {
  const { data, isLoading } = useAllDeveloperProjectQuery({
    role: "cto",
    status: "completed",
  });
  const projects = data?.data;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between px-4 py-3">
        <h2>Completed Projects</h2>
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
              <th>Completed Date</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project, index) => (
              <tr key={project?._id}>
                <td>{index + 1}</td>
                <td>
                  <p>{project?.name}</p>

                  <Link
                    to={project?.projectInfo?.url}
                    target="_blank"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <TbWorldWww /> : URL
                  </Link>

                  <p className="flex items-center gap-1">
                    <FaRegUser />: {project?.projectInfo?.info}
                  </p>

                  <p className="flex items-center gap-1">
                    <TbPassword />: {project?.projectInfo?.password}
                  </p>
                </td>
                <td>{project?.developer?.name}</td>
                <td>{moment(project?.asignDate).format("D MMMM YYYY")}</td>
                <td>{moment(project?.startDate).format("D MMMM YYYY")}</td>
                <td>{moment(project?.handoverDate).format("D MMMM YYYY")}</td>
                <td>{moment(project?.completedDate).format("D MMMM YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
