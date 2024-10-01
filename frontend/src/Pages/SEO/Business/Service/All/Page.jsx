import { useAllServicesQuery } from "../../../../../Redux/serviceApi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import AddModal from "./AddModal";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export default function AllServices() {
  const [selectedService, setSelectedService] = useState(null);
  const { data, isLoading } = useAllServicesQuery({ role: "seo" });
  const services = data?.data;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <section>
      <div className="rounded border-b bg-base-100 px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Services</h1>
          <div>
            <button
              className="primary_btn"
              onClick={() =>
                document.getElementById("service_add_modal").showModal()
              }
            >
              Add New
            </button>

            <AddModal />
          </div>
        </div>
      </div>

      <div className="min-h-[80vh] overflow-x-auto rounded bg-base-100">
        <table className="zebra_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Service Name</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services?.length > 0 ? (
              services?.map((service, index) => (
                <tr key={service?._id}>
                  <td>{index + 1}</td>
                  <td>{service?.name}</td>
                  <td>{service?.type}</td>
                  <td>
                    <div className="flex items-center gap-3 text-base">
                      <div>
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            document
                              .getElementById("service_edit_modal")
                              .showModal();
                          }}
                          className="duration-300 hover:text-blue-500"
                        >
                          <FaEdit />
                        </button>

                        <EditModal service={selectedService} />
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            document
                              .getElementById("service_delete_modal")
                              .showModal();
                          }}
                          className="duration-300 hover:text-red-500"
                        >
                          <MdDelete className="text-[17px]" />
                        </button>

                        <DeleteModal service={selectedService} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <p className="text-sm text-red-500">No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
