import { IoClose } from "react-icons/io5";
import { useRegisterMutation } from "../../../../Redux/user/authApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function AddModal() {
  const { loggedUser } = useSelector((state) => state.user);
  const [register, { isLoading }] = useRegisterMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    const data = {
      name,
      email,
      password,
      role: "developer",
      addedBy: loggedUser?.data?._id,
    };

    const res = await register({ data, role: "cto" });
    if (res?.data?.success) {
      document.getElementById("add_developer_modal").close();
      toast.success(
        res?.data?.message
          ? res?.data?.message
          : "Developer added successfully",
      );
    } else {
      toast.error(
        res?.data?.message ? res?.data?.message : "Something went wrong!",
      );
      console.log(res);
    }
  };

  return (
    <dialog id="add_developer_modal" className="modal">
      <div className="modal-box">
        <div className="relative p-3 text-center">
          <h2 className="text-neutral">Add Developer</h2>

          <button
            onClick={() =>
              document.getElementById("add_developer_modal").close()
            }
            className="absolute right-2 top-4 text-neutral-content"
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleAdd}>
          <div className="form_group mt-2">
            <p className="text-sm text-neutral-content">Developer Name</p>
            <input type="text" name="name" required />
          </div>

          <div className="form_group mt-2">
            <p className="text-sm text-neutral-content">Email</p>
            <input type="text" name="email" required />
          </div>

          <div className="form_group mt-2">
            <p className="text-sm text-neutral-content">Password</p>
            <input type="password" name="password" required />
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
