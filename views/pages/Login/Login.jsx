import "../../assets/css/login.css";
import { CgLogIn } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/user/authApi";
import { useSelector } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const { loggedUser } = useSelector((state) => state.user);

  if (loggedUser?.success) {
    navigate(`/${loggedUser?.data?.role}/dashboard`);
  }

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    const data = {
      email,
      password,
    };

    const res = await login(data);
    console.log(res);

    if (res?.data?.success) {
      const role = res?.data?.data?.role;
      navigate(`/${role}/dashboard`);
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="container">
        <div className="w-full sm:w-[410px] mx-auto relative">
          <div className="login_box">
            <div className="login_icon shadow-lg">
              <CgLogIn className="text-[42px]" />
            </div>

            <h2 className="text-center text-base-100 text-[25px] my-2">
              Sign In
            </h2>

            <form onSubmit={handleLogin} className="sm:px-4 mt-4 text-[15px]">
              <div className="relative">
                <div className="absolute top-[19px] left-2 text-primary">
                  <MdEmail />
                </div>
                <input type="email" name="email" placeholder="Email" />
              </div>

              <div className="relative mt-4">
                <div className="absolute top-[19px] left-2 text-primary">
                  <FaLock />
                </div>
                <input type="password" name="password" placeholder="Password" />
              </div>

              <div className="flex justify-end mt-3">
                <Link
                  to="/forgot-password"
                  className="hover:text-primary text-neutral-content duration-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="mt-3">
                <button className="w-full text-center bg-primary text-base-100 rounded py-3 hover:text-neutral duration-300">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
